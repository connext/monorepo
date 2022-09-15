import { createLoggingContext, jsonifyError, NxtpError, SentRootMessage } from "@connext/nxtp-utils";
import { constants } from "ethers";

import { NoDestinationDomainForProof } from "../../../errors";
import { getContext } from "../prover";

export const bridgePropagate = async () => {
  const { requestContext, methodContext } = createLoggingContext(bridgePropagate.name);
  const {
    logger,
    adapters: { cartographer },
  } = getContext();

  const unprocessed = await cartographer.getSentRootMessages();
  logger.info("Got unprocessed root messages", requestContext, methodContext, { unprocessed });

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

export const processMessage = async (message: SentRootMessage) => {
  const {
    logger,
    adapters: { contracts, relayer, chainreader },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processSentRootMessage");

  //TODO: Implment task algorithm

  logger.info("Message sent to relayer", requestContext, methodContext);
};
