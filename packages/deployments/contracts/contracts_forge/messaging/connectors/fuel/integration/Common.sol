// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {FuelHubConnector} from "../../../../../contracts/messaging/connectors/fuel/FuelHubConnector.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ProposedOwnable} from "../../../../../contracts/shared/ProposedOwnable.sol";
import {RootManager} from "../../../../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {WatcherManager} from "../../../../../contracts/messaging/WatcherManager.sol";
import {IFuelMessagePortal} from "../../../../../contracts/messaging/interfaces/ambs/fuel/IFuelMessagePortal.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 4_924_669;

  // FuelMessagePortal address on Sepolia
  IFuelMessagePortal public constant FUEL_MESSAGE_PORTAL =
    IFuelMessagePortal(0x03f2901Db5723639978deBed3aBA66d4EA03aF73);
  uint32 public constant DOMAIN = 100; // Sepolia
  uint32 public constant MIRROR_DOMAIN = 110; // Fuel

  // External EOAs
  address public owner = makeAddr("owner");
  address public user = makeAddr("user");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  // Contracts and mirror connector
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

    // Parse the mirror connector address from the sender on fuel in bytes - This is the sender
    // Of the message sent from Fuel L2 to Sepolia that we grabbed, we need to set as the mirror connector
    // to get it received successfully.
    bytes32 _senderOnFuel = hex"27fc60f2d13d959e5c756ac770e74ce34cf2e11f802ce2cd61961f2e6d399b14";
    mirrorConnector = address(uint160(uint256(_senderOnFuel)));

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

    // Recipient in bytes picked from the tx sent on Fuel network
    bytes32 _recipientBytes = hex"0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05";
    // Convert the bytes to address
    address _recipient = address(uint160(uint256(_recipientBytes)));

    // Deploy the fuel hub connector and get its bytecode to be deployed on the recipient address
    // `deployCodeTo` function of foundry doesn't work if the contract uses a library. So I had to use `vm.etch` instead.
    fuelHubConnector = new FuelHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      address(FUEL_MESSAGE_PORTAL),
      address(rootManager),
      mirrorConnector
    );
    bytes memory _bytecode = address(fuelHubConnector).code;

    // Set the bytecode on the recipient address
    vm.etch(_recipient, _bytecode);

    // Set the fuel hub connector instance to the recipient address after deployment
    fuelHubConnector = FuelHubConnector(payable(_recipient));

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, _recipient);
    vm.stopPrank();

    // Update the mirror connector to the one we set on the fuel hub connector (`vm.etch` fails and sets it as the 0 address)
    vm.prank(fuelHubConnector.owner());
    fuelHubConnector.setMirrorConnector(mirrorConnector);
  }
}
