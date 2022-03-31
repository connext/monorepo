/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  LiquidityAdded,
  LiquidityRemoved,
  XCalled,
  Executed,
  Reconciled,
  RouterAdded,
  RouterRemoved,
  StableSwapAdded,
  AssetAdded,
  AssetRemoved,
} from "../../generated/Connext/Connext";
import { AssetBalance, Router, Transfer } from "../../generated/schema";

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
export function handleXCalled(event: XCalled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  // NOTE: the above case is not always true since malicious users can reuse IDs to try to break the
  // subgraph. we can protect against this by overwriting if we are able to load a Transactioln
  let transfer = Transfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new Transfer(event.params.transferId.toHexString());
  }

  // Meta
  transfer.originDomain = event.params.params.originDomain;
  transfer.destinationDomain = event.params.params.destinationDomain;
  transfer.chainId = getChainId();
  transfer.status = "XCalled";

  // Transfer Data
  transfer.to = event.params.to;
  transfer.transferId = event.params.transferId;
  transfer.nonce = event.params.nonce;
  transfer.callTo = event.params.params.to;
  transfer.callData = event.params.params.callData;

  // XCalled
  transfer.xcalledCaller = event.params.caller;
  transfer.xcalledTransactingAmount = event.params.transactingAmount;
  transfer.xcalledLocalAmount = event.params.localAmount;
  transfer.xcalledTransactingAsset = event.params.transactingAsset;
  transfer.xcalledLocalAsset = event.params.localAsset;

  // Transaction XCalled
  transfer.xcalledTransactionHash = event.transaction.hash;
  transfer.xcalledTimestamp = event.block.timestamp;
  transfer.xcalledGasPrice = event.transaction.gasPrice;
  transfer.xcalledGasLimit = event.transaction.gasLimit;
  transfer.xcalledBlockNumber = event.block.number;

  transfer.save();
}

/**
 * Updates subgraph records when Fulfilled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleExecuted(event: Executed): void {
  let transfer = Transfer.load(event.params.transferId.toHexString());
  // router should have liquidity but it may not
  let router = Router.load(event.params.router.toHex());
  if (transfer == null) {
    transfer = new Transfer(event.params.transferId.toHexString());

    // Meta
    transfer.originDomain = event.params.params.originDomain;
    transfer.destinationDomain = event.params.params.destinationDomain;
    transfer.chainId = getChainId();
    transfer.status = "Executed";

    // Transfer Data
    transfer.transferId = event.params.transferId;
    transfer.to = event.params.to;
    transfer.router = router!.id;
    transfer.callTo = event.params.params.to;
    transfer.callData = event.params.params.callData;
  }

  // Fulfill
  transfer.executedCaller = event.params.caller;
  transfer.executedTransactingAmount = event.params.transactingAmount;
  transfer.executedLocalAmount = event.params.localAmount;
  transfer.executedTransactingAsset = event.params.transactingAsset;
  transfer.executedLocalAsset = event.params.localAsset;

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
  //TODO
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
