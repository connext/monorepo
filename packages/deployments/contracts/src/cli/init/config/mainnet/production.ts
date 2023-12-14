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
  // NOTE: ENSURE LPTOKEN AND BRIDGETOKEN NAMES ARE GENERATED CORRECTLY BASED
  // ON THE NAME GIVEN IN EACH ASSET ENTRY
  assets: [
    {
      name: "USDT",
      canonical: {
        domain: "6648936",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
        cap: utils.parseUnits("10000000", 6).toString(),
      },
      representations: {
        "1869640809": {
          local: "0x4cbb28fa12264cd8e87c62f4e1d9f5955ce67d20",
          adopted: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        },
        "1886350457": {
          local: "0xe221c5a2a8348f12dcb2b0e88693522ebad2690f",
          adopted: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        },
        "1634886255": {
          local: "0x2fd7e61033b3904c65aa9a9b83dcd344fa19ffd2",
          adopted: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        },
        "6450786": {
          local: "0xd609f26b5547d5e31562b29150769cb7c774b97a",
          adopted: "0x55d398326f99059fF775485246999027B3197955",
        },
        "6778479": {
          local: "0xf4d944883d6fddc56d3534986fef82105cadbfa1",
          adopted: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        },
      },
    },
    {
      name: "DAI",
      canonical: {
        domain: "6648936",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        "1869640809": {
          local: "0xd64bd028b560bbfc732ea18f282c64b86f3468e0",
          adopted: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        },
        "1886350457": {
          local: "0xadce87b14d570665222c1172d18a221bf7690d5a",
          adopted: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        },
        "1634886255": {
          local: "0xfde99b3b3fbb69553d7dae105ef34ba4fe971190",
          adopted: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        },
        "6450786": {
          local: "0x86a343bcf17d79c475d300eed35f0145f137d0c9",
          adopted: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        },
        "6778479": {
          local: "0x0e1d5bcd2ac5cf2f71841a9667afc1e995caaf4f",
          adopted: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
        },
      },
    },
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
          local: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
          adopted: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
        },
        "1886350457": {
          local: "0xF96C6d2537e1af1a9503852eB2A4AF264272a5B6",
          adopted: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        },
        "1634886255": {
          local: "0x8c556cF37faa0eeDAC7aE665f1Bb0FbD4b2eae36",
          adopted: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        },
        "6450786": {
          local: "0x5e7D83dA751F4C9694b13aF351B30aC108f32C38",
          adopted: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        },
        "6778479": {
          local: "0x44CF74238d840a5fEBB0eAa089D05b763B73faB8",
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
          local: "0xbAD5B3c68F855EaEcE68203312Fd88AD3D365e50",
          adopted: "0x4200000000000000000000000000000000000006",
        },
        "1886350457": {
          local: "0x4b8BaC8Dd1CAA52E32C07755c17eFadeD6A0bbD0",
          adopted: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        },
        "1634886255": {
          local: "0x2983bf5c334743Aa6657AD70A55041d720d225dB",
          adopted: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        },
        "6450786": {
          local: "0xA9CB51C666D2AF451d87442Be50747B31BB7d805",
          adopted: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        },
        "6778479": {
          local: "0x538E2dDbfDf476D24cCb1477A518A82C9EA81326",
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
    {
      name: "nextAlUSD",
      canonical: {
        domain: "6648936",
        address: "0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        /// ARBITRUM
        "1634886255": {
          local: "0x49000f5e208349D2fA678263418e21365208E498",
          adopted: "0x49000f5e208349D2fA678263418e21365208E498",
        },
        /// OPTIMISM
        "1869640809": {
          local: "0x49000f5e208349D2fA678263418e21365208E498",
          adopted: "0x49000f5e208349D2fA678263418e21365208E498",
        },
        // polygon
        "1886350457": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        // bnb
        "6450786": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        // gnosis
        "6778479": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
      },
    },
    {
      name: "nextAlETH",
      canonical: {
        domain: "6648936",
        address: "0x0100546F2cD4C9D97f798fFC9755E47865FF7Ee6",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        /// ARBITRUM
        "1634886255": {
          local: "0x303241e2B3b4aeD0bb0F8623e7442368FED8Faf3",
          adopted: "0x303241e2B3b4aeD0bb0F8623e7442368FED8Faf3",
        },
        /// OPTIMISM
        "1869640809": {
          local: "0x303241e2B3b4aeD0bb0F8623e7442368FED8Faf3",
          adopted: "0x303241e2B3b4aeD0bb0F8623e7442368FED8Faf3",
        },
        // polygon
        "1886350457": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        // bnb
        "6450786": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
        // gnosis
        "6778479": {
          local: "0x0000000000000000000000000000000000000000",
          adopted: "0x0000000000000000000000000000000000000000",
        },
      },
    },
    // {
    //   // TODO: remove after execution layer upgrade
    //   name: "XOC",
    //   // polygon
    //   canonical: {
    //     domain: "1886350457",
    //     address: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    //     decimals: 18,
    //     cap: utils.parseUnits("0", 18).toString(),
    //   },
    //   representations: {
    //     // mainnet
    //     "6648936": {
    //       local: "0x0000000000000000000000000000000000000000",
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //     // optimism
    //     "1869640809": {
    //       local: "0x0000000000000000000000000000000000000000",
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //     // arbitrum one
    //     "1634886255": {
    //       local: "0x0000000000000000000000000000000000000000",
    //       adopted: "0x0000000000000000000000000000000000000000",
    //     },
    //     // bsc
    //     "6450786": {
    //       local: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    //       adopted: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    //     },
    //     // gnosis
    //     "6778479": {
    //       local: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    //       adopted: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    //     },
    //   },
    // },
    // {
    {
      name: "XOC",
      canonical: {
        domain: "11111",
        address: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
        decimals: 18,
      },
      representations: {
        // bsc
        "6450786": {
          local: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
          adopted: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
        },
        // gnosis
        "6778479": {
          local: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
          adopted: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
        },
        // polygon
        "1886350457": {
          local: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
          adopted: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
        },
      },
    },
    {
      name: "BTRST",
      canonical: {
        domain: "6648936",
        address: "0x799ebfABE77a6E34311eeEe9825190B9ECe32824",
        decimals: 18,
        cap: utils.parseUnits("10000000", 18).toString(),
      },
      representations: {
        /// POLYGON
        "1886350457": {
          local: "0x8C92DC2B9D6A8A567c7Bd80C5db7a1eDA4fA9A91",
          adopted: "0x8C92DC2B9D6A8A567c7Bd80C5db7a1eDA4fA9A91",
        },
      },
    },
    {
      name: "NEXT",
      canonical: {
        domain: "6648936",
        address: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
        decimals: 18,
        cap: utils.parseUnits("500000000", 18).toString(),
      },
      representations: {
        // optimism
        "1869640809": {
          local: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          adopted: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
        },
        // arbitrum one
        "1634886255": {
          local: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          adopted: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
        },
        // polygon
        "1886350457": {
          local: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          adopted: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
        },
        // bsc
        "6450786": {
          local: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          adopted: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
        },
        // gnosis
        "6778479": {
          local: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          adopted: "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
        },
      },
    },
    // {
    //   // TODO: remove after execution layer upgrade
    //   name: "xRADAR",
    //   canonical: {
    //     domain: "6648936",
    //     address: "0x202426c15a18a0e0fE3294415E66421891E2EB7C",
    //     decimals: 18,
    //     cap: utils.parseUnits("0", 18).toString(),
    //   },
    //   representations: {
    //     /// BSC
    //     "6450786": {
    //       local: "0x489580eB70a50515296eF31E8179fF3e77E24965",
    //       adopted: "0x489580eB70a50515296eF31E8179fF3e77E24965",
    //     },
    //   },
    // },
    {
      name: "xRADAR",
      canonical: {
        domain: "11111",
        address: "0x202426c15a18a0e0fE3294415E66421891E2EB7C",
        decimals: 18,
      },
      representations: {
        /// MAINNET
        "6648936": {
          local: "0x202426c15a18a0e0fE3294415E66421891E2EB7C",
          adopted: "0x202426c15a18a0e0fE3294415E66421891E2EB7C",
        },
        /// BSC
        "6450786": {
          local: "0x489580eB70a50515296eF31E8179fF3e77E24965",
          adopted: "0x489580eB70a50515296eF31E8179fF3e77E24965",
        },
        /// Polygon
        "1886350457": {
          local: "0xdCb72AE4d5dc6Ae274461d57E65dB8D50d0a33AD",
          adopted: "0xdCb72AE4d5dc6Ae274461d57E65dB8D50d0a33AD",
        },
      },
    },
    {
      name: "xoLIT",
      canonical: {
        domain: "11111",
        address: "0x24F21b1864d4747a5c99045c96dA11DBFDa378f7",
        decimals: 18,
      },
      representations: {
        /// ETHEREUM
        "6648936": {
          local: "0x24F21b1864d4747a5c99045c96dA11DBFDa378f7",
          adopted: "0x24F21b1864d4747a5c99045c96dA11DBFDa378f7",
        },
        /// ARBITRUM
        "1634886255": {
          local: "0x24F21b1864d4747a5c99045c96dA11DBFDa378f7",
          adopted: "0x24F21b1864d4747a5c99045c96dA11DBFDa378f7",
        },
      },
    },
  ],
  agents: {
    relayerFeeVaults: {
      "6648936": "0x4d50a469fc788a3c0CdC8Fd67868877dCb246625",
      "1869640809": "0x6eCeD04DdC5A7709d5877c963cED0288Fb1c7348",
      "1886350457": "0x0970Adeb473609F91D03e9Bba85F49C445040cD7",
      "1634886255": "0x5C711DB90dEc0a5B81C626968DEa4187a7f9C1F2",
      "6450786": "0x9435Ba7C661a0Fd477deED640491de8c100325A7",
      "6778479": "0x7616Bc6d0dee5E250BA5b3dDa6cbbB71786FB638",
    },
    watchers: {
      allowlist: ["0xade09131C6f43fe22C2CbABb759636C43cFc181e"],
    },
    routers: {
      allowlist: [
        "0x76cf58ce587bc928fcc5ad895555fd040e06c61a", // BTRST
        "0x5d527765252003AceE6545416F6a9C8D15ae8402", // 01node
        "0x49a9E7ec76Bc8fDF658d09557305170d9F01D2fA", // BlockTech 3
        "0x6273c0965A1dB4F8A6277d490B4fD48715a42b96", // Xocalatl
        "0x9584Eb0356a380b25D7ED2C14c54De58a25f2581", // Mike Nai
        "0xC4Ae07F276768A3b74AE8c47bc108a2aF0e40eBa", // P2P 2
        "0xEca085906cb531bdf1F87eFA85c5bE46aA5C9d2c", // BlockTech 2
        "0x22831e4f21ce65b33ef45df0e212b5bebf130e5a", // BlockTech 1
        "0xbe7bc00382a50a711d037eaecad799bb8805dfa8", // Minerva
        "0x63Cda9C42db542bb91a7175E38673cFb00D402b0", // Consensys Mesh
        "0xF26c772C0fF3a6036bDdAbDAbA22cf65ECa9F97c", // Connext
        "0x97b9dcB1AA34fE5F12b728D9166ae353d1e7f5C4", // P2P 1
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
        "0x75bA5Af8EFFDCFca32E1e288806d54277D1fde99", // gelato (new)
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
