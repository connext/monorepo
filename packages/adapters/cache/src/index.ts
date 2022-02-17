import { BigNumber } from "ethers";

import { AuctionCache } from "./auction";
import { CacheConfig } from "./lib/entities";

export type ChainCache = {
  auctions: AuctionCache;
};

// TODO: This storage endpoint should be considered a stub for a future redis / permanent storage solution.
export class CacheManager {
  private readonly cache: Map<string, ChainCache> = new Map();

  constructor(config: CacheConfig) {
    for (const chain of Object.keys(config.chains)) {
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
