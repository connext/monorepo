// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

interface IWeth {
  function deposit() external payable;

  function approve(address _who, uint256 _wad) external;
}
