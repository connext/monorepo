// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {Version0} from "./Version0.sol";
import {NomadBase} from "./NomadBase.sol";
import {MerkleLib} from "../libs/Merkle.sol";
import {Message} from "../libs/Message.sol";
// ============ External Imports ============
// import {TypedMemView} from "@summa-tx/memview-sol/contracts/TypedMemView.sol";
import {TypedMemView} from "../libs/TypedMemView.sol";

/**
 * @title Replica
 * @author Illusory Systems Inc.
 * @notice Track root updates on Home,
 * prove and dispatch messages to end recipients.
 */
contract Replica is Version0, NomadBase {
  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using Message for bytes29;

  // ============ Enums ============

  // Status of Message:
  //   0 - None - message has not been proven or processed
  //   1 - Proven - message inclusion proof has been validated
  //   2 - Processed - message has been dispatched to recipient
  enum MessageStatus {
    None,
    Proven,
    Processed
  }

  // ============ Immutables ============

  // Minimum gas for message processing
  uint256 public immutable PROCESS_GAS;
  // Reserved gas (to ensure tx completes in case message processing runs out)
  uint256 public immutable RESERVE_GAS;

  // ============ Public Storage ============

  // Domain of home chain
  uint32 public remoteDomain;
  // Number of seconds to wait before root becomes confirmable
  uint256 public optimisticSeconds;
  // re-entrancy guard
  uint8 private entered;
  // Mapping of roots to allowable confirmation times
  mapping(bytes32 => uint256) public confirmAt;
  // Mapping of message leaves to MessageStatus
  mapping(bytes32 => MessageStatus) public messages;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[45] private __GAP;

  // ============ Events ============

  /**
   * @notice Emitted when message is processed
   * @param messageHash Hash of message that failed to process
   * @param success TRUE if the call was executed successfully, FALSE if the call reverted
   * @param returnData the return data from the external call
   */
  event Process(bytes32 indexed messageHash, bool indexed success, bytes indexed returnData);

  /**
   * @notice Emitted when the value for optimisticTimeout is set
   * @param timeout The new value for optimistic timeout
   */
  event SetOptimisticTimeout(uint256 timeout);

  /**
   * @notice Emitted when a root's confirmation is modified by governance
   * @param root The root for which confirmAt has been set
   * @param previousConfirmAt The previous value of confirmAt
   * @param newConfirmAt The new value of confirmAt
   */
  event SetConfirmation(bytes32 indexed root, uint256 previousConfirmAt, uint256 newConfirmAt);

  // ============ Constructor ============

  // solhint-disable-next-line no-empty-blocks
  constructor(
    uint32 _localDomain,
    uint256 _processGas,
    uint256 _reserveGas
  ) NomadBase(_localDomain) {
    require(_processGas >= 850_000, "!process gas");
    require(_reserveGas >= 15_000, "!reserve gas");
    PROCESS_GAS = _processGas;
    RESERVE_GAS = _reserveGas;
  }

  // ============ Initializer ============

  function initialize(
    uint32 _remoteDomain,
    address _updater,
    bytes32 _committedRoot,
    uint256 _optimisticSeconds
  ) public initializer {
    __NomadBase_initialize(_updater);
    // set storage variables
    entered = 1;
    remoteDomain = _remoteDomain;
    committedRoot = _committedRoot;
    confirmAt[_committedRoot] = 1;
    optimisticSeconds = _optimisticSeconds;
    emit SetOptimisticTimeout(_optimisticSeconds);
  }

  // ============ External Functions ============

  /**
   * @notice Called by external agent. Submits the signed update's new root,
   * marks root's allowable confirmation time, and emits an `Update` event.
   * @dev Reverts if update doesn't build off latest committedRoot
   * or if signature is invalid.
   * @param _oldRoot Old merkle root
   * @param _newRoot New merkle root
   * @param _signature Updater's signature on `_oldRoot` and `_newRoot`
   */
  function update(
    bytes32 _oldRoot,
    bytes32 _newRoot,
    bytes memory _signature
  ) external notFailed {
    // ensure that update is building off the last submitted root
    require(_oldRoot == committedRoot, "not current update");
    // validate updater signature
    require(_isUpdaterSignature(_oldRoot, _newRoot, _signature), "!updater sig");
    // Hook for future use
    _beforeUpdate();
    // set the new root's confirmation timer
    confirmAt[_newRoot] = block.timestamp + optimisticSeconds;
    // update committedRoot
    committedRoot = _newRoot;
    emit Update(remoteDomain, _oldRoot, _newRoot, _signature);
  }

  /**
   * @notice First attempts to prove the validity of provided formatted
   * `message`. If the message is successfully proven, then tries to process
   * message.
   * @dev Reverts if `prove` call returns false
   * @param _message Formatted message (refer to NomadBase.sol Message library)
   * @param _proof Merkle proof of inclusion for message's leaf
   * @param _index Index of leaf in home's merkle tree
   */
  function proveAndProcess(
    bytes memory _message,
    bytes32[32] calldata _proof,
    uint256 _index
  ) external {
    require(prove(keccak256(_message), _proof, _index), "!prove");
    process(_message);
  }

  /**
   * @notice Given formatted message, attempts to dispatch
   * message payload to end recipient.
   * @dev Recipient must implement a `handle` method (refer to IMessageRecipient.sol)
   * Reverts if formatted message's destination domain is not the Replica's domain,
   * if message has not been proven,
   * or if not enough gas is provided for the dispatch transaction.
   * @param _message Formatted message
   * @return _success TRUE iff dispatch transaction succeeded
   */
  function process(bytes memory _message) public returns (bool _success) {
    bytes29 _m = _message.ref(0);
    // ensure message was meant for this domain
    require(_m.destination() == localDomain, "!destination");
    // ensure message has been proven
    bytes32 _messageHash = _m.keccak();
    require(messages[_messageHash] == MessageStatus.Proven, "!proven");
    // check re-entrancy guard
    require(entered == 1, "!reentrant");
    entered = 0;
    // update message status as processed
    messages[_messageHash] = MessageStatus.Processed;
    // A call running out of gas TYPICALLY errors the whole tx. We want to
    // a) ensure the call has a sufficient amount of gas to make a
    //    meaningful state change.
    // b) ensure that if the subcall runs out of gas, that the tx as a whole
    //    does not revert (i.e. we still mark the message processed)
    // To do this, we require that we have enough gas to process
    // and still return. We then delegate only the minimum processing gas.
    require(gasleft() >= PROCESS_GAS + RESERVE_GAS, "!gas");
    // get the message recipient
    address _recipient = _m.recipientAddress();
    // set up for assembly call
    uint256 _toCopy;
    uint256 _maxCopy = 256;
    uint256 _gas = PROCESS_GAS;
    // allocate memory for returndata
    bytes memory _returnData = new bytes(_maxCopy);
    bytes memory _calldata = abi.encodeWithSignature(
      "handle(uint32,uint32,bytes32,bytes)",
      _m.origin(),
      _m.nonce(),
      _m.sender(),
      _m.body().clone()
    );
    // dispatch message to recipient
    // by assembly calling "handle" function
    // we call via assembly to avoid memcopying a very large returndata
    // returned by a malicious contract
    assembly {
      _success := call(
        _gas, // gas
        _recipient, // recipient
        0, // ether value
        add(_calldata, 0x20), // inloc
        mload(_calldata), // inlen
        0, // outloc
        0 // outlen
      )
      // limit our copy to 256 bytes
      _toCopy := returndatasize()
      if gt(_toCopy, _maxCopy) {
        _toCopy := _maxCopy
      }
      // Store the length of the copied bytes
      mstore(_returnData, _toCopy)
      // copy the bytes from returndata[0:_toCopy]
      returndatacopy(add(_returnData, 0x20), 0, _toCopy)
    }
    // emit process results
    emit Process(_messageHash, _success, _returnData);
    // reset re-entrancy guard
    entered = 1;
  }

  // ============ External Owner Functions ============

  /**
   * @notice Set optimistic timeout period for new roots
   * @dev Only callable by owner (Governance)
   * @param _optimisticSeconds New optimistic timeout period
   */
  function setOptimisticTimeout(uint256 _optimisticSeconds) external onlyOwner {
    optimisticSeconds = _optimisticSeconds;
    emit SetOptimisticTimeout(_optimisticSeconds);
  }

  /**
   * @notice Set Updater role
   * @dev MUST ensure that all roots signed by previous Updater have
   * been relayed before calling. Only callable by owner (Governance)
   * @param _updater New Updater
   */
  function setUpdater(address _updater) external onlyOwner {
    _setUpdater(_updater);
  }

  /**
   * @notice Set confirmAt for a given root
   * @dev To be used if in the case that fraud is proven
   * and roots need to be deleted / added. Only callable by owner (Governance)
   * @param _root The root for which to modify confirm time
   * @param _confirmAt The new confirmation time. Set to 0 to "delete" a root.
   */
  function setConfirmation(bytes32 _root, uint256 _confirmAt) external onlyOwner {
    uint256 _previousConfirmAt = confirmAt[_root];
    confirmAt[_root] = _confirmAt;
    emit SetConfirmation(_root, _previousConfirmAt, _confirmAt);
  }

  // ============ Public Functions ============

  /**
   * @notice Check that the root has been submitted
   * and that the optimistic timeout period has expired,
   * meaning the root can be processed
   * @param _root the Merkle root, submitted in an update, to check
   * @return TRUE iff root has been submitted & timeout has expired
   */
  function acceptableRoot(bytes32 _root) public view returns (bool) {
    uint256 _time = confirmAt[_root];
    if (_time == 0) {
      return false;
    }
    return block.timestamp >= _time;
  }

  /**
   * @notice Attempts to prove the validity of message given its leaf, the
   * merkle proof of inclusion for the leaf, and the index of the leaf.
   * @dev Reverts if message's MessageStatus != None (i.e. if message was
   * already proven or processed)
   * @dev For convenience, we allow proving against any previous root.
   * This means that witnesses never need to be updated for the new root
   * @param _leaf Leaf of message to prove
   * @param _proof Merkle proof of inclusion for leaf
   * @param _index Index of leaf in home's merkle tree
   * @return Returns true if proof was valid and `prove` call succeeded
   **/
  function prove(
    bytes32 _leaf,
    bytes32[32] calldata _proof,
    uint256 _index
  ) public returns (bool) {
    // ensure that message has not been proven or processed
    require(messages[_leaf] == MessageStatus.None, "!MessageStatus.None");
    // calculate the expected root based on the proof
    bytes32 _calculatedRoot = MerkleLib.branchRoot(_leaf, _proof, _index);
    // if the root is valid, change status to Proven
    if (acceptableRoot(_calculatedRoot)) {
      messages[_leaf] = MessageStatus.Proven;
      return true;
    }
    return false;
  }

  /**
   * @notice Hash of Home domain concatenated with "NOMAD"
   */
  function homeDomainHash() public view override returns (bytes32) {
    return _homeDomainHash(remoteDomain);
  }

  // ============ Internal Functions ============

  /**
   * @notice Moves the contract into failed state
   * @dev Called when a Double Update is submitted
   */
  function _fail() internal override {
    _setFailed();
  }

  /// @notice Hook for potential future use
  // solhint-disable-next-line no-empty-blocks
  function _beforeUpdate() internal {}
}
