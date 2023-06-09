import { reset, restore, stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";
import { mock } from "./mock";
import { SdkUtils } from "../src/sdkUtils";
import * as MockableFns from "../src/mockable";

import { expect } from "@connext/nxtp-utils";
import {
  SdkCheckRouterLiquidityParams,
  SdkGetRouterLiquidityParams,
  SdkGetRoutersDataParams,
  SdkGetTransfersParams,
} from "@connext/sdk-core";

const mockConfig = mock.config();
const mockChainData = mock.chainData();

describe.only("#SDKUtils", () => {
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
  });

  describe("#checkRouterLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/checkRouterLiquidity";
      const expectedArgs: SdkCheckRouterLiquidityParams = {
        domainId: mock.domain.A,
        asset: mock.asset.A.address,
        topN: undefined,
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkUtils.checkRouterLiquidity(expectedArgs.domainId, expectedArgs.asset);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });
});
