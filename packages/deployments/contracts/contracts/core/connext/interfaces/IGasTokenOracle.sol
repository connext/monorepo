// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

interface IGasTokenOracle {
  function getRate(uint32 originDomain) external view returns (uint256 num, uint256 den);
}
