import { SinonStub, stub, restore, reset } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { register } from "prom-client";

import * as binding from "../../../src/bindings/server";
import { stubContext } from "../../mock";
import { FastifyInstance } from "fastify";

let fastifyApp: FastifyInstance;
describe("Bindings:Server", async () => {
  let metricsStub: SinonStub;
  beforeEach(() => {
    metricsStub = stub(register, "metrics");
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#bindServer", () => {
    before(async () => {
      fastifyApp = await binding.bindServer();
    });
    it("should respond with `pong`", async () => {
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/ping",
      });
      expect(response.payload).to.be.eq("pong\n");
    });
    it("should respond with config", async () => {
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/config",
      });
      console.log({ response });
      expect(response.statusCode).to.be.eq(200);
    });
    it("should respond with metrics", async () => {
      metricsStub.resolves("Happy metrics!");
      const response = await fastifyApp.inject({
        method: "GET",
        url: "/metrics",
      });

      expect(response.statusCode).to.be.eq(200);
    });
  });

  describe("api", () => {
    let mockContext: any;
    let mockRes: any;
    let sendStub: SinonStub;
    let statusStub: SinonStub;
    beforeEach(() => {
      mockContext = stubContext();
      sendStub = stub().resolves();
      statusStub = stub().returns({ send: sendStub });
      mockRes = {
        status: statusStub,
      };
    });

    describe("auth", () => {
      describe("#admin", () => {
        it("happy: should pass through if admin token valid", async () => {
          const body = { adminToken: mockContext.config.server.adminToken };
          const nestedStub = stub().resolves();
          await expect(binding.api.auth.admin(body, mockRes, nestedStub)).to.be.fulfilled;
          expect(nestedStub.called).to.be.true;
          expect(mockRes.status.called).to.be.false;
        });

        it("sad: should respond with 401 if admin token invalid", async () => {
          const body = { adminToken: "l33t_h4ck3r" };
          const nestedStub = stub().resolves();
          await binding.api.auth.admin(body, mockRes, nestedStub);
          expect(nestedStub.called).to.be.false;
          expect(mockRes.status.calledWith(401)).to.be.true;
          expect(sendStub.called).to.be.true;
          expect(sendStub.getCall(0).args[0]).to.contain("Unauthorized");
        });
      });
    });

    describe("get", () => {
      describe("#ping", () => {
        it("happy: should respond with pong", async () => {
          await binding.api.get.ping(mockRes);
          expect(sendStub.calledWith("pong\n")).to.be.true;
        });
      });

      describe("#config", () => {
        it("happy: should respond with some config elements", async () => {
          const signerAddress = "0x123";
          mockContext.adapters.wallet.getAddress.resolves(signerAddress);
          await binding.api.get.config(mockRes);
          expect(sendStub.calledWith({ signerAddress })).to.be.true;
        });

        it("sad: should respond with 500 if wallet getAddress fails", async () => {
          mockContext.adapters.wallet.getAddress.rejects(new Error("nope"));
          await binding.api.get.config(mockRes);
          expect(sendStub.called).to.be.true;
          expect(sendStub.getCall(0).args[0]).to.contain({
            message: "nope",
          });
          expect(statusStub.calledWith(500)).to.be.true;
        });
      });

      describe("#metrics", () => {
        it("happy: should respond with metrics", async () => {
          const mockMetricsResult = "Happy metrics!";
          metricsStub.resolves(mockMetricsResult);
          await binding.api.get.metrics(mockRes);
          expect(sendStub.calledWith(mockMetricsResult)).to.be.true;
        });

        it("sad: if failure occurs, responds with 500 error", async () => {
          metricsStub.throws(new Error("Failed to get metrics"));
          await binding.api.get.metrics(mockRes);
          expect(sendStub.called).to.be.true;
          expect(sendStub.getCall(0).args[0]).to.contain({
            message: "Failed to get metrics",
          });
          expect(statusStub.calledWith(500)).to.be.true;
        });
      });
    });

    describe("post", () => {
      describe("#removeLiquidity", () => {
        it("not implemented", async () => {
          await binding.api.post.removeLiquidity(mockRes);
          expect(sendStub.calledWith("Not implemented")).to.be.true;
        });

        it.skip("happy: removes liquidity", async () => {});
      });

      describe("#addLiquidityFor", () => {
        it("not implemented", async () => {
          await binding.api.post.addLiquidityFor(mockRes);
          expect(sendStub.calledWith("Not implemented")).to.be.true;
        });

        it.skip("happy: adds liquidity for our router on the connext contract", async () => {});
      });
    });
  });
});
