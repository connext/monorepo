import { createLoggingContext, jsonifyError, NxtpError, XMessage, SparseMerkleTree } from "@connext/nxtp-utils";

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

  // process messages
  await Promise.all(
    domains.map(async (domain) => {
      try {
        const latestMessageRoot = await database.getLatestMessageRoot(domain);
        if (!latestMessageRoot) {
          throw new NoTargetMessageRoot(domain);
        }

        // Paginate through all unprocessed messages from the domain
        let offset = 0;
        let end = false;
        while (!end) {
          const unprocessed = await database.getUnProcessedMessagesByIndex(domain, latestMessageRoot, offset, 100);
          if (unprocessed.length > 0) {
            // Batch process messages from the same origin domain
            await processMessages(unprocessed, domain, latestMessageRoot);
            offset += unprocessed.length;
            logger.info("Got unprocessed messages by domain", requestContext, methodContext, {
              unprocessed,
              domain,
              offset,
            });
          } else {
            // End the loop if no more messages are found
            end = true;
            logger.info("No unprocessed messages from the domain", requestContext, methodContext, { domain, offset });
          }
        }
      } catch (err: unknown) {
        logger.error("Error processing messages", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }),
  );
};

export const processMessages = async (messages: XMessage[], originDomain: string, targetMessageRoot: any) => {
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

  // Organize the messages by their destination domain
  const messagesByDestination = new Map<string, XMessage[]>();

  // process messages
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
    }

    if (!messagesByDestination.has(message.destinationDomain)) {
      messagesByDestination.set(message.destinationDomain, []);
    }
    messagesByDestination.get(message.destinationDomain)?.push(messageProof);
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
  await Promise.all(
    Array.from(messagesByDestination).map(async ([destinationDomain, messageProofs]) => {
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
          messages,
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
    }),
  );
};
