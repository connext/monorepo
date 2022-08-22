import { delay, expect } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { bindCartographer } from "../../../../src/tasks/executor/bindings";

import * as CartographerFns from "../../../../src/tasks/executor/operations/cartographer";
import { mockExecutorContext } from "../../../globalTestHook";

describe("Bindings:Cartographer", () => {
  let pollCartographerStub: SinonStub;
  beforeEach(() => {
    pollCartographerStub = stub(CartographerFns, "pollCartographer");
  });
  describe("#bindCartographer", () => {
    it("should catch the error if pollCartographer throws", async () => {
      pollCartographerStub.throws(new Error(`Running a cartographer failed!`));
      mockExecutorContext.config.mode.cleanup = false;
      await bindCartographer(10);
      await delay(20);
      mockExecutorContext.config.mode.cleanup = true;
      expect(pollCartographerStub.callCount).to.be.gte(1);
    });
    it("happy: should start an interval loop that calls polling fn", async () => {
      pollCartographerStub.resolves();
      mockExecutorContext.config.mode.cleanup = false;
      await bindCartographer(10);
      await delay(20);
      mockExecutorContext.config.mode.cleanup = true;
      expect(pollCartographerStub.callCount).to.be.gte(1);
    });
  });
});
