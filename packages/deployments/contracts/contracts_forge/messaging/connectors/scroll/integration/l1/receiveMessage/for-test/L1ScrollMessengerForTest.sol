// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IL1ScrollMessenger} from "../../../../../../../contracts/messaging/interfaces/ambs/scroll/IL1ScrollMessenger.sol";

/**
 * @dev This contract is used for testing purpose only. It is used to simulate the `relayMessageWithProof` of the real L1ScrollMessenger contract,
 * but without the part of verifying the proof. It exists to avoid the complexity of generating, processing and validating the proof, which is not the
 * goal of this test. Instead, we focus on testing the `processMessage` function of the ScrollHubConnector contract, keeping all of the logic
 * of the `relayMessageWithProof` function except the proof verification.
 */
contract L1ScrollMessengerForTest {
  /// @notice Emitted when a cross domain message is relayed successfully.
  /// @param messageHash The hash of the message.
  event RelayedMessage(bytes32 indexed messageHash);

  /// @notice Emitted when a cross domain message is failed to relay.
  /// @param messageHash The hash of the message.
  event FailedRelayedMessage(bytes32 indexed messageHash);

  IL1ScrollMessenger public immutable L1_SCROLL_MESSENGER;

  address internal constant DEFAULT_XDOMAIN_MESSAGE_SENDER = address(1);
  address public xDomainMessageSender;

  mapping(bytes32 => bool) public isL2MessageExecuted;

  constructor(address _l1ScrollMessenger) {
    L1_SCROLL_MESSENGER = IL1ScrollMessenger(_l1ScrollMessenger);
    xDomainMessageSender = DEFAULT_XDOMAIN_MESSAGE_SENDER;
  }

  modifier notInExecution() {
    require(xDomainMessageSender == DEFAULT_XDOMAIN_MESSAGE_SENDER, "Message is already in execution");
    _;
  }

  function relayMessage(
    address _from,
    address _to,
    uint256 _value,
    uint256 _nonce,
    bytes memory _message
  ) external notInExecution {
    bytes32 _xDomainCalldataHash = keccak256(_encodeXDomainCalldata(_from, _to, _value, _nonce, _message));
    require(!isL2MessageExecuted[_xDomainCalldataHash], "Message was already successfully executed");

    // @note check more `_to` address to avoid attack in the future when we add more gateways.
    require(_to != L1_SCROLL_MESSENGER.messageQueue(), "Forbid to call message queue");
    _validateTargetAddress(_to);

    // @note This usually will never happen, just in case.
    require(_from != xDomainMessageSender, "Invalid message sender");

    xDomainMessageSender = _from;
    (bool success, ) = _to.call{value: _value}(_message);
    // reset value to refund gas.
    xDomainMessageSender = DEFAULT_XDOMAIN_MESSAGE_SENDER;

    if (success) {
      isL2MessageExecuted[_xDomainCalldataHash] = true;
      emit RelayedMessage(_xDomainCalldataHash);
    } else {
      emit FailedRelayedMessage(_xDomainCalldataHash);
    }
  }

  /// @dev Internal function to generate the correct cross domain calldata for a message.
  /// @param _sender Message sender address.
  /// @param _target Target contract address.
  /// @param _value The amount of ETH pass to the target.
  /// @param _messageNonce Nonce for the provided message.
  /// @param _message Message to send to the target.
  /// @return ABI encoded cross domain calldata.
  function _encodeXDomainCalldata(
    address _sender,
    address _target,
    uint256 _value,
    uint256 _messageNonce,
    bytes memory _message
  ) internal pure returns (bytes memory) {
    return
      abi.encodeWithSignature(
        "relayMessage(address,address,uint256,uint256,bytes)",
        _sender,
        _target,
        _value,
        _messageNonce,
        _message
      );
  }

  /// @dev Internal function to check whether the `_target` address is allowed to avoid attack.
  /// @param _target The address of target address to check.
  function _validateTargetAddress(address _target) internal view {
    // @note check more `_target` address to avoid attack in the future when we add more external contracts.

    require(_target != address(this), "Forbid to call self");
  }
}
