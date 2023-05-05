import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import { constants, BigNumber } from "ethers";
import * as HelperFns from "../../../src/helpers";
import * as MockableFns from "../../../src/mockable";
import { SwapQuoteParams, Swapper } from "../../../src/types";
import { getBridgeAmountOut, getSwapAmountOut } from "../../../src";
import { getSwapAndXcallAddress, getSwapperConfig } from "../../../src/libs";

const mockOriginSwapQuoteParams: SwapQuoteParams = {
  domainId: "133712",
  fromAsset: mkAddress("0x1"),
  toAsset: mkAddress("0x2"),
  amountIn: "1000000000000000",
  fee: "300",
  rpc: "http://localhost:8545",
};

const mockDestinationSwapQuoteParams: SwapQuoteParams = {
  domainId: "133812",
  fromAsset: mkAddress("0x2"),
  toAsset: mkAddress("0x3"),
  amountIn: "990000000000000",
  fee: "300",
  rpc: "http://localhost:8545",
};

describe("Libs:address", () => {
  beforeEach(() => {});

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getSwapAndXcallAddress", () => {
    it("should work", async () => {
      stub(HelperFns, "DEPLOYED_ADDRESSES").value({
        swapandxcall: {
          "133812": mkAddress("0xa"),
        },
      });

      expect(getSwapAndXcallAddress("133812")).to.be.eq(mkAddress("0xa"));
    });
  });

  describe("#getSwapperConfig", () => {
    it("should work", async () => {
      stub(HelperFns, "OriginSwapperPerDomain").value({
        "133812": {
          type: Swapper.UniV2,
          address: mkAddress("0xa"),
          quoter: mkAddress("0xb"),
        },
      });
      stub(HelperFns, "DestinationSwapperPerDomain").value({
        "133712": {
          type: Swapper.UniV3,
          address: mkAddress("0x1"),
          quoter: mkAddress("0x2"),
        },
      });

      expect(getSwapperConfig("133812", true)).to.be.deep.eq({
        type: Swapper.UniV2,
        address: mkAddress("0xa"),
        quoter: mkAddress("0xb"),
      });
      expect(getSwapperConfig("133812", false)).to.be.undefined;
      expect(getSwapperConfig("133712", false)).to.be.deep.eq({
        type: Swapper.UniV3,
        address: mkAddress("0x1"),
        quoter: mkAddress("0x2"),
      });
      expect(getSwapperConfig("133712", true)).to.be.undefined;
    });
  });
});
