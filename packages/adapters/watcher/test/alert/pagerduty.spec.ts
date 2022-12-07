import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaPagerDuty } from "../../src/alert";
import { expect } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: pagerDuty", () => {
  let pagerDutyRoutingKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  beforeEach(() => {});

  describe("#alertViaPagerDuty", () => {
    beforeEach(() => {});

    it("should throw if routing key is undefined", async () => {
      await expect(alertViaPagerDuty(TEST_REPORT)).to.be.rejectedWith(
        "alertViaPagerDuty: pagerDuty Routing Key is invalid!",
      );
    });

    it("should throw if routing key is less than 32", async () => {
      await expect(alertViaPagerDuty(TEST_REPORT, "xxx")).to.be.rejectedWith(
        "alertViaPagerDuty: pagerDuty Routing Key is invalid!",
      );
    });

    it("should success if config is valid", async () => {
      let triggerStub: SinonStub;
      triggerStub = stub(Mockable, "pagerDutyTrigger").resolves();

      await expect(alertViaPagerDuty(TEST_REPORT, pagerDutyRoutingKey)).to.not.rejected;
      expect(triggerStub.callCount).to.be.eq(1);

      triggerStub.restore();
    });
  });
});
