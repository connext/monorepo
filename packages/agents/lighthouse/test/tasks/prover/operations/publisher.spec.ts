import { expect, createRequestContext, mkBytes32 } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import {
  enqueue,
  prefetch,
  createBrokerMessage,
  getUnProcessedMessagesByIndex,
} from "../../../../src/tasks/prover/operations/publisher";
import * as PublisherFns from "../../../../src/tasks/prover/operations/publisher";
import { mockXMessage1, mockXMessage2, mockRootMessage, mockReceivedRoot } from "../../../mock";
import { proverCtxMock } from "../../../globalTestHook";
import { NoDestinationDomainForProof } from "../../../../src/errors";
import { BrokerMessage } from "../../../../src/tasks/prover/operations/types";

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
describe("Operations: Publisher", () => {
  describe("#prefetch", () => {
    it("should prefetch messages", async () => {
      (proverCtxMock.adapters.database.getUnProcessedMessages as SinonStub).resolves([mockXMessage1, mockXMessage2]);
      (proverCtxMock.adapters.cache.messages.getNonce as SinonStub).resolves(100);
      (proverCtxMock.adapters.cache.messages.setNonce as SinonStub).resolves();
      (proverCtxMock.adapters.cache.messages.getPendingTasks as SinonStub).resolves([]);
      await prefetch();
    });
  });
  describe("#getUnProcessedMessagesByIndex", () => {
    it("should get unprocessed messages from the cache", async () => {
      (proverCtxMock.adapters.database.getUnProcessedMessages as SinonStub).resolves([mockXMessage1, mockXMessage2]);
      (proverCtxMock.adapters.cache.messages.getPending as SinonStub).resolves([
        mockXMessage1.leaf,
        mockXMessage2.leaf,
      ]);
      (proverCtxMock.adapters.cache.messages.getMessage as SinonStub).resolves(mockXMessage1);
      await getUnProcessedMessagesByIndex(mockXMessage1.originDomain, mockXMessage1.destinationDomain, 100);
    });
  });
  describe("#enqueue", () => {
    let createBrokerMessageStub: SinonStub;

    beforeEach(() => {
      createBrokerMessageStub = stub(PublisherFns, "createBrokerMessage").resolves();
      stub(PublisherFns, "getUnProcessedMessagesByIndex").resolves([mockXMessage1, mockXMessage2]);
    });

    it("should enqueue a broker messages", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([mockReceivedRoot]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(1);
      (proverCtxMock.adapters.cache.messages.getNonce as SinonStub).resolves(100);
      (proverCtxMock.adapters.cache.messages.setNonce as SinonStub).resolves();
      createBrokerMessageStub.resolves(mockBrokerMesage);
      await enqueue();
    });
    it("should catch error if no received aggregate root", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(1);
      createBrokerMessageStub.resolves(mockBrokerMesage);
      await enqueue();
    });
    it("should catch error if no target message root", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([mockReceivedRoot]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(1);
      await enqueue();
    });
    it("should catch error if no message root count", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([mockReceivedRoot]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(1);
      await enqueue();
    });
    it("should catch error if no message root index", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([mockReceivedRoot]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(undefined);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(1);
      await enqueue();
    });
    it("should catch error if no aggregate root count", async () => {
      (proverCtxMock.adapters.database.getLatestAggregateRoots as SinonStub).resolves([mockReceivedRoot]);
      (proverCtxMock.adapters.database.getLatestMessageRoot as SinonStub).resolves(mockRootMessage);
      (proverCtxMock.adapters.database.getMessageRootCount as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getMessageRootIndex as SinonStub).resolves(1);
      (proverCtxMock.adapters.database.getAggregateRootCount as SinonStub).resolves(undefined);
      await enqueue();
    });
  });
  describe("#createBrokerMessage", () => {
    it("create a broker message successfully", async () => {
      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([0]);
      const brokerMessage = await createBrokerMessage(
        mockBrokerMesage.messages,
        mockBrokerMesage.originDomain,
        mockBrokerMesage.destinationDomain,
        mockBrokerMesage.messageRoot,
        mockBrokerMesage.messageRootIndex,
        mockBrokerMesage.messageRootCount,
        mockBrokerMesage.aggregateRoot,
        mockBrokerMesage.aggregateRootCount,
        requestContext,
      );
      expect(brokerMessage).to.be.deep.eq(mockBrokerMesage);
    });
    it("should catch error if destination domain not configured", async () => {
      await expect(
        createBrokerMessage(
          mockBrokerMesage.messages,
          mockBrokerMesage.originDomain,
          "100100",
          mockBrokerMesage.messageRoot,
          mockBrokerMesage.messageRootIndex,
          mockBrokerMesage.messageRootCount,
          mockBrokerMesage.aggregateRoot,
          mockBrokerMesage.aggregateRootCount,
          requestContext,
        ),
      ).to.eventually.be.rejectedWith(NoDestinationDomainForProof);
    });
    it("return empty message if no messages to enqueue", async () => {
      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onFirstCall().resolves("0x");
      (proverCtxMock.adapters.chainreader.readTx as SinonStub).onSecondCall().resolves("0x");
      (proverCtxMock.adapters.contracts.spokeConnector.decodeFunctionResult as SinonStub).returns([2]);

      const brokerMessage = await createBrokerMessage(
        mockBrokerMesage.messages,
        mockBrokerMesage.originDomain,
        mockBrokerMesage.destinationDomain,
        mockBrokerMesage.messageRoot,
        mockBrokerMesage.messageRootIndex,
        mockBrokerMesage.messageRootCount,
        mockBrokerMesage.aggregateRoot,
        mockBrokerMesage.aggregateRootCount,
        requestContext,
      );
      expect(brokerMessage).to.be.undefined;
    });
  });
});
