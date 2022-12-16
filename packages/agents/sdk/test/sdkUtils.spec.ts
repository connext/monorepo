import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress, XTransferStatus, getRandomBytes32, Logger } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { NxtpSdkUtils } from "../src/sdkUtils";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, UriInvalid } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();
const chainId = 1337;

describe("SdkUtils", () => {
  let nxtpUtils: NxtpSdkUtils;
  let config: ConfigFns.NxtpSdkConfig;
  let logger: Logger;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    logger = new Logger({ name: "NxtpSdkUtils", level: config.logLevel });

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);
    stub(SharedFns, "axiosGetRequest").resolves({ data: {} });

    nxtpUtils = await NxtpSdkUtils.create(mockConfig, undefined, mockChainData);
    console.log(config.cartographerUrl);
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
      expect(nxtpUtils.getTransfersByUser).to.be.a("function");
      expect(nxtpUtils.getTransfers).to.be.a("function");
      expect(nxtpUtils.getTransfersByStatus).to.be.a("function");
      expect(nxtpUtils.getTransfersByRouter).to.be.a("function");
      expect(nxtpUtils.getTransferById).to.be.a("function");
      expect(nxtpUtils.getTransferByTransactionHash).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(NxtpSdkUtils.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#getRoutersData", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getRoutersData();

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getRoutersData()).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getTransfersByUser", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfersByUser({
        userAddress: mockConfig.signerAddress!,
        status: XTransferStatus.XCalled,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByUser({ userAddress: mockConfig.signerAddress! })).to.be.rejectedWith(
        UriInvalid,
      );
    });
  });

  describe("#getTransfers", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfers({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfers({})).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getTransfersByStatus", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfersByStatus({
        status: XTransferStatus.Reconciled,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByStatus({ status: XTransferStatus.Reconciled })).to.be.rejectedWith(
        UriInvalid,
      );
    });
  });

  describe("#getTransfersByRouter", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransfersByRouter({
        routerAddress: mock.address.router,
        status: XTransferStatus.Executed,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByRouter({ routerAddress: mock.address.router })).to.be.rejectedWith(
        UriInvalid,
      );
    });
  });

  describe("#getTransferById", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransferById(getRandomBytes32());

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransferById(getRandomBytes32())).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getTransferByTransactionHash", () => {
    it("happy: should work", async () => {
      (nxtpUtils as any).config.cartographerUrl = config.cartographerUrl;
      const res = await nxtpUtils.getTransferByTransactionHash(getRandomBytes32());

      expect(res.data).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransferByTransactionHash(getRandomBytes32())).to.be.rejectedWith(UriInvalid);
    });
  });
});
