// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseTaiko} from "../../../../../contracts/messaging/connectors/taiko/BaseTaiko.sol";
import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {ISignalService} from "../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";

contract BaseTaikoForTest is BaseTaiko {
  constructor(address _taikoSignalService) BaseTaiko(_taikoSignalService) {}

  function forTest_checkMessageLength(bytes memory _data) external pure returns (bool _isValid) {
    _isValid = _checkMessageLength(_data);
  }

  function forTest_sendSignal(bytes32 _signal) external {
    _sendSignal(_signal);
  }

  function forTest_verifyAndGetSignal(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes memory _data
  ) external view returns (bool _isReceived, bytes32 _signal) {
    (_isReceived, _signal) = _verifyAndGetSignal(_sourceChainId, _mirrorConnector, _data);
  }
}

contract Base is ConnectorHelper {
  uint256 public constant ROOT_LENGTH = 32;

  address public user = makeAddr("user");
  address public offChainAgent = makeAddr("offChainAgent");
  address public signalService = makeAddr("SignalService");
  BaseTaikoForTest public baseTaiko;

  function setUp() public {
    baseTaiko = new BaseTaikoForTest(signalService);
  }
}

contract Unit_Connector_BaseTaiko_Constructor is Base {
  function test_constants() public {
    assertEq(baseTaiko.ROOT_LENGTH(), ROOT_LENGTH);
  }

  function test_checkConstructorArgs() public {
    assertEq(address(baseTaiko.TAIKO_SIGNAL_SERVICE()), signalService);
  }
}

contract Unit_Connector_BaseTaiko_CheckMessageLength is Base {
  function test_returnFalseOnInvalidLength(bytes memory _data) public {
    vm.assume(_data.length != ROOT_LENGTH);
    assertEq(baseTaiko.forTest_checkMessageLength(_data), false);
  }

  function test_checkMessageLength() public {
    bytes memory _data = new bytes(ROOT_LENGTH);
    assertEq(baseTaiko.forTest_checkMessageLength(_data), true);
  }
}

contract Unit_Connector_BaseTaiko_sendMessage is Base {
  function test_callSendSignal(bytes32 _signal, bytes32 _storageSlotResponse) public {
    // Mock the call over `sendSignal` and expect it to be called
    _mockAndExpect(
      signalService,
      abi.encodeWithSelector(ISignalService.sendSignal.selector, _signal),
      abi.encode(_storageSlotResponse)
    );
    // Call `sendSignal` function
    vm.prank(user);
    baseTaiko.forTest_sendSignal(_signal);
  }
}

contract Unit_Connector_BaseTaiko_VerifyAndGetSignal is Base {
  modifier happyPath(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes32 _signal,
    bytes memory _proof,
    bool _received
  ) {
    _mockAndExpect(
      signalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        _sourceChainId,
        _mirrorConnector,
        _signal,
        _proof
      ),
      abi.encode(_received)
    );
    vm.startPrank(offChainAgent);
    _;
  }

  function test_callIsSignalReceived(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes32 _signal,
    bytes memory _proof
  ) public happyPath(_sourceChainId, _mirrorConnector, _signal, _proof, true) {
    // Call `verifyAndGetSignal` function
    bytes memory _data = abi.encode(_signal, _proof);
    baseTaiko.forTest_verifyAndGetSignal(_sourceChainId, _mirrorConnector, _data);
  }

  function test_returnVars(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes32 _signal,
    bytes memory _proof,
    bool _isReceived
  ) public happyPath(_sourceChainId, _mirrorConnector, _signal, _proof, _isReceived) {
    // Call `verifyAndGetSignal` function
    bytes memory _data = abi.encode(_signal, _proof);
    (bool _actualIsReceived, bytes32 _actualSignal) = baseTaiko.forTest_verifyAndGetSignal(
      _sourceChainId,
      _mirrorConnector,
      _data
    );

    // Assert the returned values are correct
    assertEq(_actualIsReceived, _isReceived);
    assertEq(_actualSignal, _signal);
  }
}
