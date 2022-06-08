// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "./FacetHelper.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IConnextHandler} from "../../../../contracts/core/connext/interfaces/IConnextHandler.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import "../../../../contracts/core/connext/facets/StableSwapFacet.sol";

contract StableSwapFacetTest is FacetHelper, StableSwapFacet {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // owner
  address _owner = address(1234);
  address _user1 = address(1);
  address _user2 = address(2);
  LPToken _lpTokenTarget;

  // Test Values
  uint256 INITIAL_A_VALUE = 50;
  uint256 SWAP_FEE = 1e7;
  string LP_TOKEN_NAME = "Test LP Token Name";
  string LP_TOKEN_SYMBOL = "TESTLP";
  uint256 blockTimestamp = 100;

  // ============ Test set up ============
  function setUp() public {
    utils_deployAssetContracts();

    // we are on the origin domain where local == canonical
    utils_setupAsset(false, true);

    // set the owner to this contract
    setOwner(_owner);

    utils_initializeSwap();
    utils_addLiquidity(1 ether, 1 ether);
  }

  // ============ Utils ==============
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  function utils_initializeSwap() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(_local);
    _pooledTokens[1] = IERC20(_adopted);

    TestERC20(_local).mint(_owner, 10 ether);
    TestERC20(_adopted).mint(_owner, 10 ether);

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    uint256 _a = INITIAL_A_VALUE;
    uint256 _adminFee = 0;
    uint256 _fee = SWAP_FEE;

    _lpTokenTarget = new LPToken();
    _lpTokenTarget.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);

    vm.prank(_owner);
    this.initializeSwap(
      _canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      _a,
      _fee,
      _adminFee,
      address(_lpTokenTarget)
    );

    assertEq(this.getSwapVirtualPrice(_canonicalId), 0);
  }

  function utils_addLiquidity(uint256 amount1, uint256 amount2) public {
    vm.warp(blockTimestamp);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = amount1;
    amounts[1] = amount2;

    vm.startPrank(_owner);
    IERC20(s.swapStorages[_canonicalId].pooledTokens[0]).approve(address(this), 100 ether);
    IERC20(s.swapStorages[_canonicalId].pooledTokens[1]).approve(address(this), 100 ether);

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 10);
    vm.stopPrank();
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
  function test_StableSwapFacet__initializeSwap_failIfNotOwner() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfDuplicatedTokens() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = _pooledTokens[0];

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_duplicateTokens.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfAlreadyInitialized() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_alreadyInitialized.selector);

    this.initializeSwap(
      _canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfDecimalsMismatch() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](1);
    _decimals[0] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_decimalsMismatch.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfZeroTokenAddress() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(address(0));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_zeroTokenAddress.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfAExceedMax() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_aExceedMax.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      AmplificationUtils.MAX_A,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfFeeExceedMax() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_feeExceedMax.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      AmplificationUtils.MAX_A - 1,
      SwapUtils.MAX_SWAP_FEE,
      SwapUtils.MAX_ADMIN_FEE - 1,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_failIfAdminFeeExceedMax() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    vm.expectRevert(StableSwapFacet.StableSwapFacet__initializeSwap_adminFeeExceedMax.selector);

    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      AmplificationUtils.MAX_A - 1,
      SwapUtils.MAX_SWAP_FEE - 1,
      SwapUtils.MAX_ADMIN_FEE,
      address(_lpTokenTarget)
    );
  }

  function test_StableSwapFacet__initializeSwap_shouldWork() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20());
    _pooledTokens[1] = IERC20(new TestERC20());

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    uint256 a = INITIAL_A_VALUE;
    uint256 adminFee = 0;
    uint256 fee = SWAP_FEE;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));

    vm.prank(_owner);
    this.initializeSwap(
      canonicalId,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      a,
      fee,
      adminFee,
      address(_lpTokenTarget)
    );

    assertEq(s.swapStorages[canonicalId].initialA, a * AmplificationUtils.A_PRECISION);
    assertEq(s.swapStorages[canonicalId].futureA, a * AmplificationUtils.A_PRECISION);
    assertEq(s.swapStorages[canonicalId].swapFee, fee);
    assertEq(s.swapStorages[canonicalId].adminFee, adminFee);
    assertEq(address(s.swapStorages[canonicalId].pooledTokens[0]), address(_pooledTokens[0]));
    assertEq(s.swapStorages[canonicalId].balances[0], 0);
  }

  // function test_StableSwapFacet__withdrawSwapAdminFees
  // function test_StableSwapFacet__setSwapAdminFee
  // function test_StableSwapFacet__setSwapFee
  // function test_StableSwapFacet__rampA
  // function test_StableSwapFacet__stopRampA
}
