// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IL1ScrollMessenger {
  /**
   * @notice The struct that contains the proof information
   * @param batchIndex The index of the batch where the message belongs to.
   * @param merkleProof Concatenation of merkle proof for withdraw merkle trie.
   */
  struct L2MessageProof {
    uint256 batchIndex;
    bytes merkleProof;
  }

  /**
   * @return _sender The sender of the cross domain message.
   */
  function xDomainMessageSender() external view returns (address _sender);

  /**
   * @notice Send cross chain message from L1 to L2 or L2 to L1.
   * @param target The address of account who receive the message.
   * @param value The amount of ether passed when call target contract.
   * @param message The content of the message.
   * @param gasLimit Gas limit required to complete the message relay on corresponding chain.
   * @param refundAddress The address where the remaining gas will be refunded.
   */
  function sendMessage(
    address target,
    uint256 value,
    bytes calldata message,
    uint256 gasLimit,
    address refundAddress
  ) external payable;

  /**
   * @notice Execute L1 => L2 message.
   * @dev Make sure this is only called by privileged accounts.
   * @param from The address of the sender of the message.
   * @param to The address of the recipient of the message.
   * @param value The msg.value passed to the message call.
   * @param nonce The nonce of the message to avoid replay attack.
   * @param message The content of the message.
   * @param proof The proof used to verify the correctness of the transaction.
   */
  function relayMessageWithProof(
    address from,
    address to,
    uint256 value,
    uint256 nonce,
    bytes calldata message,
    L2MessageProof memory proof
  ) external;

  /**
   * @return _defaultSender The address of default cross chain message sender.
   */
  function DEFAULT_XDOMAIN_MESSAGE_SENDER() external pure returns (address _defaultSender);

  /**
   * @return _messageQueue The address of message queue contract.
   */
  function messageQueue() external pure returns (address _messageQueue);
}
