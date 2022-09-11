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
    adapters: { contracts, relayer },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage");

  const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
    message.origin.message,
    Array(32).fill(constants.HashZero) as string[],
    message.origin.index,
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
  const taskId = await relayer.send(+message.destinationDomain, destinationSpokeConnector, data);
  logger.info("Proved and processed message sent to relayer", requestContext, methodContext, { taskId });
};
