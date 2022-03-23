// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

interface IExecutor {

  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address assetId,
    uint256 amount,
    bytes callData,
    bytes returnData,
    bool success,
    bool isContract
  );

  function getConnext() external returns (address);

  function execute(
    bytes32 transferId,
    address payable to,
    address assetId,
    uint256 amount,
    bytes calldata callData
  ) external payable returns (bool success, bool isContract, bytes memory returnData);
}
