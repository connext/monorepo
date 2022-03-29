import { expect } from "chai";
import { restore, reset, stub } from "sinon";
import { getDecimalsForAsset, mkAddress, getOnchainBalance, mock, chainDataToMap } from "../../src";
import { constants, providers } from "ethers";
import * as SharedFns from "../../src/helpers/shared";
import * as ChainDataFns from "../../src/peripherals/chainData";
import { parseEther } from "ethers/lib/utils";

const mockProvider = new providers.JsonRpcProvider("https://mock.io");
const mockChainData = chainDataToMap([
  {
    name: "Ethereum Mainnet",
    chainId: 1,
    domainId: "6648936",
    confirmations: 7,
    shortName: "eth",
    type: "mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    assetId: {
      "0xB8c77482e45F1F44dE1745F52C74426C631bDD52": {
        symbol: "BNB",
        mainnetEquivalent: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
        decimals: 18,
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

  describe(`#getOnchainBalance`, async () => {
    beforeEach(() => {
      stub(SharedFns, "getETHBalance").resolves(parseEther("1"));
      stub(SharedFns, "getTokenBalance").resolves(parseEther("2"));
      stub(SharedFns, "getTokenDecimals").resolves(18);
    });
    afterEach(() => {
      restore();
      reset();
    });
    it(`Should get balance of self ETH`, async () => {
      const address = mkAddress("0xaaa");
      const res = await getOnchainBalance(constants.AddressZero, address, mockProvider);
      expect(res.toString()).to.be.equal(parseEther("1").toString());
    });
    it(`Should get balance from token contract`, async () => {
      const assetId = mkAddress("0xaaa");
      const account = mkAddress("0x111");
      const res = await getOnchainBalance(assetId, account, mockProvider);
      expect(res.toString()).to.be.equal(parseEther("2").toString());
    });
  });

  describe(`#getDecimalForAsset`, async () => {
    beforeEach(() => {
      stub(ChainDataFns, "getChainData").resolves(mockChainData);
    });
    afterEach(() => {
      restore();
      reset();
    });
    it(`should get 18 decimals for ETH `, async () => {
      const assetId = mkAddress("0xaaa");
      const res = await getDecimalsForAsset(constants.AddressZero, 1, assetId, chainProvider);
      expect(res).to.deep.equal(decimals);
    });

    it(`should get 18 decimals for BAT on Mainnet`, async () => {
      const batAddress = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF";
      const provider = new ethers.providers.EtherscanProvider("mainnet");
      const res = await asset.getDecimalsForAsset(batAddress, 1, provider);
      expect(res).to.deep.equal(18);
    });
    it(`should get decimals from chaindata`, async () => {
      const provider = new ethers.providers.EtherscanProvider("mainnet");
      const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      const data = await getChainData();
      const res = await asset.getDecimalsForAsset(USDC, 1, provider, data);
      expect(res).to.equal(6);
    });
  });
});
