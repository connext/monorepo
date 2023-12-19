// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IFuelMessagePortal {
  function pause() external;

  function unpause() external;

  function fuelBaseAssetDecimals() external view returns (uint8);

  function fuelChainStateContract() external view returns (address);

  function getNextOutgoingMessageNonce() external view returns (uint256);

  function incomingMessageSuccessful(bytes32 messageId) external view returns (bool);

  function messageSender() external view returns (bytes32);

  function sendMessage(bytes32 recipient, bytes calldata data) external payable;

  function depositETH(bytes32 recipient) external payable;
}
