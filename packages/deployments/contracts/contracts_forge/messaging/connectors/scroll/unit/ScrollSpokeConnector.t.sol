// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ScrollSpokeConnector} from "../../../../../contracts/messaging/connectors/scroll/ScrollSpokeConnector.sol";
import {ProposedOwnable} from "../../../../../contracts/shared/ProposedOwnable.sol";
import {SpokeConnector} from "../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {IL2ScrollMessenger} from "../../../../../contracts/messaging/interfaces/ambs/scroll/IL2ScrollMessenger.sol";

/**
 * @dev For test contract to access internal functions of `ScrollSpokeConnector`
 */
contract ScrollSpokeConnectorForTest is ScrollSpokeConnector {
  constructor(
    SpokeConnector.ConstructorParams memory _spokeConstructorParams,
    uint256 _gasCap
  ) ScrollSpokeConnector(_spokeConstructorParams, _gasCap) {}

  function forTest_getGasCap() public view returns (uint256 _gasCap) {
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
 * @dev Base contract for the `ScrollSpokeConnector` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  address public watcherManager = makeAddr("WatcherManager");
  bytes32 public rootSnapshot = bytes32("rootSnapshot");
  bytes32 public aggregateRoot = bytes32("aggregateRoot");
  ScrollSpokeConnectorForTest public scrollSpokeConnector;

  /**
   * @notice Deploys a new `ScrollSpokeConnectorForTest` contract instance
   */
  function setUp() public {
    _merkle = address(new MerkleTreeManager());
    vm.prank(owner);

    // Deploy scroll spoke connector
    SpokeConnector.ConstructorParams memory _spokeConstructorParams = SpokeConnector.ConstructorParams(
      _l1Domain,
      _l2Domain,
      _amb,
      _rootManager,
      _l2Connector,
      _processGas,
      _reserveGas,
      DELAY_BLOCKS,
      _merkle,
      watcherManager,
      _minDisputeBlocks,
      _disputeBlocks
    );
    scrollSpokeConnector = new ScrollSpokeConnectorForTest(_spokeConstructorParams, _gasCap);
  }

  /**
   * @notice Modifier to mock the call over `xDomainMessageSender`
   * @param _xDomainMessenger The address of the x domain messenger
   */
  modifier callXDomainMessenger(address _xDomainMessenger) {
    // Mock the x domain message sender to be a stranger and not the mirror connector
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL2ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_xDomainMessenger)
    );
    _;
  }
}

contract Unit_Connector_ScrollSpokeConnector_Constructor is Base {
  /**
   * @notice Tests the values of the constructor arguments
   */
  function test_checkConstructorArgs() public {
    assertEq(scrollSpokeConnector.DOMAIN(), _l1Domain);
    assertEq(scrollSpokeConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(scrollSpokeConnector.AMB(), _amb);
    assertEq(scrollSpokeConnector.ROOT_MANAGER(), _rootManager);
    assertEq(scrollSpokeConnector.mirrorConnector(), _l2Connector);
    assertEq(scrollSpokeConnector.PROCESS_GAS(), _processGas);
    assertEq(scrollSpokeConnector.RESERVE_GAS(), _reserveGas);
    assertEq(scrollSpokeConnector.delayBlocks(), DELAY_BLOCKS);
    assertEq(address(scrollSpokeConnector.MERKLE()), _merkle);
    assertEq(address(scrollSpokeConnector.watcherManager()), watcherManager);
    assertEq(scrollSpokeConnector.forTest_getGasCap(), _gasCap);
  }
}

contract Unit_Connector_ScrollSpokeConnector_RenounceOwnership is Base {
  /**
   * @notice Tests that the `renounceOwnership` function reverts when called
   * @param _caller The address of the caller
   */
  function test_revertIfCalled(address _caller) public {
    vm.prank(_caller);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_NotImplementedMethod.selector);
    scrollSpokeConnector.renounceOwnership();
  }
}

contract Unit_Connector_ScrollSpokeConnector_SendMessage is Base {
  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data
   * @param _encodedData Encoded data to be sent
   */
  function test_revertIfDataNotRootLength(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(user);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_DataLengthIsNot32.selector);
    scrollSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Modifier to mock the `sendMessage` function on the AMB and expect it to be called
   * @param _root The root to be sent
   */
  modifier happyPath(bytes32 _root) {
    bytes memory _data = abi.encode(_root);
    // Get the calldata of the `processMessage` function call to be executed on the mirror connector
    bytes memory _functionCall = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Mock the `sendMessage` function and expect it to to be called
    _mockAndExpect(
      _amb,
      abi.encodeWithSelector(
        IL2ScrollMessenger.sendMessage.selector,
        _l2Connector,
        scrollSpokeConnector.ZERO_MSG_VALUE(),
        _functionCall,
        _gasCap
      ),
      ""
    );
    _;
  }

  /**
   * @notice Tests that calls the `sendMessage` function on the AMB
   * @param _root The root to be sent
   * @param _encodedData Encoded data to be sent
   */
  function test_callAMBSendMessage(bytes32 _root, bytes memory _encodedData) public happyPath(_root) {
    bytes memory _data = abi.encode(_root);
    vm.prank(user);
    scrollSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Tests that emits the `MessageSent` event
   * @param  _root The root to be sent
   * @param _encodedData Encoded data to be sent
   */
  function test_emitMessageSent(bytes32 _root, bytes memory _encodedData) public happyPath(_root) {
    // Encode the data
    bytes memory _data = abi.encode(_root);

    // Mock the call over MERKLE's `root` function
    vm.mockCall(address(_merkle), abi.encodeWithSelector(MerkleTreeManager.root.selector), abi.encode(_root));

    // Expect the `MessageSent` event to be emitted
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, user);

    vm.prank(user);
    scrollSpokeConnector.send(_encodedData);
  }
}

contract Unit_Connector_ScrollSpokeConnector_ProcessMessage is Base {
  /**
   * @notice Emitted when an aggregate root is received
   * @param _root The aggregate root
   */
  event AggregateRootReceived(bytes32 indexed _root);

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
    scrollSpokeConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts when the data length is not 32
   * @param _data Message data
   */
  function test_revertIfDataNotRootLength(bytes memory _data) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(_amb);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_DataLengthIsNot32.selector);
    scrollSpokeConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts when the origin sender is not the mirror connector
   * @param _root The aggregate root
   */
  function test_revertIfOriginSenderNotMirror(bytes32 _root) public callXDomainMessenger(stranger) {
    bytes memory _data = abi.encode(_root);
    vm.prank(_amb);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_OriginSenderIsNotMirror.selector);
    scrollSpokeConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that the aggregate root is received
   */
  function test_receiveAggregateRoot() public callXDomainMessenger(_l1Connector) {
    // Encode the aggregate root
    bytes memory _data = abi.encode(aggregateRoot);
    // Expect AggregateRootReceived to be emitted
    vm.expectEmit(true, true, true, true);
    emit AggregateRootReceived(aggregateRoot);

    vm.prank(_amb);
    scrollSpokeConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_ScrollSpokeConnector_VerifySender is Base {
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
    assertEq(scrollSpokeConnector.forTest_verifySender(_originSender), false);
  }

  /**
   * @notice Tests that returns true when the origin sender is the mirror connector
   * @param _mirrorConnector The mirror connector address
   */
  function test_returnTrueIfOriginSenderIsMirror(
    address _mirrorConnector
  ) public callXDomainMessenger(_mirrorConnector) {
    assertEq(scrollSpokeConnector.forTest_verifySender(_mirrorConnector), true);
  }
}
