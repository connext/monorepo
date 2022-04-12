export type SubscriptionCallback = (msg: any, err?: any) => void;

export type Subscriptions = Map<string, SubscriptionCallback>;

export enum StoreChannel {
  NewHighestNonce = "new-high-nonce",
}
