// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {TypeCasts} from "../../../../contracts/shared/libraries/TypeCasts.sol";
import {TypedMemView} from "../../../../contracts/shared/libraries/TypedMemView.sol";

import {IBridgeRouter} from "../../../../contracts/core/connext/interfaces/IBridgeRouter.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";

import {NomadFacet} from "../../../../contracts/core/connext/facets/NomadFacet.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {CallParams, ExecuteArgs} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

import "../../../utils/Mock.sol";
import "../../../utils/FacetHelper.sol";

contract NomadFacetTest is NomadFacet, FacetHelper {
  // ============ Libs ============
  using TypedMemView for bytes29;
  using TypedMemView for bytes;

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

  // set connextion
  bytes32 _originConnext = TypeCasts.addressToBytes32(address(12365136));

  // default amount
  uint256 _amount = 1.1 ether;

  // default nonce on xcall
  uint256 _nonce = 1;

  // bridge router
  address _bridge = address(565656565);

  // ============ Test set up ============
  function setUp() public {
    // Deploy any needed contracts.
    utils_deployContracts();
    utils_deployAssetContracts();

    vm.prank(address(this));
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = _ds_owner;
    s.bridgeRouter = IBridgeRouter(_bridge);
    s.remotes[_originDomain] = _originConnext;

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

  function utils_createCallParams(address asset) public returns (CallParams memory, bytes32) {
    (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(asset);
    CallParams memory params = CallParams({
      originDomain: _originDomain,
      destinationDomain: _destinationDomain,
      canonicalDomain: canonicalDomain,
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
      canonicalId: canonicalId
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

  function helpers_reconcileCaller(
    address _local,
    uint256 _amount,
    bytes32 _bridgeCaller,
    bytes32 _transferId
  ) public {
    (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(_local);
    bytes memory data = abi.encode(_transferId);
    vm.prank(_bridge);
    this.onReceive(_originDomain, _bridgeCaller, canonicalDomain, canonicalId, _local, _amount, data);
  }

  // Helper for calling `reconcile` and asserting expected behavior.
  function helpers_reconcileAndAssert(
    CallParams memory params,
    bytes32 transferId,
    bytes32 bridgeCaller,
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

    if (shouldSucceed) {
      vm.expectEmit(true, true, true, true);
      emit Reconciled(transferId, _originDomain, s.routedTransfers[transferId], _local, params.bridgedAmt, _bridge);
    } else {
      vm.expectRevert(expectedError);
    }

    helpers_reconcileCaller(_local, params.bridgedAmt, bridgeCaller, transferId);

    if (shouldSucceed) {
      assertEq(s.reconciledTransfers[transferId], true);
      address[] memory routers = s.routedTransfers[transferId];
      if (routers.length != 0) {
        uint256 routerAmt = params.bridgedAmt / s.routedTransfers[transferId].length;

        // Fast liquidity route. Should have reimbursed routers.
        for (uint256 i = 0; i < routers.length; i++) {
          assertEq(s.routerBalances[routers[i]][_local], routerBalances[i] + routerAmt);
        }
      }
    }
  }

  function helpers_reconcileAndAssert(bytes4 expectedError) public {
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);
    helpers_reconcileAndAssert(params, transferId, _originConnext, expectedError);
  }

  // Shortcut for above method.
  function helpers_reconcileAndAssert() public {
    helpers_reconcileAndAssert(bytes4(""));
  }

  // ============ bridgeRouter ============
  // NOTE: tested via assertions below

  // =========== reconcile ==========

  // ============ reconcile fail cases

  // fails if not sent by connext
  function test_NomadFacet__reconcile_failIfNotConnext() public {
    utils_setupAsset(true, false);
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);

    vm.expectRevert(NomadFacet.NomadFacet__reconcile_notConnext.selector);
    vm.prank(_bridge);
    this.onReceive(
      params.originDomain,
      TypeCasts.addressToBytes32(address(1234)), // random address as sender
      params.canonicalDomain,
      params.canonicalId,
      _local,
      params.bridgedAmt,
      abi.encode(transferId)
    );
  }

  // fails if already reconciled (s.reconciledTransfers[transferId] = true)
  function test_NomadFacet__reconcile_failIfAlreadyReconciled() public {
    utils_setupAsset(true, false);
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);
    s.reconciledTransfers[transferId] = true;

    vm.expectRevert(NomadFacet.NomadFacet__reconcile_alreadyReconciled.selector);
    vm.prank(_bridge);
    this.onReceive(
      _originDomain,
      _originConnext,
      params.canonicalDomain,
      params.canonicalId,
      _local,
      params.bridgedAmt,
      abi.encode(transferId)
    );
  }

  // fails if portal record, but used in slow mode
  function test_NomadFacet__reconcile_failsIfPortalAndNoRouter() public {
    utils_setupAsset(true, false);
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);
    delete s.routedTransfers[transferId];

    // set portal fee debt
    s.portalDebt[transferId] = 15;
    s.portalFeeDebt[transferId] = 10;

    vm.expectRevert(NomadFacet.NomadFacet__reconcile_noPortalRouter.selector);
    vm.prank(_bridge);
    this.onReceive(
      _originDomain,
      _originConnext,
      params.canonicalDomain,
      params.canonicalId,
      _local,
      params.bridgedAmt,
      abi.encode(transferId)
    );
  }

  // ============ reconcile success cases
  // works with local representational tokens (remote origin, so they will be minted)
  function test_NomadFacet__reconcile_worksWithLocal() public {
    utils_setupAsset(true, false);
    helpers_reconcileAndAssert();
  }

  function test_NomadFacet__reconcile_worksWithCanonical() public {
    utils_setupAsset(true, true);
    helpers_reconcileAndAssert();
  }

  // funds contract when pre-execute (slow liquidity route)
  function test_NomadFacet__reconcile_worksPreExecute() public {
    utils_setupAsset(true, false);
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);
    delete s.routedTransfers[transferId];

    helpers_reconcileAndAssert(params, transferId, _originConnext, bytes4(""));
  }

  // funds router when post-execute (fast liquidity route)
  function test_NomadFacet__reconcile_fastLiquiditySingleRouterWorks() public {
    utils_setupAsset(true, false);
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);
    s.routedTransfers[transferId] = [address(42)];
    helpers_reconcileAndAssert(params, transferId, _originConnext, bytes4(""));
  }

  // funds routers when post-execute multipath (fast liquidity route)
  function test_NomadFacet__reconcile_fastLiquidityMultipathWorks() public {
    utils_setupAsset(true, false);
    (CallParams memory params, bytes32 transferId) = utils_createCallParams(_local);
    s.routedTransfers[transferId] = [address(42), address(43), address(44), address(45)];
    helpers_reconcileAndAssert(params, transferId, _originConnext, bytes4(""));
  }
}
