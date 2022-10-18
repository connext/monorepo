import { createRequestContext, expect, mkHash } from "@connext/nxtp-utils";
import { stub } from "sinon";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromPolygonRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";

let generateExitPayloadStub;

describe("Helpers: Polygon", () => {
  beforeEach(() => {
    generateExitPayloadStub = stub(MockableFns, "generateExitPayload").resolves("0xdeadbeef");
  });

  it("should throw error if undefined", async () => {
    generateExitPayloadStub.resolves(undefined);
    await expect(
      getProcessFromPolygonRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
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
      _requestContext: createRequestContext("foo"),
    });
    expect(args).to.deep.eq(["0xdeadbeef"]);
  });
});
