// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";
import {MerkleTreeManager} from "../../contracts/messaging/Merkle.sol";
import {WatcherManager} from "../../contracts/messaging/WatcherManager.sol";

import "../utils/ConnectorHelper.sol";

contract RootManagerTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============
  event RootAggregated(uint32 domain, bytes32 receivedRoot, uint256 index);

  event RootPropagated(bytes32 aggregate, uint32[] domains);

  event ConnectorAdded(uint32 domain, address connector);

  event ConnectorRemoved(uint32 domain, address connector);

  // ============ Storage ============
  RootManager _rootManager;
  address _merkle;
  uint32[] _domains;
  address[] _connectors;

  address owner = address(1);
  address watcherManager = address(2);
  address watcher = address(3);

  function setUp() public {
    _domains.push(1000);
    _connectors.push(address(1000));

    _merkle = address(new MerkleTreeManager());
    MerkleTreeManager(_merkle).initialize(address(_rootManager));

    vm.prank(owner);
    _rootManager = new RootManager(_merkle, watcherManager);
    MerkleTreeManager(_merkle).setArborist(address(_rootManager));
  }

  // ============ Utils ============

  // ============ RootManager.addConnector ============
  function test_RootManager__addConnector_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit ConnectorAdded(_domains[0], _connectors[0]);

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    assertEq(_rootManager.connectors(_domains[0]), _connectors[0]);
  }

  function test_RootManager__addConnector_shouldFailIfCallerNotOwner(address caller) public {
    if (caller == owner) {
      // fuzz test, return if owner
      return;
    }

    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(caller);
    _rootManager.addConnector(_domains[0], _connectors[0]);
  }

  function test_RootManager__addConnector_shouldFailIfAlreadyAdded() public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.expectRevert(bytes("exists"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);
  }

  function test_RootManager__addConnector_shouldFailIfAddressZero() public {
    vm.expectRevert(bytes("!connector"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], address(0));
  }

  // ============ RootManager.removeConnector ============
  function test_RootManager__removeConnector_shouldWork() public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.expectEmit(true, true, true, true);
    emit ConnectorRemoved(_domains[0], _connectors[0]);

    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );

    _rootManager.removeConnector(_domains[0]);

    assertEq(_rootManager.connectors(_domains[0]), address(0));
  }

  function test_RootManager__removeConnector_shouldFailIfCallerNotWatcher() public {
    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(false)
    );

    vm.expectRevert(bytes("!watcher"));

    _rootManager.removeConnector(_domains[0]);
  }

  function test_RootManager__removeConnector_shouldFailIfNotAdded() public {
    vm.expectRevert(bytes("!exists"));

    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );

    _rootManager.removeConnector(_domains[0]);
  }

  // ============ RootManager.aggregate ============
  function test_RootManager__aggregate_shouldWork(bytes32 inbound) public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.expectEmit(true, true, true, true);
    emit RootAggregated(_domains[0], inbound, 0);

    vm.prank(_connectors[0]);
    _rootManager.aggregate(_domains[0], inbound);
  }

  function test_RootManager__aggregate_shouldFailIfCallerNotConnector(bytes32 inbound) public {
    vm.expectRevert(bytes("!connector"));

    _rootManager.aggregate(_domains[0], inbound);
  }

  // ============ RootManager.propagate ============
  function test_RootManager__propagate_shouldSendToL2(bytes32 inbound) public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.prank(_connectors[0]);
    _rootManager.aggregate(_domains[0], inbound);

    vm.mockCall(_connectors[0], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
    vm.expectCall(_connectors[0], abi.encodeWithSelector(IHubConnector.sendMessage.selector));

    _rootManager.propagate();
  }

  function test_RootManager__propagate_shouldSendToAllL2s(bytes32 inbound) public {
    // Add another connector
    _domains.push(1001);
    _connectors.push(address(1001));

    for (uint32 i; i < _domains.length; i++) {
      vm.prank(owner);
      _rootManager.addConnector(_domains[i], _connectors[i]);
      vm.expectCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector));
      vm.mockCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
    }

    vm.prank(_connectors[0]);
    _rootManager.aggregate(_domains[0], inbound);

    _rootManager.propagate();
  }
}
