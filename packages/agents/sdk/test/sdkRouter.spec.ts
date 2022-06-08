import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface, getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber } from "ethers";
import { mock } from "./mock";
import { NxtpSdkRouter } from "../src/sdkRouter";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments.connext;
const mockAssetId = mock.asset.A.address;

const chainId = 1337;
describe("SdkRouter", () => {
  let nxtpRouter: NxtpSdkRouter;
  let config;

  let chainReader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);

    nxtpRouter = await NxtpSdkRouter.create(mockConfig, undefined, mockChainData);

    (nxtpRouter as any).chainReader = chainReader;

    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);
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
    const mockAddLiquidityParams = {
      domain: mock.domain.A,
      amount: "1",
      assetId: mock.asset.A.address,
      router: mock.address.router,
    };

    it("should error if signerAddress is undefined", async () => {
      (nxtpRouter as any).config.signerAddress = undefined;

      await expect(nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy: should work if ERC20", async () => {
      const data = getConnextInterface().encodeFunctionData("addRouterLiquidityFor", [
        mockAddLiquidityParams.amount,
        mockAddLiquidityParams.assetId,
        mockAddLiquidityParams.router,
      ]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: 0,
        chainId,
      };

      const res = await nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });

    it("happy: should work if Native", async () => {
      const mockAddLiquidityParams = {
        domain: mock.domain.A,
        amount: "1",
        assetId: constants.AddressZero,
        router: mock.address.router,
      };

      const data = getConnextInterface().encodeFunctionData("addRouterLiquidityFor", [
        mockAddLiquidityParams.amount,
        mockAddLiquidityParams.assetId,
        mockAddLiquidityParams.router,
      ]);

      const mockAddLiquidityForRouterRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockAddLiquidityParams.amount),
        chainId,
      };

      const res = await nxtpRouter.addLiquidityForRouter(mockAddLiquidityParams);
      expect(res).to.be.deep.eq(mockAddLiquidityForRouterRequest);
    });
  });

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await nxtpRouter.changeSignerAddress(mockSignerAddress);
      expect(nxtpRouter.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });
});
