// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {RootManager} from "../../../../contracts/messaging/RootManager.sol";

contract RootManagerTest {
  // ============ Events ============
  event RootPropagated(bytes32 aggregate, uint32[] domains);

  event OutboundRootUpdated(uint32 domain, bytes32 outboundRoot);

  event ConnectorAdded(uint32 domain, address connector);

  event ConnectorRemoved(uint32 domain, address connector);

  event WatcherAdded(address watcher);

  event WatcherRemoved(address watcher);

  // ============ Storage ============
  function setUp() public {
    _rootManager = address(
      new RootManager();
    );
  }

  // ============ Utils ============

  // ============ RootManager.propagate ============
  function test_RootManager__propagate_shouldWork() public {}

  // TODO when merkle tree implemented
  function test_RootManager__propagate_shouldReadMerkleRootsFromAllDomains() public {}

  // TODO when merkle tree implemented
  function test_RootManager__propagate_shouldAggregateMerkleRootsCorrectly() public {}

  // ============ RootManager.setOutboundRoot ============
  function test_ArbitrumHubConnector__setOutboundRoot_shouldWork() public {}

  function test_ArbitrumHubConnector__setOutboundRoot_shouldFailIfCallerNotConnector() public {}

  // ============ RootManager.addConnector ============
  function test_RootManager__addConnector_shouldWork() public {}

  function test_RootManager__addConnector_shouldFailIfCallerNotOwner() public {}

  // ============ RootManager.removeConnector ============
  function test_RootManager__removeConnector_shouldWork() public {}

  function test_RootManager__removeConnector_shouldFailIfCallerNotWatcher() public {}

  // ============ RootManager.addWatcher ============
  function test_RootManager__addWatcher_shouldWork() public {}

  function test_RootManager__addWatcher_shouldFailIfCallerNotOwner() public {}

  // ============ RootManager.removeWatcher ============
  function test_RootManager__removeWatcher_shouldWork() public {}

  function test_RootManager__removeWatcher_shouldFailIfCallerNotOwner() public {}
}
