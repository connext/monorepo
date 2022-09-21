// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {SendOutboundRootResolver} from "../../contracts/messaging/connectors/SendOutboundRootResolver.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";

import "../utils/ConnectorHelper.sol";

contract SendOutboundRootResolverTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============

  // ============ Storage ============
  SendOutboundRootResolver _resolver;
  address notOwner = address(100);
  address connector = address(300);
  uint256 execution_interval = 100;

  function setUp() public {
    _resolver = new SendOutboundRootResolver();
  }

  // ============ Utils ============

  // ============ SendOutboundRootResolver.checker ============
  function test_SendOutboundRootResolver__checker_shouldWork() public {}

  function test_SendOutboundRootResolver__checker_shouldFailIfExecutionIntervalNotPassed() public {}

  function test_SendOutboundRootResolver__checker_shouldFailIfRootIsSame() public {}

  // ============ SendOutboundRootResolver.sendMessage ============
  function test_SendOutboundRootResolver__sendMessage_shouldWork() public {}

  // ============ SendOutboundRootResolver.changeExecutionInterval ============
  function test_SendOutboundRootResolver__changeExecutionInterval_shouldWork() public {}

  function test_SendOutboundRootResolver__changeExecutionInterval_shouldFailIfCallerNotOwner() public {}

  function test_SendOutboundRootResolver__changeExecutionInterval_shouldFailExecutionIntervalIsZero() public {}
}
