// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {OptimismSpokeConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismSpokeConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAMB.sol";

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
        _reserveGas,
        0, // delay blocks
        address(0) // watcher manager
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
  function test_OptimismSpokeConnector__sendMessage_works() public {
    bytes32 outboundRoot = OptimismSpokeConnector(_l2Connector).outboundRoot();
    bytes memory _data = abi.encode(outboundRoot);

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        OptimismAmb.sendMessage.selector,
        _l1Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _mirrorGas
      )
    );

    vm.prank(_rootManager);
    OptimismSpokeConnector(_l2Connector).send();
  }

  // ============ OptimismSpokeConnector.processMessage ============
  function test_OptimismSpokeConnector__processMessage_works() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"));

    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);

    assertEq(bytes32(_data), OptimismSpokeConnector(_l2Connector).aggregateRootPending());
  }

  function test_OptimismSpokeConnector__processMessage_failsIfNotMirrorConnector() public {
    utils_setSpokeConnectorVerifyMocks(address(123));

    bytes memory _data = abi.encode(bytes32("test"));

    vm.expectRevert(bytes("!l1Connector"));

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);
  }

  function test_OptimismSpokeConnector__processMessage_failsIfNot32Bytes() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    vm.expectRevert(bytes("!length"));

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);
  }

  // ============ Fuzz Tests ============
  function test_OptimismSpokeConnector__processMessage_works_fuzz(bytes32 data) public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector);

    bytes memory _data = abi.encode(data);

    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    vm.prank(_amb);
    OptimismSpokeConnector(_l2Connector).processMessage(_data);

    assertEq(bytes32(_data), OptimismSpokeConnector(_l2Connector).aggregateRootPending());
  }
}
