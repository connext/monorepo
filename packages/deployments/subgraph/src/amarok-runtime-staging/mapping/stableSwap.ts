/* eslint-disable prefer-const */
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { decimal, address } from "@protofire/subgraph-toolkit";

import {
  AddLiquidity,
  AdminFeesSet,
  RampAStarted,
  RampAStopped,
  RemoveLiquidity,
  RemoveLiquidityImbalance,
  RemoveLiquidityOne,
  StableSwapAdded,
  SwapDisabled,
  SwapFeesSet,
  SwapInitialized,
  SwapRemoved,
  TokenSwap,
} from "../../../generated/Connext/Connext";
import { StableSwapExchange } from "../../../generated/schema";
import {
  getOrCreatePooledToken,
  getOrCreateStableSwap,
  getOrCreateStableSwapLiquidity,
  getStableSwapCurrentA,
  getSwapDailyTradeVolume,
  getSwapHourlyTradeVolume,
  getSwapWeeklyTradeVolume,
} from "./helper";

export function handleStableSwapAdded(event: StableSwapAdded): void {
  if (!address.isZeroAddress(event.params.swapPool)) {
    let stableSwap = getOrCreateStableSwap(event.params.swapPool);

    stableSwap.key = event.params.key;
    stableSwap.canonicalId = event.params.canonicalId;
    stableSwap.domain = event.params.domain;
    stableSwap.swapPool = event.params.swapPool;

    stableSwap.save();
  }
}

export function handleInternalSwapInitialized(event: SwapInitialized): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

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

export function handleInternalSwapRemoved(event: SwapRemoved): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.canonicalId = new Bytes(32);
  stableSwap.domain = new BigInt(0);
  stableSwap.swapPool = new Address(0);
  stableSwap.pooledTokens = [];
  stableSwap.balances = [];
  stableSwap.isActive = false;
  stableSwap.save();
}

export function handleInternalSwapDisabled(event: SwapDisabled): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.isActive = false;
  stableSwap.save();
}

export function handleAdminFeeSet(event: AdminFeesSet): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.adminFee = event.params.newAdminFee;
  stableSwap.save();
}

export function handleSwapFeeSet(event: SwapFeesSet): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.swapFee = event.params.newSwapFee;
  stableSwap.save();
}

export function handleInternalRampA(event: RampAStarted): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.initialA = getStableSwapCurrentA(event.params.key, event.block.timestamp);
  stableSwap.initialATime = event.block.timestamp;
  stableSwap.futureA = event.params.futureA;
  stableSwap.futureATime = event.params.futureTime;

  stableSwap.save();
}

export function handleStopInternalRampA(event: RampAStopped): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  let currentA = getStableSwapCurrentA(event.params.key, event.block.timestamp);
  stableSwap.initialA = currentA;
  stableSwap.initialATime = event.block.timestamp;
  stableSwap.futureA = currentA;
  stableSwap.futureATime = event.block.timestamp;

  stableSwap.save();
}

export function handleInternalAddLiquidity(event: AddLiquidity): void {
  let stableSwapLiquidity = getOrCreateStableSwapLiquidity(event.params.provider);
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwapLiquidity.stableSwap = stableSwap.id;

  const num = event.params.tokenAmounts.length;
  for (let i = 0; i < num; i++) {
    stableSwapLiquidity.tokenAmounts[i] = stableSwapLiquidity.tokenAmounts[i].plus(event.params.tokenAmounts[i]);
    stableSwapLiquidity.fees[i] = stableSwapLiquidity.fees[i].plus(event.params.fees[i]);
  }
  stableSwap.invariant = event.params.invariant;
  stableSwap.lpTokenSupply = event.params.lpTokenSupply;

  stableSwapLiquidity.save();
  stableSwap.save();
}

export function handleInternalRemoveLiquidity(event: RemoveLiquidity): void {
  let stableSwapLiquidity = getOrCreateStableSwapLiquidity(event.params.provider);
  let stableSwap = getOrCreateStableSwap(event.params.key);

  const num = event.params.tokenAmounts.length;
  for (let i = 0; i < num; i++) {
    stableSwapLiquidity.tokenAmounts[i] = stableSwapLiquidity.tokenAmounts[i].minus(event.params.tokenAmounts[i]);
  }

  stableSwap.lpTokenSupply = event.params.lpTokenSupply;

  stableSwapLiquidity.save();
  stableSwap.save();
}

export function handleInternalRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {
  let stableSwapLiquidity = getOrCreateStableSwapLiquidity(event.params.provider);
  let stableSwap = getOrCreateStableSwap(event.params.key);

  const num = event.params.tokenAmounts.length;
  for (let i = 0; i < num; i++) {
    stableSwapLiquidity.tokenAmounts[i] = stableSwapLiquidity.tokenAmounts[i].minus(event.params.tokenAmounts[i]);
  }
  stableSwap.lpTokenSupply = event.params.lpTokenSupply;
  stableSwap.invariant = event.params.invariant;

  stableSwapLiquidity.save();
  stableSwap.save();
}

export function handleInternalRemoveLiquidityOne(event: RemoveLiquidityOne): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.lpTokenSupply = event.params.lpTokenSupply.minus(event.params.lpTokenAmount);

  stableSwap.save();
}

export function handleInternalTokenSwap(event: TokenSwap): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);
  let exchangeId = event.params.key.toHexString().concat(event.transaction.hash.toHexString());
  let exchange = new StableSwapExchange(exchangeId);

  exchange.stableSwap = stableSwap.id;
  exchange.buyer = event.params.buyer;
  exchange.soldId = event.params.soldId;
  exchange.tokensSold = event.params.tokensSold;
  exchange.boughtId = event.params.boughtId;
  exchange.tokensBought = event.params.tokensBought;
  exchange.block = event.block.number;
  exchange.timestamp = event.block.timestamp;
  exchange.transaction = event.transaction.hash;
  exchange.save();

  // save trade volume
  let tokens = stableSwap.pooledTokens;
  let tokenPrecisionMultipliers = stableSwap.tokenPrecisionMultipliers!;
  if (event.params.soldId.toI32() < tokens.length && event.params.boughtId.toI32() < tokens.length) {
    let sellVolume = event.params.tokensSold.divDecimal(
      BigInt.fromI32(10).pow(18).div(tokenPrecisionMultipliers[event.params.soldId.toI32()]).toBigDecimal(),
    );
    let buyVolume = event.params.tokensBought.divDecimal(
      BigInt.fromI32(10).pow(18).div(tokenPrecisionMultipliers[event.params.boughtId.toI32()]).toBigDecimal(),
    );
    let volume = sellVolume.plus(buyVolume).div(decimal.TWO);

    let hourlyVolume = getSwapHourlyTradeVolume(stableSwap, event.block.timestamp);
    hourlyVolume.volume = hourlyVolume.volume.plus(volume);
    hourlyVolume.save();

    let dailyVolume = getSwapDailyTradeVolume(stableSwap, event.block.timestamp);
    dailyVolume.volume = dailyVolume.volume.plus(volume);
    dailyVolume.save();

    let weeklyVolume = getSwapWeeklyTradeVolume(stableSwap, event.block.timestamp);
    weeklyVolume.volume = weeklyVolume.volume.plus(volume);
    weeklyVolume.save();
  }
}
