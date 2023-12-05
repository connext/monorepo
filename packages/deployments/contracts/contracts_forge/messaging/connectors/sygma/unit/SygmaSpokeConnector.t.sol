// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../contracts/messaging/MerkleTreeManager.sol";
import {SygmaSpokeConnector, SpokeConnector, ProposedOwnable} from "../../../../../contracts/messaging/connectors/sygma/SygmaSpokeConnector.sol";
import {IBridge} from "../../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

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

contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  address public permissionlessHandler = makeAddr("permissionlessHandler");
  address public watcherManager = makeAddr("watcherManager");

  SygmaSpokeConnectorForTest public sygmaSpokeConnector;
  uint8 public sygmaHubDomainId = 1;
  uint256 public delayBlocks = 0;
  uint256 public disputeBlocks = 0;
  uint256 public minDisputeBlocks = 0;

  function setUp() public {
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

contract Unit_Connector_SygmaSpokeConnector__Constructor is Base {
  function test_constructor() public {
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

contract Unit_Connector_SygmaSpokeConnector__ReceiveMessage is Base {
  event AggregateRootReceived(bytes32 indexed _aggregateRoot);

  function test_revertIfCallerNotHandler(address _caller, address _originSender, bytes32 _root) public {
    vm.assume(_caller != sygmaSpokeConnector.PERMISSIONLESS_HANDLER());
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_OnlyPermissionedHandler.selector);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
  }

  function test_revertIfOriginNotMirror(address _originSender, bytes32 _root) public {
    vm.assume(_originSender != sygmaSpokeConnector.mirrorConnector());
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_SenderIsNotMirrorConnector.selector);
    vm.prank(permissionlessHandler);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
  }

  function test_receiveAggregateRoot(uint256 _blockNumber, bytes32 _root) public {
    vm.assume(_root != bytes32(""));
    vm.roll(_blockNumber);
    address _originSender = sygmaSpokeConnector.mirrorConnector();
    vm.prank(permissionlessHandler);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
    assertEq(sygmaSpokeConnector.pendingAggregateRoots(_root), _blockNumber);
  }

  function test_emitEvent(bytes32 _root) public {
    vm.assume(_root != bytes32(""));
    address _originSender = sygmaSpokeConnector.mirrorConnector();

    // Expect `AggregateRootReceived` event to be emitted with the root
    vm.expectEmit(true, true, true, true, address(sygmaSpokeConnector));
    emit AggregateRootReceived(_root);

    vm.prank(permissionlessHandler);
    sygmaSpokeConnector.receiveMessage(_originSender, _root);
  }
}

contract Unit_Connector_SygmaSpokeConnector__SendMessage is Base {
  function test_revertIfDataLengthIsNot32(bytes memory _data, bytes memory _feeData) public {
    vm.assume(_data.length != 32);
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_DataLengthIsNot32.selector);
    vm.prank(user);
    sygmaSpokeConnector.forTest_sendMessage(_data, _feeData);
  }

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
  function test_returnFalseIfOriginSenderNotMirror(address _originSender) public {
    vm.assume(_originSender != _l1Connector);
    assertEq(sygmaSpokeConnector.forTest_verifySender(_originSender), false);
  }

  function test_returnTrueIfOriginSenderIsMirror() public {
    assertEq(sygmaSpokeConnector.forTest_verifySender(_l1Connector), true);
  }
}

contract Unit_Connector_SygmaSpokeConnector__RenounceOwnership is Base {
  function test_revertIfCallerNotOwner(address _caller) public {
    vm.assume(_caller != _owner);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(_caller);
    sygmaSpokeConnector.renounceOwnership();
  }

  function test_revertWhenCalled() public {
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_UnimplementedMethod.selector);
    vm.prank(_owner);
    sygmaSpokeConnector.renounceOwnership();
  }
}

contract Unit_Connector_SygmaSpokeConnector__ProcessMessage is Base {
  function test_revertWhenCalled(bytes memory _data) public {
    vm.expectRevert(SygmaSpokeConnector.SygmaSpokeConnector_UnimplementedMethod.selector);
    vm.prank(_owner);
    sygmaSpokeConnector.forTest_processMessage(_data);
  }
}
