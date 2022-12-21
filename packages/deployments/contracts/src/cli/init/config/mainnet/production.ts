import { utils } from "ethers";

import { InitConfig } from "../../helpers";

export const MAINNET_PRODUCTION_INIT_CONFIG: InitConfig = {
  hub: "6648936", // MAINNET
  supportedDomains: [
    "6648936", // MAINNET
    "1869640809", // OPTIMISM
    "1886350457", // POLYGON
    "1634886255", // ARBITRUM ONE
    "6450786", // BNB
    "6778479", // GNOSIS
  ],
  assets: [
    {
      name: "USDC",
      canonical: {
        domain: "6648936",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        cap: utils.parseUnits("10000000", 6).toString(),
      },
      representations: {
        "1869640809": {
          local: "",
          adopted: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
        },
        "1886350457": {
          local: "",
          adopted: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        },
        "1634886255": {
          local: "",
          adopted: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        },
        "6450786": {
          local: "",
          adopted: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        },
        "6778479": {
          local: "",
          adopted: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
        },
      },
    },
    {
      name: "WETH",
      canonical: {
        domain: "6648936",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        "1869640809": {
          local: "",
          adopted: "0x4200000000000000000000000000000000000006",
        },
        "1886350457": {
          local: "",
          adopted: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        },
        "1634886255": {
          local: "",
          adopted: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        },
        "6450786": {
          local: "",
          adopted: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        },
        "6778479": {
          local: "",
          adopted: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
        },
      },
    },
    {
      name: "KP3R",
      canonical: {
        domain: "6648936",
        address: "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        // optimism
        "1869640809": {
          local: "0xca87472DBfB041c2e5a2672d319eA6184Ad9755e",
          adopted: "0xca87472DBfB041c2e5a2672d319eA6184Ad9755e",
        },
        // polygon
        "1886350457": {
          local: "0x4a2bE2075588BcE6A7E072574698a7DbbAc39b08",
          adopted: "0x4a2bE2075588BcE6A7E072574698a7DbbAc39b08",
        },
        // bnb
        "6450786": {
          local: "0x2aa48B3d6EFe651542D22CEF0CB7ea853D97A850",
          adopted: "0x2aa48B3d6EFe651542D22CEF0CB7ea853D97A850",
        },
        // gnosis
        "6778479": {
          local: "0x398bB7642BD0A5c7CB64f6255159BFABa5512342",
          adopted: "0x398bB7642BD0A5c7CB64f6255159BFABa5512342",
        },
        // arbtirum-one
        "1634886255": {
          local: "0x16aF9fe3f9E48547971af959fD631A8cDBE40484",
          adopted: "0x16aF9fe3f9E48547971af959fD631A8cDBE40484",
        },
      },
    },
    {
      name: "kLP",
      canonical: {
        domain: "6648936",
        address: "0x3f6740b5898c5D3650ec6eAce9a649Ac791e44D7",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        // optimism
        "1869640809": {
          local: "0xf232D1Afbed9Df3880143d4FAD095f3698c4d1c6",
          adopted: "0xf232D1Afbed9Df3880143d4FAD095f3698c4d1c6",
        },
        // polygon
        "1886350457": {
          local: "0x7cf93c434260519537184631A347eE8AD0Bc68Cb",
          adopted: "0x7cf93c434260519537184631A347eE8AD0Bc68Cb",
        },
        // bnb
        "6450786": {
          local: "0xd00D9EE9238687A2041004Fe9D55a2299e0Af2fa",
          adopted: "0xd00D9EE9238687A2041004Fe9D55a2299e0Af2fa",
        },
        // gnosis
        "6778479": {
          local: "0x386508A233EE1494d31555Ab8aa2df6D6DC76E61",
          adopted: "0x386508A233EE1494d31555Ab8aa2df6D6DC76E61",
        },
        // arbtirum-one
        "1634886255": {
          local: "0x386E2699f89EDE6005c4913512bC88F05847607B",
          adopted: "0x386E2699f89EDE6005c4913512bC88F05847607B",
        },
      },
    },
  ],
  agents: {
    watchers: {
      allowlist: ["0xade09131C6f43fe22C2CbABb759636C43cFc181e"],
    },
    routers: {
      allowlist: ["0xF26c772C0fF3a6036bDdAbDAbA22cf65ECa9F97c"],
    },
    sequencers: {
      allowlist: ["0x4fFA5968857a6C8242E4A6Ded2418155D33e82E7"],
    },
    relayers: {
      allowlist: [
        "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92",
        "0x935AaAe0f5b02007c08512F0629a9d37Af2E1A47",
        "0x9B077C59fDe7de5AdCeF8093Bc38B61d43FC7007",
        "0xE2Fc8F14B6cEb1AD8165623E02953eDB100288bE",
        "0xe8a5eE73f3c8F1Cd55915f6Eb5Fc7df4206f3C78",
        "0x43728A95386D64384C76Afd416Dcc8118869BA6c",
        "0x62B1a88CCc6BC5e6FF91FB2FCD29Ab4F819b35C6",
      ],
    },
  },
};
