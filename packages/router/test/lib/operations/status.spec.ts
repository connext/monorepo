import { expect, createLoggingContext, mkBytes32 } from "@connext/nxtp-utils";

import { getStatus } from "../../../src/lib/operations/status";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32("0xabc"));

describe("Status Operation", () => {
  it("should work", async () => {
    const res = await getStatus(requestContext);
    expect(res).to.be.ok;
  });
});
