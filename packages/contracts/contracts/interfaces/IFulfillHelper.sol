// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IFulfillHelper {
  function execute(
    address user,
    address assetId,
    address fallbackAddress,
    bytes32 transactionId,
    uint256 amount,
    bytes calldata callData
  ) external payable;
}
