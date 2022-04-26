import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, expect, XTransfer } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { sendToRelayer } from "../../../src/lib/operations/relayer";
import { GelatoSendFailed } from "../../../src/lib/errors";
import { getHelpersStub } from "../../globalTestHook";

const mockTransfers: XTransfer[] = [
  {
    ...mock.entity.xtransfer(),
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 0,
    originSender: mkAddress("0xsenderorigin"),
  },
  {
    ...mock.entity.xtransfer(),
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 7,
    originSender: mkAddress("0xoriginsender"),
  },
];

const mockRelayerFees = [
  { amount: mockTransfers[0].relayerFee, asset: mockTransfers[0].xcall.localAsset },
  { amount: mockTransfers[1].relayerFee, asset: mockTransfers[1].xcall.localAsset },
];

const mockBids = [mock.entity.bid(mockTransfers[0]), mock.entity.bid(mockTransfers[1])];
const mockSelectedRouters = mockBids.map((bid) => bid.router);

const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };
const loggingContext = mock.loggingContext("RELAYER-TEST");
describe("#relayer", () => {
  describe("#sendToRelayer", () => {
    let gelatoSendStub: SinonStub;
    let isChainSupportedByGelatoStub: SinonStub;
    let encodeExecuteFromBidStub: SinonStub;
    let getGelatoRelayerAddressStub: SinonStub;
    beforeEach(() => {
      gelatoSendStub = stub();
      isChainSupportedByGelatoStub = stub();
      encodeExecuteFromBidStub = stub();
      getGelatoRelayerAddressStub = stub();

      getHelpersStub.returns({
        relayer: {
          gelatoSend: gelatoSendStub,
          isChainSupportedByGelato: isChainSupportedByGelatoStub,
          getGelatoRelayerAddress: getGelatoRelayerAddressStub,
        },
        auctions: {
          encodeExecuteFromBid: encodeExecuteFromBidStub,
        },
      });
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should error if gelato doesn't support", async () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        sendToRelayer(
          mockSelectedRouters.slice(0, 1),
          mockTransfers[0],
          mockRelayerFees[0],
          loggingContext.requestContext,
        ),
      ).to.eventually.be.throw(new Error("Chain not supported by gelato."));
    });

    it("should error if gelato returns error", async () => {
      isChainSupportedByGelatoStub.resolves(true);
      gelatoSendStub.resolves(mockAxiosErrorResponse);
      expect(
        sendToRelayer(
          mockSelectedRouters.slice(0, 1),
          mockTransfers[0],
          mockRelayerFees[0],
          loggingContext.requestContext,
        ),
      ).to.eventually.be.throw(new GelatoSendFailed());
    });

    it("should send the bid to the sequencer", async () => {
      isChainSupportedByGelatoStub.resolves(true);
      gelatoSendStub.resolves(mockAxiosSuccessResponse);
      await sendToRelayer(
        mockSelectedRouters.slice(0, 1),
        mockTransfers[0],
        mockRelayerFees[0],
        loggingContext.requestContext,
      );
      expect(gelatoSendStub).to.be.calledOnce;
    });
  });
});
