// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {MainnetSpokeConnector} from "../../../../contracts/messaging/connectors/mainnet/MainnetSpokeConnector.sol";
import {SpokeConnector} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";

import "../../../utils/ConnectorHelper.sol";

contract MainnetSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============

  // ============ Storage ============
  bytes32 outboundRoot = bytes32("test");

  // ============ Test set up ============
  function setUp() public {
    _l2Connector = address(123321123);

    // deploy
    _l1Connector = address(
      new MainnetSpokeConnector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        _l2Connector,
        _mirrorGas,
        _processGas,
        _reserveGas
      )
    );
  }

  // ============ Utils ============

  // ============ MainnetSpokeConnector.verifySender ============
  function test_MainnetSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(this);

    assertTrue(MainnetSpokeConnector(_l1Connector).verifySender(expected));
  }

  function test_MainnetSpokeConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);

    assertEq(MainnetSpokeConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ MainnetSpokeConnector.sendMessage ============
  function test_MainnetSpokeConnector__sendMessage_fromRootManagerWorks() public {
    // bytes memory _data = abi.encode(MainnetSpokeConnector(_l1Connector).outboundRoot());
    // // should emit an event
    // vm.expectEmit(true, true, true, true);
    // emit MessageSent(_data, _rootManager);
    // // should call updateAggregateRoot
    // vm.expectCall(_l1Connector, abi.encodeWithSelector(_l1Connector.updateAggregateRoot.selector, bytes32(_data)));
    // vm.prank(_rootManager);
    // MainnetSpokeConnector(_l1Connector).sendMessage(_data);
  }

  function test_MainnetSpokeConnector__sendMessage_failsIfCallerNotRootManager() public {
    bytes memory _data = abi.encode(MainnetSpokeConnector(_l1Connector).outboundRoot());

    vm.expectRevert(bytes("!rootManager"));

    // called as NOT root manager
    MainnetSpokeConnector(_l1Connector).sendMessage(_data);
  }

  function test_MainnetSpokeConnector__sendMessage_failsIfNot32Bytes() public {
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not 32 bytes
    vm.expectRevert(bytes("!length"));

    vm.prank(_rootManager);
    MainnetSpokeConnector(_l1Connector).sendMessage(_data);
  }
}
