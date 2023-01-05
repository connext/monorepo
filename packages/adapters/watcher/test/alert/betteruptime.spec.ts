import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaBetterUptime } from "../../src/alert";
import { expect } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: betteruptime", () => {
  let apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  let email = "test@test.com";
  beforeEach(() => {});

  describe("#alertViaBetterUptime", () => {
    beforeEach(() => {});

    it("should success if config is valid", async () => {
      let triggerStub: SinonStub;
      triggerStub = stub(Mockable, "axiosPost").resolves();

      await expect(alertViaBetterUptime(TEST_REPORT, apiKey, email)).to.not.rejected;
      expect(triggerStub.callCount).to.be.eq(1);

      triggerStub.restore();
    });
  });
});
