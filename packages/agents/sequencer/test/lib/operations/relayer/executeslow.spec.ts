import { expect, mkAddress, mkBytes32, RelayerType } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { MissingTransfer } from "../../../../src/lib/errors";
import { sendExecuteSlowToRelayer } from "../../../../src/lib/operations/relayer";
import { ctxMock, getHelpersStub } from "../../../globalTestHook";
import { mock } from "../../../mock";

const { requestContext } = mock.loggingContext("RELAYER-TEST");
describe("Operations:ExecuteSlow", () => {
  let getTransferStub: SinonStub;
  let connextRelayerSendStub: SinonStub;
  let getRelayerAddressStub: SinonStub;
  let sendStub: SinonStub;
  beforeEach(() => {
    const { transfers } = ctxMock.adapters.cache;
    getTransferStub = stub(transfers, "getTransfer");

    getRelayerAddressStub = ctxMock.adapters.relayer.getRelayerAddress as SinonStub;
    sendStub = ctxMock.adapters.relayer.send as SinonStub;

    connextRelayerSendStub = stub();
    getHelpersStub.returns({
      relayer: {
        connextRelayerSend: connextRelayerSendStub,
      },
    });
  });
  describe("#sendExecuteSlowToRelayer", () => {
    it("should throw if transfer is missing", async () => {
      getTransferStub.resolves(undefined);
      const mockExecutorData = mock.entity.executorData();
      await expect(sendExecuteSlowToRelayer(mockExecutorData, requestContext)).to.be.rejectedWith(MissingTransfer);
    });
    it("should send the data to the backup relayer if configured", async () => {
      ctxMock.config.relayerUrl = "http://mock-relayer.com";
      const mockTransferId = mkBytes32("0x100");
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });
      const mockTaskId = mkBytes32("0x111");
      const mockExecutorData = mock.entity.executorData({ transferId: mockTransferId });
      getTransferStub.resolves(mockTransfer);
      connextRelayerSendStub.resolves({ taskId: mockTaskId, relayer: RelayerType.BackupRelayer });
      const { taskId, relayer } = await sendExecuteSlowToRelayer(mockExecutorData, requestContext);
      expect(relayer).to.be.deep.eq(RelayerType.BackupRelayer);
      expect(taskId).to.be.eq(mockTaskId);
      expect(getTransferStub).to.have.been.calledOnceWithExactly(mockTransferId);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
    });
    it("should send the data to the gelato if it fails to send to the backup relayer", async () => {
      ctxMock.config.relayerUrl = "http://mock-relayer.com";
      const mockTransferId = mkBytes32("0x100");
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });
      const mockTaskId = mkBytes32("0x111");
      const mockExecutorData = mock.entity.executorData({ transferId: mockTransferId });
      const mockRelayerAddress = mkAddress("0xabc");
      getTransferStub.resolves(mockTransfer);
      connextRelayerSendStub.throws();
      getRelayerAddressStub.resolves(mockRelayerAddress);
      sendStub.resolves(mockTaskId);

      const { taskId, relayer } = await sendExecuteSlowToRelayer(mockExecutorData, requestContext);
      expect(taskId).to.be.eq(mockTaskId);
      expect(relayer).to.be.deep.eq(RelayerType.Gelato);
      expect(getTransferStub).to.have.been.calledOnceWithExactly(mockTransferId);
      expect(connextRelayerSendStub.callCount).to.be.eq(1);
      expect(getRelayerAddressStub.callCount).to.be.eq(1);
      expect(ctxMock.adapters.chainreader.getGasEstimateWithRevertCode as SinonStub).to.be.calledOnce;
    });
  });
});
