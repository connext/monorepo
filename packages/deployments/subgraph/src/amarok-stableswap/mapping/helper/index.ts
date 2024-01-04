/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, Bytes, ethereum, log } from "@graphprotocol/graph-ts";
import { decimal } from "@protofire/subgraph-toolkit";

import {
  SystemInfo,
  StableSwap,
  PooledToken,
  SwapHourlyVolume,
  SwapDailyVolume,
  SwapWeeklyVolume,
  LpToken,
  LpAccount,
  LpAccountBalance,
} from "../../../../generated/schema";
import { LpToken as LpTokenTemplate } from "../../../../generated/templates";

export function getSystemInfo(): SystemInfo {
  let state = SystemInfo.load("current");

  if (state == null) {
    state = new SystemInfo("current");

    state.exchangeCount = BigInt.fromI32(0);
    state.swapCount = BigInt.fromI32(0);
  }

  return state;
}

export function getOrCreateStableSwap(_stableSwapKey: Bytes): StableSwap {
  const stableSwapId = _stableSwapKey.toHex();
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
    stableSwap.virtualPrice = BigInt.zero();

    stableSwap.save();

    const system = getSystemInfo();
    system.swapCount = system.swapCount.plus(BigInt.fromI32(1));
    system.save();
  }

  return stableSwap;
}

export function getStableSwapCurrentA(stableSwapKey: Bytes, timestamp: BigInt): BigInt {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);

  const t1 = stableSwap.futureATime!; // time when ramp is finished
  const a1 = stableSwap.futureA!; // final A value when ramp is finished

  if (timestamp.lt(t1)) {
    const t0 = stableSwap.initialATime!; // time when ramp is started
    const a0 = stableSwap.initialA!; // initial A value when ramp is started
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

export function getVirtualPriceEx(invariant: BigInt, lpTokenSupply: BigInt): BigInt {
  if (lpTokenSupply.isZero()) {
    return BigInt.zero();
  }
  return invariant.times(BigInt.fromI32(10).pow(18)).div(lpTokenSupply);
}

export function getVirtualPrice(stableSwapKey: Bytes): BigInt {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);
  const lpTokenSupply = stableSwap.lpTokenSupply;

  return getVirtualPriceEx(stableSwap.invariant, lpTokenSupply);
}

export function getOrCreatePooledToken(asset: Address): PooledToken {
  const pooledTokenId = asset.toHex();
  let pooledToken = PooledToken.load(pooledTokenId);

  if (pooledToken == null) {
    pooledToken = new PooledToken(pooledTokenId);
    pooledToken.asset = asset;
    pooledToken.save();
  }

  return pooledToken;
}

export function getSwapHourlyTradeVolume(stableSwap: StableSwap, timestamp: BigInt): SwapHourlyVolume {
  const interval = BigInt.fromI32(60 * 60);
  const hour = timestamp.div(interval).times(interval);
  const id = stableSwap.id + "-hour-" + hour.toString();

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
  const interval = BigInt.fromI32(60 * 60 * 24);
  const day = timestamp.div(interval).times(interval);
  const id = stableSwap.id + "-day-" + day.toString();

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
  const interval = BigInt.fromI32(60 * 60 * 24 * 7);
  const week = timestamp.div(interval).times(interval);
  const id = stableSwap.id + "-week-" + week.toString();

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
function within1(a: BigInt, b: BigInt): boolean {
  const difference = a.gt(b) ? a.minus(b) : b.minus(a);
  return difference.lt(BigInt.fromI32(2)); // instead of <=1
}

function _getAPrecise(stableSwap: StableSwap, timestamp: BigInt): BigInt {
  return getStableSwapCurrentA(stableSwap.key, timestamp);
}

function _xp(stableSwap: StableSwap): BigInt[] {
  const numTokens = stableSwap.balances.length;
  const xp: BigInt[] = [];
  for (let i = 0; i < numTokens; i++) {
    xp.push(stableSwap.balances[i].times(stableSwap.tokenPrecisionMultipliers[i]));
  }
  return xp;
}

function _xpp(balances: BigInt[], precisionMultipliers: BigInt[]): BigInt[] {
  const numTokens = balances.length;
  const xp = new Array<BigInt>(numTokens);
  for (let i = 0; i < numTokens; i++) {
    xp[i] = balances[i].times(precisionMultipliers[i]);
  }
  return xp;
}

function _feePerToken(swapFee: BigInt, numTokens: BigInt): BigInt {
  return swapFee.times(numTokens).div(numTokens.minus(BigInt.fromI32(1)).times(BigInt.fromI32(4)));
}

export function calculateWithdrawOneToken(
  stableSwap: StableSwap,
  tokenAmount: BigInt,
  tokenIndex: BigInt,
  timestamp: BigInt,
): BigInt {
  const res = _calculateWithdrawOneToken(stableSwap, tokenAmount, tokenIndex, stableSwap.lpTokenSupply, timestamp);

  return res[0];
}

function _calculateWithdrawOneToken(
  stableSwap: StableSwap,
  tokenAmount: BigInt,
  tokenIndex: BigInt,
  totalSupply: BigInt,
  timestamp: BigInt,
): BigInt[] {
  const res = calculateWithdrawOneTokenDY(stableSwap, tokenIndex, tokenAmount, totalSupply, timestamp);

  const dyFee = res[2].minus(res[1]).div(stableSwap.tokenPrecisionMultipliers[tokenIndex.toI32()]).minus(res[0]);

  return [res[0], dyFee];
}

export function calculateWithdrawOneTokenDY(
  stableSwap: StableSwap,
  tokenIndex: BigInt,
  tokenAmount: BigInt,
  totalSupply: BigInt,
  timestamp: BigInt,
): BigInt[] {
  // Get the current D, then solve the stableswap invariant
  // y_i for D - tokenAmount
  const xp: BigInt[] = _xp(stableSwap);

  const v_preciseA = _getAPrecise(stableSwap, timestamp);
  const v_d0 = getD(xp, v_preciseA);
  const v_d1 = v_d0.minus(tokenAmount.times(v_d0).div(totalSupply));

  const v_newY = getYD(v_preciseA, tokenIndex, xp, v_d1);

  const xpReduced = new Array<BigInt>(xp.length);

  const v_feePerToken = _feePerToken(stableSwap.swapFee!, BigInt.fromI32(xp.length));
  // TODO: Set a length variable (at top) instead of reading xp.length on each loop.
  const len = xp.length;
  for (let i = 0; i < len; i++) {
    const xpi = xp[i];
    // if i == tokenIndex, dxExpected = xp[i] * d1 / d0 - newY
    // else dxExpected = xp[i] - (xp[i] * d1 / d0)
    // xpReduced[i] -= dxExpected * fee / FEE_DENOMINATOR
    xpReduced[i] = xpi.minus(
      (i == tokenIndex.toI32() ? xpi.times(v_d1).div(v_d0).minus(v_newY) : xpi.minus(xpi.times(v_d1).div(v_d0)))
        .times(v_feePerToken)
        .div(BigInt.fromI32(10).pow(10)),
    );
  }

  let dy = xpReduced[tokenIndex.toI32()].minus(getYD(v_preciseA, tokenIndex, xpReduced, v_d1));
  dy = dy.minus(BigInt.fromI32(1)).div(stableSwap.tokenPrecisionMultipliers[tokenIndex.toI32()]);

  return [dy, v_newY, xp[tokenIndex.toI32()]];
}

export function getYD(a: BigInt, tokenIndex: BigInt, xp: BigInt[], d: BigInt): BigInt {
  const numTokens = xp.length;

  let c = d;
  let s = BigInt.zero();
  const nA = a.times(BigInt.fromI32(numTokens));

  for (let i = 0; i < numTokens; i++) {
    if (i != tokenIndex.toI32()) {
      s = s.plus(xp[i]);
      c = c.times(d).div(xp[i].times(BigInt.fromI32(numTokens)));
      // If we were to protect the division loss we would have to keep the denominator separate
      // and divide at the end. However this leads to overflow with large numTokens or/and D.
      // c = c * D * D * D * ... overflow!
    }
  }
  const A_PRECISION = BigInt.fromI32(100);
  c = c
    .times(d)
    .times(A_PRECISION)
    .div(nA.times(BigInt.fromI32(numTokens)));

  const b = s.plus(d.times(A_PRECISION).div(nA));
  let yPrev: BigInt;
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
  const numTokens = BigInt.fromI32(xp.length);
  let s = BigInt.zero();
  for (let i = 0; i < numTokens.toI32(); i++) {
    s = s.plus(xp[i]);
  }

  if (s.isZero()) {
    return BigInt.zero();
  }

  let prevD: BigInt;
  let d = s;
  const nA = a.times(numTokens);
  const A_PRECISION = BigInt.fromI32(100);

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

export function getY(preciseA: BigInt, tokenIndexFrom: BigInt, tokenIndexTo: BigInt, x: BigInt, xp: BigInt[]): BigInt {
  const numTokens = BigInt.fromI32(xp.length);

  const d = getD(xp, preciseA);
  let c = d;
  let s = BigInt.zero();
  const nA = numTokens.times(preciseA);
  const A_PRECISION = BigInt.fromI32(100);

  let _x: BigInt;
  for (let i = 0; i < numTokens.toI32(); i++) {
    if (i == tokenIndexFrom.toI32()) {
      _x = x;
    } else if (i != tokenIndexTo.toI32()) {
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
  const b = s.plus(d.times(A_PRECISION).div(nA));
  let yPrev: BigInt;
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
  tokenIndexFrom: BigInt,
  tokenIndexTo: BigInt,
  dx: BigInt,
  balances: BigInt[],
  timestamp: BigInt,
): BigInt[] {
  const multipliers = stableSwap.tokenPrecisionMultipliers;
  const xp = _xpp(balances, multipliers);

  const x = dx.times(multipliers[tokenIndexFrom.toI32()]).plus(xp[tokenIndexFrom.toI32()]);
  const y = getY(_getAPrecise(stableSwap, timestamp), tokenIndexFrom, tokenIndexTo, x, xp);
  let dy = xp[tokenIndexTo.toI32()].minus(y).minus(BigInt.fromI32(1));
  const dyFee = dy.times(stableSwap.swapFee!).div(BigInt.fromI32(10).pow(10));
  dy = dy.minus(dyFee).div(multipliers[tokenIndexTo.toI32()]);

  return [dy, dyFee];
}

export function swap(
  stableSwapKey: Bytes,
  tokenIndexFrom: BigInt,
  tokenIndexTo: BigInt,
  dx: BigInt,
  dy: BigInt,
  timestamp: BigInt,
): StableSwap {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);
  const balances = stableSwap.balances;

  const res = _calculateSwap(stableSwap, tokenIndexFrom, tokenIndexTo, dx, balances, timestamp);

  const dyAdminFee = res[1]
    .times(stableSwap.adminFee!)
    .div(BigInt.fromI32(10).pow(10))
    .div(stableSwap.tokenPrecisionMultipliers[tokenIndexTo.toI32()]);

  const newBalances = new Array<BigInt>(balances.length);
  newBalances[tokenIndexFrom.toI32()] = balances[tokenIndexFrom.toI32()].plus(dx);
  newBalances[tokenIndexTo.toI32()] = balances[tokenIndexTo.toI32()].minus(dy).minus(dyAdminFee);

  stableSwap.balances = newBalances;
  stableSwap.invariant = getD(
    _xpp(stableSwap.balances, stableSwap.tokenPrecisionMultipliers),
    _getAPrecise(stableSwap, timestamp),
  );
  stableSwap.virtualPrice = getVirtualPriceEx(stableSwap.invariant, stableSwap.lpTokenSupply);
  stableSwap.save();

  return stableSwap;
  // log.warning("Swap Saved!, {}, {}, {}, {} ,{}, {}, {}, {}, {}, {}, {}, {}, {}", [
  //   stableSwapKey.toHexString(),
  //   tokenIndexFrom.toString(),
  //   tokenIndexTo.toString(),
  //   dx.toString(),
  //   dy.toString(),
  //   dyAdminFee.toString(),
  //   balances[tokenIndexFrom.toI32()].toString(),
  //   balances[tokenIndexTo.toI32()].toString(),
  //   stableSwap.balances[tokenIndexFrom.toI32()].toString(),
  //   stableSwap.balances[tokenIndexTo.toI32()].toString(),
  //   stableSwap.invariant.toString(),
  //   stableSwap.virtualPrice.toString(),
  //   timestamp.toString(),
  // ]);
}

export function addLiquidity(
  stableSwapKey: Bytes,
  amounts: BigInt[],
  fees: BigInt[],
  invariant: BigInt,
  lpTokenSupply: BigInt,
): StableSwap {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);
  const balances = stableSwap.balances;

  const newBalances = new Array<BigInt>(balances.length);
  for (let i = 0; i < balances.length; i++) {
    newBalances[i] = balances[i].plus(amounts[i]);

    if (!stableSwap.lpTokenSupply.isZero()) {
      const adminFee = fees[i].times(stableSwap.adminFee!).div(BigInt.fromI32(10).pow(10));
      newBalances[i] = newBalances[i].minus(adminFee);
    }
  }

  stableSwap.balances = newBalances;
  stableSwap.invariant = invariant;
  stableSwap.lpTokenSupply = lpTokenSupply;
  stableSwap.virtualPrice = getVirtualPriceEx(stableSwap.invariant, stableSwap.lpTokenSupply);
  stableSwap.save();

  return stableSwap;
  // log.warning("Liquidity Added!, {}, {}, {}, {} ,{}, {}, {}, {}, {}, {}", [
  //   stableSwapKey.toHexString(),
  //   amounts[0].toString(),
  //   amounts[1].toString(),
  //   fees[0].toString(),
  //   fees[1].toString(),
  //   stableSwap.balances[0].toString(),
  //   stableSwap.balances[1].toString(),
  //   stableSwap.lpTokenSupply.toString(),
  //   stableSwap.invariant.toString(),
  //   stableSwap.virtualPrice.toString(),
  // ]);
}

export function removeLiquidity(
  stableSwapKey: Bytes,
  amounts: BigInt[],
  lpTokenSupply: BigInt,
  timestamp: BigInt,
): StableSwap {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);
  const balances = stableSwap.balances;

  const newBalances = new Array<BigInt>(balances.length);
  for (let i = 0; i < amounts.length; i++) {
    newBalances[i] = balances[i].minus(amounts[i]);
  }

  stableSwap.balances = newBalances;
  stableSwap.lpTokenSupply = lpTokenSupply;
  stableSwap.invariant = getD(
    _xpp(stableSwap.balances, stableSwap.tokenPrecisionMultipliers),
    _getAPrecise(stableSwap, timestamp),
  );
  stableSwap.virtualPrice = getVirtualPriceEx(stableSwap.invariant, stableSwap.lpTokenSupply);
  stableSwap.save();

  return stableSwap;
  // log.warning("Liquidity Removed!, {}, {}, {}, {} ,{}, {}, {}, {}, {}, {}, {}", [
  //   stableSwapKey.toHexString(),
  //   amounts[0].toString(),
  //   amounts[1].toString(),
  //   balances[0].toString(),
  //   balances[1].toString(),
  //   stableSwap.balances[0].toString(),
  //   stableSwap.balances[1].toString(),
  //   stableSwap.lpTokenSupply.toString(),
  //   stableSwap.invariant.toString(),
  //   stableSwap.virtualPrice.toString(),
  //   timestamp.toString(),
  // ]);
}

export function removeLiquidityImbalance(
  stableSwapKey: Bytes,
  amounts: BigInt[],
  fees: BigInt[],
  invariant: BigInt,
  lpTokenSupply: BigInt,
): StableSwap {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);

  const newBalances = new Array<BigInt>(stableSwap.balances.length);
  for (let i = 0; i < amounts.length; i++) {
    const adminFee = fees[i].times(stableSwap.adminFee!).div(BigInt.fromI32(10).pow(10));
    newBalances[i] = stableSwap.balances[i].minus(amounts[i]).minus(adminFee);
  }

  stableSwap.balances = newBalances;
  stableSwap.lpTokenSupply = lpTokenSupply;
  stableSwap.invariant = invariant;

  stableSwap.virtualPrice = getVirtualPriceEx(stableSwap.invariant, stableSwap.lpTokenSupply);
  stableSwap.save();

  return stableSwap;
}

export function removeLiquidityOneToken(
  stableSwapKey: Bytes,
  lpTokenAmount: BigInt,
  lpTokenSupply: BigInt,
  boughtId: BigInt,
  tokensBought: BigInt,
  timestamp: BigInt,
): StableSwap {
  const stableSwap = getOrCreateStableSwap(stableSwapKey);

  const newBalances = new Array<BigInt>(stableSwap.balances.length);

  const res = _calculateWithdrawOneToken(stableSwap, lpTokenAmount, boughtId, lpTokenSupply, timestamp);
  const adminFee = res[1].times(stableSwap.adminFee!).div(BigInt.fromI32(10).pow(10));

  for (let i = 0; i < newBalances.length; i++) {
    if (i === boughtId.toI32()) {
      newBalances[i] = stableSwap.balances[i].minus(tokensBought).minus(adminFee);
    } else {
      newBalances[i] = stableSwap.balances[i];
    }
  }

  stableSwap.balances = newBalances;
  stableSwap.lpTokenSupply = lpTokenSupply.minus(lpTokenAmount);
  stableSwap.invariant = getD(
    _xpp(stableSwap.balances, stableSwap.tokenPrecisionMultipliers),
    _getAPrecise(stableSwap, timestamp),
  );
  stableSwap.virtualPrice = getVirtualPriceEx(stableSwap.invariant, stableSwap.lpTokenSupply);

  stableSwap.save();

  return stableSwap;
}

export function createLpToken(poolId: string, address: Address): void {
  if (address != Address.zero()) {
    // Persist token data if it doesn't already exist
    let token = LpToken.load(address.toHex());

    if (token == null) {
      token = new LpToken(address.toHex());
      token.stableSwap = poolId;
      token.address = address;
      token.name = "Lp Token";
      token.symbol = "LP";
      token.decimals = 18;
      token.totalSupply = decimal.ZERO;

      token.save();

      // Start indexing token events
      LpTokenTemplate.create(address);
    } else {
      log.warning("Lp Token {} already in registry", [address.toHex()]);
    }
  }
}
export function getOrCreateLpAccount(accountAddress: Bytes): LpAccount {
  const accountId = accountAddress.toHex();
  const existingAccount = LpAccount.load(accountId);

  if (existingAccount != null) {
    return existingAccount;
  }

  const newAccount = new LpAccount(accountId);
  newAccount.address = accountAddress;

  return newAccount;
}

export function getOrCreateLpAccountBalance(account: LpAccount, token: LpToken): LpAccountBalance {
  const balanceId = account.id + "-" + token.id;
  const previousBalance = LpAccountBalance.load(balanceId);

  if (previousBalance != null) {
    return previousBalance;
  }

  const newBalance = new LpAccountBalance(balanceId);
  newBalance.account = account.id;
  newBalance.token = token.id;
  newBalance.amount = decimal.ZERO;

  return newBalance;
}

export function generateNonce(event: ethereum.Event): BigInt {
  return event.block.timestamp.times(BigInt.fromI32(10000)).plus(event.logIndex);
}
