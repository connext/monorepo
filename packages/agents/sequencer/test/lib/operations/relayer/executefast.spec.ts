import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, expect, OriginTransfer, XTransfer } from "@connext/nxtp-utils";

import { mock, mockRelayerAddress } from "../../../mock";
import { sendExecuteFastToRelayer } from "../../../../src/lib/operations/relayer";
import { ctxMock, getHelpersStub } from "../../../globalTestHook";

const mockTransfers: XTransfer[] = [
  mock.entity.xtransfer({
    originDomain: "13337",
    destinationDomain: "13338",
    asset: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 0,
  }),
  mock.entity.xtransfer({
    originDomain: "13337",
    destinationDomain: "13338",
    asset: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 0,
  }),
  {
    ...mock.entity.xtransfer(),
    xparams: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      forceSlow: false,
      receiveLocal: false,
      callback: mkAddress("0x"),
      callbackFee: "0",
      relayerFee: "0",
      recovery: mkAddress("0x"),
      agent: mkAddress("0x"),
      destinationMinOut: "0",
      destinationDomain: "13338",
      originDomain: "13337",
    },
    nonce: 7,
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
    beforeEach(() => {
      encodeExecuteFromBidsStub = stub();
      getHelpersStub.returns({
        auctions: {
          encodeExecuteFromBids: encodeExecuteFromBidsStub.returns("0xbeef"),
        },
      });
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should send the bid to the relayer", async () => {
      await sendExecuteFastToRelayer(
        1,
        mockBids.slice(0, 1),
        mockTransfers[0] as OriginTransfer,
        mockLocalAsset,
        loggingContext.requestContext,
      );
      expect(ctxMock.adapters.chainreader.getGasEstimateWithRevertCode).to.be.calledOnceWith(Number(mock.domain.B));
      expect((ctxMock.adapters.chainreader.getGasEstimateWithRevertCode as SinonStub).getCall(0).args[1]).to.deep.eq({
        chainId: Number(mock.chain.B),
        to: ctxMock.config.chains[mock.domain.B].deployments.connext,
        data: "0xbeef",
        from: mockRelayerAddress,
      });
      expect(ctxMock.adapters.relayer.send).to.be.calledOnceWith(
        Number(mock.chain.B),
        ctxMock.config.chains[mock.domain.B].deployments.connext,
        "0xbeef",
      );
    });
  });
});
