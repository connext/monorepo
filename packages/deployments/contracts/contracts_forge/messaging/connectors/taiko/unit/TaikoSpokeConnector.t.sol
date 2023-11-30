// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {SpokeConnector} from "../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {TaikoSpokeConnector} from "../../../../../contracts/messaging/connectors/taiko/TaikoSpokeConnector.sol";
import {ISignalService} from "../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

contract TaikoSpokeConnectorForTest is TaikoSpokeConnector {
  constructor(
    SpokeConnector.ConstructorParams memory _constructorParams,
    address _taikoSignalService,
    uint256 _hubChainId,
    uint256 _gasCap
  ) TaikoSpokeConnector(_constructorParams, _taikoSignalService, _hubChainId, _gasCap) {}

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
  uint256 public constant DELAY_BLOCKS = 0;
  uint256 public constant HUB_CHAIN_ID = 1;

  address public user = makeAddr("user");
  address public offChainAgent = makeAddr("offChainAgent");
  address public owner = makeAddr("owner");
  address public stranger = makeAddr("stranger");
  address public taikoSignalService = makeAddr("TaikoSignalService");
  address public merkleTreeManager = makeAddr("MerkleTreeManager");
  address public watcherManager = makeAddr("WatcherManager");

  TaikoSpokeConnectorForTest public taikoSpokeConnector;

  function setUp() public {
    vm.prank(owner);
    SpokeConnector.ConstructorParams memory _params = SpokeConnector.ConstructorParams({
      domain: _l1Domain,
      mirrorDomain: _l2Domain,
      amb: offChainAgent,
      rootManager: _rootManager,
      mirrorConnector: _l1Connector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: DELAY_BLOCKS,
      merkle: merkleTreeManager,
      watcherManager: watcherManager,
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });
    taikoSpokeConnector = new TaikoSpokeConnectorForTest(_params, taikoSignalService, HUB_CHAIN_ID, _gasCap);
  }
}

contract Unit_Connector_TaikoSpokeConnector_Constructor is Base {
  function test_checkConstructorArgs() public {
    assertEq(taikoSpokeConnector.DOMAIN(), _l1Domain);
    assertEq(taikoSpokeConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(taikoSpokeConnector.AMB(), offChainAgent);
    assertEq(taikoSpokeConnector.ROOT_MANAGER(), _rootManager);
    assertEq(taikoSpokeConnector.mirrorConnector(), _l1Connector);
    assertEq(taikoSpokeConnector.PROCESS_GAS(), _processGas);
    assertEq(taikoSpokeConnector.RESERVE_GAS(), _reserveGas);
    assertEq(taikoSpokeConnector.delayBlocks(), DELAY_BLOCKS);
    assertEq(address(taikoSpokeConnector.MERKLE()), merkleTreeManager);
    assertEq(address(taikoSpokeConnector.watcherManager()), watcherManager);
    assertEq(taikoSpokeConnector.minDisputeBlocks(), _minDisputeBlocks);
    assertEq(taikoSpokeConnector.disputeBlocks(), _disputeBlocks);
    assertEq(address(taikoSpokeConnector.TAIKO_SIGNAL_SERVICE()), taikoSignalService);
    assertEq(taikoSpokeConnector.HUB_CHAIN_ID(), HUB_CHAIN_ID);
    assertEq(taikoSpokeConnector.forTest_gasCap(), _gasCap);
  }
}

contract Unit_Connector_TaikoSpokeConnector_RenounceOwnership is Base {
  function test_revertIfCalled() public {
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_NotImplementedMethod.selector);
    vm.prank(owner);
    taikoSpokeConnector.renounceOwnership();
  }
}

contract Unit_Connector_TaikoSpokeConnector_SendMessage is Base {
  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != 32);
    bytes memory _encodedData = "";

    vm.prank(user);
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_LengthIsNot32.selector);
    taikoSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }

  function test_callSendSignal(bytes32 _signal) public {
    bytes memory _encodedData = "";
    bytes memory _storageSlotResponse = abi.encode("storageSlot1");
    // Mock the call over `sendSignal` and expect it to be called
    _mockAndExpect(
      address(taikoSpokeConnector.TAIKO_SIGNAL_SERVICE()),
      abi.encodeWithSelector(ISignalService.sendSignal.selector, _signal),
      _storageSlotResponse
    );

    // Call `sendSignal` function
    vm.prank(user);
    taikoSpokeConnector.forTest_sendMessage(abi.encode(_signal), _encodedData);
  }
}

contract Unit_Connector_TaikoSpokeConnector_ProcessMessage is Base {
  event AggregateRootReceived(bytes32 indexed _aggregateRoot);

  function test_revertIfSenderIsNotConnext(address _sender, bytes memory _data) public {
    vm.assume(_sender != address(_amb));
    vm.prank(_sender);
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_SenderIsNotConnext.selector);
    taikoSpokeConnector.forTest_processMessage(_data);
  }

  function test_callIsSignalReceived(bytes32 _signal, bytes memory _proof) public {
    // Mock the call over `verifyAndGetSignal` and expect it to be called
    _mockAndExpect(
      taikoSignalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        taikoSpokeConnector.HUB_CHAIN_ID(),
        _l1Connector,
        _signal,
        _proof
      ),
      abi.encode(true)
    );

    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    vm.prank(offChainAgent);
    taikoSpokeConnector.forTest_processMessage(_data);
  }

  function test_revertIfSignalNotReceived(bytes32 _signal, bytes memory _proof) public {
    // Mock the call over `verifyAndGetSignal`
    bool _isReceived = false;
    vm.mockCall(
      taikoSignalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        taikoSpokeConnector.HUB_CHAIN_ID(),
        _l2Connector,
        _signal,
        _proof
      ),
      abi.encode(_isReceived)
    );
    // Expect revert since signal was not received
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_SignalNotReceived.selector);

    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    vm.prank(offChainAgent);
    taikoSpokeConnector.forTest_processMessage(_data);
  }

  function test_callAggregate(bytes32 _signal, bytes memory _proof) public {
    // Mock the call over `verifyAndGetSignal`
    vm.mockCall(
      taikoSignalService,
      abi.encodeWithSelector(
        ISignalService.isSignalReceived.selector,
        taikoSpokeConnector.HUB_CHAIN_ID(),
        _l2Connector,
        _signal,
        _proof
      ),
      abi.encode(true)
    );

    // Expect AggregateRootReceived to be emitted
    vm.expectEmit(true, true, true, true);
    emit AggregateRootReceived(_signal);

    // Call `processMessage` function
    bytes memory _data = abi.encode(_signal, _proof);
    vm.prank(offChainAgent);
    taikoSpokeConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_TaikoSpokeConnector_VerifySender is Base {
  function test_returnTrue() public {
    vm.prank(_amb);
    assertEq(taikoSpokeConnector.forTest_verifySender(_amb), true);
  }

  function test_returnFalse() public {
    vm.prank(stranger);
    assertEq(taikoSpokeConnector.forTest_verifySender(_amb), false);
  }
}
