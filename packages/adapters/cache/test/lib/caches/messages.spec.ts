import { Logger, XMessage, expect, mkBytes32, mock } from "@connext/nxtp-utils";
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
  });
});
