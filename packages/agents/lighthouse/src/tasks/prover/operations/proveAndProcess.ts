import { createLoggingContext } from "@connext/nxtp-utils";

import { getUnProcessedMessages } from "../bindings/cartographer";
import { getContext } from "../prover";

export const proveAndProcess = async () => {
  const { requestContext, methodContext } = createLoggingContext(proveAndProcess.name);
  const { logger } = getContext();

  const unprocessed = await getUnProcessedMessages();
  logger.info("Got unprocessed messages", requestContext, methodContext, { unprocessed });

  // process messages
};
