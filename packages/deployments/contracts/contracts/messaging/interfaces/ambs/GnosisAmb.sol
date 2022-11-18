// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// Taken from: https://github.com/omni/tokenbridge-contracts/blob/master/contracts/interfaces/IAMB.sol
interface GnosisAmb {
  function messageSender() external view returns (address);

  function maxGasPerTx() external view returns (uint256);

  function transactionHash() external view returns (bytes32);

  function messageId() external view returns (bytes32);

  function messageSourceChainId() external view returns (bytes32);

  function messageCallStatus(bytes32 _messageId) external view returns (bool);

  function failedMessageDataHash(bytes32 _messageId) external view returns (bytes32);

  function failedMessageReceiver(bytes32 _messageId) external view returns (address);

  function failedMessageSender(bytes32 _messageId) external view returns (address);

  function requireToPassMessage(
    address _contract,
    bytes memory _data,
    uint256 _gas
  ) external returns (bytes32);

  function requireToConfirmMessage(
    address _contract,
    bytes memory _data,
    uint256 _gas
  ) external returns (bytes32);

  function requireToGetInformation(bytes32 _requestSelector, bytes memory _data) external returns (bytes32);

  function sourceChainId() external view returns (uint256);

  function destinationChainId() external view returns (uint256);

  function executeSignatures(bytes memory _data, bytes memory _signatures) external;

  function safeExecuteSignaturesWithAutoGasLimit(bytes memory _data, bytes memory _signatures) external;
}
