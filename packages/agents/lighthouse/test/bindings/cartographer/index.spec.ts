import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub, restore, reset } from "sinon";

import { stubContext } from "../../mock";
import { getReconciledTransactions } from "../../../src/bindings";
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
    it("happy: should start an interval loop that calls polling fn", async () => {
      ctxMock.config.mode.cleanup = false;
      await bindCartographer(10);
      delay(20);
      expect(pollCartographerStub.callCount).to.be.gte(1);
    });
  });
  describe("#pollCartographer", () => {});
  describe("#getReconciledTransactions", () => {
    it("happy: should work ", async () => {
      // Override the poll interval to 10ms so we can test the interval loop

      const res = await getReconciledTransactions();
      console.log(res);
      // TODO: slight race here?
    });
  });
});
