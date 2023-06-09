import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../prover";

import { PROVER_QUEUE, BrokerMessage } from "./types";
import { processMessages } from "./process";

const DEFAULT_PREFETCH_SIZE = 1;
export const consume = async () => {
  const { requestContext, methodContext } = createLoggingContext(consume.name);
  const {
    logger,
    adapters: { mqClient },
    config,
  } = getContext();
  const prefetchSize = config.messageQueue.prefetchSize ?? DEFAULT_PREFETCH_SIZE;
  const channel = await mqClient.createChannel();
  channel.prefetch(prefetchSize);
  await channel.assertExchange(config.messageQueue.exchange.name, config.messageQueue.exchange.type, {
    durable: config.messageQueue.exchange.durable,
  });

  await channel.assertQueue(PROVER_QUEUE, {
    durable: true,
    maxLength: config.messageQueue.queueLimit,
  });
  await channel.bindQueue(PROVER_QUEUE, config.messageQueue.exchange.name, PROVER_QUEUE);
  logger.info("Binding subscriber for queue", requestContext, methodContext, {
    queue: PROVER_QUEUE,
    exchange: config.messageQueue.exchange.name,
  });

  channel.consume(
    PROVER_QUEUE,
    async (message) => {
      if (message) {
        try {
          const brokerMessage = JSON.parse(message.content.toString()) as BrokerMessage;
          logger.info("Processing an unprocessed message", requestContext, methodContext, { message: brokerMessage });
          await processMessages(brokerMessage, requestContext);
          channel.ack(message);
        } catch (err: unknown) {
          logger.error("Processing messaages failed", requestContext, methodContext, undefined, { err });
          channel.reject(message);
        }
      }
    },
    { noAck: false },
  );
};
