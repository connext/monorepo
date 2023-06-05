// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {TypeCasts} from "../../../../contracts/shared/libraries/TypeCasts.sol";
import {TypedMemView} from "../../../../contracts/shared/libraries/TypedMemView.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {BridgeMessage} from "../../../../contracts/core/connext/libraries/BridgeMessage.sol";
import {AssetLogic} from "../../../../contracts/core/connext/libraries/AssetLogic.sol";

import {InboxFacet} from "../../../../contracts/core/connext/facets/InboxFacet.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {TransferInfo, ExecuteArgs, DestinationTransferStatus} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";
import {MessagingUtils} from "../../../utils/Messaging.sol";

import "forge-std/console.sol";

contract InboxFacetTest is InboxFacet, FacetHelper {
  // ============ Libs ============
  using TypedMemView for bytes29;
  using TypedMemView for bytes;
  using BridgeMessage for bytes29;

  struct SwapInfo {
    uint256 input;
    uint256 output; // the equivalent amount of `out` token for given `in`
  }

  // ========== Storage ===========
  // diamond storage contract owner
  address _ds_owner = address(987654321);

  // aave pool details
  address _aavePool;

  // default origin sender
  address _originSender = address(4);

  // default replica
  address _replica = address(5);

  // set connextion
  bytes32 _originConnext = TypeCasts.addressToBytes32(address(12365136));

  // default amount
  uint256 _amount = 1.1 ether;

  // default nonce on xcall
  uint256 _nonce = 1;

  // ============ Test set up ============
  function setUp() public {
    // Deploy any needed contracts.
    utils_deployContracts();
    utils_deployAssetContracts();

    vm.prank(address(this));
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = _ds_owner;
    s.remotes[_originDomain] = _originConnext;

    s.xAppConnectionManager = new MockXAppConnectionManager(new MockHome(_originDomain));
    MockXAppConnectionManager(address(s.xAppConnectionManager)).enrollInbox(_replica);
    assertTrue(MockXAppConnectionManager(address(s.xAppConnectionManager)).isReplica(_replica));

    // set domain
    s.domain = _originDomain;
  }

  // ============ Utils ============
  // Used in set up for deploying any needed peripheral contracts.
  function utils_deployContracts() public {
    // setup aave pool
    _aavePool = address(new MockPool(false));
    s.aavePool = _aavePool;
  }

  function utils_createMessage(TransferInfo memory params) public view returns (bytes memory) {
    return MessagingUtils.formatTransferMessage(params);
  }

  function utils_createTransferIdInformation() public view returns (TransferInfo memory, bytes32) {
    TransferInfo memory params = TransferInfo({
      originDomain: _originDomain,
      destinationDomain: _destinationDomain,
      canonicalDomain: _canonicalDomain,
      to: address(1111),
      delegate: address(2222),
      receiveLocal: false,
      callData: bytes(""),
      slippage: 1000,
      // These items would normally be replaced in the nested internal _xcall,
      // but will be defined as the "expected values" for the purpose of getting
      // the expected transfer ID.
      originSender: msg.sender,
      bridgedAmt: _amount,
      normalizedIn: _amount,
      nonce: 0,
      canonicalId: _canonicalId
    });
    bytes32 transferId = keccak256(abi.encode(params));
    return (params, transferId);
  }

  // Makes some mock xcall arguments using params set in storage.
  // function utils_makeXCallArgs() public returns (bytes32, XCallArgs memory) {
  //   // get args
  //   XCallArgs memory args = XCallArgs(utils_getUserFacingParams(), _adopted, _amount);
  //   // generate transfer id
  //   bytes32 transferId = utils_getTransferIdFromXCallArgs(args, _originSender, _canonicalId, _canonicalDomain);

  //   return (transferId, args);
  // }

  // function utils_makeXCallArgs(address assetId) public returns (bytes32, XCallArgs memory) {
  //   // get args
  //   XCallArgs memory args = XCallArgs(utils_getUserFacingParams(), assetId, _amount);
  //   // generate transfer id
  //   bytes32 transferId = utils_getTransferIdFromXCallArgs(args, _originSender, _canonicalId, _canonicalDomain);

  //   return (transferId, args);
  // }

  // ============ Helpers ===============

  // Helper for calling `reconcile` and asserting expected behavior.
  function helpers_reconcileAndAssert(
    TransferInfo memory params,
    bytes32 transferId,
    address bridgeCaller,
    bytes4 expectedError
  ) public {
    bool shouldSucceed = keccak256(abi.encode(expectedError)) == keccak256(abi.encode(bytes4("")));

    uint256[] memory routerBalances = new uint256[](s.routedTransfers[transferId].length);
    for (uint256 i = 0; i < s.routedTransfers[transferId].length; i++) {
      // Warming up the slot in order to make gas estimates more accurate to appropriate conditions.
      s.routerBalances[s.routedTransfers[transferId][i]][_local] = 1 ether;
      routerBalances[i] = 1 ether;
    }

    // Get pre-reconcile balances.
    uint256 prevBalance = IERC20(_local).balanceOf(address(this));

    bytes memory message = utils_createMessage(params);

    if (shouldSucceed) {
      vm.expectEmit(true, true, true, true);
      emit Reconciled(
        transferId,
        _originDomain,
        _local,
        s.routedTransfers[transferId],
        params.bridgedAmt,
        bridgeCaller
      );
    } else {
      vm.expectRevert(expectedError);
    }

    vm.prank(bridgeCaller);
    this.handle(params.originDomain, uint32(_nonce), _originConnext, message);

    if (shouldSucceed) {
      address[] memory routers = s.routedTransfers[transferId];
      if (routers.length != 0) {
        assertTrue(s.transferStatus[transferId] == DestinationTransferStatus.Completed);
        uint256 routerAmt = params.bridgedAmt / s.routedTransfers[transferId].length;

        // Fast liquidity route. Should have reimbursed routers.
        for (uint256 i = 0; i < routers.length; i++) {
          assertEq(s.routerBalances[routers[i]][_local], routerBalances[i] + routerAmt);
        }
      } else {
        assertTrue(s.transferStatus[transferId] == DestinationTransferStatus.Reconciled);
      }
      assertEq(
        IERC20(_local).balanceOf(address(this)),
        _isLocalOrigin(_local) ? prevBalance : prevBalance + params.bridgedAmt
      );
    }
  }

  function helpers_reconcileAndAssert(bytes4 expectedError) public {
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    helpers_reconcileAndAssert(params, transferId, _replica, expectedError);
  }

  // Shortcut for above method.
  function helpers_reconcileAndAssert() public {
    helpers_reconcileAndAssert(bytes4(""));
  }

  // ============ bridgeRouter ============
  // NOTE: tested via assertions below

  // =========== reconcile ==========

  // ============ reconcile fail cases

  // fails if message is not transfer
  function test_InboxFacet__handle_failIfNotTransfer() public {
    bytes29[] memory _views = new bytes29[](2);
    _views[0] = BridgeMessage.formatTokenId(_canonicalDomain, _canonicalId);
    _views[1] = abi.encodePacked(BridgeMessage.Types.Invalid, uint256(0), TypeCasts.addressToBytes32(address(123))).ref(
      uint40(BridgeMessage.Types.Invalid)
    );
    bytes memory message = TypedMemView.join(_views);

    vm.expectRevert(InboxFacet.InboxFacet__handle_notTransfer.selector);
    vm.prank(_replica);
    this.handle(_originDomain, uint32(_nonce), _originConnext, message);
  }

  // fails if already reconciled (status == reconciled)
  function test_InboxFacet__reconcile_failIfReconciled() public {
    utils_setupAsset(true, false);
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    s.transferStatus[transferId] = DestinationTransferStatus.Reconciled;

    bytes memory message = utils_createMessage(params);

    vm.expectRevert(InboxFacet.InboxFacet__reconcile_alreadyReconciled.selector);
    vm.prank(_replica);
    this.handle(params.originDomain, uint32(_nonce), _originConnext, message);
  }

  // fails if already reconciled (status == completed)
  function test_InboxFacet__reconcile_failIfCompleted() public {
    utils_setupAsset(true, false);
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    s.transferStatus[transferId] = DestinationTransferStatus.Completed;

    bytes memory message = utils_createMessage(params);

    vm.expectRevert(InboxFacet.InboxFacet__reconcile_alreadyReconciled.selector);
    vm.prank(_replica);
    this.handle(params.originDomain, uint32(_nonce), _originConnext, message);
  }

  // fails if portal record, but used in slow mode
  function test_InboxFacet__reconcile_failsIfPortalAndNoRouter() public {
    utils_setupAsset(true, false);
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    delete s.routedTransfers[transferId];
    delete s.transferStatus[transferId];

    // set portal fee debt
    s.portalDebt[transferId] = 15;
    s.portalFeeDebt[transferId] = 10;

    bytes memory message = utils_createMessage(params);

    vm.expectRevert(InboxFacet.InboxFacet__reconcile_noPortalRouter.selector);
    vm.prank(_replica);
    this.handle(params.originDomain, uint32(_nonce), _originConnext, message);
  }

  // ============ reconcile success cases
  // works with local representational tokens (remote origin, so they will be minted)
  function test_InboxFacet__reconcile_worksWithLocal() public {
    utils_setupAsset(true, false);
    helpers_reconcileAndAssert();
  }

  function test_InboxFacet__reconcile_worksWithCanonical() public {
    utils_setupAsset(true, true);
    helpers_reconcileAndAssert();
  }

  // funds contract when pre-execute (slow liquidity route)
  function test_InboxFacet__reconcile_worksPreExecute() public {
    utils_setupAsset(true, false);
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    delete s.routedTransfers[transferId];
    delete s.transferStatus[transferId];
    helpers_reconcileAndAssert(params, transferId, _replica, bytes4(""));
  }

  // funds router when post-execute (fast liquidity route)
  function test_InboxFacet__reconcile_fastLiquiditySingleRouterWorks() public {
    utils_setupAsset(true, false);
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    s.routedTransfers[transferId] = [address(42)];
    s.transferStatus[transferId] = DestinationTransferStatus.Executed;
    helpers_reconcileAndAssert(params, transferId, _replica, bytes4(""));
  }

  // funds routers when post-execute multipath (fast liquidity route)
  function test_InboxFacet__reconcile_fastLiquidityMultipathWorks() public {
    utils_setupAsset(true, false);
    (TransferInfo memory params, bytes32 transferId) = utils_createTransferIdInformation();
    s.routedTransfers[transferId] = [address(42), address(43), address(44), address(45)];
    s.transferStatus[transferId] = DestinationTransferStatus.Executed;
    helpers_reconcileAndAssert(params, transferId, _replica, bytes4(""));
  }
}
