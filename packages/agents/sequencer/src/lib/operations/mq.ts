import Broker from "foo-foo-mq";

import { Static, Type } from "@sinclair/typebox";
import { SequencerConfig } from "../entities";

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
