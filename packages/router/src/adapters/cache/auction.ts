import { BigNumber } from "ethers";

import { CachedBid } from "../../lib/entities/cache";

// TODO: This could use some optimization.
// - For one, we should be storing via Redis (and move this to adapters) to keep the state persistent across restarts.
// - Store by transactionId in a nested Map (instead of an Array)?
// - We could also optimize by comparing user asks to actual funding in their wallet, and only consider
//   promised liquidity actually outstanding if the user *can* go through with the bid.
/**
 * Bid caching helper class to ensure we only store one bid per assetId/chainId combination, clean up expired bids,
 * and provide a quick calculation endpoint to determine outstanding liquidity.
 */
export class AuctionCache {
  private readonly bids: Map<string, CachedBid[]> = new Map();

  /**
   * Get the sum of all liquidity promsied across all bids for a given assetId/chainId
   * combination.
   *
   * @param chainId - chainId of the bid
   * @param assetId - assetId of the bid
   * @returns BigNumber sum of all bids' amountReceived.
   */
  public getOutstandingLiquidity(chainId: number, assetId: string): BigNumber {
    const key = this.getCachedBidCompositeKey(chainId, assetId);
    // Clear out all the expired bids.
    const now = Date.now();
    const refreshedBids = this.bids.get(key)?.filter((bid) => bid.expiry > now) ?? [];
    // Update the current bids array.
    this.bids.set(key, refreshedBids);
    // Return the sum of all liquidity promised across all relevant bids.
    return refreshedBids.reduce((sum, bid) => sum.add(bid.amountReceived), BigNumber.from(0));
  }

  /**
   * Add a new bid to the cache.
   * @param bid - bid to add
   */
  public addBid(bid: CachedBid) {
    const key = this.getCachedBidCompositeKey(bid.chainId, bid.assetId);
    this.bids.set(key, this.bids.get(key)?.concat(bid) ?? [bid]);
  }

  /**
   * We store each collection of bids per assetId/chainId combination for efficient lookup.
   * @param chainId - chainId of the bid
   * @param assetId - assetId of the bid
   * @returns string composite key
   */
  private getCachedBidCompositeKey(chainId: number, assetId: string): string {
    return `${chainId}-${assetId}`;
  }
}
