import { delay, expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub } from "sinon";
import RedisMock from "ioredis-mock";

import * as CacheIndexUtils from "../../../src/adapters/redisCache/index";
import {
  getOutstandingLiquidity,
  removeOutstandingLiquidity,
  storeOutstandingLiquidity,
} from "../../../src/adapters/redisCache/cache";
import { StoreOutstandingLiquidityParams } from "../../../src/lib/entities";
import { BigNumber, constants } from "ethers";

describe("Cache Adapter", () => {
  let storeParams: StoreOutstandingLiquidityParams;
  beforeEach(() => {
    storeParams = {
      amount: constants.One,
      expiresInSeconds: 300,
      assetId: mkAddress("0xa"),
      chainId: 1338,
      transactionId: mkBytes32("0x1"),
    };
  });

  describe("real redis", () => {
    beforeEach(async () => {
      const redisMock = new RedisMock();
      stub(CacheIndexUtils, "getRedis").returns(redisMock);
    });

    it("should store and get liquidity", async () => {
      await storeOutstandingLiquidity(storeParams);
      await storeOutstandingLiquidity({ ...storeParams, transactionId: mkBytes32("0x2"), amount: constants.Two });
      await storeOutstandingLiquidity({ ...storeParams, transactionId: mkBytes32("0x3"), amount: BigNumber.from(3) });

      const liq = await getOutstandingLiquidity({ assetId: storeParams.assetId, chainId: storeParams.chainId });
      console.log("liq: ", liq.toString());
      expect(liq).to.deep.eq(BigNumber.from(6));
    });

    it("should expire liquidity", async () => {
      await storeOutstandingLiquidity({ ...storeParams, expiresInSeconds: 1 });
      await delay(1100);
      const liq = await getOutstandingLiquidity({ assetId: storeParams.assetId, chainId: storeParams.chainId });
      expect(liq).to.deep.eq(constants.Zero);
    });

    it("should remove liquidity", async () => {
      await storeOutstandingLiquidity(storeParams);
      await removeOutstandingLiquidity({
        assetId: storeParams.assetId,
        transactionId: storeParams.transactionId,
        chainId: storeParams.chainId,
      });
      const liq = await getOutstandingLiquidity({ assetId: storeParams.assetId, chainId: storeParams.chainId });
      expect(liq).to.deep.eq(constants.Zero);
    });
  });
});
