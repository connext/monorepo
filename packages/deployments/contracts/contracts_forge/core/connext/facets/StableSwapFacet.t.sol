// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/FacetHelper.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {IConnextHandler} from "../../../../contracts/core/connext/interfaces/IConnextHandler.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "../../../../contracts/core/connext/facets/StableSwapFacet.sol";
import "../../../../contracts/core/connext/facets/SwapAdminFacet.sol";

contract StableSwapFacetTest is FacetHelper, StableSwapFacet, SwapAdminFacet {
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
  uint256 blockTimestamp = 2 days;

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

    // Mint Token0, Token1 to Owner, User1, User2
    TestERC20(_local).mint(_owner, 100 ether);
    TestERC20(_adopted).mint(_owner, 100 ether);

    TestERC20(_local).mint(_user1, 100 ether);
    TestERC20(_adopted).mint(_user1, 100 ether);

    TestERC20(_local).mint(_user2, 100 ether);
    TestERC20(_adopted).mint(_user2, 100 ether);

    // Approve Token0, Token1 from User1, User2
    vm.startPrank(_user1);
    TestERC20(_local).approve(address(this), 100 ether);
    TestERC20(_adopted).approve(address(this), 100 ether);
    vm.stopPrank();

    vm.startPrank(_user2);
    TestERC20(_local).approve(address(this), 100 ether);
    TestERC20(_adopted).approve(address(this), 100 ether);
    vm.stopPrank();

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

  function utils_swapExact(
    uint256 amountIn,
    address assetIn,
    address assetOut,
    uint256 minAmountOut
  ) public returns (uint256) {
    vm.warp(blockTimestamp);
    return this.swapExact(_canonicalId, amountIn, assetIn, assetOut, minAmountOut, blockTimestamp + 10);
  }

  function utils_swapExactOut(
    uint256 amountOut,
    address assetIn,
    address assetOut,
    uint256 maxAmountIn
  ) public returns (uint256) {
    vm.warp(blockTimestamp);
    return this.swapExactOut(_canonicalId, amountOut, assetIn, assetOut, maxAmountIn, blockTimestamp + 10);
  }

  // ============ Tests ============

  // ============ View Functions ============
  function test_StableSwapFacet__getSwapStorage_shouldWork() public {
    SwapUtils.Swap memory swapStorage = this.getSwapStorage(_canonicalId);

    assertEq(swapStorage.initialA, INITIAL_A_VALUE * AmplificationUtils.A_PRECISION);
    assertEq(swapStorage.futureA, INITIAL_A_VALUE * AmplificationUtils.A_PRECISION);
    assertEq(swapStorage.swapFee, SWAP_FEE);
    assertEq(swapStorage.adminFee, 0);
  }

  function test_StableSwapFacet__getSwapLPToken_shouldWork() public {
    address lpToken = this.getSwapLPToken(_canonicalId);

    assertTrue(AddressUpgradeable.isContract(lpToken));
    assertEq(LPToken(lpToken).name(), LP_TOKEN_NAME);
    assertEq(LPToken(lpToken).symbol(), LP_TOKEN_SYMBOL);
  }

  function test_StableSwapFacet__getSwapA_shouldWork() public {
    assertEq(this.getSwapA(_canonicalId), AmplificationUtils.getA(s.swapStorages[_canonicalId]));
  }

  function test_StableSwapFacet__getSwapAPrecise() public {
    assertEq(this.getSwapAPrecise(_canonicalId), AmplificationUtils.getAPrecise(s.swapStorages[_canonicalId]));
  }

  function test_StableSwapFacet__getSwapToken_shouldWork() public {
    assertEq(address(this.getSwapToken(_canonicalId, 0)), address(_local));
    assertEq(address(this.getSwapToken(_canonicalId, 1)), address(_adopted));

    vm.expectRevert(StableSwapFacet.StableSwapFacet__getSwapToken_outOfRange.selector);
    this.getSwapToken(_canonicalId, 2);
  }

  function test_StableSwapFacet__getSwapTokenIndex_shouldWork() public {
    assertEq(this.getSwapTokenIndex(_canonicalId, _local), 0);
    assertEq(this.getSwapTokenIndex(_canonicalId, _adopted), 1);

    vm.expectRevert(StableSwapFacet.StableSwapFacet__getSwapTokenIndex_notExist.selector);
    this.getSwapTokenIndex(_canonicalId, address(1));
  }

  function test_StableSwapFacet__getSwapTokenBalance_shouldWork() public {
    assertEq(this.getSwapTokenBalance(_canonicalId, 0), this.getSwapStorage(_canonicalId).balances[0]);

    vm.expectRevert(StableSwapFacet.StableSwapFacet__getSwapTokenBalance_indexOutOfRange.selector);
    this.getSwapTokenBalance(_canonicalId, 2);
  }

  function test_StableSwapFacet__getSwapVirtualPrice_shouldWork() public {
    assertEq(this.getSwapVirtualPrice(_canonicalId), SwapUtils.getVirtualPrice(s.swapStorages[_canonicalId]));
  }

  function test_StableSwapFacet__calculateSwap_shouldWork() public {
    uint256 dx = 100;

    vm.expectRevert("Token index out of range");
    this.calculateSwap(bytes32(0), 0, 1, dx);

    assertEq(
      this.calculateSwap(_canonicalId, 0, 1, dx),
      SwapUtils.calculateSwap(s.swapStorages[_canonicalId], 0, 1, dx)
    );
  }

  function test_StableSwapFacet__calculateSwapTokenAmount_shouldWork() public {
    uint256[] memory _amounts = new uint256[](2);
    _amounts[0] = 100;
    _amounts[1] = 100;

    vm.expectRevert();
    this.calculateSwapTokenAmount(bytes32(0), _amounts, true);

    _amounts[0] = this.getSwapTokenBalance(_canonicalId, 0) + 1;
    vm.expectRevert("Cannot withdraw more than available");
    this.calculateSwapTokenAmount(_canonicalId, _amounts, false);
  }

  function test_StableSwapFacet__calculateRemoveSwapLiquidity_shouldWork() public {
    assertEq(
      this.calculateRemoveSwapLiquidity(_canonicalId, 100)[0],
      SwapUtils.calculateRemoveLiquidity(s.swapStorages[_canonicalId], 100)[0]
    );
    assertEq(
      this.calculateRemoveSwapLiquidity(_canonicalId, 100)[1],
      SwapUtils.calculateRemoveLiquidity(s.swapStorages[_canonicalId], 100)[1]
    );
  }

  function test_StableSwapFacet__calculateRemoveSwapLiquidityOneToken_shouldWork() public {
    assertEq(
      this.calculateRemoveSwapLiquidityOneToken(_canonicalId, 100, 0),
      SwapUtils.calculateWithdrawOneToken(s.swapStorages[_canonicalId], 100, 0)
    );
  }

  function test_StableSwapFacet__getSwapAdminBalance_shouldWork() public {
    assertEq(this.getSwapAdminBalance(_canonicalId, 0), SwapUtils.getAdminBalance(s.swapStorages[_canonicalId], 0));
  }

  // ======= State-Modifying Functions ========
  // function test_StableSwapFacet__swap
  function test_StableSwapFacet__swap_failIfPaused() public {
    s._paused = true;

    vm.prank(_user1);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.swap(_canonicalId, 0, 1, 1 ether, 0, blockTimestamp + 10);
  }

  function test_StableSwapFacet__swap_failIfMoreThanBalance() public {
    uint256 fromTokenBalance = this.getSwapToken(_canonicalId, 0).balanceOf(_user1);
    vm.startPrank(_user1);
    vm.expectRevert("Cannot swap more than you own");
    this.swap(_canonicalId, 0, 1, fromTokenBalance + 10, 0, blockTimestamp + 10);
    vm.stopPrank();
  }

  function test_StableSwapFacet__swap_shouldWork() public {
    uint256 amount = 1e17;
    uint256 calculatedSwapReturn = this.calculateSwap(_canonicalId, 0, 1, amount);
    assertEq(calculatedSwapReturn, 99702611562565289);

    uint256 tokenFromBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 tokenToBalanceBefore = IERC20(_adopted).balanceOf(_user1);

    vm.startPrank(_user1);
    this.swap(_canonicalId, 0, 1, amount, calculatedSwapReturn, blockTimestamp + 10);
    vm.stopPrank();

    assertEq(tokenFromBalanceBefore - amount, IERC20(_local).balanceOf(_user1));
    assertEq(tokenToBalanceBefore + calculatedSwapReturn, IERC20(_adopted).balanceOf(_user1));
  }

  function test_StableSwapFacet__swap_failIfNotMinDy() public {
    uint256 amount = 1e17;
    uint256 calculatedSwapReturn = this.calculateSwap(_canonicalId, 0, 1, amount);
    assertEq(calculatedSwapReturn, 99702611562565289);

    vm.startPrank(_user2);
    this.swap(_canonicalId, 0, 1, amount, 0, blockTimestamp + 10);
    vm.stopPrank();

    vm.startPrank(_user1);
    vm.expectRevert("Swap didn't result in min tokens");
    this.swap(_canonicalId, 0, 1, amount, calculatedSwapReturn, blockTimestamp + 10);
    vm.stopPrank();
  }

  // function test_StableSwapFacet__swapExact
  function test_StableSwapFacet__swapExact_failIfPaused() public {
    s._paused = true;

    vm.prank(_user1);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.swapExact(_canonicalId, 1 ether, _local, _adopted, 0, blockTimestamp + 10);
  }

  function test_StableSwapFacet__swapExact_failIfMoreThanBalance() public {
    uint256 fromTokenBalance = this.getSwapToken(_canonicalId, 0).balanceOf(_user1);
    vm.startPrank(_user1);
    vm.expectRevert("Cannot swap more than you own");
    this.swapExact(_canonicalId, fromTokenBalance + 10, _local, _adopted, 0, blockTimestamp + 10);
    vm.stopPrank();
  }

  function test_StableSwapFacet__swapExact_shouldWork() public {
    uint256 amount = 1e17;
    uint256 calculatedSwapReturn = this.calculateSwap(_canonicalId, 0, 1, amount);
    assertEq(calculatedSwapReturn, 99702611562565289);

    uint256 tokenFromBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 tokenToBalanceBefore = IERC20(_adopted).balanceOf(_user1);

    vm.startPrank(_user1);
    this.swapExact(_canonicalId, amount, _local, _adopted, calculatedSwapReturn, blockTimestamp + 10);
    vm.stopPrank();

    assertEq(tokenFromBalanceBefore - amount, IERC20(_local).balanceOf(_user1));
    assertEq(tokenToBalanceBefore + calculatedSwapReturn, IERC20(_adopted).balanceOf(_user1));
  }

  function test_StableSwapFacet__swapExact_failIfNotMinDy() public {
    uint256 amount = 1e17;
    uint256 calculatedSwapReturn = this.calculateSwap(_canonicalId, 0, 1, amount);
    assertEq(calculatedSwapReturn, 99702611562565289);

    vm.startPrank(_user2);
    this.swapExact(_canonicalId, amount, _local, _adopted, 0, blockTimestamp + 10);
    vm.stopPrank();

    vm.startPrank(_user1);
    vm.expectRevert("Swap didn't result in min tokens");
    this.swapExact(_canonicalId, amount, _local, _adopted, calculatedSwapReturn, blockTimestamp + 10);
    vm.stopPrank();
  }

  // function test_StableSwapFacet__addSwapLiquidity
  function test_StableSwapFacet__addSwapLiquidity_failIfPaused() public {
    s._paused = true;

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 1 ether;
    amounts[1] = 3 ether;

    vm.prank(_user1);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);
  }

  function test_StableSwapFacet__addSwapLiquidity_failIfNotMatchPooledToken() public {
    uint256[] memory amounts = new uint256[](1);
    amounts[0] = 1 ether;

    vm.prank(_user1);
    vm.expectRevert("Amounts must match pooled tokens");
    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);
  }

  function test_StableSwapFacet__addSwapLiquidity_shouldWork() public {
    vm.startPrank(_user1);
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 1 ether;
    amounts[1] = 3 ether;

    uint256 calculatedPoolTokenAmount = this.calculateSwapTokenAmount(_canonicalId, amounts, true);
    uint256 calculatedPoolTokenAmountWithSlippage = (calculatedPoolTokenAmount * 999) / 1000;

    this.addSwapLiquidity(_canonicalId, amounts, calculatedPoolTokenAmountWithSlippage, blockTimestamp + 1);

    uint256 actualPoolTokenAmount = IERC20(this.getSwapLPToken(_canonicalId)).balanceOf(_user1);

    // The actual pool token amount is less than 4e18 due to the imbalance of the underlying tokens
    assertEq(actualPoolTokenAmount, 3991672211258372957);
    vm.stopPrank();
  }

  // function test_StableSwapFacet__removeSwapLiquidity
  function test_StableSwapFacet__removeSwapLiquidity_failIfPaused() public {
    s._paused = true;

    uint256[] memory minAmounts = new uint256[](2);
    minAmounts[0] = 0 ether;
    minAmounts[1] = 0 ether;

    vm.prank(_user1);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.removeSwapLiquidity(_canonicalId, 2 ether, minAmounts, blockTimestamp + 1);
  }

  function test_StableSwapFacet__removeSwapLiquidity_failIfNotMatchPooledToken() public {
    uint256[] memory minAmounts = new uint256[](1);
    minAmounts[0] = 0;

    vm.prank(_owner);
    vm.expectRevert("minAmounts must match poolTokens");
    this.removeSwapLiquidity(_canonicalId, 1 ether, minAmounts, blockTimestamp + 1);
  }

  function test_StableSwapFacet__removeSwapLiquidity_shouldWork() public {
    vm.startPrank(_user1);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 firstTokenBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 secondTokenBalanceBefore = IERC20(_adopted).balanceOf(_user1);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    uint256[] memory expectedAmounts = new uint256[](2);
    expectedAmounts = this.calculateRemoveSwapLiquidity(_canonicalId, poolTokenBalanceBefore);

    assertEq(expectedAmounts[0], 1498601924450190405);
    assertEq(expectedAmounts[1], 504529314564897436);

    IERC20(swapToken).approve(address(this), poolTokenBalanceBefore);

    this.removeSwapLiquidity(_canonicalId, poolTokenBalanceBefore, expectedAmounts, blockTimestamp + 1);

    assertEq(firstTokenBalanceBefore + expectedAmounts[0], IERC20(_local).balanceOf(_user1));
    assertEq(secondTokenBalanceBefore + expectedAmounts[1], IERC20(_adopted).balanceOf(_user1));
    vm.stopPrank();
  }

  // function test_StableSwapFacet__removeSwapLiquidityOneToken
  function test_StableSwapFacet__removeSwapLiquidityOneToken_failIfPaused() public {
    s._paused = true;

    vm.prank(_user1);
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.removeSwapLiquidityOneToken(_canonicalId, 2 ether, 0, 0, blockTimestamp + 1);
  }

  function test_StableSwapFacet__removeSwapLiquidityOneToken_failIfMoreThanLpBalance() public {
    vm.startPrank(_user1);
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    IERC20(swapToken).approve(address(this), poolTokenBalanceBefore + 10);

    vm.expectRevert(">LP.balanceOf");
    this.removeSwapLiquidityOneToken(_canonicalId, poolTokenBalanceBefore + 10, 0, 0, blockTimestamp + 1);

    vm.stopPrank();
  }

  function test_StableSwapFacet__removeSwapLiquidityOneToken_shouldWork() public {
    vm.startPrank(_user1);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 firstTokenBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 secondTokenBalanceBefore = IERC20(_adopted).balanceOf(_user1);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    // User 1 calculates the amount of underlying token to receive.
    uint256 calculatedFirstTokenAmount = this.calculateRemoveSwapLiquidityOneToken(
      _canonicalId,
      poolTokenBalanceBefore,
      0
    );
    assertEq(calculatedFirstTokenAmount, 2008990034631583696);

    IERC20(swapToken).approve(address(this), poolTokenBalanceBefore);

    this.removeSwapLiquidityOneToken(
      _canonicalId,
      poolTokenBalanceBefore,
      0,
      calculatedFirstTokenAmount,
      blockTimestamp + 1
    );

    assertEq(firstTokenBalanceBefore + calculatedFirstTokenAmount, IERC20(_local).balanceOf(_user1));
    assertEq(secondTokenBalanceBefore, IERC20(_adopted).balanceOf(_user1));
    vm.stopPrank();
  }

  function test_StableSwapFacet__removeSwapLiquidityOneToken_failIfFrontRun() public {
    vm.startPrank(_user1);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 firstTokenBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 secondTokenBalanceBefore = IERC20(_adopted).balanceOf(_user1);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    // User 1 calculates the amount of underlying token to receive.
    uint256 calculatedFirstTokenAmount = this.calculateRemoveSwapLiquidityOneToken(
      _canonicalId,
      poolTokenBalanceBefore,
      0
    );
    assertEq(calculatedFirstTokenAmount, 2008990034631583696);
    vm.stopPrank();

    vm.startPrank(_user2);
    amounts[0] = 0.01 ether;
    amounts[1] = 10 ether;
    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 10);
    vm.stopPrank();

    vm.startPrank(_user1);
    IERC20(swapToken).approve(address(this), poolTokenBalanceBefore);

    vm.expectRevert("dy < minAmount");
    this.removeSwapLiquidityOneToken(
      _canonicalId,
      poolTokenBalanceBefore,
      0,
      calculatedFirstTokenAmount,
      blockTimestamp + 1
    );

    vm.stopPrank();
  }

  // function test_StableSwapFacet__removeSwapLiquidityImbalance
  function test_StableSwapFacet__removeSwapLiquidityImbalance_failIfPaused() public {
    vm.startPrank(_user1);
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    IERC20(swapToken).approve(address(this), poolTokenBalanceBefore);

    uint256[] memory removeAmounts = new uint256[](2);
    removeAmounts[0] = 1 ether;
    removeAmounts[1] = 0.01 ether;

    s._paused = true;

    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__whenNotPaused_paused.selector);
    this.removeSwapLiquidityImbalance(_canonicalId, removeAmounts, 100 ether, blockTimestamp + 1);

    vm.stopPrank();
  }

  function test_StableSwapFacet__removeSwapLiquidityImbalance_failIfNotMatchPoolTokens() public {
    vm.startPrank(_user1);

    uint256[] memory removeAmounts = new uint256[](1);
    removeAmounts[0] = 1 ether;

    vm.expectRevert("Amounts should match pool tokens");
    this.removeSwapLiquidityImbalance(_canonicalId, removeAmounts, 100 ether, blockTimestamp + 1);

    vm.stopPrank();
  }

  function test_StableSwapFacet__removeSwapLiquidityImbalance_failIfMoreThanLpBalance() public {
    vm.startPrank(_user1);
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    uint256[] memory removeAmounts = new uint256[](2);
    removeAmounts[0] = 1 ether;
    removeAmounts[1] = 0.01 ether;

    IERC20(swapToken).approve(address(this), poolTokenBalanceBefore);

    vm.expectRevert(">LP.balanceOf");
    this.removeSwapLiquidityImbalance(_canonicalId, removeAmounts, poolTokenBalanceBefore + 1, blockTimestamp + 1);

    vm.stopPrank();
  }

  function test_StableSwapFacet__removeSwapLiquidityImbalance_shouldWork() public {
    vm.startPrank(_user1);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    uint256[] memory removeAmounts = new uint256[](2);
    removeAmounts[0] = 1 ether;
    removeAmounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 firstTokenBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 secondTokenBalanceBefore = IERC20(_adopted).balanceOf(_user1);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    // User 1 calculates amount of pool token to be burned
    uint256 maxPoolTokenAmountToBeBurned = this.calculateSwapTokenAmount(_canonicalId, removeAmounts, false);

    // ±0.1% range of pool token to be burned
    uint256 maxPoolTokenAmountToBeBurnedNegativeSlippage = (maxPoolTokenAmountToBeBurned * 1001) / 1000;
    uint256 maxPoolTokenAmountToBeBurnedPositiveSlippage = (maxPoolTokenAmountToBeBurned * 999) / 1000;

    IERC20(swapToken).approve(address(this), maxPoolTokenAmountToBeBurnedNegativeSlippage);

    this.removeSwapLiquidityImbalance(
      _canonicalId,
      removeAmounts,
      maxPoolTokenAmountToBeBurnedNegativeSlippage,
      blockTimestamp + 1
    );

    assertEq(firstTokenBalanceBefore + removeAmounts[0], IERC20(_local).balanceOf(_user1));
    assertEq(secondTokenBalanceBefore + removeAmounts[1], IERC20(_adopted).balanceOf(_user1));

    uint256 actualPoolTokenBurned = poolTokenBalanceBefore - IERC20(swapToken).balanceOf(_user1);

    assertEq(actualPoolTokenBurned, 1000934178112841889);
    assertTrue(actualPoolTokenBurned >= maxPoolTokenAmountToBeBurnedPositiveSlippage);
    assertTrue(actualPoolTokenBurned <= maxPoolTokenAmountToBeBurnedNegativeSlippage);

    vm.stopPrank();
  }

  function test_StableSwapFacet__removeSwapLiquidityImbalance_failIfFrontRun() public {
    vm.startPrank(_user1);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 2 ether;
    amounts[1] = 0.01 ether;

    uint256[] memory removeAmounts = new uint256[](2);
    removeAmounts[0] = 1 ether;
    removeAmounts[1] = 0.01 ether;

    this.addSwapLiquidity(_canonicalId, amounts, 0, blockTimestamp + 1);

    address swapToken = this.getSwapLPToken(_canonicalId);
    uint256 firstTokenBalanceBefore = IERC20(_local).balanceOf(_user1);
    uint256 secondTokenBalanceBefore = IERC20(_adopted).balanceOf(_user1);
    uint256 poolTokenBalanceBefore = IERC20(swapToken).balanceOf(_user1);

    assertEq(poolTokenBalanceBefore, 1996275270169644725);

    // User 1 calculates amount of pool token to be burned
    uint256 maxPoolTokenAmountToBeBurned = this.calculateSwapTokenAmount(_canonicalId, removeAmounts, false);

    // ±0.1% range of pool token to be burned
    uint256 maxPoolTokenAmountToBeBurnedNegativeSlippage = (maxPoolTokenAmountToBeBurned * 1001) / 1000;
    uint256 maxPoolTokenAmountToBeBurnedPositiveSlippage = (maxPoolTokenAmountToBeBurned * 999) / 1000;

    vm.stopPrank();
    utils_addLiquidity(0.01 ether, 10 ether);

    vm.startPrank(_user1);

    IERC20(swapToken).approve(address(this), maxPoolTokenAmountToBeBurnedNegativeSlippage);

    vm.expectRevert("tokenAmount > maxBurnAmount");
    this.removeSwapLiquidityImbalance(
      _canonicalId,
      removeAmounts,
      maxPoolTokenAmountToBeBurnedNegativeSlippage,
      blockTimestamp + 1
    );

    vm.stopPrank();
  }

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
  function test_StableSwapFacet__withdrawSwapAdminFess_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.withdrawSwapAdminFees(_canonicalId);
  }

  function test_StableSwapFacet__withdrawSwapAdminFess_successIfNoFees() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalId, 1e8);

    uint256 beforeBalance0 = IERC20(_local).balanceOf(_owner);
    uint256 beforeBalance1 = IERC20(_adopted).balanceOf(_owner);

    this.withdrawSwapAdminFees(_canonicalId);

    assertEq(IERC20(_local).balanceOf(_owner), beforeBalance0);
    assertEq(IERC20(_adopted).balanceOf(_owner), beforeBalance1);

    vm.stopPrank();
  }

  function test_StableSwapFacet__withdrawSwapAdminFess_shouldWorkWithExpectedAmount() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalId, 1e8);
    utils_swapExact(1e17, _local, _adopted, 0);
    utils_swapExact(1e17, _adopted, _local, 0);

    assertEq(this.getSwapAdminBalance(_canonicalId, 0), 1001973776101);
    assertEq(this.getSwapAdminBalance(_canonicalId, 1), 998024139765);

    uint256 beforeBalance0 = IERC20(_local).balanceOf(_owner);
    uint256 beforeBalance1 = IERC20(_adopted).balanceOf(_owner);

    this.withdrawSwapAdminFees(_canonicalId);

    assertEq(IERC20(_local).balanceOf(_owner), beforeBalance0 + 1001973776101);
    assertEq(IERC20(_adopted).balanceOf(_owner), beforeBalance1 + 998024139765);
    vm.stopPrank();
  }

  // function test_StableSwapFacet__setSwapAdminFee
  function test_StableSwapFacet__setSwapAdminFee_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.setSwapAdminFee(_canonicalId, 1e8);
  }

  function test_StableSwapFacet__setSwapAdminFee_failIfHigherThanLimit() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalId, SwapUtils.MAX_ADMIN_FEE);
    assertEq(this.getSwapStorage(_canonicalId).adminFee, SwapUtils.MAX_ADMIN_FEE);

    vm.expectRevert("Fee is too high");
    this.setSwapAdminFee(_canonicalId, SwapUtils.MAX_ADMIN_FEE + 1);
    vm.stopPrank();
  }

  function test_StableSwapFacet__setSwapAdminFee_shouldWork() public {
    vm.startPrank(_owner);
    uint256 adminFee = SwapUtils.MAX_ADMIN_FEE;
    this.setSwapAdminFee(_canonicalId, adminFee);
    assertEq(this.getSwapStorage(_canonicalId).adminFee, adminFee);
    vm.stopPrank();
  }

  // function test_StableSwapFacet__setSwapFee
  function test_StableSwapFacet__setSwapFee_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.setSwapFee(_canonicalId, 1e8);
  }

  function test_StableSwapFacet__setSwapFee_failIfHigherThanLimit() public {
    vm.startPrank(_owner);
    this.setSwapFee(_canonicalId, SwapUtils.MAX_SWAP_FEE);
    assertEq(this.getSwapStorage(_canonicalId).swapFee, SwapUtils.MAX_SWAP_FEE);

    vm.expectRevert("Fee is too high");
    this.setSwapFee(_canonicalId, SwapUtils.MAX_SWAP_FEE + 1);
    vm.stopPrank();
  }

  function test_StableSwapFacet__setSwapFee_shouldWork() public {
    vm.startPrank(_owner);
    uint256 swapFee = SwapUtils.MAX_SWAP_FEE;
    this.setSwapFee(_canonicalId, swapFee);
    assertEq(this.getSwapStorage(_canonicalId).swapFee, swapFee);
    vm.stopPrank();
  }

  // function test_StableSwapFacet__rampA
  function test_StableSwapFacet__rampA_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.rampA(_canonicalId, 100, blockTimestamp + 14 days + 1);
  }

  function test_StableSwapFacet__rampA_shouldWorkWithUpwards() public {
    // Create imbalanced pool to measure virtual price change
    // We expect virtual price to increase as A decreases
    utils_addLiquidity(1 ether, 0);

    vm.startPrank(_owner);

    uint256 endTimestamp = blockTimestamp + 14 days + 1;
    this.rampA(_canonicalId, 100, endTimestamp);

    // +0 seconds since ramp A
    assertEq(this.getSwapA(_canonicalId), INITIAL_A_VALUE);
    assertEq(this.getSwapAPrecise(_canonicalId), INITIAL_A_VALUE * AmplificationUtils.A_PRECISION);
    assertEq(this.getSwapVirtualPrice(_canonicalId), 1000167146429977312);

    // set timestamp to +100000 seconds
    vm.warp(blockTimestamp + 100000);
    assertEq(this.getSwapA(_canonicalId), 54);
    assertEq(this.getSwapAPrecise(_canonicalId), 5413);
    assertEq(this.getSwapVirtualPrice(_canonicalId), 1000258443200231295);

    // set timestamp to the end of ramp period
    vm.warp(endTimestamp);
    assertEq(this.getSwapA(_canonicalId), 100);
    assertEq(this.getSwapAPrecise(_canonicalId), 10000);
    assertEq(this.getSwapVirtualPrice(_canonicalId), 1000771363829405068);

    vm.stopPrank();
  }

  function test_StableSwapFacet__rampA_shouldWorkWithDownwards() public {
    // Create imbalanced pool to measure virtual price change
    // We expect virtual price to increase as A decreases
    utils_addLiquidity(1 ether, 0);

    vm.startPrank(_owner);

    uint256 endTimestamp = blockTimestamp + 14 days + 1;
    this.rampA(_canonicalId, 25, endTimestamp);

    // +0 seconds since ramp A
    assertEq(this.getSwapA(_canonicalId), INITIAL_A_VALUE);
    assertEq(this.getSwapAPrecise(_canonicalId), INITIAL_A_VALUE * AmplificationUtils.A_PRECISION);
    assertEq(this.getSwapVirtualPrice(_canonicalId), 1000167146429977312);

    // set timestamp to +100000 seconds
    vm.warp(blockTimestamp + 100000);
    assertEq(this.getSwapA(_canonicalId), 47);
    assertEq(this.getSwapAPrecise(_canonicalId), 4794);
    assertEq(this.getSwapVirtualPrice(_canonicalId), 1000115870150391894);

    // set timestamp to the end of ramp period
    vm.warp(endTimestamp);
    assertEq(this.getSwapA(_canonicalId), 25);
    assertEq(this.getSwapAPrecise(_canonicalId), 2500);
    assertEq(this.getSwapVirtualPrice(_canonicalId), 998999574522335473);

    vm.stopPrank();
  }

  // function test_StableSwapFacet__stopRampA
  function test_StableSwapFacet__stopRampA_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector);

    this.stopRampA(_canonicalId);
  }

  function test_StableSwapFacet__stopRampA_shouldWork() public {
    vm.startPrank(_owner);
    uint256 endTimestamp = blockTimestamp + 14 days + 1;
    this.rampA(_canonicalId, 100, endTimestamp);

    uint256 currentTimestmp = blockTimestamp + 100000;
    vm.warp(currentTimestmp);
    this.stopRampA(_canonicalId);

    assertEq(this.getSwapStorage(_canonicalId).initialA, 5413);
    assertEq(this.getSwapStorage(_canonicalId).futureA, 5413);
    assertEq(this.getSwapStorage(_canonicalId).initialATime, currentTimestmp);
    assertEq(this.getSwapStorage(_canonicalId).futureATime, currentTimestmp);

    vm.stopPrank();
  }
}
