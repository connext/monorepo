// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

interface IRootManager {
  /**
   * @notice This is called by relayers to generate + send the mixed root from mainnet via AMB to
   * spoke domains.
   * @dev This must read information for the root from the registered AMBs.
   */
  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) external payable;

  /**
   * @notice Called by the connectors for various domains on the hub to aggregate their latest
   * inbound root.
   * @dev This must read information for the root from the registered AMBs
   */
  function aggregate(uint32 _domain, bytes32 _outbound) external;
}
