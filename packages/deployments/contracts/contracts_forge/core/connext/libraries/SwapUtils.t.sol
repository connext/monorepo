// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/ForgeHelper.sol";

import {SwapUtils, LPToken, AmplificationUtils, MathUtils, SafeERC20, SafeMath, IERC20} from "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import "../../../../contracts/core/connext/helpers/StableSwap.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

contract SwapUtilsTest is ForgeHelper {
  // ============ Libraries ============
  using SwapUtils for SwapUtils.Swap;
  using AmplificationUtils for SwapUtils.Swap;
  using SafeERC20 for IERC20;
  using SafeMath for uint256;
  using MathUtils for uint256;

  // ============ Events ============

  event TokenSwap(address indexed buyer, uint256 tokensSold, uint256 tokensBought, uint128 soldId, uint128 boughtId);
  event AddLiquidity(
    address indexed provider,
    uint256[] tokenAmounts,
    uint256[] fees,
    uint256 invariant,
    uint256 lpTokenSupply
  );
  event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256 lpTokenSupply);
  event RemoveLiquidityOne(
    address indexed provider,
    uint256 lpTokenAmount,
    uint256 lpTokenSupply,
    uint256 boughtId,
    uint256 tokensBought
  );
  event RemoveLiquidityImbalance(
    address indexed provider,
    uint256[] tokenAmounts,
    uint256[] fees,
    uint256 invariant,
    uint256 lpTokenSupply
  );
  event NewAdminFee(uint256 newAdminFee);
  event NewSwapFee(uint256 newSwapFee);

  // ============ Storage ============
  // Test Values
  uint256 INITIAL_A_VALUE = 50;
  uint256 SWAP_FEE = 1e7;
  string LP_TOKEN_NAME = "Test LP Token Name";
  string LP_TOKEN_SYMBOL = "TESTLP";
  uint256 blockTimestamp = 2 days;

  address _owner = address(123);
  address _user1 = address(1);
  address _user2 = address(2);

  StableSwap stableSwap;

  LPToken lpToken;
  TestERC20 token0;
  TestERC20 token1;

  SwapUtils.Swap swapStorage;

  // ============ Setup ============

  function setUp() public {
    utils_initializeSwap();

    utils_addLiquidity(1 ether, 1 ether);
  }

  // ============ Utils ============
  function utils_initializeSwap() public {
    token0 = new TestERC20();
    token1 = new TestERC20();

    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(token0);
    _pooledTokens[1] = IERC20(token1);

    // Mint Token0, Token1 to User1, User2
    TestERC20(token0).mint(_user1, 100 ether);
    TestERC20(token1).mint(_user1, 100 ether);

    TestERC20(token0).mint(_user2, 100 ether);
    TestERC20(token1).mint(_user2, 100 ether);

    // Approve Token0, Token1 from User1, User2
    vm.startPrank(_user1);
    TestERC20(token0).approve(address(this), 100 ether);
    TestERC20(token1).approve(address(this), 100 ether);
    vm.stopPrank();

    vm.startPrank(_user2);
    TestERC20(token0).approve(address(this), 100 ether);
    TestERC20(token1).approve(address(this), 100 ether);
    vm.stopPrank();

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    uint256[] memory tokenPrecisionMultipliers = new uint256[](2);
    tokenPrecisionMultipliers[0] = uint256(1);
    tokenPrecisionMultipliers[1] = uint256(1);

    uint256 _a = INITIAL_A_VALUE;
    uint256 _adminFee = 0;
    uint256 _fee = SWAP_FEE;

    lpToken = new LPToken();
    lpToken.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);

    vm.startPrank(_owner);

    stableSwap = new StableSwap();
    stableSwap.initialize(
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      _a,
      _fee,
      _adminFee,
      address(lpToken)
    );
    vm.stopPrank();

    assertEq(stableSwap.getVirtualPrice(), 0);

    vm.warp(blockTimestamp);
  }

  function utils_addLiquidity(uint256 amount1, uint256 amount2) public {
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = amount1;
    amounts[1] = amount2;

    vm.startPrank(_user1);
    IERC20(swapStorage.pooledTokens[0]).approve(address(stableSwap), 100 ether);
    IERC20(swapStorage.pooledTokens[1]).approve(address(stableSwap), 100 ether);

    stableSwap.addLiquidity(amounts, 0, blockTimestamp + 1);
    vm.stopPrank();
  }

  // ============ calculateWithdrawOneToken ============

  // Should work
  function test_SwapUtils__calculateWithdrawOneToken_works() public {
    uint256 lpTokenSupply = stablelpToken.totalSupply();
    uint256 amount = 0.01 ether;
    uint256 availableTokenAmount = SwapUtils.calculateWithdrawOneToken(swap, amount, 0);
    assertEq(availableTokenAmount, uint256(19));
  }

  // // ============ calculateWithdrawOneTokenDY ============

  // // Should work
  // function test_SwapUtils__calculateWithdrawOneTokenDY_works() public {
  //   uint256 dy;
  //   uint256 newY;
  //   uint256 currentY;
  //   uint256 lpTokenSupply = lpToken.totalSupply();
  //   uint256 amount = 0.01 ether;

  //   (dy, newY, currentY) = SwapUtils.calculateWithdrawOneTokenDY(swap, 0, amount, lpTokenSupply);
  //   assertEq(dy, uint256(19));
  //   assertEq(newY, uint256(980));
  //   assertEq(currentY, uint256(lpTokenSupply));
  // }

  // // ============ getYD ============

  // // Should work
  // function test_SwapUtils__getYD_works() public {
  //   uint256 lpTokenSupply = lpToken.totalSupply();
  //   uint256 amount = 0.01 ether;

  //   uint256[] memory xp = SwapUtils._xp(swap);

  //   uint256 d0 = SwapUtils.getD(xp, swapStorage.getAPrecise());
  //   uint256 d1 = d0.sub(amount.mul(d0).div(lpTokenSupply));

  //   uint256 newY = SwapUtils.getYD(swapStorage.getAPrecise(), 0, xp, d1);

  //   assertEq(newY, uint256(980));
  // }

  // // ============ getD ============

  // // Should work
  // function test_SwapUtils__getD_works() public {
  //   uint256[] memory xp = SwapUtils._xp(swap);
  //   uint256 d0 = SwapUtils.getD(xp, swapStorage.getAPrecise());

  //   assertEq(d0, uint256(2000));
  // }

  // // ============ _xp ============

  // // Should work
  // function test_SwapUtils___xp_works() public {
  //   uint256[] memory xp = SwapUtils._xp(swap);

  //   uint256 numTokens = swapStorage.balances.length;
  //   for (uint256 i = 0; i < numTokens; i++) {
  //     assertEq(xp[0], swapStorage.balances[0].mul(swapStorage.tokenPrecisionMultipliers[0]));
  //   }
  // }

  // // ============ getVirtualPrice ============

  // // Should work
  // function test_SwapUtils__getVirtualPrice_worksWithSupplyZero() public {
  //   uint256 virtualPrice = SwapUtils.getVirtualPrice(swap);

  //   assertEq(virtualPrice, uint256(0));
  // }

  // // Should work
  // function test_SwapUtils__getVirtualPrice_worksWithSupply() public {
  //   uint256 lpTokenSupply = lpToken.totalSupply();
  //   uint256 virtualPrice = SwapUtils.getVirtualPrice(swap);

  //   uint256[] memory xp = SwapUtils._xp(swap);
  //   uint256 d = SwapUtils.getD(xp, swapStorage.getAPrecise());

  //   uint256 verify = d.mul(10**uint256(SwapUtils.POOL_PRECISION_DECIMALS)).div(lpTokenSupply);

  //   assertEq(virtualPrice, uint256(verify));
  // }

  // // ============ getY ============

  // // Should work
  // function test_SwapUtils__getY_works() public {
  //   uint256[] memory xp = SwapUtils._xp(swap);
  //   uint256 dx = 0.1 ether;
  //   uint256 x = dx.mul(swapStorage.tokenPrecisionMultipliers[0]).add(xp[0]);
  //   uint256 y = SwapUtils.getY(swapStorage.getAPrecise(), 0, 1, x, xp);

  //   console.logUint(y);
  //   assertEq(y, uint256(980));
  // }

  // // ============ calculateSwap ============

  // // Should work
  // function test_SwapUtils__calculateSwap_works() public {
  //   uint256 amount = 0.01 ether;
  //   uint256 dy = SwapUtils.calculateSwap(swap, 0, 1, amount);

  //   assertEq(dy, uint256(9));
  // }

  // // ============ _calculateSwap ============

  // // Should work
  // function test_SwapUtils___calculateSwap_works() public {
  //   uint256 dy;
  //   uint256 dyFee;
  //   uint256 amount = 0.01 ether;

  //   (dy, dyFee) = SwapUtils._calculateSwap(swap, 0, 1, amount, swapStorage.balances);

  //   assertEq(dy, uint256(9));
  //   assertEq(dyFee, uint256(0));
  // }

  // // ============ calculateRemoveLiquidity ============

  // // Should work
  // function test_SwapUtils__calculateRemoveLiquidity_works() public {
  //   uint256 lpTokenSupply = lpToken.totalSupply();
  //   uint256 amount = 0.01 ether;
  //   uint256[] memory res = SwapUtils.calculateRemoveLiquidity(swap, amount);

  //   assertEq(res[0], amount);
  //   assertEq(res[1], amount);
  // }

  // // ============ _calculateRemoveLiquidity ============

  // // Should work
  // function test_SwapUtils___calculateRemoveLiquidity_works() public {
  //   uint256 lpTokenSupply = lpToken.totalSupply();
  //   uint256 amount = 0.01 ether;
  //   uint256[] memory res = SwapUtils._calculateRemoveLiquidity(swapStorage.balances, amount, lpTokenSupply);

  //   assertEq(res[0], amount);
  //   assertEq(res[1], amount);
  // }

  // // ============ calculateTokenAmount ============

  // // Should work
  // function test_SwapUtils__calculateTokenAmount_worksIfDeposit() public {
  //   // uint256 res = SwapUtils.calculateTokenAmount(swap, abi.encode(balances), true);
  //   // console.logUint(res);
  // }

  // // Should work
  // function test_SwapUtils__calculateTokenAmount_worksIfWithdraw() public {
  //   // uint256 res = SwapUtils.calculateTokenAmount(swap, abi.encode(balances), false);
  //   // console.logUint(res);
  // }
}
