import {
  TransactionManager,
  LiquidityAdded,
  LiquidityRemoved,
  TransactionCancelled,
  TransactionFulfilled,
  TransactionPrepared,
} from "../generated/TransactionManager/TransactionManager";
import { Transaction, AssetBalance, Router, User } from "../generated/schema";

export function handleLiquidityAdded(event: LiquidityAdded): void {
  let router = Router.load(event.params.router.toHex());
  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.save();
  }

  // ID is of the format ROUTER_ADDRESS-ASSET_ID
  let assetBalance = AssetBalance.load(`${event.params.assetId.toHex()}-${event.params.router.toHex()}`);
  if (assetBalance == null) {
    assetBalance = new AssetBalance(`${event.params.assetId.toHex()}-${event.params.router.toHex()}`);
    assetBalance.router = router.id;
  }
  // add new amount
  assetBalance.amount = assetBalance.amount + event.params.amount;
  assetBalance.save();
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let router = Router.load(event.params.router.toHex());
  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.save();
  }

  // ID is of the format ROUTER_ADDRESS-ASSET_ID
  const assetBalance = AssetBalance.load(`${event.params.assetId.toHex()}-${event.params.router.toHex()}`);
  // add new amount
  assetBalance!.amount = assetBalance!.amount - event.params.amount;
  assetBalance!.save();
}

export function handleTransactionPrepared(event: TransactionPrepared): void {
  // load user and router
  // router must necessarily exist at this point because it had to have provided liquidity
  const router = Router.load(event.params.txData.router.toHex());

  let user = User.load(event.params.txData.router.toHex());
  if (user == null) {
    user = new User(event.params.txData.user.toHex());
    user.save();
  }

  // contract checks ensure that this cannot exist at this point, so we can safely create new
  const transaction = new Transaction(event.params.txData.transactionId.toHex());
  transaction.user = user.id;
  transaction.router = router!.id;
  transaction.amount = event.params.txData.amount;
  transaction.sendingAssetId = event.params.txData.sendingAssetId;
  transaction.receivingAssetId = event.params.txData.receivingAssetId;
  transaction.sendingChainId = event.params.txData.sendingChainId;
  transaction.receivingChainId = event.params.txData.receivingChainId;
  transaction.receivingAddress = event.params.txData.receivingAddress;
  transaction.callData = event.params.txData.callData;
  transaction.transactionId = event.params.txData.transactionId;
  transaction.expiry = event.params.txData.expiry;
  transaction.status = "Prepared";

  transaction.save();
}

export function handleTransactionFulfilled(event: TransactionFulfilled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  const transaction = Transaction.load(event.params.txData.transactionId.toHex());
  transaction!.status = "Fulfilled";

  transaction!.save();
}

export function handleTransactionCancelled(event: TransactionCancelled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  const transaction = Transaction.load(event.params.txData.transactionId.toHex());
  transaction!.status = "Cancelled";

  transaction!.save();
}
