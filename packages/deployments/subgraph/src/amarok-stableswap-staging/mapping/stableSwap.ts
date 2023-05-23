/* eslint-disable */
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
import {
  StableSwapAddLiquidityEvent,
  StableSwapExchange,
  StableSwapRemoveLiquidityEvent,
} from "../../../generated/schema";
import {
  addLiquidity,
  createLpToken,
  generateNonce,
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
import { StableSwap as StableSwapTemplate } from "../../../generated/templates";

export function handleStableSwapAdded(event: StableSwapAdded): void {
  if (!address.isZeroAddress(event.params.swapPool)) {
    let stableSwap = getOrCreateStableSwap(event.params.swapPool);

    stableSwap.key = event.params.key;
    stableSwap.canonicalId = event.params.canonicalId;
    stableSwap.domain = event.params.domain;
    stableSwap.swapPool = event.params.swapPool;

    stableSwap.save();

    StableSwapTemplate.create(event.params.swapPool);
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
    getOrCreatePooledToken(event.params.swap.pooledTokens[i]);
  }

  stableSwap.pooledTokens = event.params.swap.pooledTokens.map<Bytes>((asset: Bytes) => asset);
  stableSwap.tokenPrecisionMultipliers = event.params.swap.tokenPrecisionMultipliers;
  stableSwap.balances = event.params.swap.balances;
  stableSwap.adminFees = event.params.swap.adminFees;

  stableSwap.isActive = true;

  stableSwap.save();

  let lpAddress = event.params.swap.lpToken;
  if (lpAddress != Address.zero()) {
    createLpToken(stableSwap.id, lpAddress);
  }
}

export function handleInternalSwapRemoved(event: SwapRemoved): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  stableSwap.canonicalId = new Bytes(32);
  stableSwap.domain = new BigInt(0);
  stableSwap.swapPool = new Address(0);
  stableSwap.pooledTokens = [];
  stableSwap.balances = [];
  stableSwap.virtualPrice = new BigInt(0);
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
  let stableSwapBefore = getOrCreateStableSwap(event.params.key);

  let stableSwap = addLiquidity(
    event.params.key,
    event.params.tokenAmounts,
    event.params.fees,
    event.params.invariant,
    event.params.lpTokenSupply,
  );
  let log = new StableSwapAddLiquidityEvent(
    "add_liquidity-" + event.transaction.hash.toHexString() + "-" + event.logIndex.toString(),
  );

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = event.params.tokenAmounts;
  log.fees = event.params.fees;
  log.invariant = event.params.invariant;
  log.lpTokenSupply = event.params.lpTokenSupply;
  log.balances = stableSwap.balances;
  log.lpTokenAmount = event.params.lpTokenSupply.minus(stableSwapBefore.lpTokenSupply);

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;
  log.nonce = generateNonce(event);

  log.save();
}

export function handleInternalRemoveLiquidity(event: RemoveLiquidity): void {
  let stableSwapBefore = getOrCreateStableSwap(event.params.key);

  let stableSwap = removeLiquidity(
    event.params.key,
    event.params.tokenAmounts,
    event.params.lpTokenSupply,
    event.block.timestamp,
  );
  let log = new StableSwapRemoveLiquidityEvent(
    "remove_liquidity-" + event.transaction.hash.toHexString() + "-" + event.logIndex.toString(),
  );

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = event.params.tokenAmounts;
  log.lpTokenSupply = event.params.lpTokenSupply;
  log.balances = stableSwap.balances;
  log.lpTokenAmount = stableSwapBefore.lpTokenSupply.minus(event.params.lpTokenSupply);

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;
  log.nonce = generateNonce(event);

  log.save();
}

export function handleInternalRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {
  let stableSwapBefore = getOrCreateStableSwap(event.params.key);

  let stableSwap = removeLiquidityImbalance(
    event.params.key,
    event.params.tokenAmounts,
    event.params.fees,
    event.params.invariant,
    event.params.lpTokenSupply,
  );
  let log = new StableSwapRemoveLiquidityEvent(
    "remove_liquidity_imbalance-" + event.transaction.hash.toHexString() + "-" + event.logIndex.toString(),
  );

  log.stableSwap = stableSwap.id;
  log.provider = event.params.provider;
  log.tokenAmounts = event.params.tokenAmounts;
  log.fees = event.params.fees;
  log.invariant = event.params.invariant;
  log.lpTokenSupply = event.params.lpTokenSupply;
  log.balances = stableSwap.balances;
  log.lpTokenAmount = stableSwapBefore.lpTokenSupply.minus(event.params.lpTokenSupply);

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;
  log.nonce = generateNonce(event);

  log.save();
}

export function handleInternalRemoveLiquidityOne(event: RemoveLiquidityOne): void {
  let stableSwap = removeLiquidityOneToken(
    event.params.key,
    event.params.lpTokenAmount,
    event.params.lpTokenSupply,
    event.params.boughtId,
    event.params.tokensBought,
    event.block.timestamp,
  );
  let log = new StableSwapRemoveLiquidityEvent(
    "remove_liquidity_one-" + event.transaction.hash.toHexString() + "-" + event.logIndex.toString(),
  );

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
  log.balances = stableSwap.balances;
  log.lpTokenAmount = event.params.lpTokenAmount;

  log.block = event.block.number;
  log.timestamp = event.block.timestamp;
  log.transaction = event.transaction.hash;
  log.nonce = generateNonce(event);

  log.save();
}

export function handleInternalTokenSwap(event: TokenSwap): void {
  let stableSwap = getOrCreateStableSwap(event.params.key);

  // save trade volume
  let tokens = stableSwap.pooledTokens;
  let tokenPrecisionMultipliers = stableSwap.tokenPrecisionMultipliers;
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

    stableSwap = swap(
      stableSwap.key,
      event.params.soldId,
      event.params.boughtId,
      event.params.tokensSold,
      event.params.tokensBought,
      event.block.timestamp,
    );

    let exchangeId =
      event.params.key.toHexString() +
      "-" +
      event.transaction.hash.toHexString() +
      "-" +
      event.transactionLogIndex.toString();

    let exchange = new StableSwapExchange(exchangeId);

    exchange.stableSwap = stableSwap.id;
    exchange.buyer = event.params.buyer;
    exchange.soldId = event.params.soldId;
    exchange.tokensSold = event.params.tokensSold;
    exchange.boughtId = event.params.boughtId;
    exchange.tokensBought = event.params.tokensBought;
    exchange.balances = stableSwap.balances;
    exchange.fee = event.params.tokensBought
      .times(stableSwap.swapFee === null ? BigInt.zero() : stableSwap.swapFee!)
      .div(BigInt.fromI32(10).pow(10));

    exchange.block = event.block.number;
    exchange.timestamp = event.block.timestamp;
    exchange.transaction = event.transaction.hash;
    exchange.nonce = generateNonce(event);
    exchange.save();
  }

  // update system
  let system = getSystemInfo();
  system.exchangeCount = system.exchangeCount.plus(BigInt.fromI32(1));
  system.save();
}
