import { expect } from "@connext/nxtp-utils";
import { restore, reset, stub } from "sinon";
import { constants, providers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { getDecimalsForAsset, mkAddress, getOnchainBalance, chainDataToMap, getMainnetEquivalent } from "../../src";
import * as SharedFns from "../../src/ethers/shared";
import * as ChainDataFns from "../../src/peripherals/chainData";

const mockProvider = new providers.JsonRpcProvider("https://mock.io");
const mockChainData = chainDataToMap([
  {
    name: "Ethereum Testnet Rinkeby",
    chainId: 4,
    domainId: "2000",
    type: "testnet",
    confirmations: 1,
    shortName: "rin",
    network: "rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "RIN",
      decimals: 18,
    },
    assetId: {
      "0x0000000000000000000000000000000000000000": {
        symbol: "ETH",
        mainnetEquivalent: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      "0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be": {
        symbol: "PAID",
        mainnetEquivalent: "0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787",
        decimals: 18,
      },
      "0xD92E713d051C37EbB2561803a3b5FBAbc4962431": {
        symbol: "USDT",
        mainnetEquivalent: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      "0xb6f6bae73e69e9b70bf6fc56f4f510eb699711a8": {
        symbol: "Test1",
        mainnetEquivalent: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      "0XE787030AEBB7095128ACE4B880DAB2237F0F50F8": {
        symbol: "Test2",
        mainnetEquivalent: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
    },
  },
  {
    name: "Ethereum Testnet Kovan",
    chainId: 42,
    domainId: "3000",
    type: "testnet",
    confirmations: 1,
    shortName: "kov",
    chain: "ETH",
    network: "kovan",
    networkId: 42,
    assetId: {
      "0x0000000000000000000000000000000000000000": {
        symbol: "ETH",
        mainnetEquivalent: "0x0000000000000000000000000000000000000000",
        decimals: 6,
      },
      "0x04dfd3cfca0e110b6b3c2e7d2384a851d1665988": {
        symbol: "PAID",
        mainnetEquivalent: "0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787",
        decimals: 18,
      },
      "0xD92E713d051C37EbB2561803a3b5FBAbc4962431": {
        symbol: "USDT",
        decimals: 6,
      },
    },
  },
]);
describe("Helpers:Asset", () => {
  beforeEach(async () => {});

  afterEach(() => {
    restore();
    reset();
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

    it("should get 18 decimals for BNB with the `chainData` arugment", async () => {
      const assetId = "0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be";
      const res = await getDecimalsForAsset(assetId, 4, mockProvider, mockChainData);
      expect(res).to.be.eq(18);
    });
    it("should get decimals from onchain if decimals doesn't exist in chainData", async () => {
      const assetId = "0xb6F6BAe73E69e9B70bF6Fc56f4f510eb699711A8";
      const res = await getDecimalsForAsset(assetId, 4, mockProvider, mockChainData);
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
      const assetId = "0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be";
      const res = await getMainnetEquivalent(4, assetId, mockChainData);
      expect(res.toLowerCase()).to.be.eq("0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787");
    });
    it("should get decimals for upper address", async () => {
      const assetId = "0xe787030AebB7095128aCE4B880dab2237f0F50F8";
      const res = await getMainnetEquivalent(4, assetId, mockChainData);
      expect(res.toLowerCase()).to.be.eq("0xdac17f958d2ee523a2206206994597c13d831ec7");
    });
    it("should get decimals for lower address", async () => {
      const assetId = "0xb6F6BAe73E69e9B70bF6Fc56f4f510eb699711A8";
      const res = await getMainnetEquivalent(4, assetId, mockChainData);
      expect(res.toLowerCase()).to.be.eq("0xdac17f958d2ee523a2206206994597c13d831ec7");
    });

    it("should get decimals from the `chainData` argument", async () => {
      const assetId = "0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be";
      const res = await getMainnetEquivalent(4, assetId, mockChainData);
      expect(res.toLowerCase()).to.be.eq("0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787");
    });
    it("should get decimals using `getChainData` function", async () => {
      const assetId = "0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be";
      const res = await getMainnetEquivalent(4, assetId);
      expect(res.toLowerCase()).to.be.eq("0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787");
    });
    it("should return undefined if mainnetEquivalent doesn't exist", async () => {
      const assetId = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";
      const res = await getMainnetEquivalent(42, assetId, mockChainData);
      expect(res).to.be.undefined;
    });
  });
});
