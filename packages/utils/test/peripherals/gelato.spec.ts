import { restore, reset, stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";

import {
  getGelatoEstimatedFee,
  _getGelatoEstimatedFee,
  expect,
  isOracleActive,
  getGelatoOracles,
  getConversionRate,
  getGelatoRelayerAddress,
} from "../../src";
import * as AxiosFns from "../../src/helpers/axios";

import { GelatoEstimatedFeeRequestError, GelatoConversionRateRequestError } from "../../src";

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
    it("happy-1: should get fee estimation from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          estimatedFee: "100",
        },
      });

      expect(await getGelatoEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("100"));
    });

    it("should return zero if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      expect(await getGelatoEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("0"));
    });
  });

  describe("#_getGelatoEstimatedFee", () => {
    it("happy-1: should get fee estimation from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          estimatedFee: "100",
        },
      });

      expect(await _getGelatoEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("100"));
    });

    it("happy-2: should get fee estimation from gelato with gasLimitL1", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          estimatedFee: "100",
        },
      });

      const res = await _getGelatoEstimatedFee(1337, "0x", 100, true, 10);
      expect(axiosGetStub.getCall(0).args[1]).to.be.deep.eq({
        params: {
          paymentToken: "0x",
          gasLimit: 100,
          isHighPriority: true,
          gasLimitL1: 10,
        },
      });

      expect(res).to.be.deep.eq(BigNumber.from("100"));
    });

    it("should throw if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      await expect(_getGelatoEstimatedFee(1337, "0x", 100, true)).to.be.rejectedWith(GelatoEstimatedFeeRequestError);
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

    it("should throw if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      await expect(getConversionRate(1337)).to.be.rejectedWith(GelatoConversionRateRequestError);
    });
  });

  describe("#getGelatoRelayerAddress", () => {
    it("happy", () => {
      expect(getGelatoRelayerAddress("2053862260")).to.be.eq("0x0c1B63765Be752F07147ACb80a7817A8b74d9831");
      expect(getGelatoRelayerAddress("2053862243")).to.be.eq("0x0c1B63765Be752F07147ACb80a7817A8b74d9831");
      expect(getGelatoRelayerAddress("6648936")).to.be.eq("0xF9D64d54D32EE2BDceAAbFA60C4C438E224427d0");
      expect(getGelatoRelayerAddress("1735353714")).to.be.eq("0xF9D64d54D32EE2BDceAAbFA60C4C438E224427d0");
    });
  });
});
