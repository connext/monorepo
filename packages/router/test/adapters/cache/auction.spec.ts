import { expect, getRandomBytes32, mkAddress } from "@connext/nxtp-utils";
import { BigNumber, utils } from "ethers";

import { AuctionCache } from "../../../src/adapters/cache/auction";

let auctionCache: AuctionCache;

describe("AuctionCache", () => {
  beforeEach(() => {
    auctionCache = new AuctionCache();
  });

  describe("#getOutstandingLiquidity", () => {
    it("should sum all of the bids' amountReceived values", () => {
      let expectedSum: BigNumber = BigNumber.from(0);
      // expires 1 hour from now, since we're not testing expiry here.
      const hardcodedExpiry = Date.now() + 3600 * 1000;
      const assetId = mkAddress("0xabc");
      const chainId = 1337;
      for (let i = 0; i < 10; i++) {
        const amountReceived = utils.parseEther(Math.floor(Math.random() * 1000).toString());
        const bid = {
          assetId,
          chainId,
          amountReceived,
          expiry: hardcodedExpiry,
          transactionId: getRandomBytes32(),
        };
        expectedSum = expectedSum.add(bid.amountReceived);
        // Add bid to the auction cache.
        auctionCache.addBid(bid);
      }

      // Also add spam data. None of this should be counted towards the sum.
      const spamAmountReceived = BigNumber.from("10000000000000000");
      // - a bunch of irrelevant bids to other random chains.
      for (let i = 0; i < 10; i++) {
        const randomChainId = chainId + 1 + Math.floor(Math.random() * 1000);
        const bid = {
          assetId,
          chainId: randomChainId,
          amountReceived: spamAmountReceived,
          expiry: hardcodedExpiry,
          transactionId: getRandomBytes32(),
        };
        // Add bid to the auction cache.
        auctionCache.addBid(bid);
      }
      // - a bunch of irrelevant bids to other random assets.
      for (let i = 0; i < 10; i++) {
        const randomAssetId = mkAddress(`0x${i}`);
        const bid = {
          assetId: randomAssetId,
          chainId,
          amountReceived: spamAmountReceived,
          expiry: hardcodedExpiry,
          transactionId: getRandomBytes32(),
        };
        // Add bid to the auction cache.
        auctionCache.addBid(bid);
      }

      expect(auctionCache.getOutstandingLiquidity(chainId, assetId).toString()).to.eq(expectedSum.toString());
    });

    it("should return 0 if no bids are in the list", () => {
      expect(auctionCache.getOutstandingLiquidity(1337, getRandomBytes32()).toString()).to.eq("0");
    });

    it("should remove expired bids", () => {
      let expectedSum: BigNumber = BigNumber.from(0);
      const nonExpiredExpiry = Date.now() + 3600 * 1000;
      const expiredExpiry = Date.now() - 1;
      const assetId = mkAddress("0xabc");
      const chainId = 1337;
      // First we add a bunch of expired bids.
      for (let i = 0; i < 10; i++) {
        const amountReceived = utils.parseEther(Math.floor(Math.random() * 1000).toString());
        const bid = {
          assetId,
          chainId,
          amountReceived,
          expiry: expiredExpiry,
          transactionId: getRandomBytes32(),
        };
        // Add bid to the auction cache.
        auctionCache.addBid(bid);
      }
      // Now we add a bunch of non-expired bids. These should count towards the expected sum we get back.
      for (let i = 0; i < 10; i++) {
        const amountReceived = utils.parseEther(Math.floor(Math.random() * 1000).toString());
        const bid = {
          assetId,
          chainId,
          amountReceived,
          expiry: nonExpiredExpiry,
          transactionId: getRandomBytes32(),
        };
        expectedSum = expectedSum.add(bid.amountReceived);
        // Add bid to the auction cache.
        auctionCache.addBid(bid);
      }

      expect(auctionCache.getOutstandingLiquidity(chainId, assetId).toString()).to.eq(expectedSum.toString());
    });
  });

  describe("#addBid", () => {
    it("happy: adds the bid to the correct location", () => {
      const chainId = 1337;
      const assetId = mkAddress("0xabc");
      const bid = {
        assetId,
        chainId,
        amountReceived: utils.parseEther("1"),
        expiry: Date.now() + 3600 * 1000,
        transactionId: getRandomBytes32(),
      };
      auctionCache.addBid(bid);
      const key = (auctionCache as any).getCachedBidCompositeKey(chainId, assetId);
      const retrieved = (auctionCache as any).bids.get(key);
      expect(retrieved.length).to.eq(1);
      expect(retrieved[0]).to.deep.eq(bid);
    });
  });
});
