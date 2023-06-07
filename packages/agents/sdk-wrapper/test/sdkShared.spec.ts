import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect, Logger, mkAddress } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { SdkShared } from "../src/sdkShared";
import { providers, BigNumber } from "ethers";

import * as ConfigFns from "@connext/sdk-core";
import * as SharedFns from "../src/lib/helpers/shared";
import * as MockableFns from "../src/mockable";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("#SDKShared", () => {
  let sdkShared: SdkShared;
  let config: ConfigFns.SdkConfig;
  let axiosGetStub: SinonStub;
  let axiosPostStub: SinonStub;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = ConfigFns.getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "axiosGetRequest").resolves([]);
    axiosGetStub = stub(MockableFns, "axiosGet");
    axiosPostStub = stub(MockableFns, "axiosPost");

    sdkShared = new SdkShared(mockConfig, new Logger({ name: "SDK shared" }), mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getConversionRate", async () => {
    it("Happy: should work", async () => {
      const mockChainID = 10;
      axiosGetStub.resolves({ data: 122334 });
      const conversionRate = await sdkShared.getConversionRate(mockChainID);
      expect(conversionRate).to.be.eq(122334);
    });
  });

  describe("#getProvider", async () => {
    it("Happy: should return provider", async () => {
      const mockDomainID = "1869640809";
      axiosGetStub.resolves({ data: { _isProvider: true } });
      const provider = await sdkShared.getProvider(mockDomainID);
      expect(provider._isProvider).to.be.eq(true);
    });
  });

  describe("#getDeploymentAddress", async () => {
    it("Happy: should return address", async () => {
      const mockDomainID = "1869640809";
      const mockDeploymentName = "connext";
      axiosGetStub.resolves({ data: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA" });
      const address = await sdkShared.getDeploymentAddress(mockDomainID, mockDeploymentName);
      expect(address).to.be.eq("0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA");
    });
  });

  describe("#getConnext", async () => {
    it("Happy: should return connext", async () => {
      const mockDomainID = "1869640809";
      axiosGetStub.resolves({ data: { address: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA" } });
      const connext = await sdkShared.getConnext(mockDomainID);
      expect(connext.address).to.be.eq("0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA");
    });
  });

  describe("#getERC20", async () => {
    it("Happy: should return ERC20", async () => {
      const mockDomainID = "1869640809";
      const mockTokenAddress = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
      axiosGetStub.resolves({ data: { address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607" } });
      const erc20 = await sdkShared.getERC20(mockDomainID, mockTokenAddress);
      expect(erc20.address).to.be.eq("0x7F5c764cBc14f9669B88837ca1490cCa17c31607");
    });
  });

  describe("#getChainId", async () => {
    it("Happy: should return chainID", async () => {
      const mockDomainID = "1869640809";
      axiosGetStub.resolves({ data: 10 });
      const erc20 = await sdkShared.getChainId(mockDomainID);
      expect(erc20).to.be.eq(10);
    });
  });

  describe("#domainToChainId", async () => {
    it("Happy: should return chainID", async () => {
      const mockDomainID = 1869640809;
      axiosGetStub.resolves({ data: 10 });
      const blockNumber = await sdkShared.domainToChainId(mockDomainID);
      expect(blockNumber).to.be.eq(10);
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
    it("Happy: should return approval", async () => {
      const mockDomainID = "1869640809";
      const mockAsset = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
      const mockAmount = "100";
      axiosGetStub.resolves({
        data: {
          data: "0x095ea7b30000000000000000000000008f7492de823025b4cfaab1d34c58963f2af5deda0000000000000000000000000000000000000000000000000000000000000064",
        },
      });
      const approval = await sdkShared.approveIfNeeded(mockDomainID, mockAsset, mockAmount, false);

      expect(approval).not.to.be.undefined;
    });
  });

  describe("#getAssetsData", async () => {
    it("Happy: should return asset", async () => {
      axiosGetStub.resolves({
        data: [
          {
            local: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
            adopted: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
            canonical_id: "0x0000000000000000000000008ae68021f6170e5a766be613cea0d75236ecca9a",
            canonical_domain: "1735353714",
            domain: "1735353714",
            key: "0x81fd9d7fae5ab5f62bb91483ea4d7c14fd7cdd826984f53ebfc6d2f3eefdba16",
            id: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
            decimal: 18,
          },
        ],
      });
      const asset = await sdkShared.getAssetsData();
      expect(asset.length).to.be.greaterThan(0);
    });
  });

  describe("#getActiveLiquidity", async () => {
    it("Happy: should return active Liquidity", async () => {
      axiosGetStub.resolves({
        data: [
          {
            domain: "1668247156",
            local: "0xb706319d37b945727e71ae0d4353699d19112576",
            adopted: "0xb706319d37b945727e71ae0d4353699d19112576",
            total_balance: 1.0000020000008189e26,
            total_locked: 1.000002e26,
            total_supplied: 1.000002e26,
            total_removed: 0,
            avg_usd_price: 1863.39,
            total_balance_usd: 186339372678.1526,
            total_locked_usd: 186339372678,
            total_supplied_usd: 186339372678,
            total_removed_usd: 0,
          },
        ],
      });
      const liquidity = await sdkShared.getActiveLiquidity();
      expect(liquidity.length).to.be.greaterThan(0);
    });
  });

  describe("#getSupported", async () => {
    it("Happy: should return active supported", async () => {
      axiosGetStub.resolves({
        data: [
          {
            chainId: 80001,
            domainId: "9991",
            assets: [
              "0xedb95d8037f769b72aaab41deec92903a98c9e16",
              "0xfa2f9ce589b30f1e4c8bf20bcb496032087baaf0",
              "0xfd2ab41e083c75085807c4a65c0a14fdd93d55a9",
              "0x42bb40bf79730451b11f6de1cba222f17b87afd7",
              "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
              "0xa24e850bb444586897226b7bc4a3c338c995252f",
              "0x0000000000000000000000000000000000000000",
            ],
          },
        ],
      });
      const supported = await sdkShared.getSupported();
      expect(supported.length).to.be.greaterThan(0);
    });
  });

  describe("#getAssetsDataByDomainAndAddress", async () => {
    it("Happy: should return asset", async () => {
      axiosGetStub.resolves({
        data: [
          {
            local: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
            adopted: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
            canonical_id: "0x0000000000000000000000008ae68021f6170e5a766be613cea0d75236ecca9a",
            canonical_domain: "1735353714",
            domain: "1735353714",
            key: "0x81fd9d7fae5ab5f62bb91483ea4d7c14fd7cdd826984f53ebfc6d2f3eefdba16",
            id: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
            decimal: 18,
          },
        ],
      });
      const asset = await sdkShared.getAssetsDataByDomainAndAddress(mock.domain.A, mock.asset.A.address);
      expect(asset).not.to.be.eq(null);
    });
  });

  describe("#getAssetsWithSameCanonical", async () => {
    it("Happy: should return asset", async () => {
      axiosGetStub.resolves({
        data: null,
      });
      const asset = await sdkShared.getAssetsWithSameCanonical(mock.domain.A, mock.asset.A.address);
      expect(asset).to.be.eq(null);
    });
  });

  describe("#getAssetsDataByDomainAndKey", async () => {
    it("Happy: should return asset", async () => {
      axiosGetStub.resolves({
        data: null,
      });
      const asset = await sdkShared.getAssetsDataByDomainAndKey(mock.domain.A, mock.asset.A.address);
      expect(asset).to.be.eq(null);
    });
  });

  describe("#isNextAsset", async () => {
    it("Happy: should return isNextAsset", async () => {
      axiosGetStub.resolves({
        data: null,
      });
      const isNextAsset = await sdkShared.isNextAsset(mock.domain.A, mock.asset.A.address);
      expect(isNextAsset).to.be.eq(null);
    });
  });

  describe("#changeSignerAddress", async () => {
    it("Happy: should return changeSigner", async () => {
      axiosGetStub.resolves({
        data: null,
      });
      const changeSignerAddress = await sdkShared.changeSignerAddress(mkAddress());
      expect(changeSignerAddress).to.be.eq(null);
    });
  });

  describe("#parseConnextTransactionReceipt", async () => {
    it("Happy: should return parseConnextTransactionReceipt", async () => {
      axiosPostStub.resolves({
        data: null,
      });

      const mockTransactionRecipt: providers.TransactionReceipt = {
        to: "0x0000000000000000000000000000000000000000",
        from: "0x0000000000000000000000000000000000000000",
        contractAddress: "0x0000000000000000000000000000000000000000",
        transactionIndex: 10,
        gasUsed: BigNumber.from(10),
        logsBloom: "",
        blockHash: "0x0000000000000000000000000000000000000000",
        transactionHash: "0x0000000000000000000000000000000000000000",
        logs: [],
        blockNumber: 10000000,
        confirmations: 5,
        cumulativeGasUsed: BigNumber.from(10),
        effectiveGasPrice: BigNumber.from(10),
        byzantium: true,
        type: 1,
      };
      const parsedData = await sdkShared.parseConnextTransactionReceipt(mockTransactionRecipt);
      expect(parsedData).to.be.eq(null);
    });
  });

  describe("#calculateCanonicalKey", async () => {
    it("Happy: should return canonical key", async () => {
      const mockCanonicalID = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
      axiosGetStub.resolves({
        data: "0x57a4f58914fa3ce5cdce13685ebd921385f950fce6f3ef3ce59c1d49caf273c5",
      });
      const canonicalKey = await sdkShared.calculateCanonicalKey(mock.domain.A, mockCanonicalID);
      expect(canonicalKey).to.be.eq("0x57a4f58914fa3ce5cdce13685ebd921385f950fce6f3ef3ce59c1d49caf273c5");
    });
  });

  describe("#getCanonicalTokenId", async () => {
    it("Happy: should return canonical Token ID", async () => {
      const mockCanonicalID = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";
      const result = ["0"];
      axiosGetStub.resolves({
        data: result,
      });
      const canonicalTokenID = await sdkShared.calculateCanonicalKey(mock.domain.A, mockCanonicalID);
      expect(canonicalTokenID).to.be.eq(result);
    });
  });

  describe("#domainToChainName", async () => {
    it("Happy: should return chainName", async () => {
      const mockDomain = "1869640809";
      const chainName = await sdkShared.domainToChainName(mockDomain);
      expect(chainName).to.be.eq("optimism");
    });
  });

  describe("#chainIdToDomain", async () => {
    it("Happy: should return chainID", async () => {
      const mockChainID = 1869640809;
      const chainID = await sdkShared.domainToChainId(mockChainID);
      expect(chainID).to.be.eq(10);
    });
  });
});
