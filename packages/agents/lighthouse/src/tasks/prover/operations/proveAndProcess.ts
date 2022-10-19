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
import { getContext } from "../prover";
import { SpokeDBHelper, HubDBHelper } from "../adapters/database/helper";

export const HUB_DOMAIN = "1735353714";

export const proveAndProcess = async () => {
  const { requestContext, methodContext } = createLoggingContext(proveAndProcess.name);
  const {
    logger,
    adapters: { database },
  } = getContext();

  const unprocessed = await database.getUnProcessedMessages();
  logger.info("Got unprocessed messages", requestContext, methodContext, { unprocessed });

  // process messages
  await Promise.all(
    unprocessed.map(async (message) => {
      try {
        await processMessage(message);
      } catch (err: unknown) {
        logger.error("Error processing message", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }),
  );
};

export const processMessage = async (message: XMessage) => {
  const {
    logger,
    adapters: { contracts, relayer, chainreader, database },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage");

  // Find the first published outbound root that contains the index, for a given domain
  const targetMessageRoot = await database.getMessageRootFromIndex(message.originDomain, message.origin.index);
  if (!targetMessageRoot) {
    throw new NoTargetMessageRoot(message.originDomain, message.origin.index);
  }
  // Count of leaf nodes in origin domain`s outbound tree
  const messageRootCount = await database.getMessageRootCount(message.originDomain, targetMessageRoot);
  if (messageRootCount === undefined) {
    throw new NoMessageRootCount(message.originDomain, targetMessageRoot);
  }
  // Index of messageRoot leaf node in aggregate tree.
  // const messageRootIndex = await database.getMessageRootIndex(message.originDomain, targetMessageRoot);
  const messageRootIndex = await database.getMessageRootIndex(config.hubDomain, targetMessageRoot);
  if (messageRootIndex === undefined) {
    throw new NoMessageRootIndex(message.originDomain, targetMessageRoot);
  }

  // Get the currentAggregateRoot from on-chain state (or pending, if the validation period
  // has elapsed!) to determine which tree snapshot we should be generating the proof from.
  const targetAggregateRoot = await database.getAggregateRoot(messageRootIndex);
  if (!targetAggregateRoot) {
    throw new NoAggregatedRoot();
  }

  // Count of leafs in aggregate tree at targetAggregateRoot.
  const aggregateRootCount = await database.getAggregateRootCount(targetAggregateRoot);
  if (!aggregateRootCount) {
    throw new NoAggregateRootCount(targetAggregateRoot);
  }
  // TODO: Move to per domain storage adapters in context
  const spokeStore = new SpokeDBHelper(message.originDomain, messageRootCount + 1, database);
  const hubStore = new HubDBHelper("hub", aggregateRootCount, database);

  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

  const messageProof = {
    message: message.origin.message,
    path: await spokeSMT.getProof(message.origin.index),
    index: message.origin.index,
  };
  if (!messageProof.path) {
    throw new NoMessageProof(messageProof.index, message.leaf);
  }

  // Proof path for proving inclusion of messageRoot in aggregateRoot.
  const messageRootProof = await hubSMT.getProof(messageRootIndex);
  if (!messageRootProof) {
    throw new NoMessageRootProof(messageRootIndex, message.origin.root);
  }

  // Verify proof of inclusion of message in messageRoot.
  const messageVerification = spokeSMT.verify(message.origin.index, message.leaf, messageProof.path, targetMessageRoot);
  if (messageVerification && messageVerification.verified) {
    logger.info("Message Verified successfully", requestContext, methodContext, {
      messageVerification,
    });
  } else {
    logger.warn("Message verification failed", requestContext, methodContext, {
      messageVerification,
    });
  }

  // Verify proof of inclusion of messageRoot in aggregateRoot.
  const rootVerification = hubSMT.verify(messageRootIndex, targetMessageRoot, messageRootProof, targetAggregateRoot);
  if (rootVerification && rootVerification.verified) {
    logger.info("MessageRoot Verified successfully", requestContext, methodContext, {
      rootVerification,
    });
  } else {
    logger.warn("MessageRoot verification failed", requestContext, methodContext, {
      rootVerification,
    });
  }

  const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
    [messageProof],
    targetAggregateRoot,
    messageRootProof,
    messageRootIndex,
  ]);

  const destinationSpokeConnector = config.chains[message.destinationDomain]?.deployments.spokeConnector;
  if (!destinationSpokeConnector) {
    throw new NoDestinationDomainForProof(message.destinationDomain);
  }
  logger.info("Proving and processing message", requestContext, methodContext, {
    message,
    data,
    destinationSpokeConnector,
  });
  const chainId = chainData.get(message.destinationDomain)!.chainId;

  const relayerAddress = await relayer.getRelayerAddress(chainId, logger);
  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId,
    to: destinationSpokeConnector,
    data,
    from: relayerAddress,
    transferId: message.transferId,
  });
  const gas = await chainreader.getGasEstimateWithRevertCode(Number(message.destinationDomain), {
    chainId,
    to: destinationSpokeConnector,
    data,
    from: relayerAddress,
  });

  logger.info("Sending meta tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    spokeConnector: destinationSpokeConnector,
    domain: message.destinationDomain,
    gas: gas.toString(),
    transferId: message.transferId,
  });

  const taskId = await relayer.send(
    chainId,
    destinationSpokeConnector,
    data,
    config.gelatoApiKey,
    logger,
    requestContext,
  );
  logger.info("Proved and processed message sent to relayer", requestContext, methodContext, { taskId });
};
