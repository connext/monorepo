import { chainIdToDomain, domainToChainId, expect } from "@connext/nxtp-utils";
import { restore, reset, stub } from "sinon";
import { constants, providers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import {
  getDecimalsForAsset,
  mkAddress,
  getOnchainBalance,
  chainDataToMap,
  getMainnetEquivalent,
  getAssetEntryFromChaindata,
} from "../../src";
import * as SharedFns from "../../src/ethers/shared";
import * as ChainDataFns from "../../src/peripherals/chainData";

const mockProvider = new providers.JsonRpcProvider("https://mock.io");
const mockChainData = chainDataToMap([
  {
    name: "Ethereum Testnet Görli",
    chainId: 5,
    type: "testnet",
    confirmations: 1,
    domainId: "1735353714",
    network: "goerli",
    nativeCurrency: {
      name: "Görli Ether",
      symbol: "GOR",
      decimals: 18,
    },
    assetId: {
      "0x0000000000000000000000000000000000000000": {
        symbol: "ETH",
        mainnetEquivalent: "0x0000000000000000000000000000000000000000",
      },
      ["0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6".toUpperCase()]: {
        name: "Wrapped Ether",
        symbol: "WETH",
        mainnetEquivalent: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a": {
        symbol: "fUSDCx",
        mainnetEquivalent: "0x1BA8603DA702602A8657980e825A6DAa03Dee93a",
        decimals: 18,
      },
      "0x04dfd3cfca0e110b6b3c2e7d2384a851d1665988": {
        symbol: "PAID",
        mainnetEquivalent: "0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787",
      },
      "0x7a652687E2f9167cdC9831C0f9B5C3Ff5E5Bc5C7": {
        symbol: "PROPS",
        mainnetEquivalent: "0x6fe56c0bcdd471359019fcbc48863d6c3e9d4f41",
      },
      "0x07DDC851a1bee757335EBcd7B14348359fDaB60f": {
        symbol: "PLOTX",
        mainnetEquivalent: "0x72F020f8f3E8fd9382705723Cd26380f8D0c66Bb",
      },
    },
    rpc: ["https://ethereum-goerli-rpc.allthatnode.com/", "https://goerli.infura.io/v3/${INFURA_API_KEY}"],
    subgraph: ["https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli-v1-runtime"],
    analyticsSubgraph: ["https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli-v1-analytics"],
    faucets: ["https://goerli-faucet.slock.it/?address=${ADDRESS}", "https://faucet.goerli.mudit.blog"],
    subgraphs: {
      runtime: [
        {
          query: "https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-goerli",
          health: "https://api.thegraph.com/index-node/graphql",
        },
      ],
      analytics: [
        {
          query: "",
          health: "",
        },
      ],
    },
    infoURL: "https://goerli.net/#about",
    explorers: [
      {
        name: "etherscan",
        url: "https://goerli.etherscan.io",
        icon: "etherscan",
        standard: "EIP3091",
      },
    ],
  },
]);
describe("Helpers:Asset", () => {
  beforeEach(async () => {});

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getAssetEntryFromChaindata", () => {
    it("should work if asset key is upper case", () => {
      const asset = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6".toLowerCase();
      expect(getAssetEntryFromChaindata(asset, chainIdToDomain(5), mockChainData)).to.be.deep.eq({
        name: "Wrapped Ether",
        symbol: "WETH",
        mainnetEquivalent: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      });
    });

    it("should work if asset key is lower case", () => {
      const asset = "0x" + "04dfd3cfca0e110b6b3c2e7d2384a851d1665988".toUpperCase();
      expect(getAssetEntryFromChaindata(asset, chainIdToDomain(5), mockChainData)).to.be.deep.eq({
        symbol: "PAID",
        mainnetEquivalent: "0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787",
      });
    });

    it("should not error if the asset cannot be checksummed", () => {
      // try with invalid address
      let asset = "cat";
      expect(getAssetEntryFromChaindata(asset, chainIdToDomain(5), mockChainData)).to.be.undefined;

      // try with an address that will fail checksum but exists in lowercase
      asset = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6".toUpperCase(); // 0X addresses fail checksum
      expect(getAssetEntryFromChaindata(asset, chainIdToDomain(5), mockChainData)).to.be.deep.eq({
        name: "Wrapped Ether",
        symbol: "WETH",
        mainnetEquivalent: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      });
    });

    it("should work if asset key is checksummed", () => {
      const asset = "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a".toLowerCase();
      expect(getAssetEntryFromChaindata(asset, chainIdToDomain(5), mockChainData)).to.be.deep.eq({
        symbol: "fUSDCx",
        mainnetEquivalent: "0x1BA8603DA702602A8657980e825A6DAa03Dee93a",
        decimals: 18,
      });
    });
  });

  describe("#getOnchainBalance", async () => {
    beforeEach(() => {
      stub(SharedFns, "getETHBalance").resolves(parseEther("1"));
      stub(SharedFns, "getTokenBalance").resolves(parseEther("2"));
      stub(SharedFns, "getTokenDecimals").resolves(18);
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("Should get balance of self ETH", async () => {
      const address = mkAddress("0xaaa");
      const res = await getOnchainBalance(constants.AddressZero, address, mockProvider);
      expect(res.toString()).to.be.equal(parseEther("1").toString());
    });
    it("Should get balance from token contract", async () => {
      const assetId = mkAddress("0xaaa");
      const account = mkAddress("0x111");
      const res = await getOnchainBalance(assetId, account, mockProvider);
      expect(res.toString()).to.be.equal(parseEther("2").toString());
    });
  });

  describe("#getDecimalForAsset", () => {
    beforeEach(() => {
      stub(SharedFns, "getTokenDecimals").resolves(6);
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should get 18 decimals for ETH", async () => {
      const res = await getDecimalsForAsset(constants.AddressZero, 4, mockProvider);
      expect(res).to.be.eq(18);
    });

    it("should get 18 decimals for WETH with the `chainData` arugment", async () => {
      const assetId = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
      const res = await getDecimalsForAsset(assetId, 5, mockProvider, mockChainData);
      expect(res).to.be.eq(18);
    });

    it("should get decimals from onchain if decimals doesn't exist in chainData", async () => {
      const assetId = "0xb6F6BAe73E69e9B70bF6Fc56f4f510eb699711A8";
      const res = await getDecimalsForAsset(assetId, 5, mockProvider, mockChainData);
      expect(res).to.be.eq(6);
    });

    it("should get decimals from onchain", async () => {
      const assetId = mkAddress("0x111");
      const res = await getDecimalsForAsset(assetId, 1, mockProvider);
      expect(res).to.be.eq(6);
    });
  });

  describe("#getMainnetEquivalent", () => {
    beforeEach(() => {
      stub(ChainDataFns, "getChainData").resolves(mockChainData);
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should get decimals from the `chainData` argument", async () => {
      const assetId = "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a";
      const res = await getMainnetEquivalent(5, assetId, mockChainData);
      expect(res!.toLowerCase()).to.be.eq("0x1ba8603da702602a8657980e825a6daa03dee93a");
    });

    it("should return undefined if mainnetEquivalent doesn't exist", async () => {
      const assetId = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";
      const res = await getMainnetEquivalent(5, assetId, mockChainData);
      expect(res).to.be.undefined;
    });
  });
});
