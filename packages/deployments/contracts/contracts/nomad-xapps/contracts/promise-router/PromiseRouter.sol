// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

// ============ Internal Imports ============
import {IConnext} from "../../../interfaces/IConnext.sol";
import {Router} from "../Router.sol";
import {XAppConnectionClient} from "../XAppConnectionClient.sol";
import {PromiseMessage} from "./PromiseMessage.sol";
import {IBridgeToken} from "../../interfaces/bridge/IBridgeToken.sol";

// ============ External Imports ============
import {Home} from "../../../nomad-core/contracts/Home.sol";
import {Version0} from "../../../nomad-core/contracts/Version0.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

/**
 * @title PromiseRouter
 */
contract PromiseRouter is Version0, Router {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  // ========== Custom Errors ===========

  error PromiseRouter__onlyConnext_notConnext();
  error PromiseRouter__send_calldataEmpty();
  error PromiseRouter__send_callbackAddressEmpty();

  // ============ Public Storage ============

  IConnext public connext;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[49] private __GAP;

  // ======== Events =========

  /**
   * @notice Emitted when a fees claim has been initialized in this domain
   * @param domain The domain where to claim the fees
   * @param remote Remote PromiseRouter address
   * @param transferId The transferId 
   * @param callbackAddress The address of the callback
   * @param data The calldata which will executed on the destination domain
   * @param message The message sent to the destination domain
   */
  event Send(uint32 domain, bytes32 remote, bytes32 transferId, address callbackAddress, bytes data, bytes message);

  /**
   * @notice Emitted when the a fees claim message has arrived to this domain
   * @param originAndNonce Domain where the transfer originated and the unique identifier
   * for the message from origin to destination, combined in a single field ((origin << 32) & nonce)
   * @param origin Domain where the transfer originated
   * @param transferId The transferId 
   * @param callbackAddress The address of the callback
   * @param data The calldata
   */
  event Receive(
    uint64 indexed originAndNonce,
    uint32 indexed origin,
    bytes32 transferId, 
    address callbackAddress, 
    bytes data
  );

  /**
   * @notice Emitted when a new Connext address is set
   * @param connext The new connext address
   */
  event SetConnext(address indexed connext);

  // ======== Receive =======
  receive() external payable {}

  fallback() external payable {}

  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to the local bridge router
   */
  modifier onlyConnext() {
    if (msg.sender != address(connext)) revert PromiseRouter__onlyConnext_notConnext();
    _;
  }

  // ======== Initializer ========

  function initialize(address _xAppConnectionManager) public initializer {
    __XAppConnectionClient_initialize(_xAppConnectionManager);
  }

  /**
   * @notice Sets the Connext.
   * @dev Connext and relayer fee router store references to each other
   * @param _connext The address of the Connext implementation
   */
  function setConnext(address _connext) external onlyOwner {
    connext = IConnext(_connext);
    emit SetConnext(_connext);
  }

  // ======== External: Send PromiseCallback =========

  /**
   * @notice Sends a request to claim the fees in the originated domain
   * @param _domain The domain where to claim the fees
   * @param _transferId The transferId 
   * @param _callbackAddress A callback address to be called when promise callback is received
   * @param _calldata The calldata for promise callback
   */
  function send(
    uint32 _domain,
    bytes32 _transferId,
    address _callbackAddress,
    bytes calldata _calldata
  ) external onlyConnext {
    if (_calldata.length == 0) revert PromiseRouter__send_calldataEmpty();
    if (_callbackAddress == address(0)) revert PromiseRouter__send_callbackAddressEmpty();

    // get remote PromiseRouter address; revert if not found
    bytes32 remote = _mustHaveRemote(_domain);

    bytes memory message = PromiseMessage.formatPromiseCallback(_transferId, _callbackAddress, _calldata);

    xAppConnectionManager.home().dispatch(_domain, remote, message);

    // emit Send event
    emit Send(_domain, remote, _transferId, _callbackAddress, _calldata, message);
  }

  // ======== External: Handle =========

  /**
   * @notice Handles an incoming message
   * @param _origin The origin domain
   * @param _nonce The unique identifier for the message from origin to destination
   * @param _sender The sender address
   * @param _message The message
   */
  function handle(
    uint32 _origin,
    uint32 _nonce,
    bytes32 _sender,
    bytes memory _message
  ) external override onlyReplica onlyRemoteRouter(_origin, _sender) {
    // parse transferId, callbackAddress, callData from message
    bytes29 _msg = _message.ref(0).mustBePromiseCallback();

    bytes32 transferId = _msg.transferId();
    address callbackAddress = _msg.callbackAddress();
    bytes memory data = _msg.returnCallData();
    
    //TODO process callback

    // emit Receive event
    emit Receive(_originAndNonce(_origin, _nonce), _origin, transferId, callbackAddress, data);
  }

  function process(bytes32 transactionId, bytes memory _message) internal {
    // Should parse out the return data and callback address from message

    // Should execute the callback() function on the provided Callback address

    // Should enforce relayer is whitelisted by calling local connext contract

    // Should transfer the stored relayer fee to the msg.sender
  }
    
  /**
   * @dev explicit override for compiler inheritance
   * @dev explicit override for compiler inheritance
   * @return domain of chain on which the contract is deployed
   */
  function _localDomain() internal view override(XAppConnectionClient) returns (uint32) {
    return XAppConnectionClient._localDomain();
  }

  /**
   * @notice Internal utility function that combines
   * `_origin` and `_nonce`.
   * @dev Both origin and nonce should be less than 2^32 - 1
   * @param _origin Domain of chain where the transfer originated
   * @param _nonce The unique identifier for the message from origin to destination
   * @return Returns (`_origin` << 32) & `_nonce`
   */
  function _originAndNonce(uint32 _origin, uint32 _nonce) internal pure returns (uint64) {
    return (uint64(_origin) << 32) | _nonce;
  }
}