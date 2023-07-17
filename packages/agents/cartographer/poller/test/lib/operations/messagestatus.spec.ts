import { SinonStub } from "sinon";
import { expect, getRandomBytes32, XTransferMessageStatus } from "@connext/nxtp-utils";

import { mockContext } from "../../globalTestHook";
import { getMessageStatus, updateMessageStatus } from "../../../src/lib/operations/messagestatus";
import { mock } from "@connext/nxtp-utils";

describe("MessageStatus operations", () => {
  describe("#updateMessageStatus", () => {
    it("should work", async () => {
      await updateMessageStatus();

      expect(mockContext.adapters.database.getPendingTransfersByMessageStatus as SinonStub).callCount(
        mockContext.domains.length,
      );

      expect(mockContext.adapters.database.saveTransfers as SinonStub).callCount(mockContext.domains.length);
    });
  });
  describe("#getMessageStatus", () => {
    it("should return xcalled", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(undefined);
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.XCalled);
    });
    it("should return processed", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(
        mock.entity.xMessage({ destination: { processed: true, returnData: getRandomBytes32() } }),
      );
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.Processed);
    });
    it("should return xcalled if root message doesn't exist", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(
        mock.entity.xMessage({ destination: { processed: false, returnData: getRandomBytes32() } }),
      );
      (mockContext.adapters.database.getMessageRootStatusFromIndex as SinonStub).resolves({
        processedCount: 0,
        unprocessedCount: 0,
        aggregatedCount: 0,
        lastAggregatedRoot: undefined,
      });
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.XCalled);
    });
    it("should return spokeRootSent if no root messages processed", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(
        mock.entity.xMessage({ destination: { processed: false, returnData: getRandomBytes32() } }),
      );
      (mockContext.adapters.database.getMessageRootStatusFromIndex as SinonStub).resolves({
        processedCount: 0,
        unprocessedCount: 1,
        aggregatedCount: 0,
        lastAggregatedRoot: undefined,
      });
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.SpokeRootSent);
    });

    it("should return spokeRootArrivedOnHub if there's a root message processed and no aggregate root exists", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(
        mock.entity.xMessage({ destination: { processed: false, returnData: getRandomBytes32() } }),
      );
      (mockContext.adapters.database.getMessageRootStatusFromIndex as SinonStub).resolves({
        processedCount: 1,
        unprocessedCount: 5,
        aggregatedCount: 0,
        lastAggregatedRoot: undefined,
      });
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.SpokeRootArrivedOnHub);
    });

    it("should return aggregateRootPropagated if an aggregated root exists", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(
        mock.entity.xMessage({ destination: { processed: false, returnData: getRandomBytes32() } }),
      );
      (mockContext.adapters.database.getMessageRootStatusFromIndex as SinonStub).resolves({
        processedCount: 1,
        unprocessedCount: 5,
        aggregatedCount: 1,
        lastAggregatedRoot: mock.entity.aggregatedRoot(),
      });
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.AggregateRootPropagated);
    });

    it("should return aggregatedRootArrivedOnSpokeDomain if an aggregated root exists on the spoke domain", async () => {
      (mockContext.adapters.database.getMessageByLeaf as SinonStub).resolves(
        mock.entity.xMessage({ destination: { processed: false, returnData: getRandomBytes32() } }),
      );
      (mockContext.adapters.database.getMessageRootStatusFromIndex as SinonStub).resolves({
        processedCount: 1,
        unprocessedCount: 5,
        aggregatedCount: 1,
        lastAggregatedRoot: mock.entity.aggregatedRoot(),
      });
      (mockContext.adapters.database.getAggregateRootByRootAndDomain as SinonStub).resolves(
        mock.entity.aggregatedRoot(),
      );
      const xTransfer = mock.entity.xtransfer({ messageHash: undefined });
      const messageStatus = await getMessageStatus(xTransfer);
      expect(messageStatus).to.be.eq(XTransferMessageStatus.AggregatedRootArrivedOnSpokeDomain);
    });
  });
});
