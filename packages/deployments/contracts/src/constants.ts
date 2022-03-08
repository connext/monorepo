import { constants } from "ethers";

export const TEST_ROUTERS = [
  "0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a", // live testnet router
  "0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1", // rahul test router
  "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6", // ci/shared router
  "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", // local router
];

export const SKIP_SETUP = [1, 10, 56, 250, 137, 100, 122, 1285, 42161, 43114, 1284];
export const WRAPPED_ETH_MAP = new Map<number, string>([
  [1, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
  [4, "0xc778417E063141139Fce010982780140Aa0cD5Ab"],
  [42, "0xd0A1E359811322d97991E03f863a0C30C2cF029C"],
  [10, "0x4200000000000000000000000000000000000006"],
  [56, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"],
  [137, "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"],
  [250, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"],
  [42161, "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"],
  [43114, "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"],
  [100, "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"],
  [1285, "0x98878B06940aE243284CA214f92Bb71a2b032B8A"],
  [1284, "0xAcc15dC74880C9944775448304B263D191c6077F"],
]);

// Addresses from:
// https://github.com/nomad-xyz/nomad-monorepo/blob/main/typescript/nomad-sdk/src/nomad/domains/dev.ts
export const NOMAD_DEPLOYMENTS: Map<
  number,
  {
    name: string;
    domain: number;
    // bridgeRouter: string;
    // tokenRegistry: string;
    tokenBeacon: string;
    wrappedEth: string;
    home: string;
    replicas: {
      chainId: number;
      replica: string;
      domain: number;
    }[];
    isDev: boolean;
  }
> = new Map([
  [
    4,
    {
      name: "rinkeby",
      domain: 2000,
      // bridgeRouter: "0xeACafFb9fBCe3d4c4C5D07AF5DFa51CcF5a348b7",
      // tokenRegistry: "0x885A8bd4be130422AEB1Eb9Eeb9513a5D2102cad",
      tokenBeacon: "0xeC13CC62F5823143f4bB74DA0C74931e3eB344AD",
      wrappedEth: WRAPPED_ETH_MAP.get(4)!,
      home: "0xBfCBCCce35D8a6e8056c92f225768EbBfBbf1293",
      replicas: [
        {
          chainId: 42,
          replica: "0x7DF0496470369FFFACB660A5139e1649ABFE9D21",
          domain: 3000,
        },
      ],
      isDev: true,
    },
  ],
  [
    42,
    {
      name: "kovan",
      domain: 3000,
      // bridgeRouter: "0xa50E2db92c48f1c20C42338e6091E6B73da376a4",
      // tokenRegistry: "0x7fe65Cd0b589B39E7744DE73ad225085F0FE7f39",
      tokenBeacon: "0xb3808FE90989C90Fb986A3EC10f91D5901bb7801",
      wrappedEth: WRAPPED_ETH_MAP.get(42)!,
      home: "0x4071e4E6AB8F8F1620200B7CF0b92ba930D9aBB6",
      replicas: [
        {
          chainId: 4,
          replica: "0xFA58C14B693C44140208211dDa4A81c182B557c1",
          domain: 2000,
        },
      ],
      isDev: true,
    },
  ],
  [
    31337,
    {
      name: "local31337",
      domain: 31337,
      // bridgeRouter: constants.AddressZero,
      // tokenRegistry: constants.AddressZero,
      tokenBeacon: constants.AddressZero,
      wrappedEth: constants.AddressZero,
      home: constants.AddressZero,
      replicas: [] as any,
      isDev: true,
    },
  ],
  [
    1337,
    {
      name: "local1337",
      domain: 1337,
      // bridgeRouter: constants.AddressZero,
      // tokenRegistry: constants.AddressZero,
      tokenBeacon: constants.AddressZero,
      wrappedEth: constants.AddressZero,
      home: constants.AddressZero,
      replicas: [] as any,
      isDev: true,
    },
  ],
  [
    1338,
    {
      name: "local1338",
      domain: 1338,
      // bridgeRouter: constants.AddressZero,
      // tokenRegistry: constants.AddressZero,
      tokenBeacon: constants.AddressZero,
      wrappedEth: constants.AddressZero,
      home: constants.AddressZero,
      replicas: [] as any,
      isDev: true,
    },
  ],
]);
