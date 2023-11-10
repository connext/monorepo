import { expect, createRequestContext, SparseMerkleTree, mkBytes32, XMessage } from "@connext/nxtp-utils";
import { SinonStub, stub, restore, reset } from "sinon";

import { mock, mockXMessage1, mockXMessage2 } from "../../../mock";
import { proverCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import { EmptyMessageProofs, NoDestinationDomainForProof, NoMessageProof } from "../../../../src/errors";
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
    let getMessageStub: SinonStub;
    let addTaskPendingStub: SinonStub;
    let setStatusStub: SinonStub;
    let encodeFunctionDataStubMT: SinonStub;
    let encodeFunctionDataStubSC: SinonStub;

    beforeEach(() => {
      getProofStub = stub(SparseMerkleTree.prototype, "getProof");
      verifyStub = stub(SparseMerkleTree.prototype, "verify");
      encodeFunctionDataStubMT = proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub;
      encodeFunctionDataStubSC = proverCtxMock.adapters.contracts.spokeConnector.encodeFunctionData as SinonStub;
      getMessageStub = proverCtxMock.adapters.cache.messages.getMessage as SinonStub;
      addTaskPendingStub = proverCtxMock.adapters.cache.messages.addTaskPending as SinonStub;
      setStatusStub = proverCtxMock.adapters.cache.messages.setStatus as SinonStub;
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("happy case should work", async () => {
      getProofStub.returns(["0x1"]);
      verifyStub.returns({ calculated: "0x", verified: true });
      getMessageStub.resolves(mockXMessage1);
      addTaskPendingStub.resolves();
      setStatusStub.resolves();
      encodeFunctionDataStubSC.returns("0x");
      encodeFunctionDataStubMT.returns("0x");
      sendWithRelayerWithBackupStub.resolves({
        taskId: "0x123",
      });

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
      getProofStub.returns(["0x1"]);
      getMessageStub.resolves(mockXMessage1);
      addTaskPendingStub.resolves();
      setStatusStub.resolves();
      verifyStub.returns({ verified: true });
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
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
      getProofStub.returns(undefined);
      verifyStub.returns({ verified: true });
      getMessageStub.resolves(mockXMessage1);
      addTaskPendingStub.resolves();
      setStatusStub.resolves();
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.decodeFunctionResult as SinonStub).returns([0]);
      await expect(processMessages(mockBrokerMesage, requestContext)).to.eventually.be.rejectedWith(NoMessageProof);
    });
    it("should do nothing if empty message proof", async () => {
      getProofStub.returns(["0x"]);
      verifyStub.returns({ verified: false });
      getMessageStub.resolves(mockXMessage1);
      addTaskPendingStub.resolves();
      setStatusStub.resolves();
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      await expect(processMessages(mockBrokerMesage, requestContext)).to.eventually.be.rejectedWith(EmptyMessageProofs);
    });
    it("should do nothing if already processed", async () => {
      getProofStub.returns(["0x"]);
      verifyStub.returns({ verified: false });
      getMessageStub.resolves(mockXMessage1);
      addTaskPendingStub.resolves();
      setStatusStub.resolves();
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.decodeFunctionResult as SinonStub).returns([2]);
      await expect(processMessages(mockBrokerMesage, requestContext)).to.eventually.be.rejectedWith(EmptyMessageProofs);
    });
    it("should do nothing if status unused", async () => {
      getProofStub.returns(["0x"]);
      verifyStub.returns({ verified: false });
      getMessageStub.resolves(mockXMessage1);
      addTaskPendingStub.resolves();
      setStatusStub.resolves();
      (proverCtxMock.adapters.contracts.merkleTreeManager.encodeFunctionData as SinonStub).returns("0x");
      (proverCtxMock.adapters.contracts.merkleTreeManager.decodeFunctionResult as SinonStub).returns([1]);
      await expect(processMessages(mockBrokerMesage, requestContext)).to.eventually.be.rejectedWith(EmptyMessageProofs);
    });
  });
});
