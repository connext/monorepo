import { expect, mkHash, mock } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as SendOutboundRootFns from "../../../../src/tasks/sendOutboundRoot/operations/sendOutboundRoot";
import { sendOutboundRootCtxMock, sendWithRelayerWithBackupStub } from "../../../globalTestHook";
import * as Mockable from "../../../../src/mockable";

describe("Operations: Send Outbound Root", () => {
  describe("#sendOutboundRoot", () => {
    beforeEach(() => {
      stub(SendOutboundRootFns, "getParamsForDomainFn").value({
        [mock.domain.A]: () => ({ _fee: "42", _encodedData: "0xdeadbeef" }),
      });
    });

    it("should not send if already sent", async () => {
      stub(Mockable, "getContract").returns({
        outboundRoot: stub().resolves(mkHash("0xaa")),
        sentMessageRoots: stub().resolves(true),
      } as any);
      await SendOutboundRootFns.sendOutboundRoot();
      expect(sendWithRelayerWithBackupStub).to.have.been.callCount(0);
    });

    it("should send outbound root with and without params", async () => {
      stub(Mockable, "getContract").returns({
        outboundRoot: stub().resolves(mkHash("0xaa")),
        sentMessageRoots: stub().resolves(false),
      } as any);
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
