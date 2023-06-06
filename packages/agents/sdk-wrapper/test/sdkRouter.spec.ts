import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect, Logger, mkAddress } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { SdkRouter } from "../src/sdkRouter";

import * as ConfigFns from "@connext/sdk-core/src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import * as MockableFns from "../src/mockable";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("#SDKRouter", () => {
  let sdkRouter: SdkRouter;
  let config: ConfigFns.SdkConfig;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = ConfigFns.getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkRouter = await SdkRouter.create(mockConfig, undefined, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#addLiquidityForRouter", async () => {
    let axiosPostStub: SinonStub;
    axiosPostStub = stub(MockableFns, "axiosPost");
    beforeEach(async () => {
      axiosPostStub = stub(MockableFns, "axiosPost");
    });

    it("Happy: should return router liquidity", async () => {
      const params = {
        domainId: "1869640809",
        amount: "1000000000000000000",
        tokenAddress: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
        router: "0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7",
      };
      axiosPostStub.resolves({
        data: {
          data: "0x2d3f9ef60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000067e51f46e8e14d4e4cab9df48c59ad8f512486dd00000000000000000000000071dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const routerLiquidity = await sdkRouter.addLiquidityForRouter(params);
      expect(routerLiquidity.data).to.be.eq(
        "0x2d3f9ef60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000067e51f46e8e14d4e4cab9df48c59ad8f512486dd00000000000000000000000071dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
      );
    });
  });

  describe("#removeRouterLiquidity", async () => {
    let axiosPostStub: SinonStub;
    axiosPostStub = stub(MockableFns, "axiosPost");
    beforeEach(async () => {
      axiosPostStub = stub(MockableFns, "axiosPost");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("Happy: should return remove Router data", async () => {
      const params = {
        domainId: "1869640809",
        amount: "1000000000000000000",
        tokenAddress: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
        recipient: "0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7",
      };
      axiosPostStub.resolves({
        data: {
          data: "0x2d3f9ef60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000067e51f46e8e14d4e4cab9df48c59ad8f512486dd00000000000000000000000071dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const routerLiquidity = await sdkRouter.removeRouterLiquidity(params);
      expect(routerLiquidity.data).to.be.eq(
        "0x2d3f9ef60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000067e51f46e8e14d4e4cab9df48c59ad8f512486dd00000000000000000000000071dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
      );
    });
  });

  describe("#removeRouterLiquidityFor", async () => {
    let axiosPostStub: SinonStub;
    axiosPostStub = stub(MockableFns, "axiosPost");
    beforeEach(async () => {
      axiosPostStub = stub(MockableFns, "axiosPost");
    });

    it("Happy: should return remove Router liquidity", async () => {
      const params = {
        domainId: "1869640809",
        amount: "1000000000000000000",
        tokenAddress: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
        recipient: "0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7",
        router: "0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7",
      };
      axiosPostStub.resolves({
        data: {
          data: "0x2d3f9ef60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000067e51f46e8e14d4e4cab9df48c59ad8f512486dd00000000000000000000000071dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const routerLiquidity = await sdkRouter.removeRouterLiquidityFor(params);
      expect(routerLiquidity.data).to.be.eq(
        "0x2d3f9ef60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000067e51f46e8e14d4e4cab9df48c59ad8f512486dd00000000000000000000000071dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
      );
    });
  });
});
