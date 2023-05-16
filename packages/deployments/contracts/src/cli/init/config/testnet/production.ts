import { utils } from "ethers";

import { InitConfig } from "../../helpers";

export const TESTNET_PRODUCTION_INIT_CONFIG: InitConfig = {
  hub: "1735353714", /// GOERLI
  supportedDomains: [
    "1735353714", /// GOERLI
    "1735356532", /// OPTIMISM-GOERLI
    "1734439522", /// ARBITRUM-GOERLI
    "9991", /// MUMBAI
    "2053862260", /// ZKSYNC-TEST
    "1668247156", /// CONSENSYS-ZKEVM-TEST
    "1887071092", /// POLYGON-ZKEVM-TEST
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
        /// ARBITRUM-GOERLI
        "1734439522": {
          local: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
          adopted: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
        },
        /// ZKSYNC-TEST
        "2053862260": {
          local: "0x7C1412e456ad60B8ee458c4eb3A9852C3e389353",
          adopted: "0x7C1412e456ad60B8ee458c4eb3A9852C3e389353",
        },
        /// CONSENSYS-ZKEVM-TEST
        "1668247156": {
          local: "0xB706319D37b945727E71ae0d4353699d19112576",
          adopted: "0xB706319D37b945727E71ae0d4353699d19112576",
        },
        /// POLYGON-ZKEVM-TEST
        "1887071092": {
          local: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
          adopted: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
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
        /// ARBITRUM-GOERLI
        "1734439522": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        /// ZKSYNC-TEST
        "2053862260": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        /// CONSENSYS-ZKEVM-TEST
        "1668247156": {
          local: "0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63",
          adopted: "0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63",
        },
        /// POLYGON-ZKEVM-TEST
        "1887071092": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
      },
    },
    // {
    //   name: "WETH",
    //   canonical: {
    //     domain: "1735353714",
    //     address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    //     decimals: 18,
    //   },
    //   representations: {
    //     "1735356532": {
    //       local: "0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E",
    //       adopted: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
    //     },
    //     "9991": {
    //       local: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
    //       adopted: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
    //     },
    //     /// ARBITRUM-GOERLI
    //     "1734439522": {
    //       adopted: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2",
    //     },
    //     /// ZKSYNC-TEST
    //     "2053862260": {
    //       local: "0xbef9DE2c456895cdafB0ecB764d2DedFF58ed157",
    //       adopted: "0xbef9DE2c456895cdafB0ecB764d2DedFF58ed157",
    //     },
    //     /// CONSENSYS-ZKEVM-TEST
    //     "1668247156": {
    //       local: "0xB706319D37b945727E71ae0d4353699d19112576",
    //       adopted: "0xB706319D37b945727E71ae0d4353699d19112576",
    //     },
    //     /// POLYGON-ZKEVM-TEST
    //     "1887071092": {
    //       adopted: "0xeE589e91401066068AF129B0005aC3EF69E3fdB4",
    //     },
    //   },
    // },
    // {
    //   name: "HARD",
    //   canonical: {
    //     domain: "1735353714",
    //     address: "0x5c8279211C48abb8b2c104b493561e1EcFB9a595",
    //     decimals: 18,
    //     cap: utils.parseUnits("10000000", 18).toString(),
    //   },
    //   representations: {
    //     /// OPTIMISM-GOERLI
    //     "1735356532": {
    //       adopted: "0x1956831c14d2e193386159837644F193D12b2755",
    //       local: "0x1956831c14d2e193386159837644F193D12b2755",
    //     },
    //     /// MUMBAI
    //     "9991": {
    //       adopted: "0xfA2F9cE589b30F1E4C8Bf20BcB496032087baaF0",
    //       local: "0xfA2F9cE589b30F1E4C8Bf20BcB496032087baaF0",
    //     },
    //     /// ARBITRUM-GOERLI
    //     "1734439522": {
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //     /// ZKSYNC-TEST
    //     "2053862260": {
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //     /// CONSENSYS-ZKEVM-TEST
    //     "1668247156": {
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //     /// POLYGON-ZKEVM-TEST
    //     "1887071092": {
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //   },
    // },
  ],
  agents: {
    watchers: {
      allowlist: ["0x2cfBF3D40F71ceed2997cACbafE9D31e630860CB", "0x54BAA998771639628ffC0206c3b916c466b79c89"],
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
        "0x75bA5Af8EFFDCFca32E1e288806d54277D1fde99", // gelato (new)
        "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92", // gelato
        "0x7198C77022566F8F1f8A9A41C7B9C084bD18F934", // connext relayer
        "0x24d677f8a59a486bfc6d87e9453c4f1fefcb0958",
        "0xaB0A8DCb1590C4565C35cC785dc25A0590398054",
        "0xCDdE9992Fb66038Dd8419b56149a75CC79Df133C",
        "0xf6d4f65325b258b2d70797CA7576CF8CD03Ed7b8",
        "0x8cFAcF1d7f052faA1aED6e793f0C451b5dEA8c1E",
      ],
    },
  },
};
