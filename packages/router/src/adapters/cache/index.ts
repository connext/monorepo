import { BigNumber } from "ethers";

import { AppContext } from "../../context";

import { AuctionCache } from "./auction";

export type ChainCache = {
  auctions: AuctionCache;
};

// TODO: This storage endpoint should be considered a stub for a future redis / permanent storage solution.
export class RouterCache {
  private readonly cache: Map<string, ChainCache> = new Map();

  constructor(context: AppContext) {
    if (context.adapters.cache) {
      throw new Error("Instance already exists.");
    }
    for (const chain of Object.keys(context.config.chains)) {
      this.cache.set(chain, {
        auctions: new AuctionCache(),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getOpenTxNonce(chain: number): Promise<BigNumber> {
    throw new Error("Not implemented");
  }
}
