import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  RootMessage,
  ReceivedAggregateRoot,
  createRequestContext,
  RequestContext,
  getNtpTimeSeconds,
  ExecStatus,
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
import { DEFAULT_PROVER_BATCH_SIZE, DEFAULT_PROVER_PUB_MAX } from "../../../config";

import { BrokerMessage, PROVER_QUEUE } from "./types";

const DEFAULT_PUBLISHER_WAIT_TIME = 300; // 5 min
/**
 * Pre fetches the unprocessed messages from the database and store them into the `messages` cache
 */
export const prefetch = async () => {
  const { requestContext, methodContext } = createLoggingContext(prefetch.name);
  const {
    logger,
    adapters: { database, cache },
    config,
  } = getContext();

  // Only process configured chains.
  const domains: string[] = Object.keys(config.chains);
  for (const originDomain of domains) {
    const cachedNonce = await cache.messages.getNonce(originDomain);
    const startIndex = cachedNonce == 0 ? 0 : cachedNonce + 1;
    logger.info("Getting unprocessed messages from database", requestContext, methodContext, {
      originDomain,
      startIndex,
    });

    const unprocessed: XMessage[] = await database.getUnProcessedMessages(originDomain, 1000, 0, startIndex);
    const indexes = unprocessed.map((item: XMessage) => item.origin.index);
    if (indexes.length > 0) {
      logger.info(
        "Stored unprocessed messages in the cache",
        requestContext,
        methodContext,

        {
          originDomain,
          startIndex,
          min: Math.min(...indexes),
          max: Math.max(...indexes),
        },
      );

      await cache.messages.storeMessages(unprocessed);
      await cache.messages.setNonce(originDomain, Math.max(...indexes));
    }
  }
};

/**
 * Gets unprocessed messages from the cache for a given domain pair.
 * @param originDomain - The origin domain.
 * @param destinationDomain - The destination domain.
 * @param endIndex - The upper bound
 */
export const getUnProcessedMessagesByIndex = async (
  originDomain: string,
  destinationDomain: string,
  endIndex: number,
): Promise<XMessage[]> => {
  const {
    config,
    adapters: { cache },
  } = getContext();
  const pendingMessages: XMessage[] = [];
  const waitTime = config.messageQueue.publisherWaitTime ?? DEFAULT_PUBLISHER_WAIT_TIME;
  let offset = 0;
  const limit = 1000;
  let end = false;
  while (!end) {
    const leaves = await cache.messages.getPending(originDomain, destinationDomain, offset, limit);
    for (const leaf of leaves) {
      const message = await cache.messages.getMessage(leaf);
      if (
        message &&
        getNtpTimeSeconds() - message.timestamp >= waitTime * 2 ** message.attempt &&
        message.data.origin.index <= endIndex &&
        message.status == ExecStatus.None
      ) {
        pendingMessages.push(message.data);
      }
    }
    if (leaves.length == limit) offset += limit;
    else end = true;
  }

  return pendingMessages;
};

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

  // Set a max limit on the number of messages published to the queue in this iteration.
  const proverPubMax = config.proverPubMax ?? DEFAULT_PROVER_PUB_MAX;
  // Track the number of messages published to the queue in this iteration.
  let publishedCount = 0;

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
                const pendingMessages = await getUnProcessedMessagesByIndex(
                  originDomain,
                  destinationDomain,
                  latestMessageRoot.count,
                );

                // Paginate through all unprocessed messages from the domain
                let offset = 0;
                let end = false;
                while (!end) {
                  const unprocessed = pendingMessages.slice(offset, offset + batchSize);
                  const subContext = createRequestContext(
                    "processUnprocessedMessages",
                    `${originDomain}-${destinationDomain}-${offset}-${latestMessageRoot.root}`,
                  );
                  if (unprocessed.length > 0) {
                    logger.info("Got unprocessed messages for origin and destination pair", subContext, methodContext, {
                      unprocessed: unprocessed.map((message) => message.leaf),
                      originDomain,
                      destinationDomain,
                      endIndex: latestMessageRoot.count,
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
                      const statuses = brokerMessage.messages.map((it) => ({
                        leaf: it.leaf,
                        status: ExecStatus.Enqueued,
                      }));
                      await cache.messages.setStatus(statuses);
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
                          endIndex: latestMessageRoot.count,
                          offset,
                          brokerMessage,
                        },
                      );
                    }

                    offset += unprocessed.length;
                    publishedCount += unprocessed.length;
                    if (publishedCount >= proverPubMax) {
                      end = true;
                      logger.info(
                        "Reached max limit on published messages for this iteration",
                        subContext,
                        methodContext,
                        {
                          originDomain,
                          destinationDomain,
                          offset,
                          publishedCount,
                          maxLimit: proverPubMax,
                        },
                      );
                    }
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
                  "Error processing messages on origin",
                  requestContext,
                  methodContext,
                  jsonifyError(err as NxtpError),
                  { originDomain, destinationDomain },
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
    adapters: { contracts, chainreader, databaseWriter },
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
    await databaseWriter.database.saveMessages(processedMessages, databaseWriter.pool);
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

/**
 * Acquire lock.
 * Mutex to prevent multiple instances of the prover from running at the same time.
 */
export const acquireLock = async () => {
  const { requestContext, methodContext } = createLoggingContext(acquireLock.name);
  const {
    logger,
    adapters: { cache },
    config,
  } = getContext();
  // Check if the lock is already acquired.
  const lock = await cache.messages.getCurrentLock();
  if (lock) {
    logger.info("Lock already acquired", requestContext, methodContext, lock);
    const waitTime = config.messageQueue.publisherWaitTime ?? DEFAULT_PUBLISHER_WAIT_TIME;
    if (getNtpTimeSeconds() - lock.timestamp <= waitTime) {
      return false;
    }
  }
  logger.info("Overriding current lock", requestContext, methodContext, lock);
  await cache.messages.acquireLock(requestContext.id);
  logger.info("Lock acquired", requestContext, methodContext);
  return true;
};

/**
 * Release lock.
 * Mutex to prevent multiple instances of the prover from running at the same time.
 */
export const releaseLock = async () => {
  const { requestContext, methodContext } = createLoggingContext(releaseLock.name);
  const {
    logger,
    adapters: { cache },
  } = getContext();
  // Check if the lock is already acquired.
  await cache.messages.releaseLock();
  logger.info("Cache lock released", requestContext, methodContext);
};
