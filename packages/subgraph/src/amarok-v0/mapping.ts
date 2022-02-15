/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  LiquidityAdded,
  LiquidityRemoved,
  Prepared,
  Fulfilled,
  Reconciled,
  RouterAdded,
  RouterRemoved,
  StableSwapAdded,
  AssetAdded,
  AssetRemoved,
} from "../../generated/TransactionManager/TransactionManager";
import { AssetBalance, Router, Transaction } from "../../generated/schema";

export function handleRouterAdded(event: RouterAdded): void {
  let router = Router.load(event.params.router.toHex());
  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.save();
  }
}

export function handleRouterRemoved(_event: RouterRemoved): void {}

export function handleStableSwapAdded(_event: StableSwapAdded): void {}

export function handleAssetAdded(_event: AssetAdded): void {}

export function handleAssetRemoved(_event: AssetRemoved): void {}

/**
 * Updates the subgraph records when LiquidityAdded events are emitted. Will create a Router record if it does not exist
 *
 * @param event - The contract event to update the subgraph record with
 */
export function handleLiquidityAdded(event: LiquidityAdded): void {
  let router = Router.load(event.params.router.toHex());
  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.save();
  }

  // ID is of the format ROUTER_ADDRESS-LOCAL
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
export function handlePrepared(event: Prepared): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  // NOTE: the above case is not always true since malicious users can reuse IDs to try to break the
  // subgraph. we can protect against this by overwriting if we are able to load a Transactioln
  let transaction = Transaction.load(event.params.transactionId.toHexString());
  if (transaction == null) {
    transaction = new Transaction(event.params.transactionId.toHexString());
  }

  // Meta
  transaction.originDomain = event.params.params.originDomain;
  transaction.destinationDomain = event.params.params.destinationDomain;
  transaction.chainId = getChainId();
  transaction.status = "Prepared";

  // Transfer Data
  transaction.nonce = event.params.nonce;
  transaction.transactionId = event.params.transactionId;
  transaction.recipient = event.params.recipient;
  transaction.transactingAsset = event.params.transactingAsset;
  transaction.localAsset = event.params.localAsset;

  // Prepared
  transaction.prepareCaller = event.params.caller;
  transaction.prepareTransactingAmount = event.params.transactingAmount;
  transaction.prepareLocalAmount = event.params.localAmount;
  transaction.callTo = event.params.params.callTo;
  transaction.callData = event.params.params.callData;

  // TransactionPrepared
  transaction.prepareTransactionHash = event.transaction.hash;
  transaction.prepareGasPrice = event.transaction.gasPrice;
  transaction.prepareGasLimit = event.transaction.gasLimit;

  transaction.save();
}

/**
 * Updates subgraph records when Fulfilled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleFulfilled(event: Fulfilled): void {
  let transaction = Transaction.load(event.params.transactionId.toHexString());
  if (transaction == null) {
    transaction = new Transaction(event.params.transactionId.toHexString());

    // Meta
    transaction.originDomain = event.params.params.originDomain;
    transaction.destinationDomain = event.params.params.destinationDomain;
    transaction.chainId = getChainId();
    transaction.status = "Prepared";

    // Transfer Data
    transaction.nonce = event.params.nonce;
    transaction.transactionId = event.params.transactionId;
    transaction.recipient = event.params.recipient;
    transaction.transactingAsset = event.params.transactingAsset;
    transaction.localAsset = event.params.localAsset;
  }

  // Fulfill
  transaction.fulfillCaller = event.params.caller;
  transaction.fulfillTransactingAmount = event.params.transactingAmount;
  transaction.fulfillLocalAmount = event.params.localAmount;

  // TransactionFulfilled
  transaction.fulfillTransactionHash = event.transaction.hash;
  transaction.fulfillTimestamp = event.block.timestamp;
  transaction.fulfillGasPrice = event.transaction.gasPrice;
  transaction.fulfillGasLimit = event.transaction.gasLimit;
  transaction.status = "Reconciled";

  transaction.save();
}

/**
 * Updates subgraph records when Reconciled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleReconciled(event: Reconciled): void {
  let transaction = Transaction.load(event.params.transactionId.toHexString());

  transaction!.externalCallHash = event.params.externalHash;
  transaction!.reconciledTransactionHash = event.transaction.hash;
  transaction!.reconciledTimestamp = event.block.timestamp;
  transaction!.reconciledGasPrice = event.transaction.gasPrice;
  transaction!.reconciledGasLimit = event.transaction.gasLimit;
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

function getOrCreateAssetBalance(local: Bytes, router: Address): AssetBalance {
  let assetBalanceId = local.toHex() + "-" + router.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);
  if (assetBalance == null) {
    assetBalance = new AssetBalance(assetBalanceId);
    assetBalance.assetId = local;
    assetBalance.router = router.toHex();
    assetBalance.amount = new BigInt(0);
  }
  return assetBalance;
}
