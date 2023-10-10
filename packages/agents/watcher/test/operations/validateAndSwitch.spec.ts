import { BaseRequestContext, createRequestContext, expect, mkHash } from "@connext/nxtp-utils";
import { PauseResponse, ReportEventType } from "@connext/nxtp-adapters-watcher";
import { stub, SinonStub } from "sinon";
import * as validateAndSwitchFns from "../../src/operations/validateAndSwitch";
import { ctxMock } from "../globalTestHook";

const requestContext = createRequestContext("test");

describe("Operations:validateAndSwitch", () => {
  describe("validateAndSwitch", () => {
    let validateAndSwitchStub: SinonStub<
      [requestContext: BaseRequestContext, reason: string],
      Promise<PauseResponse[]>
    >;
    beforeEach(() => {
      validateAndSwitchStub = stub(validateAndSwitchFns, "switchAndAlert").resolves();
    });

    it("should not call switchAndAlert if it doesnt need pause", async () => {
      (ctxMock.adapters.monitor.validateProposal as SinonStub).resolves({ needsSwitch: false });
      await validateAndSwitchFns.validateAndSwitch();
      expect(validateAndSwitchStub.callCount).to.be.eq(0);
    });

    it("should call switchAndAlert if needs pause", async () => {
      (ctxMock.adapters.monitor.validateProposal as SinonStub).resolves({ needsSwitch: true });
      await validateAndSwitchFns.validateAndSwitch();
      expect(validateAndSwitchStub).to.have.been.calledOnce;
    });
  });

  describe("switchAndAlert", () => {
    it("should switch and alert", async () => {
      await validateAndSwitchFns.switchAndAlert(requestContext, "reason");
      expect(ctxMock.adapters.watcher.alert).to.be.calledOnce;
    });
  });
});
