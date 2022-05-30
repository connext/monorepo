import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress, XTransferStatus, getRandomBytes32 } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface, getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber } from "ethers";
import { mock } from "./mock";
import { NxtpSdkUtils } from "../src/sdkUtils";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, UriInvalid } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { mockTaskId } from "../../lighthouse/test/mock";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments.connext;
const mockAssetId = mock.asset.A.address;

const chainId = 1337;
describe("SdkUtils", () => {
  let nxtpUtils: NxtpSdkUtils;
  let config;

  let chainReader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);

    nxtpUtils = await NxtpSdkUtils.create(mockConfig, undefined, mockChainData);

    (nxtpUtils as any).chainReader = chainReader;

    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    stub(SharedFns, "axiosGetRequest").resolves({ data: {} });
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

      expect(nxtpUtils.parseConnextTransactionReceipt).to.be.a("function");
      expect(nxtpUtils.getRoutersData).to.be.a("function");
      expect(nxtpUtils.getTransfersByUser).to.be.a("function");
      expect(nxtpUtils.getTransfers).to.be.a("function");
      expect(nxtpUtils.getTransfersByStatus).to.be.a("function");
      expect(nxtpUtils.getTransfersByRouter).to.be.a("function");
      expect(nxtpUtils.getTransferById).to.be.a("function");
      expect(nxtpUtils.getTransferByTransactionHash).to.be.a("function");
      expect(nxtpUtils.changeSignerAddress).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(NxtpSdkUtils.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#parseConnextTransactionReceipt", () => {
    it("happy: should work", async () => {
      const res = nxtpUtils.parseConnextTransactionReceipt(mock.ethers.receipt());

      expect(res).to.not.be.undefined;
    });
  });

  describe("#getRoutersData", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getRoutersData()).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getRoutersData();

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfersByUser", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByUser({ userAddress: mockConfig.signerAddress })).to.be.rejectedWith(
        UriInvalid,
      );
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfersByUser({
        userAddress: mockConfig.signerAddress,
        status: XTransferStatus.XCalled,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfers", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfers({})).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfers({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfersByStatus", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByStatus({ status: XTransferStatus.Reconciled })).to.be.rejectedWith(
        UriInvalid,
      );
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfersByStatus({
        status: XTransferStatus.Reconciled,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfersByRouter", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByRouter({ routerAddress: mock.address.router })).to.be.rejectedWith(
        UriInvalid,
      );
    });

    it("happy: should work", async () => {
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
  });

  describe("#getTransferById", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getTransferById(getRandomBytes32())).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransferById(getRandomBytes32());

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransferByTransactionHash", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.backendUrl = "invalidUrl";

      await expect(nxtpUtils.getTransferByTransactionHash(getRandomBytes32())).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransferByTransactionHash(getRandomBytes32());

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await nxtpUtils.changeSignerAddress(mockSignerAddress);
      expect(nxtpUtils.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });
});
