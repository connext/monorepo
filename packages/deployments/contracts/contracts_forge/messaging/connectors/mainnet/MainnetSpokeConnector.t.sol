// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {MainnetSpokeConnector} from "../../../../contracts/messaging/connectors/mainnet/MainnetSpokeConnector.sol";
import {SpokeConnector, Connector} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";

contract MainnetSpokeConnectorForTest is MainnetSpokeConnector {
  constructor(SpokeConnector.ConstructorParams memory _params) MainnetSpokeConnector(_params) {}

  function setOptimisticMode__forTest(bool _optimisticMode) public {
    optimisticMode = _optimisticMode;
  }

  function setProvenAggregateRoots__forTest(bytes32 _aggregateRoot, bool _isProven) public {
    provenAggregateRoots[_aggregateRoot] = _isProven;
  }

  function setPendingAggregateRoots__forTest(bytes32 _aggregateRoot, uint256 _block) public {
    pendingAggregateRoots[_aggregateRoot] = _block;
  }
}

contract Base is ConnectorHelper {
  // ============ Events ============
  event ProposedRootFinalized(bytes32 aggregateRoot);

  // ============ Storage ============
  bytes32 outboundRoot = bytes32("test");

  // ============ Test set up ============
  function setUp() public {
    _merkle = address(new MerkleTreeManager());

    _l2Connector = payable(address(123321123));

    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _l1Domain,
      mirrorDomain: _l2Domain,
      amb: _amb,
      rootManager: _rootManager,
      mirrorConnector: _l2Connector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: 0,
      merkle: _merkle,
      watcherManager: address(0),
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    // deploy
    _l1Connector = payable(address(new MainnetSpokeConnectorForTest(_baseParams)));
  }
}

// ============ Utils ============

contract MainnetSpokeConnector__verifySender is Base {
  function test_MainnetSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(this);
    assertTrue(MainnetSpokeConnectorForTest(_l1Connector).verifySender(expected));
  }

  function test_MainnetSpokeConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);
    assertEq(MainnetSpokeConnectorForTest(_l1Connector).verifySender(expected), false);
  }
}

contract MainnetSpokeConnector__sendMessage is Base {
  function test_MainnetSpokeConnector__sendMessage_fromRootManagerWorks() public {
    bytes memory _data = abi.encode(MainnetSpokeConnectorForTest(_l1Connector).outboundRoot());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, bytes(""), _rootManager);

    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).sendMessage(_data, bytes(""));
  }

  function test_MainnetSpokeConnector__sendMessage_failsIfCallerNotRootManager() public {
    bytes memory _data = abi.encode(MainnetSpokeConnectorForTest(_l1Connector).outboundRoot());

    vm.expectRevert(bytes("!rootManager"));

    // called as NOT root manager
    MainnetSpokeConnectorForTest(_l1Connector).sendMessage(_data, bytes(""));
  }

  function test_MainnetSpokeConnector__sendMessage_failsIfNot32Bytes() public {
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not 32 bytes
    vm.expectRevert(bytes("!length"));

    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).sendMessage(_data, bytes(""));
  }
}

contract MainnetSpokeConnector__processMessage is Base {
  function test_MainnetSpokeConnector__processMessage_reverts() public {
    vm.expectRevert(Connector.Connector__processMessage_notUsed.selector);
    vm.prank(_amb);
    MainnetSpokeConnectorForTest(_l1Connector).processMessage(bytes(""));
  }
}

contract MainnetSpokeConnector__saveAggregateRoot is Base {
  function test_MainnetSpokeConnector__saveAggregateRoot_revertsIfRootIsZero() public {
    bytes32 _emptyRoot = bytes32("");
    MainnetSpokeConnectorForTest(_l1Connector).setOptimisticMode__forTest(true);
    MainnetSpokeConnectorForTest(_l1Connector).setProvenAggregateRoots__forTest(_emptyRoot, false);
    vm.expectRevert(MainnetSpokeConnector.MainnetSpokeConnector_saveAggregateRoot__EmptyRoot.selector);
    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).saveAggregateRoot(_emptyRoot);
  }

  function test_MainnetSpokeConnector__saveAggregateRoot_revertsIfOptimisticModeOff(bytes32 _aggregateRoot) public {
    MainnetSpokeConnectorForTest(_l1Connector).setOptimisticMode__forTest(false);
    vm.assume(_aggregateRoot != 0);
    vm.expectRevert(MainnetSpokeConnector.MainnetSpokeConnector_saveAggregateRoot__OnlyOptimisticMode.selector);
    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).saveAggregateRoot(_aggregateRoot);
  }

  function test_MainnetSpokeConnector__saveAggregateRoot_revertsIfRootManagerIsNotCaller(
    address _stranger,
    bytes32 _aggregateRoot
  ) public {
    vm.assume(_stranger != _rootManager);
    vm.assume(_aggregateRoot != 0);
    MainnetSpokeConnectorForTest(_l1Connector).setOptimisticMode__forTest(true);
    vm.expectRevert(MainnetSpokeConnector.MainnetSpokeConnector_saveAggregateRoot__CallerIsNotRootManager.selector);
    vm.prank(_stranger);
    MainnetSpokeConnectorForTest(_l1Connector).saveAggregateRoot(_aggregateRoot);
  }

  function test_MainnetSpokeConnector__saveAggregateRoot_revertsIfRootAlreadyProven(bytes32 _aggregateRoot) public {
    vm.assume(_aggregateRoot != 0);
    MainnetSpokeConnectorForTest(_l1Connector).setOptimisticMode__forTest(true);
    MainnetSpokeConnectorForTest(_l1Connector).setProvenAggregateRoots__forTest(_aggregateRoot, true);
    vm.expectRevert(MainnetSpokeConnector.MainnetSpokeConnector_saveAggregateRoot__RootAlreadyProven.selector);
    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).saveAggregateRoot(_aggregateRoot);
  }

  function test_MainnetSpokeConnector__saveAggregateRoot_savesRootAndEmitsEvent(bytes32 _aggregateRoot) public {
    vm.assume(_aggregateRoot != 0);
    MainnetSpokeConnectorForTest(_l1Connector).setOptimisticMode__forTest(true);
    MainnetSpokeConnectorForTest(_l1Connector).setProvenAggregateRoots__forTest(_aggregateRoot, false);
    vm.expectEmit(true, true, true, true);
    emit ProposedRootFinalized(_aggregateRoot);
    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).saveAggregateRoot(_aggregateRoot);
    assertEq(MainnetSpokeConnectorForTest(_l1Connector).provenAggregateRoots(_aggregateRoot), true);
  }

  function test_MainnetSpokeConnector__saveAggregateRoot_deletesPendingRoot(
    bytes32 _aggregateRoot,
    uint256 _block
  ) public {
    vm.assume(_aggregateRoot != 0);
    vm.assume(_block != 0);
    MainnetSpokeConnectorForTest(_l1Connector).setOptimisticMode__forTest(true);
    MainnetSpokeConnectorForTest(_l1Connector).setProvenAggregateRoots__forTest(_aggregateRoot, false);
    MainnetSpokeConnectorForTest(_l1Connector).setPendingAggregateRoots__forTest(_aggregateRoot, _block);
    vm.prank(_rootManager);
    MainnetSpokeConnectorForTest(_l1Connector).saveAggregateRoot(_aggregateRoot);
    assertEq(MainnetSpokeConnectorForTest(_l1Connector).pendingAggregateRoots(_aggregateRoot), 0);
  }
}

contract MainnetSpokeConnector__proposeAggregateRoot is Base {
  function test_MainnetSpokeConnector__proposeAggregateRoot_reverts(
    bytes32 _aggregateRoot,
    uint256 _rootTimestamp
  ) public {
    vm.expectRevert(MainnetSpokeConnector.MainnetSpokeConnector_proposeAggregateRoot__DeprecatedInHubDomain.selector);
    MainnetSpokeConnectorForTest(_l1Connector).proposeAggregateRoot(_aggregateRoot, _rootTimestamp);
  }
}

contract MainnetSpokeConnector__finalize is Base {
  function test_MainnetSpokeConnector__finalize_reverts(
    bytes32 _aggregateRoot,
    uint256 _rootTimestamp,
    uint256 _endOfDispute
  ) public {
    vm.expectRevert(MainnetSpokeConnector.MainnetSpokeConnector_finalize__DeprecatedInHubDomain.selector);
    MainnetSpokeConnectorForTest(_l1Connector).finalize(_aggregateRoot, _rootTimestamp, _endOfDispute);
  }
}
