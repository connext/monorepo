// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

interface ArbitrumL2Amb {
  // Send a transaction to L1
  function sendTxToL1(address destAddr, bytes calldata calldataForL1) external payable;
}
