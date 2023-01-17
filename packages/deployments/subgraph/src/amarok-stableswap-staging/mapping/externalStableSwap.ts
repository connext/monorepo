/* eslint-disable  */
import { BigInt } from "@graphprotocol/graph-ts";
import { decimal } from "@protofire/subgraph-toolkit";

import {
  StableSwapAddLiquidityEvent,
  StableSwapExchange,
  StableSwapRemoveLiquidityEvent,
} from "../../../generated/schema";
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

import {
  addLiquidity,
  getOrCreatePooledToken,
  getOrCreateStableSwap,
  getStableSwapCurrentA,
  getSwapDailyTradeVolume,
  getSwapHourlyTradeVolume,
  getSwapWeeklyTradeVolume,
  getSystemInfo,
  removeLiquidity,
  removeLiquidityImbalance,
  removeLiquidityOneToken,
  swap,
} from "./helper";

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
  let stableSwap = getOrCreateStableSwap(event.address);

  addLiquidity(
    stableSwap.key,
    event.params.tokenAmounts,
    event.params.fees,
    event.params.invariant,
    event.params.lpTokenSupply,
  );

  let log = new StableSwapAddLiquidityEvent("add_liquidity-" + event.transaction.hash.toHexString());

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = event.params.tokenAmounts;
  log.fees = event.params.fees;
  log.invariant = event.params.invariant;
  log.lpTokenSupply = event.params.lpTokenSupply;

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;

  log.save();
}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  removeLiquidity(stableSwap.key, event.params.tokenAmounts, event.params.lpTokenSupply, event.block.timestamp);

  let log = new StableSwapRemoveLiquidityEvent("remove_liquidity-" + event.transaction.hash.toHexString());

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = event.params.tokenAmounts;
  log.lpTokenSupply = event.params.lpTokenSupply;

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;

  log.save();
}

export function handleRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  removeLiquidityImbalance(
    stableSwap.key,
    event.params.tokenAmounts,
    event.params.fees,
    event.params.invariant,
    event.params.lpTokenSupply,
  );

  let log = new StableSwapRemoveLiquidityEvent("remove_liquidity_imbalance-" + event.transaction.hash.toHexString());

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = event.params.tokenAmounts;
  log.fees = event.params.fees;
  log.invariant = event.params.invariant;
  log.lpTokenSupply = event.params.lpTokenSupply;

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;

  log.save();
}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  removeLiquidityOneToken(
    stableSwap.key,
    event.params.lpTokenAmount,
    event.params.lpTokenSupply,
    event.params.boughtId,
    event.params.tokensBought,
    event.block.timestamp,
  );

  let log = new StableSwapRemoveLiquidityEvent("remove_liquidity_one-" + event.transaction.hash.toHexString());

  let tokenAmounts: BigInt[] = [];
  for (let i = 0; i < stableSwap.pooledTokens.length; i++) {
    if (i === parseInt(event.params.boughtId.toString())) {
      tokenAmounts.push(event.params.tokensBought);
    } else {
      tokenAmounts.push(BigInt.fromI32(0));
    }
  }

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = tokenAmounts;
  log.lpTokenSupply = event.params.lpTokenSupply;

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;

  log.save();
}

export function handleTokenSwap(event: TokenSwap): void {
  let stableSwap = getOrCreateStableSwap(event.address);
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

    swap(
      stableSwap.key,
      event.params.soldId,
      event.params.boughtId,
      event.params.tokensSold,
      event.params.tokensBought,
      event.block.timestamp,
    );
  }

  // update system
  let system = getSystemInfo();
  system.exchangeCount = system.exchangeCount.plus(BigInt.fromI32(1));
  system.save();
}

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
