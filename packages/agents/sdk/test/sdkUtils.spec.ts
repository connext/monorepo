import { reset, restore, stub } from "sinon";
import { expect, XTransferStatus, getRandomBytes32 } from "@connext/utils";
import { mock } from "./mock";
import { SdkUtils } from "../src/sdkUtils";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, UriInvalid } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();
const chainId = 1337;

describe("SdkUtils", () => {
  let utils: SdkUtils;
  let config: ConfigFns.SdkConfig;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);
    stub(SharedFns, "axiosGetRequest").resolves({});

    utils = await SdkUtils.create(mockConfig, undefined, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(utils).to.not.be.undefined;
      expect(utils.config).to.not.be.null;
      expect(utils.chainData).to.not.be.null;

      expect(utils.getRoutersData).to.be.a("function");
      expect(utils.getAssetsData).to.be.a("function");
      expect(utils.getTransfers).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(SdkUtils.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#getRoutersData", () => {
    it("happy: should work", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getRoutersData();

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (utils as any).config.cartographerUrl = "invalidUrl";

      await expect(utils.getRoutersData()).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getAssetsData", () => {
    it("happy: should work", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getAssetsData();

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (utils as any).config.cartographerUrl = "invalidUrl";

      await expect(utils.getAssetsData()).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getTransfers", () => {
    it("happy: should work with userAddress", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
        userAddress: mockConfig.signerAddress,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with routerAddress", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
        routerAddress: mock.address.router,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with status", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
        status: XTransferStatus.XCalled,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with transferId", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
        transferId: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with transactionHash", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
        transactionHash: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with range", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with all params", async () => {
      (utils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await utils.getTransfers({
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
      (utils as any).config.cartographerUrl = "invalidUrl";

      await expect(utils.getTransfers({})).to.be.rejectedWith(UriInvalid);
    });
  });
});
