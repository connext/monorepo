// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {GasCap} from "../GasCap.sol";
import {ISignalService} from "../../interfaces/ambs/taiko/ISignalService.sol";

/**
 * @title BaseTaiko
 * @notice Base contract for Taiko Hub and Spoke Connectors
 */
abstract contract BaseTaiko is GasCap {
  /**
   * @notice Struct containing data needed to verify if a signal was received or not
   * @param srcChainId Source chain id
   * @param app Sender address
   * @param signal The message that was sent
   * @param proof The proof to verify the signal
   */
  struct SignalVerificationData {
    uint256 srcChainId;
    address app;
    bytes32 signal;
    bytes proof;
  }

  /**
   * @notice Constant used to represent the required length of a message
   */
  uint256 public constant MESSAGE_LENGTH = 32;

  /**
   * @notice Taiko Signal Service address
   */
  ISignalService public immutable TAIKO_SIGNAL_SERVICE;

  /**
   * @param _gasCap Gas limit for cross domain message
   */
  constructor(address _taikoSignalService, uint256 _gasCap) GasCap(_gasCap) {
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
    // TODO: emit returned slot on event?
    TAIKO_SIGNAL_SERVICE.sendSignal(_signal);
  }

  /**
   * @notice Verifies if a signal was received or not
   * @param _data Message data
   * @return _isReceived True if the signal was received, false otherwise
   * @return _signal The message that was sent
   */
  function _verifyAndGetignal(bytes memory _data) internal view returns (bool _isReceived, bytes32 _signal) {
    SignalVerificationData memory _signalVerificationData = abi.decode(_data, (SignalVerificationData));
    _isReceived = TAIKO_SIGNAL_SERVICE.isSignalReceived(
      _signalVerificationData.srcChainId,
      _signalVerificationData.app,
      _signalVerificationData.signal,
      _signalVerificationData.proof
    );
    _signal = _signalVerificationData.signal;
  }
}
