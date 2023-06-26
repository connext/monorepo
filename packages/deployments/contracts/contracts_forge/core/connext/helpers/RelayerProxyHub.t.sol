// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import {RelayerProxyHub, IRootManager} from "../../../../contracts/core/connext/helpers/RelayerProxyHub.sol";
import {RootManager} from "../../../../contracts/messaging/RootManager.sol";

contract RelayerProxyHubTest is ForgeHelper {
  // ============ Events ============
  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RelayerAdded(address relayer);

  event RelayerRemoved(address relayer);

  event ConnextChanged(address updated, address previous);
  event SpokeConnectorChanged(address updated, address previous);
  event RelayerChanged(address updated, address previous);
  event FeeCollectorChanged(address updated, address previous);
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);
  event RootManagerChanged(address rootManager, address oldRootManager);
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  error ProposedOwnable__onlyOwner_notOwner();
  error RelayerProxy__onlyRelayer_notRelayer(address _sender);

  // ============ Storage ============
  address OWNER = address(1);
  address _connext = address(12312);
  address _spokeConnector = address(12321222);
  address _gelatoRelayer = address(123444412);
  address _feeCollector = address(12335555);
  address _rootManager = address(12335558);
  address _keep3r = address(12335556);
  address _autonolas = address(12335557);
  uint8 _autonolasPriority = 4;
  address[] _hubConnectors = new address[](2);
  uint32[] _hubConnectorChains = new uint32[](2);

  RelayerProxyHub proxy;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndAssert();
  }

  function utils_deployAndAssert() public {
    vm.expectEmit(true, true, true, true);
    emit ConnextChanged(_connext, address(0));

    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(_spokeConnector, address(0));

    vm.expectEmit(true, true, true, true);
    emit FeeCollectorChanged(_feeCollector, address(0));

    vm.expectEmit(true, true, true, true);
    emit RelayerAdded(_gelatoRelayer);

    _hubConnectors[0] = address(123);
    _hubConnectors[1] = address(456);
    _hubConnectorChains[0] = 1337;
    _hubConnectorChains[1] = 1338;

    vm.prank(OWNER);
    proxy = new RelayerProxyHub(
      _connext,
      _spokeConnector,
      _gelatoRelayer,
      _feeCollector,
      _rootManager,
      _keep3r,
      _autonolas,
      _autonolasPriority,
      300,
      _hubConnectors,
      _hubConnectorChains
    );
  }

  uint256[] _messageFees = new uint256[](2);
  bytes[] _encodedData = new bytes[](2);
  uint256 _relayerFee = 123;

  function utils_setUpPropagateParams() public {}

  function test_RelayerProxyHub__deploy_works() public {
    assertEq(address(proxy.connext()), _connext);
    assertEq(address(proxy.spokeConnector()), _spokeConnector);
    assertEq(proxy.gelatoRelayer(), _gelatoRelayer);
    assertEq(proxy.feeCollector(), _feeCollector);
  }

  function test_RelayerProxyHub__setRootManager_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setRootManager(address(123));
  }

  function test_RelayerProxyHub__setRootManager_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit RootManagerChanged(address(123), address(12335558));
    proxy.setRootManager(address(123));
    assertEq(address(proxy.rootManager()), address(123));
  }

  function test_RelayerProxyHub__setPropagateCooldown_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setPropagateCooldown(123);
  }

  function test_RelayerProxyHub__setPropagateCooldown_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit PropagateCooldownChanged(123, 300);
    proxy.setPropagateCooldown(123);
    assertEq(proxy.propagateCooldown(), 123);
  }

  function test_RelayerProxyHub__setHubConnector_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setHubConnector(address(123), 123);
  }

  function test_RelayerProxyHub__setHubConnector_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit HubConnectorChanged(address(123), address(0), 123);
    proxy.setHubConnector(address(123), 123);
    assertEq(proxy.hubConnectors(123), address(123));
  }

  function test_RelayerProxyHub_propagateWorkable_isFalseIfRootIsSame() public {
    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.dequeue.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"), 123)
    );

    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.lastPropagatedRoot.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"))
    );

    assertEq(proxy.propagateWorkable(), false);
  }

  function test_RelayerProxyHub_propagateWorkable_isTrue() public {
    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.dequeue.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"), 123)
    );

    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.lastPropagatedRoot.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000002"))
    );

    assertEq(proxy.propagateWorkable(), true);
  }

  function test_RelayerProxyHub_propagate_failsIfNotGelatoRelayer(address sender) public {
    vm.assume(sender != _gelatoRelayer);
    vm.prank(sender);
    vm.expectRevert(RelayerProxy__onlyRelayer_notRelayer.selector);
    proxy.propagate(_hubConnectors, _messageFees, _encodedData, _relayerFee);
  }
}
