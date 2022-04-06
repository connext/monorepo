// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {Version0} from "./Version0.sol";
import {NomadBase} from "./NomadBase.sol";
import {QueueLib} from "../libs/Queue.sol";
import {MerkleLib} from "../libs/Merkle.sol";
import {Message} from "../libs/Message.sol";
import {MerkleTreeManager} from "./Merkle.sol";
import {QueueManager} from "./Queue.sol";
import {IUpdaterManager} from "../interfaces/IUpdaterManager.sol";
// ============ External Imports ============
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title Home
 * @author Illusory Systems Inc.
 * @notice Accepts messages to be dispatched to remote chains,
 * constructs a Merkle tree of the messages,
 * and accepts signatures from a bonded Updater
 * which notarize the Merkle tree roots.
 * Accepts submissions of fraudulent signatures
 * by the Updater and slashes the Updater in this case.
 */
contract Home is Version0, QueueManager, MerkleTreeManager, NomadBase {
  // ============ Libraries ============

  using QueueLib for QueueLib.Queue;
  using MerkleLib for MerkleLib.Tree;

  // ============ Constants ============

  // Maximum bytes per message = 2 KiB
  // (somewhat arbitrarily set to begin)
  uint256 public constant MAX_MESSAGE_BODY_BYTES = 2 * 2**10;

  // ============ Public Storage Variables ============

  // domain => next available nonce for the domain
  mapping(uint32 => uint32) public nonces;
  // contract responsible for Updater bonding, slashing and rotation
  IUpdaterManager public updaterManager;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[48] private __GAP;

  // ============ Events ============

  /**
   * @notice Emitted when a new message is dispatched via Nomad
   * @param leafIndex Index of message's leaf in merkle tree
   * @param destinationAndNonce Destination and destination-specific
   * nonce combined in single field ((destination << 32) & nonce)
   * @param messageHash Hash of message; the leaf inserted to the Merkle tree for the message
   * @param committedRoot the latest notarized root submitted in the last signed Update
   * @param message Raw bytes of message
   */
  event Dispatch(
    bytes32 indexed messageHash,
    uint256 indexed leafIndex,
    uint64 indexed destinationAndNonce,
    bytes32 committedRoot,
    bytes message
  );

  /**
   * @notice Emitted when proof of an improper update is submitted,
   * which sets the contract to FAILED state
   * @param oldRoot Old root of the improper update
   * @param newRoot New root of the improper update
   * @param signature Signature on `oldRoot` and `newRoot
   */
  event ImproperUpdate(bytes32 oldRoot, bytes32 newRoot, bytes signature);

  /**
   * @notice Emitted when the Updater is slashed
   * (should be paired with ImproperUpdater or DoubleUpdate event)
   * @param updater The address of the updater
   * @param reporter The address of the entity that reported the updater misbehavior
   */
  event UpdaterSlashed(address indexed updater, address indexed reporter);

  /**
   * @notice Emitted when the UpdaterManager contract is changed
   * @param updaterManager The address of the new updaterManager
   */
  event NewUpdaterManager(address updaterManager);

  // ============ Constructor ============

  constructor(uint32 _localDomain) NomadBase(_localDomain) {} // solhint-disable-line no-empty-blocks

  // ============ Initializer ============

  function initialize(IUpdaterManager _updaterManager) public initializer {
    // initialize queue, set Updater Manager, and initialize
    __QueueManager_initialize();
    _setUpdaterManager(_updaterManager);
    __NomadBase_initialize(updaterManager.updater());
  }

  // ============ Modifiers ============

  /**
   * @notice Ensures that function is called by the UpdaterManager contract
   */
  modifier onlyUpdaterManager() {
    require(msg.sender == address(updaterManager), "!updaterManager");
    _;
  }

  // ============ External: Updater & UpdaterManager Configuration  ============

  /**
   * @notice Set a new Updater
   * @param _updater the new Updater
   */
  function setUpdater(address _updater) external onlyUpdaterManager {
    _setUpdater(_updater);
  }

  /**
   * @notice Set a new UpdaterManager contract
   * @dev Home(s) will initially be initialized using a trusted UpdaterManager contract;
   * we will progressively decentralize by swapping the trusted contract with a new implementation
   * that implements Updater bonding & slashing, and rules for Updater selection & rotation
   * @param _updaterManager the new UpdaterManager contract
   */
  function setUpdaterManager(address _updaterManager) external onlyOwner {
    _setUpdaterManager(IUpdaterManager(_updaterManager));
  }

  // ============ External Functions  ============

  /**
   * @notice Dispatch the message it to the destination domain & recipient
   * @dev Format the message, insert its hash into Merkle tree,
   * enqueue the new Merkle root, and emit `Dispatch` event with message information.
   * @param _destinationDomain Domain of destination chain
   * @param _recipientAddress Address of recipient on destination chain as bytes32
   * @param _messageBody Raw bytes content of message
   */
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external notFailed {
    require(_messageBody.length <= MAX_MESSAGE_BODY_BYTES, "msg too long");
    // get the next nonce for the destination domain, then increment it
    uint32 _nonce = nonces[_destinationDomain];
    nonces[_destinationDomain] = _nonce + 1;
    // format the message into packed bytes
    bytes memory _message = Message.formatMessage(
      localDomain,
      bytes32(uint256(uint160(msg.sender))),
      _nonce,
      _destinationDomain,
      _recipientAddress,
      _messageBody
    );
    // insert the hashed message into the Merkle tree
    bytes32 _messageHash = keccak256(_message);
    tree.insert(_messageHash);
    // enqueue the new Merkle root after inserting the message
    queue.enqueue(root());
    // Emit Dispatch event with message information
    // note: leafIndex is count() - 1 since new leaf has already been inserted
    emit Dispatch(_messageHash, count() - 1, _destinationAndNonce(_destinationDomain, _nonce), committedRoot, _message);
  }

  /**
   * @notice Submit a signature from the Updater "notarizing" a root,
   * which updates the Home contract's `committedRoot`,
   * and publishes the signature which will be relayed to Replica contracts
   * @dev emits Update event
   * @dev If _newRoot is not contained in the queue,
   * the Update is a fraudulent Improper Update, so
   * the Updater is slashed & Home is set to FAILED state
   * @param _committedRoot Current updated merkle root which the update is building off of
   * @param _newRoot New merkle root to update the contract state to
   * @param _signature Updater signature on `_committedRoot` and `_newRoot`
   */
  function update(
    bytes32 _committedRoot,
    bytes32 _newRoot,
    bytes memory _signature
  ) external notFailed {
    // check that the update is not fraudulent;
    // if fraud is detected, Updater is slashed & Home is set to FAILED state
    if (improperUpdate(_committedRoot, _newRoot, _signature)) return;
    // clear all of the intermediate roots contained in this update from the queue
    while (true) {
      bytes32 _next = queue.dequeue();
      if (_next == _newRoot) break;
    }
    // update the Home state with the latest signed root & emit event
    committedRoot = _newRoot;
    emit Update(localDomain, _committedRoot, _newRoot, _signature);
  }

  /**
   * @notice Suggest an update for the Updater to sign and submit.
   * @dev If queue is empty, null bytes returned for both
   * (No update is necessary because no messages have been dispatched since the last update)
   * @return _committedRoot Latest root signed by the Updater
   * @return _new Latest enqueued Merkle root
   */
  function suggestUpdate() external view returns (bytes32 _committedRoot, bytes32 _new) {
    if (queue.length() != 0) {
      _committedRoot = committedRoot;
      _new = queue.lastItem();
    }
  }

  // ============ Public Functions  ============

  /**
   * @notice Hash of Home domain concatenated with "NOMAD"
   */
  function homeDomainHash() public view override returns (bytes32) {
    return _homeDomainHash(localDomain);
  }

  /**
   * @notice Check if an Update is an Improper Update;
   * if so, slash the Updater and set the contract to FAILED state.
   *
   * An Improper Update is an update building off of the Home's `committedRoot`
   * for which the `_newRoot` does not currently exist in the Home's queue.
   * This would mean that message(s) that were not truly
   * dispatched on Home were falsely included in the signed root.
   *
   * An Improper Update will only be accepted as valid by the Replica
   * If an Improper Update is attempted on Home,
   * the Updater will be slashed immediately.
   * If an Improper Update is submitted to the Replica,
   * it should be relayed to the Home contract using this function
   * in order to slash the Updater with an Improper Update.
   *
   * An Improper Update submitted to the Replica is only valid
   * while the `_oldRoot` is still equal to the `committedRoot` on Home;
   * if the `committedRoot` on Home has already been updated with a valid Update,
   * then the Updater should be slashed with a Double Update.
   * @dev Reverts (and doesn't slash updater) if signature is invalid or
   * update not current
   * @param _oldRoot Old merkle tree root (should equal home's committedRoot)
   * @param _newRoot New merkle tree root
   * @param _signature Updater signature on `_oldRoot` and `_newRoot`
   * @return TRUE if update was an Improper Update (implying Updater was slashed)
   */
  function improperUpdate(
    bytes32 _oldRoot,
    bytes32 _newRoot,
    bytes memory _signature
  ) public notFailed returns (bool) {
    require(_isUpdaterSignature(_oldRoot, _newRoot, _signature), "!updater sig");
    require(_oldRoot == committedRoot, "not a current update");
    // if the _newRoot is not currently contained in the queue,
    // slash the Updater and set the contract to FAILED state
    if (!queue.contains(_newRoot)) {
      _fail();
      emit ImproperUpdate(_oldRoot, _newRoot, _signature);
      return true;
    }
    // if the _newRoot is contained in the queue,
    // this is not an improper update
    return false;
  }

  // ============ Internal Functions  ============

  /**
   * @notice Set the UpdaterManager
   * @param _updaterManager Address of the UpdaterManager
   */
  function _setUpdaterManager(IUpdaterManager _updaterManager) internal {
    require(Address.isContract(address(_updaterManager)), "!contract updaterManager");
    updaterManager = IUpdaterManager(_updaterManager);
    emit NewUpdaterManager(address(_updaterManager));
  }

  /**
   * @notice Slash the Updater and set contract state to FAILED
   * @dev Called when fraud is proven (Improper Update or Double Update)
   */
  function _fail() internal override {
    // set contract to FAILED
    _setFailed();
    // slash Updater
    updaterManager.slashUpdater(payable(msg.sender));
    emit UpdaterSlashed(updater, msg.sender);
  }

  /**
   * @notice Internal utility function that combines
   * `_destination` and `_nonce`.
   * @dev Both destination and nonce should be less than 2^32 - 1
   * @param _destination Domain of destination chain
   * @param _nonce Current nonce for given destination chain
   * @return Returns (`_destination` << 32) & `_nonce`
   */
  function _destinationAndNonce(uint32 _destination, uint32 _nonce) internal pure returns (uint64) {
    return (uint64(_destination) << 32) | _nonce;
  }
}
