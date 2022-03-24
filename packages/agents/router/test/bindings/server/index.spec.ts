import { SinonStub, stub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import * as binding from "../../../src/bindings/server";
import { stubContext } from "../../mock";

describe("Bindings:Server", async () => {
  describe("#bindServer", () => {
    it("happy: should bind fastify server endpoints", async () => {
      await expect(binding.bindServer()).to.be.fulfilled;
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

      describe.skip("#metrics", () => {
        it("happy: should respond with metrics", async () => {
          await binding.api.get.metrics(mockRes);
          expect(sendStub.calledWith(mockContext.register.metrics())).to.be.true;
        });

        it("sad: if failure occurs, responds with 500 error", async () => {});
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
