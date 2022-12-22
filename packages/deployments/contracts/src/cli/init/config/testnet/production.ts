import { InitConfig } from "../../helpers";

export const TESTNET_PRODUCTION_INIT_CONFIG: InitConfig = {
  hub: "1735353714", /// GOERLI
  supportedDomains: [
    "1735353714", /// GOERLI
    "1735356532", /// OPTIMISM-GOERLI
    "1734439522", /// ARBITRUM-GOERLI
    "9991", /// MUMBAI
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
      },
    },
    {
      name: "WETH",
      canonical: {
        domain: "1735353714",
        address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        decimals: 18,
      },
      representations: {
        "1735356532": {
          local: "0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E",
          adopted: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
        },
        "9991": {
          local: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
          adopted: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
        },
        /// ARBITRUM-GOERLI
        "1734439522": {
          adopted: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2",
        },
      },
    },
    // {
    //   name: "KP3R",
    //   canonical: {
    //     domain: "1735353714",
    //     address: "0x16F63C5036d3F48A239358656a8f123eCE85789C",
    //     decimals: 18,
    //   },
    //   representations: {
    //     "1735356532": {
    //       local: "0x3Db593146464816F10d4eBA4743C76A5A4D08425",
    //       adopted: "0x3Db593146464816F10d4eBA4743C76A5A4D08425",
    //     },
    //     "9991": {
    //       local: "0xEa6943C4f6467C4E5faC8f5824C515abdeA1af3B",
    //       adopted: "0xEa6943C4f6467C4E5faC8f5824C515abdeA1af3B",
    //     },
    //     // TODO: once testnet prod contracts are deployed for chapel
    //     // "1667785072": {
    //     //   local: "",
    //     //   adopted: "",
    //     // },
    //   },
    // },
    // {
    //   name: "kLP",
    //   canonical: {
    //     domain: "1735353714",
    //     address: "0xb4A7137B024d4C0531b0164fCb6E8fc20e6777Ae",
    //     decimals: 18,
    //   },
    //   representations: {
    //     "1735356532": {
    //       local: "0xA437aC90d360c7645f25f30ddE201a94fe137Af5",
    //       adopted: "0xA437aC90d360c7645f25f30ddE201a94fe137Af5",
    //     },
    //     "9991": {
    //       local: "0xCE6a21d1110876cF0C72061a24cC7d9EAB7265c9",
    //       adopted: "0xCE6a21d1110876cF0C72061a24cC7d9EAB7265c9",
    //     },
    //     // TODO: once testnet prod contracts are deployed for chapel
    //     // "1667785072": {
    //     //   local: "",
    //     //   adopted: "",
    //     // },
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
      ],
    },
    sequencers: {
      allowlist: ["0x87D8bd5B49B69f93e226ecF0e87D5bEBc3f6359C"],
    },
    relayers: {
      allowlist: [
        "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92",
        "0x7198C77022566F8F1f8A9A41C7B9C084bD18F934",
        "0x24d677f8a59a486bfc6d87e9453c4f1fefcb0958",
        "0xaB0A8DCb1590C4565C35cC785dc25A0590398054",
        "0xCDdE9992Fb66038Dd8419b56149a75CC79Df133C",
        "0xf6d4f65325b258b2d70797CA7576CF8CD03Ed7b8",
        "0x8cFAcF1d7f052faA1aED6e793f0C451b5dEA8c1E",
      ],
    },
  },
};
