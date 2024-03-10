import { InitConfig } from "../../helpers";

export const TESTNET_PRODUCTION_INIT_CONFIG: InitConfig = {
  hub: "1735353714", /// GOERLI
  supportedDomains: [
    "1735353714", /// GOERLI
    "1735356532", /// OPTIMISM-GOERLI
    // "1734439522", /// ARBITRUM-GOERLI
    "9991", /// MUMBAI
    // "2053862260", /// ZKSYNC-TEST
    // "1668247156", /// LINGEA-GOERLI
    // "1887071092", /// POLYGON-ZKEVM-TEST
    "1650553703", /// BASE-GOERLI
    "2016506996", /// X1-TESTNET
  ],
  assets: [
    {
      name: "TEST",
      canonical: {
        domain: "1735353714",
        address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
        decimals: 18,
      },
      representations: {
        "1735356532": {
          local: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
          adopted: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
        },
        "9991": {
          local: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
          adopted: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
        },
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
        //   adopted: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
        // },
        // /// ZKSYNC-TEST
        // "2053862260": {
        //   local: "0x7C1412e456ad60B8ee458c4eb3A9852C3e389353",
        //   adopted: "0x7C1412e456ad60B8ee458c4eb3A9852C3e389353",
        // },
        /// LINEA_GOERLI
        "1668247156": {
          local: "0xB706319D37b945727E71ae0d4353699d19112576",
          adopted: "0xB706319D37b945727E71ae0d4353699d19112576",
        },
        // /// POLYGON-ZKEVM-TEST
        // "1887071092": {
        //   local: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
        //   adopted: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
        // },
        /// BASE_GOERLI
        "1650553703": {
          local: "0x8f26fd87384b0524aAd9bB7d3be9704303bBC65e",
          adopted: "0x8f26fd87384b0524aAd9bB7d3be9704303bBC65e",
        },
        /// X1-TESTNET
        "2016506996": {
          local: "0x471F702E7D96E541488140042bCD1206Ae55CCa5",
          adopted: "0x471F702E7D96E541488140042bCD1206Ae55CCa5",
        },
      },
    },
    {
      name: "WMATIC",
      canonical: {
        domain: "9991",
        address: "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
        decimals: 18,
      },
      representations: {
        "1735356532": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        "1735353714": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        "9991": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0x0000000000000000000000000000000000000000",
        //   adopted: "0x0000000000000000000000000000000000000000",
        // },
        // /// ZKSYNC-TEST
        // "2053862260": {
        //   local: "0x0000000000000000000000000000000000000000",
        //   adopted: "0x0000000000000000000000000000000000000000",
        // },
        /// LINEA_GOERLI
        "1668247156": {
          local: "0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63",
          adopted: "0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63",
        },
        // /// POLYGON-ZKEVM-TEST
        // "1887071092": {
        //   local: "0x0000000000000000000000000000000000000000",
        //   adopted: "0x0000000000000000000000000000000000000000",
        // },
      },
    },
    {
      name: "nextAlUSD",
      canonical: {
        domain: "1735353714",
        address: "0x990162AFaA06f591c03DD36ECBDa24A8A80F2D0c",
        decimals: 18,
      },
      representations: {
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0xF87510F1E63E29BB69d9D35D0365E8CaCe609a8C",
        //   adopted: "0xF87510F1E63E29BB69d9D35D0365E8CaCe609a8C",
        // },
        /// OPTIMISM-GOERLI
        "1735356532": {
          local: "0xFDd72CB8477d3Ae2D00a6F9516324c529dfC395A",
          adopted: "0xFDd72CB8477d3Ae2D00a6F9516324c529dfC395A",
        },
      },
    },
    {
      name: "nextAlETH",
      canonical: {
        domain: "1735353714",
        address: "0xF6DD52cdF1614Cd649077Aa283840657617faa07",
        decimals: 18,
      },
      representations: {
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0x1F563a8BE28acdCc5546543a227aFb9373586eD0",
        //   adopted: "0x1F563a8BE28acdCc5546543a227aFb9373586eD0",
        // },
        /// OPTIMISM-GOERLI
        "1735356532": {
          local: "0x40E4b6A2D89fF4206dB843B614bBe2694876D640",
          adopted: "0x40E4b6A2D89fF4206dB843B614bBe2694876D640",
        },
      },
    },
    {
      name: "ALCX",
      canonical: {
        domain: "1735353714",
        address: "0xb46eE2E4165F629b4aBCE04B7Eb4237f951AC66F",
        decimals: 18,
      },
      representations: {
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0x49000f5e208349D2fA678263418e21365208E498",
        //   adopted: "0x49000f5e208349D2fA678263418e21365208E498",
        // },
        /// OPTIMISM-GOERLI
        "1735356532": {
          local: "0x49000f5e208349D2fA678263418e21365208E498",
          adopted: "0x49000f5e208349D2fA678263418e21365208E498",
        },
      },
    },
    {
      name: "xDappRadar",
      canonical: {
        domain: "1735353714",
        address: "0x4c781E4D22cfaAdA520cAe4aF9097C5ecf9C3A71",
        decimals: 18,
      },
      representations: {
        /// OPTIMISM-GOERLI
        "1735356532": {
          local: "0xb6932c8363354df7620a7a7bF3a933A253015cA3",
          adopted: "0xb6932c8363354df7620a7a7bF3a933A253015cA3",
        },
        /// MUMBAI
        "9991": {
          local: "0x3fC9473d9dF84887D483A93a8d207f90D9bE63C4",
          adopted: "0x3fC9473d9dF84887D483A93a8d207f90D9bE63C4",
        },
      },
    },
    {
      name: "BTRST",
      canonical: {
        domain: "1735353714",
        address: "0x39e09359F5a7396937504Eb2766722e2bf4650e8",
        decimals: 18,
      },
      representations: {
        /// MUMBAI
        "9991": {
          local: "0xEc537a40dC272Dd8abCda95e2a8713E57A58f211",
          adopted: "0xEc537a40dC272Dd8abCda95e2a8713E57A58f211",
        },
      },
    },
    {
      name: "xTokenFrontend",
      canonical: {
        domain: "1735353714",
        address: "0x6984384D6abE16221769BD9400de72b8F4Aa572C",
        decimals: 18,
      },
      representations: {
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0x7E9D498a970B7786ea923Fb8643FBbF62Efa5037",
        //   adopted: "0x7E9D498a970B7786ea923Fb8643FBbF62Efa5037",
        // },
        /// OPTIMISM-GOERLI
        "1735356532": {
          local: "0xf5f1424dD3B78f64B18A085C8D7AEa5E124bf168",
          adopted: "0xf5f1424dD3B78f64B18A085C8D7AEa5E124bf168",
        },
      },
    },
    {
      name: "xMonoTest",
      canonical: {
        domain: "1735353714",
        address: "0x026dD7034AD81D2BEEc7F9d77DC5fDd6f55BaEF3",
        decimals: 18,
      },
      representations: {
        /// MUMBAI
        "9991": {
          local: "0x026dD7034AD81D2BEEc7F9d77DC5fDd6f55BaEF3",
          adopted: "0x026dD7034AD81D2BEEc7F9d77DC5fDd6f55BaEF3",
        },
      },
    },
    {
      name: "NEXT",
      canonical: {
        domain: "1735353714",
        address: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
        decimals: 18,
      },
      representations: {
        /// OPTIMISM-GOERLI
        "1735356532": {
          local: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
          adopted: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
        },
        /// MUMBAI
        "9991": {
          local: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
          adopted: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
        },
        // /// ARBITRUM-GOERLI
        // "1734439522": {
        //   local: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
        //   adopted: "0x61E0589e12395c06F6A72e5B31f803e47185FC81",
        // },
      },
    },
    {
      name: "sDAI",
      canonical: {
        domain: "11111",
        address: "0x272DF088C3bDafeDCa5f66D76B1372A6091eFc64",
        decimals: 18,
      },
      representations: {
        /// Goerli
        "1735353714": {
          local: "0x272DF088C3bDafeDCa5f66D76B1372A6091eFc64",
          adopted: "0x272DF088C3bDafeDCa5f66D76B1372A6091eFc64",
        },
        /// Mumbai
        "9991": {
          local: "0x272DF088C3bDafeDCa5f66D76B1372A6091eFc64",
          adopted: "0x272DF088C3bDafeDCa5f66D76B1372A6091eFc64",
        },
      },
    },
    {
      name: "InrETH",
      canonical: {
        domain: "11111",
        address: "0xa66e9339418c1e85bc957062D8D75036dB97e57B",
        decimals: 18,
      },
      representations: {
        /// Goerli
        "1735353714": {
          local: "0xa66e9339418c1e85bc957062D8D75036dB97e57B",
          adopted: "0xa66e9339418c1e85bc957062D8D75036dB97e57B",
        },
        /// Mumbai
        "9991": {
          local: "0x268734Ce4610c4445b7A9d12100Fc385B97362C6",
          adopted: "0x268734Ce4610c4445b7A9d12100Fc385B97362C6",
        },
      },
    },
  ],
  agents: {
    relayerFeeVaults: {
      "1735353714": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "1735356532": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      // "1734439522": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "9991": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      // "2053862260": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "1668247156": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      // "1887071092": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "1650553703": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "2016506996": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
    },
    watchers: {
      allowlist: ["0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006"],
    },
    routers: {
      allowlist: [
        "0xD2aD711861ab345977B7379c81165708C8717fF1", // connext
        "0xE879261F44041E030404Ac9847f0cEE2591F62F5", // bware
        "0x12060Ec432a76Fe35851Ae9e656b4fbb9C8ac842", // p2p
        "0x13751dc2749a3fc61f4b2ca5f5c09bd31062ef0a", // <JustDark/>#8259
        "0xf569c6186E7D57742ae89DC97F02FD0d5BA4CD6D", // Jav1x#0292
      ],
    },
    sequencers: {
      allowlist: ["0x87D8bd5B49B69f93e226ecF0e87D5bEBc3f6359C"],
    },
    relayers: {
      allowlist: [
        // NOTE: gelato whitelisted in `init` script
        "0x7198C77022566F8F1f8A9A41C7B9C084bD18F934", // connext relayer
        "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      ],
      blacklist: [
        "0x99a039d4F0e734aA8CcBE74C0FF9780BccD79f1d", // gelato (zksync - old)
        "0x75bA5Af8EFFDCFca32E1e288806d54277D1fde99", // gelato (old)
      ],
    },
    proposers: {
      allowlist: [
        "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
        "0xc291875f68f9783e83D01Ccf04A5E1392399CDF2", // lighthouse
      ],
    },
  },
};
