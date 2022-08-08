// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

interface IRootManager {
  /**
   * @notice This is called by relayers to generate + send the mixed root from mainnet via AMB to spoke domains
   * @dev This must read information for the root from the registered AMBs
   */
  function propagate() external;

  /**
   * @notice Called by the connectors for various domains on L1 to update the
   * latest outbound root
   * @dev This must read information for the root from the registered AMBs
   */
  function setOutboundRoot(uint32 _domain, bytes32 _outbound) external;
}
