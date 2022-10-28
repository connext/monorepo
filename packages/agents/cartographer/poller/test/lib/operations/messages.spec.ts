import { SinonStub } from "sinon";
import { expect, mock } from "@connext/nxtp-utils";

import { mockConnectorMeta, mockOriginMessageSubgraphResponse, mockRootSubgraphResponse } from "../../mock";
import { mockContext } from "../../globalTestHook";
import {
  retrieveOriginMessages,
  retrieveProcessedRootMessages,
  retrieveSentRootMessages,
  updateMessages,
} from "../../../src/lib/operations/messages";

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
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledWithExactly(res);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[0],
        mockOriginMessageSubgraphResponse[1].index,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "message_" + mockContext.domains[1],
        mockOriginMessageSubgraphResponse[1].index,
      );
    });
  });

  describe("#updateMessages", () => {
    it.only("should work", async () => {
      (mockContext.adapters.database.getUnProcessedMessages as SinonStub).resolves([
        mock.entity.xMessage(),
        mock.entity.xMessage(),
      ]);
      await updateMessages();
      expect(mockContext.adapters.database.saveMessages as SinonStub).to.be.calledOnce;
    });
  });

  describe("#retrieveSentRootMessages", () => {
    it("should work", async () => {
      await retrieveSentRootMessages();
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveSentRootMessages as SinonStub).to.be.calledWithExactly(
        mockRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledTwice;
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
        Math.max(...mockRootSubgraphResponse.map((message) => message.blockNumber)),
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "sent_root_message_" + mockContext.domains[0],
        Math.max(...mockRootSubgraphResponse.map((message) => message.blockNumber)),
      );
    });
  });

  describe("#retrieveProcessedRootMessages", () => {
    it("should work", async () => {
      await retrieveProcessedRootMessages();
      expect(mockContext.adapters.database.saveProcessedRootMessages as SinonStub).to.be.calledOnceWithExactly(
        mockRootSubgraphResponse,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledOnceWithExactly(
        "processed_root_message_" + mockConnectorMeta[0].hubDomain,
        Math.max(...mockRootSubgraphResponse.map((message) => message.blockNumber)),
      );
    });
  });
});
