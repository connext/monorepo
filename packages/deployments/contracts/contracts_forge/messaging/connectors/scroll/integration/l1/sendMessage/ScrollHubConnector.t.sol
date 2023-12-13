// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";

contract Integration_Connector_ScrollHubConnector_SendMessage is Common {
  // Events
  event SentMessage(
    address indexed sender,
    address indexed target,
    uint256 value,
    uint256 messageNonce,
    uint256 gasLimit,
    bytes message
  );

  /**
   * @notice Tests that the tx for sending the message succeeds using the scroll hub connector
   */
  function test_sendMessage() public {
    // Get the root that will be sent from the merkle tree manager
    bytes32 _root = merkleTreeManager.root();
    bytes memory _data = abi.encodePacked(_root);
    bytes memory _functionCall = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Nonce grabbed from the L1 scroll messenger. This is the nonce that will be emitted by the L1 scroll messenger on the next message
    uint256 _nonce = 67193;

    // Expect the `SentMessage` event to be emitted by the scroll messenger AMB
    vm.expectEmit(true, true, true, true, address(L1_SCROLL_MESSENGER));
    emit SentMessage(
      address(scrollHubConnector),
      mirrorConnector,
      scrollHubConnector.ZERO_MSG_VALUE(),
      _nonce,
      _gasCap,
      _functionCall
    );

    // Get the gas fee for sending the cross domain message
    uint256 _fee = L2_ORACLE_GAS_PRICE.estimateCrossDomainMessageFee(_gasCap);
    vm.deal(address(rootManager), _fee);

    // In case just the fee is sent as msg.value, there is no need of refund address
    bytes memory _extraData = abi.encode(address(0));
    // Send a message from root manager to scroll hub connector
    vm.prank(address(rootManager));
    scrollHubConnector.sendMessage{value: _fee}(_data, _extraData);
  }

  /**
   * @notice Tests that the refund address receives the extra gas
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
}
