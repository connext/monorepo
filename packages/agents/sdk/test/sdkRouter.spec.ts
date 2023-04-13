import { reset, restore, stub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { getConnextInterface } from "@connext/nxtp-txservice";
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
  let nxtpRouter: SdkRouter;
  let config: ConfigFns.SdkConfig;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);

    nxtpRouter = await SdkRouter.create(mockConfig, undefined, mockChainData);
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpRouter).to.not.be.undefined;
      expect(nxtpRouter.config).to.not.be.null;
      expect(nxtpRouter.chainData).to.not.be.null;

      expect(nxtpRouter.addLiquidityForRouter).to.be.a("function");
      expect(nxtpRouter.removeRouterLiquidity).to.be.a("function");
      expect(nxtpRouter.removeRouterLiquidityFor).to.be.a("function");
      expect(nxtpRouter.changeSignerAddress).to.be.a("function");
    });
  });

  describe("#addLiquidityForRouter", () => {
    it("happy: should work if ERC20", async () => {
      nxtpRouter.config.signerAddress = mockConfig.signerAddress;
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

      const res = await nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      nxtpRouter.config.signerAddress = mockConfig.signerAddress;
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

      const res = await nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      const mockAddLiquidityParams = {
        domainId: mock.domain.A,
        amount: "1",
        tokenAddress: mock.asset.A.address,
        router: mock.address.router,
      };
      (nxtpRouter as any).config.signerAddress = undefined;

      await expect(nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams)).to.be.rejectedWith(SignerAddressMissing);
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
      (nxtpRouter as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
      ]);

      stub(nxtpRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await nxtpRouter.removeRouterLiquidity(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      (nxtpRouter as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
      ]);

      stub(nxtpRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await nxtpRouter.removeRouterLiquidity(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      (nxtpRouter as any).config.signerAddress = undefined;

      await expect(nxtpRouter.removeRouterLiquidity(mockRemoveLiquidityForParams)).to.be.rejectedWith(
        SignerAddressMissing,
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
      (nxtpRouter as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidityFor", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
        mockRemoveLiquidityForParams.router,
      ]);

      stub(nxtpRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await nxtpRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      (nxtpRouter as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidityFor", [
        { domain: mockRemoveLiquidityForParams.domainId, id: canonicalId },
        mockRemoveLiquidityForParams.amount,
        mockRemoveLiquidityForParams.recipient,
        mockRemoveLiquidityForParams.router,
      ]);

      stub(nxtpRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityForParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await nxtpRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      (nxtpRouter as any).config.signerAddress = undefined;

      await expect(nxtpRouter.removeRouterLiquidityFor(mockRemoveLiquidityForParams)).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });
  });
});
