// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {SygmaSpokeConnector} from "../../../../../../../contracts/messaging/connectors/sygma/SygmaSpokeConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";
import {IBridge} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {IFeeRouter} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IFeeRouter.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 7_497_107;

  uint32 public constant DOMAIN = 100; // Base
  uint32 public constant MIRROR_DOMAIN = 1; // Ethereum
  uint8 public constant SYGMA_BASE_DOMAIN_ID = 1; // Base
  uint8 public constant SYGMA_HUB_DOMAIN_ID = 1; // Ethereum
  IBridge public constant SYGMA_BRIDGE = IBridge(0xC47468aeae431f5D0B7DA50F9f5D8a6c0eca4789);
  IFeeRouter public constant FEE_ROUTER = IFeeRouter(0x5573Ae978A10B724705624C620E6a7977935c721);
  address public PERMISSIONLESS_GENERIC_HANDLER = 0x2e1eE4153ad2F763ab8C612415AcF0DEe02Bc79B;

  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public mirrorConnector = makeAddr("mirrorConnector");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  SygmaSpokeConnector public sygmaSpokeConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("BASE_RPC")), _FORK_BLOCK);

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

    // Deploy sygma spoke connector with the l2 sygma bridge for test instance as argument
    SpokeConnector.ConstructorParams memory _constructorParams = SpokeConnector.ConstructorParams({
      domain: DOMAIN,
      mirrorDomain: MIRROR_DOMAIN,
      amb: address(SYGMA_BRIDGE),
      rootManager: address(rootManager),
      mirrorConnector: mirrorConnector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: _delayBlocks,
      merkle: address(merkleTreeManager),
      watcherManager: address(watcherManager),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });
    sygmaSpokeConnector = new SygmaSpokeConnector(
      _constructorParams,
      SYGMA_HUB_DOMAIN_ID,
      PERMISSIONLESS_GENERIC_HANDLER,
      _gasCap
    );
    vm.stopPrank();
  }
}
