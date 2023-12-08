// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title BaseFuel
 * @notice Base contract for Fuel Hub and Spoke connectors
 */
abstract contract BaseFuel {
  /**
   * @notice Constant used to represent the zero value of a message
   */
  uint256 public constant ZERO_MSG_VALUE = 0;
  /**
   * @notice Constant used to represent the required length of a message
   */
  uint256 public constant MESSAGE_LENGTH = 32;

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   * @return _validLength True if the message length is 32 bytes, false otherwise
   */
  function _checkMessageLength(bytes memory _data) internal pure returns (bool _validLength) {
    _validLength = _data.length == MESSAGE_LENGTH;
  }

  /**
   * @notice Converts bytes32 to address
   * @param _bytes The bytes32 value
   * @return _address The address value
   */
  function _bytes32ToAddress(bytes32 _bytes) internal pure returns (address _address) {
    _address = address(uint160(uint256(_bytes)));
  }

  /**
   * @notice Converts address to bytes32
   * @param _address The address value
   * @return _bytes The bytes32 value
   */
  function _addressToBytes32(address _address) internal pure returns (bytes32 _bytes) {
    _bytes = bytes32(uint256(uint160(_address)));
  }
}
