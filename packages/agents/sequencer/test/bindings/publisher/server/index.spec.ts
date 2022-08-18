import { SinonStub, stub, restore, reset } from "sinon";
import {
  ExecuteFastApiPostBidReq,
  AuctionStatus,
  expect,
  getRandomBytes32,
  mkAddress,
  ExecutorPostDataRequest,
  mkBytes32,
  ExecutorDataStatus,
} from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";

import * as BindingFns from "../../../../src/bindings/publisher";
import { mock } from "../../../mock";
import { ctxMock, getOperationsStub } from "../../../globalTestHook";

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
    let getExecutorDataStatusStub: SinonStub;

    // operations
    let storeBidStub: SinonStub;
    let storeExecutorDataStub: SinonStub;

    beforeEach(() => {
      const { auctions, executors } = ctxMock.adapters.cache;
      upsertAuctionStub = stub(auctions, "upsertAuction").resolves(0);
      getAuctionStub = stub(auctions, "getAuction");
      getStatusStub = stub(auctions, "getStatus").resolves(AuctionStatus.None);
      setStatusStub = stub(auctions, "setStatus").resolves(1);
      getQueuedTransfersStub = stub(auctions, "getQueuedTransfers");
      getTaskStub = stub(auctions, "getTask").resolves(undefined);

      getExecutorDataStatusStub = stub(executors, "getExecutorDataStatus");

      storeBidStub = stub();
      storeExecutorDataStub = stub();
      getOperationsStub.returns({
        auctions: {
          storeBid: storeBidStub,
        },
        executor: {
          storeExecutorData: storeExecutorDataStub,
        },
      });
    });

    after(() => {
      fastifyApp.close();
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
      const bid = mock.entity.bid();
      const data: ExecuteFastApiPostBidReq = bid;

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-fast",
        payload: data,
      });

      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).message).to.be.eq("Bid received");
      expect(storeBidStub.callCount).to.be.eq(1);
      expect(storeBidStub.getCall(0).args.slice(0, 1)).to.be.deep.eq([bid]);
    });

    it("should fail to post a execute-slow data", async () => {
      storeExecutorDataStub.throws();
      const mockExecutorData: ExecutorPostDataRequest = {
        transferId: mkBytes32(),
        origin: "13337",
        executorVersion: "0.0.1",
        relayerFee: {
          amount: "0",
          asset: mkAddress(),
        },
        encodedData: "0xabcde",
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-slow",
        payload: mockExecutorData,
      });

      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should succeed to post a execute-slow data", async () => {
      storeExecutorDataStub.resolves();
      const mockExecutorData: ExecutorPostDataRequest = {
        transferId: mkBytes32(),
        origin: "13337",
        executorVersion: "0.0.1",
        relayerFee: {
          amount: "0",
          asset: mkAddress(),
        },
        encodedData: "0xabcde",
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-slow",
        payload: mockExecutorData,
      });

      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).message).to.be.eq("executor data received");
      expect(storeExecutorDataStub.callCount).to.be.eq(1);
      expect(storeExecutorDataStub.getCall(0).args.slice(0, 1)).to.be.deep.eq([mockExecutorData]);
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

    it("happy: should get 500 if getting queued transfers fails ", async () => {
      const transferIds = [getRandomBytes32(), getRandomBytes32()];
      getQueuedTransfersStub.throws();

      const response = await fastifyApp.inject({
        method: "GET",
        url: "/queued",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("should get 500 on non-existent auction", async () => {
      getStatusStub.resolves(AuctionStatus.None);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-fast/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("should get 500 on non-existent auction instance", async () => {
      getStatusStub.resolves(AuctionStatus.Queued);
      getAuctionStub.resolves(undefined);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-fast/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should get 200", async () => {
      getStatusStub.resolves(AuctionStatus.Queued);
      const bid1 = mock.entity.bid({ router: mkAddress("0x111") });
      const bid2 = mock.entity.bid({ router: mkAddress("0x222") });
      getAuctionStub.resolves({ bids: { bid1, bid2 }, timestamp: 1000 });
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-fast/badid",
      });
      expect(response.statusCode).to.be.eq(200);
    });

    it("should get 500 if getting executorDataStatus fails", async () => {
      getExecutorDataStatusStub.throws();
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-slow/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should get 200", async () => {
      getExecutorDataStatusStub.resolves(ExecutorDataStatus.Completed);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-slow/badid",
      });
      expect(response.statusCode).to.be.eq(200);
    });

    it("happy: should receive 500 error if handling the bid fails", async () => {
      storeBidStub.throws(new Error("Handling the bid failed!"));
      const bid = mock.entity.bid();
      const data: ExecuteFastApiPostBidReq = bid;

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-fast",
        payload: data,
      });

      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should call clearCache", async () => {
      ctxMock.config.server.adminToken = "good-token <3";
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/clear-cache",
        payload: {
          adminToken: "good-token <3",
        },
      });
      expect(response.statusCode).to.be.eq(200);
    });

    it("should reject clearCache with incorrect admin token", async () => {
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/clear-cache",
        payload: {
          adminToken: "bad-token >:(",
        },
      });
      expect(response.statusCode).to.be.eq(401);
    });
  });
});
