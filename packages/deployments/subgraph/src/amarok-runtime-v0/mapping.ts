/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  LiquidityAdded,
  LiquidityRemoved,
  XCalled,
  Executed,
  Reconciled,
  AssetAdded,
} from "../../generated/Connext/ConnextLogic";
import {
  RouterRemoved,
  RouterAdded,
  RouterOwnerAccepted,
  RouterOwnerProposed,
  RouterRecipientSet,
} from "../../generated/RouterPermissionsManagerLogic/RouterPermissionsManagerLogic";
import { Asset, AssetBalance, Router, OriginTransfer, DestinationTransfer } from "../../generated/schema";

export function handleRouterAdded(event: RouterAdded): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);

  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.isActive = true;
    router.save();
  }
}

export function handleRouterRemoved(event: RouterRemoved): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    throw new Error(`No router found when trying to remove`);
  }
  router.isActive = false;
  router.save();
}

export function handleRouterRecipientSet(event: RouterRecipientSet): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    throw new Error(`No router found when trying to update recipient`);
  }
  router.recipient = event.params.newRecipient;
  router.save();
}

export function handleRouterOwnerProposed(event: RouterOwnerProposed): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    throw new Error(`No router found when trying to propose owner`);
  }
  router.proposedOwner = event.params.newProposed;
  router.proposedTimestamp = event.block.timestamp;
  router.save();
}

export function handleRouterOwnerAccepted(event: RouterOwnerAccepted): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    throw new Error(`No router found when trying to accept owner`);
  }
  router.owner = event.params.newOwner;
  router.proposedOwner = null;
  router.proposedTimestamp = null;
  router.save();
}

export function handleAssetAdded(event: AssetAdded): void {
  let assetId = event.params.supportedAsset.toHex();
  let asset = Asset.load(assetId);
  if (asset == null) {
    asset = new Asset(assetId);
  }
  asset.local = event.params.supportedAsset;
  asset.adoptedAsset = event.params.adoptedAsset;
  asset.canonicalId = event.params.canonicalId;
  asset.canonicalDomain = event.params.domain;
  asset.blockNumber = event.block.number;
  asset.save();
}

/**
 * Updates the subgraph records when LiquidityAdded events are emitted. Will create a Router record if it does not exist
 *
 * @param event - The contract event to update the subgraph record with
 */
export function handleLiquidityAdded(event: LiquidityAdded): void {
  const assetBalance = getOrCreateAssetBalance(event.params.local, event.params.router);

  // add new amount
  assetBalance.amount = assetBalance.amount.plus(event.params.amount);

  // save
  assetBalance.save();
}

/**
 * Updates the subgraph records when LiquidityRemoved events are emitted.
 *
 * @param event - The contract event to update the subgraph record with
 */
export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  // ID is of the format ROUTER_ADDRESS-ASSET_ID
  const assetBalance = getOrCreateAssetBalance(event.params.local, event.params.router);

  // update amount
  assetBalance.amount = assetBalance.amount.minus(event.params.amount);

  // save
  assetBalance.save();
}

/**
 * Creates subgraph records when TransactionPrepared events are emitted.
 *
 * @param event - The contract event used to create the subgraph record
 */
export function handleXCalled(event: XCalled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  // NOTE: the above case is not always true since malicious users can reuse IDs to try to break the
  // subgraph. we can protect against this by overwriting if we are able to load a Transactioln
  let transfer = OriginTransfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new OriginTransfer(event.params.transferId.toHexString());
  }

  // Meta
  transfer.originDomain = event.params.xcallArgs.params.originDomain;
  transfer.destinationDomain = event.params.xcallArgs.params.destinationDomain;
  transfer.chainId = getChainId();

  // Transfer Data
  transfer.transferId = event.params.transferId;
  transfer.to = event.params.xcallArgs.params.to;
  transfer.nonce = event.params.nonce;
  transfer.callData = event.params.xcallArgs.params.callData;
  transfer.transactingAsset = event.params.args.transactingAssetId;
  transfer.bridgedAsset = event.params.args.bridged;
  transfer.amount = event.params.args.amount;
  transfer.bridgedAmount = event.params.args.bridgedAmt;
  transfer.relayerFee = event.params.xcallArgs.relayerFee;
  transfer.caller = event.params.caller;
  transfer.message = event.params.message;

  // Transaction XCalled
  transfer.transactionHash = event.transaction.hash;
  transfer.timestamp = event.block.timestamp;
  transfer.gasPrice = event.transaction.gasPrice;
  transfer.gasLimit = event.transaction.gasLimit;
  transfer.blockNumber = event.block.number;

  transfer.save();
}

/**
 * Updates subgraph records when Fulfilled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleExecuted(event: Executed): void {
  const num = event.params.args.routers.length;
  const routers: string[] = [];
  for (let i = 0; i < num; i++) {
    const param = event.params.args.routers[i].toHex();
    let router = Router.load(param);
    if (router == null) {
      // TODO: Shouldn't we be throwing an error here? How did a transfer get made with a non-existent
      // router?
      router = new Router(param);
      router.save();
    }
    routers.push(router.id as string);
  }

  let transfer = DestinationTransfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new DestinationTransfer(event.params.transferId.toHexString());
  }

  // Meta
  transfer.originDomain = event.params.args.params.originDomain;
  transfer.destinationDomain = event.params.args.params.destinationDomain;
  transfer.chainId = getChainId();
  if (transfer.status === "Reconciled") {
    transfer.status = "Completed";
  } else {
    transfer.status = "Executed";
  }

  // Transfer Data
  transfer.transferId = event.params.transferId;
  transfer.to = event.params.args.params.to;
  transfer.callData = event.params.args.params.callData;
  transfer.localAsset = event.params.args.local;
  transfer.routers = routers;
  transfer.nonce = event.params.args.nonce;

  // Executed
  transfer.transactingAmount = event.params.transactingAmount;
  transfer.transactingAsset = event.params.transactingAsset;
  transfer.originSender = event.params.args.originSender;

  transfer.executedAmount = event.params.args.amount;
  transfer.executedCaller = event.params.caller;

  // TransactionFulfilled
  transfer.executedTransactionHash = event.transaction.hash;
  transfer.executedTimestamp = event.block.timestamp;
  transfer.executedGasPrice = event.transaction.gasPrice;
  transfer.executedGasLimit = event.transaction.gasLimit;
  transfer.executedBlockNumber = event.block.number;

  transfer.save();
}

/**
 * Updates subgraph records when Reconciled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleReconciled(event: Reconciled): void {
  let transfer = DestinationTransfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new DestinationTransfer(event.params.transferId.toHexString());
  }

  const routers: string[] = [];
  if (transfer.routers !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const r: string[] = transfer.routers!;
    const n = r.length;
    for (let i = 0; i < n; i++) {
      const router: string = r[i];
      routers.push(router);
    }
  }

  // Meta
  transfer.chainId = getChainId();

  if (transfer.status === "Executed") {
    transfer.status = "Completed";
  } else {
    transfer.status = "Reconciled";
  }
  // If the routers have already been set by an execute event, don't overwrite them.
  transfer.routers = routers;

  // Transfer Data
  transfer.originDomain = event.params.origin;
  transfer.transferId = event.params.transferId;
  transfer.reconciledAsset = event.params.asset;
  transfer.reconciledAmount = event.params.amount;
  transfer.reconciledCaller = event.params.caller;

  // TransactionFulfilled
  transfer.reconciledTransactionHash = event.transaction.hash;
  transfer.reconciledTimestamp = event.block.timestamp;
  transfer.reconciledGasPrice = event.transaction.gasPrice;
  transfer.reconciledGasLimit = event.transaction.gasLimit;
  transfer.reconciledBlockNumber = event.block.number;

  transfer.save();
}

function getChainId(): BigInt {
  // try to get chainId from the mapping
  let network = dataSource.network();
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

function getOrCreateAssetBalance(local: Bytes, routerAddress: Address): AssetBalance {
  let assetBalanceId = local.toHex() + "-" + routerAddress.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);

  let router = Router.load(routerAddress.toHex());
  if (router == null) {
    router = new Router(routerAddress.toHex());
    router.save();
  }

  if (assetBalance == null) {
    let asset = Asset.load(local.toHex());
    if (asset == null) {
      asset = new Asset(local.toHex());
      asset.local = local;
      asset.adoptedAsset = new Bytes(20);
      asset.canonicalId = new Bytes(32);
      asset.canonicalDomain = new BigInt(0);
      asset.blockNumber = new BigInt(0);
      asset.save();
    }

    assetBalance = new AssetBalance(assetBalanceId);
    assetBalance.asset = asset.id;
    assetBalance.router = router.id;
    assetBalance.amount = new BigInt(0);
  }
  return assetBalance;
}
