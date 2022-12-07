import { SinonStub, stub } from "sinon";

import { WatcherConfig } from "../../src/config";
import { TEST_REPORT } from "../utils";
import { alertViaTelegram } from "../../src/alert";
import * as Mockable from "../../src/mockable";

import { expect } from "@connext/nxtp-utils";

describe("Watcher Adapter: telegram", () => {
  beforeEach(() => {});

  describe("#alertViaTelegram", () => {
    beforeEach(() => {});

    it("should throw if chatId or apiKey is invalid", async () => {
      let config: WatcherConfig = {
        telegramApiKey: undefined,
        telegramChatId: "@test",
      };
      await expect(alertViaTelegram(TEST_REPORT, config)).to.be.rejectedWith(
        "alertViaTelegram: Telegram alert config is invalid!",
      );

      config = {
        telegramApiKey: "test-api-key",
        telegramChatId: undefined,
      };
      await expect(alertViaTelegram(TEST_REPORT, config)).to.be.rejectedWith(
        "alertViaTelegram: Telegram alert config is invalid!",
      );
    });

    it("should success if config is valid", async () => {
      const config: WatcherConfig = {
        telegramApiKey: "test-api-key",
        telegramChatId: "@test",
      };
      let axiosPostStub: SinonStub;
      axiosPostStub = stub(Mockable, "axiosPost").resolves({ code: 200, data: "ok" });

      await expect(alertViaTelegram(TEST_REPORT, config)).to.not.rejected;
      expect(axiosPostStub.callCount).to.be.eq(1);

      axiosPostStub.restore();
    });
  });
});
