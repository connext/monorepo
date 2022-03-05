// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ External Imports ============
// import {TypedMemView} from "@summa-tx/memview-sol/contracts/TypedMemView.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

library BridgeMessage {
    // ============ Libraries ============

    using TypedMemView for bytes;
    using TypedMemView for bytes29;

    // ============ Enums ============

    // WARNING: do NOT re-write the numbers / order
    // of message types in an upgrade;
    // will cause in-flight messages to be mis-interpreted
    // TODO: best way to handle the addition of nxtp / batching to existing types?
    enum Types {
        Invalid, // 0
        TokenId, // 1
        Message, // 2
        Transfer, // 3
        FastTransfer, // 4
        NxtpEnabled // 5
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

    // Each message must contain the merkle root for the batched transfer and the mint info for
    // the assets in the batch. Right now, the message restricts to 3 assets per batch. However,
    // it is possible to not use all of the allocated space.

    // Msg should consist of:
    // 1 byte identifer + 32 bytes recipient + 32 bytes root + 3 * (4 bytes domain + 32 bytes id + 32 bytes amount + 32 bytes detailsHash)
    // TODO: need to refine the number of assets in the batch
    // TODO: does this delineation still make sense? (i.e. token ids then "action")

    uint256 private constant TOKEN_ID_LEN = 36;
    uint8 private constant TOKENS_IN_BATCH = 3;
    uint256 private constant TOKEN_IDS_LEN = TOKENS_IN_BATCH * TOKEN_ID_LEN; // 108 = 3 * (4 bytes domain + 32 bytes id)
    uint256 private constant IDENTIFIER_LEN = 1; // type of action (Types enum)
    uint256 private constant BATCH_TRANSFER_LEN = 256; // 32 bytes recipient + 32 bytes root + 3 * (32 bytes detailsHash + 32 bytes amount)

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
        return isTransfer(_action) || isFastTransfer(_action);
    }

    /**
     * @notice Checks that view is a valid message length
     * @param _view The bytes string
     * @return TRUE if message is valid
     */
    function isValidMessageLength(bytes29 _view) internal pure returns (bool) {
        uint256 _len = _view.len();
        return _len == TOKEN_IDS_LEN + BATCH_TRANSFER_LEN;
    }

    /**
     * @notice Formats an action message
     * @param _tokenIds The token IDs for batch
     * @param _action The action for batch
     * @return The formatted message
     */
    function formatMessage(bytes29 _tokenIds, bytes29 _action)
        internal
        view
        typeAssert(_tokenIds, Types.TokenId)
        returns (bytes memory)
    {
        require(isValidAction(_action), "!action");
        bytes29[] memory _views = new bytes29[](2);
        _views[0] = _tokenIds;
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
        return
            actionType(_action) == uint8(_type) &&
            messageType(_action) == _type;
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
     * @notice Checks that the message is of type FastTransfer
     * @param _action The message
     * @return True if the message is of type FastTransfer
     */
    function isFastTransfer(bytes29 _action) internal pure returns (bool) {
        return isType(_action, Types.FastTransfer);
    }

    /**
     * @notice Checks that the message is of type NxtpEnabled
     * @param _action The message
     * @return True if the message is of type NxtpEnabled
     */
    function isNxtpEnabled(bytes29 _action) internal pure returns (bool) {
        return isType(_action, Types.NxtpEnabled);
    }

    /**
     * @notice Formats Transfer
     * @param _to The recipient address as bytes32
     * @param _root The merkle root of the transfer batch
     * @param _amnts The amount in the 
     * @return bytes29
     */
    function formatTransfer(
        bytes32 _to,
        bytes32 _root,
        uint256[3] memory _amnts,
        bytes32[3] memory _details
    ) internal pure returns (bytes29) {
        Types _type = Types.NxtpEnabled;
        // TODO: this is tacky and i hate it. interface too
        return
            abi.encodePacked(
                _type,
                _to,
                _root,
                _amnts[0],
                _details[0],
                _amnts[1],
                _details[1],
                _amnts[2],
                _details[2]
            ).ref(0).castTo(
                uint40(_type)
            );
    }

    /**
     * @notice Serializes a Token ID struct
     * @param _tokenId The token id struct
     * @return The formatted Token ID
     */
    function formatTokenId(TokenId memory _tokenId)
        internal
        pure
        returns (bytes29)
    {
        return formatTokenId(_tokenId.domain, _tokenId.id);
    }

    /**
     * @notice Creates a serialized Token ID from components
     * @param _domain The domain
     * @param _id The ID
     * @return The formatted Token ID
     */
    function formatTokenId(uint32 _domain, bytes32 _id)
        internal
        pure
        returns (bytes29)
    {
        return abi.encodePacked(_domain, _id).ref(0).castTo(uint40(Types.TokenId));
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
        return
            keccak256(
                abi.encodePacked(
                    bytes(_name).length,
                    _name,
                    bytes(_symbol).length,
                    _symbol,
                    _decimals
                )
            );
    }

    /**
     * @notice get the preFillId used to identify
     * fast liquidity provision for incoming token send messages
     * @dev used to identify a token/transfer pair in the prefill LP mapping.
     * @param _origin The domain of the chain from which the transfer originated
     * @param _nonce The unique identifier for the message from origin to destination
     * @param _tokenId The token ID
     * @param _action The action
     */
    function getPreFillId(
        uint32 _origin,
        uint32 _nonce,
        bytes29 _tokenId,
        bytes29 _action
    ) internal view returns (bytes32) {
        bytes29[] memory _views = new bytes29[](3);
        _views[0] = abi.encodePacked(_origin, _nonce).ref(0);
        _views[1] = _tokenId;
        _views[2] = _action;
        return TypedMemView.joinKeccak(_views);
    }

    /**
     * @notice Retrieves the domain from a TokenID
     * @param _tokenId The message
     * @param _idx The index of the desired token id
     * @return The domain
     */
    function domain(bytes29 _tokenId, uint8 _idx)
        internal
        pure
        typeAssert(_tokenId, Types.TokenId)
        returns (uint32)
    {
        // domain,   id, domain,    id, domain,     id
        //    0-4, 4-36,  36-40, 40-72,  72-76, 76-108
        return uint32(_tokenId.indexUint(_idx * TOKEN_ID_LEN, 4));
    }

    /**
     * @notice Retrieves the ID from a TokenID
     * @param _tokenId The message
     * @param _idx The index of the desired token id
     * @return The ID
     */
    function id(bytes29 _tokenId, uint8 _idx)
        internal
        pure
        typeAssert(_tokenId, Types.TokenId)
        returns (bytes32)
    {
        // before = 4 bytes domain + preceeding ids
        // domain, id  , domain, id   , domain, id
        // 0-4   , 4-36, 36-40 , 40-72, 72-76 , 76-108
        return _tokenId.index(_idx * TOKEN_ID_LEN + 4, 32);
    }

    /**
     * @notice Retrieves the EVM ID
     * @param _tokenId The message
     * @return The EVM ID
     */
    function evmId(bytes29 _tokenId)
        internal
        pure
        typeAssert(_tokenId, Types.TokenId)
        returns (address)
    {
        // before = 4 bytes domain + 12 bytes empty to trim for address
        return _tokenId.indexAddress(16);
    }

    /**
     * @notice Retrieves the action identifier from message
     * @param _message The action
     * @return The message type
     */
    function msgType(bytes29 _message) internal pure returns (uint8) {
        return uint8(_message.indexUint(TOKEN_IDS_LEN, 1));
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
        returns (address)
    {
        // before = 1 byte identifier + 12 bytes empty to trim for address = 13 bytes
        return _transferAction.indexAddress(13);
    }

    /**
     * @notice Retrieves the merkle root for the batch of transfers
     * @param _transferAction The message
     * @return The amount
     */
    function batchRoot(bytes29 _transferAction) internal pure returns (bytes32) {
        // before = 1 byte identifier + 32 recipient = 33 bytes
        return _transferAction.index(33, 32);
    }

    /**
     * @notice Retrieves the amount from a Transfer
     * @param _transferAction The message
     * @param _idx The index of the amount
     * @return The amount
     */
    function amnt(bytes29 _transferAction, uint8 _idx) internal pure returns (uint256) {
        // prefix = 1 byte identifier + 32 bytes recipient + 32 bytes root = 65 bytes
        // per-token -> 32 bytes detailsHash
        return _transferAction.indexUint(65 + (_idx * 64) + 32, 32);
    }

    /**
     * @notice Retrieves the detailsHash from a Transfer
     * @param _transferAction The message
     * @param _idx The index of the details
     * @return The detailsHash
     */
    function detailsHash(bytes29 _transferAction, uint8 _idx)
        internal
        pure
        returns (bytes32)
    {
        // prefix = 1 byte identifier + 32 bytes recipient + 32 bytes root = 65 bytes
        // per-token -> 32 bytes detailsHash
        return _transferAction.index(65 + (_idx * 64), 32);
    }

    /**
     * @notice Retrieves the token IDs from a Message
     * @param _message The message
     * @return The IDs for the batch
     */
    function tokenIds(bytes29 _message)
        internal
        pure
        typeAssert(_message, Types.Message)
        returns (bytes29)
    {
        // TODO: will reusing the Types.TokenId to refer to multiple ids cause
        // problems here? should i add a Types.TokenIds?
        return _message.slice(0, TOKEN_IDS_LEN, uint40(Types.TokenId));
    }

    /**
     * @notice Retrieves the action data from a Message
     * @param _message The message
     * @return The action
     */
    function action(bytes29 _message)
        internal
        pure
        typeAssert(_message, Types.Message)
        returns (bytes29)
    {
        uint256 _actionLen = _message.len() - TOKEN_IDS_LEN;
        uint40 _type = uint40(msgType(_message));
        return _message.slice(TOKEN_IDS_LEN, _actionLen, _type);
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
