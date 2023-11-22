// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {ScrollSpokeConnector} from "../../../../../contracts/messaging/connectors/scroll/ScrollSpokeConnector.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {ProposedOwnable} from "../../../../../contracts/shared/ProposedOwnable.sol";
import {SpokeConnector} from "../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {IL2ScrollMessenger} from "../../../../../contracts/messaging/interfaces/ambs/scroll/IL2ScrollMessenger.sol";

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

contract Base is ConnectorHelper {
  address public watcherManager = makeAddr("WatcherManager");
  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  bytes32 public rootSnapshot = keccak256(abi.encodePacked("rootSnapshot"));
  bytes32 public aggregateRoot = keccak256(abi.encodePacked("aggregateRoot"));
  ScrollSpokeConnectorForTest public scrollSpokeConnector;
  uint256 public constant DELAY_BLOCKS = 0;
  uint256 public constant MIN_DISPUTE_BLOCKS = 1;
  uint256 public constant DISPUTE_BLOCKS = 10;

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
      MIN_DISPUTE_BLOCKS,
      DISPUTE_BLOCKS
    );
    scrollSpokeConnector = new ScrollSpokeConnectorForTest(_spokeConstructorParams, _gasCap);
  }
}

contract Unit_Connector_ScrollSpokeConnectors_Constructor is Base {
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
  function test_revertIfCallerNotOwner(address _caller) public {
    vm.assume(_caller != owner);
    vm.prank(_caller);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    scrollSpokeConnector.renounceOwnership();
  }

  function test_revertIfCalled() public {
    vm.prank(owner);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_NotImplementedMethod.selector);
    scrollSpokeConnector.renounceOwnership();
  }
}

contract Unit_Connector_ScrollSpokeConnector_SendMessage is Base {
  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    bytes memory _encodedData = "";

    vm.prank(user);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_LengthIsNot32.selector);
    scrollSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }

  function test_callAMBSendMessage() public {
    // Parse the aggregate root
    bytes memory _data = abi.encodePacked(rootSnapshot);
    bytes memory _encodedData = "";
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

    vm.prank(user);
    scrollSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }
}

contract Unit_Connector_ScrollSpokeConnector_ProcessMessage is Base {
  event AggregateRootReceived(bytes32 indexed _root);

  function test_revertIfSenderIsNotAMB(address _sender) public {
    vm.assume(_sender != _amb);
    bytes memory _data = abi.encodePacked(rootSnapshot);

    vm.prank(_sender);
    vm.expectRevert();
    scrollSpokeConnector.processMessage(_data);
  }

  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    vm.prank(_amb);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_LengthIsNot32.selector);
    scrollSpokeConnector.processMessage(_data);
  }

  function test_revertIfOriginSenderNotMirror() public {
    bytes memory _data = abi.encodePacked(rootSnapshot);
    // Mock the x domain message sender to be a stranger and not the mirror connector
    vm.mockCall(_amb, abi.encodeWithSelector(IL2ScrollMessenger.xDomainMessageSender.selector), abi.encode(stranger));

    vm.prank(_amb);
    vm.expectRevert(ScrollSpokeConnector.ScrollSpokeConnector_OriginSenderIsNotMirror.selector);
    scrollSpokeConnector.processMessage(_data);
  }

  function test_receiveAggregateRoot() public {
    // Mock the root to a real one
    bytes memory _data = abi.encodePacked(aggregateRoot);

    // Mock the x domain message sender as if it is the mirror connector
    address _mirrorConnector = scrollSpokeConnector.mirrorConnector();
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL2ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_mirrorConnector)
    );

    // Expect AggregateRootReceived to be emitted
    vm.expectEmit(true, true, true, true);
    emit AggregateRootReceived(aggregateRoot);

    vm.prank(_amb);
    scrollSpokeConnector.processMessage(_data);
  }
}

contract Unit_Connector_ScrollSpokeConnector_VerifySender is Base {
  function test_returnFalseIfOriginSenderNotMirror(address _originSender, address _mirrorConnector) public {
    vm.assume(_originSender != _mirrorConnector);
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL2ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_originSender)
    );
    assertEq(scrollSpokeConnector.forTest_verifySender(_mirrorConnector), false);
  }

  function test_returnTrueIfOriginSenderIsMirror(address _mirrorConnector) public {
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(IL2ScrollMessenger.xDomainMessageSender.selector),
      abi.encode(_mirrorConnector)
    );
    vm.prank(_mirrorConnector);
    assertEq(scrollSpokeConnector.forTest_verifySender(_mirrorConnector), true);
  }
}
