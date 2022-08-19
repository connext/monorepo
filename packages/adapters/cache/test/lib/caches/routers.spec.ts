import { Logger, expect, mock, getNtpTimeSeconds } from "@connext/nxtp-utils";

import { RoutersCache } from "../../../src/index";
import { TimestampedCacheValue } from "../../../src/lib/entities";

const RedisMock = require("ioredis-mock");
const redis = new RedisMock();

describe("RoutersCache", () => {
  const prefix = "routers";
  // Helpers for accessing mock cache directly and altering state.
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

      await mockRedisHelpers.setLiquidity(domain, router, asset, amount);
      const res = await cache.getLiquidity(domain, router, asset);

      expect(res.toString()).to.be.eq(amount);
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
        "123",
        // Subtract another 10 secs to be safe.
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
      const currentTime = getNtpTimeSeconds();

      await cache.setLiquidity(domain, router, asset, amount);
      const res = await mockRedisHelpers.getLiquidity(domain, router, asset);

      expect(res.value).to.be.eq(amount);
      expect(res.timestamp).to.be.a("number");
      expect(res.timestamp).to.be.gte(currentTime);
    });

    it("happy: should update existing liquidity amount, along with timestamp", async () => {
      const domain = mock.domain.A;
      const router = mock.address.router;
      const asset = mock.asset.A.address;
      const originalAmount = "1234567890";
      const originalTimestamp = 123;
      const newAmount = "9876543210";
      const currentTime = getNtpTimeSeconds();

      await mockRedisHelpers.setLiquidity(domain, router, asset, originalAmount, originalTimestamp);
      await cache.setLiquidity(domain, router, asset, newAmount);

      const res = await mockRedisHelpers.getLiquidity(domain, router, asset);
      expect(res.value).to.be.eq(newAmount);
      expect(res.timestamp).to.be.a("number");
      expect(res.timestamp).to.not.be.eq(originalTimestamp);
      expect(res.timestamp).to.be.gte(currentTime);
    });
  });
});
