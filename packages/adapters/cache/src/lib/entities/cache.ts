import { Redis } from "ioredis";
import { RedisChannels } from "./channels";

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

  protected initChannels(instances: Redis[]): void {
    for (const instance of instances) {
      instance.on("message", (channel, message) => {
        if (this.subscriptions.has(channel)) {
          const callback = this.subscriptions.get(channel);
          if (callback) callback(message);
        }
      });
    }
  }

  /**
   * Publishes a message to the specified channel
   * @param channel The channel name that publishes messages to
   * @param message The message to publish
   */
   public async publish(instance: Redis, channel: RedisChannels, message: string): Promise<void> {
    if (!this.subscriptions.has(channel)) {
      throw new Error(`Channel ${channel} doesn't exist`);
    }
    instance.publish(channel, message);
  }

  /**
   * Subscribes to the specified channel, callback fn is called whenever a new message arrives
   * @param channel The channel name that publishes messages to
   * @param callback The callback function that is called whenever a new message arrives
   */
  public async subscribe(instance: Redis, channel: RedisChannels, callback: SubscriptionCallback): Promise<void> {
    this.subscriptions.set(channel, callback);
    await instance.subscribe(channel);
  }
}
