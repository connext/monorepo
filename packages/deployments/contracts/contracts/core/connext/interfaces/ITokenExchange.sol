// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

/**
 * @title ITokenExchange
 * @author Connext Labs
 * @notice Should be implemented as an adaptor for any DEX chosen for getting tokens to sponsor liquidity fees
 */
interface ITokenExchange {
  /**
   * @notice Returns the amount of native token to swap in for a given expected amount of tokens to sponsor liquidity fees
   * @param token The token
   * @param expectedOut The token expected amount
   * @return Amount of native token
   */
  function getInGivenExpectedOut(address token, uint256 expectedOut) external returns (uint256);

  /**
   * @notice Swaps the exact amount of native token being sent for a given token.
   * @param token The token to receive
   * @param recipient The recipient of the token
   * @return The amount of tokens resulting from the swap
   */
  function swapExactIn(address token, address recipient) external payable returns (uint256);
}
