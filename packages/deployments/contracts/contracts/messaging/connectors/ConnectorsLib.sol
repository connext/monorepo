// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title Library for common functions used by the connectors.
 */
library ConnectorsLib {
  /**
   * @dev The length in bytes of the root
   */
  uint256 public constant ROOT_LENGTH = 32;

  /**
   * @notice Checks that the message length is equal than 32 bytes
   * @param _data Message data
   * @return _validLength True if the message length is 32 bytes, false otherwise
   */
  function checkMessageLength(bytes memory _data) external pure returns (bool _validLength) {
    _validLength = _data.length == ROOT_LENGTH;
  }
}
