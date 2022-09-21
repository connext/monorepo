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

  // function utils_setConnectors(uint32[] memory domains, address[] memory connectors) public {
  //   for (uint8 i; i < domains.length; i++) {
  //     // _rootManager.connectors[domains[i]] = connectors[i];
  //     _rootManager.domains.push(domains[i]);
  //   }
  // }

  // function utils_setOutboundRoots(uint32[] memory domains, bytes32[] memory outbounds) public {
  //   for (uint8 i; i < domains.length; i++) {
  //     _rootManager.outboundRoots[domains[i]] = outbounds[i];
  //   }
  // }

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
  function test_RootManager__propagate_shouldSendToAllL2s() public {
    // uint32[2] memory domains = [domain, 2000];
    // address[2] memory connectors = [connector, address(301)];
    // bytes32[2] memory outbounds = [outboundRoot, bytes32("test2")];
    // // propagate() only aggregates domains[0] right now
    // bytes memory aggregate = abi.encodePacked(outbounds[domains[0]]);
    // for (uint8 i; i < domains.length; i++) {
    //   _rootManager.setOutboundRoot(domains[i], outbounds[i]);
    //   vm.expectCall(connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector, aggregate));
    // }
    // _rootManager.propagate();
  }

  // TODO when merkle tree implemented
  function test_RootManager__propagate_shouldReadMerkleRootsFromAllDomains() public {}

  // TODO when merkle tree implemented
  function test_RootManager__propagate_shouldAggregateMerkleRootsCorrectly() public {}
}
