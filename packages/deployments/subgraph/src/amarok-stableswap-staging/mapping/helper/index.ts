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
    stableSwap.adminFees = [];
    stableSwap.tokenPrecisionMultipliers = [];
    stableSwap.lpTokenSupply = BigInt.zero();
    stableSwap.invariant = BigInt.zero();

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

export function getVirtualPrice(stableSwapKey: Bytes): BigInt {
  let stableSwap = getOrCreateStableSwap(stableSwapKey);
  let lpTokenSupply = stableSwap.lpTokenSupply!;

  if (lpTokenSupply.isZero()) {
    return BigInt.zero();
  }
  return stableSwap.invariant!.times(BigInt.fromI32(10).pow(18)).div(lpTokenSupply);
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

// Stable swap Logic
function within1(a: BigInt, b: BigInt): Boolean {
  let difference = a.gt(b) ? a.minus(b) : b.minus(a);
  return difference.lt(BigInt.fromI32(2)); // instead of <=1
}

function _getAPrecise(stableSwap: StableSwap, timestamp: BigInt): BigInt {
  return getStableSwapCurrentA(stableSwap.key, timestamp);
}

function _xp(stableSwap: StableSwap): BigInt[] {
  let numTokens = stableSwap.balances.length;
  let xp: BigInt[] = [];
  for (let i = 0; i < numTokens; i++) {
    xp.push(stableSwap.balances[i].times(stableSwap.tokenPrecisionMultipliers[i]));
  }
  return xp;
}

function _xpp(balances: BigInt[], precisionMultipliers: BigInt[]): BigInt[] {
  let numTokens = balances.length;
  let xp = new Array<BigInt>(numTokens);
  for (let i = 0; i < numTokens; i++) {
    xp[i] = balances[i].times(precisionMultipliers[i]);
  }
  return xp;
}

function _feePerToken(swapFee: BigInt, numTokens: number): BigInt {
  return swapFee.times(BigInt.fromI32(numTokens)).div(BigInt.fromI32((numTokens - 1) * 4));
}

export function calculateWithdrawOneToken(
  stableSwap: StableSwap,
  tokenAmount: BigInt,
  tokenIndex: number,
  timestamp: BigInt,
): BigInt {
  let { dy, dyFee } = _calculateWithdrawOneToken(
    stableSwap,
    tokenAmount,
    tokenIndex,
    stableSwap.lpTokenSupply!,
    timestamp,
  );
  return dy;
}

function _calculateWithdrawOneToken(
  stableSwap: StableSwap,
  tokenAmount: BigInt,
  tokenIndex: number,
  totalSupply: BigInt,
  timestamp: BigInt,
): { dy: BigInt; dyFee: BigInt } {
  let { dy, newY, currentY } = calculateWithdrawOneTokenDY(stableSwap, tokenIndex, tokenAmount, totalSupply, timestamp);

  // dy_0 (without fees)
  // dy, dy_0 - dy

  let dyFee = currentY.minus(newY).div(stableSwap.tokenPrecisionMultipliers[tokenIndex]).minus(dy);

  return { dy, dyFee };
}

export function calculateWithdrawOneTokenDY(
  stableSwap: StableSwap,
  tokenIndex: number,
  tokenAmount: BigInt,
  totalSupply: BigInt,
  timestamp: BigInt,
): {
  dy: BigInt;
  newY: BigInt;
  currentY: BigInt;
} {
  // Get the current D, then solve the stableswap invariant
  // y_i for D - tokenAmount
  let xp: BigInt[] = _xp(stableSwap);

  let v_preciseA = _getAPrecise(stableSwap, timestamp);
  let v_d0 = getD(xp, v_preciseA);
  let v_d1 = v_d0.minus(tokenAmount.times(v_d0).div(totalSupply));

  let v_newY = getYD(v_preciseA, tokenIndex, xp, v_d1);

  let xpReduced = new Array<BigInt>(xp.length);

  let v_feePerToken = _feePerToken(stableSwap.swapFee!, xp.length);
  // TODO: Set a length variable (at top) instead of reading xp.length on each loop.
  let len = xp.length;
  for (let i = 0; i < len; i++) {
    let xpi = xp[i];
    // if i == tokenIndex, dxExpected = xp[i] * d1 / d0 - newY
    // else dxExpected = xp[i] - (xp[i] * d1 / d0)
    // xpReduced[i] -= dxExpected * fee / FEE_DENOMINATOR
    xpReduced[i] = xpi.minus(
      (i == tokenIndex ? xpi.times(v_d1).div(v_d0).minus(v_newY) : xpi.minus(xpi.times(v_d1).div(v_d0)))
        .times(v_feePerToken)
        .div(BigInt.fromI32(10).pow(10)),
    );
  }

  let dy = xpReduced[tokenIndex].minus(getYD(v_preciseA, tokenIndex, xpReduced, v_d1));
  dy = dy.minus(BigInt.fromI32(1)).div(stableSwap.tokenPrecisionMultipliers[tokenIndex]);

  return { dy, newY: v_newY, currentY: xp[tokenIndex] };
}

export function getYD(a: BigInt, tokenIndex: number, xp: BigInt[], d: BigInt): BigInt {
  let numTokens = xp.length;

  let c = d;
  let s = BigInt.zero();
  let nA = a.times(BigInt.fromI32(numTokens));

  for (let i = 0; i < numTokens; i++) {
    if (i != tokenIndex) {
      s = s.plus(xp[i]);
      c = c.times(d).div(xp[i].times(BigInt.fromI32(numTokens)));
      // If we were to protect the division loss we would have to keep the denominator separate
      // and divide at the end. However this leads to overflow with large numTokens or/and D.
      // c = c * D * D * D * ... overflow!
    }
  }
  let A_PRECISION = BigInt.fromI32(100);
  c = c
    .times(d)
    .times(A_PRECISION)
    .div(nA.times(BigInt.fromI32(numTokens)));

  let b = s.plus(d.times(A_PRECISION).div(nA));
  let yPrev;
  let y = d;
  for (let i = 0; i < 256; i++) {
    yPrev = y;
    y = y
      .times(y)
      .plus(c)
      .div(y.times(BigInt.fromI32(2)).plus(b).minus(d));
    if (within1(y, yPrev)) {
      return y;
    }
  }
  return BigInt.zero();
}

export function getD(xp: BigInt[], a: BigInt): BigInt {
  let numTokens = BigInt.fromI32(xp.length);
  let s = BigInt.zero();
  for (let i = 0; i < numTokens.toI32(); i++) {
    s = s.plus(xp[i]);
  }

  if (s.isZero()) {
    return BigInt.zero();
  }

  let prevD;
  let d = s;
  let nA = a.times(numTokens);
  let A_PRECISION = BigInt.fromI32(100);

  for (let i = 0; i < 256; i++) {
    let dP = d;
    for (let j = 0; j < numTokens.toI32(); j++) {
      dP = dP.times(d).div(xp[j].times(numTokens));
      // If we were to protect the division loss we would have to keep the denominator separate
      // and divide at the end. However this leads to overflow with large numTokens or/and D.
      // dP = dP * D * D * D * ... overflow!
    }
    prevD = d;
    d = nA
      .times(s)
      .div(A_PRECISION)
      .plus(dP.times(numTokens))
      .times(d)
      .div(
        nA
          .minus(A_PRECISION)
          .times(d)
          .div(A_PRECISION)
          .plus(numTokens.plus(BigInt.fromI32(1)).times(dP)),
      );

    if (within1(d, prevD)) {
      return d;
    }
  }

  // Convergence should occur in 4 loops or less. If this is reached, there may be something wrong
  // with the pool. If this were to occur repeatedly, LPs should withdraw via `removeLiquidity()`
  // function which does not rely on D.
  return BigInt.zero();
}

export function getY(preciseA: BigInt, tokenIndexFrom: number, tokenIndexTo: number, x: BigInt, xp: BigInt[]): BigInt {
  let numTokens = BigInt.fromI32(xp.length);

  let d = getD(xp, preciseA);
  let c = d;
  let s = BigInt.zero();
  let nA = numTokens.times(preciseA);
  let A_PRECISION = BigInt.fromI32(100);

  let _x;
  for (let i = 0; i < numTokens.toI32(); i++) {
    if (i == tokenIndexFrom) {
      _x = x;
    } else if (i != tokenIndexTo) {
      _x = xp[i];
    } else {
      continue;
    }
    s = s.plus(_x);
    c = c.times(d).div(_x.times(numTokens));
    // If we were to protect the division loss we would have to keep the denominator separate
    // and divide at the end. However this leads to overflow with large numTokens or/and D.
    // c = c * D * D * D * ... overflow!
  }
  c = c.times(d).times(A_PRECISION).div(nA.times(numTokens));
  let b = s.plus(d.times(A_PRECISION).div(nA));
  let yPrev;
  let y = d;

  // iterative approximation
  for (let i = 0; i < 256; i++) {
    yPrev = y;
    y = y
      .times(y)
      .plus(c)
      .div(y.times(BigInt.fromI32(2)).plus(b).minus(d));
    if (within1(y, yPrev)) {
      return y;
    }
  }
  return BigInt.zero();
}

function _calculateSwap(
  stableSwap: StableSwap,
  tokenIndexFrom: number,
  tokenIndexTo: number,
  dx: BigInt,
  balances: BigInt[],
  timestamp: BigInt,
): { dy: BigInt; dyFee: BigInt } {
  let multipliers = stableSwap.tokenPrecisionMultipliers;
  let xp = _xpp(balances, multipliers);

  let x = dx.times(multipliers[tokenIndexFrom]).plus(xp[tokenIndexFrom]);
  let y = getY(_getAPrecise(stableSwap, timestamp), tokenIndexFrom, tokenIndexTo, x, xp);
  let dy = xp[tokenIndexTo].minus(y).minus(BigInt.fromI32(1));
  let dyFee = dy.times(stableSwap.swapFee!).div(BigInt.fromI32(10).pow(10));
  dy = dy.minus(dyFee).div(multipliers[tokenIndexTo]);

  return {
    dy,
    dyFee,
  };
}

function _calculateSwapInv(
  stableSwap: StableSwap,
  tokenIndexFrom: number,
  tokenIndexTo: number,
  dy: BigInt,
  balances: BigInt[],
  timestamp: BigInt,
): { dx: BigInt; dxFee: BigInt } {
  let multipliers = stableSwap.tokenPrecisionMultipliers;
  let xp = _xpp(balances, multipliers);

  let a = _getAPrecise(stableSwap, timestamp);
  let d0 = getD(xp, a);

  xp[tokenIndexTo] = xp[tokenIndexTo].minus(dy.times(multipliers[tokenIndexTo]));
  let x = getYD(a, tokenIndexFrom, xp, d0);
  let dx = x.plus(BigInt.fromI32(1)).minus(xp[tokenIndexFrom]);
  let dxFee = dx.times(stableSwap.swapFee!).div(BigInt.fromI32(10).pow(10));
  dx = dx.plus(dxFee).div(multipliers[tokenIndexFrom]);
  return {
    dx,
    dxFee,
  };
}

function _calculateRemoveLiquidity(balances: BigInt[], amount: BigInt, totalSupply: BigInt): BigInt[] {
  let numBalances = balances.length;
  let amounts = new Array<BigInt>(numBalances);

  for (let i = 0; i < numBalances; i++) {
    amounts[i] = balances[i].times(amount).div(totalSupply);
  }
  return amounts;
}

function calculateTokenAmount(stableSwap: StableSwap, amounts: BigInt[], deposit: boolean, timestamp: BigInt): BigInt {
  let balances = stableSwap.balances;
  let numBalances = balances.length;

  let a = _getAPrecise(stableSwap, timestamp);
  let multipliers = stableSwap.tokenPrecisionMultipliers;

  let d0 = getD(_xpp(balances, multipliers), a);
  for (let i = 0; i < numBalances; i++) {
    if (deposit) {
      balances[i] = balances[i].plus(amounts[i]);
    } else {
      balances[i] = balances[i].minus(amounts[i]);
    }
  }

  let d1 = getD(_xpp(balances, multipliers), a);
  let totalSupply = stableSwap.lpTokenSupply!;

  if (deposit) {
    return d1.minus(d0).times(totalSupply).div(d0);
  } else {
    return d0.minus(d1).times(totalSupply).div(d0);
  }
}

export function swapInternal(
  stableSwap: StableSwap,
  tokenIndexFrom: number,
  tokenIndexTo: number,
  dx: BigInt,
  minDy: BigInt,
  timestamp: BigInt,
): void {
  let balances = stableSwap.balances!;
  let { dy, dyFee } = _calculateSwap(stableSwap, tokenIndexFrom, tokenIndexTo, dx, balances, timestamp);

  let dyAdminFee = dyFee
    .times(stableSwap.adminFee!)
    .div(BigInt.fromI32(10).pow(10))
    .div(stableSwap.tokenPrecisionMultipliers[tokenIndexTo]);

  stableSwap.balances[tokenIndexFrom] = balances[tokenIndexFrom].plus(dx);
  stableSwap.balances[tokenIndexTo] = balances[tokenIndexTo].minus(dy).minus(dyAdminFee);

  if (!dyAdminFee.isZero()) {
    stableSwap.adminFees[tokenIndexTo] = stableSwap.adminFees[tokenIndexTo].plus(dyAdminFee);
  }

  stableSwap.invariant = getD(
    _xpp(stableSwap.balances, stableSwap.tokenPrecisionMultipliers),
    _getAPrecise(stableSwap, timestamp),
  );
  stableSwap.save();

  stableSwap.virtualPrice = getVirtualPrice(stableSwap.key);
  stableSwap.save();
}

export function swapInternalOut(
  stableSwap: StableSwap,
  tokenIndexFrom: number,
  tokenIndexTo: number,
  dy: BigInt,
  maxDx: BigInt,
  timestamp: BigInt,
): void {
  let balances = stableSwap.balances;
  let { dx, dxFee } = _calculateSwapInv(stableSwap, tokenIndexFrom, tokenIndexTo, dy, balances, timestamp);

  let dxAdminFee = dxFee
    .times(stableSwap.adminFee!)
    .div(BigInt.fromI32(10).pow(10))
    .div(stableSwap.tokenPrecisionMultipliers[tokenIndexFrom]);

  stableSwap.balances[tokenIndexFrom] = balances[tokenIndexFrom].plus(dx).minus(dxAdminFee);
  stableSwap.balances[tokenIndexTo] = balances[tokenIndexTo].minus(dy);

  if (!dxAdminFee.isZero()) {
    stableSwap.adminFees[tokenIndexFrom] = stableSwap.adminFees[tokenIndexFrom].plus(dxAdminFee);
  }

  stableSwap.invariant = getD(
    _xpp(stableSwap.balances, stableSwap.tokenPrecisionMultipliers),
    _getAPrecise(stableSwap, timestamp),
  );
  stableSwap.save();

  stableSwap.virtualPrice = getVirtualPrice(stableSwap.key);
  stableSwap.save();
}
