// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/ForgeHelper.sol";

import {SwapUtils, LPToken, AmplificationUtils, MathUtils, SafeERC20, SafeMath, IERC20} from "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

contract SwapUtilsTest is ForgeHelper {
  // ============ Libraries ============

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

  uint256 initialA = 1;
  uint256 futureA = 100;

  uint256 initialATime = 1;
  uint256 futureATime = 100;

  uint256 swapFee = 1;
  uint256 adminFee = 1;

  LPToken lpToken;
  TestERC20 token;
  TestERC20 token2;
  IERC20[] pooledTokens;
  uint256[] tokenPrecisionMultipliers;
  uint256[] adminsFees;
  uint256[] balances;

  SwapUtils.Swap swap;

  uint256 preciseA;

  address lpTokenReceiver = address(1);
  uint256 lpTokenSupply = uint256(1000);

  uint256 tokenBalance = uint256(1000);
  uint256 tokenBalance2 = uint256(1000);

  uint256 amount = uint256(10);
  uint256 dx = uint256(10);
  uint8 tokenIndexFrom = uint8(0);
  uint8 tokenIndexTo = uint8(1);

  // ============ Setup ============

  function setUp() public {
    token = new TestERC20();
    token2 = new TestERC20();

    lpToken = new LPToken();

    pooledTokens = new IERC20[](2);
    pooledTokens[0] = token;
    pooledTokens[1] = token2;

    tokenPrecisionMultipliers = new uint256[](2);
    tokenPrecisionMultipliers[0] = uint256(1);
    tokenPrecisionMultipliers[1] = uint256(1);

    adminsFees = new uint256[](2);
    adminsFees[0] = uint256(1);
    adminsFees[1] = uint256(1);

    balances = new uint256[](2);
    balances[0] = uint256(tokenBalance);
    balances[1] = uint256(tokenBalance2);

    swap = SwapUtils.Swap(
      initialA,
      futureA,
      initialATime,
      futureATime,
      swapFee,
      adminFee,
      lpToken,
      pooledTokens,
      tokenPrecisionMultipliers,
      balances,
      adminsFees
    );

    preciseA = AmplificationUtils._getAPrecise(swap);
  }

  // ============ Utils ============

  // ============ calculateWithdrawOneToken ============

  // Should work
  function test_SwapUtils__calculateWithdrawOneToken_works() public {
    vm.mockCall(address(lpToken), abi.encodeWithSelector(IERC20.totalSupply.selector), abi.encode(lpTokenSupply));
    uint256 availableTokenAmount = SwapUtils.calculateWithdrawOneToken(swap, amount, tokenIndexFrom);
    assertEq(availableTokenAmount, uint256(19));
  }

  // ============ calculateWithdrawOneTokenDY ============

  // Should work
  function test_SwapUtils__calculateWithdrawOneTokenDY_works() public {
    uint256 dy;
    uint256 newY;
    uint256 currentY;
    (dy, newY, currentY) = SwapUtils.calculateWithdrawOneTokenDY(swap, tokenIndexFrom, amount, lpTokenSupply);
    assertEq(dy, uint256(19));
    assertEq(newY, uint256(980));
    assertEq(currentY, uint256(lpTokenSupply));
  }

  // ============ getYD ============

  // Should work
  function test_SwapUtils__getYD_works() public {
    uint256[] memory xp = SwapUtils._xp(swap);

    uint256 d0 = SwapUtils.getD(xp, preciseA);
    uint256 d1 = d0.sub(amount.mul(d0).div(lpTokenSupply));

    uint256 newY = SwapUtils.getYD(preciseA, tokenIndexFrom, xp, d1);

    assertEq(newY, uint256(980));
  }

  // ============ getD ============

  // Should work
  function test_SwapUtils__getD_works() public {
    uint256[] memory xp = SwapUtils._xp(swap);
    uint256 d0 = SwapUtils.getD(xp, preciseA);

    assertEq(d0, uint256(2000));
  }

  // ============ _xp ============

  // Should work
  function test_SwapUtils___xp_works() public {
    uint256[] memory xp = SwapUtils._xp(swap);

    uint256 numTokens = balances.length;
    for (uint256 i = 0; i < numTokens; i++) {
      assertEq(xp[0], balances[0].mul(tokenPrecisionMultipliers[0]));
    }
  }

  // ============ getVirtualPrice ============

  // Should work
  function test_SwapUtils__getVirtualPrice_worksWithSupplyZero() public {
    uint256 virtualPrice = SwapUtils.getVirtualPrice(swap);

    assertEq(virtualPrice, uint256(0));
  }

  // Should work
  function test_SwapUtils__getVirtualPrice_worksWithSupply() public {
    vm.mockCall(address(lpToken), abi.encodeWithSelector(IERC20.totalSupply.selector), abi.encode(lpTokenSupply));
    uint256 virtualPrice = SwapUtils.getVirtualPrice(swap);

    uint256[] memory xp = SwapUtils._xp(swap);
    uint256 d = SwapUtils.getD(xp, preciseA);

    uint256 verify = d.mul(10**uint256(SwapUtils.POOL_PRECISION_DECIMALS)).div(lpTokenSupply);

    assertEq(virtualPrice, uint256(verify));
  }

  // ============ getY ============

  // Should work
  function test_SwapUtils__getY_works() public {
    uint256[] memory xp = SwapUtils._xp(swap);
    uint256 x = dx.mul(tokenPrecisionMultipliers[tokenIndexFrom]).add(xp[tokenIndexFrom]);
    uint256 y = SwapUtils.getY(preciseA, tokenIndexFrom, tokenIndexTo, x, xp);

    console.logUint(y);
    assertEq(y, uint256(980));
  }

  // ============ calculateSwap ============

  // Should work
  function test_SwapUtils__calculateSwap_works() public {
    uint256 dy = SwapUtils.calculateSwap(swap, tokenIndexFrom, tokenIndexTo, amount);

    assertEq(dy, uint256(9));
  }

  // ============ _calculateSwap ============

  // Should work
  function test_SwapUtils___calculateSwap_works() public {
    uint256 dy;
    uint256 dyFee;

    (dy, dyFee) = SwapUtils._calculateSwap(swap, tokenIndexFrom, tokenIndexTo, amount, balances);

    assertEq(dy, uint256(9));
    assertEq(dyFee, uint256(0));
  }

  // ============ calculateRemoveLiquidity ============

  // Should work
  function test_SwapUtils__calculateRemoveLiquidity_works() public {
    vm.mockCall(address(lpToken), abi.encodeWithSelector(IERC20.totalSupply.selector), abi.encode(lpTokenSupply));
    uint256[] memory res = SwapUtils.calculateRemoveLiquidity(swap, amount);

    assertEq(res[0], amount);
    assertEq(res[1], amount);
  }

  // ============ _calculateRemoveLiquidity ============

  // Should work
  function test_SwapUtils___calculateRemoveLiquidity_works() public {
    uint256[] memory res = SwapUtils._calculateRemoveLiquidity(balances, amount, lpTokenSupply);

    assertEq(res[0], amount);
    assertEq(res[1], amount);
  }

  // ============ calculateTokenAmount ============

  // Should work
  function test_SwapUtils__calculateTokenAmount_worksIfDeposit() public {
    // uint256 res = SwapUtils.calculateTokenAmount(swap, abi.encode(balances), true);
    // console.logUint(res);
  }

  // Should work
  function test_SwapUtils__calculateTokenAmount_worksIfWithdraw() public {
    // uint256 res = SwapUtils.calculateTokenAmount(swap, abi.encode(balances), false);
    // console.logUint(res);
  }
}
