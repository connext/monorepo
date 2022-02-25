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

  /**
   * Publishes a message to the specified channel
   * @param channel The channel name that publishes messages to
   * @param message The message to publish
   */
   protected async publish(channel: string, message: string): Promise<void> {
    const callback = this.subscriptions.get(channel);
    if (callback) callback(message);
  }

  /**
   * Subscribes to the specified channel, callback fn is called whenever a new message arrives
   * @param channel The channel name that publishes messages to
   * @param callback The callback function that is called whenever a new message arrives
   */
  public async subscribe(channel: string, callback: SubscriptionCallback): Promise<void> {
    this.subscriptions.set(channel, callback);
  }
}
