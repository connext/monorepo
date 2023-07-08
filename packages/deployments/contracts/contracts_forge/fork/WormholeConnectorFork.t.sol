// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {HubConnector} from "../../contracts/messaging/connectors/HubConnector.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";

import "../utils/MotherForker.sol";
import {DeploymentLookup} from "../utils/DeploymentLookup.sol";

/**
 * @notice For this test suite to function properly, the connectors must be deployed
 * before the fork block.
 */
contract WormholeConnectorForkTest is MotherForker {
  // ============ Libraries ============
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  // ============ Storage ============
  DeploymentLookup deploymentLookup = new DeploymentLookup();

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

  function utils_upgradeConnectors() internal {
    utils_selectFork(56);
    uint32 domain = uint32(bnbConnext.domain());

    // 0. remove the connector from root manager if it exists
    utils_selectFork(1);
    if (rootManager.isDomainSupported(domain)) {
      //   console.log("removing connector");
      vm.prank(rootManager.owner());
      rootManager.removeConnector(domain);
      require(!rootManager.isDomainSupported(domain), "failed to remove connector");
    }

    // 1. set the arborist on spoke
    utils_selectFork(56);
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
    utils_selectFork(1);
    vm.prank(rootManager.owner());
    rootManager.addConnector(domain, address(newHubConnector));
    require(rootManager.isDomainSupported(domain), "failed to add connector");
  }

  // ============ Tests ==================
  function test_testing() public {
    utils_upgradeConnectors();
  }
}
