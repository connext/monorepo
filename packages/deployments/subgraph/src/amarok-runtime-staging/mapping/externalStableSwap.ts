/* eslint-disable prefer-const */
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
  NewSwapFee,
  NewAdminFee,
  TokenSwap,
} from "../../../generated/templates/StableSwap/StableSwap";

import { getOrCreatePooledToken, getOrCreateStableSwap } from "./helper";

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

export function handleAddLiquidity(event: AddLiquidity): void {}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {}

export function handleRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {}

export function handleTokenSwap(event: TokenSwap): void {}

export function handleRampA(event: RampA): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.initialA = event.params.oldA;
  stableSwap.futureA = event.params.newA;
  stableSwap.initialATime = event.params.initialTime;
  stableSwap.futureATime = event.params.futureTime;

  stableSwap.save();
}

export function handleStopRampA(event: StopRampA): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.initialA = event.params.currentA;
  stableSwap.futureA = event.params.currentA;
  stableSwap.initialATime = event.block.timestamp;
  stableSwap.futureATime = event.block.timestamp;

  stableSwap.save();
}

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
