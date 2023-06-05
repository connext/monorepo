import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import { getSupportedAssets } from "../../src/helpers/asset";
import * as MockableFns from "../../src/mockable";
import { asset } from "../../src/types";

const mockUniswapResponse = [
  {
    chainId: 1,
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    name: "1inch",
    symbol: "1INCH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028",
    extensions: {
      bridgeInfo: {
        "56": {
          tokenAddress: "0x111111111117dC0aa78b770fA6A738034120C302",
        },
        "137": {
          tokenAddress: "0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f",
        },
        "42161": {
          tokenAddress: "0x6314C31A7a1652cE482cffe247E9CB7c3f4BB9aF",
        },
      },
    },
  },
  {
    chainId: 1,
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    name: "Aave",
    symbol: "AAVE",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110",
    extensions: {
      bridgeInfo: {
        "10": {
          tokenAddress: "0x76FB31fb4af56892A25e32cFC43De717950c9278",
        },
        "56": {
          tokenAddress: "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
        },
        "137": {
          tokenAddress: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
        },
        "42161": {
          tokenAddress: "0xba5DdD1f9d7F570dc94a51479a000E3BCE967196",
        },
      },
    },
  },
];

const mockHoneySwap = [
  {
    name: "0xMonero from Ethereum",
    address: "0x8c88ea1fd60462ef7004b9e288afcb4680a3c50c",
    symbol: "0xMR",
    chainId: 100,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/5668.png",
  },
];

describe("Helpers:asset", () => {
  describe("#getSupportedAssets", () => {
    let axiosGetStub: SinonStub;
    beforeEach(() => {
      axiosGetStub = stub(MockableFns, "axiosGet");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("Should work with getting supported asset", async () => {
      const mockChainID = 1;
      axiosGetStub.resolves({ data: { tokens: mockUniswapResponse } });
      const supportedAsset = (await getSupportedAssets(mockChainID)) as asset[];
      expect(supportedAsset[0].symbol).to.be.eq("1INCH");
    });
    it("Should work with Polygon asset", async () => {
      const mockChainID = 137;
      axiosGetStub.resolves({ data: { tokens: mockUniswapResponse } });
      const supportedAsset = (await getSupportedAssets(mockChainID)) as asset[];
      expect(supportedAsset[0].symbol).to.be.eq("1INCH");
    });
    it("Should get null with different chain id", async () => {
      const mockChainID = 45;
      axiosGetStub.resolves({ data: { tokens: mockUniswapResponse } });
      const supportedAsset = (await getSupportedAssets(mockChainID)) as asset[];
      expect(supportedAsset).to.be.null;
    });
    it("Should work for gnosis with honeyswap api", async () => {
      const mockChainID = 100;
      axiosGetStub.resolves({ data: { tokens: mockHoneySwap } });
      const supportedAsset = (await getSupportedAssets(mockChainID)) as asset[];
      expect(supportedAsset[0].symbol).to.be.eq("0xMR");
    });
    it("should throw if axioGet fails", async () => {
      const mockChainID = 56;
      axiosGetStub.throws();
      await expect(getSupportedAssets(mockChainID)).to.eventually.be.rejectedWith(Error);
    });
  });
});
