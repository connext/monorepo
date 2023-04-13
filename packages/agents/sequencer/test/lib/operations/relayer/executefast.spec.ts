import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, expect, OriginTransfer, XTransfer, RelayerTaskStatus } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { mock } from "../../../mock";
import { sendExecuteFastToRelayer } from "../../../../src/lib/operations/relayer";
import { getHelpersStub } from "../../../globalTestHook";
import * as MockableFns from "../../../../src/mockable";
import { mockTaskId } from "@connext/nxtp-adapters-relayer/test/mock";

const mockTransfers: XTransfer[] = [
  mock.entity.xtransfer({
    originDomain: "13337",
    destinationDomain: "13338",
    asset: mkAddress("0xdedddddddddddddd"),
    amount: "10",
    nonce: 0,
  }),
  mock.entity.xtransfer({
    originDomain: "13337",
    destinationDomain: "13338",
    asset: mkAddress("0xdedddddddddddddd"),
    amount: "10",
    nonce: 0,
  }),
  {
    ...mock.entity.xtransfer({ nonce: 7 }),
  },
];

const mockLocalAsset = mkAddress("0xdedddddddddddddd");

const mockBids = [
  mock.entity.bid({ transferId: mockTransfers[0].transferId }),
  mock.entity.bid({ transferId: mockTransfers[1].transferId }),
];

const loggingContext = mock.loggingContext("RELAYER-TEST");
describe("Operations:ExecuteFast", () => {
  describe("#sendExecuteFastToRelayer", () => {
    let encodeExecuteFromBidsStub: SinonStub;
    let sendWithRelayerWithBackupStub: SinonStub;
    beforeEach(() => {
      encodeExecuteFromBidsStub = stub();
      getHelpersStub.returns({
        auctions: {
          encodeExecuteFromBids: encodeExecuteFromBidsStub.returns("0xbeef"),
          encodeRelayerProxyExecuteFromBids: encodeExecuteFromBidsStub.returns("0xbeef"),
        },
      });
      sendWithRelayerWithBackupStub = stub(MockableFns, "sendWithRelayerWithBackup").resolves({
        taskId: mockTaskId,
      });
    });

    it("should send the bid to the relayer", async () => {
      const { taskId } = await sendExecuteFastToRelayer(
        1,
        mockBids.slice(0, 1),
        mockTransfers[0] as OriginTransfer,
        mockLocalAsset,
        loggingContext.requestContext,
      );
      expect(taskId).to.be.eq(mockTaskId);
      expect(sendWithRelayerWithBackupStub).to.be.calledOnce;
    });
  });
});
