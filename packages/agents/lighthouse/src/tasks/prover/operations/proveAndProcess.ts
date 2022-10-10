import { createLoggingContext, jsonifyError, NxtpError, XMessage } from "@connext/nxtp-utils";
import { constants } from "ethers";

import { NoDestinationDomainForProof } from "../../../errors";
import { getContext } from "../prover";

export const proveAndProcess = async () => {
  const { requestContext, methodContext } = createLoggingContext(proveAndProcess.name);
  const {
    logger,
    adapters: { cartographer },
  } = getContext();

  const unprocessed = await cartographer.getUnProcessedMessages();
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
    adapters: { contracts, relayer, chainreader },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage");

  const proof = {
    message: message.origin.message, // Message bytes.
    // TODO: Get real path from utility.
    path: Array(32).fill(constants.HashZero) as string[], // bytes32[32] proof path.
    index: message.origin.index, // Index of message leaf node.
  };

  // TODO: Proof path for proving inclusion of outboundRoot in aggregateRoot.
  // Will need to get the currentAggregateRoot from on-chain state (or pending, if the validation period
  // has elapsed!) to determine which tree snapshot we should be generating the proof from.
  const targetAggregateRoot = constants.HashZero;
  const aggregatorProof = Array(32).fill(constants.HashZero) as string[];
  // TODO: Index of outboundRoot leaf node in aggregate tree.
  const aggregatorIndex = 0;

  const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
    [proof],
    targetAggregateRoot,
    aggregatorProof,
    aggregatorIndex,
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
