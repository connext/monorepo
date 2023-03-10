import { createRequestContext, expect, mkHash } from "@connext/nxtp-utils";
import { stub } from "sinon";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromPolygonRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { AlreadyProcessed, NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";

let generateExitPayloadStub;
let getContractStub;

describe("Helpers: Polygon", () => {
  beforeEach(() => {
    generateExitPayloadStub = stub(MockableFns, "generateExitPayload").resolves({
      payload: "0xdeadbeef",
      hash: mkHash("0xaa"),
    });
    getContractStub = stub(MockableFns, "getContract").returns({
      processedExits: stub().resolves(false),
    } as any);
  });

  it("should throw error if undefined", async () => {
    generateExitPayloadStub.resolves({ payload: undefined, hash: undefined });
    await expect(
      getProcessFromPolygonRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        message: mkHash("0xaa"),
        blockNumber: 111,
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should throw error if already process", async () => {
    generateExitPayloadStub.resolves({ payload: "0xdeadbeef", hash: mkHash("0xaa") });
    getContractStub.returns({
      processedExits: stub().resolves(true),
    });
    await expect(
      getProcessFromPolygonRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        message: mkHash("0xaa"),
        blockNumber: 111,
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(AlreadyProcessed);
  });

  it("should work", async () => {
    const args = await getProcessFromPolygonRootArgs({
      spokeChainId: 1,
      spokeDomainId: "1",
      spokeProvider: "world",
      hubChainId: 2,
      hubDomainId: "2",
      hubProvider: "hello",
      sendHash: mkHash("0xbaa"),
      message: mkHash("0xaa"),
      blockNumber: 111,
      _requestContext: createRequestContext("foo"),
    });
    expect(args).to.deep.eq(["0xdeadbeef"]);
  });
});
