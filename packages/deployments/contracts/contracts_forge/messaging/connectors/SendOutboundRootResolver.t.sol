// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {SendOutboundRootResolver} from "../../../contracts/messaging/connectors/SendOutboundRootResolver.sol";
import {SpokeConnector} from "../../../contracts/messaging/connectors/SpokeConnector.sol";
import {ISpokeConnector} from "../../../contracts/messaging/interfaces/ISpokeConnector.sol";
import {IResolver} from "../../../contracts/messaging/interfaces/IResolver.sol";

import "../../utils/ConnectorHelper.sol";

contract SendOutboundRootResolverTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============

  // ============ Storage ============
  SendOutboundRootResolver _resolver;
  address notOwner = address(100);
  address connector = address(300);
  uint256 execution_interval = 100;
  bytes32 outboundRoot = bytes32("test");

  function setUp() public {
    _resolver = new SendOutboundRootResolver(connector, execution_interval);
  }

  // ============ Utils ============

  // ============ SendOutboundRootResolver.sendMessage ============
  function test_SendOutboundRootResolver__sendMessage_shouldWork() public {
    uint256 execute_timestamp = block.timestamp + 1000;
    vm.warp(execute_timestamp);

    vm.mockCall(connector, abi.encodeWithSelector(ISpokeConnector.outboundRoot.selector), abi.encode(outboundRoot));
    _resolver.sendMessage();

    assertEq(_resolver.lastRootSent(), outboundRoot);
    assertEq(_resolver.lastExecuted(), execute_timestamp);
  }

  // ============ SendOutboundRootResolver.changeExecutionInterval ============
  function test_SendOutboundRootResolver__changeExecutionInterval_shouldWork() public {
    _resolver.changeExecutionInterval(execution_interval);

    assertEq(_resolver.EXECUTION_INTERVAL(), execution_interval);
  }

  function test_SendOutboundRootResolver__changeExecutionInterval_shouldFailIfCallerNotOwner() public {
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);

    vm.prank(notOwner);
    _resolver.changeExecutionInterval(execution_interval);
  }

  function test_SendOutboundRootResolver__changeExecutionInterval_shouldFailExecutionIntervalIsZero() public {
    vm.expectRevert(bytes("SendOutboundRootResolver: execution interval must be > 0"));

    _resolver.changeExecutionInterval(0);
  }

  // ============ SendOutboundRootResolver.checker ============
  function test_SendOutboundRootResolver__checker_shouldWork() public {
    uint256 execute_timestamp = block.timestamp + 1000;
    vm.warp(execute_timestamp);

    vm.mockCall(connector, abi.encodeWithSelector(ISpokeConnector.outboundRoot.selector), abi.encode(outboundRoot));
    _resolver.sendMessage();

    uint256 good_interval = execution_interval + 1;
    vm.warp(execute_timestamp + good_interval);

    bytes32 newOutboundRoot = bytes32("test2");
    vm.mockCall(connector, abi.encodeWithSelector(ISpokeConnector.outboundRoot.selector), abi.encode(newOutboundRoot));
    (bool canExec, bytes memory execPayload) = _resolver.checker();

    assertEq(canExec, true);
    assertEq(execPayload, abi.encodeWithSelector(_resolver.sendMessage.selector, newOutboundRoot));
  }

  function test_SendOutboundRootResolver__checker_shouldReturnFalseIfExecutionIntervalNotPassed() public {
    uint256 execute_timestamp = block.timestamp + 1000;
    vm.warp(execute_timestamp);

    vm.mockCall(connector, abi.encodeWithSelector(ISpokeConnector.outboundRoot.selector), abi.encode(outboundRoot));
    _resolver.sendMessage();

    uint256 bad_interval = execution_interval - 1;
    vm.warp(execute_timestamp + bad_interval);

    (bool canExec, bytes memory execPayload) = _resolver.checker();

    assertEq(canExec, false);
    assertEq(execPayload, bytes("EXECUTION_INTERVAL seconds are not passed yet"));
  }

  function test_SendOutboundRootResolver__checker_shouldReturnFalseIfRootIsSame() public {
    uint256 execute_timestamp = block.timestamp + 1000;
    vm.warp(execute_timestamp);

    vm.mockCall(connector, abi.encodeWithSelector(ISpokeConnector.outboundRoot.selector), abi.encode(outboundRoot));
    _resolver.sendMessage();

    uint256 good_interval = execution_interval + 1;
    vm.warp(execute_timestamp + good_interval);

    (bool canExec, bytes memory execPayload) = _resolver.checker();
    assertEq(canExec, false);
    assertEq(execPayload, bytes("Sent root is the same as the current root"));
  }
}
