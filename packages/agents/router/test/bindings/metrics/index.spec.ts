import { expect } from "@connext/nxtp-utils";
import * as binding from "../../../src/bindings/metrics";
import { mock } from "../../mock";

describe("bindMetrics", async () => {
  it("happy case: should collect metrics", async () => {
    expect(await binding.bindMetrics(mock.context())).to.be.ok;
  });
});
