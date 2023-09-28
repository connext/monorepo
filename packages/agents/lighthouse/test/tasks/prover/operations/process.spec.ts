import { expect, createRequestContext, SparseMerkleTree, mkBytes32, XMessage } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { mock, mockXMessage1, mockXMessage2 } from "../../../mock";
import { proverCtxMock } from "../../../globalTestHook";
import { NoDestinationDomainForProof, NoMessageProof } from "../../../../src/errors";
import { BrokerMessage } from "../../../../src/tasks/prover/operations/types";
import { processMessages } from "../../../../src/tasks/prover/operations";

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
    it("should dedup and be fulfilled", async () => {
      getProofStub.resolves(["0x1"]);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      mockBrokerMesage.messages.push(mockBrokerMesage.messages[0]);
      mockBrokerMesage.messages.push(mockBrokerMesage.messages[2]);
      const mockXMessage2: XMessage = {
        ...mock.entity.xMessage(),
        originDomain: mock.domain.B,
        destinationDomain: mock.domain.A,
        transferId: mkBytes32("0xabcdef3"),
      };
      mockXMessage2.leaf = mockBrokerMesage.messages[0].leaf;
      mockBrokerMesage.messages.push(mockXMessage2);
      await processMessages(mockBrokerMesage, requestContext);
      expect(getProofStub.callCount).to.equal(2);
    });

    it("should be fulfilled", async () => {
      getProofStub.resolves(["0x1"]);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      await processMessages(mockBrokerMesage, requestContext);
    });
    it("should catch error if no destination domain proof", async () => {
      getProofStub.resolves(["0x1"]);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      await expect(
        processMessages({ ...mockBrokerMesage, destinationDomain: "101010" }, requestContext),
      ).to.eventually.be.rejectedWith(NoDestinationDomainForProof);
    });
    it("should catch error if no message proof", async () => {
      getProofStub.resolves(undefined);
      verifyStub.resolves({ verified: true });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.decodeFunctionResult as SinonStub).returns([0]);
      await expect(processMessages(mockBrokerMesage, requestContext)).to.eventually.be.rejectedWith(NoMessageProof);
    });
    it("should do nothing if empty message proof", async () => {
      getProofStub.resolves(["0x"]);
      verifyStub.resolves({ verified: false });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      await processMessages(mockBrokerMesage, requestContext);
    });
    it("should do nothing if already processed", async () => {
      getProofStub.resolves(["0x"]);
      verifyStub.resolves({ verified: false });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.decodeFunctionResult as SinonStub).returns([2]);
      await processMessages(mockBrokerMesage, requestContext);
    });
    it("should do nothing if status unused", async () => {
      getProofStub.resolves(["0x"]);
      verifyStub.resolves({ verified: false });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.decodeFunctionResult as SinonStub).returns([1]);
      await processMessages(mockBrokerMesage, requestContext);
    });
  });
});
