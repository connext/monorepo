import { reset, restore, stub } from "sinon";
import { expect, XTransferStatus, getRandomBytes32, XTransferErrorStatus, mkAddress } from "@connext/nxtp-utils";
import { mock } from "./mock";
import { SdkUtils } from "../src/sdkUtils";
import { getEnvConfig } from "../src/config";
import { UriInvalid } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();
const chainId = 1337;

describe("SdkUtils", () => {
  let nxtpUtils: SdkUtils;
  let config: ConfigFns.SdkConfig;
  let stubAxiosGetRequest;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);
    nxtpUtils = await SdkUtils.create(mockConfig, undefined, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpUtils).to.not.be.undefined;
      expect(nxtpUtils.config).to.not.be.null;
      expect(nxtpUtils.chainData).to.not.be.null;

      expect(nxtpUtils.getRoutersData).to.be.a("function");
      expect(nxtpUtils.getAssetsData).to.be.a("function");
      expect(nxtpUtils.getTransfers).to.be.a("function");
    });
  });

  describe("#getRoutersData", () => {
    beforeEach(async () => {
      stubAxiosGetRequest = stub(SharedFns, 'axiosGetRequest').resolves([
        { "address": mkAddress("0x1") }
      ]);
    });

    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData();

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?`
      )).to.be.true;
    });

    it("happy: should work with order", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        order: {
          orderBy: "balance",
          ascOrDesc: "desc",
        },
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?order=balance.desc&`)
      ).to.be.true;
    });

    it("happy: should work with limit", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        limit: 1
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?limit=1`)
      ).to.be.true;
    });

    it("happy: should work with order and limit", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        order: {
          orderBy: "balance",
          ascOrDesc: "desc",
        },
        limit: 1
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?order=balance.desc&limit=1`)
      ).to.be.true;
    });

    it("happy: should work with domain", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        domain: mock.domain.A
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?domain=eq.${mock.domain.A}&`)
      ).to.be.true;
    });

    it("happy: should work with localAsset", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        localAsset: mock.asset.A.address
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?local=eq.${mock.asset.A.address}&`)
      ).to.be.true;
    });

    it("happy: should work with adoptedAsset", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        adoptedAsset: mock.asset.A.address
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?adopted=eq.${mock.asset.A.address}&`)
      ).to.be.true;
    });

    it("happy: should work with canonicalId", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      await nxtpUtils.getRoutersData({
        canonicalId: "1"
      });

      expect(stubAxiosGetRequest.calledWith(
        config.cartographerUrl + `/routers_with_balances?canonical_id=eq.1&`)
      ).to.be.true;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getRoutersData()).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#checkRouterLiquidity", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.checkRouterLiquidity(mock.domain.A, mock.asset.A.address);

      expect(res).to.not.be.undefined;
    });
  });

  describe("#enoughRouterLiquidity", () => {
    beforeEach(async () => {
      stubAxiosGetRequest = stub(SharedFns, 'axiosGetRequest');
    });

    it("should be true when enough liquidity between <N routers", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      stubAxiosGetRequest.resolves([
        {
          "balance": "100",
          "local": mock.asset.A.address,
          "domain": mock.domain.A, 
        },
        {
          "balance": "200",
          "local": mock.asset.A.address,
          "domain": mock.domain.A, 
        }
      ]);

      const res = await nxtpUtils.enoughRouterLiquidity(
        mock.domain.A, 
        mock.asset.A.address, 
        "100",
        2
      );

      expect(res).to.be.true;
    });

    it("happy: should be true when enough liquidity between N routers", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      stubAxiosGetRequest.resolves(
        [
          {
            "balance": "100",
            "local": mock.asset.A.address,
            "domain": mock.domain.A, 
          },
          {
            "balance": "200",
            "local": mock.asset.A.address,
            "domain": mock.domain.A, 
          }
        ]
      );

      const res = await nxtpUtils.enoughRouterLiquidity(
        mock.domain.A, 
        mock.asset.A.address, 
        "300",
        2
      );

      expect(res).to.be.true;
    });

    it("happy: should be false when not enough liquidity between <N routers", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      stubAxiosGetRequest.resolves([
        {
          "balance": "100",
          "local": mock.asset.A.address,
          "domain": mock.domain.A, 
        }
      ]);
      const res = await nxtpUtils.enoughRouterLiquidity(
        mock.domain.A, 
        mock.asset.A.address, 
        "200",
        2
      );

      expect(res).to.be.false;
    });

    it("happy: should be false when not enough liquidity between N routers", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;

      stubAxiosGetRequest.resolves([
        {
          "balance": "100",
          "local": mock.asset.A.address,
          "domain": mock.domain.A, 
        },
        {
          "balance": "200",
          "local": mock.asset.A.address,
          "domain": mock.domain.A, 
        }
      ]);
      const res = await nxtpUtils.enoughRouterLiquidity(
        mock.domain.A, 
        mock.asset.A.address, 
        "400",
        2
      );

      expect(res).to.be.false;
    });
  });

  describe("#getTransfers", () => {
    it("happy: should work with userAddress", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        userAddress: mockConfig.signerAddress,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with routerAddress", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        routerAddress: mock.address.router,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with status", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        status: XTransferStatus.XCalled,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with status", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        errorStatus: XTransferErrorStatus.ExecutionError,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with transferId", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        transferId: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with transactionHash", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        transactionHash: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with range", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with all params", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        userAddress: mockConfig.signerAddress,
        routerAddress: mock.address.router,
        status: XTransferStatus.XCalled,
        transferId: getRandomBytes32(),
        transactionHash: getRandomBytes32(),
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfers({})).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getRouterLiquidity", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getRouterLiquidity();

      expect(res).to.not.be.undefined;
    });
    
  });

  describe("getLatestAssetPrice", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      stub(nxtpUtils, "getCanonicalTokenId").resolves(["123", "0xabc"]);
      // stub(SharedFns, "axiosGetRequest").resolves({});

      const res = await nxtpUtils.getLatestAssetPrice(mock.domain.A, mock.asset.A.address);

      expect(res).to.not.be.undefined;
    });
  });
});
