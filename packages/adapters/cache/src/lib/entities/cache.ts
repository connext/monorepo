import { CacheParams } from "./config";

export type SubscriptionCallback = (msg: any, err?: any) => void;

export type Subscriptions = Map<string, SubscriptionCallback>;

/**
 * @classdesc Manages storage, updates, and retrieval of a set of data determined by use-case.
 * Potentially includes a set of subscriptions for listening to changes in the data.
 */
export abstract class Cache {
  protected readonly subscriptions: Subscriptions = new Map();

  constructor(_: CacheParams) {}

  protected abstract initSubscribers(): void;

  public abstract publish(channel: string, message: string): Promise<void>;

  public abstract subscribe(channel: string, callback: SubscriptionCallback): Promise<void>;
}
