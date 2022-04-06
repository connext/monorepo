import { StoreChannel, Subscriptions, SubscriptionCallback, CacheParams } from "../entities";

import { Cache } from ".";

export class ConsumersCache extends Cache {
  public readonly subscriptions: Subscriptions = new Map();

  constructor({ host, port, mock, logger }: CacheParams) {
    super({ host, port, mock, logger });
    this.init();
  }

  /**
   * Publishes a message to the specific channel
   */
  protected init() {
    this.data.subscribe(
      StoreChannel.NewBid,
      StoreChannel.NewHighestNonce,
      StoreChannel.NewXCall,
      StoreChannel.NewStatus,
      (err: any, count) => {
        if (err) {
          this.logger.error(`Failed to subscribe: ${err.message}`);
        } else {
          this.logger.debug(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
        }
      },
    );

    this.data.on("message", (channel: string, message: string) => {
      const callback = this.subscriptions.get(channel);
      if (callback) callback(message);
    });
  }

  /**
   * Subscribes to the specified channel, callback fn is called whenever a new message arrives
   * @param channel The channel name that publishes messages to
   * @param callback The callback function that is called whenever a new message arrives
   */
  public async subscribe(channel: StoreChannel, callback: SubscriptionCallback): Promise<void> {
    this.subscriptions.set(channel, callback);
  }
}
