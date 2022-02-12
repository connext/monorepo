// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IStableSwap.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestStableSwap is IStableSwap {

  constructor() {}

  event PoolCreated(
    address assetA,
    address assetB,
    uint256 seedA,
    uint256 seedB
  );

  event Swapped(
    address assetIn,
    address assetOut,
    uint256 amountIn,
    uint256 amountOut
  );

  // Hold mapping of swaps
  mapping(address => address) poolAssets;

  function swapExact(uint256 amountIn, address assetIn, address assetOut) external payable returns (uint256) {
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
    emit Swapped(
      assetIn,
      assetOut,
      amountIn,
      amountIn
    );

    return amountIn;
  }

  function setupPool(address assetA, address assetB, uint256 seedA, uint256 seedB) external payable {
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

    emit PoolCreated(
      assetA,
      assetB,
      seedA,
      seedB
    );
  }

  receive() external payable {}

  fallback() external payable {}
}