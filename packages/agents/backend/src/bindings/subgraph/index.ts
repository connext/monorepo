import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getContext } from "../../backend";
import { updateTransfers } from "../../lib/operations";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindSubgraph = async (_pollInterval: number) => {
  interval(async (_) => {
    await pollSubgraph();
  }, _pollInterval);
};

export const pollSubgraph = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  try {
    await updateTransfers();
  } catch (err: unknown) {
    logger.error(
      "Error getting pending txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
