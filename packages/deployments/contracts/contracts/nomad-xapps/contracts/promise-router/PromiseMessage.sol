// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

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
  // 1 byte identifier + 32 bytes transferId + 20 bytes callback + 32 bytes length + x bytes data
  // before: 1 byte identifier + 32 bytes transferId + 20 bytes callback = 53 bytes
  uint256 private constant LENGTH_CALLDATA_START = 53;
  uint8 private constant LENGTH_CALLDATA_LEN = 32;

  // before: 1 byte identifier + 32 bytes transferId + 20 bytes callback + 32 bytes length = 85 bytes
  uint256 private constant CALLDATA_START = 85;


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
   * @param _data The callback data
   * @return The formatted message
   */
  function formatPromiseCallback(bytes32 _transferId, address _callbackAddress, bytes calldata _data)
    internal
    pure
    returns (bytes memory)
  {
    return abi.encodePacked(uint8(Types.PromiseCallback), _transferId, _callbackAddress, _data.length, _data);
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
   * @notice Parse the calldata length from the message
   * @param _view The message
   * @return The calldata length
   */
  function lengthOfCalldata(bytes29 _view) internal pure typeAssert(_view, Types.PromiseCallback) returns (uint256) {
    return _view.indexUint(LENGTH_CALLDATA_START, LENGTH_CALLDATA_LEN);
  }


  /**
   * @notice Parse calldata from the message
   * @param _view The message
   * @return returnData
   */
  function returnCallData(bytes29 _view) internal view typeAssert(_view, Types.PromiseCallback) returns (bytes memory returnData) {
    uint256 length = lengthOfCalldata(_view);

    uint8 bitLength = uint8(length * 8);
    uint256 _loc = _view.loc();
    
    uint256 _mask;
    assembly {
        // solium-disable-previous-line security/no-inline-assembly
        _mask := sar(sub(bitLength, 1), 0x8000000000000000000000000000000000000000000000000000000000000000)
        returnData := and(mload(add(_loc, CALLDATA_START)), _mask)
    }
  }

  /**
   * @notice Checks that view is a valid message length
   * @param _view The bytes string
   * @return TRUE if message is valid
   */
  function isValidPromiseCallbackLength(bytes29 _view) internal pure returns (bool) {
    uint256 _len = _view.len();
    uint256 _length = lengthOfCalldata(_view);
    // before = 1 byte identifier + 32 bytes transferId + 20 bytes callback address + 32 bytes length + x bytes data
    // nonzero callback data
    return _len > CALLDATA_START && _length > 0 && (CALLDATA_START + _length) == _len;
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