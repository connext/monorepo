// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/Merkle.sol";

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
  uint32 domain = 1000;
  uint32 anotherDomain = 1001;
  address notOwner = address(100);
  address watcherManager = address(200);
  address watcher = address(201);
  address connector = address(300);
  address anotherConnector = address(301);
  bytes32 outboundRoot = bytes32("test");

  function setUp() public {
    _merkle = address(new MerkleTreeManager());
    MerkleTreeManager(_merkle).initialize();
    _rootManager = new RootManager(_merkle, watcherManager);
    MerkleTreeManager(_merkle).setArborist(address(_rootManager));
  }

  // ============ Utils ============

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
    vm.expectRevert(bytes("!exists"));

    vm.prank(watcher);
    _rootManager.removeConnector(domain);
  }

  // ============ RootManager.aggregate ============
  function test_RootManager__aggregate_shouldWork(bytes32 inbound) public {
    _rootManager.addConnector(domain, connector);

    vm.expectEmit(true, true, true, true);
    emit RootAggregated(domain, inbound, 0);

    vm.prank(connector);
    _rootManager.aggregate(domain, inbound);
  }

  function test_RootManager__aggregate_shouldFailIfCallerNotConnector(bytes32 inbound) public {
    vm.expectRevert(bytes("!connector"));

    _rootManager.aggregate(domain, inbound);
  }

  // ============ RootManager.propagate ============
  function test_RootManager__propagate_shouldSendToL2(bytes32 inbound) public {
    _rootManager.addConnector(domain, connector);

    // TODO: this doesn't work
    vm.mockCall(_merkle, abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encodePacked("test"));
    vm.expectCall(connector, abi.encodeWithSelector(IHubConnector.sendMessage.selector, abi.encodePacked("test")));

    vm.prank(connector);
    _rootManager.aggregate(domain, inbound);

    _rootManager.propagate();
  }
}
