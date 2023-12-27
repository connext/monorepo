// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BridgeForTest} from "../../sygma_for_test/BridgeForTest.sol";
import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {PermissionlessGenericHandler} from "../../sygma_for_test/PermissionlessGenericHandler.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {SygmaHubConnector} from "../../../../../../../contracts/messaging/connectors/sygma/SygmaHubConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 18_586_480;

  uint32 public constant DOMAIN = 1; // Ethereum
  uint32 public constant MIRROR_DOMAIN = 100; // Cronos

  address public owner = makeAddr("owner");
  address public mirrorConnector = makeAddr("mirrorConnector");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  BridgeForTest public sygmaBridge;
  PermissionlessGenericHandler public permissionlessGenericHandler;
  SygmaHubConnector public sygmaHubConnector;
  RootManager public rootManager;
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

    // Deploy sygma bridge for test instance
    uint8 _domainId = 1;
    address _accessControl = 0xf433EfDf1Fb438F9d79D1E71dF2c2bdeAc95e28E;
    sygmaBridge = new BridgeForTest(_domainId, _accessControl);

    // Deploy permissionless generic handler for test instance
    permissionlessGenericHandler = new PermissionlessGenericHandler(address(sygmaBridge));
    // Set the deployed permissionless generic handler address for the resource ID 0
    bytes memory _args = "";
    sygmaBridge.adminSetResource(
      address(permissionlessGenericHandler),
      0x0000000000000000000000000000000000000000000000000000000000000000,
      address(permissionlessGenericHandler),
      _args
    );

    // Deploy sygma hub connector with the l1 sygma bridge for test instance as argument
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
  }
}
