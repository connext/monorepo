// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface ITokenExchange {
  function getInGivenExactOut(address token, uint256 exactOut) external returns (uint256);
  function swapExactOut(address token, uint256 exactOut, address recipient) external payable returns (uint256);
}
