// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {WormholeHubConnector} from "../../../../contracts/messaging/connectors/wormhole/WormholeHubConnector.sol";
import {BaseWormhole} from "../../../../contracts/messaging/connectors/wormhole/BaseWormhole.sol";
import "../../../../contracts/messaging/interfaces/ambs/wormhole/IWormholeRelayer.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract WormholeHubConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;

  // ============ Storage ============
  uint16 _chainIdL1 = 2;
  uint16 _chainIdL2 = 4;
  uint256 _gasCapL1 = 300000;
  uint256 _gasCapL2 = 300000;

  // ============ Test set up ============
  function setUp() public {
    vm.clearMockedCalls();

    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));
    vm.etch(_rootManager, new bytes(0x42));

    // Get the n+1 deployment address
    _l2Connector = payable(address(bytes20(keccak256("_l2Connector"))));

    // Deploy
    vm.prank(_owner);
    _l1Connector = payable(
      address(new WormholeHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _gasCapL2, _chainIdL2))
    );
  }

  // ============ Utils ============

  // ============ sendMessage ============

  // Happy path L1
  function test_WormholeHubConnector_sendMessage_sendMessageAndEmitEvent(bytes memory _data) public {
    vm.assume(_data.length == 32);

    uint256 gasLimit = 200000;
    bytes memory encodedData = abi.encode(gasLimit);

    // Mock the call to fees
    vm.mockCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL2, 0, gasLimit),
      abi.encode(100, 100)
    );

    // Mock the call to sendPayloadToEvm
    vm.mockCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL2,
        address(_l2Connector),
        _data,
        uint256(0),
        gasLimit,
        _chainIdL2,
        _owner
      ),
      abi.encode(uint64(1))
    );

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MessageSent(_data, encodedData, _rootManager);

    // Check: call to sendPayloadToEvm?
    vm.expectCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL2,
        address(_l2Connector),
        _data,
        0,
        gasLimit,
        _chainIdL2,
        _owner
      )
    );

    // Check: call to fees?
    vm.expectCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL2, 0, gasLimit)
    );

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    WormholeHubConnector(_l1Connector).sendMessage{value: 100}(_data, encodedData);
  }

  function test_WormholeHubConnector_sendMessage_sendMessageWithGasCap(bytes memory _data) public {
    vm.assume(_data.length == 32);

    uint256 gasLimit = _gasCapL2 + 1;
    bytes memory encodedData = abi.encode(gasLimit);

    // Mock the call to fees
    vm.mockCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL2, 0, _gasCapL2),
      abi.encode(100, 100)
    );

    // Mock the call to sendPayloadToEvm
    vm.mockCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL2,
        address(_l2Connector),
        _data,
        uint256(0),
        gasLimit,
        _chainIdL2,
        _owner
      ),
      abi.encode(uint64(1))
    );

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MessageSent(_data, encodedData, _rootManager);

    // Check: call to sendPayloadToEvm?
    vm.expectCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL2,
        address(_l2Connector),
        _data,
        0,
        gasLimit,
        _chainIdL2,
        _owner
      )
    );

    // Check: call to fees?
    vm.expectCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL2, 0, _gasCapL2)
    );

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    WormholeHubConnector(_l1Connector).sendMessage{value: 100}(_data, encodedData);
  }

  // Access control
  function test_WormholeConnector_sendMessage_revertIfSenderIsNotRootManager(
    address _nonRootManager,
    bytes memory _data
  ) public {
    vm.assume(_nonRootManager != _rootManager);

    // Check: revert if caller is not root manager
    vm.expectRevert(abi.encodePacked("!rootManager"));

    vm.deal(_nonRootManager, 1 ether);
    vm.prank(_nonRootManager);
    WormholeHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // data length
  function test_WormholeHubConnector_sendMessage_failsIfBadDataLength(bytes memory _data) public {
    vm.assume(_data.length != 32);

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!data length"));
    WormholeHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // encoded length
  function test_WormholeHubConnector_sendMessage_failsIfBadEncodedLength(bytes memory _encoded) public {
    vm.assume(_encoded.length != 32);

    bytes memory _data = abi.encode(5216);
    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!encoded data length"));
    WormholeHubConnector(_l1Connector).sendMessage{value: 1}(_data, _encoded);
  }

  // insufficient fees
  function test_WormholeHubConnector_sendMessage_failsIfInsufficientFees() public {
    // Mock the call to fees
    uint256 gasLimit = 20000;
    vm.mockCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL2, 0, gasLimit),
      abi.encode(100, 100)
    );

    bytes memory _encodeData = abi.encode(gasLimit);
    bytes memory _data = abi.encode(5216);
    vm.deal(_rootManager, 1 ether);
    vm.startPrank(_rootManager);
    vm.expectRevert(bytes("!msg.value"));
    WormholeHubConnector(_l1Connector).sendMessage{value: 10}(_data, _encodeData);
    vm.stopPrank();
  }

  // ============ processMessage ============

  // Happy path L1
  function test_WormholeHubConnector_processMessage_processMessageAndEmitEvent(bytes calldata _data) public {
    uint32 _mirrorDomain = WormholeHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    // Check: call to root manager?
    vm.expectCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))));

    // should call from relayer addres
    vm.prank(_amb);

    WormholeHubConnector(_l1Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l2Connector)))),
      _chainIdL2,
      bytes32(keccak256(("deliveryHash")))
    );
    assertTrue(WormholeHubConnector(_l1Connector).processedWhMessages(bytes32(keccak256(("deliveryHash")))));
  }

  // msg.sender is not the bridge on L1
  function test_WormholeHubConnector_processMessage_revertIfAmbIsNotMsgSender(
    address _notAmb,
    bytes calldata _data
  ) public {
    vm.assume(_amb != _notAmb);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!relayer"));
    vm.prank(_notAmb);

    WormholeHubConnector(_l1Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l2Connector)))),
      _chainIdL2,
      bytes32(keccak256(("deliveryHash")))
    );
  }

  // message coming from a wrong sender on the origin chain to L1
  function test_WormholeHubConnector_processMessage_revertIfWrongSourceAddress(
    address _wrongMirror,
    bytes calldata _data
  ) public {
    vm.assume(_wrongMirror != _l2Connector);

    uint32 _mirrorDomain = WormholeHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!l2Connector"));
    vm.prank(_amb);

    WormholeHubConnector(_l1Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(_wrongMirror))),
      _chainIdL2,
      bytes32(keccak256(("deliveryHash")))
    );
  }

  // message coming from a wrong chain to L1
  function test_WormholeHubConnector_processMessage_revertIfWrongSourceChain(
    uint16 _wrongId,
    bytes calldata _data
  ) public {
    vm.assume(_wrongId != _chainIdL2);

    uint32 _mirrorDomain = WormholeHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!source chain"));
    vm.prank(_amb);
    WormholeHubConnector(_l1Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l2Connector)))),
      _wrongId,
      bytes32(keccak256(("deliveryHash")))
    );
  }

  // message coming from a wrong chain to L1
  function test_WormholeHubConnector_processMessage_revertIfAlreadyProcessed(bytes calldata _data) public {
    uint32 _mirrorDomain = WormholeHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    bytes32 deliveryHash = bytes32(keccak256(("deliveryHash")));
    stdstore.target(address(_l1Connector)).sig("processedWhMessages(bytes32)").with_key(deliveryHash).checked_write(
      true
    );

    vm.expectRevert(abi.encodePacked("already processed"));
    vm.prank(_amb);
    WormholeHubConnector(_l1Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l2Connector)))),
      _chainIdL2,
      deliveryHash
    );
  }

  // message has a length > 32 bytes
  function test_WormholeHubConnector_processMessage_revertIfWrongDataLength(uint8 callDataLength) public {
    vm.assume(callDataLength != 32);

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    vm.expectRevert(abi.encodePacked("!length"));
    vm.prank(_amb);
    WormholeHubConnector(_l1Connector).receiveWormholeMessages(
      _wrongLengthCalldata,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l2Connector)))),
      _chainIdL2,
      bytes32(keccak256(("deliveryHash")))
    );
  }
}
