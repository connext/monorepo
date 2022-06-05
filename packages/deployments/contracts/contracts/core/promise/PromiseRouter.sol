// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.14;

import {Home} from "../../nomad-core/contracts/Home.sol";
import {TypedMemView} from "../../nomad-core/libs/TypedMemView.sol";

import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import {IConnextHandler} from "../connext/interfaces/IConnextHandler.sol";
import {IBridgeToken} from "../connext/interfaces/IBridgeToken.sol";

import {Router} from "../shared/Router.sol";
import {XAppConnectionClient} from "../shared/XAppConnectionClient.sol";
import {Version} from "../shared/Version.sol";

import {ICallback} from "./interfaces/ICallback.sol";
import {PromiseMessage} from "./libraries/PromiseMessage.sol";

/**
 * @title PromiseRouter
 */
contract PromiseRouter is Version, Router, ReentrancyGuardUpgradeable {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  // ========== Custom Errors ===========

  error PromiseRouter__onlyConnext_notConnext();
  error PromiseRouter__send_returndataEmpty();
  error PromiseRouter__send_callbackAddressNotContract();
  error PromiseRouter__process_invalidTransferId();
  error PromiseRouter__process_invalidMessage();
  error PromiseRouter__process_notApprovedRelayer();
  error PromiseRouter__process_insufficientCallbackFee();
  error PromiseRouter__process_notContractCallback();
  error PromiseRouter__bumpCallbackFee_valueIsZero();
  error PromiseRouter__bumpCallbackFee_messageUnavailable();
  error PromiseRouter__initCallbackFee_valueIsZero();

  // ============ Public Storage ============

  IConnextHandler public connext;

  /**
   * @notice Mapping of transferId to promise callback messages
   * @dev While handling the message, it will parse transferId from incomming message and store the message in the mapping
   */
  mapping(bytes32 => bytes32) public messageHashes;

  /**
   * @notice Mapping of transferId to callback fee
   * @dev This will track all the callback fees for each transferId.
   * Can add while xcall or bumping callback fee
   */
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

  /**
   * @notice Emitted when transaction fee for callback added
   * @param transferId The transferId
   * @param addedFee The fee amount that added newly
   * @param totalFee The total fee amount, can be bumped by multiple times
   * @param caller The transaction caller
   */
  event CallbackFeeAdded(bytes32 indexed transferId, uint256 addedFee, uint256 totalFee, address caller);

  /**
   * @notice Emitted when callback function executed
   * @param transferId The transferId
   * @param relayer The address of the relayer which executed the callback
   */
  event CallbackExecuted(bytes32 indexed transferId, address relayer);

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
    connext = IConnextHandler(_connext);
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
    if (_callbackAddress == address(0)) revert PromiseRouter__send_callbackAddressNotContract();

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

    // store Promise message
    messageHashes[transferId] = _msg.keccak();

    // emit Receive event
    emit Receive(_originAndNonce(_origin, _nonce), _origin, transferId, callbackAddress, success, data, _message);
  }

  /**
   * @notice Process stored callback function
   * @param transferId The transferId to process
   */
  function process(bytes32 transferId, bytes calldata _message) public nonReentrant {
    // parse out the return data and callback address from message
    bytes32 messageHash = messageHashes[transferId];
    if (messageHash == bytes32(0)) revert PromiseRouter__process_invalidTransferId();

    bytes29 _msg = _message.ref(0).mustBePromiseCallback();
    if (messageHash != _msg.keccak()) revert PromiseRouter__process_invalidMessage();

    // enforce relayer is whitelisted by calling local connext contract
    if (!connext.approvedRelayers(msg.sender)) revert PromiseRouter__process_notApprovedRelayer();

    address callbackAddress = _msg.callbackAddress();

    if (!AddressUpgradeable.isContract(callbackAddress)) revert PromiseRouter__process_notContractCallback();

    uint256 callbackFee = callbackFees[transferId];

    // remove message
    delete messageHashes[transferId];

    // remove callback fees
    callbackFees[transferId] = 0;

    // execute callback
    ICallback(callbackAddress).callback(transferId, _msg.returnSuccess(), _msg.returnData());

    emit CallbackExecuted(transferId, msg.sender);

    // Should transfer the stored relayer fee to the msg.sender
    if (callbackFee > 0) {
      AddressUpgradeable.sendValue(payable(msg.sender), callbackFee);
    }
  }

  /**
   * @notice This function will be called on the origin domain to init the callback fee while xcall
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function initCallbackFee(bytes32 _transferId) external payable onlyConnext {
    if (msg.value == 0) revert PromiseRouter__initCallbackFee_valueIsZero();

    callbackFees[_transferId] += msg.value;

    emit CallbackFeeAdded(_transferId, msg.value, callbackFees[_transferId], msg.sender);
  }

  /**
   * @notice This function will be called on the origin domain to increase the callback fee
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpCallbackFee(bytes32 _transferId) external payable {
    if (msg.value == 0) revert PromiseRouter__bumpCallbackFee_valueIsZero();

    // use the presence of the message to evaluate if the fee should be bumped.
    // this is to check that the user is not bumping a transferId that does not exist, or they
    // are not bumping the fees of a transfer that has already been processed.
    // the other options are to (a) track process status in a separate mapping (3 mappings updated)
    // on process) or (b) use the callbackFees mapping and require the callback fees are nonzero
    // on xcall (preventing 0-fee callbacks)
    if (messageHashes[_transferId] == bytes32(0)) revert PromiseRouter__bumpCallbackFee_messageUnavailable();

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
