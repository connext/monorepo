import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, reset, restore } from "sinon";
import * as HelperFns from "../../../src/helpers";
import { Swapper } from "../../../src/types";
import { getSwapAndXcallAddress, getSwapperConfig } from "../../../src/libs";

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
