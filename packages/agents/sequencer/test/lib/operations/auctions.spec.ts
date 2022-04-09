import { mkAddress, Bid, expect, AuctionStatus, getRandomBytes32, BidData } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { mock } from "../../mock";
import * as RelayerFns from "../../../src/lib/operations/relayer";
import { AuctionExpired, ParamsInvalid } from "../../../src/lib/errors";
import { selectBids, storeBid } from "../../../src/lib/operations/auctions";

const { requestContext } = mock.loggingContext("BID-TEST");

describe("Operations:Auctions", () => {
  // db
  let getQueuedTransfersStub: SinonStub;
  let getAuctionStub: SinonStub;
  let setBidDataStub: SinonStub;
  let getBidDataStub: SinonStub;
  let upsertTaskStub: SinonStub;
  let upsertAuctionStub: SinonStub;
  let getStatusStub: SinonStub;
  let setStatusStub: SinonStub;

  // operations
  let sendToRelayerStub: SinonStub;

  // helpers
  let encodeExecuteFromBidStub: SinonStub;
  beforeEach(() => {
    const { auctions } = ctxMock.adapters.cache;
    upsertAuctionStub = stub(auctions, "upsertAuction").resolves(0);
    getStatusStub = stub(auctions, "getStatus").resolves(AuctionStatus.None);
    setStatusStub = stub(auctions, "setStatus").resolves(1);
    getQueuedTransfersStub = stub(auctions, "getQueuedTransfers");

    upsertTaskStub = stub(auctions, "upsertTask").resolves(0);
    getAuctionStub = stub(auctions, "getAuction");
    setBidDataStub = stub(auctions, "setBidData").resolves(0);
    getBidDataStub = stub(auctions, "getBidData");
    sendToRelayerStub = stub(RelayerFns, "sendToRelayer");

    sendToRelayerStub = stub().resolves();
    getOperationsStub.returns({
      relayer: {
        sendToRelayer: sendToRelayerStub,
      },
    });

    getHelpersStub.returns({
      relayer: {
        encodeExecuteFromBid: encodeExecuteFromBidStub,
      },
    });
    encodeExecuteFromBidStub = stub().resolves(getRandomBytes32());
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#storeBid", () => {
    it("happy: should store bid in auction cache", async () => {
      const transferId = getRandomBytes32();
      const bid: Bid = mock.entity.bid();
      const bidData: BidData = mock.entity.bidData();
      await storeBid(transferId, bid, bidData, requestContext);
      expect(upsertAuctionStub).to.be.calledOnceWithExactly({
        transferId,
        origin: bidData.params.originDomain,
        destination: bidData.params.destinationDomain,
        bid,
      });
      expect(getStatusStub).to.be.calledOnceWithExactly(transferId);
      expect(setBidDataStub).to.be.calledOnceWithExactly(transferId, bidData);
    });

    it("should error if input validation fails", async () => {
      const transferId = getRandomBytes32();
      const bidData: BidData = mock.entity.bidData();

      const invalidBid1: any = {
        ...mock.entity.bid(),
        fee: 1,
      };
      expect(await storeBid(transferId, invalidBid1, bidData, requestContext)).to.be.rejectedWith(ParamsInvalid);

      const invalidBid2: any = {
        ...mock.entity.bid(),
        signatures: {
          "-99999": -1234,
        },
      };

      expect(await storeBid(transferId, invalidBid2, bidData, requestContext)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should error if the auction has expired", async () => {
      const transferId = getRandomBytes32();
      const bid: Bid = mock.entity.bid();
      const bidData: BidData = mock.entity.bidData();
      getStatusStub.resolves(AuctionStatus.Sent);
      expect(await storeBid(transferId, bid, bidData, requestContext)).to.be.rejectedWith(AuctionExpired);
    });
  });

  describe("#selectBids", () => {
    const mockTransferIdBatch = (count: number) => new Array(count).fill(0).map(() => getRandomBytes32());
    const mockAuctionDataBatch = (count: number) => new Array(count).fill(0).map(() => mock.entity.auction());
    const mockBidDataBatch = (count: number) => new Array(count).fill(0).map(() => mock.entity.bidData());

    it("happy case: should send best bid to the relayer", async () => {
      const taskId = getRandomBytes32();
      sendToRelayerStub.resolves(taskId);

      const count = 3;
      const transferIds = mockTransferIdBatch(count);
      getQueuedTransfersStub.resolves(transferIds);
      const auctions = mockAuctionDataBatch(count);

      for (let i = 0; i < count; i++) {
        getAuctionStub.onCall(i).resolves(auctions[i]);
      }

      const bidDatas = mockBidDataBatch(count);
      for (let i = 0; i < count; i++) {
        getBidDataStub.onCall(i).resolves(bidDatas[i]);
      }

      await selectBids(requestContext);

      expect(getQueuedTransfersStub.callCount).to.eq(1);

      expect(getAuctionStub.callCount).to.be.eq(count);
      expect(getBidDataStub.callCount).to.be.eq(count);
      expect(sendToRelayerStub.callCount).to.be.eq(count);

      for (let i = 0; i < count; i++) {
        expect(getAuctionStub.getCall(i).args).to.be.deep.eq([transferIds[i]]);
        expect(getBidDataStub.getCall(i).args).to.be.deep.eq([transferIds[i]]);
        expect(sendToRelayerStub.getCall(i).args[0].length).to.eq(1);
        expect(sendToRelayerStub.getCall(i).args[1]).to.be.deep.eq(bidDatas[i]);
        expect(setStatusStub.getCall(i).args).to.be.deep.eq([transferIds[i], AuctionStatus.Sent]);
        expect(upsertTaskStub.getCall(i).args).to.be.deep.eq([transferIds[i], taskId]);
      }
    });

    it("should select a bid from multiple bids", async () => {
      const taskId = getRandomBytes32();
      sendToRelayerStub.resolves(taskId);

      const router1 = mkAddress("0x1");
      const router2 = mkAddress("0x2");
      const router3 = mkAddress("0x3");
      const transferId = getRandomBytes32();
      getQueuedTransfersStub.resolves([transferId]);
      const auction = {
        ...mock.entities.auction(),
        bids: [
          {
            ...mock.entities.bid(),
            router: router1,
          },
          {
            ...mock.entities.bid(),
            router: router2,
          },
          {
            ...mock.entities.bid(),
            router: router3,
          },
        ],
      };
      getAuctionStub.resolves(auction);
      const bidData = mock.entities.bidData();
      getBidDataStub.resolves(bidData);

      await selectBids(requestContext);

      expect(getAuctionStub.callCount).to.be.eq(1);
      expect(getBidDataStub.callCount).to.be.eq(1);
      expect(sendToRelayerStub.callCount).to.be.eq(1);

      // Just selected 1 router.
      expect(sendToRelayerStub.getCall(0).args[0].length).to.eq(1);
    });

    it("should handle multipath", async () => {
      const taskId = getRandomBytes32();
      sendToRelayerStub.resolves(taskId);

      const router1 = mkAddress("0x1");
      const router2 = mkAddress("0x2");
      const router3 = mkAddress("0x3");
      const router4 = mkAddress("0x4");
      const transferId = getRandomBytes32();
      getQueuedTransfersStub.resolves([transferId]);
      // Based on this bid arrangement, there's only 1 option: select the 3
      // routers that can afford a 3-path transfer.
      const auction = {
        ...mock.entities.auction(),
        bids: [
          // Router 1 is wealthy and can afford a 2-path and 3-path transfer.
          // ... but there's not enough routers for 2-path!
          {
            ...mock.entities.bid(),
            router: router1,
            signatures: {
              "2": getRandomBytes32(),
              "3": getRandomBytes32(),
              "5": getRandomBytes32(),
            },
          },
          {
            ...mock.entities.bid(),
            router: router2,
            signatures: {
              "3": getRandomBytes32(),
              "4": getRandomBytes32(),
              "5": getRandomBytes32(),
            },
          },
          {
            ...mock.entities.bid(),
            router: router3,
            signatures: {
              "3": getRandomBytes32(),
              "4": getRandomBytes32(),
              "5": getRandomBytes32(),
            },
          },
          // Router 4 is poor: it can't afford a 4-path transfer!
          {
            ...mock.entities.bid(),
            router: router4,
            signatures: {
              "4": getRandomBytes32(),
              "5": getRandomBytes32(),
            },
          },
        ],
      };
      getAuctionStub.resolves(auction);
      const bidData = mock.entities.bidData();
      getBidDataStub.resolves(bidData);

      await selectBids(requestContext);

      expect(getAuctionStub.callCount).to.be.eq(1);
      expect(getBidDataStub.callCount).to.be.eq(1);
      expect(sendToRelayerStub.callCount).to.be.eq(1);

      // Ensure we selected the correct 3 routers.
      const selectedRouters = sendToRelayerStub.getCall(0).args[0];
      expect(selectedRouters.length).to.eq(3);
      expect(selectedRouters).to.include(router1);
      expect(selectedRouters).to.include(router2);
      expect(selectedRouters).to.include(router3);
      expect(selectedRouters).to.not.include(router4);
    });

    it("does nothing if none queued", async () => {
      getQueuedTransfersStub.resolves([]);
      await selectBids(requestContext);
    });
  });
});
