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
  uint256[] balances;

  SwapUtils.Swap swap;

  address lpTokenReceiver = address(1);
  uint256 lpTokenSupply = uint256(1000);

  uint256 tokenBalance = uint256(1000);
  uint256 token2Balance = uint256(1000);

  uint256 amount = uint256(10);
  uint8 tokenIndex = uint8(0);

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

    balances = new uint256[](2);
    balances[0] = uint256(tokenBalance);
    balances[1] = uint256(token2Balance);

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
      balances
    );
  }

  // ============ Utils ============

  // ============ calculateWithdrawOneToken ============

  // Should work
  function test_SwapUtils__calculateWithdrawOneToken_works() public {
    vm.mockCall(address(lpToken), abi.encodeWithSelector(IERC20.totalSupply.selector), abi.encode(lpTokenSupply));
    uint256 res = SwapUtils.calculateWithdrawOneToken(swap, amount, tokenIndex);
    assertEq(res, uint256(19));
  }

  // ============ calculateWithdrawOneTokenDY ============

  // Should work
  function test_SwapUtils__calculateWithdrawOneTokenDY_works() public {
    uint256 dy;
    uint256 newY;
    uint256 currentY;
    (dy, newY, currentY) = SwapUtils.calculateWithdrawOneTokenDY(swap, tokenIndex, amount, lpTokenSupply);
    assertEq(dy, uint256(19));
    assertEq(newY, uint256(980));
    assertEq(currentY, uint256(lpTokenSupply));
  }

  // ============ getYD ============

  // Should work
  //   function test_SwapUtils__getYD_works() public {
  //     uint256 dy;
  //     uint256 newY;
  //     uint256 currentY;
  //     (dy, newY, currentY) = SwapUtils.getYD(, tokenIndex, amount, lpTokenSupply);
  //     assertEq(dy, uint256(19));
  //     assertEq(newY, uint256(980));
  //     assertEq(currentY, uint256(lpTokenSupply));
  //   }
}
