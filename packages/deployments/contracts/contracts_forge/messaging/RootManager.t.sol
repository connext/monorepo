// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {WatcherManager} from "../../contracts/messaging/WatcherManager.sol";

import "../utils/ConnectorHelper.sol";

contract ReverterConnector {
  function sendMessage(bytes memory _data) external {
    revert("revert");
  }
}

contract RootManagerTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  event RootsAggregated(bytes32 aggregateRoot, uint256 count, bytes32[] aggregatedMessageRoots);

  event RootPropagated(bytes32 aggregate, uint32[] domains, uint256 count);

  event ConnectorAdded(uint32 domain, address connector, uint32[] domains, address[] connectors);

  event ConnectorRemoved(uint32 domain, address connector, uint32[] domains, address[] connectors, address caller);

  event PropagateFailed(uint32 domain, address connector);

  // ============ Storage ============
  RootManager _rootManager;
  uint256 _delayBlocks = 40;
  address _merkle;
  uint32[] _domains;
  address[] _connectors;
  uint256[] _fees;
  bytes[] _encodedData;

  address owner = address(1);
  address watcherManager = address(2);
  address watcher = address(3);

  function setUp() public {
    _domains.push(1000);
    _connectors.push(address(1000));
    _fees.push(0);
    _encodedData.push(bytes(""));

    _domains.push(1001);
    _connectors.push(address(1001));
    _fees.push(0);
    _encodedData.push(bytes(""));

    _merkle = address(new MerkleTreeManager());
    MerkleTreeManager(_merkle).initialize(address(_rootManager));

    vm.prank(owner);
    _rootManager = new RootManager(_delayBlocks, _merkle, watcherManager);
    MerkleTreeManager(_merkle).setArborist(address(_rootManager));

    // Env: roll ahead to an arbitrary block so we don't start at block zero.
    // For dequeuing roots in `propagate`, this will make the delay number we pass in acceptable.
    vm.roll(123456789);
  }

  // ============ Utils ============
  /**
   * @notice Utility to handle generating and adding connector/domain pairs as needed.
   * @param count Num spoke domains TOTAL.
   * @param shouldAggregate Whether to aggregate generated inboundRoots from each domain in this fn.
   * @param willPropagate Whether we should expect propagation to ACTUALLY occur.
   */
  function utils_generateAndAddConnectors(
    uint256 count,
    bool shouldAggregate,
    bool willPropagate
  ) public {
    // Start loop at current domains length so we can skip any already existing.
    for (uint256 i = _domains.length; i < count; i++) {
      // Add another domain/connector pair.
      uint32 domain = uint32(1000 + i);
      _domains.push(domain);
      _connectors.push(address(bytes20(uint160(domain))));
      _fees.push(0);
      _encodedData.push(bytes(""));
    }

    for (uint256 i; i < _domains.length; i++) {
      vm.prank(owner);
      _rootManager.addConnector(_domains[i], _connectors[i]);

      if (shouldAggregate) {
        bytes32 inboundRoot = keccak256(abi.encode(bytes("test"), i));
        vm.prank(_connectors[i]);
        _rootManager.aggregate(_domains[i], inboundRoot);
        console.log("aggregated!", i);
        console.logBytes32(inboundRoot);
      }

      if (willPropagate) {
        // Expect a call to every hub connector!
        vm.mockCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector), abi.encode());
        vm.expectCall(_connectors[i], abi.encodeWithSelector(IHubConnector.sendMessage.selector));
      }
    }
  }

  // ============ RootManager.addConnector ============
  function test_RootManager__addConnector_shouldWork() public {
    uint32[] memory domains = new uint32[](1);
    address[] memory connectors = new address[](1);
    domains[0] = _domains[0];
    connectors[0] = _connectors[0];
    vm.expectEmit(true, true, true, true);
    emit ConnectorAdded(_domains[0], _connectors[0], domains, connectors);

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    assertEq(_rootManager.connectors(0), _connectors[0]);
    assertEq(_rootManager.domains(0), _domains[0]);
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

    vm.expectRevert(bytes("domain exists"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);
  }

  function test_RootManager__addConnector_shouldFailIfDomainAlreadyAdded() public {
    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[0]);

    vm.expectRevert(bytes("domain exists"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], _connectors[1]);
  }

  function test_RootManager__addConnector_shouldFailIfAddressZero() public {
    vm.expectRevert(bytes("!connector"));

    vm.prank(owner);
    _rootManager.addConnector(_domains[0], address(0));
  }

  // ============ RootManager.removeConnector ============
  function test_RootManager__removeConnector_shouldWork() public {
    for (uint256 i; i < 100; i++) {
      vm.startPrank(owner);
      _rootManager.addConnector(_domains[0], _connectors[0]);
      _rootManager.addConnector(_domains[1], _connectors[1]);
      vm.stopPrank();

      uint32[] memory emitted = new uint32[](1);
      address[] memory emittedConnectors = new address[](1);

      emitted[0] = _domains[1];
      emittedConnectors[0] = _connectors[1];
      vm.expectEmit(true, true, true, true);
      emit ConnectorRemoved(_domains[0], _connectors[0], emitted, emittedConnectors, address(this));

      vm.mockCall(
        watcherManager,
        abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
        abi.encode(true)
      );

      _rootManager.removeConnector(_domains[0]);

      assertEq(_rootManager.isDomainSupported(_domains[0]), false);

      vm.expectRevert(bytes("!supported"));
      _rootManager.getDomainIndex(_domains[0]);

      vm.expectRevert(bytes("!supported"));
      _rootManager.getConnectorForDomain(_domains[0]);

      // ensure the mappings were properly updated
      assertEq(_rootManager.getDomainIndex(_domains[1]), 0);
      assertEq(_rootManager.getConnectorForDomain(_domains[1]), _connectors[1]);

      _rootManager.removeConnector(_domains[1]);
    }
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
    vm.expectRevert(bytes("!supported"));

    vm.mockCall(
      watcherManager,
      abi.encodeWithSelector(WatcherManager(watcherManager).isWatcher.selector),
      abi.encode(true)
    );

    _rootManager.removeConnector(_domains[0]);
  }

  // ============ RootManager.aggregate ============
  function test_RootManager__aggregate_shouldWork(bytes32 inbound) public {
    utils_generateAndAddConnectors(1, false, false);

    vm.expectEmit(true, true, true, true);
    emit RootReceived(_domains[0], inbound, 1);

    vm.prank(_connectors[0]);
    _rootManager.aggregate(_domains[0], inbound);
  }

  function test_RootManager__aggregate_shouldFailIfCallerNotConnector(bytes32 inbound) public {
    utils_generateAndAddConnectors(1, false, false);

    vm.expectRevert(bytes("!connector"));

    vm.prank(address(123));
    _rootManager.aggregate(_domains[0], inbound);
  }

  // ============ RootManager.propagate ============
  function test_RootManager__propagate_shouldSendToSpoke(bytes32 inbound) public {
    utils_generateAndAddConnectors(1, true, true);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    _rootManager.propagate(_connectors, _fees, _encodedData);
  }

  function test_RootManager__propagate_shouldSendToAllSpokes(bytes32 inbound) public {
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    _rootManager.propagate(_connectors, _fees, _encodedData);
    assertEq(_rootManager.getPendingInboundRootsCount(), 0);
  }

  function test_RootManager__propagate_shouldRevertIfRedundantRoot(bytes32 inbound) public {
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    // Dequeue separately so we can get an updated root.
    _rootManager.dequeue();
    bytes32 currentRoot = MerkleTreeManager(_merkle).root();

    _rootManager.propagate(_connectors, _fees, _encodedData);
    assertEq(_rootManager.lastPropagatedRoot(), currentRoot);

    // The current root has already been sent, the following call should revert since sending
    // again would be redundant.
    vm.expectRevert(bytes("redundant root"));
    _rootManager.propagate(_connectors, _fees, _encodedData);
  }

  function test_RootManager__propagate_shouldNotRevertIfAmbMessageReverts() public {
    uint256 numSpokes = 20;
    utils_generateAndAddConnectors(numSpokes, true, true);
    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes);

    // special case to add reverting connector
    ReverterConnector revertConnector = new ReverterConnector();
    uint32 domain = uint32(1020);
    _domains.push(domain);
    _connectors.push(address(revertConnector));
    _fees.push(0);
    _encodedData.push(bytes(""));

    vm.prank(owner);
    _rootManager.addConnector(_domains[20], address(revertConnector));

    bytes32 inboundRoot = keccak256(abi.encode(bytes("test"), 20));
    vm.prank(address(revertConnector));
    _rootManager.aggregate(_domains[20], inboundRoot);

    vm.expectCall(_connectors[20], abi.encodeWithSelector(IHubConnector.sendMessage.selector));

    assertEq(_rootManager.getPendingInboundRootsCount(), numSpokes + 1);

    // Fast forward delayBlocks number of blocks so all of the inbound roots are considered verified.
    vm.roll(block.number + _rootManager.delayBlocks());

    vm.expectEmit(true, true, true, true);
    emit PropagateFailed(_domains[20], address(revertConnector));

    _rootManager.propagate(_connectors, _fees, _encodedData);
    assertEq(_rootManager.getPendingInboundRootsCount(), 0);
  }
}
