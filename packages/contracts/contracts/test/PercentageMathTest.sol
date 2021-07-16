// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.4;

import "../libraries/PercentageMath.sol";

/// @title PercentageMathTest.sol
/// @author Connext
/// @notice Used to easily test the internal methods of
///         PercentageMath.sol by aliasing them to public
///         methods.

contract PercentageMathTest {
  
  constructor() {}

  function percentMul(uint256 value, uint256 percentage) public pure returns (uint256) {
    return PercentageMath.percentMul(value, percentage);
  }

  function percentDiv(uint256 value, uint256 percentage) public pure returns (uint256) {
    return PercentageMath.percentDiv(value, percentage);
  }

  function calculatePercent(uint256 value, uint256 total) public pure returns (uint256) {
    return PercentageMath.calculatePercent(value, total);
  }
}
