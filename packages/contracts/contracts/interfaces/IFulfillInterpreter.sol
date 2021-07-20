// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IFulfillInterpreter {
  function execute(
    address payable callTo,
    address assetId,
    address payable fallbackAddress,
    uint256 amount,
    bytes calldata callData
  ) external payable;
}
