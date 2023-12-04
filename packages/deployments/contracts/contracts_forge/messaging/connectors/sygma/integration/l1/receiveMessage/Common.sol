// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BridgeForTest, Pausable, PermissionlessGenericHandlerForTest} from "./BridgeForTest.sol";
import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {SygmaHubConnector} from "../../../../../../../contracts/messaging/connectors/sygma/SygmaHubConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";
import {IBridge} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 18_586_480;

  uint32 public constant DOMAIN = 1; // Ethereum
  uint32 public constant MIRROR_DOMAIN = 100; // Cronos
  BridgeForTest public sygmaBridge;
  PermissionlessGenericHandlerForTest public permissionlessGenericHandler;

  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  SygmaHubConnector public sygmaHubConnector;
  RootManager public rootManager;
  address public mirrorConnector = makeAddr("mirrorConnector");
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("MAINNET_RPC")), _FORK_BLOCK);

    vm.startPrank(owner);
    // Deploy merkle tree manager (needed in root manager)
    merkleTreeManager = new MerkleTreeManager();

    // Deploy watcher manager (needed in root manager)
    watcherManager = new WatcherManager();
    // Add a watcher (need for setting the slow mode)
    watcherManager.addWatcher(whitelistedWatcher);

    // Deploy root manager (needed in sygma spoke connector)
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

    uint8 _domainId = 1;

    // Deploy sygma bridge for test instance
    address _accessControl = 0xf433EfDf1Fb438F9d79D1E71dF2c2bdeAc95e28E;
    sygmaBridge = new BridgeForTest(_domainId, _accessControl);

    // sygmaBridge.adminUnpauseTransfers();

    permissionlessGenericHandler = new PermissionlessGenericHandlerForTest(address(sygmaBridge));

    sygmaBridge.adminSetResource(
      address(permissionlessGenericHandler),
      0x0000000000000000000000000000000000000000000000000000000000000000,
      address(permissionlessGenericHandler),
      ""
    );

    // Deploy sygma hub connector with the l1 sygma messenger for test instance as argument
    sygmaHubConnector = new SygmaHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      _amb,
      address(rootManager),
      mirrorConnector,
      address(permissionlessGenericHandler),
      _gasCap
    );

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(sygmaHubConnector));
    vm.stopPrank();

    // Set root manager as slow mode so the L1_SCROLL_MESSENGER messages can be received
    vm.prank(whitelistedWatcher);
    rootManager.activateSlowMode();
  }
}
