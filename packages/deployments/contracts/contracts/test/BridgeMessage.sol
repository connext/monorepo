// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

// ============ External Imports ============
import {TypedMemView} from "../shared/libraries/TypedMemView.sol";

library BridgeMessage {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Enums ============

  // WARNING: do NOT re-write the numbers / order
  // of message types in an upgrade;
  // will cause in-flight messages to be mis-interpreted
  // The Types enum has to do with the TypedMemView library and it defines
  // the types of `views` that we use in BridgeMessage. A view is not interesting data
  // itself, but rather it points to a specific part of the memory where
  // the data we care about live. When we give a `type` to a view, we define what type
  // is the data it points to, so that we can do easy runtime assertions without
  // having to fetch the whole data from memory and check for ourselves. In BridgeMessage.sol
  // the types of `data` we can have are defined in this enum and may belong to different taxonomies.
  // For example, a `Message` includes a `TokenId` and an Action, either a `Transfer` or a `TransferToHook`.
  // The Message is a different TYPE of data than a TokenId or Transfer, as TokenId and Transfer live inside
  // the message. For that reason, we define them as different data types and we add them to the same enum
  // for ease of use.
  enum Types {
    Invalid, // 0
    TokenId, // 1
    Message, // 2
    Transfer, // 3
    DeprecatedFastTransfer, // 4
    TransferToHook, // 5
    ExtraData // 6
  }

  // ============ Structs ============

  // Tokens are identified by a TokenId:
  // domain - 4 byte chain ID of the chain from which the token originates
  // id - 32 byte identifier of the token address on the origin chain, in that chain's address format
  struct TokenId {
    uint32 domain;
    bytes32 id;
  }

  // ============ Constants ============

  uint256 private constant TOKEN_ID_LEN = 36; // 4 bytes domain + 32 bytes id
  uint256 private constant IDENTIFIER_LEN = 1;
  uint256 private constant TRANSFER_LEN = 97; // 1 byte identifier + 32 bytes recipient + 32 bytes amount + 32 bytes detailsHash
  uint256 private constant MIN_TRANSFER_HOOK_LEN = 129; // 1 byte identifier + 32 bytes hook address + 32 bytes amount + 32 bytes detailsHash + 32 bytes sender + X bytes extraData

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

  // ============ Internal Functions ============

  /**
   * @notice Checks that Action is valid type
   * @param _action The action
   * @return TRUE if action is valid
   */
  function isValidAction(bytes29 _action) internal pure returns (bool) {
    return isTransfer(_action) || isTransferToHook(_action);
  }

  /**
   * @notice Checks that view is a valid message length
   * @param _view The bytes string
   * @return TRUE if message is valid
   */
  function isValidMessageLength(bytes29 _view) internal pure returns (bool) {
    uint256 _len = _view.len();
    return _len == TOKEN_ID_LEN + TRANSFER_LEN || _len >= TOKEN_ID_LEN + MIN_TRANSFER_HOOK_LEN;
  }

  /**
   * @notice Formats an action message
   * @param _tokenId The token ID
   * @param _action The action
   * @return The formatted message
   */
  function formatMessage(bytes29 _tokenId, bytes29 _action)
    internal
    view
    typeAssert(_tokenId, Types.TokenId)
    returns (bytes memory)
  {
    require(isValidAction(_action), "!action");
    bytes29[] memory _views = new bytes29[](2);
    _views[0] = _tokenId;
    _views[1] = _action;
    return TypedMemView.join(_views);
  }

  /**
   * @notice Returns the type of the message
   * @param _view The message
   * @return The type of the message
   */
  function messageType(bytes29 _view) internal pure returns (Types) {
    return Types(uint8(_view.typeOf()));
  }

  /**
   * @notice Checks that the message is of the specified type
   * @param _type the type to check for
   * @param _action The message
   * @return True if the message is of the specified type
   */
  function isType(bytes29 _action, Types _type) internal pure returns (bool) {
    return actionType(_action) == uint8(_type) && messageType(_action) == _type;
  }

  /**
   * @notice Checks that the message is of type Transfer
   * @param _action The message
   * @return True if the message is of type Transfer
   */
  function isTransfer(bytes29 _action) internal pure returns (bool) {
    return isType(_action, Types.Transfer);
  }

  /**
   * @notice Checks that the message is of type TransferToHook
   * @param _action The message
   * @return True if the message is of type TransferToHook
   */
  function isTransferToHook(bytes29 _action) internal pure returns (bool) {
    return isType(_action, Types.TransferToHook);
  }

  /**
   * @notice Formats Transfer
   * @param _to The recipient address as bytes32
   * @param _amnt The transfer amount
   * @param _detailsHash The hash of the token name, symbol, and decimals
   * @return
   */
  function formatTransfer(
    bytes32 _to,
    uint256 _amnt,
    bytes32 _detailsHash
  ) internal pure returns (bytes29) {
    return abi.encodePacked(Types.Transfer, _to, _amnt, _detailsHash).ref(uint40(Types.Transfer));
  }

  /**
   * @notice Formats TransferToHook message
   * @param _hook The hook that will handle this token transfer
   * @param _amnt The transfer amount
   * @param _detailsHash The hash of the token name, symbol, and decimals
   * @param _extraData User-provided data for the receiving hook
   * @return
   */
  function formatTransferToHook(
    bytes32 _hook,
    uint256 _amnt,
    bytes32 _detailsHash,
    bytes32 _sender,
    bytes memory _extraData
  ) internal pure returns (bytes29) {
    return
      abi.encodePacked(Types.TransferToHook, _hook, _amnt, _detailsHash, _sender, _extraData).ref(
        uint40(Types.TransferToHook)
      );
  }

  /**
   * @notice Serializes a Token ID struct
   * @param _tokenId The token id struct
   * @return The formatted Token ID
   */
  function formatTokenId(TokenId memory _tokenId) internal pure returns (bytes29) {
    return formatTokenId(_tokenId.domain, _tokenId.id);
  }

  /**
   * @notice Creates a serialized Token ID from components
   * @param _domain The domain
   * @param _id The ID
   * @return The formatted Token ID
   */
  function formatTokenId(uint32 _domain, bytes32 _id) internal pure returns (bytes29) {
    return abi.encodePacked(_domain, _id).ref(uint40(Types.TokenId));
  }

  /**
   * @notice Formats the keccak256 hash of the token details
   * Token Details Format:
   *      length of name cast to bytes - 32 bytes
   *      name - x bytes (variable)
   *      length of symbol cast to bytes - 32 bytes
   *      symbol - x bytes (variable)
   *      decimals - 1 byte
   * @param _name The name
   * @param _symbol The symbol
   * @param _decimals The decimals
   * @return The Details message
   */
  function getDetailsHash(
    string memory _name,
    string memory _symbol,
    uint8 _decimals
  ) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(bytes(_name).length, _name, bytes(_symbol).length, _symbol, _decimals));
  }

  /**
   * @notice Retrieves the domain from a TokenID
   * @param _tokenId The message
   * @return The domain
   */
  function domain(bytes29 _tokenId) internal pure typeAssert(_tokenId, Types.TokenId) returns (uint32) {
    return uint32(_tokenId.indexUint(0, 4));
  }

  /**
   * @notice Retrieves the ID from a TokenID
   * @param _tokenId The message
   * @return The ID
   */
  function id(bytes29 _tokenId) internal pure typeAssert(_tokenId, Types.TokenId) returns (bytes32) {
    // before = 4 bytes domain
    return _tokenId.index(4, 32);
  }

  /**
   * @notice Retrieves the EVM ID
   * @param _tokenId The message
   * @return The EVM ID
   */
  function evmId(bytes29 _tokenId) internal pure typeAssert(_tokenId, Types.TokenId) returns (address) {
    // before = 4 bytes domain + 12 bytes empty to trim for address
    return _tokenId.indexAddress(16);
  }

  /**
   * @notice Retrieves the action identifier from message
   * @param _message The action
   * @return The message type
   */
  function msgType(bytes29 _message) internal pure returns (uint8) {
    return uint8(_message.indexUint(TOKEN_ID_LEN, 1));
  }

  /**
   * @notice Retrieves the identifier from action
   * @param _action The action
   * @return The action type
   */
  function actionType(bytes29 _action) internal pure returns (uint8) {
    return uint8(_action.indexUint(0, 1));
  }

  /**
   * @notice Retrieves the recipient from a Transfer
   * @param _transferAction The message
   * @return The recipient address as bytes32
   */
  function recipient(bytes29 _transferAction)
    internal
    pure
    typeAssert(_transferAction, Types.Transfer)
    returns (bytes32)
  {
    // before = 1 byte identifier
    return _transferAction.index(1, 32);
  }

  /**
   * @notice Retrieves the EVM Recipient from a Transfer
   * @param _transferAction The message
   * @return The EVM Recipient
   */
  function evmRecipient(bytes29 _transferAction)
    internal
    pure
    typeAssert(_transferAction, Types.Transfer)
    returns (address)
  {
    // before = 1 byte identifier + 12 bytes empty to trim for address = 13 bytes
    return _transferAction.indexAddress(13);
  }

  /**
   * @notice Retrieves the amount from a Transfer
   * @param _transferAction The message
   * @return The amount
   */
  function amnt(bytes29 _transferAction) internal pure returns (uint256) {
    // before = 1 byte identifier + 32 bytes ID = 33 bytes
    return _transferAction.indexUint(33, 32);
  }

  /**
   * @notice Retrieves the detailsHash from a Transfer
   * @param _transferAction The message
   * @return The detailsHash
   */
  function detailsHash(bytes29 _transferAction) internal pure returns (bytes32) {
    // before = 1 byte identifier + 32 bytes ID + 32 bytes amount = 65 bytes
    return _transferAction.index(65, 32);
  }

  /**
   * @notice Retrieves the token ID from a Message
   * @param _message The message
   * @return The ID
   */
  function tokenId(bytes29 _message) internal pure typeAssert(_message, Types.Message) returns (bytes29) {
    return _message.slice(0, TOKEN_ID_LEN, uint40(Types.TokenId));
  }

  /**
   * @notice Retrieves the hook contract EVM address from a TransferWithHook
   * @param _transferAction The message
   * @return The hook contract address
   */
  function evmHook(bytes29 _transferAction)
    internal
    pure
    typeAssert(_transferAction, Types.TransferToHook)
    returns (address)
  {
    return _transferAction.indexAddress(13);
  }

  /**
   * @notice Retrieves the sender from a TransferWithHook
   * @param _transferAction The message
   * @return The sender as bytes32
   */
  function sender(bytes29 _transferAction)
    internal
    pure
    typeAssert(_transferAction, Types.TransferToHook)
    returns (bytes32)
  {
    // before = 1 byte identifier + 32 bytes hook address + 32 bytes amount + 32 bytes detailsHash = 97
    return _transferAction.index(97, 32);
  }

  /**
   * @notice Retrieves the extra data from a TransferWithHook
   * @param _transferAction The message
   * @return A TypedMemview of extraData
   */
  function extraData(bytes29 _transferAction)
    internal
    pure
    typeAssert(_transferAction, Types.TransferToHook)
    returns (bytes29)
  {
    // anything past the end is the extradata
    return
      _transferAction.slice(
        MIN_TRANSFER_HOOK_LEN,
        _transferAction.len() - MIN_TRANSFER_HOOK_LEN,
        uint40(Types.ExtraData)
      );
  }

  /**
   * @notice Retrieves the action data from a Message
   * @param _message The message
   * @return The action
   */
  function action(bytes29 _message) internal pure typeAssert(_message, Types.Message) returns (bytes29) {
    uint256 _actionLen = _message.len() - TOKEN_ID_LEN;
    uint40 _type = uint40(msgType(_message));
    return _message.slice(TOKEN_ID_LEN, _actionLen, _type);
  }

  /**
   * @notice Converts to a Message
   * @param _message The message
   * @return The newly typed message
   */
  function tryAsMessage(bytes29 _message) internal pure returns (bytes29) {
    if (isValidMessageLength(_message)) {
      return _message.castTo(uint40(Types.Message));
    }
    return TypedMemView.nullView();
  }

  /**
   * @notice Asserts that the message is of type Message
   * @param _view The message
   * @return The message
   */
  function mustBeMessage(bytes29 _view) internal pure returns (bytes29) {
    return tryAsMessage(_view).assertValid();
  }
}
