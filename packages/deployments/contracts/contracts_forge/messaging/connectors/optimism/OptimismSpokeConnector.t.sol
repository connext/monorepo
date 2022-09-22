// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {OptimismHubConnector} from "../../../../contracts/messaging/connectors/Optimism/OptimismHubConnector.sol";

import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/OptimismAmb.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismHubConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============
  uint256 _defaultGasPrice = 10 gwei;

  function setUp() public {
    _l2Connector = address(3432123);
    // deploy
    _l1Connector = address(
      new OptimismHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _mirrorGas, _defaultGasPrice)
    );
  }

  // ============ Utils ============

  // ============ OptimismHubConnector.setDefaultGasPrice ============
  function test_OptimismHubConnector__setDefaultGasPrice_shouldWork() public {}

  // ============ OptimismHubConnector.verifySender ============
  function test_OptimismHubConnector__verifySender_shouldWorkIfTrue() public {}

  function test_OptimismHubConnector__verifySender_shouldWorkIfFalse() public {}

  function test_OptimismHubConnector__verifySender_shouldFailIfCallerNotAmb() public {}

  // ============ OptimismHubConnector.sendMessage ============
  function test_OptimismHubConnector__sendMessage_works() public {}

  // ============ OptimismHubConnector.processMessage ============
  function test_OptimismHubConnector__processMessage_works() public {}

  function test_OptimismHubConnector__processMessage_failsIfNotSentByBridge() public {}

  function test_OptimismHubConnector__processMessage_failsIfNotMirrorConnector() public {}

  function test_OptimismHubConnector__processMessage_failsIfNot32Bytes() public {}
}
