import { reset, restore, stub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils } from "ethers";
import { mock } from "./mock";
import { NxtpSdkRouter } from "../src/sdkRouter";
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
  let nxtpRouter: NxtpSdkRouter;
  let config: ConfigFns.NxtpSdkConfig;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    nxtpRouter = await NxtpSdkRouter.create(mockConfig, undefined, mockChainData);
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
      expect(nxtpRouter.changeSignerAddress).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(NxtpSdkRouter.create(config)).to.be.rejectedWith(ChainDataUndefined);
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

      const res = await nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams);
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
    const mockRemoveLiquidityParams = {
      domainId: mock.domain.A,
      amount: "1",
      tokenAddress: mock.asset.A.address,
      recipient: mock.address.router,
    };

    const canonicalId = utils.formatBytes32String("0");

    it("happy: should work if ERC20", async () => {
      (nxtpRouter as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveLiquidityParams.domainId, id: canonicalId },
        mockRemoveLiquidityParams.amount,
        mockRemoveLiquidityParams.recipient,
      ]);

      stub(nxtpRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await nxtpRouter.removeRouterLiquidity(mockRemoveLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      (nxtpRouter as any).config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("removeRouterLiquidity", [
        { domain: mockRemoveLiquidityParams.domainId, id: canonicalId },
        mockRemoveLiquidityParams.amount,
        mockRemoveLiquidityParams.recipient,
      ]);

      stub(nxtpRouter, "getCanonicalTokenId").resolves([mockRemoveLiquidityParams.domainId, canonicalId]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
      };

      const res = await nxtpRouter.removeRouterLiquidity(mockRemoveLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      (nxtpRouter as any).config.signerAddress = undefined;

      await expect(nxtpRouter.removeRouterLiquidity(mockRemoveLiquidityParams)).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });
  });
});
