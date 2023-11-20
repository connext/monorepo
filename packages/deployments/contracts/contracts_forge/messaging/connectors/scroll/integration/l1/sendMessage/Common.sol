// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {ScrollHubConnector} from "../../../../../../../contracts/messaging/connectors/scroll/scrollHubConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";
import {IL2OracleGasPrice} from "../../../../../../../contracts/messaging/interfaces/ambs/scroll/IL2GasPriceOracle.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 18_586_480;

  address public constant L1_SCROLL_MESSENGER = 0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367; // Scroll L1 Messenger
  address public constant L2_SCROLL_MESSENGER = 0x781e90f1c8Fc4611c9b7497C3B47F99Ef6969CbC; // Scroll Messenger L2 Proxy address
  IL2OracleGasPrice internal constant L2_ORACLE_GAS_PRICE =
    IL2OracleGasPrice(0x987e300fDfb06093859358522a79098848C33852);
  uint32 public constant DOMAIN = 1; // Ethereum
  uint32 public constant MIRROR_DOMAIN = 100; // Scroll

  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  ScrollHubConnector public scrollHubConnector;
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

    // Deploy root manager (needed in scroll spoke connector)
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

    /* Make sure the gas set gas cap is beyond the min gas needed for sending a message */
    // Create a mock message
    bytes32 _aggregateRoot = bytes32("aggregateRoot");
    bytes memory _data = abi.encodePacked(_aggregateRoot);
    bytes memory _message = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Calculate the  gas needed for sending that message
    uint256 _gasNeeded = L2_ORACLE_GAS_PRICE.calculateIntrinsicGasFee(_message);
    // Check if the gas cap is enough, if not, set it to double the gas needed
    if (_gasCap < _gasNeeded) _gasCap = _gasNeeded * 2;

    // Deploy scroll hub connector
    scrollHubConnector = new ScrollHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      L1_SCROLL_MESSENGER,
      address(rootManager),
      mirrorConnector,
      _gasCap
    );

    // // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(scrollHubConnector));
    vm.stopPrank();

    // Set root manager as slow mode so the L1_SCROLL_MESSENGER messages can be received
    vm.prank(whitelistedWatcher);
    rootManager.activateSlowMode();
  }
}
