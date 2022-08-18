import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getContext } from "../../executor";
import { pollCartographer } from "../../operations";

export const bindCartographer = async (_pollInterval: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindCartographer.name);
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        await pollCartographer();
      } catch (e: unknown) {
        logger.error("Error in pollCartographer", requestContext, methodContext, jsonifyError(e as Error));
      }
    }
  }, _pollInterval);
};
