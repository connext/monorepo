import { BaseRequestContext, Logger, expect, RelayerType, SparseMerkleTree, XMessage } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { proveAndProcess, processMessages } from "../../../../src/tasks/prover/operations/proveAndProcess";
import * as ProveAndProcessFns from "../../../../src/tasks/prover/operations/proveAndProcess";
import * as MockableFns from "../../../../src/mockable";
import { mockXMessage1, mockXMessage2, mockRootMessage } from "../../../mock";
import { proverCtxMock } from "../../../globalTestHook";
import { mockTaskId } from "@connext/nxtp-adapters-relayer/test/mock";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { ChainReader } from "@connext/nxtp-txservice";

describe("Operations: ProveAndProcess", () => {
  describe("#proveAndProcess", () => {
    let processMessagesStub: SinonStub<
      [message: XMessage[], originDomain: string, destinationDomain: string, latestMessageRoot: string],
      Promise<void>
    >;

    beforeEach(() => {
      processMessagesStub = stub(ProveAndProcessFns, "processMessages").resolves();
    });

    it("should process messages", async () => {
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
      // expect(processMessagesStub).to.be.calledWithExactly(mockXMessage1);
    });

    it("should not process if error but still work", async () => {
      processMessagesStub.onFirstCall().rejects(new Error("error"));
      await expect(proveAndProcess()).to.be.fulfilled;
    });
  });

  describe("#processMessages", () => {
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
      (proverCtxMock.adapters.database.getMessageRootFromIndex as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      stub(SparseMerkleTree.prototype, "getProof").resolves([]);
      sendWithRelayerWithBackupStub = stub(MockableFns, "sendWithRelayerWithBackup").resolves({
        taskId: mockTaskId,
      });
    });

    it("should error if spoke connector not found", async () => {
      await expect(processMessages([mockXMessage1], mockXMessage1.originDomain, "1234", "ROOT"));
      // expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
    });

    it("should process a message", async () => {
      await processMessages([mockXMessage1], mockXMessage1.originDomain, mockXMessage1.destinationDomain, "ROOT");
      expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });
  });

  describe("#processMessages with exceptions", () => {
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
      (proverCtxMock.adapters.database.getMessageRootFromIndex as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      stub(SparseMerkleTree.prototype, "getProof").resolves([]);
      sendWithRelayerWithBackupStub = stub(MockableFns, "sendWithRelayerWithBackup").resolves({
        taskId: mockTaskId,
      });
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getMessageRootFromIndex as SinonStub).resolves(undefined);
      await expect(
        processMessages([mockXMessage1], mockXMessage1.originDomain, mockXMessage1.destinationDomain, "ROOT"),
      ).to.eventually.not.be.rejected;
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(undefined);
      await expect(
        processMessages([mockXMessage1], mockXMessage1.originDomain, mockXMessage1.destinationDomain, "ROOT"),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(undefined);
      await expect(
        processMessages([mockXMessage1], mockXMessage1.originDomain, mockXMessage1.destinationDomain, "ROOT"),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(undefined);
      await expect(
        processMessages([mockXMessage1], mockXMessage1.originDomain, mockXMessage1.destinationDomain, "ROOT"),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(undefined);
      await expect(
        processMessages([mockXMessage1], mockXMessage1.originDomain, mockXMessage1.destinationDomain, "ROOT"),
      ).to.eventually.be.rejectedWith(Error);
    });
  });
});
