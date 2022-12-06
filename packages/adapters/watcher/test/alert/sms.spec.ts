import { SinonStub, stub } from "sinon";

import { WatcherConfig } from "../../src/config";
import { TEST_REPORT } from "../utils";
import { alertViaSms, alertViaTelegram } from "../../src/alert";
import { expect } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: sms", () => {
  let config: WatcherConfig = {
    twilioNumber: "123324523523",
    twilioAccountSid: "test",
    twilioAuthToken: "test",
    twilioToPhoneNumbers: ["21348728349"],
  };
  beforeEach(() => {});

  describe("#alertViaSms", () => {
    beforeEach(() => {});

    it("should throw if config is invalid", async () => {
      await expect(alertViaSms(TEST_REPORT, { ...config, twilioNumber: undefined })).to.be.rejectedWith(
        "alertViaSms: Twilio config is invalid!",
      );

      await expect(alertViaSms(TEST_REPORT, { ...config, twilioAccountSid: undefined })).to.be.rejectedWith(
        "alertViaSms: Twilio config is invalid!",
      );

      await expect(alertViaSms(TEST_REPORT, { ...config, twilioAuthToken: undefined })).to.be.rejectedWith(
        "alertViaSms: Twilio config is invalid!",
      );

      await expect(alertViaSms(TEST_REPORT, { ...config, twilioToPhoneNumbers: undefined })).to.be.rejectedWith(
        "alertViaSms: Twilio config is invalid!",
      );
    });

    it("should success if config is valid", async () => {
      let twilioStub: SinonStub;
      twilioStub = stub(Mockable, "sendMessageViaTwilio").resolves();

      await expect(alertViaSms(TEST_REPORT, config)).to.not.rejected;
      expect(twilioStub.callCount).to.be.eq(1);

      twilioStub.restore();
    });
  });
});
