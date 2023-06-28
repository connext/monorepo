import { ExecStatus, Logger, XMessage, expect, mkBytes32, mock } from "@connext/nxtp-utils";
import { MessagesCache } from "../../../src/index";

const logger = new Logger({ level: "debug" });
let messagesCache: MessagesCache;
const originDomain = "1111";
const destinationDomain = "2222";
const mockXMessages: XMessage[] = [
  { ...mock.entity.xMessage(), originDomain, destinationDomain, leaf: mkBytes32("0x111") },
  { ...mock.entity.xMessage(), originDomain, destinationDomain, leaf: mkBytes32("0x222") },
];

describe("MessagesCache", () => {
  beforeEach(async () => {
    messagesCache = new MessagesCache({ host: "mock", port: 1234, mock: true, logger });
  });

  describe("#message", () => {
    beforeEach(async () => {
      await messagesCache.clear();
    });

    it("should store xMessages", async () => {
      await messagesCache.storeMessages(mockXMessages);
      const pendingLeaves = await messagesCache.getPending(originDomain, destinationDomain);
      expect(pendingLeaves).to.be.deep.eq(mockXMessages.map((it) => it.leaf));

      const message1 = await messagesCache.getMessage(mockXMessages[0].leaf);
      expect(message1?.data).to.be.deep.eq(mockXMessages[0]);
      const message2 = await messagesCache.getMessage(mockXMessages[1].leaf);
      expect(message2?.data).to.be.deep.eq(mockXMessages[1]);
    });

    it("should increase attempt value", async () => {
      await messagesCache.storeMessages(mockXMessages);
      await messagesCache.increaseAttempt(mockXMessages[0].leaf);
      const message1 = await messagesCache.getMessage(mockXMessages[0].leaf);
      expect(message1?.data).to.be.deep.eq(mockXMessages[0]);
      expect(message1?.attempt).to.be.deep.eq(1);
    });

    it("should remove pending", async () => {
      await messagesCache.storeMessages(mockXMessages);
      let pendingLeaves = await messagesCache.getPending(originDomain, destinationDomain);
      expect(pendingLeaves).to.be.deep.eq(mockXMessages.map((it) => it.leaf));
      await messagesCache.removePending(originDomain, destinationDomain, [pendingLeaves[0]]);
      pendingLeaves = await messagesCache.getPending(originDomain, destinationDomain);
      expect(pendingLeaves.length).to.be.eq(1);

      const message1 = await messagesCache.getMessage(mockXMessages[0].leaf);
      expect(message1).to.be.undefined;
      const message2 = await messagesCache.getMessage(mockXMessages[1].leaf);
      expect(message2?.data).to.be.deep.eq(mockXMessages[1]);
    });

    it("should get leaf if exists", async () => {
      const leaf = "0x1a1";
      const index = 1;
      await messagesCache.putNode("1111", index, leaf);
      const result = await messagesCache.getNode("1111", index);
      expect(result).to.be.equal(leaf);
    });
    it("should del leaf if exists", async () => {
      const leaf = "0x1a1";
      const index = 1;
      await messagesCache.putNode("1111", index, leaf);
      await messagesCache.delNode("1111", index);
      const result = await messagesCache.getNode("1111", index);
      expect(result).to.be.equal(undefined);
    });

    it("should get undefined if not exist", async () => {
      const result = await messagesCache.getNode("1111", 1);
      expect(result).to.be.equal(undefined);
    });
    it("should get nodes if exists", async () => {
      const leafs = ["0x1a1", "0x1a2", "0x1a3"];
      const start = 1;
      const end = 10;
      await messagesCache.putNodes("1111", start, end, leafs);
      const result = await messagesCache.getNodes("1111", start, end);
      expect(result?.length).to.be.equal(leafs.length);
      expect(result![0]).to.be.equal(leafs[0]);
      expect(result![1]).to.be.equal(leafs[1]);
      expect(result![2]).to.be.equal(leafs[2]);
    });

    it("should del nodes if exists", async () => {
      const leafs = ["0x1a1", "0x1a2", "0x1a3"];
      const start = 1;
      const end = 10;
      await messagesCache.putNodes("1111", start, end, leafs);
      await messagesCache.delNodes("1111", start, end);
      const result = await messagesCache.getNodes("1111", start, end);
      expect(result?.length).to.be.equal(undefined);
    });

    it("should get undefined if not exist", async () => {
      const result = await messagesCache.getNodes("1111", 1, 10);
      expect(result).to.be.equal(undefined);
    });

    it("should get root if exists", async () => {
      const root = "0x1a1";
      const path = "000111000110";
      await messagesCache.putRoot("1111", path, root);
      const result = await messagesCache.getRoot("1111", path);
      expect(result).to.be.equal(root);
    });

    it("should del root if exists", async () => {
      const root = "0x1a1";
      const path = "000111000110";
      await messagesCache.putRoot("1111", path, root);
      await messagesCache.delRoot("1111", path);
      const result = await messagesCache.getRoot("1111", path);
      expect(result).to.be.equal(undefined);
    });

    it("should get undefined if not exist", async () => {
      const result = await messagesCache.getRoot("1111", "");
      expect(result).to.be.equal(undefined);
    });

    it("should update status", async () => {
      await messagesCache.storeMessages(mockXMessages);
      const pendingLeaves = await messagesCache.getPending(originDomain, destinationDomain);
      expect(pendingLeaves).to.be.deep.eq(mockXMessages.map((it) => it.leaf));

      let message1 = await messagesCache.getMessage(mockXMessages[0].leaf);
      expect(message1?.data).to.be.deep.eq(mockXMessages[0]);
      expect(message1?.status).to.be.deep.eq(ExecStatus.None);

      await messagesCache.setStatus([
        { leaf: mockXMessages[0].leaf, status: ExecStatus.Enqueued },
        { leaf: mockXMessages[1].leaf, status: ExecStatus.Completed },
      ]);
      message1 = await messagesCache.getMessage(mockXMessages[0].leaf);
      expect(message1?.status).to.be.deep.eq(ExecStatus.Enqueued);
      const message2 = await messagesCache.getMessage(mockXMessages[1].leaf);
      expect(message2?.status).to.be.deep.eq(ExecStatus.Completed);
    });
  });

  describe("#nonce", () => {
    beforeEach(async () => {
      await messagesCache.clear();
    });
    it("should get default nonce if none exists", async () => {
      const latestNonce = await messagesCache.getNonce("1111");
      expect(latestNonce).to.be.equal(0);
    });

    it("should get domain's latest nonce according to the cache", async () => {
      await messagesCache.setNonce("1111", 100);
      const latestNonce = await messagesCache.getNonce("1111");
      expect(latestNonce).to.be.equal(100);
    });
  });
});
