import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { stubContext } from "../../mock";
import { ctxMock, getOperationsStub } from "../../globalTestHook";
import { bindCartographer } from "../../../src/bindings";

describe("Bindings:LightHouse", () => {
  let mockContext: any;
  let pollCartographerStub: SinonStub;
  beforeEach(() => {
    pollCartographerStub = stub().resolves();
    getOperationsStub.returns({
      pollCartographer: pollCartographerStub,
    });
    mockContext = stubContext();
  });
  describe("#bindCartographer", () => {
    it("should catch the error if pollCartographer throws", async () => {
      pollCartographerStub.throws(new Error(`Running a cartographer failed!`));
      ctxMock.config.mode.cleanup = false;
      await bindCartographer(10);
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(pollCartographerStub.callCount).to.be.gte(1);
    });
    it("happy: should start an interval loop that calls polling fn", async () => {
      ctxMock.config.mode.cleanup = false;
      await bindCartographer(10);
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(pollCartographerStub.callCount).to.be.gte(1);
    });
  });
});
