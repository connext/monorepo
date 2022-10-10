import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  SparseMerkleTree,
  DBHelper,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoAggregatedRoot,
  NoOutboundRootIndex,
  NoOutboundRootProof,
  NoMessageProof,
} from "../../../errors";
import { getContext } from "../prover";
import { SpokeDBHelper, HubDBHelper } from "../adapters/database/helper";

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

  // TODO: Move to per domain storage adapters in context
  const spokeStore = new SpokeDBHelper(message.originDomain) as DBHelper;
  const hubStore = new HubDBHelper("hub") as DBHelper;

  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

  const proof = {
    message: message.origin.message,
    path: await spokeSMT.getProof(message.origin.index),
    index: message.origin.index,
  };
  if (!proof.path) {
    throw new NoMessageProof(proof.index, message.leaf);
  }

  // Index of outboundRoot leaf node in aggregate tree.
  const outboundRootIndex = await database.getOutboutRootIndex(message.origin.root);
  if (!outboundRootIndex) {
    throw new NoOutboundRootIndex(message.origin.root);
  }

  // Get the currentAggregateRoot from on-chain state (or pending, if the validation period
  // has elapsed!) to determine which tree snapshot we should be generating the proof from.
  const targetAggregateRoot = await database.getAggregateRoot(outboundRootIndex);
  if (!targetAggregateRoot) {
    throw new NoAggregatedRoot();
  }

  // Proof path for proving inclusion of outboundRoot in aggregateRoot.
  const outboundRootProof = await hubSMT.getProof(outboundRootIndex);
  if (!outboundRootProof) {
    throw new NoOutboundRootProof(outboundRootIndex, message.origin.root);
  }

  const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
    [proof],
    targetAggregateRoot,
    outboundRootProof,
    outboundRootIndex,
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
