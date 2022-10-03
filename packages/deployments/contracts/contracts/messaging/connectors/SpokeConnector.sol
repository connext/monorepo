// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import {TypedMemView} from "../../shared/libraries/TypedMemView.sol";

import {MerkleLib} from "../libraries/Merkle.sol";
import {Message} from "../libraries/Message.sol";
import {OptimisticallyVerified} from "../libraries/OptimisticallyVerified.sol";

import {MerkleTreeManager} from "../Merkle.sol";
import {WatcherClient} from "../WatcherClient.sol";

import {Connector} from "./Connector.sol";
import {ConnectorManager} from "./ConnectorManager.sol";

/**
 * @title SpokeConnector
 * @author Connext Labs, Inc.
 * @notice This contract implements the messaging functions needed on the spoke-side of a given AMB.
 * The SpokeConnector extends the HubConnector functionality by being able to send, store, and prove
 * messages.
 *
 * @dev If you are deploying this contract to mainnet, then the mirror values stored in the HubConnector
 * will be unused
 *
 * TODO: what about the queue manager? see Home.sol for context
 */
abstract contract SpokeConnector is
  Connector,
  ConnectorManager,
  WatcherClient,
  ReentrancyGuard,
  OptimisticallyVerified
{
  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using Message for bytes29;

  // ============ Events ============

  event SenderAdded(address sender);

  event SenderRemoved(address sender);

  event AggregateRootsUpdated(bytes32 current, bytes32 pending);

  event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);

  event Process(bytes32 leaf, bool success, bytes returnData);

  // ============ Structs ============

  // Status of Message:
  //   0 - None - message has not been proven or processed
  //   1 - Proven - message inclusion proof has been validated
  //   2 - Processed - message has been dispatched to recipient
  enum MessageStatus {
    None,
    Proven,
    Processed
  }

  /**
   * Struct for submitting a proof for a given message. Used in `proveAndProcess` below.
   * @param message Bytes of message to be processed. The hash of this message is considered the leaf.
   * @param proof Merkle proof of inclusion for given leaf.
   * @param index Index of leaf in home's merkle tree.
   */
  struct Proof {
    bytes message;
    bytes32[32] path;
    uint256 index;
  }

  // ============ Public Storage ============

  /**
   * @notice MerkleTreeManager contract instance. Will hold the active tree of message hashes, whose root
   * will be sent crosschain to the hub for aggregation and redistribution.
   */
  MerkleTreeManager public immutable MERKLE;

  /**
   * @notice Minimum gas for processing a received message (reserved for handle)
   */
  uint256 public immutable PROCESS_GAS;

  /**
   * @notice Reserved gas (to ensure tx completes in case message processing runs out)
   */
  uint256 public immutable RESERVE_GAS;

  /**
   * @notice Number of blocks to delay the processing of a message to allow for watchers to verify
   * the validity and pause if necessary.
   */
  uint256 public delayBlocks;

  /**
   * @notice This tracks the root of the tree containing outbound roots from all other supported
   * domains. The "current" version is the one that is known to be past the delayBlocks time period.
   * @dev This root is the root of the tree that is aggregated on mainnet (composed of all the roots
   * of previous trees)
   */
  bytes32 public aggregateRootCurrent;

  /**
   * @notice This is the "pending" aggregate root which is stored to allow a second root to be passing through
   * the delayBlocks window while the current root is confirmed.
   */
  bytes32 public aggregateRootPending;

  /**
   * @notice This is the block number at which the pending aggregate root was set.
   * @dev This is used to determine when the pending aggregate root can be confirmed.
   */
  uint256 public aggregateRootPendingBlock;

  /**
   * @notice This tracks whether the root has been proven to exist within the given aggregate root
   * @dev Tracking this is an optimization so you dont have to prove inclusion of the same constituent
   * root many times
   */
  mapping(bytes32 => bool) public provenRoots;

  /**
   * @dev This is used for the `onlyWhitelistedSender` modifier, which gates who
   * can send messages using `dispatch`
   */
  mapping(address => bool) public whitelistedSenders;

  /**
   * @notice domain => next available nonce for the domain
   */
  mapping(uint32 => uint32) public nonces;

  /**
   * @notice Mapping of message leaves to MessageStatus, keyed on leaf
   */
  mapping(bytes32 => MessageStatus) public messages;

  /**
   * @notice Boolean indicating if the connector has been paused by a watcher.
   */
  bool private watcherPaused;

  // ============ Modifiers ============

  modifier onlyWhitelistedSender() {
    require(whitelistedSenders[msg.sender], "!whitelisted");
    _;
  }

  /**
   * @notice Modifier to check if the connector is paused by a watcher.
   */
  modifier onlyUnpaused() {
    require(!watcherPaused, "!unpaused");
    _;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new SpokeConnector instance.
   * @param _domain The domain this connector lives on.
   * @param _mirrorDomain The hub domain.
   * @param _amb The address of the AMB on the spoke domain this connector lives on.
   * @param _rootManager The address of the RootManager on the hub.
   * @param _merkle The address of the MerkleTreeManager on this spoke domain.
   * @param _mirrorConnector The address of the spoke connector.
   * @param _mirrorGas The gas costs required to process a message on mirror.
   * @param _processGas The gas costs used in `handle` to ensure meaningful state changes can occur (minimum gas needed
   * to handle transaction).
   * @param _reserveGas The gas costs reserved when `handle` is called to ensure failures are handled.
   * @param _validationDelay The delay for the validation period for incoming messages in blocks.
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    uint256 _validationDelay
  )
    ConnectorManager()
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas)
    WatcherClient(_watcherManager)
    OptimisticallyVerified(_validationDelay)
  {
    // Sanity check: constants are reasonable.
    require(_processGas >= 850_000, "!process gas");
    require(_reserveGas >= 15_000, "!reserve gas");
    PROCESS_GAS = _processGas;
    RESERVE_GAS = _reserveGas;

    require(_merkle != address(0), "!zero merkle");
    MERKLE = MerkleTreeManager(_merkle);

    delayBlocks = _delayBlocks;
  }

  // ============ Admin Functions ============

  /**
   * @notice Adds a sender to the whitelist
   * @dev Only whitelisted routers can call `dispatch`
   */
  function addSender(address _sender) public onlyOwner {
    whitelistedSenders[_sender] = true;
    emit SenderAdded(_sender);
  }

  /**
   * @notice Removes a sender from the whitelist
   * @dev Only whitelisted routers can call `dispatch`
   */
  function removeSender(address _sender) public onlyOwner {
    whitelistedSenders[_sender] = false;
    emit SenderRemoved(_sender);
  }

  /**
   * @notice Set the `watcherPaused` boolean
   * @dev This is only callable by a watcher, as set in the WatcherManager
   */
  function setWatcherPaused(bool paused) public onlyWatcher {
    require(watcherPaused != paused, "Already set");
    watcherPaused = paused;
  }

  /**
   * @notice Set the delayBlocks, in case this needs to be configured later
   */
  function setDelayBlocks(uint256 _delayBlocks) public onlyOwner {
    require(_delayBlocks != delayBlocks, "!delayBlocks");
    delayBlocks = _delayBlocks;
  }

  /**
   * @notice Set the aggregateRoots by owner if the contract is paused
   * @dev This required in case of fraud
   */
  function setAggregateRoots(bytes32 _current, bytes32 _pending) public onlyOwner {
    require(watcherPaused, "!paused");
    aggregateRootCurrent = _current;
    aggregateRootPending = _pending;
    emit AggregateRootsUpdated(_current, _pending);
  }

  // ============ Public Functions ============

  /**
   * @notice This is called by the watcher to update the aggregate root
   */
  function isPaused() external view returns (bool) {
    return watcherPaused;
  }

  /**
   * @notice This returns the root of all messages with the origin domain as this domain (i.e.
   * all outbound messages)
   */
  function outboundRoot() external view returns (bytes32) {
    return MERKLE.root();
  }

  /**
   * @notice This provides the implementation for what is defined in the ConnectorManager
   * to avoid storing the domain redundantly
   */
  function localDomain() external view override returns (uint32) {
    return DOMAIN;
  }

  /**
   * @notice This returns the root of all messages with the origin domain as this domain (i.e.
   * all outbound messages)
   */
  function send() external {
    bytes memory _data = abi.encodePacked(MERKLE.root());
    _sendMessage(_data);
    emit MessageSent(_data, msg.sender);
  }

  /**
   * @notice This function adds transfers to the outbound transfer merkle tree.
   * @dev The root of this tree will eventually be dispatched to mainnet via `send`. On mainnet (the "hub"),
   * it will be combined into a single aggregate root by RootManager (along with outbound roots from other
   * chains). This aggregate root will be redistributed to all destination chains.
   */
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external onlyWhitelistedSender returns (bytes32) {
    // Get the next nonce for the destination domain, then increment it.
    uint32 _nonce = nonces[_destinationDomain];
    nonces[_destinationDomain] = _nonce + 1;

    // Format the message into packed bytes.
    bytes memory _message = Message.formatMessage(
      DOMAIN,
      bytes32(uint256(uint160(msg.sender))), // TODO necessary?
      _nonce,
      _destinationDomain,
      _recipientAddress,
      _messageBody
    );

    // Insert the hashed message into the Merkle tree.
    bytes32 _messageHash = keccak256(_message);
    (bytes32 _root, uint256 _count) = MERKLE.insert(_messageHash);

    // TODO: see comment on queue manager at the top
    // Emit Dispatch event with message information.
    // NOTE: Current leaf index is count - 1 since new leaf has already been inserted.
    emit Dispatch(_messageHash, _count - 1, _root, _message);
    return _messageHash;
  }

  /**
   * @notice Must be able to call the `handle` function on the BridgeRouter contract. This is called
   * on the destination domain to handle incoming messages.
   *
   * Proving:
   * Calculates the expected inbound root from an origin chain given a leaf (message hash),
   * the index of the leaf, and the merkle proof of inclusion (path). Next, we check to ensure that this
   * calculated inbound root is included in the current aggregateRoot, given its index in the aggregator
   * tree and the proof of inclusion.
   *
   * Processing:
   * After all messages have been proven, we dispatch each message to Connext (BridgeRouter) for
   * execution.
   *
   * @dev Currently, ALL messages in a given batch must path to the same shared inboundRoot, meaning they
   * must all share an origin. See open TODO below for a potential solution to enable multi-origin batches.
   * @dev Intended to be called by the relayer at specific intervals during runtime.
   * @dev Will record a calculated root as having been proven if we've already proven that it was included
   * in the aggregateRoot.
   *
   * @param _proofs Batch of Proofs containing messages for proving/processing.
   * @param _aggregatorPath Merkle path of inclusion for the inbound root.
   * @param _aggregatorIndex Index of the inbound root in the aggregator's merkle tree in the hub.
   */
  function proveAndProcess(
    Proof[] calldata _proofs,
    bytes32[32] calldata _aggregatorPath,
    uint256 _aggregatorIndex
  ) external onlyUnpaused {
    // Sanity check: proofs are included.
    require(_proofs.length > 0, "!proofs");

    // Optimization: calculate the inbound root for the first message in the batch and validate that
    // it's included in the aggregator tree. We can use this as a reference for every calculation
    // below to minimize storage access calls.
    bytes32 _messageHash = keccak256(_proofs[0].message);
    // TODO: Could use an array of sharedRoots so you can submit a message batch of messages with
    // different origins.
    bytes32 _inboundRoot = calculateMessageRoot(_messageHash, _proofs[0].path, _proofs[0].index);

    // Check to see if the root for this batch has already been proven.
    if (!provenRoots[_inboundRoot]) {
      // TODO: If the updateAggregateRoot function hasnt been called for a while, we might be able
      // to prove against the pending root which is more recent.
      // TODO: Shouldn't we go ahead and move the pending aggregate root into current, in this case?
      // TODO: Optimization: allow caller to specify whether to try using the pending root (if enough time has elapsed)
      // or ignore this check! We really can't just pick which one to use willy-nilly - the given proof (aggregatorPath)
      // will only work with *one* root in particular.
      bytes32 _aggregateRoot = block.number > aggregateRootPendingBlock ? aggregateRootPending : aggregateRootCurrent;

      // Calculate an aggregate root, given this inbound root, and make sure it matches the current
      // aggregate root we have stored.
      bytes32 _calculatedAggregateRoot = MerkleLib.branchRoot(_inboundRoot, _aggregatorPath, _aggregatorIndex);
      require(_calculatedAggregateRoot == _aggregateRoot, "!aggregateRoot");
      // This inbound root has been proven. We should specify that to optimize future calls.
      provenRoots[_inboundRoot] = true;
    }

    // Assuming the inbound root was proven, the first message is now proven.
    messages[_messageHash] = MessageStatus.Proven;

    // Now we handle proving all remaining messages in the batch - they should all share the same
    // inbound root!
    for (uint32 i = 1; i < _proofs.length; ) {
      _messageHash = keccak256(_proofs[i].message);
      bytes32 _calculatedRoot = calculateMessageRoot(_messageHash, _proofs[i].path, _proofs[i].index);
      // Make sure this root matches the validated inbound root.
      require(_calculatedRoot == _inboundRoot, "!sharedRoot");
      // Message is proven!
      messages[_messageHash] = MessageStatus.Proven;

      unchecked {
        ++i;
      }
    }

    // All messages have been proven. We iterate separately here to process each message in the batch.
    // NOTE: Going through the proving phase for all messages in the batch before processing ensures
    // we hit reverts before we consume gas from `process` calls.
    for (uint32 i = 0; i < _proofs.length; ) {
      process(_proofs[i].message);
      unchecked {
        ++i;
      }
    }
  }

  // ============ Private Functions ============

  /**
   * @notice This is either called by the Connector (AKA `this`) on the spoke (L2) chain after retrieving
   * latest `aggregateRoot` from the AMB (sourced from mainnet) OR called by the AMB directly.
   * @dev Must check the msg.sender on the origin chain to ensure only the root manager is passing
   * these roots.
   */
  function updateAggregateRoot(bytes32 _newRoot) internal {
    require(block.number > aggregateRootPendingBlock + delayBlocks, "!delayBlocks");
    aggregateRootCurrent = aggregateRootPending;
    aggregateRootPending = _newRoot;
    aggregateRootPendingBlock = block.number;
    emit AggregateRootsUpdated(aggregateRootCurrent, aggregateRootPending);
  }

  /**
   * @notice Checks whether a given message is valid. If so, calculates the expected inbound root from an
   * origin chain given a leaf (message hash), the index of the leaf, and the merkle proof of inclusion.
   * @dev Reverts if message's MessageStatus != None (i.e. if message was already proven or processed).
   *
   * @param _messageHash Leaf (message hash) that requires proving.
   * @param _messagePath Merkle path of inclusion for the leaf.
   * @param _messageIndex Index of leaf in the merkle tree on the origin chain of the message.
   * @return bytes32 Calculated root.
   **/
  function calculateMessageRoot(
    bytes32 _messageHash,
    bytes32[32] calldata _messagePath,
    uint256 _messageIndex
  ) internal view returns (bytes32) {
    // Ensure that the given message has not already been proven and processed.
    require(messages[_messageHash] == MessageStatus.None, "!MessageStatus.None");
    // Calculate the expected inbound root from the message origin based on the proof.
    // NOTE: Assuming a valid message was submitted with correct path/index, this should be an inbound root
    // that the hub has received. If the message were invalid, the root calculated here would not exist in the
    // aggregate root.
    return MerkleLib.branchRoot(_messageHash, _messagePath, _messageIndex);
  }

  /**
   * @notice Given formatted message, attempts to dispatch message payload to end recipient.
   * @dev Recipient must implement a `handle` method (refer to IMessageRecipient.sol)
   * Reverts if formatted message's destination domain is not the Replica's domain,
   * if message has not been proven,
   * or if not enough gas is provided for the dispatch transaction.
   * @param _message Formatted message
   * @return _success TRUE iff dispatch transaction succeeded
   */
  // TODO: Reentrancy
  function process(bytes memory _message) internal nonReentrant returns (bool _success) {
    bytes29 _m = _message.ref(0);
    // ensure message was meant for this domain
    require(_m.destination() == DOMAIN, "!destination");
    // ensure message has been proven
    bytes32 _messageHash = _m.keccak();
    require(messages[_messageHash] == MessageStatus.Proven, "!proven");
    // check re-entrancy guard
    // require(entered == 1, "!reentrant");
    // entered = 0;
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
  }
}
