import { reset, restore, stub } from "sinon";
import { expect } from "@connext/utils";
import { getConnextInterface } from "@connext/txservice";
import { constants, providers, BigNumber, utils } from "ethers";
import { mock } from "./mock";
import { SdkRouter } from "../src/sdkRouter";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();
const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments!.connext;
const chainId = 1337;

describe("SdkRouter", () => {
  let router: SdkRouter;
  let config: ConfigFns.SdkConfig;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    router = await SdkRouter.create(mockConfig, undefined, mockChainData);
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(router).to.not.be.undefined;
      expect(router.config).to.not.be.null;
      expect(router.chainData).to.not.be.null;

      expect(router.addLiquidityForRouter).to.be.a("function");
      expect(router.removeRouterLiquidity).to.be.a("function");
      expect(router.removeRouterLiquidityFor).to.be.a("function");
      expect(router.changeSignerAddress).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(SdkRouter.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#addLiquidityForRouter", () => {
    it("happy: should work if ERC20", async () => {
      const mockAddLiquidityParams = {
        domainId: mock.domain.A,
        amount: "1",
        tokenAddress: mock.asset.A.address,
        router: mock.address.router,
      };

      const data = getConnextInterface().encodeFunctionData("addRouterLiquidityFor", [
        mockAddLiquidityParams.amount,
        mockAddLiquidityParams.tokenAddress,
        mockAddLiquidityParams.router,
      ]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await router.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      const mockAddLiquidityParams = {
        domainId: mock.domain.A,
        amount: "1",
        tokenAddress: constants.AddressZero,
        router: mock.address.router,
      };

      const data = getConnextInterface().encodeFunctionData("addRouterLiquidityFor", [
        mockAddLiquidityParams.amount,
        constants.AddressZero,
        mockAddLiquidityParams.router,
      ]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await router.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      const mockAddLiquidityParams = {
        domainId: mock.domain.A,
        amount: "1",
        tokenAddress: mock.asset.A.address,
        router: mock.address.router,
      };
      (router as any).config.signerAddress = undefined;

      await expect(router.addLiquidityForRouter(mockAddLiquidityParams)).to.be.rejectedWith(SignerAddressMissing);
    });
  });

  describe("#removeRouterLiquidity", () => {
    const mockRemoveLiquidityForParams = {
      domainId: mock.domain.A,
      amount: "1",
      tokenAddress: mock.asset.A.address,
      recipient: mock.address.router,
    };

    const canonicalId = utils.formatBytes32String("0");

    it("happy: should work if ERC20", async () => {
      (router as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
      ]);

      stub(router, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await router.removeRouterLiquidity(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      (router as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
      ]);

      stub(router, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await router.removeRouterLiquidity(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      (router as any).config.signerAddress = undefined;

      await expect(router.removeRouterLiquidity(mockRemoveLiquidityForParams)).to.be.rejectedWith(SignerAddressMissing);
    });
  });

  describe("#removeRouterLiquidityFor", () => {
    const mockRemoveLiquidityForParams = {
      domainId: mock.domain.A,
      amount: "1",
      tokenAddress: mock.asset.A.address,
      recipient: mock.address.router,
      router: mock.address.router,
    };

    const canonicalId = utils.formatBytes32String("0");

    it("happy: should work if ERC20", async () => {
      (router as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidityFor", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
        mockRemoveLiquidityForParams.router,
      ]);

      stub(router, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await router.removeRouterLiquidityFor(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      (router as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidityFor", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
        mockRemoveLiquidityForParams.router,
      ]);

      stub(router, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await router.removeRouterLiquidityFor(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      (router as any).config.signerAddress = undefined;

      await expect(router.removeRouterLiquidityFor(mockRemoveLiquidityForParams)).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });
  });
});
