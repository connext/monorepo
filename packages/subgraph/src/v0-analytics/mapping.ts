/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  TransactionManager,
  LiquidityAdded,
  LiquidityRemoved,
  TransactionCancelled,
  TransactionFulfilled,
  TransactionPrepared,
} from "../../generated/TransactionManager/TransactionManager";
import { AssetBalance, Router, DayMetric } from "../../generated/schema";

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

  // ID is of the format ROUTER_ADDRESS-ASSET_ID
  const assetBalance = getOrCreateAssetBalance(event.params.assetId, event.params.router);

  // add new amount
  assetBalance.amount = assetBalance.amount.plus(event.params.amount);

  // add supplied amount
  assetBalance.supplied = assetBalance.supplied.plus(event.params.amount);

  // save
  assetBalance.save();
}

/**
 * Updates the subgraph records when LiquidityRemoved events are emitted. Will create a Router record if it does not exist
 *
 * @param event - The contract event to update the subgraph record with
 */
export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let router = Router.load(event.params.router.toHex());
  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.save();
  }

  // ID is of the format ROUTER_ADDRESS-ASSET_ID
  const assetBalance = getOrCreateAssetBalance(event.params.assetId, event.params.router);

  // update amount
  assetBalance.amount = assetBalance.amount.minus(event.params.amount);

  // update removed
  assetBalance.removed = assetBalance.removed.plus(event.params.amount);

  // save
  assetBalance.save();
}

/**
 * Creates subgraph records when TransactionPrepared events are emitted.
 *
 * @param event - The contract event used to create the subgraph record
 */
export function handleTransactionPrepared(event: TransactionPrepared): void {
  // load user and router
  // router should have liquidity but it may not
  let router = Router.load(event.params.txData.router.toHex());
  if (router == null) {
    router = new Router(event.params.txData.router.toHex());
    router.save();
  }
  const chainId = getChainId(event.address);

  const routerAddress = event.params.router;
  const sendingChainId = event.params.txData.sendingChainId;
  const sendingAssetId = event.params.txData.sendingAssetId;

  const receivingChainId = event.params.txData.receivingChainId;
  const receivingAssetId = event.params.txData.receivingAssetId;

  const amount = event.params.txData.amount;

  // Get receiving asset balance (update amount and locked)
  // router is providing liquidity on receiver prepare
  if (chainId == receivingChainId) {
    const receivingAssetBalance = getOrCreateAssetBalance(receivingAssetId, routerAddress);
    receivingAssetBalance.amount = receivingAssetBalance.amount.minus(amount);
    receivingAssetBalance.locked = receivingAssetBalance.locked.plus(amount);
    receivingAssetBalance.receivingPrepareTxCount = receivingAssetBalance.receivingPrepareTxCount.plus(
      BigInt.fromI32(1),
    );
    receivingAssetBalance.save();
  } else if (chainId == sendingChainId) {
    const sendingAssetBalance = getOrCreateAssetBalance(sendingAssetId, routerAddress);
    sendingAssetBalance.lockedIn = sendingAssetBalance.lockedIn.plus(amount);
    sendingAssetBalance.sendingPrepareTxCount = sendingAssetBalance.sendingPrepareTxCount.plus(BigInt.fromI32(1));
    sendingAssetBalance.save();
  }
}

/**
 * Updates subgraph records when TransactionFulfilled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleTransactionFulfilled(event: TransactionFulfilled): void {
  const chainId = getChainId(event.address);

  const timestamp = event.block.timestamp;
  const router = event.params.router;
  const receivingChainId = event.params.txData.receivingChainId;
  const sendingChainId = event.params.txData.sendingChainId;

  const sendingAssetId = event.params.txData.sendingAssetId;
  const receivingAssetId = event.params.txData.receivingAssetId;
  const amount = event.params.txData.amount;
  const relayerFee = event.params.relayerFee;

  // receiving chain
  if (chainId == receivingChainId) {
    // Get asset balance
    const receivingAssetBalance = getOrCreateAssetBalance(receivingAssetId, router);
    // load metrics
    const dayMetricReceiving = getOrCreateDayMetric(timestamp, receivingAssetId);

    // router releases locked liquidity on receiver fulfill
    receivingAssetBalance.locked = receivingAssetBalance.locked.minus(amount);
    receivingAssetBalance.volume = receivingAssetBalance.volume.plus(amount);
    receivingAssetBalance.receivingFulfillTxCount = receivingAssetBalance.receivingFulfillTxCount.plus(
      BigInt.fromI32(1),
    );

    // Update metrics
    dayMetricReceiving.volume = dayMetricReceiving.volume.plus(amount);
    dayMetricReceiving.receivingTxCount = dayMetricReceiving.receivingTxCount.plus(BigInt.fromI32(1));
    dayMetricReceiving.relayerFee = dayMetricReceiving.relayerFee.plus(relayerFee);

    // Save
    receivingAssetBalance.save();
    dayMetricReceiving.save();
  } else if (chainId == sendingChainId) {
    // Get asset balance
    const sendingAssetBalance = getOrCreateAssetBalance(sendingAssetId, router);
    // load metrics
    const dayMetricsSending = getOrCreateDayMetric(timestamp, sendingAssetId);

    // router receives liquidity back on sender fulfill
    sendingAssetBalance.amount = sendingAssetBalance.amount.plus(amount);
    sendingAssetBalance.lockedIn = sendingAssetBalance.lockedIn.minus(amount);
    sendingAssetBalance.volumeIn = sendingAssetBalance.volumeIn.plus(amount);
    sendingAssetBalance.sendingFulfillTxCount = sendingAssetBalance.sendingFulfillTxCount.plus(BigInt.fromI32(1));

    dayMetricsSending.volumeIn = dayMetricsSending.volumeIn.plus(amount);
    dayMetricsSending.sendingTxCount = dayMetricsSending.sendingTxCount.plus(BigInt.fromI32(1));

    // Save
    sendingAssetBalance.save();
    dayMetricsSending.save();
  }
}

/**
 * Updates subgraph records when TransactionCancelled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleTransactionCancelled(event: TransactionCancelled): void {
  const chainId = getChainId(event.address);
  const timestamp = event.block.timestamp;
  const router = event.params.router;

  const sendingChainId = event.params.txData.sendingChainId;
  const sendingAssetId = event.params.txData.sendingAssetId;

  const receivingChainId = event.params.txData.receivingChainId;
  const receivingAssetId = event.params.txData.receivingAssetId;
  const amount = event.params.txData.amount;

  // router receives liquidity back on receiver cancel
  if (chainId == receivingChainId) {
    const receivingAssetBalance = getOrCreateAssetBalance(receivingAssetId, router);
    const dayMetricReceiving = getOrCreateDayMetric(timestamp, receivingAssetId);

    // preparation for the receiving chain
    receivingAssetBalance.amount = receivingAssetBalance.amount.plus(amount);
    receivingAssetBalance.locked = receivingAssetBalance.locked.minus(amount);
    receivingAssetBalance.receivingCancelTxCount = receivingAssetBalance.receivingCancelTxCount.plus(BigInt.fromI32(1));

    // update metrics
    dayMetricReceiving.cancelTxCount = dayMetricReceiving.cancelTxCount.plus(BigInt.fromI32(1));

    // save
    receivingAssetBalance.save();
    dayMetricReceiving.save();
  } else if (chainId == sendingChainId) {
    const sendingAssetBalance = getOrCreateAssetBalance(sendingAssetId, router);
    sendingAssetBalance.lockedIn = sendingAssetBalance.lockedIn.minus(amount);
    sendingAssetBalance.sendingCancelTxCount = sendingAssetBalance.sendingCancelTxCount.plus(BigInt.fromI32(1));

    // save
    sendingAssetBalance.save();
  }
}

function getChainId(transactionManagerAddress: Address): BigInt {
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
    // instantiate contract to get the chainId as a fallback
    chainId = TransactionManager.bind(transactionManagerAddress).getChainId();
  }

  return chainId;
}

function getOrCreateAssetBalance(assetId: Bytes, router: Address): AssetBalance {
  let assetBalanceId = assetId.toHex() + "-" + router.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);
  if (assetBalance == null) {
    assetBalance = new AssetBalance(assetBalanceId);
    assetBalance.assetId = assetId;
    assetBalance.router = router.toHex();
    assetBalance.amount = new BigInt(0);
    assetBalance.supplied = new BigInt(0);
    assetBalance.locked = new BigInt(0);
    assetBalance.removed = new BigInt(0);
    assetBalance.volume = new BigInt(0);
    assetBalance.volumeIn = new BigInt(0);
  }
  return assetBalance;
}

function getOrCreateDayMetric(timestamp: BigInt, assetId: Bytes): DayMetric {
  let day = timestamp.toI32() / 86400; // rounded
  let dayStartTimestamp = day * 86400;

  let dayIDPerAsset = day.toString() + "-" + assetId.toHex();

  let dayMetric = DayMetric.load(dayIDPerAsset);
  if (dayMetric === null) {
    dayMetric = new DayMetric(dayIDPerAsset);
    dayMetric.dayStartTimestamp = BigInt.fromI32(dayStartTimestamp);
    dayMetric.assetId = assetId.toHex();
    dayMetric.volume = BigInt.fromI32(0);
    dayMetric.sendingTxCount = BigInt.fromI32(0);
    dayMetric.receivingTxCount = BigInt.fromI32(0);
    dayMetric.cancelTxCount = BigInt.fromI32(0);
    dayMetric.volumeIn = BigInt.fromI32(0);
  }
  return dayMetric;
}
