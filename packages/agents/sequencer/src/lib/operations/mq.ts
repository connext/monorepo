import Broker from "foo-foo-mq";

import { Static, Type } from "@sinclair/typebox";
import { SequencerConfig } from "../entities";

// TODO: Schemafiy this
export const sqConfig = {
  exchange: { name: "sequencerX", type: "direct", publishTimeout: 1000 },
  queue: { prefix: "sq.", limit: 100, queueLimit: 10000, subscribe: true, routingKey: "1111" },
  request: { prefix: "sq.request." },
  binding: { keys: ["1111"] },
  executer: { timeout: 5 * 60 * 1000 },
};

export const messageSchema = Type.Object({
  transferId: Type.String(),
  originDomain: Type.String(),
});
export type Message = Static<typeof messageSchema>;

export const setupMQ = async (_config: SequencerConfig) => {
  const mqConfig: Broker.ConfigurationOptions = {
    connection: _config.messageQueue.connection,
    exchanges: _config.messageQueue.exchanges,
    queues: _config.messageQueue.queues,
    bindings: _config.messageQueue.bindings,
  };
  await Broker.configure(mqConfig);
};
