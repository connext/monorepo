import { createLoggingContext, ChainData } from "@connext/nxtp-utils";

import { NxtpLighthouseConfig } from "../../config";

import { getContext, makeProver } from "./prover";
import { BrokerMessage } from "./operations/types";
import { processMessages } from "./operations";

export const makeProverFunc = async (
  event: any,
  config: NxtpLighthouseConfig,
  chainData: Map<string, ChainData>,
): Promise<{ statusCode: number; body: string }> => {
  const { requestContext, methodContext } = createLoggingContext("AmazonMQ.consumer");
  try {
    await makeProver(config, chainData);

    const { logger } = getContext();

    /*
     * Example Rabbit MQ record events
     * In the RabbitMQ example, pizzaQueue is the name of the RabbitMQ queue, and / is the name of the virtual host.
     * When receiving messages, the event source lists messages under pizzaQueue::/.
     *
     * {
     *   "eventSource": "aws:rmq",
     *   "eventSourceArn": "arn:aws:mq:us-west-2:111122223333:broker:pizzaBroker:b-9bcfa592-423a-4942-879d-eb284b418fc8",
     *   "rmqMessagesByQueue": {
     *     "pizzaQueue::/": [
     *       {
     *         "basicProperties": {
     *           ...
     *         },
     *         "redelivered": false,
     *         "data": "eyJ0aW1lb3V0IjowLCJkYXRhIjoiQ1pybWYwR3c4T3Y0YnFMUXhENEUifQ=="
     *       }
     *     ]
     *   }
     * }
     */
    logger.info("Received an event from mq", requestContext, methodContext, { event });

    const rmqMessagesByQueue = event.rmqMessagesByQueue as Record<string, any[]>;
    const queues = Object.keys(rmqMessagesByQueue);
    const brokerMessagesToProcess: BrokerMessage[] = [];
    for (const queue of queues) {
      const queueMessages = rmqMessagesByQueue[queue].map(
        (msg: any) => JSON.parse(msg.data as string) as BrokerMessage,
      );
      brokerMessagesToProcess.push(...queueMessages);
    }

    for (const brokerMessage of brokerMessagesToProcess) {
      await processMessages(brokerMessage, requestContext);
    }
    return {
      statusCode: 200,
      body: `Processed ${brokerMessagesToProcess.length} messages`,
    };
  } catch (err: unknown) {
    console.error(`Message processing failed, error: ${err}`);
    return {
      statusCode: 500,
      body: `Message processing failed, error: ${err}`,
    };
  }
};
