import { BaseRequestContext, createRequestContext, expect, mkHash } from "@connext/nxtp-utils";
import { PauseResponse, ReportEventType } from "@connext/nxtp-adapters-watcher";
import { stub, SinonStub } from "sinon";
import * as ValidateAndPauseFns from "../../src/operations/validateAndPause";
import { ctxMock } from "../globalTestHook";
import { mock } from "../mock";

const requestContext = createRequestContext("test");

describe("Operations:validateAndPause", () => {
  describe("validateAndPause", () => {
    let validateAndPauseStub: SinonStub<[requestContext: BaseRequestContext, reason: string], Promise<PauseResponse[]>>;
    beforeEach(() => {
      validateAndPauseStub = stub(ValidateAndPauseFns, "pauseAndAlert").resolves();
    });

    it("should not call pauseAndAlert if it doesn't need pause", async () => {
      (ctxMock.adapters.watcher.checkInvariants as SinonStub).resolves({ needsPause: false });
      await ValidateAndPauseFns.validateAndPause();
      expect(validateAndPauseStub.callCount).to.be.eq(0);
    });

    it("should call pauseAndAlert if needs pause", async () => {
      (ctxMock.adapters.watcher.checkInvariants as SinonStub).resolves({ needsPause: true });
      await ValidateAndPauseFns.validateAndPause();
      expect(validateAndPauseStub).to.have.been.calledOnce;
    });
  });

  describe("pauseAndAlert", () => {
    it("should pause and alert", async () => {
      await ValidateAndPauseFns.pauseAndAlert(requestContext, "reason");
      expect(ctxMock.adapters.watcher.alert).to.be.calledOnce;
    });
  });
});
