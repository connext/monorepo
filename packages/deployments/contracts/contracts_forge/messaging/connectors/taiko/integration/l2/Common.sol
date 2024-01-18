// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {ConnectorHelper} from "../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {TaikoSpokeConnector} from "../../../../../../contracts/messaging/connectors/taiko/TaikoSpokeConnector.sol";
import {WatcherManager} from "../../../../../../contracts/messaging/WatcherManager.sol";
import {IBridge} from "../../../../../../contracts/messaging/interfaces/ambs/taiko/IBridge.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK_ONE = 2157660;
  uint256 public constant FORK_BLOCK_TWO = 2_157_677;

  // Chains id
  uint256 public constant TAIKO_CHAIN_ID = 167007;
  uint256 public constant SEPOLIA_CHAIN_ID = 11155111;
  // Taiko domain id for Connext
  uint32 public constant DOMAIN = 101;
  // Sepolia domain id for Connext
  uint32 public constant MIRROR_DOMAIN = 20;

  // Bridge address on Taiko L2
  IBridge public BRIDGE = IBridge(0x1000777700000000000000000000000000000004);
  // `to` address on the messages sent on Taiko, used as recipient to instance the `TaikoSpokeConnector` on that address
  address public constant MIRROR_CONNECTOR = 0x0006e19078A46C296eb6b44d37f05ce926403A82;
  // `sender` address on the messages sent on Sepolia, used as mirror connector on the tests
  address public constant RECIPIENT = 0x1113eb5BD0a1a73A6294f7458136AD89FC6b3F49;

  // EOAs and external addresses
  address public owner = makeAddr("owner");
  address public user = makeAddr("user");

  // Connext Contracts
  TaikoSpokeConnector public taikoSpokeConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  /**
   * on the root manager so root messages can be received.
   */
  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("TAIKO_RPC")), _FORK_BLOCK_ONE);

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

    // Deploy taiko spoke connector
    _gasCap = 200_000;
    SpokeConnector.ConstructorParams memory _constructorParams = SpokeConnector.ConstructorParams(
      DOMAIN,
      MIRROR_DOMAIN,
      address(BRIDGE),
      address(rootManager),
      MIRROR_CONNECTOR,
      _processGas,
      _reserveGas,
      _delayBlocks,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );
    taikoSpokeConnector = new TaikoSpokeConnector(_constructorParams, SEPOLIA_CHAIN_ID, _gasCap);

    // Get the contract bytecode and set it on the recipient address
    bytes memory _bytecode = address(taikoSpokeConnector).code;
    vm.etch(RECIPIENT, _bytecode);
    taikoSpokeConnector = TaikoSpokeConnector(payable(RECIPIENT));
    vm.stopPrank();

    // Set the mirror connector and the gas cap (they are set to 0 when using `vm.etch`)
    vm.startPrank(taikoSpokeConnector.owner());
    taikoSpokeConnector.setMirrorConnector(MIRROR_CONNECTOR);
    taikoSpokeConnector.setGasCap(_gasCap);
    vm.stopPrank();

    // Add the taiko spoke connector as a new supported on the mirror domain
    vm.prank(owner);
    rootManager.addConnector(MIRROR_DOMAIN, address(taikoSpokeConnector));
  }
}
