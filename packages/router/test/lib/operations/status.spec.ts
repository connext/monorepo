import { expect, createLoggingContext, mkBytes32 } from "@connext/nxtp-utils";

import { getStatus } from "../../../src/lib/operations/status";

import { ctxMock } from "../../globalTestHook";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32("0xabc"));

describe("Status Operation", () => {
  it("should work", async () => {
    const ctxMockAssets = ctxMock.config.swapPools[0].assets;
    const res = await getStatus(requestContext);
    const resSwapPools = res.swapPools;

    ctxMockAssets.forEach(({ assetId, chainId }) => {
      expect(resSwapPools.get(chainId).includes(assetId)).to.be.true;
    });
  });
});
