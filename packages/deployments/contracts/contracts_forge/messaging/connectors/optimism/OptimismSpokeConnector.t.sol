// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {OptimismSpokeConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismSpokeConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = address(123321123);

    _l2Connector = address(
      new OptimismSpokeConnector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorGas,
        _processGas,
        _reserveGas
      )
    );
  }

  // ============ Utils ============

  // ============ OptimismSpokeConnector.verifySender ============
  function test_OptimismSpokeConnector__verifySender_shouldWorkIfTrue() public {}

  function test_OptimismSpokeConnector__verifySender_shouldWorkIfFalse() public {}

  function test_OptimismSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {}

  // ============ OptimismSpokeConnector.sendMessage ============
  function test_OptimismSpokeConnector__sendMessage_works() public {}

  // ============ OptimismSpokeConnector.processMessage ============
  function test_OptimismSpokeConnector__processMessage_works() public {}

  function test_OptimismSpokeConnector__processMessage_failsIfNotCrosschain() public {}

  function test_OptimismSpokeConnector__processMessage_failsIfNotMirrorConnector() public {}

  function test_OptimismSpokeConnector__processMessage_failsIfNot32Bytes() public {}
}
