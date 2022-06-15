import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress, XTransferStatus, getRandomBytes32 } from "@connext/nxtp-utils";
import {
  ChainReader,
  getErc20Interface,
  getConnextInterface,
  getStableSwapFacetInterface,
} from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils } from "ethers";
import { mock } from "./mock";
import { NxtpSdkPool } from "../src/sdkPool";
import { getEnvConfig } from "../src/config";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockStableSwapFacetAddress = mockConfig.chains[mock.domain.A].deployments.stableSwapFacet;
const chainId = 1337;

describe("NxtpSdkPool", () => {
  let nxtpPool: NxtpSdkPool;
  let config;
  let chainReader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    nxtpPool = await NxtpSdkPool.create(mockConfig, undefined, mockChainData);

    (nxtpPool as any).chainReader = chainReader;

    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);
    stub(ConfigFns, "getConfig").resolves(config);
    stub(nxtpPool, "calculateTokenAmount").resolves("1");
    stub(nxtpPool, "getCanonicalTokenId").resolves("0x0");
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpPool).to.not.be.undefined;
      expect(nxtpPool.config).to.not.be.null;
      expect(nxtpPool.chainData).to.not.be.null;

      expect(nxtpPool.calculateTokenAmount).to.be.a("function");
      // TODO: add all other functions
    });
  });

  describe("#addLiquidity", () => {
    const mockAddLiquidityParams = {
      canonicalTokenId: mock.asset.A.address,
      // adoptedAsset: utils.formatBytes32String("0x0"),
      minToMint: 0,
      amounts: ["100", "200"],
      deadline: 100,
    };

    it("happy: should work", async () => {
      const data = getStableSwapFacetInterface().encodeFunctionData("addSwapLiquidity", [
        mockAddLiquidityParams.canonicalTokenId,
        mockAddLiquidityParams.amounts,
        mockAddLiquidityParams.minToMint,
        mockAddLiquidityParams.deadline,
      ]);

      const mockAddLiquidityRequest: providers.TransactionRequest = {
        to: mockStableSwapFacetAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
        chainId,
      };

      const res = await nxtpPool.addLiquidity(
        "1337",
        utils.formatBytes32String("0x0"),
        mockAddLiquidityParams.amounts,
        mockAddLiquidityParams.minToMint,
      );
      expect(res).to.be.deep.eq(mockAddLiquidityRequest);
    });
  });
});
