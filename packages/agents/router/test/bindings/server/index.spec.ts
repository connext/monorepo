import { expect } from "@connext/nxtp-utils";
import * as binding from "../../../src/bindings/server";

describe("Bindings:Server", async () => {
  describe("#bindServer", () => {
    it("happy: should bind fastify server endpoints", async () => {
      expect(await binding.bindServer()).to.be.fulfilled;
    });
  });
});
