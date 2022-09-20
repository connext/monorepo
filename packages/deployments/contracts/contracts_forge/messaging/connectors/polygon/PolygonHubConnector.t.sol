// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {IFxStateSender} from "../../../../contracts/messaging/connectors/polygon/tunnel/FxBaseRootTunnel.sol";
import {PolygonHubConnector} from "../../../../contracts/messaging/connectors/polygon/PolygonHubConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract PolygonHubConnectorTest is ConnectorHelper {
  address _checkPointManager = address(88888);

  function setUp() public {
    _l2Connector = address(3432123);
    // deploy
    _l1Connector = address(
      new PolygonHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _mirrorGas, _checkPointManager)
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorProcessMocks(address _sender) public {
    // 3. call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.setOutboundRoot.selector), abi.encode(true));
  }

  // ============ PolygonHubConnector.setFxChildTunnel ============
  function test_PolygonHubConnector__setFxChildTunnel_shouldWork() public {
    address childTunnel = address(1);
    PolygonHubConnector(_l1Connector).setFxChildTunnel(childTunnel);
    assertEq(PolygonHubConnector(_l1Connector).fxChildTunnel(), childTunnel);
  }

  function test_PolygonHubConnector__setFxChildTunnel_failedIfAlreadySet() public {
    address childTunnel = address(1);
    PolygonHubConnector(_l1Connector).setFxChildTunnel(childTunnel);
    assertEq(PolygonHubConnector(_l1Connector).fxChildTunnel(), childTunnel);

    childTunnel = address(2);
    vm.expectRevert(bytes("FxBaseRootTunnel: CHILD_TUNNEL_ALREADY_SET"));

    PolygonHubConnector(_l1Connector).setFxChildTunnel(childTunnel);
  }

  // ============ PolygonHubConnector.sendMessage ============
  function test_PolygonHubConnector__sendMessage_works() public {
    PolygonHubConnector(_l1Connector).setFxChildTunnel(_l2Connector);

    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(IFxStateSender.sendMessageToChild.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encode(123123123);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call send contract transaction
    vm.expectCall(_amb, abi.encodeWithSelector(IFxStateSender.sendMessageToChild.selector, _l2Connector, _data));

    vm.prank(_rootManager);
    PolygonHubConnector(_l1Connector).sendMessage(_data);
  }

  // ============ PolygonHubConnector.processMessage ============
}
