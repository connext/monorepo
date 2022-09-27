// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {GnosisHubConnector} from "../../../../contracts/messaging/connectors/gnosis/GnosisHubConnector.sol";
import {GnosisAmb} from "../../../../contracts/messaging/interfaces/ambs/GnosisAmb.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract GnosisHubConnectorTest is ConnectorHelper {
  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));

    _l2Connector = address(123123);
    _l1Connector = address(new GnosisHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _mirrorGas));
  }

  // ============ Utils ============
  function utils_setHubConnectorVerifyMocks(address _sender) public {
    // 1. call to amb on message sender
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.messageSender.selector), abi.encode(_sender));
  }

  // ============ GnosisHubConnector.verifySender ============
  function test_GnosisHubConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(111);
    utils_setHubConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(GnosisHubConnector(_l1Connector).verifySender(expected));
  }

  function test_GnosisHubConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(111);
    utils_setHubConnectorVerifyMocks(address(222));

    vm.prank(_amb);
    assertFalse(GnosisHubConnector(_l1Connector).verifySender(expected));
  }

  function test_GnosisHubConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(111);
    utils_setHubConnectorVerifyMocks(expected);

    vm.expectRevert(abi.encodePacked("!bridge"));
    vm.prank(address(0x123));
    GnosisHubConnector(_l1Connector).verifySender(expected);
  }

  // ============ GnosisHubConnector._sendMessage ============
  function test_GnosisHubConnector__sendMessage_shouldWork() public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.requireToPassMessage.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call the requireToPassMessage function of GnosisAMB
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        GnosisAmb.requireToPassMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _mirrorGas
      )
    );

    vm.prank(_rootManager);
    GnosisHubConnector(_l1Connector).sendMessage(_data);
  }

  function test_GnosisHubConnector__sendMessage_shouldWork_fuzz(bytes32 data) public {
    // setup mock
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.requireToPassMessage.selector), abi.encode(123));

    // data
    bytes memory _data = abi.encodePacked(data);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    // should call the requireToPassMessage function of GnosisAMB
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        GnosisAmb.requireToPassMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _mirrorGas
      )
    );

    vm.prank(_rootManager);
    GnosisHubConnector(_l1Connector).sendMessage(_data);
  }

  // ============ GnosisHubConnector._processMessage ============
  function test_GnosisHubConnector__processMessage_shouldWork() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    uint256 chainId = 1337;
    vm.chainId(chainId);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

    uint32 _mirrorDomain = GnosisHubConnector(_l1Connector).MIRROR_DOMAIN();
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))),
      abi.encode()
    );

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_dataCorrectSize, _amb);

    vm.expectCall(_rootManager, abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))));
    vm.prank(_amb);
    GnosisHubConnector(_l1Connector).processMessage(_data);
  }

  function test_GnosisHubConnector__processMessage_shouldWork_fuzz(bytes32 data) public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    // data
    bytes memory _data = abi.encodePacked(data);

    uint256 chainId = 1337;
    vm.chainId(chainId);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

    uint32 _mirrorDomain = GnosisHubConnector(_l1Connector).MIRROR_DOMAIN();
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))),
      abi.encode()
    );

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_dataCorrectSize, _amb);

    vm.expectCall(_rootManager, abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))));
    vm.prank(_amb);
    GnosisHubConnector(_l1Connector).processMessage(_data);
  }

  function test_GnosisHubConnector__processMessage_shouldFailIfSenderNotVerified() public {
    utils_setHubConnectorVerifyMocks(address(0x123));

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    uint256 chainId = 1337;
    vm.chainId(chainId);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

    uint32 _mirrorDomain = GnosisHubConnector(_l1Connector).MIRROR_DOMAIN();
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))),
      abi.encode()
    );

    vm.prank(_amb);
    vm.expectRevert(abi.encodePacked("!l2Connector"));
    GnosisHubConnector(_l1Connector).processMessage(_data);
  }

  function test_GnosisHubConnector__processMessage_shouldFailIfDestChainIdMismatch() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    // data
    bytes memory _data = abi.encodePacked(bytes32(bytes("test")));

    uint256 chainId = 1337;
    vm.chainId(1338);
    vm.mockCall(_amb, abi.encodeWithSelector(GnosisAmb.destinationChainId.selector), abi.encode(chainId));

    uint32 _mirrorDomain = GnosisHubConnector(_l1Connector).MIRROR_DOMAIN();
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))),
      abi.encode()
    );

    vm.prank(_amb);
    vm.expectRevert(abi.encodePacked("!destinationChain"));
    GnosisHubConnector(_l1Connector).processMessage(_data);
  }
}
