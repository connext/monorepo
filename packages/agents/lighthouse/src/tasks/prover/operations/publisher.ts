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
  RelayerTaskStatus,
  ModeType,
  Snapshot,
  EMPTY_ROOT,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoAggregateRootCount,
  NoMessageRootIndex,
  NoMessageRootCount,
  NoTargetMessageRoot,
  NoReceivedAggregateRoot,
  NoFinalizedAggregateRoot,
  NoDomainInSnapshot,
} from "../../../errors";
import { getContext } from "../prover";
import { DEFAULT_BATCH_WAIT_TIME, DEFAULT_PROVER_BATCH_SIZE, DEFAULT_PROVER_PUB_MAX } from "../../../config";

import { BrokerMessage, PROVER_QUEUE } from "./types";

const DEFAULT_PUBLISHER_WAIT_TIME = 300; // 5 min
/**
 * Pre fetches the unprocessed messages from the database and store them into the `messages` cache
 */
export const prefetch = async () => {
  const { requestContext, methodContext } = createLoggingContext(prefetch.name);
  const {
    logger,
    adapters: { database, cache, relayers },
    config,
  } = getContext();

  // Update relayer tasks
  const pendingTasks = await cache.messages.getPendingTasks(0, 100);
  await Promise.all(
    pendingTasks.map(async (pendingTask) => {
      const { taskId, relayer: relayerType, originDomain, destinationDomain, leaves } = pendingTask;
      const relayer = relayers.find((it) => it.type == relayerType);
      if (relayer) {
        const taskStatus = await relayer.instance.getTaskStatus(taskId);
        if (taskStatus == RelayerTaskStatus.ExecSuccess) {
          await cache.messages.removePending(originDomain, destinationDomain, leaves);
          await cache.messages.removePendingTasks([taskId]);
        } else if (taskStatus == RelayerTaskStatus.ExecReverted || taskStatus == RelayerTaskStatus.Cancelled) {
          await cache.messages.removePendingTasks([taskId]);
          const statuses = leaves.map((it) => ({ leaf: it, status: ExecStatus.None }));
          await cache.messages.setStatus(statuses);
        }
      }
    }),
  );

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
        (message.attempt === 0 || getNtpTimeSeconds() - message.timestamp > waitTime * 2 ** message.attempt) &&
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
    mode,
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
        await Promise.all(
          domains
            .filter((domain) => domain != destinationDomain)
            .map(async (originDomain) => {
              let latestMessageRoot: RootMessage | undefined = undefined;
              let aggregateRootCount: number | undefined;
              let targetMessageRoot: string;
              let messageRootCount: number | undefined;
              let messageRootIndex: number | undefined;
              let snapshot: Snapshot | undefined;
              let targetAggregateRoot: string;
              try {
                // Slowmode
                if (mode === ModeType.SlowMode) {
                  // Slowmode

                  // Find latest received aggregate root propagated via AMB for each destination domain
                  const curDestAggRoots: ReceivedAggregateRoot[] = await database.getLatestAggregateRoots(
                    destinationDomain,
                    3,
                  );

                  if (curDestAggRoots.length == 0) {
                    throw new NoReceivedAggregateRoot(destinationDomain);
                  }
                  logger.debug("Got latest aggregate roots for domain", requestContext, methodContext, {
                    destinationDomain,
                    curDestAggRoots,
                  });

                  targetAggregateRoot = curDestAggRoots[0].root;

                  for (const destAggregateRoot of curDestAggRoots) {
                    latestMessageRoot = await database.getLatestMessageRoot(originDomain, destAggregateRoot.root);
                    if (latestMessageRoot) break;
                  }
                  if (!latestMessageRoot) {
                    throw new NoTargetMessageRoot(originDomain);
                  }
                  // Count of leafs in aggregate tree at targetAggregateRoot.
                  aggregateRootCount = await database.getAggregateRootCount(targetAggregateRoot);
                  if (!aggregateRootCount) {
                    throw new NoAggregateRootCount(targetAggregateRoot);
                  }

                  targetMessageRoot = latestMessageRoot.root;

                  // Index of messageRoot leaf node in aggregate tree.
                  messageRootIndex = await database.getMessageRootIndex(config.hubDomain, targetMessageRoot);
                  if (messageRootIndex === undefined) {
                    throw new NoMessageRootIndex(originDomain, targetMessageRoot);
                  }
                } else {
                  // Optimistic mode

                  // Find latest finalized aggregate root each destination domain
                  const latestFinalizedRoot = await database.getLatestFinalizedOptimisticRoot(destinationDomain);

                  if (!latestFinalizedRoot) {
                    throw new NoFinalizedAggregateRoot(destinationDomain);
                  }

                  logger.debug("Got latest finalized aggregate root for domain", requestContext, methodContext, {
                    destinationDomain,
                    latestFinalizedRoot,
                  });

                  targetAggregateRoot = latestFinalizedRoot.aggregateRoot;

                  snapshot = await database.getFinalizedSnapshot(targetAggregateRoot);
                  if (snapshot) {
                    logger.debug("Got pending snapshot", requestContext, methodContext, {
                      snapshot,
                      destinationDomain,
                    });
                  } else {
                    logger.debug("No pending snapshot to process.", requestContext, methodContext, {
                      snapshot,
                      destinationDomain,
                    });
                    return;
                  }
                  const domainIndex = snapshot.domains.indexOf(originDomain);
                  if (domainIndex === -1) {
                    throw new NoDomainInSnapshot(originDomain, snapshot);
                  }
                  targetMessageRoot = snapshot.roots[domainIndex];
                  if (!targetMessageRoot) {
                    throw new NoTargetMessageRoot(originDomain);
                  }
                  // Count of leafs in aggregate tree at snapshot baseAggregateRoot.
                  const _baseAggregateRootCount =
                    snapshot.baseAggregateRoot === EMPTY_ROOT
                      ? 0
                      : await database.getAggregateRootCount(snapshot.baseAggregateRoot);
                  if (_baseAggregateRootCount === undefined) {
                    throw new NoAggregateRootCount(snapshot.baseAggregateRoot);
                  }
                  aggregateRootCount = snapshot.roots.length + _baseAggregateRootCount;
                  messageRootIndex = _baseAggregateRootCount + domainIndex;
                }

                // Count of leaf nodes in origin domain`s outbound tree with the targetMessageRoot as root
                messageRootCount =
                  targetMessageRoot === EMPTY_ROOT
                    ? 0
                    : await database.getMessageRootCount(originDomain, targetMessageRoot);
                if (messageRootCount === undefined) {
                  throw new NoMessageRootCount(originDomain, targetMessageRoot);
                }
                const batchSize = config.proverBatchSize[destinationDomain] ?? DEFAULT_PROVER_BATCH_SIZE;
                const batchWaitTime = config.proverBatchWaitTime[destinationDomain] ?? DEFAULT_BATCH_WAIT_TIME;
                const pendingMessages = await getUnProcessedMessagesByIndex(
                  originDomain,
                  destinationDomain,
                  messageRootCount,
                );

                // Paginate through all unprocessed messages from the domain
                let offset = 0;
                let end = false;
                while (!end) {
                  const unprocessed = pendingMessages.slice(offset, offset + batchSize);
                  const subContext = createRequestContext(
                    "processUnprocessedMessages",
                    `${originDomain}-${destinationDomain}-${offset}-${targetMessageRoot}`,
                  );
                  if (unprocessed.length > 0) {
                    const lastBatchExecutionTime = await cache.messages.getLastBatchTime(
                      originDomain,
                      destinationDomain,
                    );
                    const fullyBatched = unprocessed.length >= batchSize;
                    const waitTimePassed = getNtpTimeSeconds() - lastBatchExecutionTime > batchWaitTime;

                    if (fullyBatched || waitTimePassed) {
                      logger.info(
                        "Got unprocessed messages for origin and destination pair",
                        subContext,
                        methodContext,
                        {
                          unprocessed: unprocessed.map((message) => message.leaf),
                          originDomain,
                          destinationDomain,
                          endIndex: messageRootCount,
                          offset,
                          fullyBatched,
                          waitTimePassed,
                        },
                      );
                    } else {
                      logger.info(
                        "Skipping to publish messages for origin and destination pair",
                        subContext,
                        methodContext,
                        {
                          unprocessed: unprocessed.map((message) => message.leaf),
                          originDomain,
                          destinationDomain,
                          endIndex: messageRootCount,
                          offset,
                          fullyBatched,
                          waitTimePassed,
                        },
                      );
                      return;
                    }

                    const brokerMessage = await createBrokerMessage(
                      unprocessed,
                      originDomain,
                      destinationDomain,
                      targetMessageRoot,
                      messageRootIndex,
                      messageRootCount,
                      targetAggregateRoot,
                      aggregateRootCount,
                      snapshot ? snapshot.roots : [],
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
                          endIndex: messageRootCount,
                          offset,
                          brokerMessage,
                        },
                      );

                      await cache.messages.setLastBatchTime(originDomain, destinationDomain, getNtpTimeSeconds());
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
  snapshotRoots: string[],
  _requestContext: RequestContext,
): Promise<BrokerMessage | undefined> => {
  const {
    logger,
    adapters: { contracts, chainreader, databaseWriter },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(createBrokerMessage.name, _requestContext);

  const destinationSpokeMerkle = config.chains[destinationDomain]?.deployments.spokeMerkleTree;
  if (!destinationSpokeMerkle) {
    throw new NoDestinationDomainForProof(destinationDomain);
  }

  // In worst case, the message status couldn't get reflected to the database properly.
  // To avoid the failure in case we do proveAndProcess in batch, that wouldn't make sense that the unprocessed messages fail due to any processed messages but not reflected to the db.
  // Ideally, we shouldn't pick the processed messages here but if we rely on database, we can have that case sometimes.
  // The quick way to verify them is to add a sanitation check against the spoke connector.
  const messages: XMessage[] = [];
  const processedMessages: XMessage[] = [];
  for (const message of _messages) {
    const messageEncodedData = contracts.merkleTreeManager.encodeFunctionData("leaves", [message.leaf]);
    try {
      const messageResultData = await chainreader.readTx({
        domain: +destinationDomain,
        to: destinationSpokeMerkle,
        data: messageEncodedData,
      });

      const [messageStatus] = contracts.merkleTreeManager.decodeFunctionResult("leaves", messageResultData);
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
    snapshotRoots,
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
