import { expect, delay } from "@connext/nxtp-utils";
import * as binding from "../../../src/bindings/prices/index";

describe("Fetching Price Binding", () => {
  beforeEach(() => {});

  describe("#getPriceLoopInterval", async () => {
    expect(binding.getPriceLoopInterval()).to.be.eq(15_000);
  });

  describe("#bindContractReader", async () => {});
});
