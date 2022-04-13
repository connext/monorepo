import { SinonStub, stub, restore, reset } from "sinon";
import { AuctionsApiPostBidReq, AuctionStatus, expect, getRandomBytes32 } from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";

import * as BindingFns from "../../../src/bindings/server";
import { mock } from "../../mock";
import { ctxMock, getOperationsStub } from "../../globalTestHook";

let fastifyApp: FastifyInstance;
describe("Bindings:Server", () => {
  describe("#bindServer", () => {
    // db
    let getQueuedTransfersStub: SinonStub;
    let getAuctionStub: SinonStub;
    let getTaskStub: SinonStub;
    let upsertAuctionStub: SinonStub;
    let getStatusStub: SinonStub;
    let setStatusStub: SinonStub;

    // operations
    let storeBidStub: SinonStub;
    beforeEach(() => {
      const { auctions } = ctxMock.adapters.cache;
      upsertAuctionStub = stub(auctions, "upsertAuction").resolves(0);
      getAuctionStub = stub(auctions, "getAuction");

      getStatusStub = stub(auctions, "getStatus").resolves(AuctionStatus.None);
      setStatusStub = stub(auctions, "setStatus").resolves(1);

      getQueuedTransfersStub = stub(auctions, "getQueuedTransfers");

      getTaskStub = stub(auctions, "getTask").resolves(undefined);

      storeBidStub = stub();
      getOperationsStub.returns({
        auctions: {
          storeBid: storeBidStub,
        },
      });
    });

    after(() => {
      restore();
      reset();
    });

    it("happy: should respond with `pong`", async () => {
      fastifyApp = await BindingFns.bindServer();
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/ping",
      });
      expect(response.statusCode).to.be.eq(200);
      expect(response.payload).to.be.eq("pong\n");
    });

    it("happy: should succeed to post a bid", async () => {
      storeBidStub.resolves();
      const transferId = getRandomBytes32();
      const bid = mock.entity.bid();
      const bidData = mock.entity.bidData();
      const data: AuctionsApiPostBidReq = {
        transferId,
        bid,
        data: bidData,
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/auctions",
        payload: data,
      });

      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).message).to.be.eq("Sent bid to auctioneer");
      expect(storeBidStub.callCount).to.be.eq(1);
      expect(storeBidStub.getCall(0).args.slice(0, 3)).to.be.deep.eq([transferId, bid, bidData]);
    });

    it("happy: should get empty queued bids", async () => {
      const transferIds = [getRandomBytes32(), getRandomBytes32()];
      getQueuedTransfersStub.resolves(transferIds);

      const response = await fastifyApp.inject({
        method: "GET",
        url: "/queued",
      });
      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).queued).to.be.deep.eq(transferIds);
      expect(getQueuedTransfersStub.callCount).to.be.eq(1);
    });

    it("happy: should get 500 on non-existent auction", async () => {
      getStatusStub.resolves(AuctionStatus.None);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/auctions/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should receive 500 error if handling the bid fails", async () => {
      storeBidStub.throws(new Error("Handling the bid failed!"));
      const transferId = getRandomBytes32();
      const bid = mock.entity.bid();
      const bidData = mock.entity.bidData();
      const data: AuctionsApiPostBidReq = {
        transferId,
        bid,
        data: bidData,
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/auctions",
        payload: data,
      });

      expect(response.statusCode).to.be.eq(500);
    });
  });
});
