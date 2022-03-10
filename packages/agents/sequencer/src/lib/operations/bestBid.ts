import {
  gelatoSend,
  isChainSupportedByGelato,
  SignedBid,
  jsonifyError,
  RequestContext,
  createLoggingContext,
  formatUrl,
  gelatoRelayEndpoint,
  BidStatus,
  StoredBid,
} from "@connext/nxtp-utils";
import { getContext } from "../../sequencer";

export const bestBid = async (): Promise<any> => {
  const {
    logger,
    chainData,
    adapters: { chainreader, cache },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bestBid.name);
  logger.info(`Method start: ${bestBid.name}`, requestContext, methodContext, {});

  const records = await cache.auctions.getBids(BidStatus.Pending);

  records.map((record: StoredBid) => {
    // TODO: For each record select bestBid and call postBid();
  });
};
