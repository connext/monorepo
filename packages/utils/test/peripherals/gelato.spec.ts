import { restore, reset, stub, SinonStub } from "sinon";
import axios from "axios";
import { expect } from "../../src/mocks";
import {
  gelatoSend,
  getGelatoRelayChains,
  isChainSupportedByGelato,
  getEstimatedFee,
  isOracleActive,
  getGelatoOracles,
  mkAddress,
  isPaymentTokenSupported,
  getPaymentTokens,
} from "../../src";
import { BigNumber } from "ethers";

describe("Peripherals:Gelato", () => {
  let axiosGetStub: SinonStub;
  let axiosPostStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(axios, "get");
    axiosPostStub = stub(axios, "post");
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#gelatoSend", () => {
    it("happy: should post data successfully!", async () => {
      axiosPostStub.resolves({ data: "Gelato sent successfully!" });
      const res = await gelatoSend(1337, "0x1", "0x", "0xa", "1");
      expect(res).to.be.deep.eq("Gelato sent successfully!");
    });

    it("should throw if post fails", async () => {
      axiosPostStub.throws(new Error("Request failed!"));
      await expect(gelatoSend(1337, "0x1", "0x", "0xa", "1")).to.be.rejectedWith("Error in Gelato send");
    });
  });

  describe("#isChainSupportedByGelato", () => {
    beforeEach(() => {});
    afterEach(() => {
      restore();
      reset();
    });
    it("should return true if a chain is supported by gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          relays: ["1337", "1338"],
        },
      });
      expect(await isChainSupportedByGelato(1337)).to.be.true;
    });

    it("should return false if a chain is not supported by gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          relays: ["1337", "1338"],
        },
      });
      expect(await isChainSupportedByGelato(12345)).to.be.false;
    });

    it("should return false if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      expect(await isChainSupportedByGelato(1337)).to.be.false;
    });
  });

  describe("#getGelatoRelayChains", () => {
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should get relay chains from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          relays: ["1337", "1338"],
        },
      });
      expect(await getGelatoRelayChains()).to.be.deep.eq(["1337", "1338"]);
    });

    it("should return false if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      expect(await getGelatoRelayChains()).to.be.length(0);
    });
  });

  describe("#getEstimatedFee", () => {
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should get fee estimation from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          estimatedFee: "100",
        },
      });

      expect(await getEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("100"));
    });

    it("should return zero value if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));
      expect(await getEstimatedFee(1337, "0x", 100, true)).to.be.deep.eq(BigNumber.from("0"));
    });
  });
  describe("#isOracleActive", () => {
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

  describe("#isPaymentTokenSupported", () => {
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should return true if exists", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          paymentTokens: [mkAddress("0x111"), mkAddress("0x222")],
        },
      });

      expect(await isPaymentTokenSupported(1337, mkAddress("0x111"))).to.be.eq(true);
      expect(await isPaymentTokenSupported(1337, mkAddress("0x222"))).to.be.eq(true);
      expect(await isPaymentTokenSupported(1337, mkAddress("0x333"))).to.be.eq(false);
    });

    it("should return false if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));

      expect(await isPaymentTokenSupported(1337, mkAddress("0x111"))).to.be.eq(false);
    });
  });

  describe("#getPaymentTokens", () => {
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should get payment tokens from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          paymentTokens: [mkAddress("0x111"), mkAddress("0x222")],
        },
      });

      expect(await getPaymentTokens(1337)).to.be.deep.eq([mkAddress("0x111"), mkAddress("0x222")]);
    });

    it("should return empty if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));

      expect(await getPaymentTokens(1337)).to.be.deep.eq([]);
    });
  });
});
