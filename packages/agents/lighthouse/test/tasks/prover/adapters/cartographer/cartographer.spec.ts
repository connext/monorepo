import { expect } from "@connext/nxtp-utils";

import { getUnProcessedMessages } from "../../../../../src/tasks/prover/adapters/cartographer/cartographer";
import { ApiRequestFailed } from "../../../../../src/errors";
import { axiosGetStub, mockAxiosErrorResponse } from "../../../../globalTestHook";

describe("Adapters: Cartographer", () => {
  describe("#getUnProcessedMessages", () => {
    it("should error if cartographer returns error", async () => {
      axiosGetStub.resolves(mockAxiosErrorResponse);
      await expect(getUnProcessedMessages()).to.be.rejectedWith(ApiRequestFailed);
    });
  });

  it("should work", async () => {
    const unprocessed = await getUnProcessedMessages();
    expect(unprocessed).to.deep.eq([]);
  });
});
