import Broker from "amqplib";
import { Bid, ExecutorData, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { HTTPMessage, MessageType } from "../../../lib/entities";
import { storeFastPathData, storeSlowPathData } from "../../../lib/operations/execute";

export const bindHTTPSubscriber = async (queueName: string, channel: Broker.Channel) => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindHTTPSubscriber.name, undefined, "");
  logger.info("Binding subscriber for queue", requestContext, methodContext, { queue: queueName });
  try {
    // TODO: Assert that the queue exists
    // TODO: Verify acks are working
    await channel.consume(queueName, async (message) => {
      if (!message) return;
      const httpMessage: HTTPMessage = JSON.parse(message.content.toString()) as HTTPMessage;
      switch (httpMessage.type) {
        case MessageType.ExecuteFast:
          await storeFastPathData(httpMessage.data as Bid, requestContext);
          break;
        case MessageType.ExecuteSlow: {
          await storeSlowPathData(httpMessage.data as ExecutorData, requestContext);
          break;
        }
      }
    });
  } catch (e: unknown) {
    logger.error("Error while binding subscriber", requestContext, methodContext, jsonifyError(e as Error));
  }
};
