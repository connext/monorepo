import { expect, createRequestContext, SparseMerkleTree, mkBytes32 } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { enqueue, createBrokerMessage } from "../../../../src/tasks/prover/operations/publisher";
import * as PublisherFns from "../../../../src/tasks/prover/operations/publisher";
import { mockXMessage1, mockXMessage2, mockRootMessage, mockReceivedRoot } from "../../../mock";
import { proverCtxMock } from "../../../globalTestHook";
import { NoDestinationDomainForProof, NoMessageProof } from "../../../../src/errors";
import { BrokerMessage } from "../../../../src/tasks/prover/operations/types";
import { consume, processMessages } from "../../../../src/tasks/prover/operations";

const mockBrokerMesage: BrokerMessage = {
  messages: [mockXMessage1, mockXMessage2],
  originDomain: mockXMessage1.originDomain,
  destinationDomain: mockXMessage1.destinationDomain,
  messageRoot: mkBytes32("0x111"),
  messageRootIndex: 1,
  messageRootCount: 2,
  aggregateRoot: mkBytes32("0x222"),
  aggregateRootCount: 2,
};

const requestContext = createRequestContext("Publisher");
describe("Operations: Process", () => {
  describe("#processMessages", () => {
    let getProofStub: SinonStub;
    let verifyStub: SinonStub;
    beforeEach(() => {
      getProofStub = stub(SparseMerkleTree.prototype, "getProof");
      verifyStub = stub(SparseMerkleTree.prototype, "verify");
    });

    it("should be fulfilled", async () => {
      getProofStub.resolves(["0x1"]);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub).returns("0x");
      await processMessages(mockBrokerMesage, requestContext);
    });
    it("should catch error if no destination domain proof", async () => {
      getProofStub.resolves(["0x1"]);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub).returns("0x");
      await expect(
        processMessages({ ...mockBrokerMesage, destinationDomain: "101010" }, requestContext),
      ).to.eventually.be.rejectedWith(NoDestinationDomainForProof);
    });
    it("should catch error if no message proof", async () => {
      getProofStub.resolves(undefined);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);
      await expect(processMessages(mockBrokerMesage, requestContext)).to.eventually.be.rejectedWith(NoMessageProof);
    });
    it("should do nothing if empty message proof", async () => {
      getProofStub.resolves(["0x"]);
      verifyStub.resolves({ verified: false });
      (proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub).returns("0x");
      await processMessages(mockBrokerMesage, requestContext);
    });
  });
});
