/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
  Snapshot,
  DBHelper,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoAggregatedRoot,
  NoAggregateRootCount,
  NoMessageRootIndex,
  NoMessageRoot,
  NoBaseAggregateRootCount,
  NoMessageRootCount,
  NoMessageRootProof,
  NoMessageProof,
  NoTargetMessageRoot,
  NoReceivedAggregateRoot,
  NoDomainInSnapshot,
} from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { HubDBHelper, SpokeDBHelper, OptimisticHubDBHelper } from "../adapters";
import { getContext } from "../prover";
import { DEFAULT_PROVER_BATCH_SIZE } from "../../../config";

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

  // Batch size of proofs to send to relayer.

  // Process messages
  // Batch messages to be processed by origin_domain and destination_domain.
  await Promise.all(
    domains.map(async (destinationDomain) => {
      try {
        const curDestAggRoots: ReceivedAggregateRoot[] | undefined = await database.getLatestAggregateRoots(
          destinationDomain,
          1, //limit
        );

        if (!curDestAggRoots || curDestAggRoots.length == 0) {
          throw new NoReceivedAggregateRoot(destinationDomain);
        }
        const curDestAggRoot = curDestAggRoots[0];
        logger.debug("Got latest aggregate root for domain", requestContext, methodContext, {
          destinationDomain,
          curDestAggRoot,
        });

        await Promise.all(
          domains
            .filter((domain) => domain != destinationDomain)
            .map(async (originDomain) => {
              try {
                const latestMessageRoot: RootMessage | undefined = await database.getLatestMessageRoot(
                  originDomain,
                  curDestAggRoot.root,
                );
                if (!latestMessageRoot) {
                  throw new NoTargetMessageRoot(originDomain);
                }
                // Paginate through all unprocessed messages from the domain
                let offset = 0;
                let end = false;
                while (!end) {
                  logger.info(
                    "Getting unprocessed messages for origin and destination pair",
                    requestContext,
                    methodContext,

                    {
                      batchSize: config.proverBatchSize,
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
                    config.proverBatchSize[destinationDomain] ?? DEFAULT_PROVER_BATCH_SIZE,
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
                    // Batch process messages from the same origin domain
                    await processMessages(
                      unprocessed,
                      originDomain,
                      destinationDomain,
                      latestMessageRoot.root,
                      subContext,
                    );
                    offset += unprocessed.length;
                    logger.info(
                      "Processed unprocessed messages for origin and destination pair",
                      subContext,
                      methodContext,
                      {
                        unprocessed,
                        originDomain,
                        destinationDomain,
                        offset,
                      },
                    );
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
  messages: XMessage[],
  originDomain: string,
  destinationDomain: string,
  targetMessageRoot: string,
  // mode: string, //TODO: Needed ?Default
  _requestContext: RequestContext,
  snapshot?: Snapshot,
) => {
  const {
    logger,
    adapters: { contracts, relayers, database, databaseWriter, chainreader, cache },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage", _requestContext);

  // Count of leaf nodes in origin domain`s outbound tree with the targetMessageRoot as root
  const messageRootCount = await database.getMessageRootCount(originDomain, targetMessageRoot);
  if (messageRootCount === undefined) {
    throw new NoMessageRootCount(originDomain, targetMessageRoot);
  }

  // Get the currentAggregateRoot from on-chain state (or pending, if the validation period
  // has elapsed!) to determine which tree snapshot we should be generating the proof from.
  let aggregateRootCount = undefined;
  let targetAggregateRoot: string | undefined = "";
  let messageRootIndex = undefined;
  let opRoots: string[] = [];
  if (snapshot && snapshot.aggregateRoot) {
    targetAggregateRoot = snapshot.aggregateRoot;
    const baseAggregateRootCount = await database.getAggregateRootCount(snapshot.baseAggregateRoot);
    if (!baseAggregateRootCount) {
      throw new NoBaseAggregateRootCount(snapshot.baseAggregateRoot);
    }
    aggregateRootCount = baseAggregateRootCount + snapshot.roots.length;
    messageRootIndex = baseAggregateRootCount + snapshot.roots.indexOf(targetMessageRoot);

    // Get all roots for virtual tree
    const baseAggregateRoots: string[] = await database.getAggregateRoots(baseAggregateRootCount);
    opRoots = baseAggregateRoots.concat(snapshot.roots);
  } else {
    targetAggregateRoot = await database.getAggregateRoot(targetMessageRoot);
    if (!targetAggregateRoot) {
      throw new NoAggregatedRoot();
    }
    aggregateRootCount = await database.getAggregateRootCount(targetAggregateRoot);
    // Index of messageRoot leaf node in aggregate tree.
    messageRootIndex = await database.getMessageRootIndex(config.hubDomain, targetMessageRoot);
  }

  if (!aggregateRootCount) {
    throw new NoAggregateRootCount(targetAggregateRoot);
  }

  if (messageRootIndex === undefined) {
    throw new NoMessageRootIndex(originDomain, targetMessageRoot);
  }

  // Count of leafs in aggregate tree at targetAggregateRoot.
  const spokeStore = new SpokeDBHelper(
    originDomain,
    messageRootCount + 1,
    {
      reader: database,
      writer: databaseWriter,
    },
    cache.messages,
  );

  //Switch for optimistic hub
  const hubStore: DBHelper = snapshot
    ? new OptimisticHubDBHelper(opRoots, aggregateRootCount)
    : new HubDBHelper(
        "hub",
        aggregateRootCount,
        {
          reader: database,
          writer: databaseWriter,
        },
        cache.messages,
      );

  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

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

    const destinationSpokeConnector = config.chains[destinationDomain]?.deployments.spokeConnector;
    if (!destinationSpokeConnector) {
      throw new NoDestinationDomainForProof(destinationDomain);
    }
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

export const proveAndProcessOpMode = async () => {
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
        const curDestAggRoots: ReceivedAggregateRoot[] | undefined = await database.getLatestAggregateRoots(
          destinationDomain,
          1, //limit
        );
        if (!curDestAggRoots || curDestAggRoots.length == 0) {
          throw new NoReceivedAggregateRoot(destinationDomain);
        }
        const curDestAggRoot = curDestAggRoots[0];
        logger.debug("Got latest aggregate root for domain", requestContext, methodContext, {
          destinationDomain,
          curDestAggRoot,
        });
        // TODO: As an improvement we could mark snapshots as processed: true to avoid iteraing
        //  over fully processed snapshots.
        const snapshot = await database.getPendingAggregateRoot(curDestAggRoot.root);
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
        await Promise.all(
          domains
            .filter((domain) => domain != destinationDomain)
            .map(async (originDomain) => {
              const domainIndex = snapshot.domains.indexOf(originDomain);
              if (domainIndex === -1) {
                throw new NoDomainInSnapshot(originDomain, snapshot);
              }
              const messageRoot = snapshot.roots[domainIndex];

              try {
                const message: XMessage | undefined = await database.getMessageByRoot(originDomain, messageRoot);
                if (!message) {
                  throw new NoMessageRoot(originDomain, messageRoot);
                }
                // Paginate through all unprocessed messages from the domain
                let offset = 0;
                let end = false;
                while (!end) {
                  logger.info(
                    "Getting unprocessed messages for origin and destination pair",
                    requestContext,
                    methodContext,
                    { batchSize: config.proverBatchSize, offset, originDomain, destinationDomain },
                  );
                  const unprocessed: XMessage[] = await database.getUnProcessedMessagesByIndex(
                    originDomain,
                    destinationDomain,
                    message.origin.index,
                    offset,
                    config.proverBatchSize[destinationDomain] ?? DEFAULT_PROVER_BATCH_SIZE,
                  );
                  const subContext = createRequestContext(
                    "processUnprocessedMessages",
                    `${originDomain}-${destinationDomain}-${offset}-${message.origin.root}`,
                  );
                  if (unprocessed.length > 0) {
                    logger.info("Got unprocessed messages for origin and destination pair", subContext, methodContext, {
                      unprocessed,
                      originDomain,
                      destinationDomain,
                      offset,
                    });
                    // Batch process messages from the same origin domain
                    await processMessages(
                      unprocessed,
                      originDomain,
                      destinationDomain,
                      message.origin.root,
                      subContext,
                      snapshot,
                    );
                    offset += unprocessed.length;
                    logger.info(
                      "Processed unprocessed messages for origin and destination pair",
                      subContext,
                      methodContext,
                      {
                        unprocessed,
                        originDomain,
                        destinationDomain,
                        offset,
                      },
                    );
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
