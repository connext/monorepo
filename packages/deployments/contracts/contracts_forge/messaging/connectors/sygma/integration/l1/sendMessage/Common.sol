// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {SygmaHubConnector} from "../../../../../../../contracts/messaging/connectors/sygma/SygmaHubConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";
import {IBridge} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {IFeeRouter} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IFeeRouter.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 18_710_058;

  uint32 public constant DOMAIN = 1; // Ethereum
  uint32 public constant MIRROR_DOMAIN = 100; // Cronos
  address public constant ROOT_MANAGER = 0x9FBDa871d559710256a2502A2517b794B482Db40;
  IBridge public constant SYGMA_BRIDGE = IBridge(0x4D878E8Fb90178588Cda4cf1DCcdC9a6d2757089);
  IFeeRouter public constant FEE_ROUTER = IFeeRouter(0xC47468aeae431f5D0B7DA50F9f5D8a6c0eca4789);

  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");
  address public mirrorConnector = makeAddr("mirrorConnector");
  address public permissionlessGenericHandler = makeAddr("permissionlessGenericHandler");

  SygmaHubConnector public sygmaHubConnector;
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

    // Deploy sygma hub connector with the l1 sygma bridge for test instance as argument
    sygmaHubConnector = new SygmaHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      address(SYGMA_BRIDGE),
      ROOT_MANAGER,
      mirrorConnector,
      permissionlessGenericHandler,
      _gasCap
    );
    vm.stopPrank();
  }
}
