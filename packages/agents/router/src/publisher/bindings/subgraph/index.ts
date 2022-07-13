import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getXCalls } from "../../operations/getXCalls";
import { getContext } from "../../publisher";

export const bindSubgraph = async (_pollInterval?: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindSubgraph.name);
  const pollInterval = _pollInterval ?? config.polling.subgraph;
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        await getXCalls();
      } catch (e: unknown) {
        logger.error(
          "Error getting xcalls, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
      }
    }
  }, pollInterval);
};
