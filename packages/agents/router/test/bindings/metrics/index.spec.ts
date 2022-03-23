import { expect } from "@connext/nxtp-utils";
import * as binding from "../../../src/bindings/metrics";

describe("Bindings:Metrics", async () => {
  describe("bindMetrics", () => {
    it("happy: should collect metrics", async () => {
      expect(await binding.bindMetrics()).to.be.fulfilled;
    });
  });
});
