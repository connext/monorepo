import { expect, mkAddress, mkBytes32, RelayerTaskStatus, RelayerType } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";
import { MissingTransfer } from "../../../../src/lib/errors";
import * as MockableFns from "../../../../src/mockable";
import { sendExecuteSlowToRelayer } from "../../../../src/lib/operations/relayer";
import { ctxMock, getHelpersStub } from "../../../globalTestHook";
import { mock } from "../../../mock";
import { mockTaskId } from "@connext/nxtp-adapters-relayer/test/mock";

const { requestContext } = mock.loggingContext("RELAYER-TEST");
describe("Operations:ExecuteSlow", () => {
  let getTransferStub: SinonStub;
  let connextRelayerSendStub: SinonStub;
  let sendWithRelayerWithBackupStub: SinonStub;
  beforeEach(() => {
    const { transfers } = ctxMock.adapters.cache;
    getTransferStub = stub(transfers, "getTransfer");

    connextRelayerSendStub = stub();
    getHelpersStub.returns({
      relayer: {
        connextRelayerSend: connextRelayerSendStub,
      },
    });
    sendWithRelayerWithBackupStub = stub(MockableFns, "sendWithRelayerWithBackup").resolves({
      taskId: mockTaskId,
    });
  });

  describe("#sendExecuteSlowToRelayer", () => {
    it("should throw if transfer is missing", async () => {
      getTransferStub.resolves(undefined);
      const mockExecutorData = mock.entity.executorData();
      await expect(sendExecuteSlowToRelayer(mockExecutorData, requestContext)).to.be.rejectedWith(MissingTransfer);
    });

    it("should send the data", async () => {
      const mockTransferId = mkBytes32("0x100");
      const mockTransfer = mock.entity.xtransfer({ transferId: mockTransferId });
      const mockExecutorData = mock.entity.executorData({ transferId: mockTransferId });
      getTransferStub.resolves(mockTransfer);
      connextRelayerSendStub.throws();
      const { taskId } = await sendExecuteSlowToRelayer(mockExecutorData, requestContext);
      expect(taskId).to.be.eq(mockTaskId);
      expect(sendWithRelayerWithBackupStub).to.be.calledOnce;
    });
  });
});
