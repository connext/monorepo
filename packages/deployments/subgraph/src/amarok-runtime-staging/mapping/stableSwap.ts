/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { StableSwapAdded } from "../../../generated/Connext/Connext";
import {
  AddLiquidity,
  SwapInitialized,
  RampA,
  StopRampA,
  RemoveLiquidityOne,
  RemoveLiquidity,
  RemoveLiquidityImbalance,
  Paused,
  Unpaused,
  NewWithdrawFee,
  NewSwapFee,
  NewAdminFee,
  TokenSwap,
} from "../../../generated/templates/StableSwap/StableSwap";

import { StableSwap, StableSwapLiquidity, PooledToken } from "../../../generated/schema";
// import { Asset, AssetBalance, Router} from "../../../generated/schema";

export function handleStableSwapAdded(event: StableSwapAdded): void {
  let stableSwap = getOrCreateStableSwap(event.params.swapPool);

  stableSwap.key = event.params.key;
  stableSwap.canonicalId = event.params.canonicalId;
  stableSwap.domain = event.params.domain;
  stableSwap.swapPool = event.params.swapPool;

  stableSwap.save();
}

export function handleSwapInitialized(event: SwapInitialized): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.lpToken = event.params.swap.lpToken;
  stableSwap.initialA = event.params.swap.initialA;
  stableSwap.futureA = event.params.swap.futureA;

  stableSwap.initialATime = event.params.swap.initialATime;
  stableSwap.futureATime = event.params.swap.futureATime;

  stableSwap.swapFee = event.params.swap.swapFee;
  stableSwap.adminFee = event.params.swap.adminFee;

  const num = event.params.swap.pooledTokens.length;
  for (let i = 0; i < num; i++) {
    let pooledToken = getOrCreatePooledToken(event.params.swap.pooledTokens[i]);
    stableSwap.pooledTokens[i] = pooledToken.id;
  }

  stableSwap.tokenPrecisionMultipliers = event.params.swap.tokenPrecisionMultipliers;
  stableSwap.balances = event.params.swap.balances;
  stableSwap.adminFees = event.params.swap.adminFees;

  stableSwap.isActive = true;

  stableSwap.save();
}

export function handleAddLiquidity(event: AddLiquidity): void {
  let stableSwapLiquidity = getOrCreateStableSwapLiquidity(event.params.provider);

  stableSwapLiquidity.provider = event.params.provider;

  let stableSwap = getOrCreateStableSwap(event.address);
  stableSwapLiquidity.stableSwap = stableSwap.id;

  const num = event.params.tokenAmounts.length;
  for (let i = 0; i < num; i++) {
    stableSwapLiquidity.tokenAmounts[i] = stableSwapLiquidity.tokenAmounts[i].plus(event.params.tokenAmounts[i]);
    stableSwapLiquidity.fees[i] = stableSwapLiquidity.fees[i].plus(event.params.fees[i]);

    stableSwap.balances[i] = stableSwap.balances[i].plus(event.params.tokenAmounts[i]);
  }
  stableSwapLiquidity.invariant = event.params.invariant;
  stableSwapLiquidity.lpTokenSupply = event.params.lpTokenSupply;

  stableSwapLiquidity.save();
}

export function handleRampA(event: RampA): void {}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let stableSwapLiquidity = getOrCreateStableSwapLiquidity(event.params.provider);

  let stableSwap = getOrCreateStableSwap(event.address);

  const num = event.params.tokenAmounts.length;
  for (let i = 0; i < num; i++) {
    stableSwapLiquidity.tokenAmounts[i] = stableSwapLiquidity.tokenAmounts[i].minus(event.params.tokenAmounts[i]);

    stableSwap.balances[i] = stableSwap.balances[i].minus(event.params.tokenAmounts[i]);
  }

  stableSwapLiquidity.lpTokenSupply = event.params.lpTokenSupply;

  stableSwapLiquidity.save();
}

export function handleRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {
  let stableSwapLiquidity = getOrCreateStableSwapLiquidity(event.params.provider);

  let stableSwap = getOrCreateStableSwap(event.address);

  const num = event.params.tokenAmounts.length;
  for (let i = 0; i < num; i++) {
    stableSwapLiquidity.tokenAmounts[i] = stableSwapLiquidity.tokenAmounts[i].minus(event.params.tokenAmounts[i]);

    stableSwap.balances[i] = stableSwap.balances[i].minus(event.params.tokenAmounts[i]);
  }
  stableSwapLiquidity.lpTokenSupply = event.params.lpTokenSupply;
  stableSwapLiquidity.invariant = event.params.invariant;

  stableSwapLiquidity.save();
}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {}

export function handleStopRampA(event: StopRampA): void {}

export function handleTokenSwap(event: TokenSwap): void {}

export function handleNewAdminFee(event: NewAdminFee): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.adminFee = event.params.newAdminFee;
  stableSwap.save();
}

export function handleNewSwapFee(event: NewSwapFee): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.swapFee = event.params.newSwapFee;
  stableSwap.save();
}

export function handleNewWithdrawFee(event: NewWithdrawFee): void {}

export function handlePaused(event: Paused): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.isActive = false;
  stableSwap.save();
}

export function handleUnpaused(event: Unpaused): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.isActive = true;
  stableSwap.save();
}

export function getOrCreateStableSwap(_stableSwap: Address): StableSwap {
  let stableSwapId = _stableSwap.toHex();
  let stableSwap = StableSwap.load(stableSwapId);

  if (stableSwap == null) {
    stableSwap = new StableSwap(stableSwapId);
    stableSwap.key = new Bytes(32);
    stableSwap.canonicalId = new Bytes(32);
    stableSwap.domain = new BigInt(0);
    stableSwap.swapPool = _stableSwap;
    stableSwap.pooledTokens = [];

    stableSwap.save();
  }

  return stableSwap;
}

export function getOrCreateStableSwapLiquidity(provider: Address): StableSwapLiquidity {
  let stableSwapLiquidityId = provider.toHex();
  let stableSwapLiquidity = StableSwapLiquidity.load(stableSwapLiquidityId);

  if (stableSwapLiquidity == null) {
    stableSwapLiquidity = new StableSwapLiquidity(stableSwapLiquidityId);
    stableSwapLiquidity.save();
  }

  return stableSwapLiquidity;
}

export function getOrCreatePooledToken(asset: Address): PooledToken {
  let pooledTokenId = asset.toHex();
  let pooledToken = PooledToken.load(pooledTokenId);

  if (pooledToken == null) {
    pooledToken = new PooledToken(pooledTokenId);
    pooledToken.asset = asset;
    pooledToken.save();
  }

  return pooledToken;
}
