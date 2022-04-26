// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

// ============ External Imports ============
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

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

  // ============ Constants ============

  // before: 1 byte identifier + 20 bytes recipient + 32 bytes length + 32 bytes 1 transfer id = 85 bytes
  uint256 private constant MIN_CLAIM_LEN = 85;
  // before: 1 byte identifier + 20 bytes recipient = 21 bytes
  uint256 private constant LENGTH_ID_START = 21;
  uint8 private constant LENGTH_ID_LEN = 32;
  // before: 1 byte identifier
  uint256 private constant RECIPIENT_START = 1;
  // before: 1 byte identifier + 20 bytes recipient + 32 bytes length = 53 bytes
  uint256 private constant TRANSFER_IDS_START = 53;
  uint8 private constant TRANSFER_ID_LEN = 32;

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
   * @param _transferIds A group of transfers ids to claim for fee bumps
   * @return The formatted message
   */
  function formatClaimFees(address _recipient, bytes32[] calldata _transferIds) internal pure returns (bytes memory) {
    return abi.encodePacked(uint8(Types.ClaimFees), _recipient, _transferIds.length, _transferIds);
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
   * @notice Parse The group of transfers ids to claim for fee bumps
   * @param _view The message
   * @return The group of transfers ids to claim for fee bumps
   */
  function transferIds(bytes29 _view) internal pure typeAssert(_view, Types.ClaimFees) returns (bytes32[] memory) {
    uint256 length = _view.indexUint(LENGTH_ID_START, LENGTH_ID_LEN);

    bytes32[] memory ids = new bytes32[](length);
    for (uint256 i = 0; i < length; ) {
      ids[i] = _view.index(TRANSFER_IDS_START + i * TRANSFER_ID_LEN, TRANSFER_ID_LEN);

      unchecked {
        i++;
      }
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
    // at least 1 transfer id where the excess is multiplier of transfer id length
    return _len >= MIN_CLAIM_LEN && (_len - TRANSFER_IDS_START) % TRANSFER_ID_LEN == 0;
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
