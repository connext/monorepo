import { expect } from "@connext/nxtp-utils";
import { getBidExpiry } from "../../../src/lib/helpers";

describe("getBidExpiry", () => {
  it("should work", async () => {
    const now = Date.now();
    const result = getBidExpiry(now);
    expect(result).to.be.eq(now + 300);
  });
});
