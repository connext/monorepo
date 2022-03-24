import { SinonStub, stub, restore, reset } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";
import { parseEther } from "ethers/lib/utils";

import * as binding from "../../../src/bindings/server";
import * as BidFns from "../../../src/lib/operations/bid";
import { mock } from "../../mock";
let fastifyApp: FastifyInstance;
describe("Bindings:Server", async () => {
  describe("#bindServer", () => {
    let handleBidStub: SinonStub;
    before(async () => {
      fastifyApp = await binding.bindServer();
      handleBidStub = stub(BidFns, "handleBid");
    });
    it("happy: should respond with `pong`", async () => {
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/ping",
      });
      expect(response.statusCode).to.be.eq(200);
      expect(response.payload).to.be.eq("pong\n");
    });
    it("happy: should succeed to post a bid", async () => {
      handleBidStub.resolves();
      const response = await fastifyApp.inject({
        method: "POST",
        url: "/bid",
        payload: mock.entity.bid(),
      });
      expect(response.statusCode).to.be.eq(200);
      expect(response.payload).to.be.eq("pong\n");
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
