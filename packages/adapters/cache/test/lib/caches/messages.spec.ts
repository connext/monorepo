import { Logger, expect } from "@connext/nxtp-utils";
import { MessagesCache } from "../../../src/index";

const logger = new Logger({ level: "debug" });
let messagesCache: MessagesCache;

describe("MessagesCache", () => {
  beforeEach(async () => {
    messagesCache = new MessagesCache({ host: "mock", port: 1234, mock: true, logger });
  });

  describe("#nonce", () => {
    it("should get default nonce if none exists", async () => {
      const latestNonce = await messagesCache.getNonce("1111", "2222");
      expect(latestNonce).to.be.equal(0);
    });

    it("should get domain's latest nonce according to the cache", async () => {
      await messagesCache.setNonce("1111", "2222", 100);
      const latestNonce = await messagesCache.getNonce("1111", "2222");
      expect(latestNonce).to.be.equal(100);
    });
  });
});
