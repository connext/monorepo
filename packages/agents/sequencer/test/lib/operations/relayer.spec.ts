import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, expect, OriginTransfer } from "@connext/nxtp-utils";

import { mock, mockRelayerAddress } from "../../mock";
import { sendToRelayer } from "../../../src/lib/operations/relayer";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

const mockTransfers: OriginTransfer[] = [
  mock.entity.xtransfer({
    originDomain: "1337",
    destinationDomain: "1338",
    asset: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 0,
    originSender: mkAddress("0xsenderorigin"),
  }),
  mock.entity.xtransfer({
    originDomain: "1337",
    destinationDomain: "1338",
    asset: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 0,
    originSender: mkAddress("0xsenderorigin"),
  }),
  {
    ...mock.entity.xtransfer(),
    originDomain: "1337",
    destinationDomain: "1338",
    xparams: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
    },
    local: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 7,
    originSender: mkAddress("0xoriginsender"),
  },
];

const mockLocalAsset = mkAddress("0xdedddddddddddddd");

const mockBids = [mock.entity.bid(mockTransfers[0]), mock.entity.bid(mockTransfers[1])];

const loggingContext = mock.loggingContext("RELAYER-TEST");
describe("#relayer", () => {
  describe("#sendToRelayer", () => {
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
      await sendToRelayer(mockBids.slice(0, 1), mockTransfers[0], mockLocalAsset, loggingContext.requestContext);
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
