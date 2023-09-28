import { BaseRequestContext, expect, SparseMerkleTree, createRequestContext } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { proveAndProcess, processMessages } from "../../../../src/tasks/prover/operations/proveAndProcess";
import * as ProveAndProcessFns from "../../../../src/tasks/prover/operations/proveAndProcess";
import { mockXMessage1, mockXMessage2, mockRootMessage, mockReceivedRoot } from "../../../mock";
import { proverCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";

const requestContext = createRequestContext("ProveAndProcess");
describe("Operations: ProveAndProcess", () => {
  describe("#proveAndProcess", () => {
    let processMessagesStub: SinonStub<
      [
        messages: {
          destination?: { processed: boolean; returnData: string } | undefined;
          leaf: string;
          originDomain: string;
          destinationDomain: string;
          transferId: string;
          origin: { index: number; root: string; message: string };
        }[],
        originDomain: string,
        destinationDomain: string,
        targetMessageRoot: string,
        _requestContext: BaseRequestContext,
      ],
      Promise<void>
    >;

    beforeEach(() => {
      processMessagesStub = stub(ProveAndProcessFns, "processMessages").resolves();
    });

    it("should process messages", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves(mockReceivedRoot);
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
    beforeEach(() => {
      (proverCtxMock.adapters.database.getMessageRootAggregatedFromIndex as SinonStub).resolves({
        ...mockRootMessage,
        root: mockXMessage1.origin.root,
      });
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      stub(SparseMerkleTree.prototype, "getProof").resolves([]);
    });

    it("should handle error if spoke connector not found", async () => {
      await expect(processMessages([mockXMessage1], mockXMessage1.originDomain, "1234", "ROOT", requestContext)).to
        .eventually.not.be.rejected;
    });

    it("should process a message", async () => {
      await processMessages(
        [mockXMessage1],
        mockXMessage1.originDomain,
        mockXMessage1.destinationDomain,
        "ROOT",
        requestContext,
      );
      // expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });
  });

  describe("#processMessages with exceptions", () => {
    beforeEach(() => {
      (proverCtxMock.adapters.database.getMessageRootAggregatedFromIndex as SinonStub).resolves({
        ...mockRootMessage,
        root: mockXMessage1.origin.root,
      });
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      stub(SparseMerkleTree.prototype, "getProof").resolves([]);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getMessageRootAggregatedFromIndex as SinonStub).resolves();
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          requestContext,
        ),
      ).to.eventually.not.be.rejected;
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(undefined);
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(undefined);
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(undefined);
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should catch error", async () => {
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(undefined);
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });
  });
});
