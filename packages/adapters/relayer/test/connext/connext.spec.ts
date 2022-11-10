import { stub, SinonStub, SinonStubbedInstance, restore, reset } from "sinon";
import {
  mkAddress,
  expect,
  mock,
  Logger,
  RelayerApiPostTaskRequestParams,
  NxtpError,
  mkBytes32,
  RelayerTaskStatus,
} from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";
import { constants } from "ethers";

import {
  connextRelayerSend,
  getRelayerAddress,
  getTaskStatus,
  getTransactionHash,
  waitForTaskCompletion,
} from "../../src/connext/connext";
import * as RelayerIndexFns from "../../src/connext/index";
import * as Mockable from "../../src/mockable";
import { TransactionHashTimeout, UnableToGetTaskStatus, UnableToGetTransactionHash } from "../../src/errors";

const loggingContext = mock.loggingContext("RELAYER-TEST");
const logger = new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" });
describe("Connext Relayer", () => {
  let axiosPostStub: SinonStub;
  let axiosGetStub: SinonStub;
  let chainReaderMock: SinonStubbedInstance<ChainReader>;

  beforeEach(() => {
    axiosPostStub = stub(Mockable, "axiosPost");
    axiosGetStub = stub(Mockable, "axiosGet");
    chainReaderMock = mockChainReader() as any;
    stub(RelayerIndexFns, "url").value("http://example.com");
  });

  describe("#connextRelayerSend", () => {
    it("happy: should post data successfully", async () => {
      axiosGetStub.resolves({ data: mkAddress("0xaaa") });
      axiosPostStub.resolves({ data: { taskId: "foo" } });
      const params: RelayerApiPostTaskRequestParams = {
        to: mkAddress(),
        data: "0xbeed",
        fee: {
          amount: "0",
          chain: Number(mock.chain.A),
          token: constants.AddressZero,
        },
      };
      const res = await connextRelayerSend(
        Number(mock.chain.A),
        mock.domain.A,
        params.to,
        params.data,
        "foo",
        chainReaderMock,
        logger,
        loggingContext.requestContext,
      );
      expect(axiosPostStub).to.have.been.calledOnceWithExactly(
        `http://example.com/relays/${Number(mock.chain.A)}`,
        params,
      );
      expect(res).to.be.deep.eq("foo");
    });

    it("should throw if post fails", async () => {
      axiosGetStub.resolves({ data: mkAddress("0xaaa") });
      axiosPostStub.throws(new Error("Request failed!"));
      await expect(
        connextRelayerSend(
          Number(mock.chain.A),
          mock.domain.A,
          mkAddress(),
          "0xbeed",
          "foo",
          chainReaderMock,
          logger,
          loggingContext.requestContext,
        ),
      ).to.be.rejectedWith(NxtpError);
    });
  });

  describe("#getRelayerAddress", () => {
    it("happy: should get relayer address successfully", async () => {
      axiosGetStub.resolves({ data: mkAddress("0xaaa") });
      expect(await getRelayerAddress()).to.be.eq(mkAddress("0xaaa"));
    });
    it("should throw if get fails", async () => {
      axiosGetStub.throws();
      await expect(getRelayerAddress()).to.be.rejected;
    });
  });

  describe("#getTaskStatus", () => {
    it("happy should return NotFound status", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.resolves({ data: { taskId: mockTaskId } });
      expect(await getTaskStatus(mockTaskId)).to.be.eq(RelayerTaskStatus.NotFound);
    });
    it("happy should get task status successfully", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.resolves({ data: { taskId: mockTaskId, taskState: RelayerTaskStatus.CheckPending } });
      expect(await getTaskStatus(mockTaskId)).to.be.eq(RelayerTaskStatus.CheckPending);
    });
    it("should throw if fails", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.throws();
      await expect(getTaskStatus(mockTaskId)).to.be.rejectedWith(UnableToGetTaskStatus);
    });
  });

  describe("#getTransactionHash", () => {
    it("happy should return transaction hash successfully", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      const mockTxHash = mkBytes32("0xbbb");
      axiosGetStub.resolves({ data: { data: [{ transactionHash: mockTxHash }] } });
      expect(await getTransactionHash(mockTaskId)).to.be.eq(mockTxHash);
    });
    it("should throw if fails", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.throws();
      await expect(getTransactionHash(mockTaskId)).to.be.rejectedWith(UnableToGetTransactionHash);
    });
  });

  describe("#waitForTaskCompletion", () => {
    it("should timeout", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.onFirstCall().throws();
      await expect(
        waitForTaskCompletion(mockTaskId, logger, loggingContext.requestContext, 1_00, 2000),
      ).to.be.rejectedWith(TransactionHashTimeout);
    });
    it("should wait until getting finalized task status", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.onFirstCall().resolves({ data: { taskId: mockTaskId, taskState: RelayerTaskStatus.CheckPending } });
      axiosGetStub.onSecondCall().resolves({ data: { taskId: mockTaskId, taskState: RelayerTaskStatus.ExecSuccess } });
      const taskStatus = await waitForTaskCompletion(mockTaskId, logger, loggingContext.requestContext, 12_000, 200);
      expect(taskStatus).to.be.eq(RelayerTaskStatus.ExecSuccess);
    });

    it("happy: should return taskStatus successfully", async () => {
      const mockTaskId = mkBytes32("0xaaa");
      axiosGetStub.resolves({ data: { taskId: mockTaskId, taskState: RelayerTaskStatus.ExecSuccess } });
      const taskStatus = await waitForTaskCompletion(mockTaskId, logger, loggingContext.requestContext, 6_000, 200);
      expect(taskStatus).to.be.eq(RelayerTaskStatus.ExecSuccess);
    });
  });
});
