import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  RootMessage,
  ReceivedAggregateRoot,
  createRequestContext,
  RequestContext,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoAggregateRootCount,
  NoMessageRootIndex,
  NoMessageRootCount,
  NoTargetMessageRoot,
  NoReceivedAggregateRoot,
} from "../../../errors";
import { getContext } from "../prover";
import { DEFAULT_PROVER_BATCH_SIZE } from "../../../config";

import { BrokerMessage, PROVER_QUEUE } from "./types";

export const enqueue = async () => {
  const { requestContext, methodContext } = createLoggingContext(enqueue.name);
  const {
    logger,
    adapters: { database, mqClient, cache },
    config,
  } = getContext();
  const channel = await mqClient.createChannel();
  await channel.assertExchange(config.messageQueue.exchange.name, config.messageQueue.exchange.type, {
    durable: config.messageQueue.exchange.durable,
  });
  await channel.assertQueue(PROVER_QUEUE, {
    durable: true,
    maxLength: config.messageQueue.queueLimit,
  });
  await channel.bindQueue(PROVER_QUEUE, config.messageQueue.exchange.name, PROVER_QUEUE);

  // Only process configured chains.
  const domains: string[] = Object.keys(config.chains);

  // Process messages
  // Batch messages to be processed by origin_domain and destination_domain.
  await Promise.all(
    domains.map(async (destinationDomain) => {
      try {
        const curDestAggRoots: ReceivedAggregateRoot[] = await database.getLatestAggregateRoots(destinationDomain, 3);

        if (curDestAggRoots.length == 0) {
          throw new NoReceivedAggregateRoot(destinationDomain);
        }
        logger.debug("Got latest aggregate roots for domain", requestContext, methodContext, {
          destinationDomain,
          curDestAggRoots,
        });

        await Promise.all(
          domains
            .filter((domain) => domain != destinationDomain)
            .map(async (originDomain) => {
              try {
                let latestMessageRoot: RootMessage | undefined = undefined;
                const targetAggregateRoot: ReceivedAggregateRoot = curDestAggRoots[0];
                for (const destAggregateRoot of curDestAggRoots) {
                  latestMessageRoot = await database.getLatestMessageRoot(originDomain, destAggregateRoot.root);
                  if (latestMessageRoot) break;
                }
                if (!latestMessageRoot) {
                  throw new NoTargetMessageRoot(originDomain);
                }

                const targetMessageRoot = latestMessageRoot.root;
                // Count of leaf nodes in origin domain`s outbound tree with the targetMessageRoot as root
                const messageRootCount = await database.getMessageRootCount(originDomain, targetMessageRoot);
                if (messageRootCount === undefined) {
                  throw new NoMessageRootCount(originDomain, targetMessageRoot);
                }
                // Index of messageRoot leaf node in aggregate tree.
                const messageRootIndex = await database.getMessageRootIndex(config.hubDomain, targetMessageRoot);
                if (messageRootIndex === undefined) {
                  throw new NoMessageRootIndex(originDomain, targetMessageRoot);
                }

                // Count of leafs in aggregate tree at targetAggregateRoot.
                const aggregateRootCount = await database.getAggregateRootCount(targetAggregateRoot.root);
                if (!aggregateRootCount) {
                  throw new NoAggregateRootCount(targetAggregateRoot.root);
                }

                const batchSize = config.proverBatchSize[destinationDomain] ?? DEFAULT_PROVER_BATCH_SIZE;

                // Paginate through all unprocessed messages from the domain
                let offset = 0;
                let end = false;
                while (!end) {
                  logger.info(
                    "Getting unprocessed messages for origin and destination pair",
                    requestContext,
                    methodContext,

                    {
                      batchSize,
                      offset,
                      originDomain,
                      destinationDomain,
                      index: latestMessageRoot.count,
                    },
                  );
                  const cachedNonce = await cache.messages.getNonce(originDomain, destinationDomain);
                  const index = latestMessageRoot.count > cachedNonce ? latestMessageRoot.count : cachedNonce;
                  const unprocessed: XMessage[] = await database.getUnProcessedMessagesByIndex(
                    originDomain,
                    destinationDomain,
                    index,
                    offset,
                    batchSize,
                  );
                  const subContext = createRequestContext(
                    "processUnprocessedMessages",
                    `${originDomain}-${destinationDomain}-${offset}-${latestMessageRoot.root}`,
                  );
                  if (unprocessed.length > 0) {
                    logger.info("Got unprocessed messages for origin and destination pair", subContext, methodContext, {
                      unprocessed,
                      originDomain,
                      destinationDomain,
                      offset,
                    });

                    const brokerMessage = await createBrokerMessage(
                      unprocessed,
                      originDomain,
                      destinationDomain,
                      targetMessageRoot,
                      messageRootIndex,
                      messageRootCount,
                      targetAggregateRoot.root,
                      aggregateRootCount,
                      subContext,
                    );
                    if (brokerMessage) {
                      channel.publish(
                        config.messageQueue.exchange.name,
                        PROVER_QUEUE,
                        Buffer.from(JSON.stringify(brokerMessage)),
                        { persistent: config.messageQueue.exchange.persistent },
                      );
                      logger.info(
                        "Enqueued unprocessed messages for origin and destination pair",
                        subContext,
                        methodContext,
                        {
                          originDomain,
                          destinationDomain,
                          offset,
                          brokerMessage,
                        },
                      );

                      const indexes = unprocessed.map((item: XMessage) => item.origin.index);
                      await cache.messages.setNonce(originDomain, destinationDomain, Math.max(...indexes));
                    }

                    offset += unprocessed.length;
                  } else {
                    // End the loop if no more messages are found
                    end = true;
                    if (offset === 0) {
                      logger.info(
                        "Reached end of unprocessed messages for origin and destination pair",
                        subContext,
                        methodContext,
                        {
                          originDomain,
                          destinationDomain,
                          offset,
                        },
                      );
                    }
                  }
                }
              } catch (err: unknown) {
                logger.error(
                  "Error processing messages",
                  requestContext,
                  methodContext,
                  jsonifyError(err as NxtpError),
                );
              }
            }),
        );
      } catch (err: unknown) {
        logger.error("Error processing messages", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }),
  );

  await channel.close();
};

export const createBrokerMessage = async (
  _messages: XMessage[],
  originDomain: string,
  destinationDomain: string,
  targetMessageRoot: string,
  messageRootIndex: number,
  messageRootCount: number,
  targetAggregateRoot: string,
  aggregateRootCount: number,
  _requestContext: RequestContext,
): Promise<BrokerMessage | undefined> => {
  const {
    logger,
    adapters: { contracts, chainreader, database },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(createBrokerMessage.name, _requestContext);

  const destinationSpokeConnector = config.chains[destinationDomain]?.deployments.spokeConnector;
  if (!destinationSpokeConnector) {
    throw new NoDestinationDomainForProof(destinationDomain);
  }

  // In worst case, the message status couldn't get reflected to the database properly.
  // To avoid the failure in case we do proveAndProcess in batch, that wouldn't make sense that the unprocessed messages fail due to any processed messages but not reflected to the db.
  // Ideally, we shouldn't pick the processed messages here but if we rely on database, we can have that case sometimes.
  // The quick way to verify them is to add a sanitation check against the spoke connector.
  const messages: XMessage[] = [];
  const processedMessages: XMessage[] = [];
  for (const message of _messages) {
    const messageEncodedData = contracts.spokeConnector.encodeFunctionData("messages", [message.leaf]);
    try {
      const messageResultData = await chainreader.readTx({
        domain: +destinationDomain,
        to: destinationSpokeConnector,
        data: messageEncodedData,
      });

      const [messageStatus] = contracts.spokeConnector.decodeFunctionResult("messages", messageResultData);
      if (messageStatus == 0) messages.push(message);
      else if (messageStatus == 2)
        processedMessages.push({
          ...message,
          destination: { returnData: message.destination?.returnData ?? "", processed: true },
        });
    } catch (err: unknown) {
      logger.debug(
        "Failed to read the message status from onchain",
        requestContext,
        methodContext,
        jsonifyError(err as NxtpError),
      );
    }
  }

  if (processedMessages.length > 0) {
    logger.info("Saving the processed messages", requestContext, methodContext, { count: processedMessages.length });
    await database.saveMessages(processedMessages);
  }

  if (messages.length === 0) {
    logger.info("No messages to enqueue", requestContext, methodContext, {
      originDomain,
      destinationDomain,
    });
    return undefined;
  }

  return {
    messages,
    originDomain,
    destinationDomain,
    messageRoot: targetMessageRoot,
    messageRootIndex,
    messageRootCount,
    aggregateRoot: targetAggregateRoot,
    aggregateRootCount,
  };
};
