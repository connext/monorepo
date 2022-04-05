import { SinonStub, stub, restore, reset } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";

import * as BindingFns from "../../../src/bindings/server";
import * as BidFns from "../../../src/lib/operations/bid";
import { mock } from "../../mock";


let fastifyApp: FastifyInstance;
describe("bindServer", () => {
  describe("#bindServer", () => {
    let handleBidStub: SinonStub;
    beforeEach(() => {
      handleBidStub = stub(BidFns, "handleBid");
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
      handleBidStub.resolves(null);
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/bid",
        payload: mock.entity.bid(),
      });
      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).message).to.be.eq("Sent bid to auctioneer");
    });
    it("happy: should get empty pending bids", async () => {
      handleBidStub.resolves(null);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/pending",
      });
      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).pending.length).to.eq(0);
    });
    it("happy: should get 500 on wrong transfer id", async () => {
      handleBidStub.resolves(null);
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/bid/noid",
      });
      expect(response.statusCode).to.be.eq(200);
      expect(JSON.parse(response.payload).bids.length).to.eq(0);
    });
    it("happy: should receive 500 error if handling the bid fails", async () => {
      handleBidStub.throws(new Error("Handling the bid failed!"));
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/bid",
        payload: mock.entity.bid(),
      });
      expect(response.statusCode).to.be.eq(500);
    });
  });
});
