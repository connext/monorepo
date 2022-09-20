// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import {IRootManager} from "./interfaces/IRootManager.sol";
import {IHubConnector} from "./interfaces/IHubConnector.sol";
import {MerkleLib} from "./libraries/Merkle.sol";
import {Message} from "./libraries/Message.sol";

import {MerkleTreeManager} from "./Merkle.sol";

/**
 * @notice This contract exists at cluster hubs, and aggregates all transfer roots from messaging
 * spokes into a single merkle root
 */

contract RootManager is MerkleTreeManager, ProposedOwnable, IRootManager {
  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;

  // ============ Events ============
  event RootAggregated(uint32 domain, bytes32 receivedRoot, uint256 index);

  event RootPropagated(bytes32 aggregate, uint32[] domains);

  event ConnectorAdded(uint32 domain, address connector);

  event ConnectorRemoved(uint32 domain, address connector);

  event WatcherAdded(address watcher);

  event WatcherRemoved(address watcher);

  // ============ Properties ============
  mapping(uint32 => address) public connectors;

  mapping(uint32 => bytes32) public outboundRoots;

  uint32[] public domains;

  mapping(address => bool) public watchers;

  // ============ Constructor ============
  constructor() ProposedOwnable() {
    _setOwner(msg.sender);
  }

  // ============ Modifiers ============
  modifier onlyWatcher() {
    require(watchers[msg.sender], "!watcher");
    _;
  }

  modifier onlyConnector(uint32 _domain) {
    require(connectors[_domain] == msg.sender, "!connector");
    _;
  }

  // ============ Public fns ============

  /**
   * @notice This is called by relayers to generate + send the mixed root from mainnet via AMB to spoke domains
   * @dev This must read information for the root from the registered AMBs
   * TODO should we input domains or store them? (relayer can alter input domains)
   * FIXME proper merkle tree implementation
   */
  function propagate() external override {
    bytes32 aggregate = tree.root();

    uint256 numDomains = domains.length;
    for (uint32 i; i < numDomains; ) {
      address connector = connectors[domains[i]];
      IHubConnector(connector).sendMessage(aggregate);

      unchecked {
        ++i;
      }
    }
    emit RootPropagated(outboundRoots[hub], domains);
  }

  /**
   * @notice Accept an inbound root coming from a given domain's hub connector, inserting this incoming
   * root into the current aggregate tree. The aggregate tree's root will eventually be propagated to all
   * spoke domains.
   * @param _domain The source domain of the given root.
   * @param _inbound The inbound root coming from the given domain.
   */
  function setOutboundRoot(uint32 _domain, bytes32 _inbound) external override onlyConnector(_domain) {
    // outboundRoots[_domain] = _outbound;
    // emit OutboundRootUpdated(_domain, _outbound);
    tree.insert(_inbound);
    emit RootAggregated(_domain, _inbound, tree.count - 1);
  }

  // ============ Admin fns ============

  /**
   * @dev Owner can add a new connector. Address should be the connector on l1
   * NOTE: owner can't add address(0) to avoid duplicated domain in array and reduce gas fee while progating
   */
  function addConnector(uint32 _domain, address _connector) external onlyOwner {
    require(_connector != address(0), "!connector");
    require(connectors[_domain] == address(0), "exists");

    connectors[_domain] = _connector;
    domains.push(_domain);
    emit ConnectorAdded(_domain, _connector);
  }

  /**
   * @dev Watcher can remove a connector
   * NOTE: could add removeConnectorWithSig if we want to use gelato
   */
  function removeConnector(uint32 _domain) external onlyWatcher {
    address connector = connectors[_domain];
    require(connector != address(0), "!exists");

    // remove connector from mapping
    delete connectors[_domain];

    // remove domain from array
    uint32 last = domains[domains.length - 1];
    for (uint8 i; i < domains.length; i++) {
      if (domains[i] == _domain) {
        domains[i] = last;
        break;
      }
    }
    domains.pop();
    emit ConnectorRemoved(_domain, connector);
  }

  /**
   * @dev Owner can enroll a watcher (who has ability to disconnect connector)
   */
  function addWatcher(address _watcher) external onlyOwner {
    require(!watchers[_watcher], "already watcher");
    watchers[_watcher] = true;
    emit WatcherAdded(_watcher);
  }

  /**
   * @dev Owner can unenroll a watcher (who has ability to disconnect connector)
   */
  function removeWatcher(address _watcher) external onlyOwner {
    require(watchers[_watcher], "!exist");
    watchers[_watcher] = false;
    emit WatcherRemoved(_watcher);
  }
}
