/* eslint-disable */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  Asset,
  AssetBalance,
  Router,
  StableSwap,
  PooledToken,
  SwapHourlyVolume,
  SwapDailyVolume,
  SwapWeeklyVolume,
} from "../../../../generated/schema";

import { decimal } from "@protofire/subgraph-toolkit";

/// MARK - Helpers
// eslint-disable-next-line @typescript-eslint/ban-types
export function getChainId(): BigInt {
  // try to get chainId from the mapping
  let network = dataSource.network();
  // eslint-disable-next-line @typescript-eslint/ban-types
  let chainId: BigInt;
  if (network == "mainnet") {
    chainId = BigInt.fromI32(1);
  } else if (network == "ropsten") {
    chainId = BigInt.fromI32(3);
  } else if (network == "rinkeby") {
    chainId = BigInt.fromI32(4);
  } else if (network == "goerli") {
    chainId = BigInt.fromI32(5);
  } else if (network == "kovan") {
    chainId = BigInt.fromI32(42);
  } else if (network == "bsc") {
    chainId = BigInt.fromI32(56);
  } else if (network == "chapel") {
    chainId = BigInt.fromI32(97);
  } else if (network == "gnosis") {
    chainId = BigInt.fromI32(100);
  } else if (network == "matic") {
    chainId = BigInt.fromI32(137);
  } else if (network == "fantom") {
    chainId = BigInt.fromI32(250);
  } else if (network == "optimism-goerli") {
    chainId = BigInt.fromI32(420);
  } else if (network == "optimism") {
    chainId = BigInt.fromI32(10);
  } else if (network == "mbase") {
    chainId = BigInt.fromI32(1287);
  } else if (network == "arbitrum-one") {
    chainId = BigInt.fromI32(42161);
  } else if (network == "fuji") {
    chainId = BigInt.fromI32(43113);
  } else if (network == "avalanche") {
    chainId = BigInt.fromI32(43114);
  } else if (network == "mumbai") {
    chainId = BigInt.fromI32(80001);
  } else if (network == "arbitrum-rinkeby") {
    chainId = BigInt.fromI32(421611);
  } else if (network == "arbitrum-goerli") {
    chainId = BigInt.fromI32(421613);
  } else {
    throw new Error(`No chainName for network ${network}`);
  }

  return chainId;
}

export function getOrCreateAsset(local: Address): Asset {
  let id = local.toHex();
  let asset = Asset.load(id);
  if (asset == null) {
    asset = new Asset(id);
    asset.key = new Bytes(32);
    asset.canonicalId = new Bytes(32);
    asset.canonicalDomain = new BigInt(0);
    asset.adoptedAsset = new Bytes(20);
    asset.localAsset = new Bytes(20);
    asset.blockNumber = new BigInt(0);
    asset.save();
  }
  return asset;
}

export function getOrCreateAssetBalance(local: Address, routerAddress: Address): AssetBalance {
  let localAsset = local.toHex();
  let assetBalanceId = localAsset + "-" + routerAddress.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);

  let router = Router.load(routerAddress.toHex());
  if (router == null) {
    router = new Router(routerAddress.toHex());
    router.isActive = true;
    router.save();
  }

  if (assetBalance == null) {
    let asset = getOrCreateAsset(local);

    assetBalance = new AssetBalance(assetBalanceId);
    assetBalance.asset = asset.id;
    assetBalance.router = router.id;
    assetBalance.amount = new BigInt(0);
    assetBalance.feesEarned = new BigInt(0);
  }
  return assetBalance;
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

export function getOrCreateStableSwapLiquidity(provider: Address): StableSwapLiquidity {
  let stableSwapLiquidityId = provider.toHex();
  let stableSwapLiquidity = StableSwapLiquidity.load(stableSwapLiquidityId);

  if (stableSwapLiquidity == null) {
    stableSwapLiquidity = new StableSwapLiquidity(stableSwapLiquidityId);
    stableSwapLiquidity.provider = provider;
    stableSwapLiquidity.stableSwap = new Bytes(32).toHex();
    stableSwapLiquidity.tokenAmounts = [];
    stableSwapLiquidity.fees = [];
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
