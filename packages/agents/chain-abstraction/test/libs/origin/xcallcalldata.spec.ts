import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import { parseEther } from "ethers/lib/utils";
import { constants, BigNumber } from "ethers";
import {
  calculateRouteForSwapAndXCall,
  getPoolFeeForUniV3,
  getXCallCallData,
  prepareSwapAndXCall,
} from "../../../src/libs";
import * as MockableFns from "../../../src/mockable";
import { Swapper } from "../../../src/types";

describe("Libs:origin", () => {
  describe("#getPoolFeeForUniV3", () => {
    let getContractStub: SinonStub;
    before(() => {
      getContractStub = stub(MockableFns, "getContract");
    });
    after(() => {
      restore();
      reset();
    });
    it("should throw if no pool exist for a given pair", async () => {
      getContractStub.returns({
        uniswapV3Router: stub().resolves(mkAddress("0x111")),
        factory: stub().resolves(mkAddress("0x112")),
        getPool: stub().resolves(constants.AddressZero),
        liquidity: stub().resolves(parseEther("1")),
      });
      const domainId = "1886350457";
      const rpc = "https://polygon.llamarpc.com";
      const token0 = mkAddress("0x1");
      const token1 = mkAddress("0x2");
      await expect(getPoolFeeForUniV3(domainId, rpc, token0, token1)).to.be.rejectedWith(
        "No pool exist for a given pair",
      );
    });
    it("should work", async () => {
      getContractStub.returns({
        uniswapV3Router: stub().resolves(mkAddress("0x111")),
        factory: stub().resolves(mkAddress("0x112")),
        getPool: stub().resolves(mkAddress("0x123")),
        liquidity: stub().resolves(parseEther("1")),
      });
      const domainId = "1886350457";
      const rpc = "https://polygon.llamarpc.com";
      const token0 = mkAddress("0x1");
      const token1 = mkAddress("0x2");
      const poolFee = await getPoolFeeForUniV3(domainId, rpc, token0, token1);
      expect(poolFee).to.be.eq("100");
    });
  });
  describe("#getXCallCallData", () => {
    it("should work", async () => {
      const domainId = "1886350457";
      const swapper = Swapper.UniV3;
      const forwardCallData = "0x1212";
      const params = {
        fallback: "0x1111111254EEB25477B68fb85Ed929f73A960582",
        swapForwarderData: {
          toAsset: "0x1111111254EEB25477B68fb85Ed929f73A960582",
          swapData: { amountOutMin: "100", poolFee: "500" },
        },
      };

      const callData = await getXCallCallData(domainId, swapper, forwardCallData, params);
      expect(callData).to.be.eq(
        "0x0000000000000000000000001111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000ec345e9be52f0fca8aad6aec3254ed86151b060d0000000000000000000000001111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000021212000000000000000000000000000000000000000000000000000000000000",
      );
    });
  });
});
