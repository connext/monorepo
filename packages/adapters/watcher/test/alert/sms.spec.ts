import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaSms } from "../../src/alert";
import { expect } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: sms", () => {
  let twilioNumber = "123324523523";
  let twilioAccountSid = "test";
  let twilioAuthToken = "test";
  let twilioToPhoneNumbers = ["21348728349"];

  beforeEach(() => {});

  describe("#alertViaSms", () => {
    beforeEach(() => {});

    it("should throw if config is invalid", async () => {
      await expect(
        alertViaSms(TEST_REPORT, twilioAccountSid, twilioAuthToken, undefined, twilioToPhoneNumbers),
      ).to.be.rejectedWith("alertViaSms: Twilio config is invalid!");

      await expect(
        alertViaSms(TEST_REPORT, undefined, twilioAuthToken, twilioNumber, twilioToPhoneNumbers),
      ).to.be.rejectedWith("alertViaSms: Twilio config is invalid!");

      await expect(
        alertViaSms(TEST_REPORT, twilioAccountSid, undefined, twilioNumber, twilioToPhoneNumbers),
      ).to.be.rejectedWith("alertViaSms: Twilio config is invalid!");

      await expect(alertViaSms(TEST_REPORT, twilioAccountSid, twilioAuthToken, twilioNumber, [])).to.be.rejectedWith(
        "alertViaSms: Twilio config is invalid!",
      );
    });

    it("should success if config is valid", async () => {
      let twilioStub: SinonStub;
      twilioStub = stub(Mockable, "sendMessageViaTwilio").resolves();

      await expect(alertViaSms(TEST_REPORT, twilioAccountSid, twilioAuthToken, twilioNumber, twilioToPhoneNumbers)).to
        .not.rejected;
      expect(twilioStub.callCount).to.be.eq(1);

      twilioStub.restore();
    });
  });
});
