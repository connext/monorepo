import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import { constants } from "ethers";
import { getSwapQuoteForOneInch, getSwapQuoteForUniV2, getSwapQuoteForUniV3 } from "../../src/helpers/swapquote";
import * as MockableFns from "../../src/mockable";

const mockSwapQuoteCallbackArgs = {
  chainId: 1337,
  quoter: mkAddress("0x123"),
  rpc: "http://localhost:8545",
  fromAsset: mkAddress("0x1"),
  toAsset: mkAddress("0x2"),
  amountIn: "10000000000000000000000",
  fee: "300",
};

class MockJsonRpcProvider {
  public getBlockNumber = stub().resolves(1232132);
}

describe("Helpers:swapquote", () => {
  beforeEach(() => {
    stub(MockableFns, "JsonRpcProvider").value(MockJsonRpcProvider);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getSwapQuoteForUniV2", () => {
    it("should throw with invalid rpc", async () => {
      expect(getSwapQuoteForUniV2(mockSwapQuoteCallbackArgs)).to.be.throw;
    });
    it("should work", async () => {
      stub(MockableFns, "getContract").returns({
        getAmountsOut: stub().resolves(["100", "999"]),
      } as any);
      expect(await getSwapQuoteForUniV2(mockSwapQuoteCallbackArgs)).to.be.eq("999");
    });
  });

  describe("#getSwapQuoteForUniV3", () => {
    it("should throw with invalid rpc", async () => {
      expect(getSwapQuoteForUniV3(mockSwapQuoteCallbackArgs)).to.be.throw;
    });
    it("should work", async () => {
      stub(MockableFns, "getContract").returns({
        callStatic: { quoteExactInputSingle: stub().resolves(["999"]) },
      } as any);
      expect(await getSwapQuoteForUniV3(mockSwapQuoteCallbackArgs)).to.be.eq("999");
    });
  });

  describe("#getSwapQuoteForOneInch", () => {
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
      expect(getSwapQuoteForOneInch(mockSwapQuoteCallbackArgs)).to.be.throw;
    });

    it("should work with the origin native asset", async () => {
      const args = { ...mockSwapQuoteCallbackArgs, fromAsset: constants.AddressZero };
      axiosGetStub.resolves({ data: { toTokenAmount: "999" } });

      const amountOut = await getSwapQuoteForOneInch(args);
      expect(axiosGetStub.getCall(0).args[0]).to.be.eq(
        "https://api.1inch.io/v5.0/1337/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x2000000000000000000000000000000000000000&amount=10000000000000000000000",
      );
      expect(amountOut).to.be.eq("999");
    });

    it("should work with the destination native asset", async () => {
      const args = { ...mockSwapQuoteCallbackArgs, toAsset: constants.AddressZero };
      axiosGetStub.resolves({ data: { toTokenAmount: "999" } });
      const amountOut = await getSwapQuoteForOneInch(args);
      expect(axiosGetStub.getCall(0).args[0]).to.be.eq(
        "https://api.1inch.io/v5.0/1337/quote?fromTokenAddress=0x1000000000000000000000000000000000000000&toTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&amount=10000000000000000000000",
      );
      expect(amountOut).to.be.eq("999");
    });
  });
});
