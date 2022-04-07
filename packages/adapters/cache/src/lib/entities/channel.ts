export type SubscriptionCallback = (msg: any, err?: any) => void;

export type Subscriptions = Map<string, SubscriptionCallback>;

export enum StoreChannel {
  NewStatus = "new-tx-status",
  NewHighestNonce = "new-high-nonce",
  NewBid = "new-bid",
}
