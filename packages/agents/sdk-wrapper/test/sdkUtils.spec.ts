import { reset, restore, stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";
import { mock } from "./mock";
import { SdkUtils } from "../src/sdkUtils";
import * as MockableFns from "../src/mockable";

import { expect } from "@connext/nxtp-utils";
import {
  SdkEnoughRouterLiquidityParams,
  SdkCheckRouterLiquidityParams,
  SdkGetRouterLiquidityParams,
  SdkGetRoutersDataParams,
  SdkGetTransfersParams,
  SdkGetLatestAssetPriceParams,
} from "../src/sdk-types";

const mockConfig = mock.config();
const mockChainData = mock.chainData();

describe("#SDKUtils", () => {
  let sdkUtils: SdkUtils;
  let axiosPostStub: SinonStub;
  let expectedBaseUri: string;

  beforeEach(async () => {
    axiosPostStub = stub(MockableFns, "axiosPost");
    sdkUtils = await SdkUtils.create(mockConfig, undefined, mockChainData);
    expectedBaseUri = sdkUtils.baseUri;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(sdkUtils).to.not.be.undefined;
      expect(sdkUtils.config).to.not.be.null;
      expect(sdkUtils.chainData).to.not.be.null;

      expect(sdkUtils.getRoutersData).to.be.a("function");
      expect(sdkUtils.getRouterLiquidity).to.be.a("function");
      expect(sdkUtils.getTransfers).to.be.a("function");
      expect(sdkUtils.checkRouterLiquidity).to.be.a("function");
    });
  });

  describe("#getRoutersData", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getRoutersData";
      const expectedArgs: SdkGetRoutersDataParams = {
        order: {
          orderBy: "balance",
          ascOrDesc: "desc",
        },
      };
      const expectedRes = [];

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.getRoutersData(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with default body if params are empty", async () => {
      const expectedEndpoint = "/getRoutersData";
      const expectedRes = [];

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.getRoutersData();

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {});
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getRouterLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getRouterLiquidity";
      const expectedArgs: SdkGetRouterLiquidityParams = {
        order: {
          orderBy: "balance",
          ascOrDesc: "desc",
        },
      };
      const expectedRes = {};

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.getRouterLiquidity(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with default body if params are empty", async () => {
      const expectedEndpoint = "/getRouterLiquidity";
      const expectedRes = [];

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.getRouterLiquidity();

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {});
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getTransfers", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getTransfers";
      const expectedArgs: SdkGetTransfersParams = {
        range: {
          limit: 100,
          offset: 10,
        },
      };
      const expectedRes = [];

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.getTransfers(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with default body if params are empty", async () => {
      const expectedEndpoint = "/getTransfers";
      const expectedRes = [];

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.getTransfers();

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {});
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#checkRouterLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/checkRouterLiquidity";
      const expectedArgs: SdkCheckRouterLiquidityParams = {
        domainId: mock.domain.A,
        asset: mock.asset.A.address,
        topN: undefined,
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkUtils.checkRouterLiquidity(expectedArgs.domainId, expectedArgs.asset);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#enoughRouterLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/enoughRouterLiquidity";
      const expectedArgs: SdkEnoughRouterLiquidityParams = {
        domainId: mock.domain.A,
        asset: mock.asset.A.address,
        minLiquidity: 100,
        maxN: undefined,
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkUtils.checkRouterLiquidity(expectedArgs.domainId, expectedArgs.asset);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getLatestAssetPrice", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getLatestAssetPrice";
      const expectedArgs: SdkGetLatestAssetPriceParams = {
        domainId: mock.domain.A,
        asset: mock.asset.A.address,
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkUtils.getLatestAssetPrice(expectedArgs.domainId, expectedArgs.asset);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });
});
