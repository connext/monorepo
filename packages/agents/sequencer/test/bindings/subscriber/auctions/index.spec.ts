import { expect } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { bindSubscriber } from "../../../../src/bindings/subscriber";
import { ctxMock } from "../../../globalTestHook";

describe("Bindings:Auctions", () => {
  let spawnStub: SinonStub;
  beforeEach(() => {
    spawnStub = stub().resolves();
  });

  it("should handle undefined handler", async () => {
    await bindSubscriber("1111");
    expect(ctxMock.adapters.mqClient.handle).to.be.calledOnceWith("1111");
  });
  it("should handle valid message", async () => {
    const message = { body: { transferId: "transfer_1", originDomain: "1111" } };
    ctxMock.adapters.mqClient.handle = stub().yields(message);
    await bindSubscriber("1111");
    expect(ctxMock.adapters.mqClient.handle).to.be.calledOnceWith("1111");
  });
  it("should handle missing transferId", async () => {
    const message = { body: { originDomain: "1111" } };
    ctxMock.adapters.mqClient.handle = stub().yields(message);
    await bindSubscriber("1111");
    expect(ctxMock.adapters.mqClient.handle).to.be.calledOnceWith("1111");
  });
});
