import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  SparseMerkleTree,
  RootMessage,
  ReceivedAggregateRoot,
  GELATO_RELAYER_ADDRESS,
  createRequestContext,
  RequestContext,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoAggregateRootCount,
  NoMessageRootIndex,
  NoMessageRootCount,
  NoMessageRootProof,
  NoMessageProof,
  NoTargetMessageRoot,
  NoReceivedAggregateRoot,
} from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { HubDBHelper, SpokeDBHelper } from "../adapters";
import { getContext } from "../prover";
import { DEFAULT_PROVER_BATCH_SIZE } from "../../../config";

export type ProofStruct = {
  message: string;
  path: string[];
  index: number;
};
export type BrokerMessage = {
  messages: XMessage[];
  originDomain: string;
  destinationDomain: string;
  messageRoot: string;
  messageRootIndex: number;
  messageRootCount: number;
  aggregateRoot: string;
  aggregateRootCount: number;
};

const PROVER_QUEUE = "proverX";

export const enqueue = async () => {
  const { requestContext, methodContext } = createLoggingContext(enqueue.name);
  const {
    logger,
    adapters: { database, mqClient },
    config,
  } = getContext();
  const channel = await mqClient.createChannel();
  await channel.assertExchange(config.messageQueue.exchange.name, config.messageQueue.exchange.type, {
    durable: config.messageQueue.exchange.durable,
  });

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
                  const unprocessed: XMessage[] = await database.getUnProcessedMessagesByIndex(
                    originDomain,
                    destinationDomain,
                    latestMessageRoot.count,
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
    adapters: { contracts, chainreader },
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
    } catch (err: unknown) {
      logger.debug(
        "Failed to read the message status from onchain",
        requestContext,
        methodContext,
        jsonifyError(err as NxtpError),
      );
    }
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

export const processMessages = async (brokerMessage: BrokerMessage, _requestContext: RequestContext) => {
  const {
    logger,
    adapters: { contracts, relayers, chainreader, database },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(processMessages.name, _requestContext);
  const {
    messages,
    originDomain,
    destinationDomain,
    messageRoot,
    messageRootIndex,
    messageRootCount,
    aggregateRoot,
    aggregateRootCount,
  } = brokerMessage;

  const spokeStore = new SpokeDBHelper(originDomain, messageRootCount + 1, database);
  const hubStore = new HubDBHelper("hub", aggregateRootCount, database);
  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

  const destinationSpokeConnector = config.chains[destinationDomain]?.deployments.spokeConnector;
  if (!destinationSpokeConnector) {
    throw new NoDestinationDomainForProof(destinationDomain);
  }

  // process messages
  const messageProofs: ProofStruct[] = [];
  for (const message of messages) {
    const messageProof: ProofStruct = {
      message: message.origin.message,
      path: await spokeSMT.getProof(message.origin.index),
      index: message.origin.index,
    };
    if (!messageProof.path) {
      throw new NoMessageProof(messageProof.index, message.leaf);
    }
    // Verify proof of inclusion of message in messageRoot.
    const messageVerification = spokeSMT.verify(message.origin.index, message.leaf, messageProof.path, messageRoot);
    if (messageVerification && messageVerification.verified) {
      logger.info("Message Verified successfully", requestContext, methodContext, {
        messageIndex: message.origin.index,
        leaf: message.leaf,
        messageRoot,
        messageVerification,
      });
    } else {
      logger.info("Message verification failed", requestContext, methodContext, {
        messageIndex: message.origin.index,
        leaf: message.leaf,
        messageRoot,
        messageVerification,
      });
      // Do not process message if proof verification fails.
      continue;
    }
    messageProofs.push(messageProof);
  }

  if (messageProofs.length === 0) {
    logger.info("Empty message proofs", requestContext, methodContext, {
      originDomain,
      destinationDomain,
    });
    return;
  }

  // Proof path for proving inclusion of messageRoot in aggregateRoot.
  const messageRootProof = await hubSMT.getProof(messageRootIndex);
  if (!messageRootProof) {
    throw new NoMessageRootProof(messageRootIndex, messageRoot);
  }
  // Verify proof of inclusion of messageRoot in aggregateRoot.
  const rootVerification = hubSMT.verify(messageRootIndex, messageRoot, messageRootProof, aggregateRoot);
  if (rootVerification && rootVerification.verified) {
    logger.info("MessageRoot Verified successfully", requestContext, methodContext, {
      messageRoot,
      aggregateRoot,
      messageRootProof,
      rootVerification,
    });
  } else {
    logger.info("MessageRoot verification failed", requestContext, methodContext, {
      messageRootIndex,
      messageRoot,
      aggregateRoot,
      messageRootProof,
      rootVerification,
    });
  }
  // Batch submit messages by destination domain
  try {
    const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      messageProofs,
      aggregateRoot,
      messageRootProof,
      messageRootIndex,
    ]);

    logger.info("Proving and processing messages", requestContext, methodContext, {
      destinationDomain,
      data,
      destinationSpokeConnector,
    });

    const proveAndProcessEncodedData = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      messageProofs,
      aggregateRoot,
      messageRootProof,
      messageRootIndex,
    ]);

    logger.debug("Proving and processing messages", requestContext, methodContext, {
      messages,
      proveAndProcessEncodedData,
      destinationSpokeConnector,
    });
    const chainId = chainData.get(destinationDomain)!.chainId;

    /// Temp: Using relayer proxy
    const domain = +destinationDomain;
    const relayerAddress = GELATO_RELAYER_ADDRESS; // hardcoded gelato address will always be whitelisted

    logger.info("Sending tx to relayer", requestContext, methodContext, {
      relayer: relayerAddress,
      spokeConnector: destinationSpokeConnector,
      domain,
    });

    const {
      _proofs: proofs,
      _aggregateRoot: aggregateRoot,
      _aggregatePath: aggregatePath,
      _aggregateIndex: aggregateIndex,
    } = contracts.spokeConnector.decodeFunctionData("proveAndProcess", proveAndProcessEncodedData);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const encodedData = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      proofs,
      aggregateRoot,
      aggregatePath,
      aggregateIndex,
    ]);

    const { taskId } = await sendWithRelayerWithBackup(
      chainId,
      destinationDomain,
      destinationSpokeConnector,
      encodedData,
      relayers,
      chainreader,
      logger,
      requestContext,
    );
    logger.info("Proved and processed message sent to relayer", requestContext, methodContext, { taskId });
  } catch (err: unknown) {
    logger.error("Error sending proofs to relayer", requestContext, methodContext, jsonifyError(err as NxtpError));
  }
};
