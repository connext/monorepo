import interval from "interval-promise";
import { createLoggingContext } from "@connext/nxtp-utils";

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
  const { requestContext, methodContext } = createLoggingContext(bindAuctions.name);
  logger.info("Binding bid selection polling loop", requestContext, methodContext);

  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await executeAuctions(requestContext);
    }
  }, _executorPollInterval);
};
