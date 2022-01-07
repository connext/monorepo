import { BigNumber } from "ethers";

import { CachedBid } from "../../lib/entities/cache";

// TODO: This could use some optimization.
// - For one, we should be storing via Redis (and move this to adapters) to keep the state persistent across restarts.
// - We could also optimize by comparing user asks to actual funding in their wallet, and only consider
//   promised liquidity actually outstanding if the user *can* go through with the bid.
/**
 * Bid caching helper class to ensure we only store one bid per assetId/chainId combination, clean up expired bids,
 * and provide a quick calculation endpoint to determine outstanding liquidity.
 */
export class AuctionCache {
  private readonly auctions: Map<string, Map<string, CachedBid>> = new Map();

  /**
   * Get the sum of all liquidity promsied across all bids for a given assetId/chainId
   * pair.
   *
   * @param chainId - chainId of the bid
   * @param assetId - assetId of the bid
   * @returns BigNumber sum of all bids' amountReceived.
   */
  public getOutstandingLiquidity(chainId: number, assetId: string): BigNumber {
    const key = this.getCachedBidCompositeKey(chainId, assetId);
    // Clear out all the expired bids.
    const now = Date.now();
    const bids = this.auctions.get(key);
    if (bids) {
      Array.from(bids.entries()).forEach(([transactionId, bid]) => {
        if (!bid.confirmed && now > bid.expiry) {
          bids.delete(transactionId);
        }
      });
    }
    const values = bids ? Array.from(bids.values()) : [];
    // Return the sum of all liquidity promised across all relevant bids.
    return values.reduce((sum, bid) => sum.add(bid.amountReceived), BigNumber.from(0));
  }

  /**
   * Add a new bid to the cache.
   * @param bid - bid to add
   */
  public addBid(bid: Omit<CachedBid, "confirmed">) {
    const key = this.getCachedBidCompositeKey(bid.chainId, bid.assetId);
    const bids = this.auctions.get(key) ?? new Map<string, CachedBid>();
    bids.set(bid.transactionId, {
      ...bid,
      confirmed: false,
    });
    this.auctions.set(key, bids);
  }

  /**
   * Confirm a bid in the cache has been accepted.
   *
   * @param chainId - chainId of the bid
   * @param assetId - assetId of the bid
   * @param transactionId - transactionId of the bid
   * @returns boolean true if the bid was found and confirmed, false otherwise
   */
  public confirmBid(chainId: number, assetId: string, transactionId: string): boolean {
    const key = this.getCachedBidCompositeKey(chainId, assetId);
    const bids = this.auctions.get(key);
    if (bids) {
      const bid = bids.get(transactionId);
      if (bid) {
        bid.confirmed = true;
        return true;
      }
    }
    return false;
  }

  public removeBid(chainId: number, assetId: string, transactionId: string) {
    const key = this.getCachedBidCompositeKey(chainId, assetId);
    const bids = this.auctions.get(key);
    if (bids) {
      bids.delete(transactionId);
    }
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
