// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title ISygmaConnector
 * @notice Interface for Sygma spoke and hub connectors that contains the receiveMessage function.
 * @dev Needed to obtain the function signature on `BaseSygma.parseDepositData()`.
 */
interface ISygmaConnector {
  /**
   * @notice Receives a message from the permissionless handler
   * @param _originSender The original sender of the message
   * @param _root The aggregate root
   * @dev This can be called only by Sygma's permissionless handler
   * @dev The origin sender must be the mirror connector
   */
  function receiveMessage(address _originSender, bytes32 _root) external;
}
