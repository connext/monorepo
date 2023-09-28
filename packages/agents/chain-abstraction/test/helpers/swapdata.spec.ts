import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import { defaultAbiCoder } from "ethers/lib/utils";
import { constants } from "ethers";
import {
  getDestinationSwapDataForOneInch,
  getDestinationSwapDataForUniV2,
  getOriginSwapDataForOneInch,
  getOriginSwapDataForUniV2,
  getOriginSwapDataForUniV3,
  getDestinationSwapDataForUniV3,
} from "../../src/helpers/swapdata";
import * as MockableFns from "../../src/mockable";

const mockOriginSwapDataArgs = {
  chainId: 1337,
  fromAsset: mkAddress("0x1"),
  toAsset: mkAddress("0x2"),
  amountIn: "100",
  fromAddress: mkAddress("0x11"),
};

describe("Helpers:swapdata", () => {
  describe("#getOriginSwapDataForUniV2", () => {
    it("should throw", () => {
      expect(getOriginSwapDataForUniV2(mockOriginSwapDataArgs)).to.be.throw;
    });
  });
  describe("#getOriginSwapDataForUniV3", () => {
    it("should throw", () => {
      expect(getOriginSwapDataForUniV3(mockOriginSwapDataArgs)).to.be.throw;
    });
  });
  describe("#getOriginSwapDataForOneInch", () => {
    let axiosGetStub: SinonStub;
    beforeEach(() => {
      axiosGetStub = stub(MockableFns, "axiosGet");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should throw if axioGet fails", () => {
      axiosGetStub.throws();
      expect(getOriginSwapDataForOneInch(mockOriginSwapDataArgs)).to.be.throw;
    });
    it("should work with the default slippage", async () => {
      axiosGetStub.resolves({ data: { tx: { data: "0xaaa" } } });
      const swapData = await getOriginSwapDataForOneInch(mockOriginSwapDataArgs);
      expect(axiosGetStub.getCall(0).args[0]).to.be.deep.eq(
        "https://api.1inch.io/v5.0/1337/swap?fromTokenAddress=0x1000000000000000000000000000000000000000&toTokenAddress=0x2000000000000000000000000000000000000000&amount=100&fromAddress=0x1100000000000000000000000000000000000000&slippage=1&disableEstimate=true",
      );
      expect(swapData).to.be.eq("0xaaa");
    });
    it("should work with the origin native asset", async () => {
      const swapDataArgs = { ...mockOriginSwapDataArgs, slippage: 100, fromAsset: constants.AddressZero };
      axiosGetStub.resolves({ data: { tx: { data: "0xaaa" } } });
      const swapData = await getOriginSwapDataForOneInch(swapDataArgs);
      expect(axiosGetStub.getCall(0).args[0]).to.be.eq(
        "https://api.1inch.io/v5.0/1337/swap?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x2000000000000000000000000000000000000000&amount=100&fromAddress=0x1100000000000000000000000000000000000000&slippage=100&disableEstimate=true",
      );
      expect(swapData).to.be.eq("0xaaa");
    });
    it("should work with the destination native asset", async () => {
      const swapDataArgs = { ...mockOriginSwapDataArgs, slippage: 100, toAsset: constants.AddressZero };
      axiosGetStub.resolves({ data: { tx: { data: "0xaaa" } } });
      const swapData = await getOriginSwapDataForOneInch(swapDataArgs);
      expect(axiosGetStub.getCall(0).args[0]).to.be.eq(
        "https://api.1inch.io/v5.0/1337/swap?fromTokenAddress=0x1000000000000000000000000000000000000000&toTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&amount=100&fromAddress=0x1100000000000000000000000000000000000000&slippage=100&disableEstimate=true",
      );
      expect(swapData).to.be.eq("0xaaa");
    });
  });
  describe("#getDestinationSwapDataForUniV2", () => {
    it("should work", async () => {
      const amountOutMin = "100";
      const res = await getDestinationSwapDataForUniV2({ amountOutMin });
      expect(res).to.be.eq(defaultAbiCoder.encode(["uint256"], [amountOutMin]));
    });
  });
  describe("#getDestinationSwapDataForUniV3", () => {
    it("should work", async () => {
      const amountOutMin = "100";
      const poolFee = "500";
      const res = await getDestinationSwapDataForUniV3({ amountOutMin, poolFee });
      expect(res).to.be.eq(defaultAbiCoder.encode(["uint24", "uint256"], [poolFee, amountOutMin]));
    });
  });
  describe("#getDestinationSwapDataForOneInch", () => {
    it("should throw", async () => {
      const mockArgs = {};
      await expect(getDestinationSwapDataForOneInch(mockArgs)).to.be.rejectedWith("ToDo");
    });
  });
});
