import Broker from "foo-foo-mq";

import { Static, Type } from "@sinclair/typebox";

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

// TODO: Schemafiy this
// TODO: Dead letter queue
const mqConfig: Broker.ConfigurationOptions = {
  connection: {
    user: "guest",
    pass: "guest",
    server: "127.0.0.1",
    port: 5672,
    timeout: 2000,
    publishTimeout: 100,
    failAfter: 10,
    retryLimit: 100,
  },
  exchanges: [{ name: "sequencerX", type: "direct", publishTimeout: 1000, persistent: true, durable: true }],
  queues: [{ name: "sq-1111", limit: 100, queueLimit: 10000, subscribe: true }],
  bindings: [{ exchange: "sequencerX", target: "sq-1111", keys: ["1111"] }],
};

//TODO: Input full generated config
export const setupMQ = async (_configOverride?: Broker.ConfigurationOptions) => {
  await Broker.configure(mqConfig);
};
