import { AppContext } from "../../context";

import { AuctionCache } from "./auction";

export type ChainCache = {
  auctions: AuctionCache;
};

// TODO: This storage endpoint should be considered a stub for a future redis / permanent storage solution.
export class RouterCache {
  private readonly cache: Map<string, ChainCache> = new Map();

  constructor(private readonly context: AppContext) {
    if (this.context.adapters.cache) {
      throw new Error("Instance already exists.");
    }
    for (const chain of Object.keys(context.config.chains)) {
      this.cache.set(chain, {
        auctions: new AuctionCache(),
      });
    }
  }
}
