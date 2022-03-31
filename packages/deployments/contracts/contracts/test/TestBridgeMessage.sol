// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

import "../nomad-xapps/contracts/bridge/BridgeMessage.sol";

// ============ External Imports ============
// import {TypedMemView} from "@summa-tx/memview-sol/contracts/TypedMemView.sol";
import {TypedMemView} from "../nomad-core/libs/TypedMemView.sol";

contract TestBridgeMessage {
  using BridgeMessage for bytes29;
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  uint256 private constant TOKEN_ID_LEN = 36; // 4 bytes domain + 32 bytes id
  uint256 private constant IDENTIFIER_LEN = 1;
  uint256 private constant TRANSFER_LEN = 65; // 1 byte identifier + 32 bytes recipient + 32 bytes amount

  struct TokenId {
    uint32 domain;
    bytes32 id;
  }

  /**
   * @notice Asserts a message is of type `_t`
   * @param _view The message
   * @param _t The expected type
   */
  modifier typeAssert(bytes29 _view, BridgeMessage.Types _t) {
    _view.assertType(uint40(_t));
    _;
  }

  function getMessageType(bytes memory _message) internal pure returns (uint40) {
    return uint40(uint8(_message[TOKEN_ID_LEN]));
  }

  function isValidAction(bytes memory _action, BridgeMessage.Types _t) external pure returns (bool) {
    return BridgeMessage.isValidAction(_action.ref(uint40(_t)));
  }

  function isValidMessageLength(bytes memory _message) external pure returns (bool) {
    uint40 _t = getMessageType(_message);
    return BridgeMessage.isValidMessageLength(_message.ref(_t));
  }

  function formatMessage(
    bytes memory _tokenId,
    bytes memory _action,
    BridgeMessage.Types _idType,
    BridgeMessage.Types _actionType
  ) external view returns (bytes memory) {
    bytes29 tokenId = _tokenId.ref(uint40(_idType));
    bytes29 action = _action.ref(uint40(_actionType));
    return BridgeMessage.formatMessage(tokenId, action);
  }

  function messageType(bytes memory _message) external pure returns (BridgeMessage.Types) {
    uint40 _t = getMessageType(_message);
    return BridgeMessage.messageType(_message.ref(_t));
  }

  function isTransfer(bytes memory _action) external pure returns (bool) {
    bytes29 action = _action.ref(uint40(BridgeMessage.Types.Transfer));
    return BridgeMessage.isTransfer(action);
  }

  function isFastTransfer(bytes memory _action) external pure returns (bool) {
    bytes29 action = _action.ref(uint40(BridgeMessage.Types.FastTransfer));
    return BridgeMessage.isFastTransfer(action);
  }

  function formatTransfer(
    bytes32 _to,
    uint256 _amnt,
    bytes32 _detailsHash,
    bool _enableFast,
    bytes32 _externalHash
  ) external view returns (bytes memory) {
    return BridgeMessage.formatTransfer(_to, _amnt, _detailsHash, _enableFast, _externalHash).clone();
  }

  function formatTokenId(uint32 _domain, bytes32 _id) external view returns (bytes memory) {
    return BridgeMessage.formatTokenId(_domain, _id).clone();
  }

  function formatDetailsHash(
    string memory _name,
    string memory _symbol,
    uint8 _decimals
  ) external pure returns (bytes32) {
    return BridgeMessage.getDetailsHash(_name, _symbol, _decimals);
  }

  function splitTokenId(bytes memory _tokenId)
    external
    pure
    returns (
      uint32,
      bytes32,
      address
    )
  {
    bytes29 tokenId = _tokenId.ref(uint40(BridgeMessage.Types.TokenId));
    uint32 domain = BridgeMessage.domain(tokenId);
    bytes32 id = BridgeMessage.id(tokenId);
    address evmId = BridgeMessage.evmId(tokenId);
    return (domain, id, evmId);
  }

  function splitTransfer(bytes memory _transfer)
    external
    pure
    returns (
      uint8,
      bytes32,
      address,
      uint256,
      bytes32
    )
  {
    bytes29 transfer = _transfer.ref(uint40(BridgeMessage.Types.FastTransfer));
    uint8 t = BridgeMessage.actionType(transfer);
    bytes32 recipient = BridgeMessage.recipient(transfer);
    address evmRecipient = BridgeMessage.evmRecipient(transfer);
    uint256 amnt = BridgeMessage.amnt(transfer);
    bytes32 id = BridgeMessage.externalHash(transfer);
    return (t, recipient, evmRecipient, amnt, id);
  }

  function splitMessage(bytes memory _message) external view returns (bytes memory, bytes memory) {
    bytes29 message = _message.ref(uint40(BridgeMessage.Types.Message));
    bytes29 tokenId = BridgeMessage.tokenId(message);
    bytes29 action = BridgeMessage.action(message);
    return (tokenId.clone(), action.clone());
  }

  function mustBeMessage(bytes memory _message) external view returns (bytes memory) {
    bytes29 message = _message.ref(uint40(BridgeMessage.Types.Message));
    return BridgeMessage.mustBeMessage(message).clone();
  }
}
