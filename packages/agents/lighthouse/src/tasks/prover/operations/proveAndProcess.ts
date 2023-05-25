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
import { DEFAULT_CONCURRENCY, DEFAULT_PROVER_BATCH_SIZE } from "../../../config";

export type ProofStruct = {
  message: string;
  path: string[];
  index: number;
};

export const proveAndProcess = async () => {
  const { requestContext, methodContext } = createLoggingContext(proveAndProcess.name);
  const {
    logger,
    adapters: { database },
    config,
  } = getContext();

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
                // TODO: Move to per domain storage adapters in context
                const spokeStore = new SpokeDBHelper(originDomain, messageRootCount + 1, database);
                const hubStore = new HubDBHelper("hub", aggregateRootCount, database);

                const spokeSMT = new SparseMerkleTree(spokeStore);
                const hubSMT = new SparseMerkleTree(hubStore);
                const batchSize = config.proverBatchSize[destinationDomain] ?? DEFAULT_PROVER_BATCH_SIZE;
                const concurrency = config.concurrency ?? DEFAULT_CONCURRENCY;

                // Paginate through all unprocessed messages from the domain
                let offset = 0;
                let end = false;
                let concurrentBatch: Promise<void>[] = [];
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

                    concurrentBatch.push(
                      processMessages(
                        unprocessed,
                        originDomain,
                        destinationDomain,
                        targetMessageRoot,
                        messageRootIndex,
                        targetAggregateRoot.root,
                        spokeSMT,
                        hubSMT,
                        subContext,
                      ),
                    );
                    offset += unprocessed.length;
                    logger.info(
                      "Batched unprocessed messages for origin and destination pair",
                      subContext,
                      methodContext,
                      {
                        originDomain,
                        destinationDomain,
                        offset,
                        batchSize: concurrentBatch.length,
                      },
                    );
                    if (unprocessed.length === 0 || concurrentBatch.length >= concurrency) {
                      await Promise.all(concurrentBatch);
                      concurrentBatch = [];
                      logger.info(
                        "Processed unprocessed messages for origin and destination pair",
                        subContext,
                        methodContext,
                        {
                          originDomain,
                          destinationDomain,
                          offset,
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
};

export const processMessages = async (
  _messages: XMessage[],
  originDomain: string,
  destinationDomain: string,
  targetMessageRoot: string,
  messageRootIndex: number,
  targetAggregateRoot: string,
  spokeSMT: SparseMerkleTree,
  hubSMT: SparseMerkleTree,
  _requestContext: RequestContext,
) => {
  const {
    logger,
    adapters: { contracts, relayers, chainreader },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage", _requestContext);

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
    const messageVerification = spokeSMT.verify(
      message.origin.index,
      message.leaf,
      messageProof.path,
      targetMessageRoot,
    );
    if (messageVerification && messageVerification.verified) {
      logger.info("Message Verified successfully", requestContext, methodContext, {
        messageIndex: message.origin.index,
        leaf: message.leaf,
        targetMessageRoot,
        messageVerification,
      });
    } else {
      logger.info("Message verification failed", requestContext, methodContext, {
        messageIndex: message.origin.index,
        leaf: message.leaf,
        targetMessageRoot,
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
    throw new NoMessageRootProof(messageRootIndex, targetMessageRoot);
  }
  // Verify proof of inclusion of messageRoot in aggregateRoot.
  const rootVerification = hubSMT.verify(messageRootIndex, targetMessageRoot, messageRootProof, targetAggregateRoot);
  if (rootVerification && rootVerification.verified) {
    logger.info("MessageRoot Verified successfully", requestContext, methodContext, {
      targetMessageRoot,
      targetAggregateRoot,
      messageRootProof,
      rootVerification,
    });
  } else {
    logger.info("MessageRoot verification failed", requestContext, methodContext, {
      messageRootIndex,
      targetMessageRoot,
      targetAggregateRoot,
      messageRootProof,
      rootVerification,
    });
  }
  // Batch submit messages by destination domain
  try {
    const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      messageProofs,
      targetAggregateRoot,
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
      targetAggregateRoot,
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
