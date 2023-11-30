import { createStubInstance, reset, restore, SinonStubbedInstance, stub, spy, mock as sinonMock } from "sinon";
import { expect, mkAddress, Logger } from "@connext/nxtp-utils";
import { constants, providers, Contract, utils } from "ethers";
import { mock } from "./mock";
import { SdkShared } from "../src/sdkShared";
import { getEnvConfig } from "../src/config";
import { ContractAddressMissing, SignerAddressMissing, ProviderMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockAssetId = mock.asset.A.address;
const mockAssetKey = utils.formatBytes32String("13337");

const mockAssetData = {
  local: mock.asset.A.address,
  adopted: mock.asset.B.address,
  canonical_id: utils.formatBytes32String("0"),
  canonical_domain: mock.domain.A,
  domain: mock.domain.A,
  key: mockAssetKey,
  id: mock.asset.A.address,
};

const mockOtherAssetData = {
  local: mock.asset.B.address,
  adopted: mock.asset.A.address,
  canonical_id: utils.formatBytes32String("1"),
  canonical_domain: mock.domain.A,
  domain: mock.domain.B,
  key: mockAssetKey,
  id: mock.asset.B.address,
};

const chainId = 1337;

describe("SdkShared", () => {
  let sdkShared: SdkShared;
  let config: ConfigFns.SdkConfig;
  let logger: SinonStubbedInstance<Logger>;

  beforeEach(async () => {
    logger = createStubInstance(Logger);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkShared = new SdkShared(mockConfig, logger, mockChainData);
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

      expect(sdkShared.getConnext).to.be.a("function");
      expect(sdkShared.getERC20).to.be.a("function");
      expect(sdkShared.approveIfNeeded).to.be.a("function");
      expect(sdkShared.getAssetsData).to.be.a("function");
      expect(sdkShared.getAssetsDataByDomainAndKey).to.be.a("function");
      expect(sdkShared.getAssetsDataByDomainAndAddress).to.be.a("function");
      expect(sdkShared.getAssetsWithSameCanonical).to.be.a("function");
      expect(sdkShared.getActiveLiquidity).to.be.a("function");
      expect(sdkShared.getSupported).to.be.a("function");
      expect(sdkShared.isNextAsset).to.be.a("function");
      expect(sdkShared.changeSignerAddress).to.be.a("function");
      expect(sdkShared.parseConnextTransactionReceipt).to.be.a("function");
      expect(sdkShared.calculateCanonicalKey).to.be.a("function");
      expect(sdkShared.getCanonicalTokenId).to.be.a("function");
    });
  });

  describe("#getConnext", () => {
    it("happy: should work", async () => {
      const connext = sdkShared.getConnext(mock.domain.A);
      expect(connext).to.not.be.undefined;
    });

    it("happy: should work if origin provider is passed into options", async () => {
      stub(sdkShared, "getProvider").resolves(undefined);
      const options = {
        originProviderUrl: "http://example.com",
      };

      const res = await sdkShared.getConnext(mock.domain.A, options);

      expect(res).to.not.be.undefined;
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkShared, "providerSanityCheck").resolves(false);

      await expect(sdkShared.getConnext(mock.domain.A)).to.be.rejectedWith(ProviderMissing);
    });
  });

  describe("#getERC20", () => {
    it("happy: should work", async () => {
      const erc20 = sdkShared.getERC20(mock.domain.A, mock.asset.A.address);
      expect(erc20).to.not.be.undefined;
    });

    it("happy: should work if origin provider is passed into options", async () => {
      stub(sdkShared, "getProvider").resolves(undefined);
      const options = {
        originProviderUrl: "http://example.com",
        chains: {
          [mock.domain.A]: { providers: ["http://example.com"] },
        },
      };

      const res = await sdkShared.getERC20(mock.domain.A, mock.asset.A.address, options);

      expect(res).to.not.be.undefined;
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkShared, "providerSanityCheck").resolves(false);

      await expect(sdkShared.getERC20(mock.domain.A, mock.asset.A.address)).to.be.rejectedWith(ProviderMissing);
    });
  });

  describe("#getSupported", () => {
    it("happy: should work", async () => {
      (sdkShared as any).config.cartographerUrl = config.cartographerUrl;
      const connext = await sdkShared.getSupported();
      expect(connext).to.not.be.undefined;
    });
  });

  describe("#providerSanityCheck", () => {
    it("happy: should return true with a domain in existing config", async () => {
      const params = { domains: [mock.domain.A] };
      const res = await sdkShared.providerSanityCheck(params);
      expect(res).to.be.true;
    });

    it("happy: should return true with a domain in passed-in config", async () => {
      const params = {
        domains: ["1000"],
        options: {
          chains: {
            "1000": {
              providers: ["http://example.com"],
            },
          },
        },
      };
      const res = await sdkShared.providerSanityCheck(params);
      expect(res).to.be.true;
    });

    it("should return false with a domain not in existing config", async () => {
      const params = {
        domains: ["1000"],
      };
      const result = await sdkShared.providerSanityCheck(params);
      expect(result).to.be.false;
    });

    it("should throw with a domain not in passed-in config", async () => {
      const params = {
        domains: ["1000"],
        options: {
          chains: {
            "2000": {
              providers: ["http://example.com"],
            },
          },
        },
      };
      const result = await sdkShared.providerSanityCheck(params);
      expect(result).to.be.false;
    });
  });

  describe("#getDeploymentAddress", () => {
    it("happy: should work", async () => {
      const connext = await sdkShared.getDeploymentAddress(mock.domain.A, "connext");
      expect(connext).to.not.be.undefined;
    });

    it("failed if not exist", async () => {
      await expect(sdkShared.getDeploymentAddress("0", "connext")).to.be.rejectedWith(ContractAddressMissing);
    });
  });

  describe("#approveIfNeeded", () => {
    const mockParams = {
      connext: mock.contracts.deployments().connext(Number(mock.chain.A)),
      tokenAddress: mock.asset.A.address,
    };
    let connextContract;
    let erc20Contract;
    const provider = providers.getDefaultProvider();

    beforeEach(async () => {
      connextContract = new Contract(mockParams.connext!.address, mockParams.connext!.abi, provider);
    });

    it("happy: should work for Native", async () => {
      stub(sdkShared, "hasLockbox").resolves(false);
      const res = await sdkShared.approveIfNeeded(mock.domain.A, constants.AddressZero, "1");

      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance sufficient", async () => {
      const mockERC20 = {
        allowance: function () {
          return 1;
        },
      };
      stub(sdkShared, "hasLockbox").resolves(false);
      stub(sdkShared, "getConnext").resolves(connextContract);
      stub(sdkShared, "getERC20").resolves(mockERC20 as any);

      const res = await sdkShared.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1");

      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance sufficient and asset is xERC20", async () => {
      const mockXERC20 = {
        allowance: function () {
          return 1;
        },
      };
      //Using Ethereum domain to get the deployments.
      const mockDomain = "6648936";
      stub(sdkShared, "providerSanityCheck").resolves(true);
      stub(sdkShared, "hasLockbox").resolves(true);
      stub(sdkShared, "getERC20").resolves(mockXERC20 as any);

      const res = await sdkShared.approveIfNeeded(mockDomain, mock.asset.A.address, "1");

      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance insufficient", async () => {
      const mockERC20 = {
        allowance: function (): number {
          return 0;
        },
        populateTransaction: {
          approve(spender: string, amount: number, overrides?): { data: string; to: string } {
            return {
              data: "0x",
              to: connextContract.address,
            };
          },
        },
      };
      stub(sdkShared, "hasLockbox").resolves(false);
      stub(sdkShared, "getConnext").resolves(connextContract);
      stub(sdkShared, "getERC20").resolves(mockERC20 as any);
      const approve = spy(mockERC20.populateTransaction, "approve");

      await sdkShared.approveIfNeeded(mock.domain.A, mockAssetId, "1");

      expect(approve).calledOnce;
    });

    it("happy: should work for ERC20 when allowance insufficient and asset is xERC20", async () => {
      const mockXERC20 = {
        allowance: function (): number {
          return 0;
        },
        populateTransaction: {
          approve(spender: string, amount: number, overrides?): { data: string; to: string } {
            return {
              data: "0x",
              to: connextContract.address,
            };
          },
        },
      };
      const mockDomain = "6648936";
      stub(sdkShared, "providerSanityCheck").resolves(true);
      stub(sdkShared, "hasLockbox").resolves(true);
      stub(sdkShared, "getConnext").resolves(connextContract);
      stub(sdkShared, "getERC20").resolves(mockXERC20 as any);
      const approve = spy(mockXERC20.populateTransaction, "approve");

      await sdkShared.approveIfNeeded(mockDomain, mockAssetId, "1");

      expect(approve).calledOnce;
    });

    it("happy: should work if origin provider is passed into options", async () => {
      const mockERC20 = {
        allowance: function (): number {
          return 0;
        },
        populateTransaction: {
          approve(spender: string, amount: number, overrides?): { data: string; to: string } {
            return {
              data: "0x",
              to: connextContract.address,
            };
          },
        },
      };
      stub(sdkShared, "getProvider").resolves(undefined);
      stub(sdkShared, "getConnext").resolves(connextContract);
      stub(sdkShared, "getERC20").resolves(mockERC20 as any);
      stub(sdkShared, "hasLockbox").resolves(false);
      const options = {
        originProviderUrl: "http://example.com",
      };

      const res = await sdkShared.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1", true, options);

      expect(res).to.not.be.undefined;
    });

    it("should error if signerAddress is undefined", async () => {
      sdkShared.config.signerAddress = undefined;
      stub(sdkShared, "hasLockbox").resolves(false);
      await expect(sdkShared.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });
  });

  describe("#domainToChainName", () => {
    it("happy: should work", async () => {
      const chainName = SdkShared.domainToChainName("6648936");
      expect(chainName).to.not.be.undefined;
    });
  });

  describe("#domainToChainId", () => {
    it("happy: should work", async () => {
      const chainId = SdkShared.domainToChainId(133712);
      expect(chainId).to.be.eq(1337);
    });
  });

  describe("#chainIdToDomain", () => {
    it("happy: should work", async () => {
      const domain = SdkShared.chainIdToDomain(1337);
      expect(domain).to.be.eq(133712);
    });
  });

  describe("#getBlockNumberFromUnixTimestamp", () => {
    it("happy: should work", async () => {
      const height = 1234;
      restore();
      stub(SdkShared, "domainToChainName").resolves("mock-chain");
      stub(SharedFns, "axiosGetRequest").resolves({ height: height });
      const res = await SdkShared.getBlockNumberFromUnixTimestamp(mock.domain.A, 123124);
      expect(res).to.be.equal(height);
    });
  });

  describe("#getAssetsData", () => {
    it("happy: should work", async () => {
      restore();
      stub(SharedFns, "axiosGetRequest").resolves([mockAssetData]);
      const res = await sdkShared.getAssetsData();
      expect(res).to.be.deep.equal([mockAssetData]);
    });
  });

  describe("#getAssetsDataByDomainAndAddress", () => {
    it("happy: should work", async () => {
      stub(sdkShared, "getAssetsData").resolves([mockAssetData]);
      const res = await sdkShared.getAssetsDataByDomainAndAddress(mock.domain.A, mock.asset.A.address);
      expect(res).to.be.deep.equal(mockAssetData);
    });

    it("should undefined for not exist assets", async () => {
      stub(sdkShared, "getAssetsData").resolves([mockAssetData]);
      const res = await sdkShared.getAssetsDataByDomainAndAddress(mock.domain.B, mock.asset.A.address);
      expect(res).to.be.undefined;
    });
  });

  describe("#getAssetsDataByDomainAndKey", () => {
    it("happy: should work", async () => {
      stub(sdkShared, "getAssetsData").resolves([mockAssetData]);
      const res = await sdkShared.getAssetsDataByDomainAndKey(mock.domain.A, mockAssetKey);
      expect(res).to.be.deep.equal(mockAssetData);
    });

    it("should undefined for not exist assets", async () => {
      stub(sdkShared, "getAssetsData").resolves([mockAssetData]);
      const res = await sdkShared.getAssetsDataByDomainAndKey(mock.domain.B, mockAssetKey);
      expect(res).to.be.undefined;
    });
  });

  describe("#getAssetsWithSameCanonical", () => {
    it("happy: should work", async () => {
      stub(sdkShared, "getAssetsData").resolves([mockAssetData, mockOtherAssetData]);
      const res = await sdkShared.getAssetsWithSameCanonical(mock.domain.A, mock.asset.A.address);
      expect(res).to.be.deep.equal([mockAssetData]);
    });

    it("should undefined for not exist assets", async () => {
      stub(sdkShared, "getAssetsData").resolves([mockAssetData, mockOtherAssetData]);
      const res = await sdkShared.getAssetsWithSameCanonical(mock.domain.B, mkAddress("0xaa"));
      expect(res).to.be.deep.equal([]);
    });
  });

  describe("#getCanonicalTokenId", () => {
    it("happy: should work", async () => {
      stub(sdkShared, "getAssetsDataByDomainAndAddress").resolves(mockAssetData);
      const res = await sdkShared.getCanonicalTokenId(mock.domain.A, mock.asset.A.address);
      expect(res).to.be.deep.equal([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
    });

    it("should undefined for not exist assets", async () => {
      stub(sdkShared, "getAssetsDataByDomainAndAddress").resolves(undefined);
      const res = await sdkShared.getCanonicalTokenId(mock.domain.A, mock.asset.A.address);
      expect(res).to.be.deep.equal(["0", constants.HashZero]);
    });
  });

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await sdkShared.changeSignerAddress(mockSignerAddress);
      expect(sdkShared.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });

  describe("#parseConnextTransactionReceipt", () => {
    it("happy: should work", async () => {
      const res = sdkShared.parseConnextTransactionReceipt(mock.ethers.receipt());

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with original logs", async () => {
      stub(SharedFns, "parseConnextLog").returns("OK");
      const transactionReceipt = mock.ethers.receipt({
        logs: [
          {
            transactionIndex: 32,
            blockNumber: 10771144,
            transactionHash: "0xa6006c58f3ac55c04afc9eb4fe8338525ce71bf35399e7bf8ec1cf034ff76554",
            address: "0x2307Ed9f152FA9b3DcDfe2385d279D8C2A9DF2b0",
            topics: [
              "0x7f9a44468cd4a3c9115f4484cc70939547e8d807c832f32b8c049302f9813001",
              "0x0b7a810f9ac0f240337bce82fe42f3c9d31147aa1477fb8cad52618e5ca514d7",
            ],
            data: "0x00000000000000000000000000000000000000000000000000000000000001000000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff900000000000000000000000000000000000000000000001b1ae4d6e2ef50000000000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff90000000000000000000000000000000000000000000000000000000000006c6100000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec2900000000000000000000000000000000000000000000000000000000000000800000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff900000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec29000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000004570000000000000000000000000000000000000000000000000000000000000d03000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec290000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5000008ad0000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff903000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec2900000000000000000000000000000000000000000000001b1ae4d6e2ef50000020b4b2eeb4ea213a5e7d1e1d2a3a1a437fbe7c8b3490898b0474b0fe66dda70a0b7a810f9ac0f240337bce82fe42f3c9d31147aa1477fb8cad52618e5ca514d7000000000000000000000000000000000000000000000000000000",
            logIndex: 62,
            blockHash: "0x964a3c385444cc0fd0b258d67ccb37d249d431914fe767e86f40fba4d0ecc0e7",
            removed: false,
          },
        ],
      });
      const res = sdkShared.parseConnextTransactionReceipt(transactionReceipt);
      expect(res).to.not.be.undefined;
    });
  });

  describe("#getSupported", () => {
    it("happy: should work", async () => {
      (sdkShared as any).config.cartographerUrl = config.cartographerUrl;
      const connext = await sdkShared.getSupported();
      expect(connext).to.not.be.undefined;
    });
  });

  describe("#getActiveLiquidity", () => {
    it("happy: should work", async () => {
      (sdkShared as any).config.cartographerUrl = config.cartographerUrl;
      const connext = await sdkShared.getActiveLiquidity();
      expect(connext).to.not.be.undefined;
    });
  });
});
