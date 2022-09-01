// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "../../../../contracts/core/messaging/connectors/Connector.sol";
import {BSCL1Connector, BSCL2Connector, BaseMultichainConnector, MultichainCall} from "../../../../contracts/core/messaging/connectors/BSCConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract BscConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;

  // ============ Storage ============
  address _executor = address(bytes20(keccak256("_executor")));
  uint256 _chainIdMainnet = 1;
  uint256 _chainIdBSC = 56;

  // ============ Test set up ============
  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));
    vm.etch(_rootManager, new bytes(0x42));

    // Mock the call to retrieve the executor in the base BSC constructor
    vm.mockCall(_amb, abi.encodeCall(MultichainCall.executor, ()), abi.encode(_executor));

    // Get the n+1 deployment address
    address _futureL2address = addressFrom(_owner, vm.getNonce(_owner) + 1);

    // Deploy
    vm.prank(_owner);
    _l1Connector = address(
      new BSCL1Connector(
        _l1Domain,
        _l2Domain,
        _chainIdBSC,
        _amb,
        _rootManager,
        _futureL2address,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    vm.prank(_owner);
    _l2Connector = address(
      new BSCL2Connector(
        _l2Domain,
        _l1Domain,
        _chainIdBSC,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    // Sanity check
    require(_futureL2address == _l2Connector, "BSCConnector Test Setup fail: l2Connector address mispredicted");
  }

  // ============ Utils ============

  // ============ sendMessage ============
  function test_BSCL1_sendMessage_sendMessageAndEmitEvent(bytes memory _data) public {
    // Mock the call to anyCall
    vm.mockCall(
      _amb,
      abi.encodeCall(
        MultichainCall.anyCall,
        (
          _amb,
          _data,
          address(0), // fallback address
          56, // chain id
          0
        ) // 0 = fee on destination
      ),
      abi.encode()
    );

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MessageSent(_data, _rootManager);

    // Check: call to multichain anyCall?
    vm.expectCall(_amb, abi.encodeCall(MultichainCall.anyCall, (_amb, _data, address(0), 56, 0)));

    vm.prank(_rootManager);
    BSCL1Connector(_l1Connector).sendMessage(_data);
  }

  function test_BSCL2_sendMessage_sendMessageAndEmitEvent(bytes memory _data) public {
    // Mock the call to anyCall
    vm.mockCall(
      _amb,
      abi.encodeCall(
        MultichainCall.anyCall,
        (
          _amb,
          _data,
          address(0), // fallback address
          1, // chain id
          0
        ) // 0 = fee on destination
      ),
      abi.encode()
    );

    // Check: call to multichain anyCall?
    vm.expectCall(_amb, abi.encodeCall(MultichainCall.anyCall, (_amb, _data, address(0), 1, 0)));

    vm.prank(_rootManager);
    BSCL1Connector(_l2Connector).sendMessage(_data);
  }

  function test_BSCL1_sendMessage_revertIfSenderIsNotRootManager(address _nonRootManager, bytes memory _data) public {
    vm.assume(_nonRootManager != _rootManager);

    // Check: revert if caller is not root manager
    vm.expectRevert(abi.encodePacked("!rootManager"));

    vm.prank(_nonRootManager);
    BSCL1Connector(_l1Connector).sendMessage(_data);
  }

  // id L2?

  // ============ processMessage ============

  function test_BSCL1_processMessage_processMessageAndEmitEvent(bytes calldata _data) public {
    uint32 _mirrorDomain = BSCL1Connector(_l1Connector).mirrorDomain();

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_l2Connector, 56, 1));

    // Mock the call to the root manager
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))),
      abi.encode()
    );

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MessageProcessed(_dataCorrectSize, _amb);

    // Check: call to root manager?
    vm.expectCall(_rootManager, abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    BSCL1Connector(_l1Connector).processMessage( _dataCorrectSize);
  }

  function test_BSCL2_processMessage_processMessageUpdateRootAndEmitEvent(bytes calldata _data) public {
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_l1Connector, 1, 1));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l2Connector);
    emit MessageProcessed(_dataCorrectSize, _amb);

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    BSCL2Connector(_l2Connector).processMessage( _dataCorrectSize);

    // Check: root is updated
    assertEq(BSCL2Connector(_l2Connector).aggregateRoot(), bytes32(_data));
  }

  function test_BSCL1_processMessage_revertIfAmbIsNotMsgSender(address _notAmb, bytes calldata _data) public {
    vm.assume(_amb != _notAmb);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!bridge"));
    vm.prank(_notAmb);
    BSCL1Connector(_l1Connector).processMessage(_dataCorrectSize);
  }

  function test_BSCL2_processMessage_revertIfAmbIsNotMsgSender(address _notAmb, bytes calldata _data) public {
    vm.assume(_amb != _notAmb);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!bridge"));
    vm.prank(_notAmb);
    BSCL2Connector(_l2Connector).processMessage(_dataCorrectSize);
  }

  function test_BSCL1_processMessage_revertIfWrongMirror(address _wrongMirror, bytes calldata _data) public {
    vm.assume(_wrongMirror != _l2Connector);

    uint32 _mirrorDomain = BSCL1Connector(_l1Connector).mirrorDomain();

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_wrongMirror, 56, 1));

    // Mock the call to the root manager
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.setOutboundRoot, (_mirrorDomain, bytes32(_data))),
      abi.encode()
    );

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!l2Connector"));
    vm.prank(_amb);
    BSCL1Connector(_l1Connector).processMessage(_dataCorrectSize);
  }

  function test_BSCL2_processMessage_revertIfWrongMirror(address _wrongMirror, bytes calldata _data) public {
    vm.assume(_wrongMirror != _l1Connector);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_wrongMirror, 1, 1));

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!sender"));
    vm.prank(_amb);
    BSCL2Connector(_l2Connector).processMessage(_dataCorrectSize);
  }

  function test_BSCL1_processMessage_revertIfWrongDataLength(uint8 callDataLength) public {
    vm.assume(callDataLength != 32);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_l2Connector, 56, 1));

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    vm.expectRevert(abi.encodePacked("!length"));
    vm.prank(_amb);
    BSCL1Connector(_l1Connector).processMessage(_wrongLengthCalldata);
  }

  function test_BSCL2_processMessage_revertIfWrongDataLength(uint8 callDataLength) public {
    vm.assume(callDataLength != 32);

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    vm.expectRevert(abi.encodePacked("!length"));
    vm.prank(_amb);
    BSCL2Connector(_l2Connector).processMessage(_wrongLengthCalldata);
  }

  // ============ verifySender ============

  // Initiator is the address on the other chain, as returned by multichaincall.context() (ie the mirror)
  function test_BSCConnector_verifySender_trueIfCorrectInitiatorAndMsgSender(address _from) public {
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_from, 56, 1));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    assertTrue(BaseMultichainConnector(_l1Connector).verifySender(_from));
  }

  // return false if wrong executor
  function test_BSCConnector_verifySender_falseIfWrongInitiator(address _from, address _wrongFrom) public {
    vm.assume(_from != _wrongFrom);
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_wrongFrom, 56, 1));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_amb);
    assertFalse(BaseMultichainConnector(_l1Connector).verifySender(_from));
  }

  // reverse if sender != amb
  function test_BSCConnector_verifySender_revertIfSenderIsNotAmb(address _from, address _wrongAmb) public {
    vm.assume(_wrongAmb != _amb);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(MultichainCall.context, ()), abi.encode(_from, 1, 1));

    vm.expectRevert(abi.encodePacked("!bridge"));
    vm.prank(_wrongAmb);
    BaseMultichainConnector(_l1Connector).verifySender(_from);
  }
}
