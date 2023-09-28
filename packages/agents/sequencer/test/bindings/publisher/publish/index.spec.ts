import { SinonStub, stub, restore, reset } from "sinon";
import { expect } from "@connext/nxtp-utils";

import * as BindingFns from "../../../../src/bindings/publisher/publish";
import { mock } from "../../../mock";
import { ctxMock, getOperationsStub } from "../../../globalTestHook";

describe("Bindings:Publisher", () => {
  describe("#bindHTTPSubscriber", () => {
    // operations
    let storeFastPathDataStub: SinonStub;
    let storeSlowPathDataStub: SinonStub;
    beforeEach(() => {
      storeFastPathDataStub = stub();
      storeSlowPathDataStub = stub();
      getOperationsStub.returns({
        execute: {
          storeFastPathData: storeFastPathDataStub,
          storeSlowPathData: storeSlowPathDataStub,
        },
      });
    });

    after(() => {
      restore();
      reset();
    });

    it("happy: should succeed fastpath", async () => {
      const channel = await ctxMock.adapters.mqClient.createChannel();
      (channel as any).consume = stub().resolves();
      await BindingFns.bindHTTPSubscriber("http_test", channel);
    });
    it("should fail fastpath", async () => {
      const channel = await ctxMock.adapters.mqClient.createChannel();
      (channel as any).consume = stub().throws();
      await BindingFns.bindHTTPSubscriber("http_test", channel);
    });
  });
});
