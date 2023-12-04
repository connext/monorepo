// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ProposedOwnable} from "../../../../../../contracts/shared/ProposedOwnable.sol";
import {RootManager} from "../../../../../../contracts/messaging/RootManager.sol";
import {ScrollSpokeConnector} from "../../../../../../contracts/messaging/connectors/scroll/ScrollSpokeConnector.sol";
import {SpokeConnector} from "../../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../../../../contracts/messaging/WatcherManager.sol";
import {IL2ScrollMessenger} from "../../../../../../contracts/messaging/interfaces/ambs/scroll/IL2ScrollMessenger.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 815_854;

  IL2ScrollMessenger public constant L2_SCROLL_MESSENGER =
    IL2ScrollMessenger(0x781e90f1c8Fc4611c9b7497C3B47F99Ef6969CbC); // Scroll Messenger L2 Proxy address
  address public constant SCROLL_RELAYER = 0x7885BcBd5CeCEf1336b5300fb5186A12DDD8c478;
  uint32 public constant DOMAIN = 100; // Scroll
  uint32 public constant MIRROR_DOMAIN = 1; // Etherem
  uint256 public constant DELAY_BLOCKS = 0;

  address public owner = makeAddr("owner");
  address public user = makeAddr("user");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  ScrollSpokeConnector public scrollSpokeConnector;
  RootManager public rootManager;
  address public mirrorConnector = makeAddr("mirrorConnector");
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("SCROLL_RPC")), _FORK_BLOCK);

    vm.startPrank(owner);
    // Deploy merkle tree manager (needed in root manager)
    merkleTreeManager = new MerkleTreeManager();

    // Deploy watcher manager (needed in root manager)
    watcherManager = new WatcherManager();
    // Add a watcher (need for setting the slow mode)
    watcherManager.addWatcher(whitelistedWatcher);

    // Deploy root manager (needed in scroll spoke connector)
    uint256 _minDisputeBlocks = 1;
    uint256 _disputeBlocks = 10;
    rootManager = new RootManager(
      DELAY_BLOCKS,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );

    // Deploy scroll spoke connector
    SpokeConnector.ConstructorParams memory _spokeConstructorParams = SpokeConnector.ConstructorParams(
      DOMAIN,
      MIRROR_DOMAIN,
      address(L2_SCROLL_MESSENGER),
      address(rootManager),
      mirrorConnector,
      _processGas,
      _reserveGas,
      DELAY_BLOCKS,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );
    scrollSpokeConnector = new ScrollSpokeConnector(_spokeConstructorParams, _gasCap);

    vm.stopPrank();
    // Set root manager as slow mode so the L2_SCROLL_MESSENGER messages can be received
    vm.prank(whitelistedWatcher);
    rootManager.activateSlowMode();
  }
}
