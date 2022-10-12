export const PRODUCTION_INIT_CONFIG = {
  hub: 5,
  networks: [
    {
      chain: 5,
      rpc: process.env.GOERLI_ETH_PROVIDER_URL || "https://goerli.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf",
    },
    {
      chain: 420,
      rpc: "https://goerli.optimism.io",
    },
    {
      chain: 80001,
      rpc: "https://rpc.ankr.com/polygon_mumbai",
    },
  ],
  assets: [
    {
      name: "TEST",
      canonical: {
        domain: "1735353714",
        address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
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
      },
    },
    {
      name: "WETH",
      canonical: {
        domain: "1735353714",
        address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      },
      representations: {
        "1735356532": {
          local: "0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E",
          adopted: "x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
        },
        "9991": {
          local: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
          adopted: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
        },
      },
    },
  ],
  agents: {
    watchers: {
      whitelist: ["0x2cfBF3D40F71ceed2997cACbafE9D31e630860CB"],
    },
    routers: {
      whitelist: ["0xD2aD711861ab345977B7379c81165708C8717fF1"],
    },
    sequencers: {
      whitelist: ["0x87D8bd5B49B69f93e226ecF0e87D5bEBc3f6359C"],
    },
    relayers: {
      whitelist: ["0xaB0A8DCb1590C4565C35cC785dc25A0590398054", "0xCDdE9992Fb66038Dd8419b56149a75CC79Df133C"],
    },
  },
};
