// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {MultichainSpokeConnector} from "../../../../contracts/messaging/connectors/multichain/MultichainSpokeConnector.sol";
import {Multichain} from "../../../../contracts/messaging/interfaces/ambs/Multichain.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract MultichainSpokeConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;

  // ============ Storage ============
  address _executor = address(bytes20(keccak256("_executor")));
  uint256 _chainIdMainnet = 1;
  uint256 _chainIdL2 = 42069;

  // ============ Test set up ============
  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));
    vm.etch(_rootManager, new bytes(0x42));

    // Mock the call to retrieve the executor in the base BSC constructor
    vm.mockCall(_amb, abi.encodeCall(Multichain.executor, ()), abi.encode(_executor));

    // Get the n+1 deployment address
    _l1Connector = address(123123123123);

    // Deploy
    vm.prank(_owner);
    _l2Connector = address(
      new MultichainSpokeConnector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorGas,
        _processGas,
        _reserveGas,
        _chainIdMainnet
      )
    );
  }

  // ============ sendMessage ============
  // Happy path L2
  function test_MultichainSpokeConnector_sendMessage_sendMessageAndEmitEvent() public {
    bytes memory _data = abi.encode(MultichainSpokeConnector(_l2Connector).outboundRoot());
    // Mock the call to anyCall
    vm.mockCall(
      _amb,
      abi.encodeCall(
        Multichain.anyCall,
        (
          _amb,
          _data,
          address(0), // fallback address
          _chainIdMainnet, // chain id
          0
        ) // 0 = fee on destination
      ),
      abi.encode()
    );

    // Check: call to multichain anyCall?
    vm.expectCall(_amb, abi.encodeCall(Multichain.anyCall, (_amb, _data, address(0), _chainIdMainnet, 0)));

    vm.prank(_rootManager);
    MultichainSpokeConnector(_l2Connector).send();
  }

  // ============ processMessage ============

  // Happy path L2
  function test_MultichainSpokeConnector_processMessage_processMessageUpdateRootAndEmitEvent(bytes calldata _data)
    public
  {
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l1Connector, 1, 1));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l2Connector);
    emit MessageProcessed(_dataCorrectSize, _amb);

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    MultichainSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);

    // Check: root is updated
    assertEq(MultichainSpokeConnector(_l2Connector).aggregateRoot(), bytes32(_data));
  }

  // msg.sender is not the bridge on L2
  function test_MultichainSpokeConnector_processMessage_revertIfAmbIsNotMsgSender(address _notAmb, bytes calldata _data)
    public
  {
    vm.assume(_amb != _notAmb);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!AMB"));
    vm.prank(_notAmb);
    MultichainSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);
  }

  // message coming from a wrong sender on the origin chain to L2
  function test_MultichainSpokeConnector_processMessage_revertIfWrongMirror(address _wrongMirror, bytes calldata _data)
    public
  {
    vm.assume(_wrongMirror != _l1Connector);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_wrongMirror, _chainIdMainnet, 1));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!l1Connector"));
    vm.prank(_amb);
    MultichainSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);
  }

  // message coming from a wrong chain to L2
  function test_MultichainSpokeConnector_processMessage_revertIfWrongOriginId(uint256 _wrongId, bytes calldata _data)
    public
  {
    vm.assume(_wrongId != _chainIdMainnet);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l1Connector, _wrongId, 1));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!l1Connector"));
    vm.prank(_amb);
    MultichainSpokeConnector(_l2Connector).processMessage(_dataCorrectSize);
  }

  // message has a length > 32 bytes
  function test_MultichainSpokeConnector_processMessage_revertIfWrongDataLength(uint8 callDataLength) public {
    vm.assume(callDataLength != 32);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l1Connector, _chainIdMainnet, 1));

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    vm.expectRevert(abi.encodePacked("!length"));
    vm.prank(_amb);
    MultichainSpokeConnector(_l2Connector).processMessage(_wrongLengthCalldata);
  }

  // ============ verifySender ============

  // Initiator is the address on the other chain, as returned by multichaincall.context() (ie the mirror)
  function test_MultichainSpokeConnector_verifySender_trueIfCorrectInitiatorAndMsgSender(address _from) public {
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_from, 1, _chainIdL2));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    assertTrue(MultichainSpokeConnector(_l2Connector).verifySender(_from));
  }

  // return false if wrong executor
  function test_MultichainSpokeConnector_verifySender_falseIfWrongInitiator(address _from, address _wrongFrom) public {
    vm.assume(_from != _wrongFrom);
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_wrongFrom, 1, _chainIdL2));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    assertFalse(MultichainSpokeConnector(_l2Connector).verifySender(_from));
  }

  // return false if the origin chain has an unexpected id
  function test_MultichainSpokeConnector_verifySender_falseIfWrongOriginId(uint256 _wrongId) public {
    vm.assume(_wrongId != _chainIdMainnet);
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l1Connector, _wrongId, _chainIdL2));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    assertFalse(MultichainSpokeConnector(_l2Connector).verifySender(_l1Connector));
  }

  // reverse if sender != amb
  function test_MultichainSpokeConnector_verifySender_revertIfSenderIsNotAmb(address _from, address _wrongAmb) public {
    vm.assume(_wrongAmb != _amb);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_from, 1, 1));

    vm.expectRevert(abi.encodePacked("!bridge"));
    vm.prank(_wrongAmb);
    MultichainSpokeConnector(_l2Connector).verifySender(_from);
  }
}
