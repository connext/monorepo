import { SinonStub } from "sinon";
import { expect, mock } from "@connext/nxtp-utils";
import {
  mockOriginMessageSubgraphResponse,
  mockRootSubgraphResponse,
  mockConnectorMeta,
} from "@connext/nxtp-adapters-subgraph/test/mock";

import { mockContext } from "../../globalTestHook";
import {
  retrieveOriginMessages,
  retrieveProcessedRootMessages,
  retrieveSentRootMessages,
  updateMessages,
} from "../../../src/lib/operations";

describe("Message operations", () => {
  describe("#retrieveOriginMessages", () => {
    it("should work", async () => {
      const res = mockOriginMessageSubgraphResponse.map((_message) => {
        return {
          leaf: _message.leaf,
          originDomain: _message.domain,
          destinationDomain: _message.destinationDomain,
          transferId: _message.transferId,
          origin: { index: _message.index, root: _message.root, message: _message.message },
        };
      });
      await retrieveOriginMessages();
      expect(mockContext.adapters.database.saveMessages as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledWithExactly(res);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[0],
        mockOriginMessageSubgraphResponse[1].index,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[1],
        mockOriginMessageSubgraphResponse[1].index,
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getOriginMessagesByDomain as SinonStub).resolves([]);
      await retrieveOriginMessages();
      expect(mockContext.adapters.database.saveMessages as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledWithExactly([]);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[0],
        0,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[1],
        0,
      );
    });
  });

  describe("#updateMessages", () => {
    it("should work", async () => {
      (mockContext.adapters.database.getUnProcessedMessages as SinonStub).resolves([
        mock.entity.xMessage(),
        mock.entity.xMessage(),
      ]);
      await updateMessages();
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledOnceWithExactly([]);
    });
    it("should work", async () => {
      const pendingMessage1 = mock.entity.xMessage({ leaf: "0x1" });
      const pendingMessage2 = mock.entity.xMessage({ leaf: "0x2" });
      (mockContext.adapters.database.getUnProcessedMessages as SinonStub).resolves([pendingMessage1, pendingMessage2]);

      const dstMessage1 = mock.entity.destinationMessage({ leaf: "0x1" });
      const dstMessage2 = mock.entity.destinationMessage({ leaf: "0x2" });
      (mockContext.adapters.subgraph.getDestinationMessagesByDomainAndLeaf as SinonStub).resolves([
        dstMessage1,
        dstMessage2,
      ]);
      await updateMessages();
      const response = [
        {
          ...pendingMessage1,
          destination: {
            processed: dstMessage1.processed,
            returnData: dstMessage1.returnData,
          },
        },
        {
          ...pendingMessage2,
          destination: {
            processed: dstMessage2.processed,
            returnData: dstMessage2.returnData,
          },
        },
      ];
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledOnceWithExactly(response);
    });
    it("initial conditions", async () => {
      (mockContext.adapters.database.getUnProcessedMessages as SinonStub).resolves([]);
      await updateMessages();
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledOnceWithExactly([]);
    });
  });

  describe("#retrieveSentRootMessages", () => {
    it("should work", async () => {
      await retrieveSentRootMessages();
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).to.be.calledWithExactly(
        mockRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
        Math.max(...mockRootSubgraphResponse.map((message) => message.blockNumber)),
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
        Math.max(...mockRootSubgraphResponse.map((message) => message.blockNumber)),
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getSentRootMessagesByDomain as SinonStub).resolves([]);
      await retrieveSentRootMessages();
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).to.be.calledWithExactly([]);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(0);
    });
    it("initial conditions", async () => {
      const mockRootSubgraphResponse = [mock.entity.rootMessage({ blockNumber: undefined })];

      (mockContext.adapters.subgraph.getSentRootMessagesByDomain as SinonStub).resolves(mockRootSubgraphResponse);
      await retrieveSentRootMessages();
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).to.be.calledWithExactly(
        mockRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(0);
    });
  });

  describe("#retrieveProcessedRootMessages", () => {
    it("should work", async () => {
      await retrieveProcessedRootMessages();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "processed_root_message_" + mockConnectorMeta[0].hubDomain,
      );

      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).to.be.calledWithExactly(
        mockRootSubgraphResponse,
      );

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "processed_root_message_" + mockConnectorMeta[0].hubDomain,
        Math.max(...mockRootSubgraphResponse.map((message) => message.blockNumber)),
      );
    });
    it("initial conditions", async () => {
      (mockContext.adapters.subgraph.getProcessedRootMessagesByDomain as SinonStub).resolves([]);
      await retrieveProcessedRootMessages();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "processed_root_message_" + mockConnectorMeta[0].hubDomain,
      );

      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).to.be.calledWithExactly([]);

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(0);
    });
    it("initial conditions", async () => {
      const mockRootSubgraphResponse = [mock.entity.rootMessage({ blockNumber: undefined })];
      (mockContext.adapters.subgraph.getProcessedRootMessagesByDomain as SinonStub).resolves(mockRootSubgraphResponse);

      await retrieveProcessedRootMessages();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "processed_root_message_" + mockConnectorMeta[0].hubDomain,
      );

      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).callCount(mockConnectorMeta.length);
      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).to.be.calledWithExactly(
        mockRootSubgraphResponse,
      );

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(0);
    });
  });
});
