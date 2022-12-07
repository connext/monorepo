import { SinonStub, stub } from "sinon";

import { WatcherConfig } from "../../src/config";
import { TEST_REPORT } from "../utils";
import { alertViaPagerDuty } from "../../src/alert";
import { expect } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: pagerDuty", () => {
  let config: WatcherConfig = {
    pagerDutyRoutingKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };
  beforeEach(() => {});

  describe("#alertViaPagerDuty", () => {
    beforeEach(() => {});

    it("should throw if routing key is undefined", async () => {
      await expect(alertViaPagerDuty(TEST_REPORT, { ...config, pagerDutyRoutingKey: undefined })).to.be.rejectedWith(
        "alertViaPagerDuty: pagerDuty Routing Key is invalid!",
      );
    });

    it("should throw if routing key is less than 32", async () => {
      await expect(alertViaPagerDuty(TEST_REPORT, { ...config, pagerDutyRoutingKey: "xxxx" })).to.be.rejectedWith(
        "alertViaPagerDuty: pagerDuty Routing Key is invalid!",
      );
    });

    it("should success if config is valid", async () => {
      let triggerStub: SinonStub;
      triggerStub = stub(Mockable, "pagerDutyTrigger").resolves();

      await expect(alertViaPagerDuty(TEST_REPORT, config)).to.not.rejected;
      expect(triggerStub.callCount).to.be.eq(1);

      triggerStub.restore();
    });
  });
});
