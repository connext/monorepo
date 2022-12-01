import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { createStubInstance } from "sinon";

import { totalLockedAssets, totalMintedAssets } from "../src/asset";
import { CallContext } from "../src/types";

describe.only("Watcher Adapter: Asset", () => {
  let canonicalAssetAddress = mkAddress("0x123123123");
  let canonicalId = mkBytes32(canonicalAssetAddress);
  let canonicalDomain = "1337";
  let context: CallContext;
  let readTxResult = "test 123";

  beforeEach(() => {
    const txservice = createStubInstance(TransactionService, { readTx: Promise.resolve(readTxResult) });
    const logger = createStubInstance(Logger);
    context = {
      txservice,
      logger,
      requestContext: createRequestContext("Watcher Adapter: Asset tests"),
    };
  });

  describe("#totalLockedAssets", () => {
    it("should query custodied on-chain", async () => {
      const result = await totalLockedAssets(context, {
        canonicalId,
        canonicalDomain,
        address: canonicalAssetAddress,
      });
    });
  });
});
