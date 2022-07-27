import { expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { sendToRelayer } from "../../../src/lib/operations/relayer";
import { ctxMock, getHelpersStub } from "../../globalTestHook";
import { mock, stubContext, encodedDataMock, requestContext } from "../../mock";

describe("Operations:Relayer", () => {
  let mockContext: any;
  let connextRelayerSendStub: SinonStub;
  let getGelatoRelayerAddressStub: SinonStub;
  beforeEach(() => {
    mockContext = stubContext();
    connextRelayerSendStub = stub().resolves();
    getGelatoRelayerAddressStub = stub().resolves(mkAddress("0x111"));
    getHelpersStub.returns({
      relayer: {
        connextRelayerSend: connextRelayerSendStub,
        getGelatoRelayerAddress: getGelatoRelayerAddressStub,
      },
    });
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#sendToRelayer", () => {
    it("should not try to send the payload to the connext relayer if relayerUrl is undefined", async () => {
      ctxMock.config.relayerUrl = undefined;

      connextRelayerSendStub.resolves();
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(0);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(1);
      expect(ctxMock.adapters.chainreader.getGasEstimateWithRevertCode).to.be.calledOnceWith(
        Number(executeArgs.params.destinationDomain),
      );
      expect(ctxMock.adapters.relayer.send).to.be.calledOnceWith(
        Number(mock.chain.B),
        ctxMock.config.chains[mock.domain.B].deployments.connext,
        "0xabcde",
        requestContext,
      );
    });
    it("should not send the payload if gas estimation fails", async () => {
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(ctxMock.adapters.chainreader.getGasEstimateWithRevertCode).to.be.calledOnceWith(
        Number(executeArgs.params.destinationDomain),
      );
    });
    it("should send the payload to the backup relayer successfully", async () => {
      connextRelayerSendStub.resolves({ taskId: mkBytes32("0x12345") });
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(0);
    });
    it("should send the payload to the gelato relayer successfully!", async () => {
      connextRelayerSendStub.throws();
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(1);
      expect(ctxMock.adapters.chainreader.getGasEstimateWithRevertCode).to.be.calledOnceWith(
        Number(executeArgs.params.destinationDomain),
      );
      expect(ctxMock.adapters.relayer.send).to.be.calledOnceWith(
        Number(mock.chain.B),
        ctxMock.config.chains[mock.domain.B].deployments.connext,
        "0xabcde",
        requestContext,
      );
    });
  });
});
