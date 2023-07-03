import Broker from "amqplib";
import { Bid, ExecutorData, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { HTTPMessage, MessageType } from "../../../lib/entities";
import { storeFastPathData, storeSlowPathData } from "../../../lib/operations/execute";

export const bindHTTPSubscriber = async (queueName: string, channel: Broker.Channel) => {
  const { logger } = getContext();
  const loggingContext = createLoggingContext(bindHTTPSubscriber.name, undefined, "");
  logger.info("Binding subscriber for queue", loggingContext.requestContext, loggingContext.methodContext, {
    queue: queueName,
  });
  try {
    await channel.consume(queueName, async (message) => {
      if (!message) return;
      const httpMessage: HTTPMessage = JSON.parse(message.content.toString()) as HTTPMessage;
      const { requestContext, methodContext } = createLoggingContext(
        bindHTTPSubscriber.name,
        undefined,
        httpMessage.transferId,
      );
      try {
        switch (httpMessage.type) {
          case MessageType.ExecuteFast:
            await storeFastPathData(httpMessage.data as Bid, requestContext);
            channel.ack(message);
            break;
          case MessageType.ExecuteSlow:
            await storeSlowPathData(httpMessage.data as ExecutorData, requestContext);
            channel.ack(message);
            break;
          default:
            // Drop the message permanently
            channel.reject(message, false);
            break;
        }
      } catch (e: unknown) {
        // Drop the message permanently
        channel.reject(message, false);
        logger.error("Error while processing HTTP request", requestContext, methodContext, jsonifyError(e as Error));
      }
    });
  } catch (e: unknown) {
    logger.error(
      "Error while binding subscriber",
      loggingContext.requestContext,
      loggingContext.methodContext,
      jsonifyError(e as Error),
    );
  }
};
