// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {IFxStateSender} from "../../../../contracts/messaging/connectors/polygon/tunnel/FxBaseRootTunnel.sol";
import {PolygonHubConnector} from "../../../../contracts/messaging/connectors/polygon/PolygonHubConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract PolygonHubConnectorTest is ConnectorHelper {
  address _checkPointManager = address(88888);

  function setUp() public {
    _l2Connector = payable(address(123));
    // deploy
    _l1Connector = payable(
      address(new PolygonHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, address(0), _checkPointManager))
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorProcessMocks(address _sender) public {
    // 3. call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));
  }

  // ============ PolygonHubConnector.setFxChildTunnel ============

  function test_PolygonHubConnector__setMirrorConnector_shouldWork() public {
    PolygonHubConnector(_l1Connector).setMirrorConnector(_l2Connector);
    assertEq(PolygonHubConnector(_l1Connector).fxChildTunnel(), _l2Connector);
    assertEq(PolygonHubConnector(_l1Connector).mirrorConnector(), _l2Connector);
  }

  function test_PolygonHubConnector__setFxChildTunnel_failedIfAlreadySet() public {
    PolygonHubConnector(_l1Connector).setMirrorConnector(_l2Connector);
    assertEq(PolygonHubConnector(_l1Connector).fxChildTunnel(), _l2Connector);

    _l2Connector = payable(address(2));
    vm.expectRevert(bytes("FxBaseRootTunnel: CHILD_TUNNEL_ALREADY_SET"));

    PolygonHubConnector(_l1Connector).setMirrorConnector(_l2Connector);
  }

  // ============ PolygonHubConnector.sendMessage ============
  function test_PolygonHubConnector__sendMessage_works() public {
    PolygonHubConnector(_l1Connector).setMirrorConnector(_l2Connector);

    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(IFxStateSender.sendMessageToChild.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(123123123);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, bytes(""), _rootManager);

    // should call send contract transaction
    vm.expectCall(_amb, abi.encodeWithSelector(IFxStateSender.sendMessageToChild.selector, _l2Connector, _data));

    vm.prank(_rootManager);
    PolygonHubConnector(_l1Connector).sendMessage(_data, bytes(""));
  }

  function test_PolygonHubConnector__sendMessage_works_fuzz(bytes32 data) public {
    PolygonHubConnector(_l1Connector).setMirrorConnector(_l2Connector);

    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(IFxStateSender.sendMessageToChild.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(data);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, bytes(""), _rootManager);

    // should call send contract transaction
    vm.expectCall(_amb, abi.encodeWithSelector(IFxStateSender.sendMessageToChild.selector, _l2Connector, _data));

    vm.prank(_rootManager);
    PolygonHubConnector(_l1Connector).sendMessage(_data, bytes(""));
  }

  // ============ PolygonHubConnector.processMessage ============
}
