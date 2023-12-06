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
    uint256 _messageLength = 32;
    assertEq(baseTaiko.MESSAGE_LENGTH(), _messageLength);
  }

  function test_checkConstructorArgs() public {
    assertEq(address(baseTaiko.TAIKO_SIGNAL_SERVICE()), signalService);
  }
}

contract Unit_Connector_BaseTaiko_CheckMessageLength is Base {
  function test_returnFalseOnInvalidLength(bytes memory _data) public {
    uint256 _validMessageLength = 32;
    vm.assume(_data.length != _validMessageLength);
    assertEq(baseTaiko.forTest_checkMessageLength(_data), false);
  }

  function test_checkMessageLength() public {
    uint256 _validMessageLength = 32;
    bytes memory _data = new bytes(_validMessageLength);
    assertEq(baseTaiko.forTest_checkMessageLength(_data), true);
  }
}

contract Unit_Connector_BaseTaiko_sendMessage is Base {
  function test_callSendSignal(bytes32 _signal) public {
    bytes memory _storageSlotResponse = abi.encode("storageSlot1");
    // Mock the call over `sendSignal` and expect it to be called
    _mockAndExpect(
      signalService,
      abi.encodeWithSelector(ISignalService.sendSignal.selector, _signal),
      _storageSlotResponse
    );
    // Call `sendSignal` function
    vm.prank(user);
    baseTaiko.forTest_sendSignal(_signal);
  }
}

contract Unit_Connector_BaseTaiko_VerifyAndGetSignal is Base {
  struct SignalVerificationData {
    bytes32 signal;
    bytes proof;
  }

  function test_callIsSignalReceived(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes32 _signal,
    bytes memory _proof
  ) public {
    bytes memory _data = abi.encode(_signal, _proof);
    // Mock the call over `isSignalReceived` and expect it to be called
    _mockAndExpect(
      signalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        _sourceChainId,
        _mirrorConnector,
        _signal,
        _proof
      ),
      abi.encode(true)
    );

    // Call `verifyAndGetSignal` function
    vm.prank(offChainAgent);
    baseTaiko.forTest_verifyAndGetSignal(_sourceChainId, _mirrorConnector, _data);
  }

  function test_returnVars(
    uint256 _sourceChainId,
    address _mirrorConnector,
    bytes32 _signal,
    bytes memory _proof,
    bool _isReceived
  ) public {
    bytes memory _data = abi.encode(_signal, _proof);
    // Mock the call over `isSignalReceived`
    vm.mockCall(
      signalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        _sourceChainId,
        _mirrorConnector,
        _signal,
        _proof
      ),
      abi.encode(_isReceived)
    );

    // Call `verifyAndGetSignal` function
    vm.prank(offChainAgent);
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
