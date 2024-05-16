import {
  BaseRequestContext,
  createRequestContext,
  expect,
  mock,
  RelayerType,
  RootMessage,
  mkBytes32,
  RelayerTaskStatus,
  getNtpTimeSeconds,
  mkAddress,
  RequestContext,
  chainIdToDomain,
  mkHash,
} from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as ProcessFromRootFns from "../../../../src/tasks/processFromRoot/operations/processFromRoot";
import * as ProcessFromHelperRootFns from "../../../../src/tasks/processFromRoot/helpers";
import { CouldNotFindRelayer } from "../../../../src/tasks/processFromRoot/errors";
import * as MockableFns from "../../../../src/mockable";
import { processFromRootCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { ProcessConfigNotAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { DEFAULT_RELAYER_WAIT_TIME } from "../../../../src/config";
import { WriteTransaction } from "@connext/nxtp-txservice";
import { MessageStatus } from "@eth-optimism/sdk";
import { constants } from "ethers";

const requestContext = createRequestContext("test");
let getMessageStatusStub: SinonStub;
let toCrosschainMessageStub: SinonStub;
let toLowLevelMessageStub: SinonStub;
let getBedrockMessageProofStub: SinonStub;
let getArgs: SinonStub;

class MockCrossChainMessenger {
  public getMessageStatus = getMessageStatusStub;
  public toCrossChainMessage = toCrosschainMessageStub;
  public getBedrockMessageProof = getBedrockMessageProofStub;
  public toLowLevelMessage = toLowLevelMessageStub;
}

describe("Operations: ProcessFromRoot", () => {
  describe("#processorConfigs", () => {
    describe("#getWriteTransactionFromArgsWithPrefix", () => {
      const params = {
        spokeChainId: 10,
        hubChainId: 1,
        spokeDomainId: chainIdToDomain(10).toString(),
        hubDomainId: chainIdToDomain(1).toString(),
        spokeProvider: "http://rpc.org",
        hubProvider: "http://rpc.org",
        message: "0x123",
        sendHash: mkHash("0x123"),
        blockNumber: 1,
        isSpokeClaim: false,
        _requestContext: requestContext,
      } as ProcessFromHelperRootFns.GetProcessArgsParams;

      it("getWriteTransactionFromArgsWithPrefix should work", async () => {
        // messenger stubs for opt
        stub(MockableFns, "OptimismCrossChainMessenger").value(MockCrossChainMessenger);
        getMessageStatusStub = stub().resolves(MessageStatus.READY_TO_PROVE);
        toCrosschainMessageStub = stub().resolves({} as any);
        toLowLevelMessageStub = stub().resolves({
          messageNonce: 1,
          sender: mkAddress("0xdead"),
          target: mkAddress("0xbeef"),
          value: constants.Zero,
          message: "0x123",
          minGasLimit: constants.Zero,
        });
        getBedrockMessageProofStub = stub().resolves({
          l2OutputIndex: 1235,
          outputRootProof: [mkBytes32("0xdeaf")],
          withdrawalProof: [mkBytes32("0xddbeef")],
        });

        // contract stubs
        processFromRootCtxMock.adapters.contracts.hubConnector = stub().returns({
          address: mkAddress("0xdeadbeef"),
        });

        // encode stubs
        stub(MockableFns, "encodeProcessMessageFromRoot").returns("0xfaded");
        const ret = await ProcessFromRootFns.processorConfigs[params.spokeDomainId].getWriteTransaction(params);
        expect(ret).to.contain({
          data: "0xfaded",
          domain: +params.hubDomainId,
          value: constants.Zero,
        });
        expect(processFromRootCtxMock.adapters.contracts.hubConnector).to.be.calledWithExactly(
          params.hubChainId,
          "Optimism",
          "Staging",
        );
        expect(getMessageStatusStub).to.be.calledOnceWithExactly(params.sendHash);
      });

      it("getWriteTransactionFromArgsWithPrefix should throw if no hub connector", async () => {
        // messenger stubs for opt
        stub(MockableFns, "OptimismCrossChainMessenger").value(MockCrossChainMessenger);
        getMessageStatusStub = stub().resolves(MessageStatus.READY_TO_PROVE);
        toCrosschainMessageStub = stub().resolves({} as any);
        toLowLevelMessageStub = stub().resolves({
          messageNonce: 1,
          sender: mkAddress("0xdead"),
          target: mkAddress("0xbeef"),
          value: constants.Zero,
          message: "0x123",
          minGasLimit: constants.Zero,
        });
        getBedrockMessageProofStub = stub().resolves({
          l2OutputIndex: 1235,
          outputRootProof: [mkBytes32("0xdeaf")],
          withdrawalProof: [mkBytes32("0xddbeef")],
        });

        // contract stubs
        processFromRootCtxMock.adapters.contracts.hubConnector = stub().returns(undefined);

        await expect(
          ProcessFromRootFns.processorConfigs[params.spokeDomainId].getWriteTransaction(params),
        ).to.be.rejectedWith(ProcessConfigNotAvailable);
      });
    });

    describe("#getWriteTransactionFromArgsWithContract", () => {
      const params = {
        spokeChainId: 534352,
        hubChainId: 1,
        spokeDomainId: chainIdToDomain(534352).toString(),
        hubDomainId: chainIdToDomain(1).toString(),
        spokeProvider: "http://rpc.org",
        hubProvider: "http://rpc.org",
        message: "0x123",
        sendHash: mkHash("0x123"),
        blockNumber: 1,
        isSpokeClaim: false,
        _requestContext: requestContext,
      } as ProcessFromHelperRootFns.GetProcessArgsParams;

      it("should work", async () => {
        const claimInfo = {
          from: mkAddress("0xab"),
          to: mkAddress("0xbc"),
          value: 1,
          nonce: 1,
          message: "0x",
          batch_index: 1,
          proof: [],
        };
        stub(MockableFns, "axiosGet").resolves({
          data: {
            errcode: 0,
            data: {
              result: [
                {
                  hash: params.sendHash,
                  claimInfo,
                  finalizeTx: {},
                },
              ],
            },
          },
        });

        // encode stubs
        stub(MockableFns, "encodeProcessMessageFromRoot").returns("0xfaded");
        const ret = await ProcessFromRootFns.processorConfigs[params.spokeDomainId].getWriteTransaction(params);
        expect(ret).to.contain({
          data: "0xfaded",
          domain: +params.hubDomainId,
          value: constants.Zero,
          to: "0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367",
        });
      });
    });
  });

  describe("#processSingleRootMessage", () => {
    let configStub: SinonStub<any[], any>;

    beforeEach(() => {
      configStub = stub(ProcessFromRootFns, "processorConfigs").value({
        [mock.entity.rootMessage().spokeDomain]: {
          getWriteTransaction: () =>
            Promise.resolve({
              domain: +mock.entity.rootMessage().spokeDomain,
              to: mkAddress("0xdeadbeef"),
              value: "0",
              data: mkBytes32("0x1232131"),
            } as WriteTransaction),
          hubConnectorPrefix: "Optimism",
        },
      });
      stub(MockableFns, "encodeProcessMessageFromRoot").returns("0xfaded");
    });

    it("should process message from root", async () => {
      const rootMsg = mock.entity.rootMessage();
      await ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext);
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });

    it("should process message from root", async () => {
      const rootMsg = mock.entity.rootMessage();
      await ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext);
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });

    it("should error if cannot find relayer", async () => {
      const rootMsg = mock.entity.rootMessage();
      rootMsg.sentTaskId = mkBytes32("0xdeadbeef");
      rootMsg.relayerType = RelayerType.Connext;

      await expect(
        ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext),
      ).to.be.rejectedWith(CouldNotFindRelayer);
    });

    it("should not send if successfully sent", async () => {
      const rootMsg = mock.entity.rootMessage();
      rootMsg.sentTaskId = mkBytes32("0xdeadbeef");
      rootMsg.relayerType = RelayerType.Mock;
      const ret = await ProcessFromRootFns.processSingleRootMessage(
        { ...rootMsg, isSpokeClaim: false },
        requestContext,
      );
      expect(ret).to.be.eq(undefined);
      expect(sendWithRelayerWithBackupStub).to.not.have.been.called;
    });

    it("should send again if exec pending", async () => {
      const rootMsg = mock.entity.rootMessage();
      rootMsg.sentTaskId = mkBytes32("0xdeadbeef");
      rootMsg.relayerType = RelayerType.Mock;
      (processFromRootCtxMock.adapters.relayers[0].instance.getTaskStatus as SinonStub).resolves(
        RelayerTaskStatus.ExecPending,
      );
      await ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext);
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });

    it("should send again if exec failed", async () => {
      const rootMsg = mock.entity.rootMessage();
      rootMsg.sentTaskId = mkBytes32("0xdeadbeef");
      rootMsg.relayerType = RelayerType.Mock;
      (processFromRootCtxMock.adapters.relayers[0].instance.getTaskStatus as SinonStub).resolves(
        RelayerTaskStatus.Cancelled,
      );
      await ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext);
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });

    it("should not send if sent timestamp is within window", async () => {
      const rootMsg = mock.entity.rootMessage();
      rootMsg.sentTaskId = mkBytes32("0xdeadbeef");
      rootMsg.relayerType = RelayerType.Mock;
      rootMsg.sentTimestamp = getNtpTimeSeconds() - 30;
      (processFromRootCtxMock.adapters.relayers[0].instance.getTaskStatus as SinonStub).resolves(
        RelayerTaskStatus.ExecPending,
      );
      const ret = await ProcessFromRootFns.processSingleRootMessage(
        { ...rootMsg, isSpokeClaim: false },
        requestContext,
      );
      expect(ret).to.be.eq(undefined);
      expect(sendWithRelayerWithBackupStub).to.callCount(0);
    });

    it("should send if sent timestamp is outside window", async () => {
      const rootMsg = mock.entity.rootMessage();
      rootMsg.sentTaskId = mkBytes32("0xdeadbeef");
      rootMsg.relayerType = RelayerType.Mock;
      rootMsg.sentTimestamp = getNtpTimeSeconds() - (DEFAULT_RELAYER_WAIT_TIME + 1);
      (processFromRootCtxMock.adapters.relayers[0].instance.getTaskStatus as SinonStub).resolves(
        RelayerTaskStatus.ExecPending,
      );
      console.log("expecting root message", rootMsg);
      await ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext);
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
      expect(processFromRootCtxMock.adapters.database.saveSentRootMessages).to.have.been.calledOnceWith([
        { ...rootMsg, isSpokeClaim: false, sentTimestamp: getNtpTimeSeconds(), sentTaskId: mkBytes32("0xabcdef123") },
      ]);
    });

    it("should error if no config", async () => {
      configStub.value({});
      const rootMsg = mock.entity.rootMessage();
      await expect(
        ProcessFromRootFns.processSingleRootMessage({ ...rootMsg, isSpokeClaim: false }, requestContext),
      ).to.be.rejectedWith(ProcessConfigNotAvailable);
    });
    it("should return undefined", async () => {
      const rootMsg = mock.entity.rootMessage();
      stub(ProcessFromRootFns, "processorConfigs").value({
        [mock.entity.rootMessage().spokeDomain]: {
          getWriteTransaction: () => Promise.resolve(undefined),
          hubConnectorPrefix: "Optimism",
        },
      });
      const args = await ProcessFromRootFns.processSingleRootMessage(
        { ...rootMsg, isSpokeClaim: false },
        requestContext,
      );
      expect(args).to.be.undefined;
    });
  });

  describe("#processFromRoot", () => {
    let processSingleRootMessageStub: SinonStub<
      [
        rootMessage: {
          id: string;
          spokeDomain: string;
          hubDomain: string;
          root: string;
          caller: string;
          transactionHash: string;
          timestamp: number;
          gasPrice: string;
          gasLimit: string;
          blockNumber: number;
          processed: boolean;
          count: number;
          isSpokeClaim: boolean;
        },
        requestContext: BaseRequestContext,
      ],
      Promise<string | undefined>
    >;
    beforeEach(() => {
      processSingleRootMessageStub = stub(ProcessFromRootFns, "processSingleRootMessage").resolves("0xbeefee");
    });

    it("should not process if error but still work", async () => {
      processSingleRootMessageStub.rejects(new Error("test"));
      await expect(ProcessFromRootFns.processFromRoot()).to.be.fulfilled;
    });

    it("should only process a single root message for each domain", async () => {
      processSingleRootMessageStub.resolves(mkBytes32());
      const rootMessages: (RootMessage & { isSpokeClaim: boolean })[] = [
        { ...mock.entity.rootMessage(), timestamp: 1, spokeDomain: "test1", isSpokeClaim: false },
        { ...mock.entity.rootMessage(), timestamp: 2, spokeDomain: "test1", isSpokeClaim: false },
        { ...mock.entity.rootMessage(), timestamp: 1, spokeDomain: "test2", isSpokeClaim: false },
        { ...mock.entity.rootMessage(), timestamp: 2, spokeDomain: "test2", isSpokeClaim: false },
        { ...mock.entity.rootMessage(), timestamp: 1, spokeDomain: "test3", isSpokeClaim: false },
        { ...mock.entity.rootMessage(), timestamp: 2, spokeDomain: "test3", isSpokeClaim: false },
      ];

      (processFromRootCtxMock.adapters.database.getRootMessages as SinonStub).resolves(rootMessages);

      await ProcessFromRootFns.processFromRoot();

      expect(processSingleRootMessageStub.callCount).to.eq(3);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMessages[1]);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMessages[3]);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMessages[5]);
    });
  });

  describe("#getSpokeMessages", () => {
    let getLatestXLayerSpokeMessage: SinonStub<[number, number, RequestContext], [Promise<any | undefined>]>;
    beforeEach(() => {
      getLatestXLayerSpokeMessage = stub(ProcessFromHelperRootFns, "getLatestXLayerSpokeMessage").resolves(
        [] as any,
      ) as any;
    });

    it("should work", async () => {
      const messages = await ProcessFromRootFns.getSpokeMessages(requestContext);
      expect(messages).to.be.deep.eq([]);
    });
    it("should work with not empty array", async () => {
      getLatestXLayerSpokeMessage = stub(ProcessFromHelperRootFns, "getLatestXLayerSpokeMessage").resolves([
        {},
      ] as any) as any;
      const message = await ProcessFromRootFns.getSpokeMessages(requestContext);
      expect(message).to.not.be.undefined;
    });
  });
});
