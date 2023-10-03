// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IOutbox as ArbitrumL1_Outbox} from "@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol";
import {IBridge as ArbitrumL1_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IBridge.sol";
import {IArbSys as ArbitrumL2_Bridge} from "@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol";
import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import {ArbitrumSpokeConnector} from "../../../../contracts/messaging/connectors/arbitrum/ArbitrumSpokeConnector.sol";

import {IArbitrumInbox} from "../../../../contracts/messaging/interfaces/ambs/arbitrum/IArbitrumInbox.sol";
import {ArbitrumL2Amb} from "../../../../contracts/messaging/interfaces/ambs/arbitrum/ArbitrumL2Amb.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract ArbitrumSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============
  event FundsWithdrawn(address indexed to, uint256 amount);

  // ============ Storage ============
  uint256 _defaultGasPrice = 10 gwei;
  address _alias = address(999777666);

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = payable(address(123321123));

    _merkle = address(new MerkleTreeManager());

    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2_Bridge.mapL1SenderContractAddressToL2Alias.selector),
      abi.encode(_alias)
    );

    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _l2Domain,
      mirrorDomain: _l1Domain,
      amb: _amb,
      rootManager: _rootManager,
      mirrorConnector: _l1Connector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: 0,
      merkle: _merkle,
      watcherManager: address(1),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    _l2Connector = payable(address(new ArbitrumSpokeConnector(_baseParams)));

    // Make sure our mocked mapL1SenderContractAddressToL2Alias was called and alias
    // address was set correctly.
    assertEq(ArbitrumSpokeConnector(_l2Connector).aliasedSender(), _alias);
  }

  // ============ Utils ============
  function utils_setSpokeConnectorVerifyMocks(address _sender, bool _isCrosschain) public {
    // setup mocks
    // 1. call to ensure it was a crosschain tx
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2_Bridge.wasMyCallersAddressAliased.selector),
      abi.encode(_isCrosschain)
    );

    // 2. call to l2 bridge to get address
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2_Bridge.myCallersAddressWithoutAliasing.selector),
      abi.encode(_sender)
    );
  }

  // ============ ArbitrumSpokeConnector.withdrawFunds ============
  function test_ArbitrumSpokeConnector__withdrawFunds_shouldWork() public {
    uint256 amount = 10 ether;
    address to = address(32153024222355546);

    // fund connector
    _l2Connector.call{value: amount}("");
    assertEq(_l2Connector.balance, amount);

    // expect event
    vm.expectEmit(true, true, true, true);
    emit FundsWithdrawn(to, amount);

    // withdraw funds
    vm.prank(ArbitrumSpokeConnector(payable(_l2Connector)).owner());
    ArbitrumSpokeConnector(payable(_l2Connector)).withdrawFunds(to);

    // assert balance changes
    assertEq(to.balance, amount);
    assertEq(_l2Connector.balance, 0);
  }

  // ============ ArbitrumSpokeConnector.verifySender ============
  function test_ArbitrumSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(expected, true);

    assertTrue(ArbitrumSpokeConnector(payable(_l2Connector)).verifySender(expected));
  }

  function test_ArbitrumSpokeConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(address(122), true);

    assertEq(ArbitrumSpokeConnector(payable(_l2Connector)).verifySender(expected), false);
  }

  function test_ArbitrumSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);
    utils_setSpokeConnectorVerifyMocks(expected, false);

    vm.expectRevert(NotCrossChainCall.selector);
    assertEq(ArbitrumSpokeConnector(payable(_l2Connector)).verifySender(expected), false);
  }

  // ============ ArbitrumSpokeConnector.sendMessage ============
  function test_ArbitrumSpokeConnector__sendMessage_works() public {
    // setup mock
    vm.mockCall(
      _amb,
      abi.encodeWithSelector(ArbitrumL2Amb.sendTxToL1.selector),
      abi.encode(ArbitrumSpokeConnector(payable(_l2Connector)).outboundRoot())
    );

    // data
    bytes memory _data = abi.encode(ArbitrumSpokeConnector(payable(_l2Connector)).outboundRoot());

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, bytes(""), _rootManager);

    // should call send contract transaction
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        ArbitrumL2Amb.sendTxToL1.selector,
        _l1Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data)
      )
    );

    vm.prank(_rootManager);
    ArbitrumSpokeConnector(payable(_l2Connector)).send(bytes(""));
  }

  // ============ ArbitrumSpokeConnector.processMessage ============
  function test_ArbitrumSpokeConnector__processMessage_works() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector, true);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"));

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _alias);

    // make call
    vm.prank(_alias);
    ArbitrumSpokeConnector(payable(_l2Connector)).processMessage(_data);

    // Check: root is marked as pending
    assertEq(ArbitrumSpokeConnector(payable(_l2Connector)).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_ArbitrumSpokeConnector__processMessage_works_fuzz(bytes32 data) public {
    if (data == bytes32("")) return;
    utils_setSpokeConnectorVerifyMocks(_l1Connector, true);

    // get outbound data
    bytes memory _data = abi.encode(data);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _alias);

    // make call
    vm.prank(_alias);
    ArbitrumSpokeConnector(payable(_l2Connector)).processMessage(_data);

    // Check: root is marked as pending
    assertEq(ArbitrumSpokeConnector(payable(_l2Connector)).pendingAggregateRoots(bytes32(_data)), block.number);
  }

  function test_ArbitrumSpokeConnector__processMessage_failsIfNotCrosschain() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector, false);

    // call does not originate from amb
    vm.expectRevert(bytes("!aliasedSender"));
    // make call
    ArbitrumSpokeConnector(payable(_l2Connector)).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumL2Connectoclearr__processMessage_failsIfNotMirrorConnector() public {
    // setup mocks
    utils_setSpokeConnectorVerifyMocks(address(654321), true);

    // should revert because not bridge
    vm.expectRevert(bytes("!mirrorConnector"));
    // make call
    vm.prank(_alias);
    ArbitrumSpokeConnector(payable(_l2Connector)).processMessage(abi.encode(bytes32("test")));
  }

  function test_ArbitrumSpokeConnector__processMessage_failsIfNot32Bytes() public {
    utils_setSpokeConnectorVerifyMocks(_l1Connector, true);

    // get outbound data
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not 32 bytes
    vm.expectRevert(bytes("!length"));

    // make call
    vm.prank(_alias);
    ArbitrumSpokeConnector(payable(_l2Connector)).processMessage(_data);
  }
}
