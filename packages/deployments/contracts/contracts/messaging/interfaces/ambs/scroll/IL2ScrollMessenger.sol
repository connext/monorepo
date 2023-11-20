// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IL2ScrollMessenger {
  /// @notice Send cross chain message from L1 to L2 or L2 to L1.
  /// @param target The address of account who receive the message.
  /// @param value The amount of ether passed when call target contract.
  /// @param message The content of the message.
  /// @param gasLimit Gas limit required to complete the message relay on corresponding chain.
  function sendMessage(address target, uint256 value, bytes memory message, uint256 gasLimit) external payable;

  /// @notice execute L1 => L2 message
  /// @dev Make sure this is only called by privileged accounts.
  /// @param from The address of the sender of the message.
  /// @param to The address of the recipient of the message.
  /// @param value The msg.value passed to the message call.
  /// @param nonce The nonce of the message to avoid replay attack.
  /// @param message The content of the message.
  function relayMessage(address from, address to, uint256 value, uint256 nonce, bytes calldata message) external;

  /// @notice Return the sender of a cross domain message.
  function xDomainMessageSender() external view returns (address);
}
