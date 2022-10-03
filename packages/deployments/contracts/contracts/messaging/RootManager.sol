// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import {IRootManager} from "./interfaces/IRootManager.sol";
import {IHubConnector} from "./interfaces/IHubConnector.sol";
import {Message} from "./libraries/Message.sol";
import {QueueLib} from "./libraries/Queue.sol";

import {MerkleTreeManager} from "./Merkle.sol";
import {WatcherClient} from "./WatcherClient.sol";

/**
 * @notice This contract exists at cluster hubs, and aggregates all transfer roots from messaging
 * spokes into a single merkle root
 */
contract RootManager is ProposedOwnable, IRootManager, WatcherClient {
  // ============ Libraries ============

  using QueueLib for QueueLib.Queue;

  // ============ Events ============

  event RootAggregated(uint32 domain, bytes32 receivedRoot, uint256 index);

  event RootPropagated(bytes32 aggregate, uint32[] domains, uint256 count);

  event ConnectorAdded(uint32 domain, address connector);

  event ConnectorRemoved(uint32 domain, address connector);

  // ============ Properties ============

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
   * @notice MerkleTreeManager contract instance. Will hold the active tree of aggregated inbound roots.
   * The root of this tree will be distributed crosschain to all spoke domains.
   */
  MerkleTreeManager public immutable MERKLE;

  /**
   * @notice Domains array tracks currently subscribed domains to this hub aggregator.
   * We should distribute the aggregate root to all of these domains in the `propagate` method.
   * @dev Whenever this domains array is updated, the connectors array should also be updated.
   */
  uint32[] public domains;

  /**
   * @notice A "quick reference" hash used in the `propagate` method below to validate that the provided
   * array of domains matches the one we have in storage.
   * @dev This hash should be re-calculated whenever the domains array is updated.
   */
  bytes32 public domainsHash;

  /**
   * @notice Connectors array tracks the addresses of the hub connector contracts corresponding to
   * subscribed spoke domains. The index of any given connector in this array should match the index of
   * that connector's target spoke domain in the `domains` array above.
   * @dev This should be updated whenever the domains array is updated.
   */
  address[] public connectors;

  /**
   * @notice A "quick reference" hash used in the `propagate` method below to validate that the provided
   * array of connectors matches the one we have in storage.
   * @dev This hash should be re-calculated whenever the connectors array is updated.
   */
  bytes32 public connectorsHash;

  /**
   * @notice Convenience mapping for supported domains. Used to sanity check adding new domains.
   * @dev This should be updated whenever the domains array is updated.
   */
  mapping(uint32 => bool) isDomainSupported;

  // ============ Modifiers ============

  modifier onlyConnector(uint32 _domain) {
    require(connectors[_domain] == msg.sender, "!connector");
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
  }

  // ============ Admin Functions ============

  /**
   * @notice Set the `delayBlocks`, the period in blocks over which an incoming message
   * is verified.
   */
  function setDelayBlocks(uint256 _delayBlocks) public onlyOwner {
    require(_delayBlocks != delayBlocks, "!delayBlocks");
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
    // Sanity check: domain does not already exist.
    require(!isDomainSupported[_domain], "exists");
    // Sanity check: connector is reasonable.
    require(_connector != address(0), "!connector");

    // Mark domain as supported.
    isDomainSupported[_domain] = true;
    // Push domain and connector to respective arrays.
    domains.push(_domain);
    connectors.push(_connector);

    // Update the hashes for the given arrays.
    updateHashes();

    emit ConnectorAdded(_domain, _connector);
  }

  /**
   * @notice Helper function for calling `removeConnector` without specifying index in advance, for the
   * lazy.
   * @dev Noticeably inefficient, as we'll be worst-case reading every domain in the array.
   * @param _domain The spoke domain of the target connector we want to remove.
   */
  function removeConnector(uint32 _domain) external onlyWatcher {
    uint256 _numDomains = domains.length;
    uint256 _index;
    bool found;
    for (_index; _index < _numDomains; ) {
      if (domains[_index] == _domain) {
        found = true;
        break;
      }

      unchecked {
        ++_index;
      }
    }
    require(found, "invalid domain");
    removeConnector(_index, _domain);
  }

  /**
   * @notice Remove support for a connector and respective domain. That connector/domain will no longer
   * receive updates for the latest aggregate root.
   * @dev Only watcher can remove a connector.
   * TODO: Could add a metatx-able `removeConnectorWithSig` if we want to use relayers?
   *
   * @param _index The index (in arrays) of the target spoke domain and connector pair we want to remove.
   * (To get this value, just find the index of the domain you want to remove in the `domains` array.)
   * @param _domainRef The spoke domain of the target connector we want to remove; used for sanity checking
   * given index is correct and points to intended value.
   */
  function removeConnector(uint256 _index, uint32 _domainRef) public onlyWatcher {
    // Get the domain at the given index.
    uint32 _domain = domains[_index];
    // Sanity check: domain matches the domain reference arg; otherwise, index is incorrect!
    require(_domain == _domainRef, "!index");

    // Get the connector at the given index.
    address _connector = connectors[_index];
    // Sanity check: connector exists.
    require(_connector != address(0), "connector !exists");

    // Shortcut: is the index the last index in the domains/connectors arrays?
    uint256 _lastIndex = domains.length - 1;
    if (_index < _lastIndex) {
      // If the target index for removal is not the last index, we'll need to move the last index
      // item to the target index's place so we can conveniently pop the last item.
      // Replace domain in domains array with the domain in the final index.
      domains[_index] = domains[_lastIndex];
      // Replace connector in connectors array with the connector in the final index.
      connectors[_index] = connectors[_lastIndex];
    }

    // Remove support indicator for this domain.
    delete isDomainSupported[_domain];
    // Pop the last item in the arrays.
    domains.pop();
    connectors.pop();
    updateHashes();

    emit ConnectorRemoved(_domain, _connector);
  }

  // ============ Public Functions ============

  /**
   * @notice This is called by relayers to take the current aggregate tree root and propagate it to all
   * spoke domains (via their respective hub connectors).
   * @dev Should be called by relayers at a regular interval.
   *
   * @param _domains Array of domains: should match exactly the array of `domains` in storage; used here
   * to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage
   * (see `_domains` param's info on reducing gas costs).
   */
  function propagate(uint32[] calldata _domains, address[] calldata _connectors) external {
    uint256 _numDomains = _domains.length;

    // Sanity check: domains length matches connectors length.
    require(_connectors.length == _numDomains);
    // Validate that given domains match the current array in storage.
    require(keccak256(abi.encode(_domains)) == domainsHash, "!domains");
    // Validate that given connectors match the current array in storage.
    require(keccak256(abi.encode(_connectors)) == connectorsHash, "!connectors");

    // Get all of the verified roots from the queue.
    bytes32[] memory _verifiedInboundRoots = pendingInboundRoots.dequeueVerified(delayBlocks);

    // Sanity check: there must be some verified roots to aggregate and send: otherwise we would be
    // propagating a redundant aggregate root.
    require(_verifiedInboundRoots.length != 0, "no verified roots");

    // Insert the leaves into the aggregator tree (method will also calculate and return the current
    // aggregate root and count).
    (bytes32 _aggregateRoot, uint256 _count) = MERKLE.insert(_verifiedInboundRoots);

    for (uint32 i; i < _numDomains; ) {
      address _connector = connectors[domains[i]];
      IHubConnector(_connector).sendMessage(abi.encodePacked(_aggregateRoot));

      unchecked {
        ++i;
      }
    }

    emit RootPropagated(_aggregateRoot, domains, _count);
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
  function aggregate(uint32 _domain, bytes32 _inbound) external onlyConnector(_domain) {
    uint128 lastIndex = pendingInboundRoots.enqueue(_inbound);
    emit RootAggregated(_domain, _inbound, lastIndex);
  }

  // ============ Helper Functions ============

  /**
   * @notice Calculate the new hashes for the domains and connectors arrays and update storage refs.
   * @dev Used for the Connector update functions `addConnector`, `removeConnector`.
   */
  function updateHashes() internal {
    uint32[] memory _domains = domains;
    address[] memory _connectors = connectors;
    domainsHash = keccak256(abi.encode(_domains));
    connectorsHash = keccak256(abi.encode(_connectors));
  }
}
