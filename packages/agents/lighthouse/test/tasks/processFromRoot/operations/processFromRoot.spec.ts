import { BaseRequestContext, createRequestContext, expect, Logger, mock, RelayerType } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as ProcessFromRootFns from "../../../../src/tasks/processFromRoot/operations/processFromRoot";
import * as MockableFns from "../../../../src/mockable";
import { processFromRootCtxMock } from "../../../globalTestHook";
import { ProcessConfigNotAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { mockTaskId } from "@connext/nxtp-adapters-relayer/test/mock";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { ChainReader } from "@connext/nxtp-txservice";

describe("Operations: ProcessFromRoot", () => {
  describe("#processSingleRootMessage", () => {
    let configStub: SinonStub<any[], any>;
    let sendWithRelayerWithBackupStub: SinonStub<
      [
        chainId: number,
        domain: string,
        destinationAddress: string,
        data: string,
        relayers: { instance: Relayer; apiKey: string; type: RelayerType }[],
        chainReader: ChainReader,
        logger: Logger,
        _requestContext: BaseRequestContext,
      ],
      Promise<{ taskId: string }>
    >;

    beforeEach(() => {
      configStub = stub(ProcessFromRootFns, "processorConfigs").value({
        [mock.entity.rootMessage().spokeDomain]: {
          getArgs: () => Promise.resolve([]),
          hubConnectorPrefix: "Optimism",
        },
      });
      stub(MockableFns, "encodeProcessMessageFromRoot").returns("0xfaded");
      sendWithRelayerWithBackupStub = stub(MockableFns, "sendWithRelayerWithBackup").resolves({
        taskId: mockTaskId,
      });
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
    let processSingleRootMessageStub;
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
  });
});
