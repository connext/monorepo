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

  // ============ Identifiers ============

  /**
   * @notice Get the type that the TypedMemView is cast to
   * @param _view The message
   * @return _type The type of the message (one of the enum Types)
   */
  function messageType(bytes29 _view) internal pure returns (Types _type) {
    _type = Types(uint8(_view.typeOf()));
  }

  /**
   * @notice Determine whether the message is a message Type ClaimFee
   * @param _view The message
   * @return _isTypeClaimFees True if the message is Type ClaimFee
   */
  function isTypeClaimFee(bytes29 _view) internal pure returns (bool _isTypeClaimFees) {
    _isTypeClaimFees = messageType(_view) == Types.ClaimFees;
  }

  // ============ Getters ============

  /**
   * @notice Parse the recipient address of the fees
   * @param _view The message
   * @return The recipient address
   */
  function recipient(bytes29 _view) internal pure returns (address) {
    // before = 1 byte identifier
    return _view.indexAddress(1);
  }

  /**
   * @notice Parse the amount of fees claimed
   * @param _view The message
   * @return The amount of fees
   */
  function amount(bytes29 _view) internal pure returns (uint256) {
    // before = 1 byte identifier + 20 bytes address
    return _view.indexUint(21, 32);
  }

  /**
   * @notice Parse The group of transaction ids to claim for fee bumps
   * @param _view The message
   * @return The group of transaction ids to claim for fee bumps
   */
  function transactionIds(bytes29 _view) internal pure returns (bytes32[] memory) {
    uint256 length = _view.indexUint(85, 32);
    // before = 1 byte identifier + 20 bytes recipient + 32 bytes amount + 32 bytes length = 85 bytes
    bytes32[] memory _transactionIds = new bytes32[](length);
    for (uint256 i = 0; i < length; i++) {
      _transactionIds[i] = _view.index(85 + i * 32, 32);
    }
    return _transactionIds;
  }
}
