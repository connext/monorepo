import { stub, SinonStub, SinonStubbedInstance, createStubInstance } from "sinon";
import { mkAddress, expect, mock, Logger, GELATO_RELAYER_ADDRESS, RelayerTaskStatus } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";
import axios from "axios";
import * as GelatoRelaySdkFns from "@gelatonetwork/relay-sdk";

import { mockTaskId } from "../mock";
import {
  send,
  getRelayerAddress,
  gelatoSDKSend,
  isChainSupportedByGelato,
  getGelatoRelayChains,
  getGelatoRelayerAddress,
  isPaymentTokenSupported,
  getPaymentTokens,
  getTaskStatus,
} from "../../src/gelato/gelato";
import * as GelatoFns from "../../src/gelato/gelato";
import { RelayerSendFailed, UnableToGetTaskStatus } from "../../src/errors";

const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const loggingContext = mock.loggingContext("RELAYER-TEST");
export const mockGelatoSDKSuccessResponse = { taskId: mockTaskId };

const logger = new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" });
describe("Adapters: Gelato", () => {
  let gelatoSDKSendStub: SinonStub;
  let isChainSupportedByGelatoStub: SinonStub;
  let chainReaderMock: SinonStubbedInstance<ChainReader>;
  let axiosGetStub: SinonStub;

  beforeEach(() => {
    chainReaderMock = mockChainReader() as any;
    axiosGetStub = stub(axios, "get");
  });

  describe("#getRelayerAddress", () => {
    it("should work", async () => {
      const relayerAddress = await getRelayerAddress(1234, logger);
      expect(relayerAddress).to.eq(GELATO_RELAYER_ADDRESS);
    });
  });

  describe("#send", () => {
    beforeEach(() => {
      gelatoSDKSendStub = stub(GelatoFns, "gelatoSDKSend").resolves(mockGelatoSDKSuccessResponse);
      isChainSupportedByGelatoStub = stub(GelatoFns, "isChainSupportedByGelato").resolves(true);
    });

    it("should error if gelato returns error", async () => {
      gelatoSDKSendStub.resolves(mockAxiosErrorResponse);
      expect(
        send(
          Number(mock.chain.A),
          mock.domain.A,
          mkAddress(),
          "0xbeed",
          "foo",
          chainReaderMock,
          logger,
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should throw if the chain isn't supported by gelato", () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        send(
          Number(mock.chain.A),
          mock.domain.A,
          mkAddress(),
          "0xbeed",
          "foo",
          chainReaderMock,
          logger,
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        Number(mock.chain.A),
        mock.domain.A,
        mkAddress(),
        "0xbeed",
        "foo",
        chainReaderMock,
        logger,
        loggingContext.requestContext,
      );
      expect(gelatoSDKSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockTaskId);
    });
  });

  describe("#gelatoSDKSend", () => {
    beforeEach(() => {
      stub(GelatoRelaySdkFns, "GelatoRelaySDK").returns({
        relayWithSponsoredCall: () => Promise.resolve(mockGelatoSDKSuccessResponse),
      });
    });

    it.skip("happy: should send data successfully!", async () => {
      const request = {
        chainId: 1337,
        target: mkAddress("0x1"),
        data: "0xfee",
      };
      const apiKey = "apikey";
      const res = await gelatoSDKSend(request, apiKey);
      expect(res).to.be.deep.eq(mockGelatoSDKSuccessResponse);
    });
  });

  describe("#isChainSupportedByGelato", () => {
    beforeEach(() => {
      stub(GelatoFns, "getGelatoRelayChains").resolves(["1337", "1338"]);
    });

    it("should return true if a chain is supported by gelato", async () => {
      expect(await isChainSupportedByGelato(1337)).to.be.true;
    });

    it("should return false if a chain is not supported by gelato", async () => {
      expect(await isChainSupportedByGelato(12345)).to.be.false;
    });
  });

  describe("#getGelatoRelayChains", () => {
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

  describe("#getGelatoRelayerAddress", () => {
    it("happy: should return address", async () => {
      expect(await getGelatoRelayerAddress(1337)).to.be.eq(GELATO_RELAYER_ADDRESS);
    });

    it.skip("should return zero address if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));

      await expect(getGelatoRelayerAddress(1337)).to.be.rejectedWith("Error in getGelatoRelayerAddress");
    });
  });

  describe("#isPaymentTokenSupported", () => {
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

  describe("#getTaskStatus", () => {
    it("happy: should get task status from gelato", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: {
          task: {
            taskState: "CheckPending",
          },
        },
      });

      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.CheckPending);
    });

    it("should return NotFound if the request fails", async () => {
      axiosGetStub.throws(new Error("Request failed!"));

      await expect(getTaskStatus("0x")).to.be.rejectedWith(UnableToGetTaskStatus);
    });
  });
});
