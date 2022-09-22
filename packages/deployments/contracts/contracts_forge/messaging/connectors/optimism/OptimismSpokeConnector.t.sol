// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {OptimismSpokeConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismSpokeConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/OptimismAMB.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============

  // ============ Test set up ============
  function setUp() public {
    _l1Connector = address(123321123);

    // deploy
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
  function utils_setSpokeConnectorVerifyMocks(address _sender) public {
    // call to l2 bridge to get address
    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.xDomainMessageSender.selector), abi.encode(_sender));
  }

  // ============ OptimismSpokeConnector.verifySender ============
  function test_OptimismSpokeConnector__verifySender_shouldWorkIfSenderExpected() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(OptimismSpokeConnector(_l2Connector).verifySender(expected));
  }

  function test_OptimismSpokeConnector__verifySender_shouldWorkIfSenderNotExpected() public {
    address expected = address(234);
    address notExpected = address(123);
    utils_setSpokeConnectorVerifyMocks(notExpected);

    vm.prank(_amb);
    assertEq(OptimismSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  function test_OptimismSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);

    vm.expectRevert(bytes("!bridge"));
    assertEq(OptimismSpokeConnector(_l2Connector).verifySender(expected), false);
  }

  // ============ OptimismSpokeConnector.sendMessage ============
  function test_OptimismSpokeConnector__sendMessage_works() public {}

  // ============ OptimismSpokeConnector.processMessage ============
  function test_OptimismSpokeConnector__processMessage_works() public {}

  function test_OptimismSpokeConnector__processMessage_failsIfNotCrosschain() public {}

  function test_OptimismSpokeConnector__processMessage_failsIfNotMirrorConnector() public {}

  function test_OptimismSpokeConnector__processMessage_failsIfNot32Bytes() public {}
}
