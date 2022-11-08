import { restore, reset, stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";

import { getGelatoEstimatedFee, expect, isOracleActive, getGelatoOracles, getConversionRate } from "../../src";
import * as AxiosFns from "../../src/helpers/axios";

export const mockGelatoSDKSuccessResponse = { taskId: "1" };

describe("Peripherals:Gelato", () => {
  let axiosGetStub: SinonStub;

  beforeEach(() => {
    axiosGetStub = stub(AxiosFns, "axiosGet");
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getGelatoEstimatedFee", () => {
    it("happy: should get fee estimation from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          estimatedFee: "100",
        },
      });

      expect(await getGelatoEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("100"));
    });

    it("should return zero value if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      expect(await getGelatoEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("0"));
    });
  });

  describe("#isOracleActive", () => {
    it("happy: should return true if exists", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          oracles: ["1337", "1338"],
        },
      });

      expect(await isOracleActive(1337)).to.be.eq(true);
      expect(await isOracleActive(1338)).to.be.eq(true);
      expect(await isOracleActive(1)).to.be.eq(false);
    });

    it("should return false if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));

      expect(await isOracleActive(1337)).to.be.eq(false);
      expect(await isOracleActive(1338)).to.be.eq(false);
    });
  });

  describe("#getGelatoOracles", () => {
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should return true if exists", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          oracles: ["1337", "1338"],
        },
      });

      expect(await getGelatoOracles()).to.be.deep.eq(["1337", "1338"]);
    });

    it("should return empty if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));

      expect(await getGelatoOracles()).to.be.deep.eq([]);
    });
  });

  describe("#getConversionRate", () => {
    it("happy: should get conversion rate from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          conversionRate: 5.5,
        },
      });

      expect(await getConversionRate(1337)).to.be.eq(5.5);
    });

    it("should return 0 if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      expect(await getConversionRate(1337)).to.be.eq(0);
    });
  });
});
