import { stub, SinonStub, SinonStubbedInstance } from "sinon";
import {
  mkAddress,
  expect,
  mock,
  Logger,
  GELATO_RELAYER_ADDRESS,
  RelayerTaskStatus,
  mkBytes32,
  createRequestContext,
} from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";

import * as RelayerIndexFns from "../../src/gelato/index";
import { mockTaskId } from "../mock";
import {
  send,
  getRelayerAddress,
  gelatoSDKSend,
  isChainSupportedByGelato,
  getGelatoRelayChains,
  getTaskStatus,
  getTransactionHash,
  waitForTaskCompletion,
  gelatoV0Send,
} from "../../src/gelato/gelato";
import * as GelatoFns from "../../src/gelato/gelato";
import {
  RelayerSendFailed,
  TransactionHashTimeout,
  UnableToGetGelatoSupportedChains,
  UnableToGetTaskStatus,
  UnableToGetTransactionHash,
} from "../../src/errors";
import * as Mockable from "../../src/mockable";

const loggingContext = mock.loggingContext("RELAYER-TEST");
export const mockGelatoSDKSuccessResponse = { taskId: mockTaskId };
const mockTxHash = mkBytes32("0xbbb");

const logger = new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" });
describe("Adapters: Gelato", () => {
  let isChainSupportedByGelatoStub: SinonStub<[chainId: number], Promise<boolean>>;
  let chainReaderMock: SinonStubbedInstance<ChainReader>;
  let axiosPostStub: SinonStub;
  let axiosGetStub: SinonStub;
  let gelatoRelayMock;

  beforeEach(() => {
    gelatoRelayMock = {
      callWithSyncFee: stub().resolves(mockGelatoSDKSuccessResponse),
      sponsoredCall: stub().resolves(mockGelatoSDKSuccessResponse),
      isNetworkSupported: stub().resolves(true),
      getSupportedNetworks: stub().resolves(["1337", "1338"]),
      getTaskStatus: stub().resolves({ taskState: RelayerTaskStatus.CheckPending, transactionHash: mockTxHash }),
    };
    stub(RelayerIndexFns, "gelatoRelay").value(gelatoRelayMock);
    chainReaderMock = mockChainReader() as any;
    axiosGetStub = stub(Mockable, "axiosGet");
  });

  describe("#isChainSupportedByGelato", () => {
    it("should error", async () => {
      gelatoRelayMock.isNetworkSupported.rejects(new Error("Request failed!"));
      await expect(isChainSupportedByGelato(1337)).to.eventually.be.rejectedWith(UnableToGetGelatoSupportedChains);
    });

    it("should return true if a chain is supported by gelato", async () => {
      expect(await isChainSupportedByGelato(1337)).to.be.true;
    });

    it("should return false if a chain is not supported by gelato", async () => {
      gelatoRelayMock.isNetworkSupported.resolves(false);
      expect(await isChainSupportedByGelato(12345)).to.be.false;
    });
  });

  describe("#getRelayerAddress", () => {
    it("happy: should return address", async () => {
      expect(await getRelayerAddress(1337)).to.be.eq(GELATO_RELAYER_ADDRESS);
    });
  });

  describe("#getGelatoRelayChains", () => {
    it("happy: should get relay chains from gelato", async () => {
      expect(await getGelatoRelayChains()).to.be.deep.eq(["1337", "1338"]);
    });

    it("should throw the request fails", async () => {
      gelatoRelayMock.getSupportedNetworks.rejects(new Error("Request failed!"));

      await expect(getGelatoRelayChains()).to.eventually.be.rejectedWith(UnableToGetGelatoSupportedChains);
    });
  });

  describe("#getTaskStatus", () => {
    it("happy: should get task status from gelato", async () => {
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.CheckPending);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.Blacklisted,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.Blacklisted);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.Cancelled,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.Cancelled);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.CheckPending,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.CheckPending);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.ExecPending,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.ExecPending);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.ExecReverted,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.ExecReverted);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.NotFound,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.NotFound);
    });

    it("happy: should get task status from gelato", async () => {
      gelatoRelayMock.getTaskStatus.resolves({
        taskState: RelayerTaskStatus.WaitingForConfirmation,
        transactionHash: mockTxHash,
      });
      expect(await getTaskStatus("0x")).to.be.eq(RelayerTaskStatus.WaitingForConfirmation);
    });

    it("should return NotFound if the request fails", async () => {
      gelatoRelayMock.getTaskStatus.rejects(new Error("Request failed!"));

      await expect(getTaskStatus("0x")).to.be.rejectedWith(UnableToGetTaskStatus);
    });
  });

  describe("#waitForTaskCompletion", () => {
    it("should timeout", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      gelatoRelayMock.getTaskStatus.rejects();
      await expect(
        waitForTaskCompletion(mockTaskId, logger, loggingContext.requestContext, 1_000, 200),
      ).to.be.rejectedWith(TransactionHashTimeout);
    });

    it("should wait until getting finalized task status", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      gelatoRelayMock.getTaskStatus
        .onFirstCall()
        .resolves({ taskId: mockTaskId, taskState: RelayerTaskStatus.CheckPending });
      gelatoRelayMock.getTaskStatus
        .onSecondCall()
        .resolves({ taskId: mockTaskId, taskState: RelayerTaskStatus.ExecSuccess });
      const taskStatus = await waitForTaskCompletion(mockTaskId, logger, loggingContext.requestContext, 12_000, 200);
      expect(taskStatus).to.be.eq(RelayerTaskStatus.ExecSuccess);
    });

    it("happy: should return taskStatus successfully", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      gelatoRelayMock.getTaskStatus.resolves({ taskState: RelayerTaskStatus.ExecSuccess });
      const taskStatus = await waitForTaskCompletion(mockTaskId, logger, loggingContext.requestContext, 6_000, 200);
      expect(taskStatus).to.be.eq(RelayerTaskStatus.ExecSuccess);
    });
  });

  describe("#gelatoSDKSend", () => {
    it("should fail to send", async () => {
      gelatoRelayMock.sponsoredCall.rejects();
      const request = {
        chainId: 1337,
        target: mkAddress("0x1"),
        data: "0xfee",
        relayContext: true,
        feeToken: "0x",
      };
      const apiKey = "apikey";
      await expect(gelatoSDKSend(request, apiKey)).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("happy: should send data successfully!", async () => {
      const request = {
        chainId: 1337,
        target: mkAddress("0x1"),
        data: "0xfee",
        relayContext: true,
        feeToken: "0x",
      };
      const apiKey = "apikey";
      const res = await gelatoSDKSend(request, apiKey);
      expect(res).to.be.deep.eq(mockGelatoSDKSuccessResponse);
    });
  });

  describe("#getTransactionHash", () => {
    it("happy should return transaction hash successfully", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      expect(await getTransactionHash(mockTaskId)).to.be.eq(mockTxHash);
    });

    it("should throw if fails", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      gelatoRelayMock.getTaskStatus.rejects();
      await expect(getTransactionHash(mockTaskId)).to.be.rejectedWith(UnableToGetTransactionHash);
    });
  });

  describe("#getRelayerAddress", () => {
    beforeEach(() => {
      axiosGetStub.resolves({ data: { address: GELATO_RELAYER_ADDRESS } });
    });

    it("should work", async () => {
      const relayerAddress = await getRelayerAddress(1234);
      expect(relayerAddress).to.eq(GELATO_RELAYER_ADDRESS);
    });
  });

  describe("#gelatoV0Send", async () => {
    beforeEach(() => {
      isChainSupportedByGelatoStub = stub(GelatoFns, "isChainSupportedByGelato").resolves(true);
      axiosPostStub = stub(Mockable, "axiosPost");
      axiosPostStub.resolves({ status: 200, data: { taskId: mockTaskId } });
      chainReaderMock = mockChainReader() as any;
      stub(RelayerIndexFns, "url").value("http://example.com");
    });

    it("should fail to send if error", async () => {
      axiosPostStub.throws(new Error("Request failed!"));
      await expect(
        gelatoV0Send(+mock.chain.A, mkAddress(), "0xfee", "0", logger, createRequestContext("test")),
      ).to.be.rejectedWith(RelayerSendFailed);
    });

    it("should work", async () => {
      const { taskId } = await gelatoV0Send(
        +mock.chain.A,
        mkAddress(),
        "0xfee",
        "0",
        logger,
        createRequestContext("test"),
      );
      expect(taskId).to.be.eq(mockTaskId);
    });
  });

  describe("#send", () => {
    let gelatoSDKSendStub;
    beforeEach(() => {
      isChainSupportedByGelatoStub = stub(GelatoFns, "isChainSupportedByGelato").resolves(true);
      stub(GelatoFns, "getRelayerAddress").resolves(GELATO_RELAYER_ADDRESS);
      chainReaderMock = mockChainReader() as any;
      stub(RelayerIndexFns, "url").value("http://example.com");
      gelatoSDKSendStub = stub(GelatoFns, "gelatoSDKSend").resolves(mockGelatoSDKSuccessResponse);
    });

    it("should error if gelato returns error", async () => {
      gelatoSDKSendStub.rejects("oh no");
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

    it("should error if gelato returns no response", async () => {
      gelatoSDKSendStub.resolves();
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
});
