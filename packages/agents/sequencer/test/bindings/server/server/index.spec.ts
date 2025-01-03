import { SinonStub, stub, restore, reset } from "sinon";
import {
  ExecuteFastApiPostBidReq,
  ExecStatus,
  expect,
  getRandomBytes32,
  mkAddress,
  ExecutorPostDataRequest,
  mkBytes32,
} from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";
import Broker from "amqplib";

import * as BindingFns from "../../../../src/bindings/server";
import { mock } from "../../../mock";
import { ctxMock, getOperationsStub } from "../../../globalTestHook";

let fastifyApp: FastifyInstance;
let channel: Broker.Channel;
describe("Bindings:Server", () => {
  describe("#bindServer", () => {
    // db
    let getAuctionStub: SinonStub;
    let getTaskStub: SinonStub;
    let upsertAuctionStub: SinonStub;
    let getStatusStub: SinonStub;
    let setStatusStub: SinonStub;
    let getExecStatusStub: SinonStub;

    // operations
    let storeFastPathDataStub: SinonStub;
    let storeSlowPathDataStub: SinonStub;
    let brokerStub: SinonStub;

    beforeEach(() => {
      const { auctions, executors } = ctxMock.adapters.cache;
      upsertAuctionStub = stub(auctions, "upsertAuction").resolves(0);
      getAuctionStub = stub(auctions, "getAuction");
      getStatusStub = stub(auctions, "getExecStatus").resolves(ExecStatus.None);
      setStatusStub = stub(auctions, "setExecStatus").resolves(1);
      getTaskStub = stub(auctions, "getMetaTxTask").resolves(undefined);

      getExecStatusStub = stub(executors, "getExecStatus");

      storeFastPathDataStub = stub();
      storeSlowPathDataStub = stub();
      getOperationsStub.returns({
        execute: {
          storeFastPathData: storeFastPathDataStub,
          storeSlowPathData: storeSlowPathDataStub,
        },
      });
      brokerStub = stub(Broker, "connect").resolves();
    });

    after(() => {
      if (fastifyApp) {
        (async () => {
          await fastifyApp.close();
        })();
      }
      restore();
      reset();
    });

    it("happy: should respond with `pong`", async () => {
      channel = await ctxMock.adapters.mqClient.createChannel();
      fastifyApp = await BindingFns.bindServer("http_test", channel);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/ping",
      });
      expect(response.statusCode).to.be.eq(200);
      expect(response.payload).to.be.eq("pong\n");
    });

    it("should fail to post a bid if publish fails", async () => {
      (channel.publish as SinonStub).throws();
      const bid = mock.entity.bid();
      const data: ExecuteFastApiPostBidReq = bid;

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-fast",
        payload: data,
      });

      expect(response.statusCode).to.be.eq(500);
    });

    it("should fail to post a bid if data is invalid", async () => {
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-fast",
        payload: {},
      });

      expect(response.statusCode).to.be.eq(400);
    });

    it("should fail to post a bid if data has invalid attribute", async () => {
      const invalidBid: any = {
        ...mock.entity.bid(),
        signatures: {
          99999: -1234,
        },
      };
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-fast",
        payload: invalidBid,
      });

      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should succeed to post a bid", async () => {
      (channel.publish as SinonStub).resolves();
      const bid = mock.entity.bid();
      const data: ExecuteFastApiPostBidReq = bid;

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-fast",
        payload: data,
      });

      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).message).to.be.eq("Bid received");
    });

    it("should fail to post execute-slow data if publish fails", async () => {
      (channel.publish as SinonStub).throws();
      const mockExecutorData: ExecutorPostDataRequest = {
        transferId: mkBytes32(),
        origin: "13337",
        executorVersion: "0.0.1",
        routerAddress: mkAddress(),
        encodedData: "0xabcde",
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-slow",
        payload: mockExecutorData,
      });

      expect(response.statusCode).to.be.eq(500);
    });

    it("should fail to post execute-slow when data invalid", async () => {
      (channel.publish as SinonStub).resolves();
      const badExecutorData = {
        transferId: mkBytes32(),
        origin: "13337",
        executorVersion: "0.0.1",
        routerAddress: mkAddress(),
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-slow",
        payload: badExecutorData,
      });

      expect(response.statusCode).to.be.eq(400);
    });

    it("happy: should succeed to post an execute-slow data", async () => {
      (channel.publish as SinonStub).resolves();
      const mockExecutorData: ExecutorPostDataRequest = {
        transferId: mkBytes32(),
        origin: "13337",
        executorVersion: "0.0.1",
        encodedData: "0xabcde",
        routerAddress: mkAddress(),
      };

      const response = await fastifyApp.inject({
        method: "POST",
        url: "/execute-slow",
        payload: mockExecutorData,
      });

      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).message).to.be.eq("executor data received");
    });

    it("should get 500 on non-existent auction", async () => {
      getStatusStub.resolves(ExecStatus.None);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-fast/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("should get 500 on non-existent auction instance", async () => {
      getStatusStub.resolves(ExecStatus.Enqueued);
      getAuctionStub.resolves(undefined);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-fast/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should get 200", async () => {
      getStatusStub.resolves(ExecStatus.Enqueued);
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
      getExecStatusStub.throws();
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-slow/badid",
      });
      expect(response.statusCode).to.be.eq(500);
    });

    it("happy: should get 200", async () => {
      getExecStatusStub.resolves(ExecStatus.Completed);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/execute-slow/badid",
      });
      expect(response.statusCode).to.be.eq(200);
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
