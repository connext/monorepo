import interval from "interval-promise";
import { BidStatus, createLoggingContext, StoredBid } from "@connext/nxtp-utils";

import { AppContext } from "../../context";

const BEST_BID_POLL_INTERVAL = 15_000;

// Ought to be configured properly for each network; we consult the chain config below.
export const bindAuctions = async (context: AppContext, _pollInterval = BEST_BID_POLL_INTERVAL) => {
  interval(async () => {
    await bestBid(context);
  }, _pollInterval);
};

export const bestBid = async (context: AppContext): Promise<any> => {
  const {
    logger,
    adapters: { cache },
  } = context;
  const { requestContext, methodContext } = createLoggingContext(bestBid.name);
  logger.info(`Method start: ${bestBid.name}`, requestContext, methodContext, {});

  const records = await cache.auctions.getBids(BidStatus.Pending);

  records.map((record: StoredBid) => {
    // TODO: For each record select bestBid and call postBid();
  });
};
