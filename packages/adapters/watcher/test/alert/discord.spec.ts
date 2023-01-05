import { SinonStub, stub } from "sinon";

import { TEST_REPORT } from "../utils";
import { alertViaDiscord } from "../../src/alert";
import * as Mockable from "../../src/mockable";

import { expect } from "@connext/nxtp-utils";

describe("Watcher Adapter: discord", () => {
  beforeEach(() => {});

  const mockHookUrl = "http://discord.com/api/webhooks/test";

  let axiosPostStub: SinonStub;

  describe("#alertViaDiscord", () => {
    beforeEach(() => {
      axiosPostStub = stub(Mockable, "axiosPost");
    });

    it("should success if hook url is valid", async () => {
      axiosPostStub.resolves({ code: 200, data: "ok" });

      await expect(alertViaDiscord(TEST_REPORT, mockHookUrl)).to.not.rejected;
      expect(axiosPostStub.callCount).to.be.eq(1);
      const expectedParams = {
        content: `Watcher ${TEST_REPORT.event} Alert!!!!`,
        embeds: [
          {
            timestamp: new Date(TEST_REPORT.timestamp).toISOString(),
            title: "Reason",
            description: "",
            fields: [
              {
                name: "Type",
                value: TEST_REPORT.event,
              },
              {
                name: "Reason",
                value: TEST_REPORT.reason,
              },
              {
                name: "Domains",
                value: TEST_REPORT.domains.join("\n"),
              },
              {
                name: "Errors",
                value: TEST_REPORT.errors.join("\n"),
              },
              {
                name: "Relevant Transactions",
                value: TEST_REPORT.relevantTransactions.join("\n"),
              },
            ],
            url: "",
          },
        ],
      };
      expect(axiosPostStub.calledWith([mockHookUrl, JSON.parse(JSON.stringify(expectedParams))]));
    });

    it("should work if the report is missing fields", async () => {
      axiosPostStub.resolves({ code: 200, data: "ok" });

      const report = {
        ...TEST_REPORT,
        domains: [],
        reason: undefined,
        errors: [],
        relevantTransactions: [],
        rpcs: [],
      };

      await expect(alertViaDiscord(TEST_REPORT, mockHookUrl)).to.not.rejected;
      expect(axiosPostStub.callCount).to.be.eq(1);
      const expectedParams = {
        content: `Watcher ${TEST_REPORT.event} Alert!!!!`,
        embeds: [
          {
            timestamp: new Date(TEST_REPORT.timestamp).toISOString(),
            title: "Reason",
            description: "",
            fields: [
              {
                name: "Type",
                value: TEST_REPORT.event,
              },
              {
                name: "Reason",
                value: "No reason",
              },
              {
                name: "Domains",
                value: "None",
              },
              {
                name: "Errors",
                value: "None",
              },
              {
                name: "Relevant Transactions",
                value: "None",
              },
              {
                name: "Rpcs",
                value: "None",
              },
            ],
            url: "",
          },
        ],
      };
      expect(axiosPostStub.calledWith([mockHookUrl, JSON.parse(JSON.stringify(expectedParams))]));
    });

    afterEach(() => {
      axiosPostStub.restore();
    });
  });
});
