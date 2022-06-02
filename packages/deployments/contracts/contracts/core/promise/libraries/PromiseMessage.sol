// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.14;

// ============ External Imports ============
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

library PromiseMessage {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Enums ============

  // WARNING: do NOT re-write the numbers / order
  // of message types in an upgrade;
  // will cause in-flight messages to be mis-interpreted
  enum Types {
    Invalid, // 0
    PromiseCallback // 1
  }

  // ============ Constants ============
  uint256 private constant IDENTIFIER_LEN = 1;
  // 1 byte identifier + 32 bytes transferId + 20 bytes callback + 1 byte success + 32 bytes length + x bytes data
  // before: 1 byte identifier + 32 bytes transferId + 20 bytes callback + 1 byte success= 54 bytes
  uint256 private constant LENGTH_RETURNDATA_START = 54;
  uint8 private constant LENGTH_RETURNDATA_LEN = 32;

  // before: 1 byte identifier + 32 bytes transferId + 20 bytes callback +  1 byte success + 32 bytes length = 86 bytes
  uint256 private constant RETURNDATA_START = 86;

  // ============ Modifiers ============

  /**
   * @notice Asserts a message is of type `_t`
   * @param _view The message
   * @param _t The expected type
   */
  modifier typeAssert(bytes29 _view, Types _t) {
    _view.assertType(uint40(_t));
    _;
  }

  // ============ Formatters ============

  /**
   * @notice Formats an promise callback message
   * @param _transferId The address of the relayer
   * @param _callbackAddress The callback address on destination domain
   * @param _returnSuccess The success of the call
   * @param _returnData The return data of the call
   * @return The formatted message
   */
  function formatPromiseCallback(
    bytes32 _transferId,
    address _callbackAddress,
    bool _returnSuccess,
    bytes calldata _returnData
  ) internal pure returns (bytes memory) {
    return
      abi.encodePacked(
        uint8(Types.PromiseCallback),
        _transferId,
        _callbackAddress,
        uint8(_returnSuccess ? 1 : 0),
        _returnData.length,
        _returnData
      );
  }

  // ============ Getters ============

  /**
   * @notice Parse the transferId from the message
   * @param _view The message
   * @return The transferId
   */
  function transferId(bytes29 _view) internal pure typeAssert(_view, Types.PromiseCallback) returns (bytes32) {
    // before = 1 byte identifier
    return _view.index(1, 32);
  }

  /**
   * @notice Parse the callback address from the message
   * @param _view The message
   * @return The callback address
   */
  function callbackAddress(bytes29 _view) internal pure typeAssert(_view, Types.PromiseCallback) returns (address) {
    // before = 1 byte identifier + 32 bytes transferId
    return _view.indexAddress(33);
  }

  /**
   * @notice Parse the result of execution on the destination domain
   * @param _view The message
   * @return The call result
   */
  function returnSuccess(bytes29 _view) internal pure typeAssert(_view, Types.PromiseCallback) returns (bool) {
    // before: 1 byte identifier + 32 bytes transferId + 20 bytes callback = 53 bytes
    return _view.indexUint(53, 1) == 1;
  }

  /**
   * @notice Parse the returnData length from the message
   * @param _view The message
   * @return The returnData length
   */
  function lengthOfReturnData(bytes29 _view) internal pure returns (uint256) {
    return _view.indexUint(LENGTH_RETURNDATA_START, LENGTH_RETURNDATA_LEN);
  }

  /**
   * @notice Parse returnData from the message
   * @param _view The message
   * @return data
   */
  function returnData(bytes29 _view)
    internal
    view
    typeAssert(_view, Types.PromiseCallback)
    returns (bytes memory data)
  {
    uint256 length = lengthOfReturnData(_view);

    data = _view.slice(RETURNDATA_START, length, 0).clone();
  }

  /**
   * @notice Checks that view is a valid message length
   * @param _view The bytes string
   * @return TRUE if message is valid
   */
  function isValidPromiseCallbackLength(bytes29 _view) internal pure returns (bool) {
    uint256 _len = _view.len();
    uint256 _length = lengthOfReturnData(_view);
    // before = 1 byte identifier + 32 bytes transferId + 20 bytes callback address + 1 byte success + 32 bytes length + x bytes data
    // nonzero return data
    return _len > RETURNDATA_START && _length > 0 && (RETURNDATA_START + _length) == _len;
  }

  /**
   * @notice Converts to a Promise callback message
   * @param _view The message
   * @return The newly typed message
   */
  function tryAsPromiseCallback(bytes29 _view) internal pure returns (bytes29) {
    if (isValidPromiseCallbackLength(_view)) {
      return _view.castTo(uint40(Types.PromiseCallback));
    }
    return TypedMemView.nullView();
  }

  /**
   * @notice Asserts that the message is of type PromiseCallback
   * @param _view The message
   * @return The message
   */
  function mustBePromiseCallback(bytes29 _view) internal pure returns (bytes29) {
    return tryAsPromiseCallback(_view).assertValid();
  }
}
