// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {TaikoHubConnector} from "../../../../../contracts/messaging/connectors/taiko/TaikoHubConnector.sol";
import {ISignalService} from "../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

contract TaikoHubConnectorForTest is TaikoHubConnector {
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _taikoSignalService,
    uint256 _spokeChainId
  )
    TaikoHubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _taikoSignalService, _spokeChainId)
  {}

  function forTest_sendMessage(bytes memory _data, bytes memory _extraData) external {
    _sendMessage(_data, _extraData);
  }

  function forTest_processMessage(bytes memory _data) external {
    _processMessage(_data);
  }

  function forTest_verifySender(address _expected) external view returns (bool _isValid) {
    _isValid = _verifySender(_expected);
  }
}

contract Base is ConnectorHelper {
  uint256 public constant ROOT_LENGTH = 32;
  uint256 public constant DELAY_BLOCKS = 0;
  uint256 public constant SPOKE_CHAIN_ID = 167007;

  address public user = makeAddr("user");
  address public offChainAgent = makeAddr("offChainAgent");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  bytes32 public rootSnapshot = keccak256(abi.encodePacked("rootSnapshot"));
  bytes32 public aggregateRoot = keccak256(abi.encodePacked("aggregateRoot"));
  address public taikoSignalService = makeAddr("TaikoSignalService");
  TaikoHubConnectorForTest public taikoHubConnector;

  function setUp() public {
    vm.prank(owner);
    taikoHubConnector = new TaikoHubConnectorForTest(
      _l1Domain,
      _l2Domain,
      offChainAgent,
      _rootManager,
      _l2Connector,
      taikoSignalService,
      SPOKE_CHAIN_ID
    );
  }
}

contract Unit_Connector_TaikoHubConnector_Constructor is Base {
  function test_checkConstructorArgs() public {
    assertEq(taikoHubConnector.DOMAIN(), _l1Domain);
    assertEq(taikoHubConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(taikoHubConnector.AMB(), offChainAgent);
    assertEq(taikoHubConnector.ROOT_MANAGER(), _rootManager);
    assertEq(taikoHubConnector.mirrorConnector(), _l2Connector);
    assertEq(taikoHubConnector.SPOKE_CHAIN_ID(), SPOKE_CHAIN_ID);
  }
}

contract Unit_Connector_TaikoHubConnector_SendMessage is Base {
  function test_revertIfDataIsNot32Length(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(user);
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_LengthIsNot32.selector);
    taikoHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  function test_callSendSignal(bytes32 _signal, bytes memory _encodedData, bytes32 _storageSlotResponse) public {
    // Mock the call over `sendSignal` and expect it to be called
    _mockAndExpect(
      address(taikoSignalService),
      abi.encodeWithSelector(ISignalService.sendSignal.selector, _signal),
      abi.encode(_storageSlotResponse)
    );

    // Call `sendSignal` function
    vm.prank(user);
    taikoHubConnector.forTest_sendMessage(abi.encode(_signal), _encodedData);
  }
}

contract Unit_Connector_TaikoHubConnector_ProcessMessage is Base {
  modifier happyPath(
    bytes32 _signal,
    bytes memory _proof,
    bool _received
  ) {
    // Mock the call over `verifyAndGetSignal` and expect it to be called
    _mockAndExpect(
      taikoSignalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        taikoHubConnector.SPOKE_CHAIN_ID(),
        _l2Connector,
        _signal,
        _proof
      ),
      abi.encode(_received)
    );

    // Mock the call over `aggregate` and expect it to be called
    vm.mockCall(
      address(_rootManager),
      abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _signal),
      abi.encode("")
    );
    _;
  }

  function test_revertIfSenderNotAgent(address _sender, bytes memory _data) public {
    vm.assume(_sender != address(_amb));
    vm.prank(_sender);
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_SenderNotAllowedAgent.selector);
    taikoHubConnector.forTest_processMessage(_data);
  }

  function test_revertIfSignalNotReceived(
    bytes32 _signal,
    bytes memory _proof
  ) public happyPath(_signal, _proof, false) {
    // Expect revert since signal was not received
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_SignalNotReceived.selector);
    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    vm.prank(offChainAgent);
    taikoHubConnector.forTest_processMessage(_data);
  }

  function test_callIsSignalReceived(bytes32 _signal, bytes memory _proof) public happyPath(_signal, _proof, true) {
    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    vm.prank(offChainAgent);
    taikoHubConnector.forTest_processMessage(_data);
  }

  function test_callAggregate(bytes32 _signal, bytes memory _proof) public happyPath(_signal, _proof, true) {
    // Mock the call over `aggregate` and expect it to be called
    vm.expectCall(address(_rootManager), abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _signal));
    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    vm.prank(offChainAgent);
    taikoHubConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_TaikoHubConnector_VerifySender is Base {
  function test_returnTrue() public {
    vm.prank(_amb);
    assertEq(taikoHubConnector.forTest_verifySender(_amb), true);
  }

  function test_returnFalse() public {
    vm.prank(stranger);
    assertEq(taikoHubConnector.forTest_verifySender(_amb), false);
  }
}
