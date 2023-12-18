// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {MultichainHubConnector} from "../../../../contracts/messaging/connectors/multichain/MultichainHubConnector.sol";
import {Multichain} from "../../../../contracts/messaging/interfaces/ambs/Multichain.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract MultichainHubConnectorTest is ConnectorHelper {
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
    _l2Connector = payable(address(123123123123));

    // Deploy
    vm.prank(_owner);
    _l1Connector = payable(
      address(new MultichainHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _chainIdL2, _gasCap))
    );
  }

  // ============ Utils ============

  // ============ sendMessage ============

  // Happy path L1
  function test_MultichainHubConnector_sendMessage_sendMessageAndEmitEvent(bytes memory _data) public {
    vm.assume(_data.length == 32);

    // Mock the call to fees
    vm.mockCall(_amb, abi.encodeCall(Multichain.calcSrcFees, ("", _chainIdL2, 32)), abi.encode(1));

    // Mock the call to anyCall
    vm.mockCall(
      _amb,
      abi.encodeCall(
        Multichain.anyCall,
        (
          address(_l2Connector),
          _data,
          address(0), // fallback address
          _chainIdL2, // chain id
          2
        ) // 2 = fee on src
      ),
      abi.encode()
    );

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MessageSent(_data, bytes(""), _rootManager);

    // Check: call to multichain anyCall?
    vm.expectCall(
      _amb,
      1,
      abi.encodeCall(Multichain.anyCall, (address(_l2Connector), _data, address(0), _chainIdL2, 2))
    );

    // Check: call to fees?
    vm.expectCall(_amb, abi.encodeCall(Multichain.calcSrcFees, ("", _chainIdL2, 32)));

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    MultichainHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // Access control
  function test_Connector_sendMessage_revertIfSenderIsNotRootManager(address _nonRootManager, bytes memory _data)
    public
  {
    vm.assume(_nonRootManager != _rootManager);

    // Check: revert if caller is not root manager
    vm.expectRevert(abi.encodePacked("!rootManager"));

    vm.deal(_nonRootManager, 1 ether);
    vm.prank(_nonRootManager);
    MultichainHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // data length
  function test_MultichainHubConnector_sendMessage_failsIfBadDataLength(bytes memory _data) public {
    vm.assume(_data.length != 32);

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!data length"));
    MultichainHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // encoded length
  function test_MultichainHubConnector_sendMessage_failsIfBadEncodedLength(bytes memory _encoded) public {
    vm.assume(_encoded.length > 0);

    bytes memory _data = abi.encode(5216);
    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!data length"));
    MultichainHubConnector(_l1Connector).sendMessage{value: 1}(_data, _encoded);
  }

  // insufficient fees
  function test_MultichainHubConnector_sendMessage_failsIfInsufficientFees() public {
    // Mock the call to fees
    vm.mockCall(_amb, abi.encodeCall(Multichain.calcSrcFees, ("", _chainIdL2, 32)), abi.encode(10));

    bytes memory _data = abi.encode(5216);
    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!fees"));
    MultichainHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // ============ anyExecute ============

  // Happy path L1
  function test_MultichainHubConnector__anyExecute_processMessageAndEmitEvent(bytes calldata _data) public {
    uint32 _mirrorDomain = MultichainHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l2Connector, _chainIdL2, 1));

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    // Check: call to root manager?
    vm.expectCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_executor);
    MultichainHubConnector(_l1Connector).anyExecute(_dataCorrectSize);
  }

  // message coming from a wrong sender on the origin chain to L1
  function test_MultichainHubConnector__anyExecute_revertIfWrongMirror(address _wrongMirror, bytes calldata _data)
    public
  {
    vm.assume(_wrongMirror != _l2Connector);

    uint32 _mirrorDomain = MultichainHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_wrongMirror, _chainIdL2, 1));

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!l2Connector"));
    vm.prank(_executor);
    MultichainHubConnector(_l1Connector).anyExecute(_dataCorrectSize);
  }

  // message coming from a wrong chain to L1
  function test_MultichainHubConnector__anyExecute_revertIfWrongOriginId(uint256 _wrongId, bytes calldata _data)
    public
  {
    vm.assume(_wrongId != _chainIdL2);

    uint32 _mirrorDomain = MultichainHubConnector(_l1Connector).MIRROR_DOMAIN();

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l2Connector, _wrongId, 1));

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    vm.expectRevert(abi.encodePacked("!l2Connector"));
    vm.prank(_executor);
    MultichainHubConnector(_l1Connector).anyExecute(_dataCorrectSize);
  }

  // message has a length > 32 bytes
  function test_MultichainHubConnector__anyExecute_revertIfWrongDataLength(uint8 callDataLength) public {
    vm.assume(callDataLength != 32);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l2Connector, _chainIdL2, 1));

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    vm.expectRevert(abi.encodePacked("!length"));
    vm.prank(_executor);
    MultichainHubConnector(_l1Connector).anyExecute(_wrongLengthCalldata);
  }

  // ============ processMessage ============

  function test_MultichainHubConnector__processMessage_reverts(bytes32 _data) public {
    vm.expectRevert(Connector.Connector__processMessage_notUsed.selector);
    MultichainHubConnector(_l1Connector).processMessage(abi.encodePacked(_data));
  }

  // ============ verifySender ============

  // Initiator is the address on the other chain, as returned by multichaincall.context() (ie the mirror)
  function test_MultichainHubConnector_verifySender_trueIfCorrectInitiatorAndMsgSender(address _from) public {
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_from, _chainIdL2, 1));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_executor);
    assertTrue(MultichainHubConnector(_l1Connector).verifySender(_from));
  }

  // return false if wrong executor
  function test_MultichainHubConnector_verifySender_falseIfWrongInitiator(address _from, address _wrongFrom) public {
    vm.assume(_from != _wrongFrom);
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_wrongFrom, _chainIdL2, 1));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_executor);
    assertFalse(MultichainHubConnector(_l1Connector).verifySender(_from));
  }

  // return false if the origin chain has an unexpected id
  function test_MultichainHubConnector_verifySender_falseIfWrongOriginId(uint256 _wrongId, address _from) public {
    vm.assume(_wrongId != _chainIdL2);
    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_l2Connector, _wrongId, 1));

    // multichain _amb has the same address, irrespective of underlying network
    vm.prank(_executor);
    assertFalse(MultichainHubConnector(_l1Connector).verifySender(_from));
  }

  // reverse if sender != _executor
  function test_MultichainHubConnector_verifySender_revertIfSenderIsNotExecutor(address _from, address _wrongExecutor)
    public
  {
    vm.assume(_wrongExecutor != _executor);

    // Mock the call to the executor, to retrieve the context
    vm.mockCall(_executor, abi.encodeCall(Multichain.context, ()), abi.encode(_from, 1, 1));

    vm.expectRevert(abi.encodePacked("!executor"));
    vm.prank(_wrongExecutor);
    MultichainHubConnector(_l1Connector).verifySender(_from);
  }
}
