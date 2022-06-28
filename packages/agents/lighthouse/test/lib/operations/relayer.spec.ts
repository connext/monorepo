import { expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { sendToRelayer } from "../../../src/lib/operations/relayer";
import { ctxMock, getHelpersStub } from "../../globalTestHook";
import { mock, stubContext, encodedDataMock, requestContext } from "../../mock";

describe("Operations:Relayer", () => {
  let mockContext: any;
  let connextRelayerSendStub: SinonStub;
  let getGelatoRelayerAddressStub: SinonStub;
  let getGasEstimateWithRevertCodeStub: SinonStub;
  let externalRelayerSendStub: SinonStub;
  beforeEach(() => {
    mockContext = stubContext();
    connextRelayerSendStub = stub().resolves();
    getGelatoRelayerAddressStub = stub().resolves(mkAddress("0x111"));
    getGasEstimateWithRevertCodeStub = stub().resolves();
    externalRelayerSendStub = stub().resolves();
    getHelpersStub.returns({
      relayer: {
        connextRelayerSend: connextRelayerSendStub,
        externalRelayerSend: externalRelayerSendStub,
        getGelatoRelayerAddress: getGelatoRelayerAddressStub,
        getGasEstimateWithRevertCode: getGasEstimateWithRevertCodeStub,
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
      externalRelayerSendStub.resolves();
      connextRelayerSendStub.resolves();
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(0);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(1);
      expect(getGasEstimateWithRevertCodeStub.callCount).to.be.eq(1);
      expect(externalRelayerSendStub.callCount).to.be.eq(1);
    });
    it("should not send the payload if gas estimation fails", async () => {
      externalRelayerSendStub.resolves();
      getGasEstimateWithRevertCodeStub.throws(new Error("Gas estimation failed"));
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(1);
      expect(externalRelayerSendStub.callCount).to.be.eq(0);
    });
    it("should send the payload to the backup relayer successfully", async () => {
      externalRelayerSendStub.resolves();
      connextRelayerSendStub.resolves({ taskId: mkBytes32("0x12345") });
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(0);
      expect(getGasEstimateWithRevertCodeStub.callCount).to.be.eq(0);
      expect(externalRelayerSendStub.callCount).to.be.eq(0);
    });
    it("should send the payload to the gelato relayer successfully!", async () => {
      externalRelayerSendStub.resolves();
      connextRelayerSendStub.throws();
      const executeArgs = mock.entity.executeArgs();
      const transferId = mkBytes32();
      await sendToRelayer(executeArgs, encodedDataMock, transferId, requestContext);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(getGelatoRelayerAddressStub.callCount).to.be.eq(1);
      expect(getGasEstimateWithRevertCodeStub.callCount).to.be.eq(1);
      expect(externalRelayerSendStub.callCount).to.be.eq(1);
    });
  });
});
