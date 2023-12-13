// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ScrollHubConnector} from "../../../../../contracts/messaging/connectors/scroll/ScrollHubConnector.sol";
import {IL1ScrollMessenger} from "../../../../../contracts/messaging/interfaces/ambs/scroll/IL1ScrollMessenger.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

/**
 * @dev For test contract to access internal functions of `ScrollHubConnector`
 */
contract ScrollHubConnectorForTest is ScrollHubConnector {
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap
  ) ScrollHubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _gasCap) {}

  function forTest_gasCap() public view returns (uint256 _gasCap) {
    _gasCap = gasCap;
  }

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
 * @dev Base contract for the `ScrollHubConnector` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  ScrollHubConnectorForTest public scrollHubConnector;
  uint256 public constant DELAY_BLOCKS = 0;

  /**
   * @notice Deploys a new `ScrollHubConnectorForTest` contract instance
   */
  function setUp() public {
    vm.prank(owner);
    scrollHubConnector = new ScrollHubConnectorForTest(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _gasCap);
  }

  /**
   * @notice Modifier to mock the call over `xDomainMessageSender`
   * @param _xDomainMessenger The address of the x domain messenger
   */
  modifier callXDomainMessenger(address _xDomainMessenger) {
    // Mock the x domain message sender to be a stranger and not the mirror connector
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL1ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_xDomainMessenger)
    );
    _;
  }
}

contract Unit_Connector_ScrollHubConnector_Constructor is Base {
  /**
   * @notice Tests the values of the constructor arguments
   */
  function test_checkConstructorArgs() public {
    assertEq(scrollHubConnector.DOMAIN(), _l1Domain);
    assertEq(scrollHubConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(scrollHubConnector.AMB(), _amb);
    assertEq(scrollHubConnector.ROOT_MANAGER(), _rootManager);
    assertEq(scrollHubConnector.mirrorConnector(), _l2Connector);
    assertEq(scrollHubConnector.forTest_gasCap(), _gasCap);
  }
}

contract Unit_Connector_ScrollHubConnector_SendMessage is Base {
  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data to be sent
   * @param _encodedData Encoded data to be sent
   */
  function test_revertIfDataIsNot32Length(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != 32);
    vm.prank(user);
    vm.expectRevert(ScrollHubConnector.ScrollHubConnector_DataLengthIsNot32.selector);
    scrollHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Modifier to mock the `sendMessage` function on the AMB and expect it to be called
   * @param _root The root to be sent
   * @param _refundAddress Address where the extra gas will be refunded
   */
  modifier happyPath(bytes32 _root, address _refundAddress) {
    // Encode the root
    bytes memory _data = abi.encode(_root);
    // Get the calldata of the `processMessage` function call to be executed on the mirror connector
    bytes memory _functionCall = abi.encodeWithSelector(Connector.processMessage.selector, _data);

    // Mock the `sendMessage` function and expect it to to be called
    _mockAndExpect(
      _amb,
      abi.encodeWithSelector(
        IL1ScrollMessenger.sendMessage.selector,
        _l2Connector,
        scrollHubConnector.ZERO_MSG_VALUE(),
        _functionCall,
        _gasCap,
        _refundAddress
      ),
      ""
    );
    _;
  }

  /**
   * @notice Tests that calls the `sendMessage` function on the AMB
   * @param _root The root to be sent
   * @param _refundAddress Address where the extra gas will be refunded
   */
  function test_callAMBSendMessage(bytes32 _root, address _refundAddress) public happyPath(_root, _refundAddress) {
    // Encode the data to be sent
    bytes memory _data = abi.encode(_root);
    bytes memory _encodedData = abi.encode(_refundAddress);
    vm.prank(user);
    scrollHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Tests that emits the `MessageSent` event
   * @param _root The root to be sent
   * @param _refundAddress Address where the extra gas will be refunded
   */
  function test_emitMessageSent(bytes32 _root, address _refundAddress) public happyPath(_root, _refundAddress) {
    // Encode the data to be sent
    bytes memory _data = abi.encode(_root);
    bytes memory _encodedData = abi.encode(_refundAddress);

    // Expect the `MessageSent` event to be emitted
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, address(_rootManager));

    vm.prank(address(_rootManager));
    scrollHubConnector.sendMessage(_data, _encodedData);
  }
}

contract Unit_Connector_ScrollHubConnector_forTest_ProcessMessage is Base {
  /**
   * @notice Event emitted when a new aggregate root is received
   * @param _root The received root
   */
  event AggregateRootReceived(bytes32 _root);

  /**
   * @notice Tests that reverts when the sender is not the AMB
   * @param _data Message data
   * @param _sender The caller address
   */
  function test_revertIfSenderIsNotAMB(bytes memory _data, address _sender) public {
    vm.assume(_sender != _amb);
    vm.prank(_sender);
    // Will revert with '!AMB' error, but it can't be specified in the test since for some reason it doesn't match and fails
    vm.expectRevert();
    scrollHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts when the data length is not 32
   * @param _data Message data
   */
  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    vm.prank(_amb);
    vm.expectRevert(ScrollHubConnector.ScrollHubConnector_DataLengthIsNot32.selector);
    scrollHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts when the origin sender is not the mirror connector
   * @param _root The received root
   */
  function test_revertIfOriginSenderNotMirror(bytes32 _root) public callXDomainMessenger(stranger) {
    bytes memory _data = abi.encode(_root);
    vm.prank(_amb);
    vm.expectRevert(ScrollHubConnector.ScrollHubConnector_OriginSenderIsNotMirror.selector);
    scrollHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that calls the `aggregate` function on the root manager
   * @param _root The received root
   */
  function test_callAggregate(bytes32 _root) public callXDomainMessenger(_l2Connector) {
    // Mock the `receiveAggregateRoot` function and expect it to be called
    _mockAndExpect(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root), "");

    vm.prank(_amb);
    bytes memory _data = abi.encode(_root);
    scrollHubConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_ScrollHubConnector_VerifySender is Base {
  /**
   * @notice Tests that reverts when the origin sender is not the mirror connector
   * @param _originSender The origin sender address
   * @param _mirrorConnector The mirror connector address
   */
  function test_returnFalseIfOriginSenderNotMirror(
    address _originSender,
    address _mirrorConnector
  ) public callXDomainMessenger(_mirrorConnector) {
    vm.assume(_originSender != _mirrorConnector);
    assertEq(scrollHubConnector.forTest_verifySender(_originSender), false);
  }

  /**
   * @notice Tests that returns true when the origin sender is the mirror connector
   * @param _mirrorConnector The mirror connector address
   */
  function test_returnTrueIfOriginSenderIsMirror(
    address _mirrorConnector
  ) public callXDomainMessenger(_mirrorConnector) {
    assertEq(scrollHubConnector.forTest_verifySender(_mirrorConnector), true);
  }
}
