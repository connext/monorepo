// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import {IRootManager} from "./interfaces/IRootManager.sol";
import {IHubConnector} from "./interfaces/IHubConnector.sol";
import {QueueLib} from "./libraries/Queue.sol";
import {DomainIndexer} from "./libraries/DomainIndexer.sol";

import {MerkleTreeManager} from "./MerkleTreeManager.sol";
import {WatcherClient} from "./WatcherClient.sol";

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

  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  event RootsAggregated(bytes32 aggregateRoot, uint256 count, bytes32[] aggregatedMessageRoots);

  event RootPropagated(bytes32 aggregateRoot, uint256 count, bytes32 domainsHash);

  event RootDiscarded(bytes32 fraudulentRoot);

  event ConnectorAdded(uint32 domain, address connector, uint32[] domains, address[] connectors);

  event ConnectorRemoved(uint32 domain, address connector, uint32[] domains, address[] connectors, address caller);

  event PropagateFailed(uint32 domain, address connector);

  // ============ Properties ============

  /**
   * @notice Maximum number of values to dequeue from the queue in one sitting (one call of `propagate`
   * or `dequeue`). Used to cap gas requirements.
   */
  uint128 public constant DEQUEUE_MAX = 100;

  /**
   * @notice Number of blocks to delay the processing of a message to allow for watchers to verify
   * the validity and pause if necessary.
   */
  uint256 public delayBlocks;

  /**
   * @notice Queue used for management of verification for inbound roots from spoke chains. Once
   * the verification period elapses, the inbound messages can be aggregated into the merkle tree
   * for propagation to spoke chains.
   * @dev Watchers should be able to watch this queue for fraudulent messages and pause this contract
   * if fraud is detected.
   */
  QueueLib.Queue public pendingInboundRoots;

  /**
   * @notice The last aggregate root we propagated to spoke chains. Used to prevent sending redundant
   * aggregate roots in `propagate`.
   */
  bytes32 public lastPropagatedRoot;

  /**
   * @notice MerkleTreeManager contract instance. Will hold the active tree of aggregated inbound roots.
   * The root of this tree will be distributed crosschain to all spoke domains.
   */
  MerkleTreeManager public immutable MERKLE;

  // ============ Modifiers ============

  modifier onlyConnector(uint32 _domain) {
    require(getConnectorForDomain(_domain) == msg.sender, "!connector");
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
    address _watcherManager
  ) ProposedOwnable() WatcherClient(_watcherManager) {
    _setOwner(msg.sender);

    require(_merkle != address(0), "!zero merkle");
    MERKLE = MerkleTreeManager(_merkle);

    delayBlocks = _delayBlocks;

    // Initialize pending inbound root queue.
    pendingInboundRoots.initialize();
  }

  // ================ Getters ================

  function getPendingInboundRootsCount() public view returns (uint256) {
    return pendingInboundRoots.length();
  }

  // ============ Admin Functions ============

  /**
   * @notice Set the `delayBlocks`, the period in blocks over which an incoming message
   * is verified.
   */
  function setDelayBlocks(uint256 _delayBlocks) public onlyOwner {
    require(_delayBlocks != delayBlocks, "!delayBlocks");
    emit DelayBlocksUpdated(_delayBlocks, delayBlocks);
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
   * TODO: Could add a metatx-able `removeConnectorWithSig` if we want to use relayers?
   *
   * @param _domain The spoke domain of the target connector we want to remove.
   */
  function removeConnector(uint32 _domain) public onlyWatcher {
    address _connector = removeDomain(_domain);
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
  function discardRoot(bytes32 _root) public onlyOwner whenPaused {
    pendingInboundRoots.remove(_root);
    emit RootDiscarded(_root);
  }

  /**
   * @notice Remove ability to renounce ownership
   * @dev Renounce ownership should be impossible as long as watchers can freely remove connectors
   * and only the owner can add them back
   */
  function renounceOwnership() public virtual override(ProposedOwnable, WatcherClient) onlyOwner {}

  // ============ Public Functions ============

  /**
   * @notice This is called by relayers to take the current aggregate tree root and propagate it to all
   * spoke domains (via their respective hub connectors).
   * @dev Should be called by relayers at a regular interval.
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
  ) external payable whenNotPaused {
    validateConnectors(_connectors);

    uint256 _numDomains = _connectors.length;
    // Sanity check: fees and encodedData lengths matches connectors length.
    require(_fees.length == _numDomains && _encodedData.length == _numDomains, "invalid lengths");

    // Dequeue verified roots from the queue and insert into the tree.
    (bytes32 _aggregateRoot, uint256 _count) = dequeue();

    // Sanity check: make sure we are not propagating a redundant aggregate root.
    require(_aggregateRoot != lastPropagatedRoot, "redundant root");
    lastPropagatedRoot = _aggregateRoot;

    uint256 sum = msg.value;
    for (uint32 i; i < _numDomains; ) {
      // Try to send the message with appropriate encoded data and fees
      // Continue on revert, but emit an event
      try
        IHubConnector(_connectors[i]).sendMessage{value: _fees[i]}(abi.encodePacked(_aggregateRoot), _encodedData[i])
      {
        // NOTE: This will ensure there is sufficient msg.value for all fees before calling `sendMessage`
        // This will revert as soon as there are insufficient fees for call i, even if call n > i has
        // sufficient budget, this function will revert
        sum -= _fees[i];
      } catch {
        emit PropagateFailed(domains[i], _connectors[i]);
      }

      unchecked {
        ++i;
      }
    }

    emit RootPropagated(_aggregateRoot, _count, domainsHash);
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
    uint128 lastIndex = pendingInboundRoots.enqueue(_inbound);
    emit RootReceived(_domain, _inbound, lastIndex);
  }

  /**
   * @notice Dequeue verified inbound roots and insert them into the aggregator tree.
   * @dev Will dequeue a fixed maximum amount of roots to prevent out of gas errors. As such, this
   * method is public and separate from `propagate` so we can curtail an overloaded queue as needed.
   * @dev Reverts if no verified inbound roots are found.
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

    emit RootsAggregated(_aggregateRoot, _count, _verifiedInboundRoots);

    return (_aggregateRoot, _count);
  }
}
