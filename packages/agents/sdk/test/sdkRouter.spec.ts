import { reset, restore, stub } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, utils } from "ethers";
import { mock } from "./mock";
import { SdkRouter } from "../src/sdkRouter";
import { getEnvConfig } from "../src/config";
import { ProviderMissing, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();
const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments!.connext;
const chainId = 1337;

describe("SdkRouter", () => {
  let sdkRouter: SdkRouter;
  let config: ConfigFns.SdkConfig;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);

    sdkRouter = await SdkRouter.create(mockConfig, undefined, mockChainData);
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(sdkRouter).to.not.be.undefined;
      expect(sdkRouter.config).to.not.be.null;
      expect(sdkRouter.chainData).to.not.be.null;

      expect(sdkRouter.addLiquidityForRouter).to.be.a("function");
      expect(sdkRouter.removeRouterLiquidity).to.be.a("function");
      expect(sdkRouter.removeRouterLiquidityFor).to.be.a("function");
    });
  });

  describe("#addLiquidityForRouter", () => {
    const mockAddLiquidityParams = {
      domainId: mock.domain.A,
      amount: "1",
      tokenAddress: mock.asset.A.address,
      router: mock.address.router,
    };

    it("happy: should work if ERC20", async () => {
      sdkRouter.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("addRouterLiquidityFor", [
        mockAddLiquidityParams.amount,
        mockAddLiquidityParams.tokenAddress,
        mockAddLiquidityParams.router,
      ]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await sdkRouter.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      sdkRouter.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("addRouterLiquidityFor", [
        mockAddLiquidityParams.amount,
        constants.AddressZero,
        mockAddLiquidityParams.router,
      ]);
      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await sdkRouter.addLiquidityForRouter({
        ...mockAddLiquidityParams,
        tokenAddress: constants.AddressZero,
      });

      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if signerAddress is passed into options", async () => {
      sdkRouter.config.signerAddress = undefined;
      const options = {
        signerAddress: mkAddress("0xabc"),
      };

      const res = await sdkRouter.addLiquidityForRouter({ ...mockAddLiquidityParams, options });

      expect(res).to.not.be.undefined;
    });

    it("should error if signerAddress is undefined", async () => {
      sdkRouter.config.signerAddress = undefined;

      await expect(sdkRouter.addLiquidityForRouter(mockAddLiquidityParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("should error if provider sanity check returns false", async () => {
      const mockAddLiquidityParams = {
        domainId: mock.domain.A,
        amount: "1",
        tokenAddress: mock.asset.A.address,
        router: mock.address.router,
      };

      stub(sdkRouter, "providerSanityCheck").resolves(false);

      await expect(sdkRouter.addLiquidityForRouter(mockAddLiquidityParams)).to.be.rejectedWith(ProviderMissing);
    });
  });

  describe("#removeRouterLiquidity", () => {
    const mockRemoveRouterLiquidityParams = {
      domainId: mock.domain.A,
      amount: "1",
      tokenAddress: mock.asset.A.address,
      recipient: mock.address.router,
    };

    const canonicalId = utils.formatBytes32String("0");

    it("happy: should work if ERC20", async () => {
      sdkRouter.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveRouterLiquidityParams.domainId, id: canonicalId },
        mockRemoveRouterLiquidityParams.amount,
        mockRemoveRouterLiquidityParams.recipient,
      ]);

      stub(sdkRouter, "getCanonicalTokenId").resolves([mockRemoveRouterLiquidityParams.domainId, canonicalId]);

      const mockRemoveRouterLiquidityRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await sdkRouter.removeRouterLiquidity(mockRemoveRouterLiquidityParams);
      expect(res).to.be.deep.eq(mockRemoveRouterLiquidityRequest);
    });

    it("happy: should work if Native", async () => {
      sdkRouter.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveRouterLiquidityParams.domainId, id: canonicalId },
        mockRemoveRouterLiquidityParams.amount,
        mockRemoveRouterLiquidityParams.recipient,
      ]);

      stub(sdkRouter, "getCanonicalTokenId").resolves([mockRemoveRouterLiquidityParams.domainId, canonicalId]);

      const mockRemoveRouterLiquidityRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await sdkRouter.removeRouterLiquidity({
        ...mockRemoveRouterLiquidityParams,
        tokenAddress: constants.AddressZero,
      });
      expect(res).to.be.deep.eq(mockRemoveRouterLiquidityRequest);
    });

    it("happy: should work if signerAddress is passed into options", async () => {
      const options = {
        signerAddress: mkAddress("0xabc"),
      };
      stub(sdkRouter, "getCanonicalTokenId").resolves([mockRemoveRouterLiquidityParams.domainId, canonicalId]);
      const res = await sdkRouter.removeRouterLiquidity({ ...mockRemoveRouterLiquidityParams, options });

      expect(res).to.not.be.undefined;
    });

    it("should error if signerAddress is undefined", async () => {
      sdkRouter.config.signerAddress = undefined;

      await expect(sdkRouter.removeRouterLiquidity(mockRemoveRouterLiquidityParams)).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkRouter, "providerSanityCheck").resolves(false);

      await expect(sdkRouter.removeRouterLiquidity(mockRemoveRouterLiquidityParams)).to.be.rejectedWith(
        ProviderMissing,
      );
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
      sdkRouter.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidityFor", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
        mockRemoveLiquidityForParams.router,
      ]);
      stub(sdkRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);
      const mockRemoveLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await sdkRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams);

      expect(res).to.be.deep.eq(mockRemoveLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      sdkRouter.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidityFor", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
        mockRemoveLiquidityForParams.router,
      ]);
      stub(sdkRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);
      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await sdkRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams);

      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if signerAddress is passed into options", async () => {
      sdkRouter.config.signerAddress = undefined;
      const options = {
        signerAddress: mkAddress("0xabc"),
      };

      stub(sdkRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const res = await sdkRouter.removeRouterLiquidityFor({ ...mockRemoveLiquidityForParams, options });

      expect(res).to.not.be.undefined;
    });

    it("should error if signerAddress is undefined", async () => {
      sdkRouter.config.signerAddress = undefined;

      await expect(sdkRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams)).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkRouter, "providerSanityCheck").resolves(false);

      await expect(sdkRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams)).to.be.rejectedWith(
        ProviderMissing,
      );
    });
  });
});
