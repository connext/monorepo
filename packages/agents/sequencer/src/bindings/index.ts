import interval from "interval-promise";

import { AppContext } from "../context";
import { bestBid } from "../lib/operations";

const BEST_BID_POLL_INTERVAL = 15_000;

// Ought to be configured properly for each network; we consult the chain config below.
export const bindBestBids = async (context: AppContext, _pollInterval = BEST_BID_POLL_INTERVAL) => {
  interval(async () => {
    await bestBid();
  }, _pollInterval);
};
