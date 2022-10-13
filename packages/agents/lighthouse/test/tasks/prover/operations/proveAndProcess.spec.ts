import { expect, SparseMerkleTree } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { proveAndProcess, processMessage } from "../../../../src/tasks/prover/operations/proveAndProcess";
import * as ProveAndProcessFns from "../../../../src/tasks/prover/operations/proveAndProcess";
import { mockXMessage1, mockXMessage2 } from "../../../mock";
import { proverCtxMock } from "../../../globalTestHook";

describe("Operations: ProveAndProcess", () => {
  describe("#proveAndProcess", () => {
    let processMessageStub: SinonStub<
      [
        message: {
          destination?: { processed: boolean; returnData: string } | undefined;
          leaf: string;
          originDomain: string;
          destinationDomain: string;
          transferId: string;
          origin: { index: number; root: string; message: string };
        },
      ],
      Promise<void>
    >;

    beforeEach(() => {
      processMessageStub = stub(ProveAndProcessFns, "processMessage").resolves();
    });

    it("should process messages", async () => {
      (proverCtxMock.adapters.database.getUnProcessedMessages as SinonStub).resolves([mockXMessage1, mockXMessage2]);
      await proveAndProcess();
      expect(processMessageStub).to.be.calledWithExactly(mockXMessage1);
      expect(processMessageStub).to.be.calledWithExactly(mockXMessage2);
    });

    it("should not process if error but still work", async () => {
      processMessageStub.onFirstCall().rejects(new Error("error"));
      await expect(proveAndProcess()).to.be.fulfilled;
    });
  });

  describe("#processMessage", () => {
    beforeEach(() => {
      (proverCtxMock.adapters.database.getMessageRootFromIndex as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      stub(SparseMerkleTree.prototype, "getProof").resolves([]);
    });

    it("should error if spoke connector not found", async () => {
      await expect(processMessage({ ...mockXMessage1, destinationDomain: "1234" })).to.be.rejected;
    });

    it("should process a message", async () => {
      await processMessage(mockXMessage1);
      expect(proverCtxMock.adapters.relayer.send).to.be.called;
    });
  });

  describe("#processMessage with exceptions", () => {
    it("should catch error", async () => {
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);

      (proverCtxMock.adapters.database.getMessageRootFromIndex as SinonStub).resolves(mockXMessage1.origin.root);
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);

      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(mockXMessage1.origin.index);
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);
      (proverCtxMock.adapters.database.getAggregateRoot as SinonStub).resolves(mockXMessage1.origin.root);
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(mockXMessage1.origin.index);
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);

      stub(SparseMerkleTree.prototype, "getProof").resolves();
      await expect(processMessage(mockXMessage1)).to.eventually.be.rejectedWith(Error);
    });
  });
});
