import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getContext } from "../../backend";
import { updateTransfers } from "../../lib/operations";
import { updateRouters } from "../../lib/operations/routers";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindPoller = async (_pollInterval?: number) => {
  const { config } = getContext();
  const pollInterval = _pollInterval ?? config.pollInterval;
  interval(async (_) => {
    await poller();
  }, pollInterval);
};

export const poller = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(poller.name);
  try {
    logger.debug("Polling loop start", requestContext, methodContext);
    await updateTransfers();
    await updateRouters();
    logger.debug("Polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
