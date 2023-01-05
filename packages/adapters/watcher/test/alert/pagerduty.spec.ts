import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaPagerDuty } from "../../src/alert";
import { expect, mkHash } from "@connext/nxtp-utils";
import * as Mockable from "../../src/mockable";

describe("Watcher Adapter: pagerDuty", () => {
  let pagerDutyRoutingKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  beforeEach(() => {});

  describe("#alertViaPagerDuty", () => {
    let triggerStub: SinonStub;
    beforeEach(() => {
      triggerStub = stub(Mockable, "pagerDutyTrigger");
    });

    afterEach(() => triggerStub.restore())

    it("should throw if routing key is less than 32", async () => {
      await expect(alertViaPagerDuty(TEST_REPORT, "xxx")).to.be.rejectedWith(
        "alertViaPagerDuty: pagerDuty Routing Key is invalid!",
      );
    });

    it("should success if config is valid", async () => {
      triggerStub.resolves();

      await expect(alertViaPagerDuty(TEST_REPORT, pagerDutyRoutingKey)).to.not.rejected;
      expect(triggerStub.callCount).to.be.eq(1);
    });

    it("should handle transactions in report", async () => {
      TEST_REPORT.relevantTransactions = [{ hash: mkHash("0x1") }] as any;
      triggerStub.resolves();

      await expect(alertViaPagerDuty(TEST_REPORT, pagerDutyRoutingKey)).to.not.rejected;
      expect(triggerStub.callCount).to.be.eq(1);
    });
  });
});
