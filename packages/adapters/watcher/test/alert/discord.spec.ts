import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaDiscord } from "../../src/alert";
import * as Mockable from "../../src/mockable";

import { expect } from "@connext/nxtp-utils";

describe("Watcher Adapter: discord", () => {
  beforeEach(() => {});

  describe("#alertViaDiscord", () => {
    beforeEach(() => {});

    it("should throw if hook url is invalid", async () => {
      await expect(alertViaDiscord(TEST_REPORT, "")).to.be.rejectedWith("alertViaDiscord: invalid hook url!");
    });

    it("should success if hook url is valid", async () => {
      const mockHookUrl = "http://discord.com/api/webhooks/test";

      let axiosPostStub: SinonStub;
      axiosPostStub = stub(Mockable, "axiosPost").resolves({ code: 200, data: "ok" });

      await expect(alertViaDiscord(TEST_REPORT, mockHookUrl)).to.not.rejected;
      expect(axiosPostStub.callCount).to.be.eq(1);

      axiosPostStub.restore();
    });
  });
});
