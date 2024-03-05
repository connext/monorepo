/* eslint-disable */
import { Address, BigInt, Bytes, dataSource, ethereum } from "@graphprotocol/graph-ts";

import { ERC20 } from "../../../../generated/Connext/ERC20";
import {
  Asset,
  AssetBalance,
  RelayerFee,
  RelayerFeesIncrease,
  Router,
  RouterDailyTVL,
} from "../../../../generated/schema";

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
  } else if (network == "zksync2-testnet") {
    chainId = BigInt.fromI32(280);
  } else if (network == "linea-goerli") {
    chainId = BigInt.fromI32(59140);
  } else if (network == "linea-mainnet") {
    chainId = BigInt.fromI32(59144);
  } else if (network == "polygon-zkevm-testnet") {
    chainId = BigInt.fromI32(1442);
  } else if (network == "polygon-zkevm") {
    chainId = BigInt.fromI32(1101);
  } else if (network == "base-testnet") {
    chainId = BigInt.fromI32(84531);
  } else if (network == "base") {
    chainId = BigInt.fromI32(8453);
  } else if (network == "zksync-era") {
    chainId = BigInt.fromI32(324);
  } else if (network == "xgon") {
    chainId = BigInt.fromI32(195);
  } else if (network == "mantle") {
    chainId = BigInt.fromI32(5000);
  } else if (network == "metis") {
    chainId = BigInt.fromI32(1088);
  } else if (network == "mode-mainnet") {
    chainId = BigInt.fromI32(34443);
  } else if (network == "scroll") {
    chainId = BigInt.fromI32(534352);
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
    assetBalance.locked = new BigInt(0);
    assetBalance.supplied = new BigInt(0);
    assetBalance.removed = new BigInt(0);
    assetBalance.feesEarned = new BigInt(0);
  }
  return assetBalance;
}

export function getOrCreateTransferRelayFee(transferId: string, asset: Bytes): RelayerFee {
  const relayerFeeKey = `${transferId}-${asset.toHexString()}`;
  let relayerFee = RelayerFee.load(relayerFeeKey);
  if (relayerFee == null) {
    relayerFee = new RelayerFee(relayerFeeKey);
    relayerFee.transfer = transferId;
    relayerFee.asset = asset;
    relayerFee.fee = new BigInt(0);
  }
  return relayerFee;
}

export function getOrCreateTransferRelayFeeIncrease(
  transferId: string,
  asset: string,
  event: ethereum.Event,
): RelayerFeesIncrease {
  const relayerFeeKey = `${transferId}-${asset}-${event.transaction.hash.toHexString()}`;
  let relayerFeesIncrease = RelayerFeesIncrease.load(relayerFeeKey);
  if (relayerFeesIncrease == null) {
    relayerFeesIncrease = new RelayerFeesIncrease(relayerFeeKey);

    // tx
    relayerFeesIncrease.caller = event.transaction.from;
    relayerFeesIncrease.blockNumber = event.block.number;
    relayerFeesIncrease.timestamp = event.block.timestamp;
    relayerFeesIncrease.transactionHash = event.transaction.hash;
    relayerFeesIncrease.gasLimit = event.transaction.gasLimit;
    relayerFeesIncrease.gasPrice = event.transaction.gasPrice;
  }
  return relayerFeesIncrease;
}

export function getRouterDailyTVL(local: Address, routerAddress: Address, timestamp: BigInt): RouterDailyTVL | null {
  let asset = Asset.load(local.toHex());
  let router = Router.load(routerAddress.toHex());

  if (router == null || asset == null) {
    return null;
  }

  const interval = BigInt.fromI32(60 * 60 * 24);
  const day = timestamp.div(interval).times(interval);
  const id = routerAddress.toHex() + "-" + local.toHex() + "-day-" + day.toString();

  let tvl = RouterDailyTVL.load(id);

  if (tvl == null) {
    tvl = new RouterDailyTVL(id);
    tvl.router = router.id;
    tvl.asset = asset.id;
    tvl.timestamp = day;
    tvl.balance = new BigInt(0);
  }

  return tvl;
}

export function getTokenDecimals(tokenAddress: Address): BigInt {
  let token = ERC20.bind(tokenAddress);
  let result = token.try_decimals();

  return BigInt.fromI32(result.value);
}

export function generateTxNonce(event: ethereum.Event): BigInt {
  return event.block.timestamp.times(BigInt.fromI32(10000)).plus(event.logIndex);
}
