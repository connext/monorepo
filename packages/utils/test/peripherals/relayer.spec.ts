import { restore, reset, stub, SinonStub } from "sinon";
import axios from "axios";
import { BigNumber } from "ethers";

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
  NxtpError,
  connextRelayerSend,
  RelayerApiPostTaskRequestParams,
  expect,
} from "../../src";

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
      const res = await gelatoSend(1337, {
        dest: "0x1",
        data: "0x",
        token: "0xa",
        relayerFee: "1",
      });
      expect(res).to.be.deep.eq("Gelato sent successfully!");
    });

    it("should throw if post fails", async () => {
      axiosPostStub.throws(new Error("Request failed!"));
      await expect(
        gelatoSend(1337, {
          dest: "0x1",
          data: "0x",
          token: "0xa",
          relayerFee: "1",
        }),
      ).to.be.rejectedWith("Error sending request to Gelato Relay");
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

  describe("#connextRelayerSend", () => {
    it("happy: should post data successfully", async () => {
      const resultData = "result data";
      axiosPostStub.resolves({ data: resultData });
      const url = "mock-url";
      const chainId = 1337;
      const params: RelayerApiPostTaskRequestParams = {
        to: "0x1",
        data: "0x",
        fee: {
          amount: "0",
          token: "0xa",
          chain: 1338,
        },
      };
      const res = await connextRelayerSend(url, chainId, params);
      expect(axiosPostStub).to.have.been.calledOnceWithExactly(`${url}/relays/${chainId}`, params);
      expect(res).to.be.deep.eq(resultData);
    });

    it("should throw if post fails", async () => {
      axiosPostStub.throws(new Error("Request failed!"));
      const url = "mock-url";
      const chainId = 1337;
      const params: RelayerApiPostTaskRequestParams = {
        to: "0x1",
        data: "0x",
        fee: {
          amount: "0",
          token: "0xa",
          chain: 1338,
        },
      };
      await expect(connextRelayerSend(url, chainId, params)).to.be.rejectedWith(NxtpError);
    });
  });
});
