import interval from "interval-promise";
import { Bid, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { bidSelection } from "../../lib/operations";
import { getContext } from "../../sequencer";

export const BID_SELECTION_POLL_INTERVAL = 15 * 1_000;

export const bindBidSelection = async () => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindBidSelection.name);

  logger.info("Starting Bid Selection", requestContext, methodContext, {});

  interval(async () => {
    await bidSelection(requestContext);
  }, BID_SELECTION_POLL_INTERVAL);
};
