// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import {IRootManager} from "./interfaces/IRootManager.sol";
import {IHubConnector} from "./interfaces/IHubConnector.sol";
import {QueueLib} from "./libraries/Queue.sol";
import {DomainIndexer} from "./libraries/DomainIndexer.sol";
import {SnapshotId} from "./libraries/SnapshotId.sol";

import {MerkleTreeManager} from "./MerkleTreeManager.sol";
import {WatcherClient} from "./WatcherClient.sol";

import {IHubSpokeConnector} from "./interfaces/IHubSpokeConnector.sol";

/**
 * @notice This contract exists at cluster hubs, and aggregates all transfer roots from messaging
 * spokes into a single merkle tree. Regularly broadcasts the root of the aggregator tree back out
 * to all the messaging spokes.
 */
contract RootManager is ProposedOwnable, IRootManager, WatcherClient, DomainIndexer {
  // ============ Libraries ============

  using QueueLib for QueueLib.Queue;

  // ============ Events ============

  event DelayBlocksUpdated(uint256 previous, uint256 updated);

  event DisputeBlocksUpdated(uint256 previous, uint256 updated);

  event MinDisputeBlocksUpdated(uint256 previous, uint256 updated);

  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  event RootDiscarded(bytes32 fraudulentRoot);

  /**
   * @notice Emitted when a new proposer is added
   * @param proposer The address of the proposer
   */
  event ProposerAdded(address indexed proposer);

  /**
   * @notice Emitted when a proposer is removed
   * @param proposer The address of the proposer
   */
  event ProposerRemoved(address indexed proposer);

  event ConnectorAdded(uint32 domain, address connector, uint32[] domains, address[] connectors);

  event ConnectorRemoved(uint32 domain, address connector, uint32[] domains, address[] connectors, address caller);

  event PropagateFailed(uint32 domain, address connector);

  /**
   * @notice Emitted when slow mode is activated
   * @param watcher The address of the watcher who called the function
   */
  event SlowModeActivated(address indexed watcher);

  /**
   * @notice Emitted when optimistic mode is activated
   */
  event OptimisticModeActivated();

  /**
   * @notice Emitted when a root is propagated
   * @dev It doesn't matter if the root was generated optimistically or on-chain.
   * @param aggregateRoot The aggregate root propagated
   * @param domainsHash The current domain hash
   */
  event AggregateRootPropagated(bytes32 indexed aggregateRoot, bytes32 domainsHash);

  /**
   * @notice Emitted when a new aggregate root is proposed
   * @param snapshotId The snapshot id
   * @param endOfDispute The block at which the dispute period is over
   * @param aggregateRoot The new aggregate root proposed
   * @param baseRoot The root of the tree before the snapshot roots were inserted by proposer
   * @param snapshotsRoots The list of roots added to aggregate tree
   * @param domains The list of all domains
   */
  event AggregateRootProposed(
    uint256 indexed snapshotId,
    uint256 endOfDispute,
    bytes32 indexed aggregateRoot,
    bytes32 indexed baseRoot,
    bytes32[] snapshotsRoots,
    uint32[] domains
  );

  /**
   * @notice Emitted when an aggregate root is added to the validAggregateRoots map during optimistic mode.
   * @param aggregateRoot The saved aggregate root
   * @param rootTimestamp The timestamp at which the aggregate root was saved.
   */
  event AggregateRootSavedOptimistic(bytes32 indexed aggregateRoot, uint256 rootTimestamp);

  /**
   * @notice Emitted when an aggregate root is added to the validAggregateRoots map during slow mode.
   * @param aggregateRoot   The saved aggregate root
   * @param leafCount       The new number of leaves in the tree.
   * @param aggregatedRoots The verified inbound roots inserted in the tree.
   * @param rootTimestamp   The timestamp at which the aggregate root was saved.
   */
  event AggregateRootSavedSlow(
    bytes32 indexed aggregateRoot,
    uint256 leafCount,
    bytes32[] aggregatedRoots,
    uint256 rootTimestamp
  );

  /**
   * @notice Emitted when a domain is set as the hub domain.
   * @param domain The domain set as hub domain.
   */
  event HubDomainSet(uint32 domain);

  /**
   * @notice Emitted when the previously set hub domain is cleared.
   */
  event HubDomainCleared();

  // ============ Errors ============

  error RootManager_proposeAggregateRoot__InvalidSnapshotId(uint256 snapshotId);

  error RootManager_checkDomains__InvalidDomains();

  error RootManager_finalize__InvalidAggregateRoot();

  error RootManager_onlyOptimisticMode__SlowModeOn();

  error RootManager_activateOptimisticMode__OptimisticModeOn();

  error RootManager_aggregate__OptimisticModeOn();

  error RootManager_proposeAggregateRoot__ProposeInProgress();

  error RootManager_finalize__ProposeInProgress();

  error RootManager_onlyProposer__NotWhitelistedProposer(address caller);

  error RootManager_sendRootToHub__NoMessageSent();

  error RootManager_finalize__InvalidInputHash();

  error RootManager_setMinDisputeBlocks__SameMinDisputeBlocksAsBefore();

  error RootManager_setDisputeBlocks__SameDisputeBlocksAsBefore();

  error RootManager_setDisputeBlocks__DisputeBlocksLowerThanMin();

  error RootManager_constructor__DisputeBlocksLowerThanMin();

  error RootManager__renounceOwnership_prohibited();

  error RootManager_propagate__AggregateRootIsZero();

  error RootManager_setHubDomain__InvalidDomain();

  // ============ Properties ============

  /**
   * @notice Maximum number of values to dequeue from the queue in one sitting (one call of `propagate`
   * or `dequeue`). Used to cap gas requirements.
   */
  uint128 public constant DEQUEUE_MAX = 100;

  /**
   * @notice Root used to keep the slots of proposedAggregateRootHash warm.
   */
  bytes32 public constant FINALIZED_HASH = 0x0000000000000000000000000000000000000000000000000000000000000001;
  /**
   * @notice Number of blocks to delay the processing of a message to allow for watchers to verify
   * the validity and pause if necessary.
   */
  uint256 public delayBlocks;

  /**
   * @notice The number of blocks watchers have to detect and invalidate the proposed root.
   */
  uint256 public disputeBlocks;

  /**
   * @notice The minimum number of blocks disputeBlocks can be set to.
   */
  uint256 public minDisputeBlocks;

  /**
   * @notice True if the system is working in optimistic mode. Otherwise is working in slow mode
   */
  bool public optimisticMode;

  /**
   * @notice The last aggregate root we propagated to spoke chains (mapping keyed on domain). Used to prevent sending redundant
   * aggregate roots in `propagate`.
   */
  mapping(uint32 => bytes32) public lastPropagatedRoot;

  /**
   * @notice Queue used for management of verification for inbound roots from spoke chains. Once
   * the verification period elapses, the inbound messages can be aggregated into the merkle tree
   * for propagation to spoke chains.
   * @dev Watchers should be able to watch this queue for fraudulent messages and pause this contract
   * if fraud is detected.
   */
  QueueLib.Queue public pendingInboundRoots;

  /**
   * @notice The resulting hash of keccaking the proposed aggregate root and the block at which its dispute ends.
   * @dev    Set to 0x1 to prevent someone from calling finalize() the moment the contract is deployed
   */
  bytes32 public proposedAggregateRootHash = 0x0000000000000000000000000000000000000000000000000000000000000001;

  /**
   * @notice MerkleTreeManager contract instance. Will hold the active tree of aggregated inbound roots.
   * The root of this tree will be distributed crosschain to all spoke domains.
   */
  MerkleTreeManager public immutable MERKLE;

  /**
   * @notice This is used for the `onlyProposers` modifier, which gates who
   * can propose new roots using `proposeAggregateRoot`.
   */
  mapping(address => bool) public allowlistedProposers;

  /**
   * @notice The list of valid aggregate roots for a given timestamp.
   * @dev Each time a new aggregate root is generated or
   * finalized, it will be added to this mapping using the block.timestamp as key.
   * @dev This is only used as Data-Availability for off-chain agents. Especially for the Watchers that fetch the
   * correct aggregate root from this contract in order to verify the data proposed on the Spoke Connectors.
   * @dev rootTimestamp => aggregateRoot
   */
  mapping(uint256 => bytes32) public validAggregateRoots;

  /**
   * @notice Timestamp of the last aggregate root saved.
   * @dev Used to ensure that the propagate function will send the latest aggregate root available.
   */
  uint256 public lastSavedAggregateRootTimestamp;

  /**
   * @notice Domain id of the current network
   */
  uint32 public hubDomain;

  // ============ Modifiers ============

  modifier onlyConnector(uint32 _domain) {
    require(getConnectorForDomain(_domain) == msg.sender, "!connector");
    _;
  }

  /**
   * @notice Checks if the proposed domains are valid
   */
  modifier checkDomains(uint32[] calldata _domains) {
    if (keccak256(abi.encode(_domains)) != domainsHash) revert RootManager_checkDomains__InvalidDomains();
    _;
  }

  /**
   * @notice Checks if root manager is working in optimistic mode
   */
  modifier onlyOptimisticMode() {
    if (!optimisticMode) revert RootManager_onlyOptimisticMode__SlowModeOn();
    _;
  }

  /**
   * @notice Checks if the proposer is in the allow list
   */
  modifier onlyProposer() {
    if (!allowlistedProposers[msg.sender]) revert RootManager_onlyProposer__NotWhitelistedProposer(msg.sender);
    _;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new RootManager instance.
   * @param _delayBlocks The delay for the validation period for incoming messages in blocks.
   * @param _merkle The address of the MerkleTreeManager on this domain.
   * @param _watcherManager The address of the WatcherManager on this domain.
   */
  constructor(
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    uint256 _minDisputeBlocks,
    uint256 _disputeBlocks
  ) ProposedOwnable() WatcherClient(_watcherManager) {
    _setOwner(msg.sender);
    if (_disputeBlocks < _minDisputeBlocks) revert RootManager_constructor__DisputeBlocksLowerThanMin();
    require(_merkle != address(0), "!zero merkle");
    MERKLE = MerkleTreeManager(_merkle);

    delayBlocks = _delayBlocks;
    minDisputeBlocks = _minDisputeBlocks;
    disputeBlocks = _disputeBlocks;

    // Initialize pending inbound root queue.
    pendingInboundRoots.initialize();
  }

  // ================ Getters ================

  function getPendingInboundRootsCount() public view returns (uint256) {
    return pendingInboundRoots.length();
  }

  /**
   * @notice Get the duration of the snapshot
   *
   * @return _snapshotDuration The duration of the snapshot
   */
  function getSnapshotDuration() external pure returns (uint256 _snapshotDuration) {
    _snapshotDuration = SnapshotId.SNAPSHOT_DURATION;
  }

  // ============ Admin Functions ============

  /**
   * @notice Adds a proposer to the allowlist.
   * @dev Only allowlisted proposers can call `proposeAggregateRoot`.
   */
  function addProposer(address _proposer) external onlyOwner {
    allowlistedProposers[_proposer] = true;
    emit ProposerAdded(_proposer);
  }

  /**
   * @notice Removes a proposer from the allowlist.
   * @dev Only allowlisted proposers can call `proposeAggregateRoot`.
   */
  function removeProposer(address _proposer) external onlyOwner {
    delete allowlistedProposers[_proposer];
    emit ProposerRemoved(_proposer);
  }

  /**
   * @notice Set the `minDisputeBlocks` variable to the provided parameter.
   */
  function setMinDisputeBlocks(uint256 _minDisputeBlocks) external onlyOwner {
    if (_minDisputeBlocks == minDisputeBlocks) revert RootManager_setMinDisputeBlocks__SameMinDisputeBlocksAsBefore();
    emit MinDisputeBlocksUpdated(minDisputeBlocks, _minDisputeBlocks);
    minDisputeBlocks = _minDisputeBlocks;
  }

  /**
   * @notice Set the `disputeBlocks`, the duration, in blocks, of the dispute process for
   * a given proposed root
   */
  function setDisputeBlocks(uint256 _disputeBlocks) external onlyOwner {
    if (_disputeBlocks < minDisputeBlocks) revert RootManager_setDisputeBlocks__DisputeBlocksLowerThanMin();
    if (_disputeBlocks == disputeBlocks) revert RootManager_setDisputeBlocks__SameDisputeBlocksAsBefore();
    emit DisputeBlocksUpdated(disputeBlocks, _disputeBlocks);
    disputeBlocks = _disputeBlocks;
  }

  /**
   * @notice Set the `delayBlocks`, the period in blocks over which an incoming message
   * is verified.
   */
  function setDelayBlocks(uint256 _delayBlocks) external onlyOwner {
    require(_delayBlocks != delayBlocks, "!delayBlocks");
    emit DelayBlocksUpdated(delayBlocks, _delayBlocks);
    delayBlocks = _delayBlocks;
  }

  /**
   * @notice Add a new supported domain and corresponding hub connector to the system. This new domain
   * will receive the propagated aggregate root.
   * @dev Only owner can add a new connector. Address should be the connector on L1.
   * @dev Cannot add address(0) to avoid duplicated domain in array and reduce gas fee while propagating.
   *
   * @param _domain The target spoke domain of the given connector.
   * @param _connector Address of the hub connector.
   */
  function addConnector(uint32 _domain, address _connector) external onlyOwner {
    addDomain(_domain, _connector);
    emit ConnectorAdded(_domain, _connector, domains, connectors);
  }

  /**
   * @notice Remove support for a connector and respective domain. That connector/domain will no longer
   * receive updates for the latest aggregate root.
   * @dev Only watcher can remove a connector.
   * @dev The proposedAggregateRootHash will be set to the FINALIZED_HASH.
   * TODO: Could add a metatx-able `removeConnectorWithSig` if we want to use relayers?
   *
   * @param _domain The spoke domain of the target connector we want to remove.
   */
  function removeConnector(uint32 _domain) external onlyWatcher {
    address _connector = removeDomain(_domain);
    proposedAggregateRootHash = FINALIZED_HASH;
    emit ConnectorRemoved(_domain, _connector, domains, connectors, msg.sender);
  }

  /**
   * @notice Removes (effectively blocklists) a given (fraudulent) root from the queue of pending
   * inbound roots.
   * @dev The given root does NOT have to currently be in the queue. It isn't removed from the queue
   * directly, but instead is filtered out when dequeuing is done for the sake of aggregation.
   * @dev Can only be called by the owner when the protocol is paused.
   *
   * @param _root The root to be discarded.
   */
  function discardRoot(bytes32 _root) external onlyOwner whenPaused {
    pendingInboundRoots.remove(_root);
    emit RootDiscarded(_root);
  }

  /**
   * @notice Remove ability to renounce ownership
   * @dev Renounce ownership should be impossible as long as watchers can freely remove connectors
   * and only the owner can add them back
   */
  function renounceOwnership() public virtual override(ProposedOwnable, WatcherClient) onlyOwner {
    revert RootManager__renounceOwnership_prohibited();
  }

  /**
   * @notice Sets domain corresponding to the hub domain.
   *
   * @param _domain The domain to be set as hub domain.
   */
  function setHubDomain(uint32 _domain) external onlyOwner {
    if (!isDomainSupported(_domain)) revert RootManager_setHubDomain__InvalidDomain();
    hubDomain = _domain;
    emit HubDomainSet(_domain);
  }

  /**
   * @notice Removes the domain associated with the hub domain.
   */
  function clearHubDomain() external onlyOwner {
    delete hubDomain;
    emit HubDomainCleared();
  }

  // ============ Public Functions ============

  /**
   * @notice Propose a new aggregate root
   * @dev snapshotId, snapshotRoots and domains are needed for validation and data availability for off-chain agents.
   * In the case of domains we need to check which are the current valid domains at the time of proposing.
   * This is gonna be used by the off-chain scripts to know which domains to check when validating each proposition.
   * This is to avoid problems if a new domain is added in the middle of an on-going propose.
   * Domains should be in the same order as they are in this contract.
   * Snapshot roots provided should be in order of insertion and should respect the domains order.
   *
   * @param _snapshotId The snapshot id used
   * @param _aggregateRoot The new aggregate root
   * @param _snapshotsRoots Array of snapshot roots inserted
   * @param _domains Array of all the domains
   */
  function proposeAggregateRoot(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    bytes32[] calldata _snapshotsRoots,
    uint32[] calldata _domains
  ) external onlyProposer onlyOptimisticMode checkDomains(_domains) whenNotPaused {
    if (_snapshotId != SnapshotId.getLastCompletedSnapshotId())
      revert RootManager_proposeAggregateRoot__InvalidSnapshotId(_snapshotId);
    if (proposedAggregateRootHash != FINALIZED_HASH) revert RootManager_proposeAggregateRoot__ProposeInProgress();

    uint256 _endOfDispute = block.number + disputeBlocks;
    proposedAggregateRootHash = keccak256(abi.encode(_aggregateRoot, _endOfDispute));

    emit AggregateRootProposed(_snapshotId, _endOfDispute, _aggregateRoot, MERKLE.root(), _snapshotsRoots, _domains);
  }

  /**
   * @notice Finalizes the proposed aggregate root. This makes the current proposed root the new validated and
   * ready to propagate root.
   * @dev The system has to be in optimistic mode and propose's dispute time over.
   * Finalized root will stop being monitored by off-chain agents.
   *
   * @param _proposedAggregateRoot The aggregate root currently proposed
   * @param _endOfDispute          The block in which the dispute period for proposedAggregateRootHash finalizes
   */
  function finalize(bytes32 _proposedAggregateRoot, uint256 _endOfDispute) public onlyOptimisticMode whenNotPaused {
    bytes32 _proposedAggregateRootHash = proposedAggregateRootHash;
    if (_proposedAggregateRootHash == FINALIZED_HASH) revert RootManager_finalize__InvalidAggregateRoot();
    bytes32 _userInputHash = keccak256(abi.encode(_proposedAggregateRoot, _endOfDispute));
    if (_userInputHash != _proposedAggregateRootHash) revert RootManager_finalize__InvalidInputHash();
    if (_endOfDispute > block.number) revert RootManager_finalize__ProposeInProgress();

    // Save data
    validAggregateRoots[block.timestamp] = _proposedAggregateRoot;
    lastSavedAggregateRootTimestamp = block.timestamp;

    // Clear the propose slot
    proposedAggregateRootHash = FINALIZED_HASH;

    emit AggregateRootSavedOptimistic(_proposedAggregateRoot, block.timestamp);
  }

  /**
   * @notice Unifies the flow of finalize and propagate.
   * @dev Should be called by relayers only when proposed root is ready to be finalized.
   *
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * used here to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _fees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   * @param _proposedAggregateRoot The aggregate root currently proposed
   * @param _endOfDispute          The block in which the dispute period for proposedAggregateRootHash finalizes
   */
  function finalizeAndPropagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData,
    bytes32 _proposedAggregateRoot,
    uint256 _endOfDispute
  ) external payable {
    finalize(_proposedAggregateRoot, _endOfDispute);
    propagate(_connectors, _fees, _encodedData);
  }

  /**
   * @notice This is called by relayers to take the current aggregate tree root and propagate it to all
   * spoke domains (via their respective hub connectors).
   * @dev Should be called by relayers at a regular interval.
   * Workflow is slightly different depending on the mode the system is in.
   *
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * used here to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _fees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   */
  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) public payable whenNotPaused {
    validateConnectors(_connectors);

    uint256 _numDomains = _connectors.length;
    // Sanity check: fees and encodedData lengths matches connectors length.
    require(_fees.length == _numDomains && _encodedData.length == _numDomains, "invalid lengths");

    // If in slow mode, we dequeue to ensure that we add the inboundRoots that are ready.
    if (!optimisticMode) dequeue();

    bytes32 _aggregateRoot = validAggregateRoots[lastSavedAggregateRootTimestamp];

    if (_aggregateRoot == 0) revert RootManager_propagate__AggregateRootIsZero();

    emit AggregateRootPropagated(_aggregateRoot, domainsHash);

    _sendRootToHubs(_aggregateRoot, _connectors, _fees, _encodedData);
  }

  /**
   * @notice Send an aggregate root to every connector.
   * @dev CRITICAL: This function does NOT check if _connectors sent to it are correct or not and can always be called internally.
   * All the needed checks must be done before calling this function.
   *
   * @param _aggregateRoot The aggregate root that needs to be sent to every connector.
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * used here to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _fees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   */
  function _sendRootToHubs(
    bytes32 _aggregateRoot,
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) internal {
    uint256 refund = msg.value;
    bool sent;
    for (uint32 i; i < _connectors.length; ) {
      // Sanity check: skip propagating a redundant aggregate root.
      bytes32 previous = lastPropagatedRoot[domains[i]];
      if (previous == _aggregateRoot) {
        unchecked {
          ++i;
        }
        continue;
      }

      // Try to send the message with appropriate encoded data and fees
      // Continue on revert, but emit an event
      try
        IHubConnector(_connectors[i]).sendMessage{value: _fees[i]}(abi.encodePacked(_aggregateRoot), _encodedData[i])
      {
        // NOTE: This will ensure there is sufficient msg.value for all fees before calling `sendMessage`
        // This will revert as soon as there are insufficient fees for call i, even if call n > i has
        // sufficient budget, this function will revert
        refund -= _fees[i];
        // mark that the message was sent
        sent = true;
        // Set the last propagated root
        lastPropagatedRoot[domains[i]] = _aggregateRoot;
      } catch {
        emit PropagateFailed(domains[i], _connectors[i]);
      }

      unchecked {
        ++i;
      }
    }

    // Ensure *a* message was sent to prevent excess relayer spend
    if (!sent) {
      revert RootManager_sendRootToHub__NoMessageSent();
    }

    // Refund caller
    if (refund > 0) {
      Address.sendValue(payable(msg.sender), refund);
    }
  }

  /**
   * @notice Sends the latest valid aggregate root to the hub domain's spoke connector.
   * @dev This has no guards as the guards should be in the spoke connector. For example, the spoke connector should
   *      guard against receiving the root through this function if the spoke connector is not in optimistic mode.
   */
  function sendRootToHubSpoke() external whenNotPaused {
    bytes32 _aggregateRoot = validAggregateRoots[lastSavedAggregateRootTimestamp];
    IHubSpokeConnector(getConnectorForDomain(hubDomain)).saveAggregateRoot(_aggregateRoot);
  }

  /**
   * @notice Accept an inbound root coming from a given domain's hub connector, enqueuing this incoming
   * root into the current queue as it awaits the verification period.
   * @dev The aggregate tree's root, which will include this inbound root, will be propagated to all spoke
   * domains (via `propagate`) on a regular basis assuming the verification period is surpassed without
   * dispute.
   *
   * @param _domain The source domain of the given root.
   * @param _inbound The inbound root coming from the given domain.
   */
  function aggregate(uint32 _domain, bytes32 _inbound) external whenNotPaused onlyConnector(_domain) {
    if (optimisticMode) revert RootManager_aggregate__OptimisticModeOn();
    uint128 lastIndex = pendingInboundRoots.enqueue(_inbound);
    emit RootReceived(_domain, _inbound, lastIndex);
  }

  /**
   * @notice Dequeue verified inbound roots and insert them into the aggregator tree.
   * @dev Will dequeue a fixed maximum amount of roots to prevent out of gas errors. As such, this
   * method is public and separate from `propagate` so we can curtail an overloaded queue as needed.
   *
   * @return bytes32 The new aggregate root.
   * @return uint256 The updated count (number of leaves).
   */
  function dequeue() public whenNotPaused returns (bytes32, uint256) {
    // Get all of the verified roots from the queue.
    bytes32[] memory _verifiedInboundRoots = pendingInboundRoots.dequeueVerified(delayBlocks, DEQUEUE_MAX);

    // If there's nothing dequeued, just return the root and count.
    if (_verifiedInboundRoots.length == 0) {
      return MERKLE.rootAndCount();
    }

    // Insert the leaves into the aggregator tree (method will also calculate and return the current
    // aggregate root and count).
    (bytes32 _aggregateRoot, uint256 _count) = MERKLE.insert(_verifiedInboundRoots);

    validAggregateRoots[block.timestamp] = _aggregateRoot;
    lastSavedAggregateRootTimestamp = block.timestamp;

    emit AggregateRootSavedSlow(_aggregateRoot, _count, _verifiedInboundRoots, block.timestamp);

    return (_aggregateRoot, _count);
  }

  /**
   * @notice Watcher can set the system in slow mode.
   * @dev Sets the proposed aggregate root hash to FINALIZED_HASH, invalidating it.
   */
  function activateSlowMode() external onlyWatcher onlyOptimisticMode {
    optimisticMode = false;

    proposedAggregateRootHash = FINALIZED_HASH;
    emit SlowModeActivated(msg.sender);
  }

  /**
   * @notice Owner can set the system to optimistic mode.
   * @dev Elements in the queue will be discarded.
   * To save gas we are not deleting the elements from the queue, but moving the last counter to first - 1
   * so we can reassign new elements to those positions in the future.
   * Discarded roots will be included on the upcoming optimistic aggregateRoot.
   */
  function activateOptimisticMode() external onlyOwner {
    if (optimisticMode) revert RootManager_activateOptimisticMode__OptimisticModeOn();

    pendingInboundRoots.last = pendingInboundRoots.first - 1;

    optimisticMode = true;
    emit OptimisticModeActivated();
  }
}
