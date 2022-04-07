// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

// ============ External Imports ============
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

import "../../../../lib/forge-std/src/console.sol";

library RelayerFeeMessage {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Enums ============

  // WARNING: do NOT re-write the numbers / order
  // of message types in an upgrade;
  // will cause in-flight messages to be mis-interpreted
  enum Types {
    Invalid, // 0
    ClaimFees // 1
  }

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
   * @notice Formats an claim fees message
   * @param _recipient The address of the relayer
   * @param _amount The amount of fees to claim
   * @param _transactionIds A group of transaction ids to claim for fee bumps
   * @return The formatted message
   */
  function formatClaimFees(
    address _recipient,
    uint256 _amount,
    bytes32[] calldata _transactionIds
  ) internal pure returns (bytes memory) {
    return abi.encodePacked(uint8(Types.ClaimFees), _recipient, _amount, _transactionIds.length, _transactionIds);
  }

  // ============ Getters ============

  /**
   * @notice Parse the recipient address of the fees
   * @param _view The message
   * @return The recipient address
   */
  function recipient(bytes29 _view) internal pure typeAssert(_view, Types.ClaimFees) returns (address) {
    // before = 1 byte identifier
    return _view.indexAddress(1);
  }

  /**
   * @notice Parse the amount of fees claimed
   * @param _view The message
   * @return The amount of fees
   */
  function amount(bytes29 _view) internal pure typeAssert(_view, Types.ClaimFees) returns (uint256) {
    // before = 1 byte identifier + 20 bytes address
    return _view.indexUint(21, 32);
  }

  /**
   * @notice Parse The group of transaction ids to claim for fee bumps
   * @param _view The message
   * @return The group of transaction ids to claim for fee bumps
   */
  function transactionIds(bytes29 _view) internal view typeAssert(_view, Types.ClaimFees) returns (bytes32[] memory) {
    // before length = 1 byte identifier + 20 bytes recipient + 32 bytes amount = 53 bytes
    // check if there are transaction ids in the message
    if (_view.len() == 53) return new bytes32[](0);
    uint256 length = _view.indexUint(53, 32);

    // before = 1 byte identifier + 20 bytes recipient + 32 bytes amount + 32 bytes length = 85 bytes
    bytes32[] memory ids = new bytes32[](length);
    for (uint256 i = 0; i < length; i++) {
      ids[i] = _view.index(85 + i * 32, 32);
    }
    return ids;
  }

  /**
   * @notice Checks that view is a valid message length
   * @param _view The bytes string
   * @return TRUE if message is valid
   */
  function isValidClaimFeesLength(bytes29 _view) internal pure returns (bool) {
    uint256 _len = _view.len();
    return _len >= 53;
  }

  /**
   * @notice Converts to a ClaimFees
   * @param _view The message
   * @return The newly typed message
   */
  function tryAsClaimFees(bytes29 _view) internal pure returns (bytes29) {
    if (isValidClaimFeesLength(_view)) {
      return _view.castTo(uint40(Types.ClaimFees));
    }
    return TypedMemView.nullView();
  }

  /**
   * @notice Asserts that the message is of type ClaimFees
   * @param _view The message
   * @return The message
   */
  function mustBeClaimFees(bytes29 _view) internal pure returns (bytes29) {
    return tryAsClaimFees(_view).assertValid();
  }
}
