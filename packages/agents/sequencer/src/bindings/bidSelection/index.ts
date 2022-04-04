import interval from "interval-promise";
import { createLoggingContext } from "@connext/nxtp-utils";

import { bidSelection } from "../../lib/operations";
import { getContext } from "../../sequencer";

export const BID_SELECTION_POLL_INTERVAL = 15 * 1_000;

export const bindBidSelection = async (_pollInterval = BID_SELECTION_POLL_INTERVAL) => {
  const { logger, config } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindBidSelection.name);
  logger.info("Binding bid selection polling loop", requestContext, methodContext, {});

  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await bidSelection(requestContext);
    }
  }, _pollInterval);
};
