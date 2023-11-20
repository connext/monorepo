// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GasCap} from "../GasCap.sol";
import {Connector} from "../Connector.sol";
import {SpokeConnector} from "../SpokeConnector.sol";

/**
 * @title BaseScroll
 * @notice Base contract for Scroll Hub and Spoke connectors
 */
abstract contract BaseScroll is GasCap {
  /**
   * @notice Constant used to represent the zero value of a message
   */
  uint256 public constant ZERO_MSG_VALUE = 0;
  /**
   * @notice Constant used to represent the required length of a message
   */
  uint256 public constant MESSAGE_LENGTH = 32;

  /**
   * @param _gasCap Gas limit for cross domain message
   */
  constructor(uint256 _gasCap) GasCap(_gasCap) {}

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   * @return _validLength True if the message length is 32 bytes, false otherwise
   */
  function _checkMessageLength(bytes memory _data) internal pure returns (bool _validLength) {
    _validLength = _data.length == MESSAGE_LENGTH;
  }
}
