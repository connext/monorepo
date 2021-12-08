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
import { Transaction, AssetBalance, Router, User, HourlyMetric, DayMetric } from "../../generated/schema";

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

  let user = User.load(event.params.txData.user.toHex());
  if (user == null) {
    user = new User(event.params.txData.user.toHex());
    user.save();
  }

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
    chainId = TransactionManager.bind(event.address).getChainId();
  }

  // cannot use only transactionId because of multipath routing, this below combo will be unique for active txs
  let transactionId =
    event.params.transactionId.toHex() + "-" + event.params.user.toHex() + "-" + event.params.router.toHex();
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  // NOTE: the above case is not always true since malicious users can reuse IDs to try to break the
  // subgraph. we can protect against this by overwriting if we are able to load a Transactioln
  let transaction = Transaction.load(transactionId);
  if (transaction == null) {
    transaction = new Transaction(transactionId);
  }

  // TransactionData
  transaction.receivingChainTxManagerAddress = event.params.txData.receivingChainTxManagerAddress;
  transaction.user = user.id;
  transaction.router = router.id;
  transaction.initiator = event.params.txData.initiator;
  transaction.sendingAssetId = event.params.txData.sendingAssetId;
  transaction.receivingAssetId = event.params.txData.receivingAssetId;
  transaction.sendingChainFallback = event.params.txData.sendingChainFallback;
  transaction.callTo = event.params.txData.callTo;
  transaction.receivingAddress = event.params.txData.receivingAddress;
  transaction.callDataHash = event.params.txData.callDataHash;
  transaction.transactionId = event.params.txData.transactionId;
  transaction.sendingChainId = event.params.txData.sendingChainId;
  transaction.receivingChainId = event.params.txData.receivingChainId;
  transaction.amount = event.params.txData.amount;
  transaction.expiry = event.params.txData.expiry;
  transaction.preparedBlockNumber = event.params.txData.preparedBlockNumber;

  // TransactionPrepared specific
  transaction.prepareCaller = event.params.caller;
  transaction.prepareTransactionHash = event.transaction.hash;
  transaction.encryptedCallData = event.params.args.encryptedCallData.toHexString();
  transaction.encodedBid = event.params.args.encodedBid.toHexString();
  transaction.bidSignature = event.params.args.bidSignature;

  // Meta
  transaction.prepareMeta = event.params.args.encodedMeta;
  transaction.status = "Prepared";
  transaction.chainId = chainId;
  transaction.preparedTimestamp = event.block.timestamp;

  transaction.save();

  // Get receiving asset balance (update amount and locked)
  // router is providing liquidity on receiver prepare
  if (chainId == transaction.receivingChainId) {
    const assetBalance = getOrCreateAssetBalance(transaction.receivingAssetId, event.params.router);
    assetBalance.amount = assetBalance.amount.minus(transaction.amount);
    assetBalance.locked = assetBalance.locked.plus(transaction.amount);
    assetBalance.save();
  }
}

/**
 * Updates subgraph records when TransactionFulfilled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleTransactionFulfilled(event: TransactionFulfilled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  let transactionId =
    event.params.transactionId.toHex() + "-" + event.params.user.toHex() + "-" + event.params.router.toHex();
  let transaction = Transaction.load(transactionId);
  transaction!.status = "Fulfilled";
  transaction!.relayerFee = event.params.args.relayerFee;
  transaction!.signature = event.params.args.signature;
  transaction!.callData = event.params.args.callData.toHexString();
  transaction!.externalCallSuccess = event.params.success;
  transaction!.externalCallReturnData = event.params.returnData;
  transaction!.externalCallIsContract = event.params.isContract;
  transaction!.fulfillCaller = event.params.caller;
  transaction!.fulfillTransactionHash = event.transaction.hash;
  transaction!.fulfillMeta = event.params.args.encodedMeta;
  transaction!.fulfillTimestamp = event.block.timestamp;

  transaction!.save();

  // receiving chain
  if (transaction!.chainId == transaction!.receivingChainId) {
    // Get asset balance
    const receivingAssetBalance = getOrCreateAssetBalance(transaction!.receivingAssetId, event.params.router);
    // load metrics
    const dayMetricReceiving = getOrCreateDayMetric(event.block.timestamp, transaction!.receivingAssetId);
    const hourlyMetricReceiving = getOrCreateHourlyMetric(event.block.timestamp, transaction!.receivingAssetId);

    // router releases locked liquidity on receiver fulfill
    receivingAssetBalance.locked = receivingAssetBalance.locked.minus(transaction!.amount);
    receivingAssetBalance.volume = receivingAssetBalance.volume.plus(transaction!.amount);

    // Update metrics
    hourlyMetricReceiving.volume = hourlyMetricReceiving.volume.plus(transaction!.amount);
    hourlyMetricReceiving.receivingTxCount = hourlyMetricReceiving.receivingTxCount.plus(BigInt.fromI32(1));

    dayMetricReceiving.volume = dayMetricReceiving.volume.plus(transaction!.amount);
    dayMetricReceiving.receivingTxCount = dayMetricReceiving.receivingTxCount.plus(BigInt.fromI32(1));

    // Save
    receivingAssetBalance.save();
    hourlyMetricReceiving.save();
    dayMetricReceiving.save();
  } else if (transaction!.chainId == transaction!.sendingChainId) {
    // Get asset balance
    const sendingAssetBalance = getOrCreateAssetBalance(transaction!.sendingAssetId, event.params.router);
    // load metrics
    const dayMetricsSending = getOrCreateDayMetric(event.block.timestamp, transaction!.sendingAssetId);
    const hourlyMetricsSending = getOrCreateHourlyMetric(event.block.timestamp, transaction!.sendingAssetId);

    // router receives liquidity back on sender fulfill
    sendingAssetBalance.amount = sendingAssetBalance.amount.plus(transaction!.amount);
    sendingAssetBalance.volumeIn = sendingAssetBalance.volumeIn.plus(transaction!.amount);

    hourlyMetricsSending.volumeIn = hourlyMetricsSending.volumeIn.plus(transaction!.amount);
    hourlyMetricsSending.sendingTxCount = hourlyMetricsSending.sendingTxCount.plus(BigInt.fromI32(1));

    dayMetricsSending.volumeIn = dayMetricsSending.volumeIn.plus(transaction!.amount);
    dayMetricsSending.sendingTxCount = dayMetricsSending.sendingTxCount.plus(BigInt.fromI32(1));

    // Save
    sendingAssetBalance.save();
    hourlyMetricsSending.save();
    dayMetricsSending.save();
  }
}

/**
 * Updates subgraph records when TransactionCancelled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleTransactionCancelled(event: TransactionCancelled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  let transactionId =
    event.params.transactionId.toHex() + "-" + event.params.user.toHex() + "-" + event.params.router.toHex();
  let transaction = Transaction.load(transactionId);
  transaction!.status = "Cancelled";
  transaction!.cancelCaller = event.params.caller;
  transaction!.cancelTransactionHash = event.transaction.hash;
  transaction!.cancelMeta = event.params.args.encodedMeta;
  transaction!.cancelTimestamp = event.block.timestamp;

  transaction!.save();

  // router receives liquidity back on receiver cancel
  if (transaction!.chainId == transaction!.receivingChainId) {
    const receivingAssetBalance = getOrCreateAssetBalance(transaction!.receivingAssetId, event.params.router);
    const dayMetricReceiving = getOrCreateDayMetric(event.block.timestamp, transaction!.receivingAssetId);
    const hourlyMetricReceiving = getOrCreateHourlyMetric(event.block.timestamp, transaction!.receivingAssetId);

    // preparation for the receiving chain
    receivingAssetBalance.amount = receivingAssetBalance.amount.plus(transaction!.amount);
    receivingAssetBalance.locked = receivingAssetBalance.locked.minus(transaction!.amount);

    // update metrics
    hourlyMetricReceiving.cancelTxCount = hourlyMetricReceiving.cancelTxCount.plus(BigInt.fromI32(1));
    dayMetricReceiving.cancelTxCount = dayMetricReceiving.cancelTxCount.plus(BigInt.fromI32(1));

    // save
    receivingAssetBalance.save();
    hourlyMetricReceiving.save();
    dayMetricReceiving.save();
  }
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

function getOrCreateHourlyMetric(timestamp: BigInt, assetId: Bytes): HourlyMetric {
  let hour = timestamp.toI32() / 3600; // rounded
  let hourStartTimestamp = hour * 3600;

  let hourIDPerAsset = hour.toString() + "-" + assetId.toHex();
  let hourlyMetric = HourlyMetric.load(hourIDPerAsset);
  if (hourlyMetric === null) {
    hourlyMetric = new HourlyMetric(hourIDPerAsset);
    hourlyMetric.hourStartTimestamp = BigInt.fromI32(hourStartTimestamp);
    hourlyMetric.assetId = assetId.toHex();
    hourlyMetric.volume = BigInt.fromI32(0);
    hourlyMetric.sendingTxCount = BigInt.fromI32(0);
    hourlyMetric.receivingTxCount = BigInt.fromI32(0);
    hourlyMetric.cancelTxCount = BigInt.fromI32(0);
    hourlyMetric.volumeIn = BigInt.fromI32(0);
  }
  return hourlyMetric;
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
