// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ScrollHubConnector} from "../../../../../contracts/messaging/connectors/scroll/ScrollHubConnector.sol";
import {IL1ScrollMessenger} from "../../../../../contracts/messaging/interfaces/ambs/scroll/IL1ScrollMessenger.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

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

contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  address public refundAddress = makeAddr("refundAddress");
  bytes32 public rootSnapshot = keccak256(abi.encodePacked("rootSnapshot"));
  bytes32 public aggregateRoot = keccak256(abi.encodePacked("aggregateRoot"));
  ScrollHubConnectorForTest public scrollHubConnector;
  uint256 public constant DELAY_BLOCKS = 0;

  function setUp() public {
    vm.prank(owner);
    scrollHubConnector = new ScrollHubConnectorForTest(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _gasCap);
  }
}

contract Unit_Connector_ScrollHubConnector_Constructor is Base {
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
  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    bytes memory _encodedData = "";

    vm.prank(user);
    vm.expectRevert(ScrollHubConnector.ScrollHubConnector_DataLengthIsNot32.selector);
    scrollHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  function test_callAMBSendMessage() public {
    // Parse the aggregate root
    bytes memory _data = abi.encodePacked(aggregateRoot);
    // Declare and parse the refund address
    bytes memory _encodedData = abi.encode(refundAddress);
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
        refundAddress
      ),
      ""
    );

    vm.prank(user);
    scrollHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  function test_emitMessageSent(address _refundAddress) public {
    // Mock the call over the AMB
    vm.mockCall(_amb, abi.encodeWithSelector(IL1ScrollMessenger.sendMessage.selector), "");

    // Expect the `MessageSent` event to be emitted
    bytes memory _data = abi.encodePacked(aggregateRoot);
    bytes memory _encodedData = abi.encode(_refundAddress);
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, address(_rootManager));

    vm.prank(address(_rootManager));
    scrollHubConnector.sendMessage(_data, _encodedData);
  }
}

contract Unit_Connector_ScrollHubConnector_forTest_ProcessMessage is Base {
  event AggregateRootReceived(bytes32 _root);

  function test_revertIfSenderIsNotAMB(address _sender) public {
    vm.assume(_sender != _amb);
    bytes memory _data = abi.encodePacked(rootSnapshot);

    vm.prank(_sender);
    vm.expectRevert();
    scrollHubConnector.forTest_processMessage(_data);
  }

  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    vm.prank(_amb);
    vm.expectRevert(ScrollHubConnector.ScrollHubConnector_DataLengthIsNot32.selector);
    scrollHubConnector.forTest_processMessage(_data);
  }

  function test_revertIfOriginSenderNotMirror() public {
    bytes memory _data = abi.encodePacked(rootSnapshot);
    // Mock the x domain message sender to be a stranger and not the mirror connector
    vm.mockCall(_amb, abi.encodeWithSelector(IL1ScrollMessenger.xDomainMessageSender.selector), abi.encode(stranger));

    vm.prank(_amb);
    vm.expectRevert(ScrollHubConnector.ScrollHubConnector_OriginSenderIsNotMirror.selector);
    scrollHubConnector.forTest_processMessage(_data);
  }

  function test_callAggregate() public {
    // Mock the root to a real one
    bytes memory _data = abi.encodePacked(aggregateRoot);

    // Mock the x domain message sender as if it is the mirror connector
    address _mirrorConnector = scrollHubConnector.mirrorConnector();
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL1ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_mirrorConnector)
    );

    // Mock the `receiveAggregateRoot` function and expect it to be called
    _mockAndExpect(
      _rootManager,
      abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, bytes32(_data)),
      ""
    );

    vm.prank(_amb);
    scrollHubConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_ScrollHubConnector_VerifySender is Base {
  modifier happyPath(address _mirrorConnector) {
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL1ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_mirrorConnector)
    );
    vm.startPrank(_mirrorConnector);
    _;
  }

  function test_returnFalseIfOriginSenderNotMirror(
    address _originSender,
    address _mirrorConnector
  ) public happyPath(_mirrorConnector) {
    vm.assume(_originSender != _mirrorConnector);
    assertEq(scrollHubConnector.forTest_verifySender(_originSender), false);
  }

  function test_returnTrueIfOriginSenderIsMirror(address _mirrorConnector) public happyPath(_mirrorConnector) {
    assertEq(scrollHubConnector.forTest_verifySender(_mirrorConnector), true);
  }
}
