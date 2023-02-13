import {
  BaseRequestContext,
  createRequestContext,
  expect,
  Logger,
  mock,
  RelayerType,
  RootMessage,
} from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as ProcessFromRootFns from "../../../../src/tasks/processFromRoot/operations/processFromRoot";
import * as MockableFns from "../../../../src/mockable";
import { processFromRootCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { ProcessConfigNotAvailable } from "../../../../src/tasks/processFromRoot/errors";

describe("Operations: ProcessFromRoot", () => {
  describe("#processSingleRootMessage", () => {
    let configStub: SinonStub<any[], any>;

    beforeEach(() => {
      configStub = stub(ProcessFromRootFns, "processorConfigs").value({
        [mock.entity.rootMessage().spokeDomain]: {
          getArgs: () => Promise.resolve([]),
          hubConnectorPrefix: "Optimism",
        },
      });
      stub(MockableFns, "encodeProcessMessageFromRoot").returns("0xfaded");
    });

    it("should process message from root", async () => {
      const rootMsg = mock.entity.rootMessage();
      const requestContext = createRequestContext("test");
      await ProcessFromRootFns.processSingleRootMessage(rootMsg, requestContext);
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });

    it("should error if no config", async () => {
      configStub.value({});
      const rootMsg = mock.entity.rootMessage();
      const requestContext = createRequestContext("test");
      await expect(ProcessFromRootFns.processSingleRootMessage(rootMsg, requestContext)).to.be.rejectedWith(
        ProcessConfigNotAvailable,
      );
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
        },
        requestContext: BaseRequestContext,
      ],
      Promise<string>
    >;
    beforeEach(() => {
      processSingleRootMessageStub = stub(ProcessFromRootFns, "processSingleRootMessage").resolves("0xbeefee");
    });

    it("should process messages", async () => {
      const rootMsgs = [mock.entity.rootMessage(), mock.entity.rootMessage()];
      (processFromRootCtxMock.adapters.database.getRootMessages as SinonStub).resolves(rootMsgs);

      await ProcessFromRootFns.processFromRoot();

      expect(processSingleRootMessageStub).to.be.calledWith(rootMsgs[0]);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMsgs[1]);
      expect(processSingleRootMessageStub).to.have.been.calledTwice;
    });

    it("should not process if error but still work", async () => {
      processSingleRootMessageStub.rejects(new Error("test"));
      await expect(ProcessFromRootFns.processFromRoot()).to.be.fulfilled;
    });

    it("should only process a single root message for each domain", async () => {
      const rootMessageA: RootMessage[] = [
        { ...mock.entity.rootMessage(), timestamp: 1 },
        { ...mock.entity.rootMessage(), timestamp: 2 },
        { ...mock.entity.rootMessage(), timestamp: 3 },
      ];
      const rootMessageB: RootMessage[] = [
        { ...mock.entity.rootMessage(), timestamp: 1, spokeDomain: "test2" },
        { ...mock.entity.rootMessage(), timestamp: 2, spokeDomain: "test2" },
      ];
      const rootMessageC: RootMessage[] = [{ ...mock.entity.rootMessage(), spokeDomain: "test3" }];

      (processFromRootCtxMock.adapters.database.getRootMessages as SinonStub).resolves(
        rootMessageA.concat(rootMessageB).concat(rootMessageC),
      );

      await ProcessFromRootFns.processFromRoot();

      expect(processSingleRootMessageStub).to.be.calledWith(rootMessageA[2]);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMessageB[1]);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMessageC[0]);
      expect(processSingleRootMessageStub).to.callCount(3);
      expect(
        processFromRootCtxMock.adapters.database.markRootMessagesProcessed as SinonStub,
      ).to.be.calledOnceWithExactly([rootMessageA[0], rootMessageA[1], rootMessageB[0]]);
    });
  });
});
