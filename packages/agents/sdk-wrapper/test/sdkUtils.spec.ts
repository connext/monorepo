import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { SdkUtils } from "../src/sdkUtils";

import * as ConfigFns from "@connext/sdk-core/src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import * as MockableFns from "../src/mockable";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("#SDKUtils", () => {
  let sdkUtils: SdkUtils;
  let config: ConfigFns.SdkConfig;
  let axiosPostStub: SinonStub;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    axiosPostStub = stub(MockableFns, "axiosPost");

    chainreader = createStubInstance(ChainReader);
    config = ConfigFns.getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkUtils = await SdkUtils.create(mockConfig, undefined, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getRoutersData", async () => {
    it("Happy: should return router data", async () => {
      axiosPostStub.resolves({
        data: [
          {
            address: "0xe879261f44041e030404ac9847f0cee2591f62f5",
            asset_canonical_id: null,
            asset_domain: null,
            router_address: null,
            balance: null,
            local: null,
            adopted: null,
            canonical_id: null,
            canonical_domain: null,
            domain: null,
            key: null,
            id: null,
            fees_earned: null,
            locked: null,
            supplied: null,
            removed: null,
            decimal: null,
            asset_usd_price: 0,
            balance_usd: null,
            fee_earned_usd: null,
            locked_usd: null,
            supplied_usd: null,
            removed_usd: null,
          },
        ],
      });
      const routerData = await sdkUtils.getRoutersData();
      expect(routerData.length).to.be.greaterThan(0);
    });
  });

  describe("#getRouterLiquidity", async () => {
    it("Happy: should return router data", async () => {
      axiosPostStub.resolves({
        data: "0123",
      });
      const routerData = await sdkUtils.getRouterLiquidity();
      expect(routerData).to.be.eq("0123");
    });
  });

  describe("#getTransfers", async () => {
    it("Happy: should return get transfer", async () => {
      axiosPostStub.resolves({
        data: [{ transfer_id: "0xdd3e203a8633f8d6329214a236eb64651301568e79691918062e3c738d309f8a" }],
      });
      const transfers = await sdkUtils.getTransfers();
      expect(transfers[0].transfer_id).to.be.eq("0xdd3e203a8633f8d6329214a236eb64651301568e79691918062e3c738d309f8a");
    });
  });

  describe("#checkRouterLiquidity", async () => {
    it("Happy: should return checkRouterLiquidity", async () => {
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x00",
        },
      });

      const liquidity = await sdkUtils.checkRouterLiquidity(mock.domain.A, mock.asset.A.address);
      expect(liquidity).not.to.be.null;
    });
  });
});