import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getOperations } from "../../lib/operations";
import { getContext } from "../../lighthouse";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindCartographer = async (_pollInterval: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindCartographer.name);
  const { pollCartographer } = getOperations();
  interval(async (_, stop) => {
    console.log("pollCartographer.....1");
    console.log(config.mode.cleanup);
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        console.log("pollCartographer.....");
        await pollCartographer();
      } catch (e: unknown) {
        logger.error("Error in pollCartographer", requestContext, methodContext, jsonifyError(e as Error));
      }
    }
  }, _pollInterval);
};
