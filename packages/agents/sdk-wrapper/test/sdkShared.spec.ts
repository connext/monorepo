import { reset, restore, stub, SinonStub } from "sinon";
import { providers, BigNumber } from "ethers";
import { mock } from "./mock";
import { SdkShared } from "../src/sdkShared";
import * as MockableFns from "../src/mockable";

import { expect, mkAddress, Logger } from "@connext/nxtp-utils";
import {
  SdkApproveIfNeededParams,
  SdkCalculateCanonicalKeyParams,
  SdkChangeSignerAddressParams,
  SdkGetActiveLiquidityParams,
  SdkGetAssetsDataByDomainAndAddressParams,
  SdkGetAssetsDataByDomainAndKeyParams,
  SdkGetAssetsWithSameCanonicalParams,
  SdkGetCanonicalTokenIdParams,
  SdkGetChainIdParams,
  SdkGetConnextParams,
  SdkGetConversionRateParams,
  SdkGetDeploymentAddressParams,
  SdkGetERC20Params,
  SdkGetProviderParams,
  SdkIsNextAssetParams,
  Options,
} from "../src/sdk-types";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;

const chainId = +mock.chain.A;
const relayerFee = BigNumber.from("1");
const mockGenericTxRequest: providers.TransactionRequest = {
  to: mockConnextAddress,
  data: "0x",
  from: mock.config().signerAddress,
  value: relayerFee,
  chainId,
};

describe("#SDKShared", () => {
  let sdkShared: SdkShared;
  let axiosGetStub: SinonStub;
  let axiosPostStub: SinonStub;
  let expectedBaseUri: string;

  beforeEach(async () => {
    axiosGetStub = stub(MockableFns, "axiosGet");
    axiosPostStub = stub(MockableFns, "axiosPost");
    sdkShared = new SdkShared(mockConfig, new Logger({ name: "SDK shared" }), mockChainData);
    expectedBaseUri = sdkShared.baseUri;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#instance", () => {
    it("happy: should work", async () => {
      expect(sdkShared).to.not.be.undefined;
      expect(sdkShared.config).to.not.be.null;
      expect(sdkShared.chainData).to.not.be.null;

      expect(sdkShared.getConversionRate).to.be.a("function");
      expect(sdkShared.getProvider).to.be.a("function");
      expect(sdkShared.getDeploymentAddress).to.be.a("function");
      expect(sdkShared.getConnext).to.be.a("function");
      expect(sdkShared.getERC20).to.be.a("function");
      expect(sdkShared.getChainId).to.be.a("function");
      expect(sdkShared.domainToChainName).to.be.a("function");
      expect(sdkShared.chainIdToDomain).to.be.a("function");
      expect(sdkShared.domainToChainId).to.be.a("function");
      expect(sdkShared.getBlockNumberFromUnixTimestamp).to.be.a("function");
      expect(sdkShared.approveIfNeeded).to.be.a("function");
      expect(sdkShared.getAssetsData).to.be.a("function");
      expect(sdkShared.getActiveLiquidity).to.be.a("function");
      expect(sdkShared.getSupported).to.be.a("function");
      expect(sdkShared.getAssetsDataByDomainAndAddress).to.be.a("function");
      expect(sdkShared.getAssetsWithSameCanonical).to.be.a("function");
      expect(sdkShared.getAssetsDataByDomainAndKey).to.be.a("function");
      expect(sdkShared.isNextAsset).to.be.a("function");
      expect(sdkShared.changeSignerAddress).to.be.a("function");
      expect(sdkShared.parseConnextTransactionReceipt).to.be.a("function");
      expect(sdkShared.calculateCanonicalKey).to.be.a("function");
      expect(sdkShared.getCanonicalTokenId).to.be.a("function");
    });
  });

  describe("#getConversionRate", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getConversionRate";
      const expectedArgs: SdkGetConversionRateParams = {
        chainId: +mock.chain.A,
      };
      const expectedRes = BigNumber.from(1);

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getConversionRate(expectedArgs.chainId);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.chainId}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getProvider", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getProvider";
      const expectedArgs: SdkGetProviderParams = {
        domainId: mock.domain.A,
      };
      const expectedRes = new providers.StaticJsonRpcProvider("http://localhost:8545");

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getProvider(expectedArgs.domainId);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getDeploymentAddress", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getDeploymentAddress";
      const expectedArgs: SdkGetDeploymentAddressParams = {
        domainId: mock.domain.A,
        deploymentName: "connext",
      };
      const expectedRes = mkAddress("0x1234");

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getDeploymentAddress(expectedArgs.domainId, expectedArgs.deploymentName as "connext");

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}` + `/${expectedArgs.deploymentName}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getConnext", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getConnext";
      const expectedArgs: SdkGetConnextParams = {
        domainId: mock.domain.A,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const expectedRes = mkAddress("0x1234");

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getConnext(expectedArgs.domainId);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getConnext";
      const expectedArgs: SdkGetConnextParams = {
        domainId: mock.domain.A,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "999": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const expectedRes = mkAddress("0x1234");

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getConnext(expectedArgs.domainId, options);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getERC20", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getERC20";
      const expectedArgs: SdkGetERC20Params = {
        domainId: mock.domain.A,
        tokenAddress: mock.asset.A.address,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const expectedRes = mkAddress("0x1234");

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getERC20(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getERC20";
      const expectedArgs: SdkGetERC20Params = {
        domainId: mock.domain.A,
        tokenAddress: mock.asset.A.address,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "999": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const expectedRes = mkAddress("0x1234");

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getERC20(expectedArgs.domainId, expectedArgs.tokenAddress, options);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getChainId", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getChainId";
      const expectedArgs: SdkGetChainIdParams = {
        domainId: mock.domain.A,
      };
      const expectedRes = mkAddress("0x1234");

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getChainId(expectedArgs.domainId);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#domainToChainName", async () => {
    it("Happy: should return chainID", async () => {
      const chainName = sdkShared.domainToChainName("6648936");
      expect(chainName).to.not.be.undefined;
    });
  });

  describe("#domainToChainId", async () => {
    it("Happy: should return chainID", async () => {
      const chainId = sdkShared.domainToChainId(133712);
      expect(chainId).to.be.eq(1337);
    });
  });

  describe("#chainIdToDomain", async () => {
    it("Happy: should return chainID", async () => {
      const domain = sdkShared.chainIdToDomain(1337);
      expect(domain).to.be.eq(133712);
    });
  });

  describe("#getBlockNumberFromUnixTimestamp", async () => {
    it("Happy: should return blocknumber", async () => {
      const mockDomainID = "1869640809";
      const mockTimeStamp = 1683745427;
      axiosGetStub.resolves({ data: { height: 97297962 } });
      const blockNumber = await sdkShared.getBlockNumberFromUnixTimestamp(mockDomainID, mockTimeStamp);
      expect(blockNumber.height).to.be.eq(97297962);
    });
  });

  describe("#approveIfNeeded", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/approveIfNeeded";
      const expectedArgs: SdkApproveIfNeededParams = {
        domainId: mock.domain.A,
        assetId: "1",
        amount: "100",
        infiniteApprove: true,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
          originProviderUrl: mockConfig.chains[mock.domain.A].providers?.[0],
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkShared.approveIfNeeded(
        expectedArgs.domainId,
        expectedArgs.assetId,
        expectedArgs.amount,
        expectedArgs.infiniteApprove,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/approveIfNeeded";
      const expectedArgs: SdkApproveIfNeededParams = {
        domainId: mock.domain.A,
        assetId: "1",
        amount: "100",
        infiniteApprove: true,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "999": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkShared.approveIfNeeded(
        expectedArgs.domainId,
        expectedArgs.assetId,
        expectedArgs.amount,
        expectedArgs.infiniteApprove,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#getAssetsData", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getAssetsData";
      const expectedRes = mkAddress("0x1234");

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getAssetsData();

      expect(axiosGetStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getActiveLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getActiveLiquidity";
      const expectedArgs: SdkGetActiveLiquidityParams = {
        domain: mock.domain.A,
      };
      const expectedRes = [];

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getActiveLiquidity(expectedArgs.domain);

      expect(axiosGetStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        params: {
          domain: expectedArgs.domain,
          local: undefined,
        },
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getSupported", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getSupported";
      const expectedRes = [];

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getSupported();

      expect(axiosGetStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getAssetsDataByDomainAndAddress", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getAssetsDataByDomainAndAddress";
      const expectedArgs: SdkGetAssetsDataByDomainAndAddressParams = {
        domainId: mock.domain.A,
        tokenAddress: mock.asset.A.address,
      };
      const expectedRes = {};

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getAssetsDataByDomainAndAddress(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}` + `/${expectedArgs.tokenAddress}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getAssetsWithSameCanonical", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getAssetsWithSameCanonical";
      const expectedArgs: SdkGetAssetsWithSameCanonicalParams = {
        domainId: mock.domain.A,
        tokenAddress: mock.asset.A.address,
      };
      const expectedRes = [];

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getAssetsWithSameCanonical(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}` + `/${expectedArgs.tokenAddress}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getAssetsDataByDomainAndKey", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getAssetsDataByDomainAndKey";
      const expectedArgs: SdkGetAssetsDataByDomainAndKeyParams = {
        domainId: mock.domain.A,
        key: mock.asset.A.address,
      };
      const expectedRes = {};

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getAssetsDataByDomainAndKey(expectedArgs.domainId, expectedArgs.key);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}` + `/${expectedArgs.key}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#isNextAsset", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/isNextAsset";
      const expectedArgs: SdkIsNextAssetParams = {
        tokenAddress: mock.asset.A.address,
      };
      const expectedRes = true;

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.isNextAsset(expectedArgs.tokenAddress);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.tokenAddress}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await sdkShared.changeSignerAddress(mockSignerAddress);
      expect(sdkShared.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });

  describe("#parseConnextTransactionReceipt", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/parseConnextTransactionReceipt";
      const expectedArgs = mock.ethers.receipt();
      const expectedRes = [];

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.parseConnextTransactionReceipt(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#calculateCanonicalKey", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateCanonicalKey";
      const expectedArgs: SdkCalculateCanonicalKeyParams = {
        domainId: mock.domain.A,
        canonicalId: mkAddress("0x1234"),
      };
      const expectedRes = mkAddress("0x4321");

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.calculateCanonicalKey(expectedArgs.domainId, expectedArgs.canonicalId);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}` + `/${expectedArgs.canonicalId}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getCanonicalTokenId", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getCanonicalTokenId";
      const expectedArgs: SdkGetCanonicalTokenIdParams = {
        domainId: mock.domain.A,
        tokenAddress: mock.asset.A.address,
      };
      const expectedRes = [mock.domain.A, mkAddress("0x4321")];

      axiosGetStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkShared.getCanonicalTokenId(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosGetStub).to.have.been.calledWithExactly(
        expectedBaseUri + expectedEndpoint + `/${expectedArgs.domainId}` + `/${expectedArgs.tokenAddress}`,
      );
      expect(res).to.be.deep.eq(expectedRes);
    });
  });
});
