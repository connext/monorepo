// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

// ============ Internal Imports ============
import {IConnext} from "../../../interfaces/IConnext.sol";
import {ICallback} from "../../../interfaces/ICallback.sol";
import {Router} from "../Router.sol";
import {XAppConnectionClient} from "../XAppConnectionClient.sol";
import {PromiseMessage} from "./PromiseMessage.sol";
import {IBridgeToken} from "../../interfaces/bridge/IBridgeToken.sol";

// ============ External Imports ============
import {Home} from "../../../nomad-core/contracts/Home.sol";
import {Version0} from "../../../nomad-core/contracts/Version0.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title PromiseRouter
 */
contract PromiseRouter is Version0, Router, ReentrancyGuardUpgradeable {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  // ========== Custom Errors ===========

  error PromiseRouter__onlyConnext_notConnext();
  error PromiseRouter__send_returndataEmpty();
  error PromiseRouter__send_callbackAddressNotContract();
  error PromiseRouter__process_NullMessage();
  error PromiseRouter__process_notApprovedRelayer();
  error PromiseRouter__process_insufficientCallbackFee();
  error PromiseRouter__bumpCallbackFee_valueIsZero();

  // ============ Public Storage ============

  IConnext public connext;

  // callback messages transferId => message
  mapping(bytes32 => bytes29) public promiseMessages;
  mapping(bytes32 => uint256) public callbackFees;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[49] private __GAP;

  // ======== Events =========

  /**
   * @notice Emitted when a promise callback has been sent from this domain
   * @param domain The domain where to execute the callback
   * @param remote Remote PromiseRouter address
   * @param transferId The transferId
   * @param callbackAddress The address of the callback
   * @param success The return success from the execution on the destination domain
   * @param data The returnData from the execution on the destination domain
   * @param message The message sent to the destination domain
   */
  event Send(
    uint32 domain,
    bytes32 remote,
    bytes32 transferId,
    address callbackAddress,
    bool success,
    bytes data,
    bytes message
  );

  /**
   * @notice Emitted when a promise callback message has arrived to this domain
   * @param originAndNonce Domain where the transfer originated and the unique identifier
   * for the message from origin to destination, combined in a single field ((origin << 32) & nonce)
   * @param origin Domain where the transfer originated
   * @param transferId The transferId
   * @param callbackAddress The address of the callback
   * @param success The return success from the execution on the destination domain
   * @param data The returnData from the execution on the destination domain
   * @param message The message sent to the destination domain
   */
  event Receive(
    uint64 indexed originAndNonce,
    uint32 indexed origin,
    bytes32 transferId,
    address callbackAddress,
    bool success,
    bytes data,
    bytes message
  );

  event CallbackFeeAdded(bytes32 indexed transferId, uint256 addedFee, uint256 totalFee, address caller);

  /**
   * @notice Emitted when a new Connext address is set
   * @param connext The new connext address
   */
  event SetConnext(address indexed connext);

  // ======== Receive =======
  receive() external payable {}

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
   * @notice Sends a request to execute callback in the originated domain
   * @param _domain The domain where to execute callback
   * @param _transferId The transferId
   * @param _callbackAddress A callback address to be called when promise callback is received
   * @param _returnSuccess The returnSuccess from the execution
   * @param _returnData The returnData from the execution
   */
  function send(
    uint32 _domain,
    bytes32 _transferId,
    address _callbackAddress,
    bool _returnSuccess,
    bytes calldata _returnData
  ) external onlyConnext {
    if (_returnData.length == 0) revert PromiseRouter__send_returndataEmpty();
    if (!AddressUpgradeable.isContract(_callbackAddress)) revert PromiseRouter__send_callbackAddressNotContract();

    // get remote PromiseRouter address; revert if not found
    bytes32 remote = _mustHaveRemote(_domain);

    bytes memory message = PromiseMessage.formatPromiseCallback(
      _transferId,
      _callbackAddress,
      _returnSuccess,
      _returnData
    );

    xAppConnectionManager.home().dispatch(_domain, remote, message);

    // emit Send event
    emit Send(_domain, remote, _transferId, _callbackAddress, _returnSuccess, _returnData, message);
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
    bool success = _msg.returnSuccess();
    bytes memory data = _msg.returnData();

    //store Promise message
    promiseMessages[transferId] = _msg;

    // emit Receive event
    emit Receive(_originAndNonce(_origin, _nonce), _origin, transferId, callbackAddress, success, data, _message);
  }

  function process(bytes32 transferId) external payable nonReentrant {
    // parse out the return data and callback address from message
    bytes29 _msg = promiseMessages[transferId];
    if (_msg.isNull()) revert PromiseRouter__process_NullMessage();

    address callbackAddress = _msg.callbackAddress();
    bool success = _msg.returnSuccess();
    bytes memory data = _msg.returnData();

    // enforce relayer is whitelisted by calling local connext contract
    if (!connext.isApprovedRelayer(msg.sender)) revert PromiseRouter__process_notApprovedRelayer();

    ICallback(callbackAddress).callback(transferId, success, data);
    promiseMessages[transferId] = TypedMemView.NULL;

    // Should transfer the stored relayer fee to the msg.sender
    // TODO check if callbackFee which already paid is sufficient or not
    //      If not, should revert and should add more fee.
    // if (gasFee > callbackFees[transferId]) {
    //   revert PromiseRouter__process_insufficientCallbackFee();
    // }
    if (callbackFees[transferId] == 0) revert PromiseRouter__process_insufficientCallbackFee();

    AddressUpgradeable.sendValue(payable(msg.sender), callbackFees[transferId]);
    callbackFees[transferId] = 0;
  }

  /**
   * @notice This function will be called on the origin domain to increase the callback fee
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpCallbackFee(bytes32 _transferId) external payable {
    if (msg.value == 0) revert PromiseRouter__bumpCallbackFee_valueIsZero();

    callbackFees[_transferId] += msg.value;

    emit CallbackFeeAdded(_transferId, msg.value, callbackFees[_transferId], msg.sender);
  }

  /**
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
