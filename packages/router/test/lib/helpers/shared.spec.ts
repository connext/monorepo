import { expect } from "@connext/nxtp-utils";
import { getNtpTimeSeconds } from "../../../src/lib/helpers";

describe("getNtpTimeSeconds", () => {
  it("should work", async () => {
    const result = await getNtpTimeSeconds();
    expect(result).to.be.eq(Math.floor(Date.now() / 1000));
  });
});
