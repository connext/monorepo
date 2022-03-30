// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

interface IExecutor {
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address assetId,
    uint256 amount,
    bytes _properties,
    bytes callData,
    bytes returnData,
    bool success
  );

  function getConnext() external returns (address);

  function originSender() external returns (address);

  function origin() external returns (uint32);

  function execute(
    bytes32 _transferId,
    uint256 _amount,
    address payable _to,
    address _assetId,
    bytes memory _properties,
    bytes calldata _callData
  ) external payable returns (bool success, bytes memory returnData);
}
