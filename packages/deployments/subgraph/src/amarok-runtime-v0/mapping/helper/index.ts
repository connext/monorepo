/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import { Asset, AssetBalance, Router } from "../../../../generated/schema";

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
  } else if (network == "xdai") {
    chainId = BigInt.fromI32(100);
  } else if (network == "matic") {
    chainId = BigInt.fromI32(137);
  } else if (network == "fantom") {
    chainId = BigInt.fromI32(250);
  } else if (network == "optimism-goerli") {
    chainId = BigInt.fromI32(420);
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
  }
  return assetBalance;
}
