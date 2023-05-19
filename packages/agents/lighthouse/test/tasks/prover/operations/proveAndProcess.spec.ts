import { BaseRequestContext, expect, SparseMerkleTree, createRequestContext } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { proveAndProcess, processMessages } from "../../../../src/tasks/prover/operations/proveAndProcess";
import * as ProveAndProcessFns from "../../../../src/tasks/prover/operations/proveAndProcess";
import { mockXMessage1, mockXMessage2, mockRootMessage, mockReceivedRoot } from "../../../mock";
import { proverCtxMock } from "../../../globalTestHook";
import { NoDestinationDomainForProof, NoMessageProof, NoMessageRootProof } from "../../../../src/errors";

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
        messageRootIndex: number,
        targetAggregateRoot: string,
        spokeSMT: SparseMerkleTree,
        hubSMT: SparseMerkleTree,
        _requestContext: BaseRequestContext,
      ],
      Promise<void>
    >;

    beforeEach(() => {
      processMessagesStub = stub(ProveAndProcessFns, "processMessages").resolves();
    });

    it("should process messages", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([mockReceivedRoot]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
      // expect(processMessagesStub).to.be.calledWithExactly(mockXMessage1);
    });

    it("should catch error if no received aggregate root", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
    });

    it("should catch error if no target message root", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves(["0x"]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
    });

    it("should catch error if no message root count", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves(["0x"]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
    });

    it("should catch error if no message root index", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves(["0x"]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(10);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
    });

    it("should catch error if no aggregate root", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves(["0x"]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(10);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
    });

    it("should catch error if no aggregate root count", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves(["0x"]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(10);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves("0x");
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getUnProcessedMessagesByIndex as SinonStub)
        .onFirstCall()
        .resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
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
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          "1234",
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.not.be.rejected;
    });

    it("should process a message", async () => {
      await processMessages(
        [mockXMessage1],
        mockXMessage1.originDomain,
        mockXMessage1.destinationDomain,
        "ROOT",
        0,
        "mockReceivedRoot",
        SparseMerkleTree.prototype,
        SparseMerkleTree.prototype,
        requestContext,
      );
      // expect(sendWithRelayerWithBackupStub).to.have.been.calledOnce;
    });
  });

  describe("#processMessages with exceptions", () => {
    let getProofStub: SinonStub;
    let verifyStub: SinonStub;
    beforeEach(() => {
      (proverCtxMock.adapters.database.getMessageRootAggregatedFromIndex as SinonStub).resolves({
        ...mockRootMessage,
        root: mockXMessage1.origin.root,
      });
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      getProofStub = stub(SparseMerkleTree.prototype, "getProof");
      verifyStub = stub(SparseMerkleTree.prototype, "verify");
    });

    it("should be fulfilled", async () => {
      getProofStub.resolves([]);
      (proverCtxMock.adapters.database.getMessageRootAggregatedFromIndex as SinonStub).resolves();
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.fulfilled;
    });

    it("should catch error with no destination domain proof", async () => {
      getProofStub.resolves([]);
      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          "100100100",
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(NoDestinationDomainForProof);
    });

    it("should catch error with no message proof", async () => {
      getProofStub.resolves(undefined);

      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);

      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(NoMessageProof);
    });

    it("should do nothing if no verified proofs", async () => {
      getProofStub.onFirstCall().resolves(["0x"]);
      getProofStub.onSecondCall().resolves(undefined);
      verifyStub.onFirstCall().returns({ verified: false });

      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);

      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.fulfilled;
    });

    it("should catch error with no message proof", async () => {
      getProofStub.onFirstCall().resolves(["0x"]);
      getProofStub.onSecondCall().resolves(undefined);
      verifyStub.onFirstCall().returns({ verified: true });

      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);

      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(NoMessageRootProof);
    });

    it("should fail on message root verification", async () => {
      getProofStub.onFirstCall().resolves(["0x"]);
      getProofStub.onSecondCall().resolves(["0x"]);
      verifyStub.onFirstCall().returns({ verified: true });
      verifyStub.onSecondCall().returns({ verified: false });

      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);

      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.fulfilled;
    });

    it("should succeed on message root verification", async () => {
      getProofStub.onFirstCall().resolves(["0x"]);
      getProofStub.onSecondCall().resolves(["0x"]);
      verifyStub.onFirstCall().returns({ verified: true });
      verifyStub.onSecondCall().returns({ verified: true });

      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);

      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.fulfilled;
    });

    it("should fail on sending encoded data", async () => {
      getProofStub.onFirstCall().resolves(["0x"]);
      getProofStub.onSecondCall().resolves(["0x"]);
      verifyStub.onFirstCall().returns({ verified: true });
      verifyStub.onSecondCall().returns({ verified: true });

      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);
      (proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub).onSecondCall().throws("error");

      await expect(
        processMessages(
          [mockXMessage1],
          mockXMessage1.originDomain,
          mockXMessage1.destinationDomain,
          "ROOT",
          0,
          "mockReceivedRoot",
          SparseMerkleTree.prototype,
          SparseMerkleTree.prototype,
          requestContext,
        ),
      ).to.eventually.be.fulfilled;
    });
  });
});
