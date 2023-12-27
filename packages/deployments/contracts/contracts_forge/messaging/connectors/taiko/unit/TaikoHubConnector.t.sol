// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {TaikoHubConnector} from "../../../../../contracts/messaging/connectors/taiko/TaikoHubConnector.sol";
import {ISignalService} from "../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

/**
 * @dev For test contract to access internal functions of `TaikoHubConnector`
 */
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

/**
 * @dev Base contract for the `TaikoHubConnector` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  // The taiko l2 chain id
  uint256 public constant SPOKE_CHAIN_ID = 167007;

  address public user = makeAddr("user");
  address public offChainAgent = makeAddr("offChainAgent");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  bytes32 public rootSnapshot = keccak256(abi.encodePacked("rootSnapshot"));
  bytes32 public aggregateRoot = keccak256(abi.encodePacked("aggregateRoot"));
  address public taikoSignalService = makeAddr("TaikoSignalService");
  TaikoHubConnectorForTest public taikoHubConnector;

  /**
   * @notice Deploys a new `TaikoHubConnectorForTest` contract instance
   */
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
  /**
   * @notice Tests the values of the constructor arguments
   */
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
  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data
   * @param _encodedData Encoded data
   */
  function test_revertIfDataIsNot32Length(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(user);
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_LengthIsNot32.selector);
    taikoHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Tests that `sendSignal` function is called correctly
   * @param _signal The signal (or message) to send
   * @param _encodedData The encoded data
   * @param _storageSlotResponse The storage slot response of the `sendSignal` call
   */
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
  /**
   * @notice Mocks the call over `verifyAndGetSignal` and expect it to be called
   * @dev It also starts the prank on the offChainAgent
   * @param _signal The signal (or message) to send
   * @param _proof The proof of the signal sent
   * @param _received Whether the signal was received or not
   */
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
    vm.startPrank(offChainAgent);
    _;
  }

  /**
   * @notice Tests that reverts when the caller is not the allowed `offChainAgent`
   * @param _sender The sender address
   * @param _data The message data
   */
  function test_revertIfSenderNotAgent(address _sender, bytes memory _data) public {
    vm.assume(_sender != offChainAgent);
    vm.startPrank(_sender);
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_SenderNotAllowedAgent.selector);
    taikoHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts if the signal is not received
   * @param _signal The signal (or message) sent
   * @param _proof The proof of the signal sent
   * @dev It uses the `happyPath` modifier setting `_received` to false
   */
  function test_revertIfSignalNotReceived(
    bytes32 _signal,
    bytes memory _proof
  ) public happyPath(_signal, _proof, false) {
    // Expect revert since signal was not received
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_SignalNotReceived.selector);
    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    taikoHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that `isSignalReceived` function is called correctly
   * @param _signal The signal (or message) sent
   * @param _proof The proof of the signal sent
   * @dev It uses the `happyPath` modifier setting `_received` to true
   */
  function test_callIsSignalReceived(bytes32 _signal, bytes memory _proof) public happyPath(_signal, _proof, true) {
    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    taikoHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that `aggregate` function is called correctly  and `AggregateRootReceived` is emitted
   * @param _signal The signal (or message) sent
   * @param _proof The proof of the signal sent
   * @dev It uses the `happyPath` modifier setting `_received` to true
   */
  function test_callAggregate(bytes32 _signal, bytes memory _proof) public happyPath(_signal, _proof, true) {
    // Mock the call over `aggregate` and expect it to be called
    vm.expectCall(address(_rootManager), abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _signal));
    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    taikoHubConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_TaikoHubConnector_VerifySender is Base {
  /**
   * @notice Tests that returns true if the sender is the expected one
   */
  function test_returnTrue() public {
    vm.prank(offChainAgent);
    assertEq(taikoHubConnector.forTest_verifySender(offChainAgent), true);
  }

  /**
   * @notice Tests that returns false if the sender is not the expected one
   */
  function test_returnFalse() public {
    vm.prank(stranger);
    assertEq(taikoHubConnector.forTest_verifySender(_amb), false);
  }
}
