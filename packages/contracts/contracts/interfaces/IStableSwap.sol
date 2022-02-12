// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

// TODO: need a correct interface here
interface IStableSwap {
  function swapExact(uint256 amountIn, address assetIn, address assetOut) external payable returns (uint256);
}
