import { restore, reset } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { FastifyInstance } from "fastify";

import * as BindingFns from "../../../../src/bindings/subscriber";

let fastifyApp: FastifyInstance;
describe("Bindings:HealthServer", () => {
  describe("#bindHealthServer", () => {
    beforeEach(() => {});
  });

  after(() => {
    fastifyApp.close();
    restore();
    reset();
  });

  it("happy: should respond with `pong`", async () => {
    fastifyApp = await BindingFns.bindHealthServer();
    const response = await fastifyApp.inject({
      method: "GET",
      url: "/ping",
    });
    expect(response.statusCode).to.be.eq(200);
    expect(response.payload).to.be.eq("pong\n");
  });
});
