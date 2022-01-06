import { expect, mkAddress } from "@connext/nxtp-utils";
import Sinon, { stub, restore, reset, SinonStub, SinonStubbedInstance, createStubInstance } from "sinon";
import { TransactionService } from "@connext/nxtp-txservice";

import * as ConfigFns from "../src/config";
import { configMock, chainDataMock } from "./utils";

import { getSwapPoolMap } from "../src/router";
import { constants } from "ethers";

describe("Config", () => {
  describe("#getSwapPoolMap", () => {
    it("should error if router contract not present for a chain", async () => {
      const txService = createStubInstance(TransactionService);
      txService.getCode.onSecondCall().resolves("0x");
      await expect(
        getSwapPoolMap({
          routerAddress: mkAddress(),
          swapPools: [
            {
              name: "TEST",
              assets: [
                { chainId: 1, assetId: constants.AddressZero },
                { chainId: 2, assetId: constants.AddressZero },
              ],
            },
          ],
          isRouterContract: true,
          txService: txService as any,
        }),
      ).to.be.rejectedWith("Router Contract isn't deployed");
    });
  });
});
