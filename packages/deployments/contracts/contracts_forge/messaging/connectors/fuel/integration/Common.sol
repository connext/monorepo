// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {FuelHubConnector} from "../../../../../contracts/messaging/connectors/fuel/FuelHubConnector.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ProposedOwnable} from "../../../../../contracts/shared/ProposedOwnable.sol";
import {RootManager} from "../../../../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../../../contracts/messaging/WatcherManager.sol";
import {IFuelMessagePortal} from "../../../../../contracts/messaging/interfaces/ambs/fuel/IFuelMessagePortal.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 4_913_146;

  IFuelMessagePortal public constant FUEL_MESSAGE_PORTAL =
    IFuelMessagePortal(0x457A5a9320d06118764c400163c441cb8551cfa2);
  uint32 public constant DOMAIN = 100; // Sepolia
  uint32 public constant MIRROR_DOMAIN = 110; // Fuel
  uint256 public constant DELAY_BLOCKS = 0;

  address public owner = makeAddr("owner");
  address public user = makeAddr("user");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  FuelHubConnector public fuelHubConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;
  address public mirrorConnector;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("SEPOLIA_RPC")), _FORK_BLOCK);

    vm.startPrank(owner);
    // Deploy merkle tree manager (needed in root manager)
    merkleTreeManager = new MerkleTreeManager();

    // Deploy watcher manager (needed in root manager)
    watcherManager = new WatcherManager();
    // Add a watcher (need for setting the slow mode)
    watcherManager.addWatcher(whitelistedWatcher);

    // Deploy root manager (needed in fuel spoke connector)
    uint256 _minDisputeBlocks = 1;
    uint256 _disputeBlocks = 10;
    rootManager = new RootManager(
      DELAY_BLOCKS,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );

    // Parse the mirror connector address from the sender on fuel in bytes - This is the sender
    // Of the message sent from Fuel L2 to Sepolia that we grabbed, we need to set as the mirror connector
    // to get it received successfully.
    bytes memory _senderOnFuel = "128573a29021c87688cd5cff01f2247400c210741b563c9ad8140009dea2b620";
    mirrorConnector = address(uint160(uint256(bytes32(_senderOnFuel))));

    // Deploy fuel hub connector
    fuelHubConnector = new FuelHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      address(FUEL_MESSAGE_PORTAL),
      address(rootManager),
      mirrorConnector
    );

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(fuelHubConnector));
    vm.stopPrank();

    // Set root manager as slow mode so the FUEL_MESSAGE_PORTAL messages can be received
    vm.prank(whitelistedWatcher);
    rootManager.activateSlowMode();
  }
}
