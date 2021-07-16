// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.4;

/**
 * @title PercentageMath
 * @author Aave (Used by Connext)
 * @notice Provides functions to perform percentage calculations
 * @dev Percentages are defined by default with 2 decimals of precision (100.00). The precision is indicated by PERCENTAGE_FACTOR
 * @dev Operations are rounded half up
 **/

library PercentageMath {

  uint256 public constant PERCENTAGE_FACTOR = 1e4; // percentage plus two decimals
  uint256 public constant HALF_PERCENT = PERCENTAGE_FACTOR / 2;

  /**
   * @dev Executes a percentage multiplication
   * @param value The value of which the percentage needs to be calculated
   * @param percentage The percentage of the value to be calculated
   * @return The percentage of value
   **/
  function percentMul(uint256 value, uint256 percentage) internal pure returns (uint256) {
    if (value == 0 || percentage == 0) {
      return 0;
    }

    require(
      value <= (type(uint256).max - HALF_PERCENT) / percentage,
      "percentMul: OVERFLOW"
    );

    return (value * percentage + HALF_PERCENT) / PERCENTAGE_FACTOR;
  }

  /**
   * @dev Executes a percentage division
   * @param value The value of which the percentage needs to be calculated
   * @param percentage The percentage of the value to be calculated
   * @return The value divided the percentage
   **/
  function percentDiv(uint256 value, uint256 percentage) internal pure returns (uint256) {
    require(percentage != 0, "percentDiv: DIVIDE_BY_ZERO");
    uint256 halfPercentage = percentage / 2;

    require(
      value <= (type(uint256).max - halfPercentage) / PERCENTAGE_FACTOR,
      "percentDiv: OVERFLOW"
    );

    return (value * PERCENTAGE_FACTOR + halfPercentage) / percentage;
  }

  /**
   * @dev Returns a percentage from a value
   * @param value Value you want to convert to percentage
   * @param total Total to take percentage of
   * @return The percentage in format 7% == 700, 0.07% == 7
   **/
  function calculatePercent(uint256 value, uint256 total) internal pure returns (uint256) {
    require(total != 0, "calculatePercent: DIVIDE_BY_ZERO");
  
    if (value == 0) {
      return 0;
    }

    return (value * PERCENTAGE_FACTOR) / total;
  }
}
