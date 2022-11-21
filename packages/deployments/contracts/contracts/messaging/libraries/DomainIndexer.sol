// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @notice This abstract contract was written to ensure domain and connector mutex is scalable for the
 * purposes of messaging layer operations. In particular, it aims to reduce gas costs to be relatively
 * static regardless of the number of domains kept in storage by enabling callers of `RootManager.propagate`
 * to supply the `domains` and `connectors` arrays as params, and check the hashes of those params against
 * those we keep in storage.
 */
abstract contract DomainIndexer {
  // ============ Events ============

  event DomainAdded(uint32 domain, address connector);
  event DomainRemoved(uint32 domain);

  // ============ Properties ============

  /**
   * @notice The absolute maximum number of domains that we should support. Domain and connector arrays
   * are naturally unbounded, but the gas cost of reading these arrays in `updateHashes()` is bounded by
   * the block's gas limit.
   *
   * If we want to set a hard ceiling for gas costs for the `updateHashes()` method at approx. 500K gas,
   * with an average SLOAD cost of 900 gas per domain (1 uint32, 1 address):
   *       500K / 900 = ~555 domains
   *
   * Realistically, the cap on the number of domains will likely exist in other places, but we cap it
   * here as a last resort.
   */
  uint256 public constant MAX_DOMAINS = 500;

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
   * @notice Tracks the addresses of the hub connector contracts corresponding to subscribed spoke domains.
   * The index of any given connector in this array should match the index of that connector's target spoke
   * domain in the `domains` array above.
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
   * @notice Shortcut to reverse lookup the index by domain. We index starting at one so the zero value can
   * be considered invalid (see fn: `isDomainSupported`).
   * @dev This should be updated whenever the domains array is updated.
   */
  mapping(uint32 => uint256) private domainToIndexPlusOne;

  // ============ Getters ============

  /**
   * @notice Convenience shortcut for supported domains. Used to sanity check adding new domains.
   * @param _domain Domain to check.
   */
  function isDomainSupported(uint32 _domain) public view returns (bool) {
    return domainToIndexPlusOne[_domain] != 0;
  }

  /**
   * @notice Gets the index of a given domain in the domains and connectors arrays.
   * @dev Reverts if domain is not supported.
   * @param _domain The domain for which to get the index value.
   */
  function getDomainIndex(uint32 _domain) public view returns (uint256) {
    uint256 index = domainToIndexPlusOne[_domain];
    require(index != 0, "!supported");
    return index - 1;
  }

  /**
   * @notice Gets the corresponding hub connector address for a given spoke domain.
   * @dev Inefficient, should only be used by caller if they have no index reference.
   * @param _domain The domain for which to get the hub connector address.
   */
  function getConnectorForDomain(uint32 _domain) public view returns (address) {
    return connectors[getDomainIndex(_domain)];
  }

  /**
   * @notice Validate given domains and connectors arrays are correct (i.e. they mirror what is
   * currently saved in storage).
   * @dev Reverts if domains or connectors do not match, including ordering.
   * @param _domains The given domains array to check.
   * @param _connectors The given connectors array to check.
   */
  function validateDomains(uint32[] calldata _domains, address[] calldata _connectors) public view {
    // Sanity check: arguments are same length.
    require(_domains.length == _connectors.length, "!matching length");
    // Validate that given domains match the current array in storage.
    require(keccak256(abi.encode(_domains)) == domainsHash, "!domains");
    // Validate that given connectors match the current array in storage.
    require(keccak256(abi.encode(_connectors)) == connectorsHash, "!connectors");
  }

  /**
   * @notice Validate given connectors array is correct (i.e. it mirrors what is
   * currently saved in storage).
   * @dev Reverts if domains or connectors do not match, including ordering.
   * @param _connectors The given connectors array to check.
   */
  function validateConnectors(address[] calldata _connectors) public view {
    // Validate that given connectors match the current array in storage.
    require(keccak256(abi.encode(_connectors)) == connectorsHash, "!connectors");
  }

  // ============ Helper Functions ============

  /**
   * @notice Handles all mutex for adding support for a given domain.
   * @param _domain Domain for which we are adding support.
   * @param _connector Corresponding hub connector address belonging to given domain.
   */
  function addDomain(uint32 _domain, address _connector) internal {
    // Sanity check: domain does not already exist.
    require(!isDomainSupported(_domain), "exists");
    // Sanity check: connector is reasonable.
    require(_connector != address(0), "!connector");
    // Sanity check: Under maximum.
    require(domains.length < MAX_DOMAINS, "DomainIndexer at capacity");

    // Push domain and connector to respective arrays.
    domains.push(_domain);
    connectors.push(_connector);
    // Set reverse lookup.
    uint256 _indexPlusOne = domains.length;
    domainToIndexPlusOne[_domain] = _indexPlusOne;

    // Update the hashes for the given arrays.
    updateHashes();

    emit DomainAdded(_domain, _connector);
  }

  /**
   * @notice Handles all mutex for removing support for a given domain.
   * @param _domain Domain we are removing.
   * @return address of the hub connector for the domain we removed.
   */
  function removeDomain(uint32 _domain) internal returns (address) {
    uint256 _index = getDomainIndex(_domain);
    // Get the connector at the given index.
    address _connector = connectors[_index];
    // Sanity check: connector exists.
    require(_connector != address(0), "connector !exists");

    // Shortcut: is the index the last index in the domains/connectors arrays?
    // IFF not, we'll need to swap the target with the current last so we can pop().
    uint256 _lastIndex = domains.length - 1;
    if (_index < _lastIndex) {
      // If the target index for removal is not the last index, we'll need to move the last index
      // item to the target index's place so we can conveniently pop the last item.
      // Replace domain in domains array with the domain in the final index.
      domains[_index] = domains[_lastIndex];
      connectors[_index] = connectors[_lastIndex];
    }

    // Pop the last item in the arrays.
    domains.pop();
    connectors.pop();
    // Erase reverse lookup.
    delete domainToIndexPlusOne[_domain];

    // Update the hashes for the given arrays.
    updateHashes();

    emit DomainRemoved(_domain);

    return _connector;
  }

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
