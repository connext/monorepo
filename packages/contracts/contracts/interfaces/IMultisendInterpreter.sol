// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IMultisendInterpreter {
  function execute(
    address assetId,
    uint256 amount,
    bytes calldata callData
  ) external payable;
}
