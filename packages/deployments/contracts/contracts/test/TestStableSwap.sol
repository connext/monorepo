// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IStableSwap.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TestStableSwap {
  using SafeMath for uint256;

  IStableSwap public swap;
  IERC20 public lpToken;
  uint8 public n;

  uint256 public constant MAX_INT = 2**256 - 1;

  constructor(
    IStableSwap swapContract,
    IERC20 lpTokenContract,
    uint8 numOfTokens
  ) {
    swap = swapContract;
    lpToken = lpTokenContract;
    n = numOfTokens;

    // Pre-approve tokens
    for (uint8 i; i < n; i++) {
      swap.getToken(i).approve(address(swap), MAX_INT);
    }
    lpToken.approve(address(swap), MAX_INT);
  }

  event PoolCreated(address assetA, address assetB, uint256 seedA, uint256 seedB);

  event Swapped(address assetIn, address assetOut, uint256 amountIn, uint256 amountOut);

  // Hold mapping of swaps
  mapping(address => address) poolAssets;

  function swapExact(
    uint256 amountIn,
    address assetIn,
    address assetOut
  ) external payable returns (uint256) {
    // make sure pool is setup
    require(poolAssets[assetIn] == assetOut, "!setup");

    // make sure theres enough balance
    bool assetOutIsNative = assetOut == address(0);
    if (assetOutIsNative) {
      require(address(this).balance >= amountIn, "!bal");
    } else {
      require(IERC20(assetOut).balanceOf(address(this)) >= amountIn, "!bal");
    }

    // transfer in (simple 1:1)
    if (assetIn == address(0)) {
      require(msg.value == amountIn, "!val");
    } else {
      SafeERC20.safeTransferFrom(IERC20(assetIn), msg.sender, address(this), amountIn);
    }

    // transfer out (simple 1:1)
    if (assetOutIsNative) {
      Address.sendValue(payable(msg.sender), amountIn);
    } else {
      SafeERC20.safeTransfer(IERC20(assetOut), msg.sender, amountIn);
    }

    // emit
    emit Swapped(assetIn, assetOut, amountIn, amountIn);

    return amountIn;
  }

  function setupPool(
    address assetA,
    address assetB,
    uint256 seedA,
    uint256 seedB
  ) external payable {
    // Save pools
    poolAssets[assetA] = assetB;

    poolAssets[assetB] = assetA;

    // Transfer funds to contract
    if (assetA == address(0)) {
      require(msg.value == seedA, "!seedA");
    } else {
      SafeERC20.safeTransferFrom(IERC20(assetA), msg.sender, address(this), seedA);
    }

    if (assetB == address(0)) {
      require(msg.value == seedB, "!seedB");
    } else {
      SafeERC20.safeTransferFrom(IERC20(assetB), msg.sender, address(this), seedB);
    }

    emit PoolCreated(assetA, assetB, seedA, seedB);
  }

  function test_swap(
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx,
    uint256 minDy
  ) public {
    uint256 balanceBefore = swap.getToken(tokenIndexTo).balanceOf(address(this));
    uint256 returnValue = swap.swap(tokenIndexFrom, tokenIndexTo, dx, minDy, block.timestamp);
    uint256 balanceAfter = swap.getToken(tokenIndexTo).balanceOf(address(this));

    require(returnValue == balanceAfter.sub(balanceBefore), "swap()'s return value does not match received amount");
  }

  function test_addLiquidity(uint256[] calldata amounts, uint256 minToMint) public {
    uint256 balanceBefore = lpToken.balanceOf(address(this));
    uint256 returnValue = swap.addLiquidity(amounts, minToMint, MAX_INT);
    uint256 balanceAfter = lpToken.balanceOf(address(this));

    require(
      returnValue == balanceAfter.sub(balanceBefore),
      "addLiquidity()'s return value does not match minted amount"
    );
  }

  function test_removeLiquidity(uint256 amount, uint256[] memory minAmounts) public {
    uint256[] memory balanceBefore = new uint256[](n);
    uint256[] memory balanceAfter = new uint256[](n);

    for (uint8 i = 0; i < n; i++) {
      balanceBefore[i] = swap.getToken(i).balanceOf(address(this));
    }

    uint256[] memory returnValue = swap.removeLiquidity(amount, minAmounts, MAX_INT);

    for (uint8 i = 0; i < n; i++) {
      balanceAfter[i] = swap.getToken(i).balanceOf(address(this));
      require(
        balanceAfter[i].sub(balanceBefore[i]) == returnValue[i],
        "removeLiquidity()'s return value does not match received amounts of tokens"
      );
    }
  }

  function test_removeLiquidityImbalance(uint256[] calldata amounts, uint256 maxBurnAmount) public {
    uint256 balanceBefore = lpToken.balanceOf(address(this));
    uint256 returnValue = swap.removeLiquidityImbalance(amounts, maxBurnAmount, MAX_INT);
    uint256 balanceAfter = lpToken.balanceOf(address(this));

    require(
      returnValue == balanceBefore.sub(balanceAfter),
      "removeLiquidityImbalance()'s return value does not match burned lpToken amount"
    );
  }

  function test_removeLiquidityOneToken(
    uint256 tokenAmount,
    uint8 tokenIndex,
    uint256 minAmount
  ) public {
    uint256 balanceBefore = swap.getToken(tokenIndex).balanceOf(address(this));
    uint256 returnValue = swap.removeLiquidityOneToken(tokenAmount, tokenIndex, minAmount, MAX_INT);
    uint256 balanceAfter = swap.getToken(tokenIndex).balanceOf(address(this));

    require(
      returnValue == balanceAfter.sub(balanceBefore),
      "removeLiquidityOneToken()'s return value does not match received token amount"
    );
  }

  receive() external payable {}

  fallback() external payable {}
}
