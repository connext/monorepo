import { mkAddress, FulfillArgs, Bid, expect, BidStatus, getRandomBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { bidSelection, handleBid } from "../../../src/lib/operations";
import { ctxMock } from "../../globalTestHook";
import { mock } from "../../mock";
import * as RelayerFns from "../../../src/lib/operations/relayer";

const mockFulfillArgs: FulfillArgs[] = [
  {
    params: {
      recipient: mkAddress("0xbeefdead"),
      callTo: mkAddress("0x"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xa"),
    feePercentage: "0.1",
    index: 0,
    transactionId: getRandomBytes32(),
    proof: ["0x"],
    amount: "10.1",
    relayerSignature: "0xsigsigsig",
  },
  {
    params: {
      recipient: mkAddress("0xbeefdead"),
      callTo: mkAddress("0x"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xb"),
    feePercentage: "0.1",
    index: 1,
    transactionId: getRandomBytes32(),
    proof: ["0x"],
    amount: "10.1",
    relayerSignature: "0xsigsigsig",
  },
];

const mockBids = [
  mock.entity.bid("0xtx111", mockFulfillArgs[0]),
  mock.entity.bid("0xtx111", mockFulfillArgs[1]),
  mock.entity.bid(),
];

const loggingContext = mock.loggingContext("BID-TEST");
describe("Bid", () => {
  describe("#handleBid", () => {
    let storeBidStub: SinonStub;
    beforeEach(async () => {
      storeBidStub = stub(ctxMock.adapters.cache.auctions, "storeBid");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should error if input validation fails", async () => {
      const _bid: Bid = {
        ...mockBids[0],
        transactionId: 1,
      };
      expect(handleBid(_bid, loggingContext.requestContext)).to.eventually.be.rejectedWith("Params invalid");
    });
    it("happy case: should store bid to auction cache", async () => {
      await handleBid(mockBids[0], loggingContext.requestContext);
      expect(storeBidStub).to.be.calledOnceWithExactly(mockBids[0]);
    });
  });
  describe("#bidSelection", () => {
    let getAllTransactionsIdsWithPendingBidsStub: SinonStub;
    let getBidsByTransactionIdStub: SinonStub;
    let updateAllBidsWithTransactionIdStub: SinonStub;
    let sendToRelayerStub: SinonStub;

    beforeEach(async () => {
      getAllTransactionsIdsWithPendingBidsStub = stub(
        ctxMock.adapters.cache.auctions,
        "getAllTransactionsIdsWithPendingBids",
      );
      getBidsByTransactionIdStub = stub(ctxMock.adapters.cache.auctions, "getBidsByTransactionId");
      getBidsByTransactionIdStub.resolves([mockBids[0].transactionId]);
      updateAllBidsWithTransactionIdStub = stub(ctxMock.adapters.cache.auctions, "updateAllBidsWithTransactionId");

      sendToRelayerStub = stub(RelayerFns, "sendToRelayer");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("happy case: should send best bid to the relayer", async () => {
      sendToRelayerStub.resolves();
      await handleBid(mockBids[0], loggingContext.requestContext);
      await bidSelection(loggingContext);
      expect(sendToRelayerStub).to.be.calledOnceWithExactly(mockBids[0].transactionId, BidStatus.Sent);
    });
  });
});
