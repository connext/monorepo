// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

// TODO: need a correct interface here
interface IStableSwap {
  function get_A() external returns(uint256);
  function get_dy(uint i, uint j, uint256 dx) external returns(uint256);

  function swapExact(uint256 amountIn, address assetIn, address assetOut) external payable returns (uint256);
}
