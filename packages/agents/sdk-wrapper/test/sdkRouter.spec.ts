import { reset, restore, stub, SinonStub } from "sinon";
import { BigNumber, providers } from "ethers";
import { mock } from "./mock";
import { SdkRouter } from "../src/sdkRouter";
import * as MockableFns from "../src/mockable";

import {
  SdkAddLiquidityForRouterParams,
  SdkRemoveRouterLiquidityForParams,
  SdkRemoveRouterLiquidityParams,
  Options,
} from "../src/sdk-types";
import { expect, mkAddress } from "@connext/nxtp-utils";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;

const chainId = +mock.chain.A;
const relayerFee = BigNumber.from("1");
const mockXTransfer = mock.entity.xtransfer();
const mockGenericTxRequest: providers.TransactionRequest = {
  to: mockConnextAddress,
  data: "0x",
  from: mock.config().signerAddress,
  value: relayerFee,
  chainId,
};

describe("#SDKRouter", () => {
  let sdkRouter: SdkRouter;
  let axiosPostStub: SinonStub;
  let expectedBaseUri: string;

  beforeEach(async () => {
    axiosPostStub = stub(MockableFns, "axiosPost");
    sdkRouter = await SdkRouter.create(mockConfig, undefined, mockChainData);
    expectedBaseUri = sdkRouter.baseUri;
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

  describe("#addLiquidityForRouter", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/addLiquidityForRouter";
      const expectedArgs: SdkAddLiquidityForRouterParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amount: "100",
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        router: mkAddress("0x1234"),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkRouter.addLiquidityForRouter(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/addLiquidityForRouter";
      const expectedArgs: SdkAddLiquidityForRouterParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amount: "100",
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        router: mkAddress("0x1234"),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkRouter.addLiquidityForRouter({ ...expectedArgs, options: options });

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#removeRouterLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/removeRouterLiquidity";
      const expectedArgs: SdkRemoveRouterLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amount: "100",
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        recipient: mkAddress("0x1234"),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkRouter.removeRouterLiquidity(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/removeRouterLiquidity";
      const expectedArgs: SdkRemoveRouterLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amount: "100",
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        recipient: mkAddress("0x1234"),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkRouter.removeRouterLiquidity({ ...expectedArgs, options: options });

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#removeRouterLiquidityFor", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/removeRouterLiquidityFor";
      const expectedArgs: SdkRemoveRouterLiquidityForParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amount: "100",
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        recipient: mkAddress("0x1234"),
        router: mkAddress("0x2234"),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkRouter.removeRouterLiquidityFor(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/removeRouterLiquidityFor";
      const expectedArgs: SdkRemoveRouterLiquidityForParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amount: "100",
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        recipient: mkAddress("0x1234"),
        router: mkAddress("0x2234"),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkRouter.removeRouterLiquidityFor({ ...expectedArgs, options: options });

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });
});
