// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

interface ArbitrumL1Amb {
  function sendContractTransaction(
    uint256 maxGas,
    uint256 gasPriceBid,
    address destAddr,
    uint256 amount,
    bytes memory data
  ) external payable returns (uint256);
}
