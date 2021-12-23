import { expect, createLoggingContext, mkBytes32, StatusResponse, mkAddress } from "@connext/nxtp-utils";

import { getStatus } from "../../../src/lib/operations/status";

import { version } from "../../../package.json";
import { getContext } from "../../../src/router";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32("0xabc"));

describe("Status Operation", () => {
  it("should work", async () => {
    const { signerAddress, routerAddress } = getContext();
    const chainAssetMap: Map<number, string[]> = new Map();
    chainAssetMap.set(1337, [mkAddress("0xc")]);
    chainAssetMap.set(1338, [mkAddress("0xf")]);
    const statusResponse: StatusResponse = {
      isRouterContract: false,
      routerVersion: version,
      routerAddress: routerAddress,
      signerAddress: signerAddress,
      trackerLength: 0,
      activeTransactionsLength: 0,
      swapPools: chainAssetMap,
      supportedChains: [1337, 1338],
    };

    const res = await getStatus(requestContext);
    expect(res.toString()).to.be.eq(statusResponse.toString());
  });
});
