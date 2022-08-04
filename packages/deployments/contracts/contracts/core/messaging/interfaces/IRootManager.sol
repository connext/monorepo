// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

interface IRootManager {
  /**
   * @notice This is called by relayers to generate + send the mixed root from mainnet via AMB to spoke domains
   * @dev This must read information for the root from the registered AMBs
   */
  function propagate() external;
}