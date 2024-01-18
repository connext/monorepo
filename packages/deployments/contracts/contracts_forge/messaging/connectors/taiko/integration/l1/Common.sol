// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {ConnectorHelper} from "../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../contracts/messaging/RootManager.sol";
import {TaikoHubConnector} from "../../../../../../contracts/messaging/connectors/taiko/TaikoHubConnector.sol";
import {WatcherManager} from "../../../../../../contracts/messaging/WatcherManager.sol";
import {IBridge} from "../../../../../../contracts/messaging/interfaces/ambs/taiko/IBridge.sol";

contract Common is ConnectorHelper {
  uint256 public constant FORK_BLOCK = 5_024_712;
  // Chains id
  uint256 public constant TAIKO_CHAIN_ID = 167007;
  uint256 public constant SEPOLIA_CHAIN_ID = 11155111;
  // Sepolia domain id for Connext
  uint32 public constant DOMAIN = 20;
  // Taiko domain id for Connext
  uint32 public constant MIRROR_DOMAIN = 101;

  // Bride contract on Sepolia
  IBridge public constant BRIDGE = IBridge(0x5293Bb897db0B64FFd11E0194984E8c5F1f06178);
  // `to` address on the messages sent on Taiko, used as recipient to instance the `TaikoHubConnector` on that address
  address public constant RECIPIENT = 0xC7501687169b955FAFe10bb9Cd1a1a8FeF8Db1D1;
  // `sender` address on the messages sent on Sepolia, used as mirror connector on the tests
  address public constant MIRROR_CONNECTOR = 0x0006e19078A46C296eb6b44d37f05ce926403A82;

  // EOAs
  address public user = makeAddr("user");
  address public owner = makeAddr("owner");

  // Connext Contracts
  TaikoHubConnector public taikoHubConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  /**
   * on the root manager so root messages can be received.
   */
  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("SEPOLIA_RPC")), FORK_BLOCK);

    vm.startPrank(owner);
    // Deploy merkle tree manager (needed in root manager)
    merkleTreeManager = new MerkleTreeManager();

    // Deploy watcher manager (needed in root manager)
    watcherManager = new WatcherManager();

    // Deploy root manager
    uint256 _minDisputeBlocks = 1;
    uint256 _disputeBlocks = 10;
    uint256 _delayBlocks = 0;
    rootManager = new RootManager(
      _delayBlocks,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );

    // Deploy taiko hub connector
    _gasCap = 200_000;
    taikoHubConnector = new TaikoHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      address(BRIDGE),
      address(rootManager),
      MIRROR_CONNECTOR,
      address(BRIDGE),
      TAIKO_CHAIN_ID,
      _gasCap
    );

    // Get the contract bytecode and set it on the recipient address
    bytes memory _bytecode = address(taikoHubConnector).code;
    vm.etch(RECIPIENT, _bytecode);
    taikoHubConnector = TaikoHubConnector(payable(RECIPIENT));
    vm.stopPrank();

    // Set the mirror connector and the gas cap (they are set to 0 when using `vm.etch`)
    vm.startPrank(taikoHubConnector.owner());
    taikoHubConnector.setMirrorConnector(MIRROR_CONNECTOR);
    taikoHubConnector.setGasCap(_gasCap);
    vm.stopPrank();

    // Add connector as a new supported one on the mirror domain
    vm.prank(owner);
    rootManager.addConnector(MIRROR_DOMAIN, address(taikoHubConnector));
  }
}
