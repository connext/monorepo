import { delay, expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import MockRedis from "ioredis-mock";

import { RedisCache } from "../src/cache";

describe("RedisCache", () => {
  let cache: RedisCache;
  beforeEach(() => {
    cache = new RedisCache("foo", 1234, "test", new MockRedis());
  });
  describe("#addOutstandingLiquidity, #getOutstandingLiquidity", () => {
    it("adds liquidity by asset and chain", async () => {
      // liqA
      await cache.addOutstandingLiquidity(
        1337,
        mkAddress("0x1"),
        mkBytes32("0x1"),
        "100",
        Math.floor(Date.now() / 1000) + 100,
      );

      await cache.addOutstandingLiquidity(
        1337,
        mkAddress("0x1"),
        mkBytes32("0x2"),
        "10",
        Math.floor(Date.now() / 1000) + 100,
      );

      await cache.addOutstandingLiquidity(
        1337,
        mkAddress("0x1"),
        mkBytes32("0x3"),
        "1",
        Math.floor(Date.now() / 1000) + 100,
      );

      // liqB
      await cache.addOutstandingLiquidity(
        1338,
        mkAddress("0x1"),
        mkBytes32("0x4"),
        "10",
        Math.floor(Date.now() / 1000) + 100,
      );

      // liqC
      await cache.addOutstandingLiquidity(
        1337,
        mkAddress("0x2"),
        mkBytes32("0x5"),
        "1",
        Math.floor(Date.now() / 1000) + 100,
      );

      const liquidityA = await cache.getOutstandingLiquidity(1337, mkAddress("0x1"));
      let val = liquidityA.isOk() ? liquidityA.value : liquidityA.error;
      expect(val.toString()).to.eq("111");

      const liquidityB = await cache.getOutstandingLiquidity(1338, mkAddress("0x1"));
      val = liquidityB.isOk() ? liquidityB.value : liquidityB.error;
      expect(val.toString()).to.eq("10");

      const liquidityC = await cache.getOutstandingLiquidity(1337, mkAddress("0x2"));
      val = liquidityC.isOk() ? liquidityC.value : liquidityC.error;
      expect(val.toString()).to.eq("1");
    });

    it.only("expires keys properly", async () => {
      await cache.addOutstandingLiquidity(
        1337,
        mkAddress("0x1"),
        mkBytes32("0x1"),
        "100",
        Math.floor(Date.now() / 1000) + 1, // 1 second later
      );

      await cache.addOutstandingLiquidity(
        1337,
        mkAddress("0x1"),
        mkBytes32("0x2"),
        "10",
        Math.floor(Date.now() / 1000) + 100,
      );

      await new Promise<void>((res) => setTimeout(() => res(), 1000)); // delay isnt working?

      const liquidity = await cache.getOutstandingLiquidity(1337, mkAddress("0x1"));
      let val = liquidity.isOk() ? liquidity.value : liquidity.error;
      expect(val.toString()).to.eq("10");
    });
  });
});
