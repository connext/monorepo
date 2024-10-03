import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import * as HelperFns from "../../../src/helpers";
import * as MockableFns from "../../../src/mockable";
import { SwapQuoteParams, Swapper, EstimateQuoteAmountArgs } from "../../../src/types";
import { getBridgeAmountOut, getSwapAmountOut, getEstimateAmountReceived } from "../../../src";

const mockOriginSwapQuoteParams: SwapQuoteParams = {
  domainId: "133712",
  fromAsset: mkAddress("0x1"),
  toAsset: mkAddress("0x2"),
  amountIn: "1000000000000000",
  fee: "300",
  rpc: "http://localhost:8545",
  config: {
    apiKey: "12345",
  },
};

const mockDestinationSwapQuoteParams: SwapQuoteParams = {
  domainId: "133812",
  fromAsset: mkAddress("0x2"),
  toAsset: mkAddress("0x3"),
  amountIn: "990000000000000",
  fee: "300",
  rpc: "http://localhost:8545",
  config: {
    apiKey: "12345",
  },
};

const mockEstimateQuoteAmountParams: EstimateQuoteAmountArgs = {
  originDomain: 1869640809,
  destinationDomain: 1886350457,
  originRpc: "https://rpc.ankr.com/optimism",
  destinationRpc: "https://polygon.llamarpc.com",
  fromAsset: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  toAsset: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  amountIn: "1000000000000000",
  fee: "300",
  signerAddress: "0x7b88c13D5A56549B2F09BB7D8300e256056fdD85",
  config: {
    apiKey: "12345",
  },
};

class MockJsonRpcProvider {
  public getBlockNumber = stub().resolves(1232132);
}

describe("Libs:quote", () => {
  let axiosGetStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(MockableFns, "axiosGet");
    stub(MockableFns, "JsonRpcProvider").value(MockJsonRpcProvider);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getSwapAmountOut", () => {
    it("should throw if swapper config doesn't exist", async () => {
      await expect(getSwapAmountOut({ ...mockOriginSwapQuoteParams, domainId: "1337" })).to.be.rejectedWith(
        "No quoter config for domain: 1337",
      );
    });

    it("should work if same asset", async () => {
      expect(
        await getSwapAmountOut({ ...mockOriginSwapQuoteParams, toAsset: mockOriginSwapQuoteParams.fromAsset }),
      ).to.be.eq(mockOriginSwapQuoteParams.amountIn);
    });

    it("should work with univ2 quoter", async () => {
      stub(HelperFns, "DestinationSwapperPerDomain").value({
        "133812": {
          type: Swapper.UniV2,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      stub(MockableFns, "getContract").returns({
        getAmountsOut: stub().resolves(["1000000000000000", "990000000000000"]),
      } as any);

      const amountOut = await getSwapAmountOut(mockDestinationSwapQuoteParams, false);
      expect(amountOut).to.be.eq("990000000000000");
    });

    it("should work with univ3 quoter", async () => {
      stub(HelperFns, "DestinationSwapperPerDomain").value({
        "133812": {
          type: Swapper.UniV3,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      stub(MockableFns, "getContract").returns({
        callStatic: { quoteExactInputSingle: stub().resolves(["990000000000000"]) },
      } as any);

      const amountOut = await getSwapAmountOut(mockDestinationSwapQuoteParams, false);
      expect(amountOut).to.be.eq("990000000000000");
    });

    it("should work with 1inch quoter", async () => {
      stub(HelperFns, "OriginSwapperPerDomain").value({
        "133712": {
          type: Swapper.OneInch,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      axiosGetStub.resolves({ data: { toAmount: "990000000000000" } });

      const amountOut = await getSwapAmountOut(mockOriginSwapQuoteParams, true);
      expect(amountOut).to.be.eq("990000000000000");
    });
  });

  describe("#getBridgeAmountOut", () => {
    it("should throw if swapper config doesn't exist", async () => {
      await expect(
        getBridgeAmountOut({ ...mockOriginSwapQuoteParams, domainId: "1337" }, { ...mockOriginSwapQuoteParams }),
      ).to.be.rejectedWith("No quoter config for domain: 1337");
    });

    it("should work with 1inch origin - univ3 destination", async () => {
      stub(HelperFns, "OriginSwapperPerDomain").value({
        "133712": {
          type: Swapper.OneInch,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      axiosGetStub.resolves({ data: { toAmount: "990000000000000" } });

      expect(await getSwapAmountOut(mockOriginSwapQuoteParams, true)).to.be.eq("990000000000000");

      stub(HelperFns, "DestinationSwapperPerDomain").value({
        "133812": {
          type: Swapper.UniV3,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      stub(MockableFns, "getContract").returns({
        callStatic: { quoteExactInputSingle: stub().resolves(["900000000000000"]) },
      } as any);
      expect(await getSwapAmountOut(mockDestinationSwapQuoteParams, false)).to.be.eq("900000000000000");
      expect(await getBridgeAmountOut(mockOriginSwapQuoteParams, mockDestinationSwapQuoteParams)).to.be.eq(
        "900000000000000",
      );
    });
  });

  describe("getEstimateAmountReceived", () => {
    it("should return the estimated amount received", async () => {
      stub(HelperFns, "OriginSwapperPerDomain").value({
        "1869640809": {
          type: Swapper.OneInch,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      axiosGetStub.resolves({ data: { toAmount: "990000000000000" } });
      let initCoreSDKStub: SinonStub;
      initCoreSDKStub = stub(HelperFns, "initCoreSDK");
      initCoreSDKStub.resolves({
        sdkBase: {
          calculateAmountReceived: () => {
            return { amountReceived: "100" };
          },
        },
      });
      stub(HelperFns, "DestinationSwapperPerDomain").value({
        "1886350457": {
          type: Swapper.UniV3,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      stub(MockableFns, "getContract").returns({
        callStatic: { quoteExactInputSingle: stub().resolves(["900000000000000"]) },
      } as any);
      expect(await getEstimateAmountReceived(mockEstimateQuoteAmountParams)).to.be.eq("900000000000000");
    });
  });
});
