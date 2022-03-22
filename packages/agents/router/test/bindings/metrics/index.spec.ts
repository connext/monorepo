import { expect } from "@connext/nxtp-utils";
import * as binding from "../../../src/bindings/metrics";

describe("bindMetrics", async () => {
  it("happy case: should collect metrics", async () => {
    expect(await binding.bindMetrics()).to.be.eq(undefined);
  });
});
