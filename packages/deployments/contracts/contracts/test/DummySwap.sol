// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IStableSwap.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * This contract is designed to be used in tests *only*!! Has no logic about
 * reserves, simply swaps assets 1:1 based on reserves to simplify test assertions
 */
contract DummySwap is IStableSwap {
  constructor() {}

  event PoolCreated(address assetA, address assetB, uint256 seedA, uint256 seedB);

  event Swapped(address indexed buyer, uint256 amountIn, uint256 amountOut, address assetIn, address assetOut);

  // Hold mapping of swaps
  mapping(address => address) poolAssets;

  receive() external payable {}

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
    emit Swapped(msg.sender, amountIn, amountIn, assetIn, assetOut);

    return amountIn;
  }

  function getA() external view returns (uint256) {
    require(false, "!implemented");
  }

  function getToken(uint8 index) external view returns (IERC20) {
    require(false, "!implemented");
  }

  function getTokenIndex(address tokenAddress) external view returns (uint8) {
    require(false, "!implemented");
  }

  function getTokenBalance(uint8 index) external view returns (uint256) {
    require(false, "!implemented");
  }

  function getVirtualPrice() external view returns (uint256) {
    require(false, "!implemented");
  }

  function calculateSwap(
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx
  ) external view returns (uint256) {
    require(false, "!implemented");
  }

  function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view returns (uint256) {
    require(false, "!implemented");
  }

  function calculateRemoveLiquidity(uint256 amount) external view returns (uint256[] memory) {
    require(false, "!implemented");
  }

  function calculateRemoveLiquidityOneToken(uint256 tokenAmount, uint8 tokenIndex)
    external
    view
    returns (uint256 availableTokenAmount)
  {
    require(false, "!implemented");
  }

  function initialize(
    IERC20[] memory pooledTokens,
    uint8[] memory decimals,
    string memory lpTokenName,
    string memory lpTokenSymbol,
    uint256 a,
    uint256 fee,
    uint256 adminFee,
    address lpTokenTargetAddress
  ) external {
    require(false, "!implemented");
  }

  function swap(
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx,
    uint256 minDy,
    uint256 deadline
  ) external returns (uint256) {
    require(false, "!implemented");
  }

  function addLiquidity(
    uint256[] calldata amounts,
    uint256 minToMint,
    uint256 deadline
  ) external returns (uint256) {
    require(false, "!implemented");
  }

  function removeLiquidity(
    uint256 amount,
    uint256[] calldata minAmounts,
    uint256 deadline
  ) external returns (uint256[] memory) {
    require(false, "!implemented");
  }

  function removeLiquidityOneToken(
    uint256 tokenAmount,
    uint8 tokenIndex,
    uint256 minAmount,
    uint256 deadline
  ) external returns (uint256) {
    require(false, "!implemented");
  }

  function removeLiquidityImbalance(
    uint256[] calldata amounts,
    uint256 maxBurnAmount,
    uint256 deadline
  ) external returns (uint256) {
    require(false, "!implemented");
  }

  function setupPool(
    address assetA,
    address assetB,
    uint256 seedA,
    uint256 seedB
  ) external payable {
    // Save pool to swap A <-> B
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
}
