// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {SygmaSpokeConnector, SpokeConnector, ProposedOwnable} from "../../../../../contracts/messaging/connectors/sygma/SygmaSpokeConnector.sol";
import {IBridge} from "../../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

/**
 * @dev For test contract to access internal functions of `SygmaSpokeConnector`
 */
contract SygmaSpokeConnectorForTest is SygmaSpokeConnector {
  constructor(
    SpokeConnector.ConstructorParams memory _spokeConstructorParams,
    uint8 _hubDomainId,
    address _permissionlessHandler,
    uint256 _gasCap
  ) SygmaSpokeConnector(_spokeConstructorParams, _hubDomainId, _permissionlessHandler, _gasCap) {}

  function forTest_sendMessage(bytes memory _data, bytes memory _feeData) external {
    _sendMessage(_data, _feeData);
  }

  function forTest_processMessage(bytes memory _data) external pure {
    _processMessage(_data);
  }

  function forTest_verifySender(address _expected) external view returns (bool _isValid) {
    _isValid = _verifySender(_expected);
  }
}

/**
 * @dev Base contract for the `SygmaSpokeConnector` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  // The root length in bytes
  uint256 public constant ROOT_LENGTH = 32;

  address public user = makeAddr("user");
  address public permissionlessHandler = makeAddr("permissionlessHandler");
  address public watcherManager = makeAddr("watcherManager");

  uint8 public sygmaHubDomainId = 1;
  uint256 public delayBlocks = 0;
  uint256 public disputeBlocks = 0;
  uint256 public minDisputeBlocks = 0;

  SygmaSpokeConnectorForTest public sygmaSpokeConnector;

  /**
   * @notice Deploys a new `SygmaSpokeConnectorForTest` contract instance
   */
  function setUp() public virtual {
    _merkle = address(new MerkleTreeManager());
    SpokeConnector.ConstructorParams memory _constructorParams = SpokeConnector.ConstructorParams(
      _l2Domain,
      _l1Domain,
      _amb,
      _rootManager,
      _l1Connector,
      _processGas,
      _reserveGas,
      delayBlocks,
      _merkle,
      watcherManager,
      minDisputeBlocks,
      disputeBlocks
    );
    vm.prank(_owner);
    sygmaSpokeConnector = new SygmaSpokeConnectorForTest(
      _constructorParams,
      sygmaHubDomainId,
      permissionlessHandler,
      _gasCap
    );
  }
}

contract Unit_Connector_SygmaSpokeConnector_Constructor is Base {
  /**
   * @notice Tests the values of the constructor arguments
   */
  function test_constructorArgs() public {
    assertEq(sygmaSpokeConnector.DOMAIN(), _l2Domain);
    assertEq(sygmaSpokeConnector.MIRROR_DOMAIN(), _l1Domain);
    assertEq(sygmaSpokeConnector.AMB(), _amb);
    assertEq(sygmaSpokeConnector.ROOT_MANAGER(), _rootManager);
    assertEq(sygmaSpokeConnector.mirrorConnector(), _l1Connector);
    assertEq(sygmaSpokeConnector.PROCESS_GAS(), _processGas);
    assertEq(sygmaSpokeConnector.RESERVE_GAS(), _reserveGas);
    assertEq(sygmaSpokeConnector.delayBlocks(), delayBlocks);
    assertEq(address(sygmaSpokeConnector.MERKLE()), _merkle);
    assertEq(address(sygmaSpokeConnector.watcherManager()), watcherManager);
    assertEq(sygmaSpokeConnector.minDisputeBlocks(), minDisputeBlocks);
    assertEq(sygmaSpokeConnector.disputeBlocks(), disputeBlocks);
    assertEq(sygmaSpokeConnector.HUB_DOMAIN_ID(), sygmaHubDomainId);
    assertEq(sygmaSpokeConnector.PERMISSIONLESS_HANDLER(), permissionlessHandler);
    assertEq(sygmaSpokeConnector.gasCap(), _gasCap);
  }
}

contract Unit_Connector_SygmaSpokeConnector__ReeiveMessage is Base {
  event AggregateRootReceived(bytes32 indexed _aggregateRoot);

  /**
   * @notice Modifier to assume the root is not empty
   */
  modifier happyPath(bytes32 _root) {
    vm.assume(_root != bytes32(""));
    _;
  }

  /**
   * @notice Executes the setUp and then starts the prank as the permissionless handler
   */
  function setUp() public override {
    super.setUp();
    vm.startPrank(permissionlessHandler);
  }

  /**
   * @notice Tests it reverts when the caller is not the permissionless handler
   * @param _caller The address of the caller
   * @param _originSender The address of the origin sender
   * @param _root The message's root
   */
  function test_revertIfCallerNotHandler(address _caller, address _originSender, bytes32 _root) public {
    vm.assume(_caller != sygmaSpokeConnector.PERMISSIONLESS_HANDLER());
    vm.stopPrank();
    vm.prank(_caller);
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_OnlyPermissionedHandler.selector);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
  }

  /**
   * @notice Tests it reverts when the origin sender is not the mirror connector
   * @param _originSender The address of the origin sender
   * @param _root The message's root
   */
  function test_revertIfOriginNotMirror(address _originSender, bytes32 _root) public {
    vm.assume(_originSender != sygmaSpokeConnector.mirrorConnector());
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_SenderIsNotMirrorConnector.selector);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
  }

  /**
   * @notice Tests it receives the aggregate root correctly
   * @param _blockNumber The block number in which the message was sent
   * @param _root The message's root
   */
  function test_receiveAggregateRoot(uint256 _blockNumber, bytes32 _root) public happyPath(_root) {
    vm.roll(_blockNumber);
    address _originSender = sygmaSpokeConnector.mirrorConnector();
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
    assertEq(sygmaSpokeConnector.pendingAggregateRoots(_root), _blockNumber);
  }

  /**
   * @notice Tests it emits the `AggregateRootReceived` event
   * @param _root The message's root
   */
  function test_emitEvent(bytes32 _root) public happyPath(_root) {
    address _originSender = sygmaSpokeConnector.mirrorConnector();
    // Expect `AggregateRootReceived` event to be emitted with the root
    vm.expectEmit(true, true, true, true, address(sygmaSpokeConnector));
    emit AggregateRootReceived(_root);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
  }
}

contract Unit_Connector_SygmaSpokeConnector_SendMessage is Base {
  /**
   * @notice Tests it reverts when the data length is not 32
   * @param _data The data
   * @param _feeData The fee data
   */
  function test_revertIfDataNotRootLength(bytes memory _data, bytes memory _feeData) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_DataLengthIsNot32.selector);
    vm.prank(user);
    sygmaSpokeConnector.forTest_sendMessage(_data, _feeData);
  }

  /**
   * @notice Tests it calls `deposit` on the sygma bridge
   * @param _root The message's root
   * @param _feeData The fee data
   * @param _depositNonce The deposit nonce
   * @param _handlerResponse The handler response
   */
  function test_callDeposit(
    bytes32 _root,
    bytes memory _feeData,
    uint64 _depositNonce,
    bytes memory _handlerResponse
  ) public {
    // Parse the root and then get the deposit data
    bytes memory _data = abi.encodePacked(_root);
    bytes memory _depositData = sygmaSpokeConnector.parseDepositData(_root, _l1Connector);
    // Expect sygma bridge `deposit` method to be called correctly
    _mockAndExpect(
      _amb,
      abi.encodeWithSelector(
        IBridge.deposit.selector,
        sygmaHubDomainId,
        sygmaSpokeConnector.PERMISSIONLESS_HANDLER_ID(),
        _depositData,
        _feeData
      ),
      abi.encode(_depositNonce, _handlerResponse)
    );

    vm.prank(user);
    sygmaSpokeConnector.forTest_sendMessage(_data, _feeData);
  }
}

contract Unit_Connector_SygmaSpokeConnector_VerifySender is Base {
  /**
   * @notice Tests it returns false if the origin sender is not the mirror connector
   * @param _originSender The address of the origin sender
   */
  function test_returnFalseIfOriginSenderNotMirror(address _originSender) public {
    vm.assume(_originSender != _l1Connector);
    assertEq(sygmaSpokeConnector.forTest_verifySender(_originSender), false);
  }

  /**
   * @notice Tests it returns true if the origin sender is the mirror connector
   */
  function test_returnTrueIfOriginSenderIsMirror() public {
    assertEq(sygmaSpokeConnector.forTest_verifySender(_l1Connector), true);
  }
}

contract Unit_Connector_SygmaSpokeConnector__RenouceOwnership is Base {
  /**
   * @notice Tests it reverts when the caller is not the owner
   * @param _caller The address of the caller
   */
  function test_revertIfCallerNotOwner(address _caller) public {
    vm.assume(_caller != _owner);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(_caller);
    sygmaSpokeConnector.renounceOwnership();
  }

  /**
   * @notice Tests it reverts the method is called
   */
  function test_revertWhenCalled() public {
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_UnimplementedMethod.selector);
    vm.prank(_owner);
    sygmaSpokeConnector.renounceOwnership();
  }
}

contract Unit_Connector_SygmaSpokeConnector__PrcessMessage is Base {
  /**
   * @notice Tests it reverts when the method is called
   * @param _data The data
   */
  function test_revertWhenCalled(bytes memory _data) public {
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_UnimplementedMethod.selector);
    vm.prank(_owner);
    sygmaSpokeConnector.forTest_processMessage(_data);
  }
}
