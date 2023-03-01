import { expect, mock } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as SendOutboundRootFns from "../../../../src/tasks/sendOutboundRoot/operations/sendOutboundRoot";
import { sendOutboundRootCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";

describe("Operations: Send Outbound Root", () => {
  describe("#sendOutboundRoot", () => {
    it("should send outbound root with and without params", async () => {
      stub(SendOutboundRootFns, "getParamsForDomainFn").value({
        [mock.domain.A]: () => ({ _fee: "42", _encodedData: "0xdeadbeef" }),
      });
      await SendOutboundRootFns.sendOutboundRoot();
      expect(sendOutboundRootCtxMock.adapters.contracts.relayerProxy.encodeFunctionData as SinonStub).calledWithExactly(
        "send",
        ["0xdeadbeef", "42", "0"],
      );
      expect(sendOutboundRootCtxMock.adapters.contracts.relayerProxy.encodeFunctionData as SinonStub).calledWithExactly(
        "send",
        ["0x", "0", "0"],
      );
      expect(sendWithRelayerWithBackupStub).to.have.been.calledTwice;
    });
  });
});
