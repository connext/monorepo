// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {HubConnector} from "../../contracts/messaging/connectors/HubConnector.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";

import "../utils/MotherForker.sol";
import "../utils/ForgeHelper.sol";
import {DeploymentLookup} from "../utils/DeploymentLookup.sol";
import {WormholeUpgradeTransfers} from "./constants/WormholeUpgradeTransfers.sol";

/**
 * @notice For this test suite to function properly, the connectors must be deployed
 * before the fork block.
 */
contract WormholeConnectorForkTest is MotherForker {
  // ============ Libraries ============
  using stdJson for string;
  using stdStorage for StdStorage;
  using Strings for string;
  using Strings for uint256;

  // ============ Storage ============
  DeploymentLookup deploymentLookup = new DeploymentLookup();
  WormholeUpgradeTransfers transfers = new WormholeUpgradeTransfers();

  // ============ Deployed contracts
  SpokeConnector newSpokeConnector;
  HubConnector newHubConnector;

  SpokeConnector oldSpokeConnector;
  HubConnector oldHubConnector;

  MerkleTreeManager merkle;
  IConnext bnbConnext;
  RootManager rootManager;

  // ============ Constructor ============
  constructor() MotherForker("") {}

  // ============ Setup ==================

  function setUp() public {
    // make deployment lookup persistent
    vm.makePersistent(address(deploymentLookup));
    // make test constants persistent
    vm.makePersistent(address(transfers));
    // Create the fork
    utils_setupForkingEnv();
  }

  // ============ Utils ==================
  function utils_setupForkingEnv() internal {
    // load info from proposal file
    utils_loadNetworkFromEnv();
    // make sure the forks are created
    utils_createForks();
    // load the currently deployed connectors (wormhole)
    utils_loadDeployments();
  }

  function utils_loadDeployments() internal {
    // Wormhole connectors
    newSpokeConnector = SpokeConnector(payable(deploymentLookup.getAddress(56, "BnbSpokeConnector")));
    newHubConnector = HubConnector(payable(deploymentLookup.getAddress(1, "BnbHubConnector")));
    // console.log("wormhole spoke:", address(newSpokeConnector));
    // console.log("wormhole hub:", address(newHubConnector));

    // Connext
    bnbConnext = IConnext(deploymentLookup.getAddress(56, "Connext"));
    // console.log("bnb connext:", address(bnbConnext));

    // Root Manager
    rootManager = RootManager(payable(deploymentLookup.getAddress(1, "RootManager")));
    // console.log("root manager:", address(rootManager));

    // Derived properties - registered, merkle, etc
    utils_selectFork(56);
    oldSpokeConnector = SpokeConnector(payable(IConnext(bnbConnext).xAppConnectionManager()));
    merkle = SpokeConnector(payable(oldSpokeConnector)).MERKLE();
    // console.log("multichain spoke:", address(oldSpokeConnector));
    // console.log("spoke merkle:", address(merkle));
  }

  function utils_upgradeConnectors(uint256 _spoke, uint256 _hub) internal {
    utils_selectFork(_spoke);
    uint32 domain = uint32(bnbConnext.domain());

    // 0. remove the connector from root manager if it exists
    utils_selectFork(_hub);
    if (rootManager.isDomainSupported(domain)) {
      //   console.log("removing connector");
      vm.prank(rootManager.owner());
      rootManager.removeConnector(domain);
      require(!rootManager.isDomainSupported(domain), "failed to remove connector");
    }

    // 1. set the arborist on spoke
    utils_selectFork(_spoke);
    if (merkle.arborist() != address(newSpokeConnector)) {
      //   console.log("setting arborist");
      vm.prank(merkle.owner());
      merkle.setArborist(address(newSpokeConnector));
      require(merkle.arborist() == address(newSpokeConnector), "failed to set arborist");
    }

    // 2. update xapp connection manager on connext
    if (bnbConnext.xAppConnectionManager() != address(newSpokeConnector)) {
      //   console.log("setting xAppConnectionManager");
      vm.prank(bnbConnext.owner());
      bnbConnext.setXAppConnectionManager(address(newSpokeConnector));
      require(
        bnbConnext.xAppConnectionManager() == address(newSpokeConnector),
        "failed to set xapp connection manager"
      );
    }

    // 3. add connector on the root manager
    // NOTE: no need to put in an if statement because it must be in this state
    // to get past step 0
    // console.log("adding connector");
    utils_selectFork(_hub);
    vm.prank(rootManager.owner());
    rootManager.addConnector(domain, address(newHubConnector));
    require(rootManager.isDomainSupported(domain), "failed to add connector");
  }

  // ============ Tests ==================
  function test_WormholeConnectorFork__shouldNotReplayTransfer() public {
    // Upgrade the bsc connectors
    utils_upgradeConnectors(56, 1);

    // Get on spoke fork
    utils_selectFork(56);

    // Get the transfer constants
    WormholeUpgradeTransfers.Transfer memory transfer = transfers.getCompletedToBscTransfer();

    // Insert the aggregate root on the spoke
    // NOTE: this could be any future aggregate root, the paths would just change
    uint256 startBlock = block.number - 10_000;
    stdstore
      .target(address(newSpokeConnector))
      .sig("pendingAggregateRoots(bytes32)")
      .with_key(transfer.aggregateRoot)
      .depth(0)
      .checked_write(startBlock);
    require(
      newSpokeConnector.pendingAggregateRoots(transfer.aggregateRoot) == startBlock,
      "failed to insert aggregate root"
    );

    // Get initial supply of the local asset for the transfer
    uint256 initialSupply = IERC20(transfer.local).totalSupply();
    uint256 initialBalance = IERC20(transfer.local).balanceOf(address(bnbConnext));

    // Try to prove and process the completed transfer
    // NOTE: We do *NOT* expect this call to revert, but we expect it to be a
    // no-op on the execution layer (no balance/supply changes on local asset)
    SpokeConnector.Proof[] memory proofs = new SpokeConnector.Proof[](1);
    proofs[0] = transfer.proof;
    newSpokeConnector.proveAndProcess(proofs, transfer.aggregateRoot, transfer.aggregatePath, transfer.aggregateIndex);

    require(newSpokeConnector.provenAggregateRoots(transfer.aggregateRoot), "failed to prove aggregate root");
    require(
      uint256(newSpokeConnector.MERKLE().leaves(keccak256(transfer.proof.message))) == 2,
      "failed to prove message"
    );

    // Get initial supply of the local asset for the transfer
    require(initialSupply == IERC20(transfer.local).totalSupply(), "replayed transfer");
    require(initialBalance == IERC20(transfer.local).balanceOf(address(bnbConnext)), "connext balance changed");
  }
}
