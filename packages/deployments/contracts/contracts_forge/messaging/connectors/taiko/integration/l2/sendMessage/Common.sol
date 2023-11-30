// SPPX-LicenseIdentifier: MIT
pragma solidity =0.8.17;

import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {TaikoSpokeConnector} from "../../../../../../../contracts/messaging/connectors/taiko/TaikoSpokeConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";
import {ISignalService} from "../../../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";
import {console} from "forge-std/Test.sol";

contract TaikoSpokeConnectorForTest is TaikoSpokeConnector {
  constructor(
    SpokeConnector.ConstructorParams memory _spokeConstructorParams,
    address _signalService,
    uint256 _hubChainId,
    uint256 _gasCap
  ) TaikoSpokeConnector(_spokeConstructorParams, _signalService, _hubChainId, _gasCap) {}

  function forTest_updateMirrorConnector(address _mirrorConnector) external {
    mirrorConnector = _mirrorConnector;
  }
}

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 1_359_432;

  uint256 public constant SEPOLIA_CHAIN_ID = 11155111;
  ISignalService public constant SIGNAL_SERVICE = ISignalService(0x1000777700000000000000000000000000000007);
  uint32 public constant DOMAIN = 1; // Ethereum
  uint32 public constant MIRROR_DOMAIN = 101; // Taiko

  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public mirrorConnector = makeAddr("mirrorConnector");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");
  // Connext's off chain agent in charge of sending messages to the Taiko Hub Connector
  address public offChainAgent = makeAddr("offChainAgent");

  TaikoSpokeConnectorForTest public taikoSpokeConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("TAIKO_RPC")), _FORK_BLOCK);

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

    // Deploy scroll hub connector
    SpokeConnector.ConstructorParams memory _constructorParams = SpokeConnector.ConstructorParams(
      DOMAIN,
      MIRROR_DOMAIN,
      offChainAgent,
      address(rootManager),
      mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );
    taikoSpokeConnector = new TaikoSpokeConnectorForTest(
      _constructorParams,
      address(SIGNAL_SERVICE),
      SEPOLIA_CHAIN_ID,
      _gasCap
    );

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(taikoSpokeConnector));
    vm.stopPrank();

    // Set root manager as slow mode so the L1_SCROLL_MESSENGER messages can be received
    vm.prank(whitelistedWatcher);
    rootManager.activateSlowMode();
  }
}
