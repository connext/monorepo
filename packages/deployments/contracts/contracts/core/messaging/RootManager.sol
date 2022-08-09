// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "./interfaces/IRootManager.sol";
import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

/**
 * @notice This contract exists at cluster hubs, and aggregates all transfer roots from messaging
 * spokes into a single merkle root
 */

contract RootManager is ProposedOwnable, IRootManager {
  // ============ Events ============
  event OutboundRootUpdated(uint32 domain, bytes32 outboundRoot);

  event ConnectorAdded(uint32 domain, address connector);

  event ConnectorRemoved(uint32 domain, address connector);

  event WatcherAdded(address watcher);

  event WatcherRemoved(address watcher);

  // ============ Properties ============
  mapping(uint32 => address) connectors;

  mapping(uint32 => address) outboundRoots;

  uint32[] domains;

  mapping(address => bool) watchers;

  // ============ Constructor ============
  constructor() ProposedOwnable() {}

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
    bytes memory aggregate = abi.encodePacked(outboundRoots[0]);
    for (uint8 i; i < domains.length; i++) {
      IConnector(connectors[domains[i]]).sendMessage(aggregate);
    }
  }

  function setOutboundRoot(uint32 _domain, bytes32 _outbound) external override onlyConnector(_domain) {
    outboundRoots[_domain] = _outbound;
    emit OutboundRootUpdated(_domain, _outbound);
  }

  // ============ Admin fns ============

  /**
   * @dev Owner can add a new connector
   * NOTE: owner can add address(0) to effectively remove a connector
   */
  function addConnector(uint32 _domain, address _connector) onlyOwner {
    connectors[_domain] = _connector;
    domains.push(_domain);
    emit ConnectorAdded(_domain, _connector);
  }

  /**
   * @dev Owner can enroll a watcher (who has ability to disconnect connector)
   */
  function addWatcher(address _watcher) onlyOwner {
    watchers[_watcher] = true;
    emit WatcherAdded(_watcher);
  }

  /**
   * @dev Owner can unenroll a watcher (who has ability to disconnect connector)
   */
  function removeWatcher(address _watcher) onlyOwner {
    watchers[_watcher] = false;
    emit WatcherRemoved(_watcher);
  }

  /**
   * @dev Watcher can remove a connector
   * NOTE: could add removeConnectorWithSig if we want to use gelato
   */
  function removeConnector(uint32 _domain) onlyWatcher {
    address connector = connectors[_domain];
    uint32 last = domains[domains.length - 1];
    for (uint8 i; i < domains.length; i++) {
      if (connectors[domains[i]] == connector) {
        // this is the index
        connectors[domains[i]] = last;
        break;
      }
    }
    connectors.pop();
    emit ConnectorRemoved(_domain, _connector);
  }
}
