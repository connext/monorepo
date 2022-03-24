import {
  mkAddress,
  ExecuteArgs,
  Bid,
  expect,
  BidStatus,
  getRandomBytes32,
  getNtpTimeSeconds,
  delay,
} from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { bidSelection, handleBid } from "../../../src/lib/operations";
import { ctxMock } from "../../globalTestHook";
import { mock } from "../../mock";
import * as RelayerFns from "../../../src/lib/operations/relayer";

const mockTransferId = getRandomBytes32();
const mockFulfillArgs: ExecuteArgs[] = [
  {
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1337",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xa"),
    feePercentage: "0.1",
    amount: "10",
    index: 0,
    transferId: mockTransferId,
    proof: ["0x"],
    relayerSignature: "0xsigsigsig",
  },
  {
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1338",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xb"),
    feePercentage: "0.1",
    amount: "10",
    index: 1,
    transferId: mockTransferId,
    proof: ["0x"],
    relayerSignature: "0xsigsigsig",
  },
];

const mockBids = [
  mock.entity.bid(mockTransferId, mockFulfillArgs[0]),
  mock.entity.bid(mockTransferId, mockFulfillArgs[1]),
  mock.entity.bid(),
];

const storedBids = [
  {
    payload: mockBids[0],
    status: BidStatus.Pending,
    lastUpdate: getNtpTimeSeconds(),
  },
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
      getAllTransactionsIdsWithPendingBidsStub.resolves([mockBids[0].transactionId]);

      getBidsByTransactionIdStub = stub(ctxMock.adapters.cache.auctions, "getBidsByTransactionId");
      getBidsByTransactionIdStub.resolves(storedBids);
      updateAllBidsWithTransactionIdStub = stub(ctxMock.adapters.cache.auctions, "updateAllBidsWithTransactionId");
      updateAllBidsWithTransactionIdStub.resolves();

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
      await delay(1000);
      expect(getBidsByTransactionIdStub.callCount).to.be.eq(1);
      expect(sendToRelayerStub.callCount).to.be.eq(1);
      expect(updateAllBidsWithTransactionIdStub).to.be.calledOnceWithExactly(mockBids[0].transactionId, BidStatus.Sent);
    });
  });
});
