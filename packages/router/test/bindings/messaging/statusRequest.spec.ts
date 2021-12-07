import {
  createLoggingContext,
  expect,
  jsonifyError,
  mkAddress,
  mkBytes32,
  StatusResponse,
  txDataMock,
} from "@connext/nxtp-utils";
import { reset, restore, SinonStub, stub } from "sinon";
import { statusRequestBinding } from "../../../src/bindings/messaging/statusRequest";
import { messagingMock } from "../../globalTestHook";
import * as operations from "../../../src/lib/operations";

let getStatusStub: SinonStub;

const inbox = "inbox";
const from = mkAddress("0xfff");
const mockSwapPools: Map<number, string[]> = new Map();
mockSwapPools.set(txDataMock.sendingChainId, [txDataMock.sendingAssetId]);
mockSwapPools.set(txDataMock.receivingChainId, [txDataMock.receivingAssetId]);
const mockStatusResponse: StatusResponse = {
  routerVersion: "v69.420",
  routerAddress: mkAddress("0xabc123"),
  signerAddress: mkAddress("0xdef456"),
  trackerLength: 12,
  swapPools: mockSwapPools,
  supportedChains: [txDataMock.sendingChainId, txDataMock.receivingChainId],
};

const { requestContext } = createLoggingContext("statusRequestBinding", undefined, mkBytes32());

describe("#statusRequestBinding", () => {
  beforeEach(async () => {
    getStatusStub = stub().resolves(mockStatusResponse);
    stub(operations, "getOperations").returns({
      getStatus: getStatusStub,
    } as any);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should work", async () => {
    await statusRequestBinding(from, inbox, undefined, undefined, requestContext);
    expect(getStatusStub.callCount).to.eq(1);
    expect(messagingMock.publishStatusResponse).to.be.calledOnceWith(from, inbox, mockStatusResponse);
  });

  it("should return without publishing if error in status response", async () => {
    await statusRequestBinding(from, inbox, undefined, jsonifyError(new Error("fail")), requestContext);
    expect(getStatusStub.callCount).to.eq(0);
    expect(messagingMock.publishStatusResponse.callCount).to.eq(0);
  });
});
