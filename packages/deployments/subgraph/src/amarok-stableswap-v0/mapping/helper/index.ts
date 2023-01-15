/* eslint-disable */
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

import {
  SystemInfo,
  StableSwap,
  PooledToken,
  SwapHourlyVolume,
  SwapDailyVolume,
  SwapWeeklyVolume,
} from "../../../../generated/schema";

import { decimal } from "@protofire/subgraph-toolkit";

export function getSystemInfo(): SystemInfo {
  let state = SystemInfo.load("current");

  if (state == null) {
    state = new SystemInfo("current");

    state.exchangeCount = BigInt.fromI32(0);
    state.swapCount = BigInt.fromI32(0);
  }

  return state as SystemInfo;
}

export function getOrCreateStableSwap(_stableSwapKey: Bytes): StableSwap {
  let stableSwapId = _stableSwapKey.toHex();
  let stableSwap = StableSwap.load(stableSwapId);

  if (stableSwap == null) {
    stableSwap = new StableSwap(stableSwapId);
    stableSwap.key = _stableSwapKey;
    stableSwap.canonicalId = new Bytes(32);
    stableSwap.domain = new BigInt(0);
    stableSwap.swapPool = new Address(0);
    stableSwap.pooledTokens = [];
    stableSwap.balances = [];

    stableSwap.save();

    let system = getSystemInfo();
    system.swapCount = system.swapCount.plus(BigInt.fromI32(1));
    system.save();
  }

  return stableSwap;
}

export function getStableSwapCurrentA(stableSwapKey: Bytes, timestamp: BigInt): BigInt {
  let stableSwap = getOrCreateStableSwap(stableSwapKey);

  let t1 = stableSwap.futureATime!; // time when ramp is finished
  let a1 = stableSwap.futureA!; // final A value when ramp is finished

  if (timestamp.lt(t1)) {
    let t0 = stableSwap.initialATime!; // time when ramp is started
    let a0 = stableSwap.initialA!; // initial A value when ramp is started
    if (a1 > a0) {
      // a0 + (a1 - a0) * (block.timestamp - t0) / (t1 - t0)
      return a0.plus(a1.minus(a0).times(timestamp.minus(t0)).div(t1.minus(t0)));
    } else {
      // a0 - (a0 - a1) * (block.timestamp - t0) / (t1 - t0)
      return a0.minus(a0.minus(a1).times(timestamp.minus(t0)).div(t1.minus(t0)));
    }
  } else {
    return a1;
  }
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

export function getSwapHourlyTradeVolume(stableSwap: StableSwap, timestamp: BigInt): SwapHourlyVolume {
  let interval = BigInt.fromI32(60 * 60);
  let hour = timestamp.div(interval).times(interval);
  let id = stableSwap.id + "-hour-" + hour.toString();

  let volume = SwapHourlyVolume.load(id);

  if (volume == null) {
    volume = new SwapHourlyVolume(id);
    volume.stableSwap = stableSwap.id;
    volume.timestamp = hour;
    volume.volume = decimal.ZERO;
  }

  return volume;
}

export function getSwapDailyTradeVolume(stableSwap: StableSwap, timestamp: BigInt): SwapDailyVolume {
  let interval = BigInt.fromI32(60 * 60 * 24);
  let day = timestamp.div(interval).times(interval);
  let id = stableSwap.id + "-day-" + day.toString();

  let volume = SwapDailyVolume.load(id);

  if (volume == null) {
    volume = new SwapDailyVolume(id);
    volume.stableSwap = stableSwap.id;
    volume.timestamp = day;
    volume.volume = decimal.ZERO;
  }

  return volume;
}

export function getSwapWeeklyTradeVolume(stableSwap: StableSwap, timestamp: BigInt): SwapWeeklyVolume {
  let interval = BigInt.fromI32(60 * 60 * 24 * 7);
  let week = timestamp.div(interval).times(interval);
  let id = stableSwap.id + "-week-" + week.toString();

  let volume = SwapWeeklyVolume.load(id);

  if (volume == null) {
    volume = new SwapWeeklyVolume(id);
    volume.stableSwap = stableSwap.id;
    volume.timestamp = week;
    volume.volume = decimal.ZERO;
  }

  return volume;
}
