import { InitConfig } from "../../helpers";

export const TESTNET_PRODUCTION_INIT_CONFIG: InitConfig = {
  hub: "1936027759", /// SEPOLIA
  supportedDomains: [
    "1936027759", /// SEPOLIA
    "1869640549", /// OPTIMISM-SEPOLIA
    "1633842021", /// ARBITRUM-SEPOLIA
  ],
  assets: [
    {
      name: "TEST",
      canonical: {
        domain: "1936027759",
        address: "0xd26e3540A0A368845B234736A0700E0a5A821bBA",
        decimals: 18,
      },
      representations: {
        /// OPTIMISM-SEPOLIA
        "1869640549": {
          local: "0x7Fa13D6CB44164ea09dF8BCc673A8849092D435b",
          adopted: "0x7Fa13D6CB44164ea09dF8BCc673A8849092D435b",
        },
        /// ARBITRUM-SEPOLIA
        "1633842021": {
          local: "0xaBF282c88DeD3e386701a322e76456c062468Ac2",
          adopted: "0xaBF282c88DeD3e386701a322e76456c062468Ac2",
        },
      },
    },
    {
      name: "InrETH",
      canonical: {
        domain: "11111",
        decimals: 18,
        address: "0xa66e9339418c1e85bc957062D8D75036dB97e57B",
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
    {
      name: "xezETH",
      canonical: {
        domain: "11111",
        address: "0xe60EEEEE9503D59c7db940889228fAceB0aF5DF2",
        decimals: 18,
      },
      representations: {
        /// Goerli
        "1735353714": {
          local: "0xe60EEEEE9503D59c7db940889228fAceB0aF5DF2",
          adopted: "0xe60EEEEE9503D59c7db940889228fAceB0aF5DF2",
        },
        /// Optimism-Goerli
        "1735356532": {
          local: "0xe60EEEEE9503D59c7db940889228fAceB0aF5DF2",
          adopted: "0xe60EEEEE9503D59c7db940889228fAceB0aF5DF2",
        },
      },
    },
    {
      name: "GovernTest",
      canonical: {
        domain: "11111",
        address: "0xb8F010bC74e4de27d9e69063F3faf5F7317831d3",
        decimals: 18,
      },
      representations: {
        /// Goerli
        "1735353714": {
          local: "0xb8F010bC74e4de27d9e69063F3faf5F7317831d3",
          adopted: "0xb8F010bC74e4de27d9e69063F3faf5F7317831d3",
        },
        /// Mumbai
        "9991": {
          local: "0xb8F010bC74e4de27d9e69063F3faf5F7317831d3",
          adopted: "0xb8F010bC74e4de27d9e69063F3faf5F7317831d3",
        },
        /// Linea
        "1668247156": {
          local: "0xB91471be67c8F2Ada2Cd36cA5EB439B017B80a37",
          adopted: "0xB91471be67c8F2Ada2Cd36cA5EB439B017B80a37",
        },
      },
    },
  ],
  agents: {
    relayerFeeVaults: {
      "1936027759": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "1869640549": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
      "1633842021": "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
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
        "0x4A4a3e5914C6FDfa5971254215236489B72eACB5", // dialectic
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
      blacklist: [],
    },
    proposers: {
      allowlist: [
        "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006",
        "0xc291875f68f9783e83D01Ccf04A5E1392399CDF2", // lighthouse
      ],
    },
  },
};
