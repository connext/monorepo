import { AuctionCache } from "./auction";

export type RouterCache = {
  auctions: AuctionCache;
};

// TODO: This storage endpoint should be considered a stub for a future redis / permanent storage solution.
export const createRouterCache = (): RouterCache => {
  return {
    auctions: new AuctionCache(),
  };
};
