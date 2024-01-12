// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../contracts/messaging/RootManager.sol";
import {ScrollHubConnector} from "../../../../../../contracts/messaging/connectors/scroll/ScrollHubConnector.sol";
import {WatcherManager} from "../../../../../../contracts/messaging/WatcherManager.sol";
import {IL1ScrollMessenger} from "../../../../../../contracts/messaging/interfaces/ambs/scroll/IL1ScrollMessenger.sol";
import {IL2OracleGasPrice} from "../../../../../../contracts/messaging/interfaces/ambs/scroll/IL2GasPriceOracle.sol";

/**
 * @dev 2 different common contracts are needed for receive and send messages flows on the
 * integration tests because on the receive flow, because on the receive flow, we are using a
 * L1ScrollMessengerForTest instance as L1 Scroll Messenger, which is the same contract but without
 * the proof verification on the `relayMessage` function. This is needed since we don't have the proof
 * but we need to relay the message in order to get it received.
 */
contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 4_932_652;

  // Scroll L1 Messenger address on Ethereum
  IL1ScrollMessenger public constant L1_SCROLL_MESSENGER =
    IL1ScrollMessenger(0x50c7d3e7f7c656493D1D76aaa1a836CedfCBB16A);
  // L2 Oracle Gas Price contract address on Ethereum
  IL2OracleGasPrice internal constant L2_ORACLE_GAS_PRICE =
    IL2OracleGasPrice(0x247969F4fad93a33d4826046bc3eAE0D36BdE548);
  // Ethereum domain id for Connext
  uint32 public constant DOMAIN = 1;
  // Scroll domain id for Connext
  uint32 public constant MIRROR_DOMAIN = 100;
  // The mirror connector is set to the sender address on the message sent from the L2 Scroll Spoke Connector
  address public MIRROR_CONNECTOR = 0x0006e19078A46C296eb6b44d37f05ce926403A82;
  // The recipient address where the message was sent to
  address public RECIPIENT = 0xC82EdcE9eE173E12252E797fd860a87EC7DFB073;

  // EOAs and external addresses
  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");

  // Contracts
  ScrollHubConnector public scrollHubConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("SEPOLIA_RPC")), _FORK_BLOCK);

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

    // Check if the gas cap is enough, if not, set it to double the gas needed (to be sure in case it gets updated in the future)
    _gasCap = _gasNeeded * 2;

    // Deploy the scroll hub connector and get its bytecode to be deployed on the recipient address
    // `deployCodeTo` function of foundry doesn't work if the contract uses a library. So I had to use `vm.etch` instead.
    scrollHubConnector = new ScrollHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      address(L1_SCROLL_MESSENGER),
      address(rootManager),
      MIRROR_CONNECTOR,
      _gasCap
    );
    bytes memory _bytecode = address(scrollHubConnector).code;

    // Set the bytecode of the scroll hub connector on the recipient address
    vm.etch(RECIPIENT, _bytecode);
    // Update the scroll hub connector instance using the recipient address
    scrollHubConnector = ScrollHubConnector(payable(RECIPIENT));

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(scrollHubConnector));
    vm.stopPrank();

    // Update the mirror connector to the one we set on the scroll hub connector (`vm.etch` fails and sets it as the 0 address)
    vm.prank(scrollHubConnector.owner());
    scrollHubConnector.setMirrorConnector(MIRROR_CONNECTOR);

    // Update the gas cap to the one we set on the scroll hub connector (`vm.etch` fails and sets it as 0)
    vm.prank(scrollHubConnector.owner());
    scrollHubConnector.setGasCap(_gasCap);
  }
}
