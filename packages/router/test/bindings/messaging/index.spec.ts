import { expect } from "@connext/nxtp-utils";
import { bindMessaging } from "../../../src/bindings/messaging";
import { messagingMock } from "../../globalTestHook";

describe("bindMessaging", () => {
  it("should work", async () => {
    await bindMessaging();
    expect(messagingMock.subscribeToAuctionRequest.callCount).to.be.eq(1);
    expect(messagingMock.subscribeToMetaTxRequest.callCount).to.be.eq(1);
  });

  it("should fail if subscribeToAuctionRequest fails", async () => {
    messagingMock.subscribeToAuctionRequest.rejects(new Error("fail"));
    await expect(bindMessaging()).to.be.rejectedWith("fail");
  });

  it("should fail if subscribeToMetaTxRequest fails", async () => {
    messagingMock.subscribeToMetaTxRequest.rejects(new Error("fail"));
    await expect(bindMessaging()).to.be.rejectedWith("fail");
  });
});
