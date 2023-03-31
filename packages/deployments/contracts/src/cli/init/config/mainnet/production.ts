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
    // {
    //   name: "USDC",
    //   canonical: {
    //     domain: "6648936",
    //     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    //     decimals: 6,
    //     cap: utils.parseUnits("10000000", 6).toString(),
    //   },
    //   representations: {
    //     "1869640809": {
    //       local: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
    //       adopted: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    //     },
    //     "1886350457": {
    //       local: "0xF96C6d2537e1af1a9503852eB2A4AF264272a5B6",
    //       adopted: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //     },
    //     "1634886255": {
    //       local: "0x8c556cF37faa0eeDAC7aE665f1Bb0FbD4b2eae36",
    //       adopted: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    //     },
    //     "6450786": {
    //       local: "0x5e7D83dA751F4C9694b13aF351B30aC108f32C38",
    //       adopted: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    //     },
    //     "6778479": {
    //       local: "0x44CF74238d840a5fEBB0eAa089D05b763B73faB8",
    //       adopted: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    //     },
    //   },
    // },
    // {
    //   name: "WETH",
    //   canonical: {
    //     domain: "6648936",
    //     address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    //     decimals: 18,
    //     cap: utils.parseUnits("10000000", 18).toString(),
    //   },
    //   representations: {
    //     "1869640809": {
    //       local: "0xbAD5B3c68F855EaEcE68203312Fd88AD3D365e50",
    //       adopted: "0x4200000000000000000000000000000000000006",
    //     },
    //     "1886350457": {
    //       local: "0x4b8BaC8Dd1CAA52E32C07755c17eFadeD6A0bbD0",
    //       adopted: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    //     },
    //     "1634886255": {
    //       local: "0x2983bf5c334743Aa6657AD70A55041d720d225dB",
    //       adopted: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    //     },
    //     "6450786": {
    //       local: "0xA9CB51C666D2AF451d87442Be50747B31BB7d805",
    //       adopted: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    //     },
    //     "6778479": {
    //       local: "0x538E2dDbfDf476D24cCb1477A518A82C9EA81326",
    //       adopted: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    //     },
    //   },
    // },
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
      allowlist: [
        "0x22831e4f21ce65b33ef45df0e212b5bebf130e5a", // BlockTech
        "0xbe7bc00382a50a711d037eaecad799bb8805dfa8", // Minerva
        "0x63Cda9C42db542bb91a7175E38673cFb00D402b0", // Consensys Mesh
        "0xF26c772C0fF3a6036bDdAbDAbA22cf65ECa9F97c", // Connext
        "0x97b9dcB1AA34fE5F12b728D9166ae353d1e7f5C4", // P2P
        "0x8cb19ce8eedf740389d428879a876a3b030b9170", // BWare
        "0x0e62f9fa1f9b3e49759dc94494f5bc37a83d1fad", // Bazilik
        "0x58507fed0cb11723dfb6848c92c59cf0bbeb9927", // Hashquark
        "0x7ce49752fFA7055622f444df3c69598748cb2E5f", // Vault Staking
        "0x33b2ad85f7dba818e719fb52095dc768e0ed93ec", // Ethereal
        "0x048a5EcC705C280b2248aefF88fd581AbbEB8587", // Gnosis
        "0x975574980a5Da77f5C90bC92431835D91B73669e", // 01node
        "0x6892d4D1f73A65B03063B7d78174dC6350Fcc406", // Unagii
        "0x32d63da9f776891843c90787cec54ada23abd4c2", // Ingag
        "0xFaAB88015477493cFAa5DFAA533099C590876F21", // Paradox
      ],
    },
    sequencers: {
      allowlist: ["0x4fFA5968857a6C8242E4A6Ded2418155D33e82E7"],
    },
    relayers: {
      allowlist: [
        "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92", // gelato 1balance
        "0x0ae392879A228B2484D9B1F80A5D0B7080FE79C2", // gelato arbitrum
        "0x43100a190c3feae37cb1f5d880e8fa8d81be5cb9", // gelato arbitrum
        "0x935AaAe0f5b02007c08512F0629a9d37Af2E1A47", // connext relayer
        "0x9B077C59fDe7de5AdCeF8093Bc38B61d43FC7007", // gelato mainnet
        "0xE2Fc8F14B6cEb1AD8165623E02953eDB100288bE", // gelato polygon
        "0xe8a5eE73f3c8F1Cd55915f6Eb5Fc7df4206f3C78", // gelato optimism
        "0x43728A95386D64384C76Afd416Dcc8118869BA6c", // gelato bsc
        "0x62B1a88CCc6BC5e6FF91FB2FCD29Ab4F819b35C6", // gelato gnosis
      ],
    },
  },
};
