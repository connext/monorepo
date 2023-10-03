// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {WormholeSpokeConnector} from "../../../../contracts/messaging/connectors/wormhole/WormholeSpokeConnector.sol";
import {BaseWormhole} from "../../../../contracts/messaging/connectors/wormhole/BaseWormhole.sol";
import "../../../../contracts/messaging/interfaces/ambs/wormhole/IWormholeRelayer.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract WormholeSpokeConnectorTest is ConnectorHelper {
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
    _l1Connector = payable(address(bytes20(keccak256("_l1Connector"))));
    _merkle = address(new MerkleTreeManager());

    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _l1Domain,
      mirrorDomain: _l2Domain,
      amb: _amb,
      rootManager: _rootManager,
      mirrorConnector: _l1Connector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: 0,
      merkle: _merkle,
      watcherManager: address(0),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    // Deploy
    vm.prank(_owner);
    _l2Connector = payable(address(new WormholeSpokeConnector(_baseParams, _gasCapL1, _chainIdL1)));
  }

  // ============ Utils ============

  // ============ send ============

  // Happy path L1
  function test_WormholeSpokeConnector_send_sendAndEmitEvent(bytes32 _root) public {
    vm.assume(_root != bytes32(0));
    uint256 gasLimit = 200000;
    bytes memory encodedData = abi.encode(gasLimit);
    bytes memory _data = abi.encodePacked(_root);

    // Mock the call to fees
    vm.mockCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL1, 0, gasLimit),
      abi.encode(100, 100)
    );

    vm.mockCall(_merkle, abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(_root));

    // Mock the call to sendPayloadToEvm
    vm.mockCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL1,
        address(_l1Connector),
        _data,
        uint256(0),
        gasLimit,
        _chainIdL1,
        _owner
      ),
      abi.encode(uint64(1))
    );

    // Check: call to sendPayloadToEvm?
    vm.expectCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL1,
        address(_l1Connector),
        _data,
        0,
        gasLimit,
        _chainIdL1,
        _owner
      )
    );

    // Check: call to fees?
    vm.expectCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL1, 0, gasLimit)
    );

    vm.deal(_owner, 1 ether);
    vm.prank(_owner);
    WormholeSpokeConnector(_l2Connector).send{value: 100}(encodedData);
  }

  function test_WormholeSpokeConnector_send_sendWithGasCap(bytes32 _root) public {
    vm.assume(_root != bytes32(0));
    uint256 gasLimit = _gasCapL1 + 1;
    bytes memory encodedData = abi.encode(gasLimit);
    bytes memory _data = abi.encodePacked(_root);

    // Mock the call to fees
    vm.mockCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL1, 0, _gasCapL1),
      abi.encode(100, 100)
    );

    vm.mockCall(_merkle, abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(_root));

    // Mock the call to sendPayloadToEvm
    vm.mockCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL1,
        address(_l1Connector),
        _data,
        uint256(0),
        gasLimit,
        _chainIdL1,
        _owner
      ),
      abi.encode(uint64(1))
    );

    // Check: call to sendPayloadToEvm?
    vm.expectCall(
      _amb,
      100,
      abi.encodeWithSignature(
        "sendPayloadToEvm(uint16,address,bytes,uint256,uint256,uint16,address)",
        _chainIdL1,
        address(_l1Connector),
        _data,
        0,
        gasLimit,
        _chainIdL1,
        _owner
      )
    );

    // Check: call to fees?
    vm.expectCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL1, 0, _gasCapL1)
    );

    vm.deal(_owner, 1 ether);
    vm.prank(_owner);
    WormholeSpokeConnector(_l2Connector).send{value: 100}(encodedData);
  }

  // data length
  function test_WormholeSpokeConnector_send_failsIfBadDataLength(bytes memory _data) public {
    vm.assume(_data.length != 32);

    vm.expectRevert(bytes("!encoded data length"));
    WormholeSpokeConnector(_l2Connector).send{value: 1}(_data);
  }

  // insufficient fees
  function test_WormholeSpokeConnector_send_failsIfInsufficientFees() public {
    // Mock the call to fees
    uint256 gasLimit = 20000;
    vm.mockCall(
      _amb,
      abi.encodeWithSignature("quoteEVMDeliveryPrice(uint16,uint256,uint256)", _chainIdL1, 0, gasLimit),
      abi.encode(100, 100)
    );

    bytes memory _encodeData = abi.encode(gasLimit);

    vm.expectRevert(bytes("!msg.value"));
    WormholeSpokeConnector(_l2Connector).send{value: 10}(_encodeData);
  }

  // ============ processMessage ============

  // Happy path L1
  function test_WormholeSpokeConnector_processMessage_processMessageAndEmitEvent(bytes32 _root) public {
    vm.assume(_root != bytes32(0x0));
    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_root));

    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_dataCorrectSize, _amb);

    // should call from relayer addres
    vm.prank(_amb);
    WormholeSpokeConnector(_l2Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l1Connector)))),
      _chainIdL1,
      bytes32(keccak256(("deliveryHash")))
    );
    assertTrue(WormholeSpokeConnector(_l2Connector).processedWhMessages(bytes32(keccak256(("deliveryHash")))));
    // Check: root is marked as pending
    assertEq(WormholeSpokeConnector(_l2Connector).pendingAggregateRoots(bytes32(_dataCorrectSize)), block.number);
  }

  // msg.sender is not the bridge on L1
  function test_WormholeSpokeConnector_processMessage_revertIfAmbIsNotMsgSender(
    address _notAmb,
    bytes calldata _data
  ) public {
    vm.assume(_amb != _notAmb);
    vm.assume(_data.length != 0);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!relayer"));
    vm.prank(_notAmb);

    WormholeSpokeConnector(_l2Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l1Connector)))),
      _chainIdL1,
      bytes32(keccak256(("deliveryHash")))
    );
  }

  // message coming from a wrong sender on the origin chain to L1
  function test_WormholeSpokeConnector_processMessage_revertIfWrongSourceAddress(
    address _wrongMirror,
    bytes calldata _data
  ) public {
    vm.assume(_wrongMirror != _l1Connector);
    vm.assume(_data.length != 0);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!mirrorConnector"));
    vm.prank(_amb);
    WormholeSpokeConnector(_l2Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(_wrongMirror))),
      _chainIdL1,
      bytes32(keccak256(("deliveryHash")))
    );
  }

  // message coming from a wrong chain to L1
  function test_WormholeSpokeConnector_processMessage_revertIfWrongSourceChain(uint16 _wrongId) public {
    vm.assume(_wrongId != _chainIdL1);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32("0x12"));

    vm.expectRevert(abi.encodePacked("!source chain"));
    vm.prank(_amb);
    WormholeSpokeConnector(_l2Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l1Connector)))),
      _wrongId,
      bytes32(keccak256(("deliveryHash")))
    );
  }

  // message coming from a wrong chain to L1
  function test_WormholeSpokeConnector_processMessage_revertIfAlreadyProcessed(bytes calldata _data) public {
    vm.assume(_data.length != 0);
    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    bytes32 deliveryHash = bytes32(keccak256(("deliveryHash")));
    stdstore.target(address(_l2Connector)).sig("processedWhMessages(bytes32)").with_key(deliveryHash).checked_write(
      true
    );

    vm.expectRevert(abi.encodePacked("already processed"));
    vm.prank(_amb);
    WormholeSpokeConnector(_l2Connector).receiveWormholeMessages(
      _dataCorrectSize,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l1Connector)))),
      _chainIdL1,
      deliveryHash
    );
  }

  // message has a length > 32 bytes
  function test_WormholeSpokeConnector_processMessage_revertIfWrongDataLength(uint8 callDataLength) public {
    vm.assume(callDataLength != 32);

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    vm.expectRevert(abi.encodePacked("!length"));
    vm.prank(_amb);
    WormholeSpokeConnector(_l2Connector).receiveWormholeMessages(
      _wrongLengthCalldata,
      new bytes[](0),
      bytes32(uint256(uint160(address(_l1Connector)))),
      _chainIdL1,
      bytes32(keccak256(("deliveryHash")))
    );
  }
}
