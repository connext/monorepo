import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  SparseMerkleTree,
  RootMessage,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoAggregatedRoot,
  NoAggregateRootCount,
  NoMessageRootIndex,
  NoMessageRootCount,
  NoMessageRootProof,
  NoMessageProof,
  NoTargetMessageRoot,
} from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { HubDBHelper, SpokeDBHelper } from "../adapters";
import { getContext } from "../prover";

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
  const batchSize = 100;

  // Process messages
  // Batch messages to be processed by origin_domain and destination_domain.
  await Promise.all(
    domains.map(async (originDomain) => {
      try {
        const latestMessageRoot: RootMessage | undefined = await database.getLatestMessageRoot(originDomain);
        if (!latestMessageRoot) {
          throw new NoTargetMessageRoot(originDomain);
        }

        await Promise.all(
          domains.map(async (destinationDomain) => {
            // Paginate through all unprocessed messages from the domain
            let offset = 0;
            let end = false;
            while (!end) {
              const unprocessed: XMessage[] = await database.getUnProcessedMessagesByIndex(
                originDomain,
                destinationDomain,
                latestMessageRoot.count,
                offset,
                batchSize,
              );
              if (unprocessed.length > 0) {
                // Batch process messages from the same origin domain
                await processMessages(unprocessed, originDomain, destinationDomain, latestMessageRoot.root);
                offset += unprocessed.length;
                logger.info("Got unprocessed messages for origin and destination pair", requestContext, methodContext, {
                  unprocessed,
                  originDomain,
                  destinationDomain,
                  offset,
                });
              } else {
                // End the loop if no more messages are found
                end = true;
                if (offset === 0) {
                  logger.info(
                    "No unprocessed messages for origin and destination pair",
                    requestContext,
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
) => {
  const {
    logger,
    adapters: { contracts, relayers, database, chainreader },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage");

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

  // Get the currentAggregateRoot from on-chain state (or pending, if the validation period
  // has elapsed!) to determine which tree snapshot we should be generating the proof from.
  const targetAggregateRoot = await database.getAggregateRoot(targetMessageRoot);
  if (!targetAggregateRoot) {
    throw new NoAggregatedRoot();
  }

  // Count of leafs in aggregate tree at targetAggregateRoot.
  const aggregateRootCount = await database.getAggregateRootCount(targetAggregateRoot);
  if (!aggregateRootCount) {
    throw new NoAggregateRootCount(targetAggregateRoot);
  }
  // TODO: Move to per domain storage adapters in context
  const spokeStore = new SpokeDBHelper(originDomain, messageRootCount + 1, database);
  const hubStore = new HubDBHelper("hub", aggregateRootCount, database);

  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

  // process messages
  const messageProofs: any[] = [];
  for (const message of messages) {
    const messageProof = {
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

    const chainId = chainData.get(destinationDomain)!.chainId;

    const { taskId } = await sendWithRelayerWithBackup(
      chainId,
      destinationDomain,
      destinationSpokeConnector,
      data,
      relayers,
      chainreader,
      logger,
      requestContext,
    );
    logger.info("Proved and processed messages sent to relayer", requestContext, methodContext, {
      taskId,
      destinationDomain,
    });
  } catch (err: unknown) {
    logger.error("Error sending proofs to relayer", requestContext, methodContext, jsonifyError(err as NxtpError));
  }
};
