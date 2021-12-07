import { createLoggingContext, expect, jsonifyError, mkAddress, mkBytes32, StatusResponse } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";
import { messagingMock } from "../../globalTestHook";
import * as operations from "../../../src/lib/operations";
import { statusRequestBinding } from "../../../src/bindings/messaging/statusRequest";
import { configMock } from "../../utils";

const inbox = "inbox";
const from = mkAddress("0xfff");
const data = "data";
const err = jsonifyError(new Error("fail"));

const statusResponse: StatusResponse = {
  routerAddress: mkAddress("0xa"),
  routerVersion: "1.0.0",
  signerAddress: mkAddress("0xb"),
  trackerLength: 123,
  swapPools: configMock.swapPools as any,
  supportedChains: Object.keys(configMock.chainConfig).map((c) => +c),
};

let getStatusStub: SinonStub;

const { requestContext } = createLoggingContext("statusRequestBinding", undefined, mkBytes32());

describe("#statusRequestBinding", () => {
  beforeEach(async () => {
    getStatusStub = stub().resolves(statusResponse);
    stub(operations, "getOperations").returns({
      getStatus: getStatusStub,
    } as any);
  });

  it("should work", async () => {
    await statusRequestBinding(from, inbox, data, undefined, requestContext);
    expect(messagingMock.publishStatusResponse.callCount).to.be.eq(1);
    expect(messagingMock.publishStatusResponse.calledOnceWithExactly(from, inbox, statusResponse)).to.be.true;
  });

  it("should do nothing if there is an error", async () => {
    await statusRequestBinding(from, inbox, data, err, requestContext);
    expect(messagingMock.publishStatusResponse.callCount).to.be.eq(0);
  });
});
