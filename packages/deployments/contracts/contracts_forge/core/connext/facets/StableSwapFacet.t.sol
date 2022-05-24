// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../../utils/ForgeHelper.sol";

import {IConnextHandler} from "../../../../contracts/core/connext/interfaces/IConnextHandler.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {StableSwapFacet} from "../../../../contracts/core/connext/facets/RoutersFacet.sol";

// TODO: This is testing the logic conditions in the library and file should be
// refactored to reflect that, including:
// - Renaming test contract
// - Refactoring test logic (use storage on contract)
//
// Instead, this file should test the functions within `RouterPermissionsManager` that
// are not present in the logic lib (i.e. the getters)

contract StableSwapFacetTest is ForgeHelper, StableSwapFacet {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // owner
  address _owner = address(12345);

  // sample data
  uint32 _domain = 1000;

  address _local = address(7);
  bytes32 _localTokenId = bytes32(abi.encodePacked(_local));

  address _canonical = address(5);
  bytes32 _canonicalTokenId = bytes32(abi.encodePacked(_canonical));

  // ============ Test set up ============
  function setUp() public {
    setOwner(_owner);
  }

  // ============ Utils ==============
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  // ============ Tests ============

  // ============ View Functions ============
  // function test_StableSwapFacet__getSwapStorage
  // function test_StableSwapFacet__getSwapLPToken
  // function test_StableSwapFacet__getSwapA
  // function test_StableSwapFacet__getSwapAPrecise
  // function test_StableSwapFacet__getSwapToken
  // function test_StableSwapFacet__getSwapTokenIndex
  // function test_StableSwapFacet__getSwapTokenBalance
  // function test_StableSwapFacet__getSwapVirtualPrice
  // function test_StableSwapFacet__calculateSwap
  // function test_StableSwapFacet__calculateSwapTokenAmount
  // function test_StableSwapFacet__calculateRemoveSwapLiquidity
  // function test_StableSwapFacet__calculateRemoveSwapLiquidityOneToken
  // function test_StableSwapFacet__getSwapAdminBalance

  // ======= State-Modifying Functions ========
  // function test_StableSwapFacet__swap
  // function test_StableSwapFacet__swapExact
  // function test_StableSwapFacet__addSwapLiquidity
  // function test_StableSwapFacet__removeSwapLiquidity
  // function test_StableSwapFacet__removeSwapLiquidityOneToken
  // function test_StableSwapFacet__removeSwapLiquidityImbalance

  // =========== Admin Functions ============
  // function test_StableSwapFacet__initializeSwap
  // function test_StableSwapFacet__withdrawSwapAdminFees
  // function test_StableSwapFacet__setSwapAdminFee
  // function test_StableSwapFacet__setSwapFee
  // function test_StableSwapFacet__rampA
  // function test_StableSwapFacet__stopRampA
}
