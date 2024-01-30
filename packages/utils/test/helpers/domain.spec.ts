import { restore, reset, stub } from "sinon";

import { chainIdToDomain, domainToChainId, expect, updateChainIdToDomainMapping } from "@connext/nxtp-utils";
import { chainDataToMap } from "../../src";
import * as ChainDataFns from "../../src/peripherals/chainData";

const mockChainData = chainDataToMap([
  "5551",
  {
    name: "Ethereum Testnet Görli",
    chainId: 555,
    type: "testnet",
    confirmations: 1,
    domainId: "5551",
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

describe("Helpers:Domain", () => {
  beforeEach(async () => {});

  afterEach(() => {
    restore();
    reset();
  });

  describe("#chainIdToDomain", () => {
    it("should work in happy path", async () => {
      stub(ChainDataFns, "getChainData").resolves(mockChainData);
      await updateChainIdToDomainMapping();
      expect(chainIdToDomain(4)).to.be.deep.eq(1111);
    });

    it("should throw when domain not found", () => {
      stub(ChainDataFns, "getChainData").resolves(mockChainData);
      expect(() => {
        chainIdToDomain(9999999999999);
      }).to.throw("Cannot find corresponding domain for chainId 9999999999999");
    });
  });

  describe("#chainIdToDomain", () => {
    it("should work in happy path", () => {
      expect(chainIdToDomain(1)).to.be.deep.eq(0x657468);
    });

    it("should throw when domain not found", () => {
      expect(() => {
        chainIdToDomain(9999999999999);
      }).to.throw("Cannot find corresponding domain for chainId 9999999999999");
    });
  });

  describe("#domainToChainId", () => {
    it("should work in happy path", () => {
      expect(domainToChainId(6648936)).to.be.deep.eq(1);
    });

    it("should throw when domain not found", () => {
      expect(() => {
        domainToChainId(9999999999999);
      }).to.throw("Cannot find corresponding chainId for domain 9999999999999");
    });
  });
});
