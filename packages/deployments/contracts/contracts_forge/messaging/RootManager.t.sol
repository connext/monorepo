// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";

import "../utils/ConnectorHelper.sol";

contract RootManagerTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============
  event RootPropagated(bytes32 aggregate, uint32[] domains);

  event OutboundRootUpdated(uint32 domain, bytes32 outboundRoot);

  event ConnectorAdded(uint32 domain, address connector);

  event ConnectorRemoved(uint32 domain, address connector);

  event WatcherAdded(address watcher);

  event WatcherRemoved(address watcher);

  // ============ Storage ============
  RootManager _rootManager;
  uint32 domain = 1000;
  address notOwner = address(100);
  address watcher = address(200);
  address connector = address(300);
  bytes32 outboundRoot = bytes32("test");

  function setUp() public {
    _rootManager = new RootManager();
  }

  // ============ Utils ============

  // ============ RootManager.addWatcher ============
  function test_RootManager__addWatcher_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit WatcherAdded(watcher);

    _rootManager.addWatcher(watcher);

    assertEq(_rootManager.watchers(watcher), true);
  }

  function test_RootManager__addWatcher_shouldFailIfCallerNotOwner() public {
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(notOwner);

    _rootManager.addWatcher(watcher);
  }

  function test_RootManager__addWatcher_shouldFailIfAlreadyAdded() public {
    _rootManager.addWatcher(watcher);

    vm.expectRevert(bytes("already watcher"));

    _rootManager.addWatcher(watcher);
  }

  // ============ RootManager.removeWatcher ============
  function test_RootManager__removeWatcher_shouldWork() public {
    _rootManager.addWatcher(watcher);

    vm.expectEmit(true, true, true, true);
    emit WatcherRemoved(watcher);

    _rootManager.removeWatcher(watcher);

    assertEq(_rootManager.watchers(watcher), false);
  }

  function test_RootManager__removeWatcher_shouldFailIfCallerNotOwner() public {
    _rootManager.addWatcher(watcher);

    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(notOwner);
    _rootManager.removeWatcher(watcher);
  }

  function test_RootManager__removeWatcher_shouldFailIfNotAdded() public {
    vm.expectRevert(bytes("!exist"));

    _rootManager.removeWatcher(watcher);
  }

  // ============ RootManager.addConnector ============
  function test_RootManager__addConnector_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit ConnectorAdded(domain, connector);

    _rootManager.addConnector(domain, connector);

    assertEq(_rootManager.connectors(domain), connector);
  }

  function test_RootManager__addConnector_shouldFailIfCallerNotOwner() public {
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(notOwner);
    _rootManager.addConnector(domain, connector);
  }

  function test_RootManager__addConnector_shouldFailIfAlreadyAdded() public {
    _rootManager.addConnector(domain, connector);

    vm.expectRevert(bytes("exists"));

    _rootManager.addConnector(domain, connector);
  }

  function test_RootManager__addConnector_shouldFailIfAddressZero() public {
    vm.expectRevert(bytes("!connector"));

    _rootManager.addConnector(domain, address(0));
  }

  // ============ RootManager.removeConnector ============
  function test_RootManager__removeConnector_shouldWork() public {
    _rootManager.addConnector(domain, connector);
    _rootManager.addWatcher(watcher);

    vm.expectEmit(true, true, true, true);
    emit ConnectorRemoved(domain, connector);

    vm.prank(watcher);
    _rootManager.removeConnector(domain);

    assertEq(_rootManager.connectors(domain), address(0));
  }

  function test_RootManager__removeConnector_shouldFailIfCallerNotWatcher() public {
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(notOwner);
    _rootManager.addConnector(domain, connector);
  }

  function test_RootManager__removeConnector_shouldFailIfNotAdded() public {
    _rootManager.addWatcher(watcher);

    vm.expectRevert(bytes("!exists"));

    vm.prank(watcher);
    _rootManager.removeConnector(domain);
  }

  // ============ RootManager.setOutboundRoot ============
  function test_RootManager__setOutboundRoot_shouldWork() public {
    _rootManager.addConnector(domain, connector);

    vm.expectEmit(true, true, true, true);
    emit OutboundRootUpdated(domain, outboundRoot);

    vm.prank(connector);
    _rootManager.setOutboundRoot(domain, outboundRoot);

    assertEq(_rootManager.outboundRoots(domain), outboundRoot);
  }

  function test_RootManager__setOutboundRoot_shouldFailIfCallerNotConnector() public {
    vm.expectRevert(bytes("!connector"));

    _rootManager.setOutboundRoot(domain, outboundRoot);
  }

  // ============ RootManager.propagate ============
  // TODO fix when merkle tree implemented
  function test_RootManager__propagate_shouldSendToL2() public {
    _rootManager.addConnector(domain, connector);
    vm.prank(connector);
    _rootManager.setOutboundRoot(domain, outboundRoot);

    // propagate() only aggregates a single outbound right now
    bytes memory aggregate = abi.encodePacked(_rootManager.outboundRoots(domain));

    vm.mockCall(connector, abi.encodeWithSelector(IHubConnector.sendMessage.selector, aggregate), abi.encode());
    vm.expectCall(connector, abi.encodeWithSelector(IHubConnector.sendMessage.selector, aggregate));
    _rootManager.propagate();
  }

  // TODO when merkle tree implemented
  function test_RootManager__propagate_shouldReadMerkleRootsFromAllDomains() public {}

  // TODO when merkle tree implemented
  function test_RootManager__propagate_shouldAggregateMerkleRootsCorrectly() public {}
}
