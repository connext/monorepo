// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IConnextStableSwap {
  function swapExact(
    bytes32 canonicalId,
    uint256 amountIn,
    address assetIn,
    address assetOut
  ) external payable returns (uint256);

  function getA(bytes32 canonicalId) external view returns (uint256);

  function getToken(bytes32 canonicalId, uint8 index) external view returns (IERC20);

  function getTokenIndex(bytes32 canonicalId, address tokenAddress) external view returns (uint8);

  function getTokenBalance(bytes32 canonicalId, uint8 index) external view returns (uint256);

  function getVirtualPrice(bytes32 canonicalId) external view returns (uint256);

  // min return calculation functions
  function calculateSwap(
    bytes32 canonicalId,
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx
  ) external view returns (uint256);

  function calculateTokenAmount(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    bool deposit
  ) external view returns (uint256);

  function calculateRemoveLiquidity(bytes32 canonicalId, uint256 amount) external view returns (uint256[] memory);

  function calculateRemoveLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex
  ) external view returns (uint256 availableTokenAmount);

  // state modifying functions

  function swap(
    bytes32 canonicalId,
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx,
    uint256 minDy,
    uint256 deadline
  ) external returns (uint256);

  function addLiquidity(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 minToMint,
    uint256 deadline
  ) external returns (uint256);

  function removeLiquidity(
    bytes32 canonicalId,
    uint256 amount,
    uint256[] calldata minAmounts,
    uint256 deadline
  ) external returns (uint256[] memory);

  function removeLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex,
    uint256 minAmount,
    uint256 deadline
  ) external returns (uint256);

  function removeLiquidityImbalance(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 maxBurnAmount,
    uint256 deadline
  ) external returns (uint256);
}
