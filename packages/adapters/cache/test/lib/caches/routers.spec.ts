import { Logger, expect, mock, getNtpTimeSeconds, mkAddress } from "@connext/nxtp-utils";

import { RoutersCache } from "../../../src/index";
import { TimestampedCacheValue } from "../../../src/lib/entities";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("RoutersCache", () => {
  const prefix = "routers";
  // // Helpers for accessing mock cache directly and altering state.
  const mockRedisHelpers = {
    setLiquidity: async (domain: string, router: string, asset: string, amount: string, timestamp?: number) =>
      await redis.hset(
        `${prefix}:${domain}:${router}:liquidity`,
        asset,
        JSON.stringify({
          timestamp: timestamp || getNtpTimeSeconds(),
          value: amount,
        }),
      ),
    getLiquidity: async (
      domain: string,
      router: string,
      asset: string,
    ): Promise<TimestampedCacheValue<string> | null> => {
      const res = await redis.hget(`${prefix}:${domain}:${router}:liquidity`, asset);
      return res ? (JSON.parse(res) as TimestampedCacheValue<string>) : null;
    },

    setApproval: async (domain: string, router: string, approval: boolean, timestamp?: number) =>
      await redis.hset(
        `${prefix}:${domain}:${router}`,
        "approval",
        JSON.stringify({
          timestamp: timestamp || getNtpTimeSeconds(),
          value: approval,
        }),
      ),
    getApproval: async (domain: string, router: string): Promise<TimestampedCacheValue<boolean> | null> => {
      const res = await redis.hget(`${prefix}:${domain}:${router}`, "approval");
      return res ? (JSON.parse(res) as TimestampedCacheValue<boolean>) : null;
    },
  };

  const logger = new Logger({ level: "debug" });
  let cache: RoutersCache;
  beforeEach(() => {
    cache = new RoutersCache({ host: "mock", port: 1234, mock: true, logger });
  });

  afterEach(async () => {
    await redis.flushall();
  });

  describe("#getLiquidity", () => {
    it("happy: should retrieve existing liquidity for asset", async () => {
      const domain = mock.domain.A;
      const router = mock.address.router;
      const asset = mock.asset.A.address;
      const amount = "1234567890";

      await cache.setLiquidity(domain, router, asset, amount);
      const res = await cache.getLiquidity(domain, router, asset);

      expect(res!.toString()).to.be.eq(amount);
    });

    it("sad: should return undefined if liquidity data does not exist", async () => {
      const domain = mock.domain.A;
      const router = mock.address.router;
      const asset = mock.asset.A.address;

      const res = await cache.getLiquidity(domain, router, asset);

      expect(res).to.be.undefined;
    });

    it("should not return liquidity data if it's expired", async () => {
      const domain = mock.domain.A;
      const router = mock.address.router;
      const asset = mock.asset.A.address;
      await mockRedisHelpers.setLiquidity(
        domain,
        router,
        asset,
        "123", // Subtract another 10 secs to be safe.
        getNtpTimeSeconds() - RoutersCache.DEFAULT_LIQUIDITY_EXPIRY - 10,
      );
      const res = await cache.getLiquidity(domain, router, asset);
      expect(res).to.be.undefined;
    });
  });

  describe("#setLiquidity", () => {
    it("happy: should set liquidity amount for specified asset, along with timestamp", async () => {
      const domain = mock.domain.A;
      const router = mock.address.router;
      const asset = mock.asset.A.address;
      const amount = "1234567890";

      await cache.setLiquidity(domain, router, asset, amount);
      const res = await cache.getLiquidity(domain, router, asset);

      expect(res!.toString()).to.be.eq(amount);
    });

    it("happy: should update existing liquidity amount, along with timestamp", async () => {
      const domain = mock.domain.A;
      const router = mock.address.router;
      const asset = mock.asset.A.address;
      const originalAmount = "1234567890";

      await cache.setLiquidity(domain, router, asset, originalAmount);
      const res = await cache.getLiquidity(domain, router, asset);
      expect(res?.toString()).to.be.eq(originalAmount);
    });
  });

  describe("#setLastActive/getLastActive", () => {
    it("happy: should set last active timestamp", async () => {
      const mockRouter1 = mkAddress("0xrouter1");
      const mockRouter2 = mkAddress("0xrouter2");
      const curTimestamp = getNtpTimeSeconds();
      await cache.setLastActive(mockRouter1);
      const lastActiveTimestamp1 = await cache.getLastActive(mockRouter1);
      const lastActiveTimestamp2 = await cache.getLastActive(mockRouter2);
      expect(+lastActiveTimestamp1).to.be.greaterThanOrEqual(curTimestamp);
      expect(lastActiveTimestamp2).to.be.eq(0);
    });
  });

  describe("#setLastBidTime/getLastBidTime", () => {
    it("happy: should set last active timestamp", async () => {
      const mockRouter1 = mkAddress("0xrouter1");
      const mockRouter2 = mkAddress("0xrouter2");
      await cache.setLastBidTime(mockRouter1, { originDomain: "1111", destinationDomain: "2222", asset: "0xabc" });
      const lastBidTimeForRouter1 = await cache.getLastBidTime(mockRouter1);
      expect(lastBidTimeForRouter1).to.not.undefined;

      const lastBidTimeForRouter2 = await cache.getLastBidTime(mockRouter2);
      expect(lastBidTimeForRouter2).to.be.undefined;
    });
  });

  describe("#addRouter/getRouters", () => {
    it("happy: should set last active timestamp", async () => {
      const mockRouter1 = mkAddress("0xrouter1");
      const mockRouter2 = mkAddress("0xrouter2");
      await cache.addRouter(mockRouter1);
      await cache.addRouter(mockRouter2);

      // this shouldn't be added
      await cache.addRouter(mockRouter1);

      const routers = await cache.getRouters();
      expect(routers).to.be.deep.eq([mockRouter1, mockRouter2]);
    });
  });
});
