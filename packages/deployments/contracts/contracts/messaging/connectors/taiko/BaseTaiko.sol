// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {ISignalService} from "../../interfaces/ambs/taiko/ISignalService.sol";

/**
 * @title BaseTaiko
 * @notice Base contract for Taiko Hub and Spoke Connectors
 */
abstract contract BaseTaiko {
  /**
   * @notice Constant used to represent the required length of a message
   */
  uint256 public constant MESSAGE_LENGTH = 32;

  /**
   * @notice Taiko Signal Service address
   */
  ISignalService public immutable TAIKO_SIGNAL_SERVICE;

  /**
   * @param _taikoSignalService Taiko Signal Service address
   */
  constructor(address _taikoSignalService) {
    TAIKO_SIGNAL_SERVICE = ISignalService(_taikoSignalService);
  }

  /**
   * @notice Checks that the message length is 32 bytes
   * @param _data Message data
   * @return _validLength True if the message length is 32 bytes, false otherwise
   */
  function _checkMessageLength(bytes memory _data) internal pure returns (bool _validLength) {
    _validLength = _data.length == MESSAGE_LENGTH;
  }

  /**
   * @notice Sends a message to the mirror connector through the Taiko Signal Service
   * @param _signal The message to send
   */
  function _sendSignal(bytes32 _signal) internal {
    TAIKO_SIGNAL_SERVICE.sendSignal(_signal);
  }

  /**
   * @notice Verifies if a signal was received or not
   * @param _data Message data
   * @return _isReceived True if the signal was received, false otherwise
   * @return _signal The message that was sent
   */
  function _verifyAndGetSignal(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes memory _data
  ) internal view returns (bool _isReceived, bytes32 _signal) {
    bytes memory _proof;
    (_signal, _proof) = abi.decode(_data, (bytes32, bytes));
    _isReceived = TAIKO_SIGNAL_SERVICE.isSignalReceived(_sourceChainId, _mirrorConnector, _signal, _proof);
  }
}
