import { expect } from "@connext/nxtp-utils";

import * as binding from "../../../src/bindings/prices";

describe("Bindings:Prices", async () => {
  describe("bindPrices", () => {
    it("happy: should collect and update token pricing info", async () => {
      await expect(binding.bindPrices()).to.be.fulfilled;
    });
  });
});
