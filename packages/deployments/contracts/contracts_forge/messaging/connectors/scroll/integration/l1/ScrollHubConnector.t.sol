// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";
import {IL1ScrollMessenger} from "../../../../../../contracts/messaging/interfaces/ambs/scroll/IL1ScrollMessenger.sol";

contract Integration_Connector_ScrollHubConnector is Common {
  // Events
  event SentMessage(
    address indexed sender,
    address indexed target,
    uint256 value,
    uint256 messageNonce,
    uint256 gasLimit,
    bytes message
  );

  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  /**
   * @notice Tests that the tx for sending the message through the Scroll Messenger succeeds using the scroll hub connector
   */
  function test_sendMessage() public {
    // Get the root that will be sent from the merkle tree manager
    bytes32 _root = merkleTreeManager.root();
    bytes memory _data = abi.encodePacked(_root);
    bytes memory _functionCall = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Nonce grabbed from the L1 scroll messenger. This is the nonce that will be emitted by the L1 scroll messenger on the next message
    uint256 _nonce = 938593;

    // Expect the `SentMessage` event to be emitted by the scroll messenger AMB
    vm.expectEmit(true, true, true, true, address(L1_SCROLL_MESSENGER));
    emit SentMessage(
      address(scrollHubConnector),
      MIRROR_CONNECTOR,
      scrollHubConnector.ZERO_MSG_VALUE(),
      _nonce,
      _gasCap,
      _functionCall
    );

    // Get the gas fee for sending the cross domain message
    uint256 _fee = L2_ORACLE_GAS_PRICE.estimateCrossDomainMessageFee(_gasCap);
    vm.deal(address(rootManager), _fee);

    // The fee is sent as msg.value, there is no need of refund address
    bytes memory _extraData = abi.encode(address(0));
    // Send a message from root manager to scroll hub connector
    vm.prank(address(rootManager));
    scrollHubConnector.sendMessage{value: _fee}(_data, _extraData);
  }

  /**
   * @notice Tests that the refund address receives the refund amount when sending the message with extra gas through
   * the Scroll Messenger using the scroll hub connector
   */
  function test_addressWasRefunded(uint256 _gasExtra) public {
    // Get the root that will be sent from the merkle tree manager
    bytes32 _root = merkleTreeManager.root();
    bytes memory _data = abi.encodePacked(_root);

    // Get the gas fee for sending the cross domain message and the extra gas
    uint256 _fee = L2_ORACLE_GAS_PRICE.estimateCrossDomainMessageFee(_gasCap);
    _gasExtra = bound(_gasExtra, 1, type(uint248).max - _fee);

    // Create a refund address and get its balance before sending the message
    address _refundAddress = makeAddr("refundAddress");
    uint256 _addrBalanceBef = address(_refundAddress).balance;
    bytes memory _extraData = abi.encode(_refundAddress);

    // Send a message from root manager to scroll hub connector with the fee + extra gas
    vm.deal(address(rootManager), _fee + _gasExtra);
    vm.prank(address(rootManager));
    scrollHubConnector.sendMessage{value: _fee + _gasExtra}(_data, _extraData);

    // Expect the refund address to have received the extra gas
    uint256 _addrBalanceAft = address(_refundAddress).balance;
    assertEq(_addrBalanceAft, _addrBalanceBef + _gasExtra);
  }

  /**
   * @notice Tests that the message sent on L2 is received and processed correctly by the scroll hub connector.
   * To do this test, a message was sent on the L2 scroll sepolia testnet: https://sepolia.scrollscan.com/tx/0x71e0e01665494b0da0c9786b2984324bc480790cb6eb564cd5b6d1a3d4ac02e4
   * Then the block number was set to a block where the message was already included on a batch and finally
   * The message is relayed on the test using a proof grabbed from the Scroll API backend.
   * When relayed, the L1 Scroll Messenger contract will call the `processMessage` function on the scroll hub connector, and it
   * will aggregate the message on the root manager. The test expects the `RootReceived` event to be emitted by the `RootManager`
   */
  function test_receiveMessage() public {
    // `_from` address used to send the message on L2's Scroll testnet
    address _from = 0x0006e19078A46C296eb6b44d37f05ce926403A82;

    // Data obtained from the Scroll API backend using the `_from` address above as a query parameter.
    // Http request (GET): https://sepolia-api-bridge.scroll.io/api/claimable?address=0x0006e19078a46c296eb6b44d37f05ce926403a82
    address _to = 0xC82EdcE9eE173E12252E797fd860a87EC7DFB073;
    uint256 _value = 0;
    bytes
      memory _message = hex"4ff746f600000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000020616767726567617465526f6f7400000000000000000000000000000000000000";
    uint256 _nonce = 336313;
    uint256 _batchIndex = 60112;
    bytes
      memory _proof = hex"ec85a9880f2f13576d8e0abf847d2e3429f9e1e3bc0e929623c7ce16815a9024ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5b4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30d47f4049e84cf3c2af02f179cd12b552e3d7b0fca2cc1811ef41c8789595f325adee3ce4c99e7e1dcdeec03d2831948bc48d2252dc596bc52b8106ca544a18cc690ff83c9aa11d03ebe1d03aef819029ab87b24bf182e57cf608ff43968dbea4887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a19680fa98d5688f196bce7ff1f4513de185b9f1dbf0cc9cfcc4bf5db2ed1a7d3e437482eb6d1c4bea959df49e0cb42b442003955f0a59e714e827902f58ae2ee51f3cefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0f9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5f8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf8923490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c7ad36d8d119e6c757d5883739a6cb87cafe909210330f425439df8fbddbb308d5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8beccda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d27874b09783cef2e7750f7ea24f6090c9ce47f33cf25ca5e16a1207b4a50fda2be1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a1ef973d30ca636d922d10ae577c73bc4fe92699225f30c0c2e9d6727bceb256d";

    // This is the root sent as `processMessage()` argument on the message sent on L2
    bytes32 _root = bytes32("aggregateRoot");

    // Expect `RootReceived` event to be emitted with the correct values by the `RootManager`
    vm.expectEmit(true, true, true, true, address(rootManager));
    // The queue index is 1 because is the first message received since it was deployed.
    uint256 _lastQueueIndex = 1;
    emit RootReceived(MIRROR_DOMAIN, _root, _lastQueueIndex);

    // Relay the message sent on L2 in L1
    IL1ScrollMessenger.L2MessageProof memory _l2MessageProof = IL1ScrollMessenger.L2MessageProof(_batchIndex, _proof);
    L1_SCROLL_MESSENGER.relayMessageWithProof(_from, _to, _value, _nonce, _message, _l2MessageProof);
  }
}
