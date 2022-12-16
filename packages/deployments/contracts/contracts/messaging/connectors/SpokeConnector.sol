// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {TypedMemView} from "../../shared/libraries/TypedMemView.sol";
import {ExcessivelySafeCall} from "../../shared/libraries/ExcessivelySafeCall.sol";
import {TypeCasts} from "../../shared/libraries/TypeCasts.sol";

import {MerkleLib} from "../libraries/MerkleLib.sol";
import {Message} from "../libraries/Message.sol";
import {RateLimited} from "../libraries/RateLimited.sol";

import {MerkleTreeManager} from "../MerkleTreeManager.sol";
import {WatcherClient} from "../WatcherClient.sol";

import {Connector, ProposedOwnable} from "./Connector.sol";
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
 */
abstract contract SpokeConnector is Connector, ConnectorManager, WatcherClient, RateLimited, ReentrancyGuard {
  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using Message for bytes29;

  // ============ Events ============

  event SenderAdded(address sender);

  event SenderRemoved(address sender);

  event AggregateRootReceived(bytes32 root);

  event AggregateRootRemoved(bytes32 root);

  event AggregateRootVerified(bytes32 indexed root);

  event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);

  event Process(bytes32 leaf, bool success, bytes returnData);

  event DelayBlocksUpdated(uint256 indexed updated, address caller);

  /**
   * @notice Emitted when funds are withdrawn by the admin
   * @dev See comments in `withdrawFunds`
   * @param to The recipient of the funds
   * @param amount The amount withdrawn
   */
  event FundsWithdrawn(address indexed to, uint256 amount);

  event MessageProven(bytes32 indexed leaf, bytes32 indexed aggregateRoot, uint256 aggregateIndex);

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
   * @notice Number of blocks to delay the processing of a message to allow for watchers to verify
   * the validity and pause if necessary.
   */
  uint256 public delayBlocks;

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
   * @notice This will hold the commit block for incoming aggregateRoots from the hub chain. Once
   * they are verified, (i.e. have surpassed the verification period in `delayBlocks`) they can
   * be used for proving inclusion of crosschain messages.
   *
   * @dev NOTE: A commit block of 0 should be considered invalid (it is an empty entry in the
   * mapping). We must ALWAYS ensure the value is not 0 before checking whether it has surpassed the
   * verification period.
   */
  mapping(bytes32 => uint256) public pendingAggregateRoots;

  /**
   * @notice This tracks the roots of the aggregate tree containing outbound roots from all other
   * supported domains. The current version is the one that is known to be past the delayBlocks
   * time period.
   * @dev This root is the root of the tree that is aggregated on mainnet (composed of all the roots
   * of previous trees).
   */
  mapping(bytes32 => bool) public provenAggregateRoots;

  /**
   * @notice This tracks whether the root has been proven to exist within the given aggregate root.
   * @dev Tracking this is an optimization so you dont have to prove inclusion of the same constituent
   * root many times.
   */
  mapping(bytes32 => bool) public provenMessageRoots;

  /**
   * @notice This mapping records all message roots that have already been sent in order to prevent
   * redundant message roots from being sent to hub.
   */
  mapping(bytes32 => bool) public sentMessageRoots;

  /**
   * @dev This is used for the `onlyAllowlistedSender` modifier, which gates who
   * can send messages using `dispatch`.
   */
  mapping(address => bool) public allowlistedSenders;

  /**
   * @notice domain => next available nonce for the domain.
   */
  mapping(uint32 => uint32) public nonces;

  /**
   * @notice Mapping of message leaves to MessageStatus, keyed on leaf.
   */
  mapping(bytes32 => MessageStatus) public messages;

  // ============ Modifiers ============

  modifier onlyAllowlistedSender() {
    require(allowlistedSenders[msg.sender], "!allowlisted");
    _;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new SpokeConnector instance.
   * @param _domain The domain this connector lives on.
   * @param _mirrorDomain The hub domain.
   * @param _amb The address of the AMB on the spoke domain this connector lives on.
   * @param _rootManager The address of the RootManager on the hub.
   * @param _mirrorConnector The address of the spoke connector.
   * @param _processGas The gas costs used in `handle` to ensure meaningful state changes can occur (minimum gas needed
   * to handle transaction).
   * @param _reserveGas The gas costs reserved when `handle` is called to ensure failures are handled.
   * @param _delayBlocks The delay for the validation period for incoming messages in blocks.
   * @param _merkle The address of the MerkleTreeManager on this spoke domain.
   * @param _watcherManager The address of the WatcherManager to whom this connector is a client.
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    ConnectorManager()
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector)
    WatcherClient(_watcherManager)
  {
    // Sanity check: constants are reasonable.
    require(_processGas > 850_000 - 1, "!process gas");
    require(_reserveGas > 15_000 - 1, "!reserve gas");
    PROCESS_GAS = _processGas;
    RESERVE_GAS = _reserveGas;

    require(_merkle != address(0), "!zero merkle");
    MERKLE = MerkleTreeManager(_merkle);

    delayBlocks = _delayBlocks;
  }

  // ============ Admin Functions ============

  /**
   * @notice Adds a sender to the allowlist.
   * @dev Only allowlisted routers (senders) can call `dispatch`.
   */
  function addSender(address _sender) public onlyOwner {
    allowlistedSenders[_sender] = true;
    emit SenderAdded(_sender);
  }

  /**
   * @notice Removes a sender from the allowlist.
   * @dev Only allowlisted routers (senders) can call `dispatch`.
   */
  function removeSender(address _sender) public onlyOwner {
    delete allowlistedSenders[_sender];
    emit SenderRemoved(_sender);
  }

  /**
   * @notice Set the `delayBlocks`, the period in blocks over which an incoming message
   * is verified.
   */
  function setDelayBlocks(uint256 _delayBlocks) public onlyOwner {
    require(_delayBlocks != delayBlocks, "!delayBlocks");
    emit DelayBlocksUpdated(_delayBlocks, msg.sender);
    delayBlocks = _delayBlocks;
  }

  /**
   * @notice Set the rate limit (number of blocks) at which we can send messages from
   * this contract to the hub chain using the `send` method.
   * @dev Rate limit is used to mitigate DoS vectors. (See `RateLimited` for more info.)
   * @param _rateLimit The number of blocks require between sending messages. If set to
   * 0, rate limiting for this spoke connector will be disabled.
   */
  function setRateLimitBlocks(uint256 _rateLimit) public onlyOwner {
    _setRateLimitBlocks(_rateLimit);
  }

  /**
   * @notice Manually remove a pending aggregateRoot by owner if the contract is paused.
   * @dev This method is required for handling fraud cases in the current construction.
   * @param _fraudulentRoot Target fraudulent root that should be erased from the
   * `pendingAggregateRoots` mapping.
   */
  function removePendingAggregateRoot(bytes32 _fraudulentRoot) public onlyOwner whenPaused {
    // Sanity check: pending aggregate root exists.
    require(pendingAggregateRoots[_fraudulentRoot] != 0, "aggregateRoot !exists");
    delete pendingAggregateRoots[_fraudulentRoot];
    emit AggregateRootRemoved(_fraudulentRoot);
  }

  /**
   * @notice This function should be callable by owner, and send funds trapped on
   * a connector to the provided recipient.
   * @dev Withdraws the entire balance of the contract.
   *
   * @param _to The recipient of the funds withdrawn
   */
  function withdrawFunds(address _to) public onlyOwner {
    uint256 amount = address(this).balance;
    Address.sendValue(payable(_to), amount);
    emit FundsWithdrawn(_to, amount);
  }

  /**
   * @notice Remove ability to renounce ownership
   * @dev Renounce ownership should be impossible as long as it is impossible in the
   * WatcherClient, and as long as only the owner can remove pending roots in case of
   * fraud.
   */
  function renounceOwnership() public virtual override(ProposedOwnable, WatcherClient) onlyOwner {}

  // ============ Public Functions ============

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
  function send(bytes memory _encodedData) external payable whenNotPaused rateLimited {
    bytes32 root = MERKLE.root();
    require(sentMessageRoots[root] == false, "root already sent");
    bytes memory _data = abi.encodePacked(root);
    _sendMessage(_data, _encodedData);
    sentMessageRoots[root] = true;
    emit MessageSent(_data, _encodedData, msg.sender);
  }

  /**
   * @notice This function adds transfers to the outbound transfer merkle tree.
   * @dev The root of this tree will eventually be dispatched to mainnet via `send`. On mainnet (the "hub"),
   * it will be combined into a single aggregate root by RootManager (along with outbound roots from other
   * chains). This aggregate root will be redistributed to all destination chains.
   *
   * NOTE: okay to leave dispatch operational when paused as pause is designed for crosschain interactions
   */
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external onlyAllowlistedSender returns (bytes32, bytes memory) {
    // Get the next nonce for the destination domain, then increment it.
    uint32 _nonce = nonces[_destinationDomain]++;

    // Format the message into packed bytes.
    bytes memory _message = Message.formatMessage(
      DOMAIN,
      TypeCasts.addressToBytes32(msg.sender),
      _nonce,
      _destinationDomain,
      _recipientAddress,
      _messageBody
    );

    // Insert the hashed message into the Merkle tree.
    bytes32 _messageHash = keccak256(_message);

    // Returns the root calculated after insertion of message, needed for events for
    // watchers
    (bytes32 _root, uint256 _count) = MERKLE.insert(_messageHash);

    // Emit Dispatch event with message information.
    // NOTE: Current leaf index is count - 1 since new leaf has already been inserted.
    emit Dispatch(_messageHash, _count - 1, _root, _message);
    return (_messageHash, _message);
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
   * @param _aggregateRoot The target aggregate root we want to prove inclusion for. This root must have
   * already been delivered to this spoke connector contract and surpassed the validation period.
   * @param _aggregatePath Merkle path of inclusion for the inbound root.
   * @param _aggregateIndex Index of the inbound root in the aggregator's merkle tree in the hub.
   */
  function proveAndProcess(
    Proof[] calldata _proofs,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex
  ) external whenNotPaused nonReentrant {
    // Sanity check: proofs are included.
    require(_proofs.length > 0, "!proofs");

    // Optimization: calculate the inbound root for the first message in the batch and validate that
    // it's included in the aggregator tree. We can use this as a reference for every calculation
    // below to minimize storage access calls.
    bytes32 _messageHash = keccak256(_proofs[0].message);
    // TODO: Could use an array of sharedRoots so you can submit a message batch of messages with
    // different origins.
    bytes32 _messageRoot = calculateMessageRoot(_messageHash, _proofs[0].path, _proofs[0].index);

    // Handle proving this message root is included in the target aggregate root.
    proveMessageRoot(_messageRoot, _aggregateRoot, _aggregatePath, _aggregateIndex);
    // Assuming the inbound message root was proven, the first message is now considered proven.
    messages[_messageHash] = MessageStatus.Proven;

    // Now we handle proving all remaining messages in the batch - they should all share the same
    // inbound root!
    uint256 len = _proofs.length;
    for (uint32 i = 1; i < len; ) {
      _messageHash = keccak256(_proofs[i].message);
      bytes32 _calculatedRoot = calculateMessageRoot(_messageHash, _proofs[i].path, _proofs[i].index);
      // Make sure this root matches the validated inbound root.
      require(_calculatedRoot == _messageRoot, "!sharedRoot");
      // Message is proven!
      messages[_messageHash] = MessageStatus.Proven;

      unchecked {
        ++i;
      }
    }

    // All messages have been proven. We iterate separately here to process each message in the batch.
    // NOTE: Going through the proving phase for all messages in the batch BEFORE processing ensures
    // we hit reverts before we consume unbounded gas from `process` calls.
    for (uint32 i = 0; i < len; ) {
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
  function receiveAggregateRoot(bytes32 _newRoot) internal {
    require(_newRoot != bytes32(""), "new root empty");
    require(pendingAggregateRoots[_newRoot] == 0, "root already pending");
    require(!provenAggregateRoots[_newRoot], "root already proven");

    pendingAggregateRoots[_newRoot] = block.number;
    emit AggregateRootReceived(_newRoot);
  }

  /**
   * @notice Checks whether the given aggregate root has surpassed the verification period.
   * @dev Reverts if the given aggregate root is invalid (does not exist) OR has not surpassed
   * verification period.
   * @dev If the target aggregate root is pending and HAS surpassed the verification period, then we will
   * move it over to the proven mapping.
   * @param _aggregateRoot Target aggregate root to verify.
   */
  function verifyAggregateRoot(bytes32 _aggregateRoot) internal {
    // 0. Sanity check: root is not 0.
    require(_aggregateRoot != bytes32(""), "aggregateRoot empty");

    // 1. Check to see if the target *aggregate* root has already been proven.
    if (provenAggregateRoots[_aggregateRoot]) {
      return; // Short circuit if this root is proven.
    }

    // 2. The target aggregate root must be pending. Aggregate root commit block entry MUST exist.
    uint256 _aggregateRootCommitBlock = pendingAggregateRoots[_aggregateRoot];
    require(_aggregateRootCommitBlock != 0, "aggregateRoot !exist");

    // 3. Pending aggregate root has surpassed the `delayBlocks` verification period.
    require(block.number - _aggregateRootCommitBlock >= delayBlocks, "aggregateRoot !verified");

    // 4. The target aggregate root has surpassed verification period, we can move it over to the
    // proven mapping.
    provenAggregateRoots[_aggregateRoot] = true;
    emit AggregateRootVerified(_aggregateRoot);
    // May as well delete the pending aggregate root entry for the gas refund: it should no longer
    // be needed.
    delete pendingAggregateRoots[_aggregateRoot];
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
   * @notice Prove an inbound message root from another chain is included in the target aggregateRoot.
   * @param _messageRoot The message root we want to verify.
   * @param _aggregateRoot The target aggregate root we want to prove inclusion for. This root must have
   * already been delivered to this spoke connector contract and surpassed the validation period.
   * @param _aggregatePath Merkle path of inclusion for the inbound root.
   * @param _aggregateIndex Index of the inbound root in the aggregator's merkle tree in the hub.
   */
  function proveMessageRoot(
    bytes32 _messageRoot,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex
  ) internal {
    // 0. Check to see if the root for this batch has already been proven.
    if (provenMessageRoots[_messageRoot]) {
      // NOTE: It seems counter-intuitive, but we do NOT need to prove the given `_aggregateRoot` param
      // is valid IFF the `_messageRoot` has already been proven; we know that the `_messageRoot` has to
      // have been included in *some* proven aggregate root historically.
      return;
    }

    // 1. Ensure aggregate root has been proven.
    verifyAggregateRoot(_aggregateRoot);

    // 2. Calculate an aggregate root, given this inbound root (as leaf), path (proof), and index.
    bytes32 _calculatedAggregateRoot = MerkleLib.branchRoot(_messageRoot, _aggregatePath, _aggregateIndex);

    // 3. Check to make sure it matches the current aggregate root we have stored.
    require(_calculatedAggregateRoot == _aggregateRoot, "invalid inboundRoot");

    // This inbound root has been proven. We should specify that to optimize future calls.
    provenMessageRoots[_messageRoot] = true;
    emit MessageProven(_messageRoot, _aggregateRoot, _aggregateIndex);
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
  function process(bytes memory _message) internal returns (bool _success) {
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
    require(gasleft() > PROCESS_GAS + RESERVE_GAS - 1, "!gas");
    // get the message recipient
    address _recipient = _m.recipientAddress();
    // set up for assembly call
    uint256 _gas = PROCESS_GAS;
    uint16 _maxCopy = 256;
    // allocate memory for returndata
    bytes memory _returnData = new bytes(_maxCopy);
    bytes memory _calldata = abi.encodeWithSignature(
      "handle(uint32,uint32,bytes32,bytes)",
      _m.origin(),
      _m.nonce(),
      _m.sender(),
      _m.body().clone()
    );

    (_success, _returnData) = ExcessivelySafeCall.excessivelySafeCall(_recipient, _gas, 0, _maxCopy, _calldata);

    // emit process results
    emit Process(_messageHash, _success, _returnData);
  }
}
