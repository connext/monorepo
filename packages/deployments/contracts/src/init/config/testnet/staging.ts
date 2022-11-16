import { InitConfig } from "../../helpers";

export const TESTNET_STAGING_INIT_CONFIG: InitConfig = {
  hub: "1735353714", /// GOERLI
  supportedDomains: [
    "1735353714",
    "1735356532",
    // "1734439522", /// ARBITRUM-GOERLI
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
        // "1734439522": {
        //   local: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
        //   adopted: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
        // },
      },
    },
    {
      name: "TEST2",
      canonical: {
        domain: "1735353714",
        address: "0x681B5f54B936F2cBb52C41C2CaCbdb4f3A805e77",
        decimals: 18,
      },
      representations: {
        "1735356532": {
          local: "0x387d74037a7b691e8f6203b8c7589ea9d0b7d3c0",
          adopted: "0x154284B2Fa68AB299fa40F144b6D0983163cd108",
        },
        "9991": {
          local: "0xaa52c1e21428e1a081d77c869276100be1db9aee",
          adopted: "0x6c6F2Ed3283124eA2C861100ED044f4d0F434Fc1",
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
        // "1734439522": {
        //   local: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2",
        //   adopted: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2",
        // },
      },
    },
  ],
  agents: {
    watchers: {
      allowlist: ["0x2cfBF3D40F71ceed2997cACbafE9D31e630860CB", "0x54BAA998771639628ffC0206c3b916c466b79c89"],
    },
    routers: {
      allowlist: ["0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7"],
    },
    sequencers: {
      allowlist: ["0xAFCBcdF90776bCFBcB334a6908fdEDa02A75B983"],
    },
    relayers: {
      allowlist: ["0xaBcC9b596420A9E9172FD5938620E265a0f9Df92", "0xED6fbBB952F5dA88bE9B507A9b2289B1ec07d494"],
    },
  },
};
