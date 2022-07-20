import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../../subscriber";

export const bindUnhandledErrors = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindUnhandledErrors.name);
  process.on("unhandledRejection", (error) => {
    logger.warn("Unhandled rejection occured!", requestContext, methodContext, { error });
  });

  process.on("uncaughtException", (error) => {
    logger.warn("Uncaught exception occured!", requestContext, methodContext, { error });
  });
};
