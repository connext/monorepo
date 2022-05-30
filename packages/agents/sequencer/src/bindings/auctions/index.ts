import interval from "interval-promise";
import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getOperations } from "../../lib/operations";
import { getContext } from "../../sequencer";

export const AUCTION_EXECUTOR_POLL_INTERVAL = 15 * 1_000;
export const AUCTION_UPDATER_POLL_INTERVAL = 60 * 1_000;

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindAuctions = async (
  _executorPollInterval = AUCTION_EXECUTOR_POLL_INTERVAL,
  _updaterPollInterval = AUCTION_UPDATER_POLL_INTERVAL,
) => {
  const { logger, config } = getContext();
  const {
    auctions: { executeAuctions },
  } = getOperations();

  interval(async (_, stop) => {
    const { requestContext, methodContext } = createLoggingContext(bindAuctions.name);
    logger.info("Binding bid selection polling loop", requestContext, methodContext);
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        await executeAuctions(requestContext);
      } catch (e: unknown) {
        logger.error("Error in auction execution loop", requestContext, methodContext, jsonifyError(e as Error));
      }
    }
  }, _executorPollInterval);
};
