/* eslint-disable prefer-const */
import { BigInt, dataSource } from "@graphprotocol/graph-ts";

import {
  TransactionManager,
  LiquidityAdded,
  LiquidityRemoved,
  TransactionCancelled,
  TransactionFulfilled,
  TransactionPrepared,
} from "../generated/TransactionManager/TransactionManager";
import { Transaction, AssetBalance, Router, User, HourlyMetric, DayMetric } from "../generated/schema";

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
  let assetBalanceId = event.params.assetId.toHex() + "-" + event.params.router.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);
  if (assetBalance == null) {
    assetBalance = new AssetBalance(assetBalanceId);
    assetBalance.assetId = event.params.assetId;
    assetBalance.router = router.id;
    assetBalance.amount = new BigInt(0);
  }
  // add new amount
  assetBalance.amount = assetBalance!.amount.plus(event.params.amount);
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
  let assetBalanceId = event.params.assetId.toHex() + "-" + event.params.router.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);
  // add new amount
  assetBalance!.amount = assetBalance!.amount.minus(event.params.amount);
  assetBalance!.save();
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
  if (network == "ropsten") {
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

  // router is providing liquidity on receiver prepare
  if (chainId == transaction.receivingChainId) {
    let assetBalanceId = transaction.receivingAssetId.toHex() + "-" + event.params.router.toHex();
    let assetBalance = AssetBalance.load(assetBalanceId);
    assetBalance.amount = assetBalance.amount.minus(transaction.amount);
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

  // router receives liquidity back on sender fulfill
  if (transaction.chainId == transaction.sendingChainId) {
    let assetBalanceId = transaction.sendingAssetId.toHex() + "-" + event.params.router.toHex();
    let assetBalance = AssetBalance.load(assetBalanceId);
    if (assetBalance == null) {
      assetBalance = new AssetBalance(assetBalanceId);
      assetBalance.assetId = transaction.sendingAssetId;
      assetBalance.router = event.params.router.toHex();
      assetBalance.amount = new BigInt(0);
    }
    assetBalance.amount = assetBalance.amount.plus(transaction.amount);
    assetBalance.save();
  }

  // update metrics
  let timestamp = event.block.timestamp.toI32();

  let hour = timestamp / 3600; // rounded
  let hourStartTimestamp = hour * 3600;

  let hourIDPerAsset = hour.toString() + "-" + transaction.receivingAssetId.toHex();

  let hourlyMetric = HourlyMetric.load(hourIDPerAsset.toString());
  if (hourlyMetric === null) {
    hourlyMetric = new HourlyMetric(hourIDPerAsset.toString());
    hourlyMetric.hourStartTimestamp = BigInt.fromI32(hourStartTimestamp);
    hourlyMetric.assetId = transaction.receivingAssetId.toHex();
    hourlyMetric.volume = BigInt.fromI32(0);
    hourlyMetric.liquidity = BigInt.fromI32(0);
    hourlyMetric.txCount = BigInt.fromI32(0);
  }

  let day = timestamp / 86400; // rounded
  let dayStartTimestamp = day * 86400;

  let dayIDPerAsset = day.toString() + "-" + transaction.receivingAssetId.toHex();

  let dayMetric = DayMetric.load(dayIDPerAsset.toString());
  if (dayMetric === null) {
    dayMetric = new DayMetric(dayIDPerAsset.toString());
    dayMetric.dayStartTimestamp = BigInt.fromI32(dayStartTimestamp);
    dayMetric.assetId = transaction.receivingAssetId.toHex();
    dayMetric.volume = BigInt.fromI32(0);
    dayMetric.txCount = BigInt.fromI32(0);
  }

  // Only count volume on receiving chain
  if (transaction.chainId == transaction.receivingChainId) {
    hourlyMetric.volume = hourlyMetric.volume.plus(transaction.amount);
    hourlyMetric.txCount = hourlyMetric.txCount.plus(BigInt.fromI32(1));

    dayMetric.volume = dayMetric.volume.plus(transaction.amount);
    dayMetric.txCount = dayMetric.txCount.plus(BigInt.fromI32(1));
  } else if (transaction.chainId == transaction.sendingChainId) {
    // load assetBalance
    let assetBalanceId = transaction.sendingAssetId.toHex() + "-" + event.params.router.toHex();
    let assetBalance = AssetBalance.load(assetBalanceId);
    if (hourlyMetric.liquidity < assetBalance.amount) {
      hourlyMetric.liquidity = assetBalance.amount;
    }
  }

  hourlyMetric.save();
  dayMetric.save();
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
  if (transaction.chainId == transaction.receivingChainId) {
    let assetBalanceId = transaction.receivingAssetId.toHex() + "-" + event.params.router.toHex();
    let assetBalance = AssetBalance.load(assetBalanceId);
    if (assetBalance == null) {
      assetBalance = new AssetBalance(assetBalanceId);
      assetBalance.assetId = transaction.receivingAssetId;
      assetBalance.router = event.params.router.toHex();
      assetBalance.amount = new BigInt(0);
    }
    assetBalance.amount = assetBalance.amount.plus(transaction.amount);
    assetBalance.save();
  }
}
