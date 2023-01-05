import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaSms } from "../../src/alert";
import { expect } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: sms", () => {
  let twilioNumber = "123324523523";
  let twilioAccountSid = "test";
  let twilioAuthToken = "test";
  let twilioToPhoneNumbers = ["21348728349", "12312312"];

  beforeEach(() => {});

  describe("#alertViaSms", () => {
    beforeEach(() => {});

    it("should fail if alerting fails", async () => {
      let twilioStub: SinonStub;
      twilioStub = stub(Mockable, "sendMessageViaTwilio").rejects();

      await expect(alertViaSms(TEST_REPORT, twilioAccountSid, twilioAuthToken, twilioNumber, twilioToPhoneNumbers)).to
        .be.rejected;
      expect(twilioStub.callCount).to.be.eq(1);

      twilioStub.restore();
    });

    it("should skip invalid numbers", async () => {
      let twilioStub: SinonStub;
      twilioStub = stub(Mockable, "sendMessageViaTwilio").resolves();

      await expect(alertViaSms(TEST_REPORT, twilioAccountSid, twilioAuthToken, twilioNumber, twilioToPhoneNumbers)).to
        .not.rejected;
      expect(twilioStub.callCount).to.be.eq(twilioToPhoneNumbers.length);

      twilioStub.restore();
    });

    it("should success if config is valid", async () => {
      let twilioStub: SinonStub;
      twilioStub = stub(Mockable, "sendMessageViaTwilio").resolves();
      twilioToPhoneNumbers = ["21348728349", "123-12-3-12"];
      await expect(alertViaSms(TEST_REPORT, twilioAccountSid, twilioAuthToken, twilioNumber, twilioToPhoneNumbers)).to
        .not.rejected;
      expect(twilioStub.callCount).to.be.eq(1);

      twilioStub.restore();
    });
  });
});
