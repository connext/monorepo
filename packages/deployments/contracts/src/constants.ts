import { NomadConfig } from "@nomad-xyz/configuration";

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

export const MAINNET_CHAINS = [...SKIP_SETUP];

// TODO: remove this once it is merged into the agents package
// NOTE: currently ignoring type errors from `agents` and `bridgeGui` fields
// which are unused in this repository
export const NOMAD_STAGING_CONFIG: NomadConfig = {
  version: 0,
  environment: "staging",
  networks: ["rinkeby", "kovan", "goerli"],
  rpcs: {
    goerli: ["https://goerli-light.eth.linkpool.io"],
    kovan: ["https://kovan.poa.network"],
    rinkeby: ["https://rinkeby-light.eth.linkpool.io"],
  },
  protocol: {
    governor: {
      domain: 1111,
      id: "0x812c096810e8efaa73eff841b601ab82a7be9ab0",
    },
    networks: {
      goerli: {
        name: "goerli",
        domain: 3331,
        connections: ["rinkeby", "kovan"],
        configuration: {
          optimisticSeconds: 10,
          processGas: 850000,
          reserveGas: 15000,
          maximumGas: 1000000,
          updater: "0xd39dd43efdd867939a2f070469cb3e1252827466",
          watchers: ["0x1795f9a0a6853d6328241e9dc37203ca545c3b79"],
          governance: {
            recoveryManager: "0xa4849f1d96b26066f9c631fcdc8f1457d27fb5ec",
            recoveryTimelock: 180,
          },
        },
        specs: {
          chainId: 5,
          blockTime: 15,
          finalizationBlocks: 100,
          supports1559: true,
          confirmations: 4,
          blockExplorer: "https://goerli.etherscan.io/",
          indexPageSize: 2000,
        },
        bridgeConfiguration: {
          weth: "0x0bb7509324ce409f7bbc4b701f932eaca9736ab7",
          customs: [],
          mintGas: 200000,
          deployGas: 850000,
        },
      },
      rinkeby: {
        name: "rinkeby",
        domain: 1111,
        connections: ["goerli", "kovan"],
        configuration: {
          optimisticSeconds: 10,
          processGas: 850000,
          reserveGas: 15000,
          maximumGas: 1000000,
          updater: "0x6b237d5af6e5116fe27116c0f6257caa6721d043",
          watchers: ["0x37b1e57b43e755da8384d05cf437d88d0274bfbd"],
          governance: {
            recoveryManager: "0xa4849f1d96b26066f9c631fcdc8f1457d27fb5ec",
            recoveryTimelock: 180,
          },
        },
        specs: {
          chainId: 4,
          blockTime: 15,
          finalizationBlocks: 80,
          supports1559: true,
          confirmations: 4,
          blockExplorer: "https://rinkeby.etherscan.io/",
          indexPageSize: 2000,
        },
        bridgeConfiguration: {
          weth: "0xc778417e063141139fce010982780140aa0cd5ab",
          customs: [],
          mintGas: 200000,
          deployGas: 850000,
        },
      },
      kovan: {
        name: "kovan",
        domain: 2221,
        connections: ["rinkeby", "goerli"],
        configuration: {
          optimisticSeconds: 10,
          processGas: 850000,
          reserveGas: 15000,
          maximumGas: 1000000,
          updater: "0x5340fe2f454b861e71647bd80596a3463e095c9c",
          watchers: ["0xa031973b293b924f6c848202bf1dc3107fde4d1e"],
          governance: {
            recoveryManager: "0xa4849f1d96b26066f9c631fcdc8f1457d27fb5ec",
            recoveryTimelock: 180,
          },
        },
        specs: {
          chainId: 42,
          blockTime: 4,
          finalizationBlocks: 5,
          supports1559: false,
          confirmations: 15,
          blockExplorer: "https://kovan.etherscan.io/",
          indexPageSize: 2000,
        },
        bridgeConfiguration: {
          weth: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
          customs: [],
          mintGas: 200000,
          deployGas: 850000,
        },
      },
    },
  },
  core: {
    rinkeby: {
      deployHeight: 10537550,
      upgradeBeaconController: "0xec5e307e4ce41e6c9010a5f1792ac796fe24fea0",
      xAppConnectionManager: "0xd65a4fecda0b6339281ebf8467397d867ed08066",
      updaterManager: "0x64b5d98ba7aa803fd5ccee4b68f2b7ed3e315c86",
      governanceRouter: {
        implementation: "0x9ab8fb7df6c347f9401e9be4eff5e1fa7c456267",
        proxy: "0x408eedf7b9a59465bb06f62c278e58d929a4f5fb",
        beacon: "0xebbc6ffa340c2696c94b71c161ceb129530aca40",
      },
      home: {
        implementation: "0x021846f3e7d6f52519e23b1d7303e13f063b3b71",
        proxy: "0xba64e033fafd08e1b14e034fcd31d10e9534ba8e",
        beacon: "0xdefbb737c9f229efec5e7e7896d2c66e7333512b",
      },
      replicas: {
        kovan: {
          implementation: "0x2f205eeedef1a3b95f78f2ce492b1fd20026982e",
          proxy: "0xc819ab82e3ff4d6d66db53c7f081cb3a9bc0bfb2",
          beacon: "0x7e31b1e36313260466123c630e78a038cf6b395b",
        },
        goerli: {
          implementation: "0x2f205eeedef1a3b95f78f2ce492b1fd20026982e",
          proxy: "0x4c57ebd1eacb86d4dd5b64bb67115f9d401bc141",
          beacon: "0x7e31b1e36313260466123c630e78a038cf6b395b",
        },
      },
    },
    goerli: {
      deployHeight: 6748857,
      upgradeBeaconController: "0x3627497fbfdb6c0b4971812a92baab076c5922ea",
      xAppConnectionManager: "0xae2398fe62f348a343a454c3d0cb81885f2bb269",
      updaterManager: "0x3fed184102403c548cc7a028ac20490c7964e82c",
      governanceRouter: {
        implementation: "0x060fe7cb89d56af04800f333e6ff5da8f7f47513",
        proxy: "0xaedf9ab06c019088ca435e9cfa81b53a997dcec9",
        beacon: "0x5b6549371c14b0c1e9bc5536eddd1b6125295ba3",
      },
      home: {
        implementation: "0xbdae77a9d5dffa96285ccba8e2f393ebc540246c",
        proxy: "0x2698210d52378c0c01765ac7e79a10e8a226fbae",
        beacon: "0x881a28465d23976e7ae68ba539cd688fef59b9b6",
      },
      replicas: {
        rinkeby: {
          implementation: "0xb10252d7c83cd5db1e3e295720c298682a56a4ff",
          proxy: "0xf89e0dcea5ae9626810427a62b135394d86913b2",
          beacon: "0xe1fbad342c8f2967f74dcef5db8c774a07b41dab",
        },
        kovan: {
          implementation: "0xb10252d7c83cd5db1e3e295720c298682a56a4ff",
          proxy: "0xd99e2c5ed0aace4c459a850bd2de0b1c0de12bfd",
          beacon: "0xe1fbad342c8f2967f74dcef5db8c774a07b41dab",
        },
      },
    },
    kovan: {
      deployHeight: 31135412,
      upgradeBeaconController: "0x507b0ca7d22e48a2a5b5edf0e3701f60ba52912e",
      xAppConnectionManager: "0x940862959d480dd20921c5ac6b382792a8ae81b6",
      updaterManager: "0x9ff51046f93632fb5fe29d99a6257873761d8707",
      governanceRouter: {
        implementation: "0x3dbe0b6ecd8c73afdc44e1b3a91cc2db302bdfab",
        proxy: "0x229f532037015c60a4d4ca47257aedd6260c8b17",
        beacon: "0x2be882b4008e55805467bf11ce3b5d27ff1631e4",
      },
      home: {
        implementation: "0x4f2e767bd45e7ef84b49453f71f89ed38508f419",
        proxy: "0x852bc04143c53404ad57ab5807c0ba7c418c5098",
        beacon: "0x0c0786f60f3badcd6549d1c5dc2df7a1fb77eff1",
      },
      replicas: {
        rinkeby: {
          implementation: "0xce91cce0f8a83be8611a2f990aa5576e911ec9f7",
          proxy: "0x75ab490a3d11bd15dcd20195b62b954baa387866",
          beacon: "0xa43060bcb336b8e34f3ec406c3bd9fed50a51a5f",
        },
        goerli: {
          implementation: "0xce91cce0f8a83be8611a2f990aa5576e911ec9f7",
          proxy: "0x13d3b4b38b7bf7b468dbee13a7ce74611b8b41a4",
          beacon: "0xa43060bcb336b8e34f3ec406c3bd9fed50a51a5f",
        },
      },
    },
  },
  bridge: {
    goerli: {
      deployHeight: 6748927,
      bridgeRouter: {
        implementation: "0xf06eecc237d3fc74efeb848441eff12cf85ae904",
        proxy: "0x6d8acf60f3ddb6c49def2a2b77e56be2ff1502cf",
        beacon: "0xddd8b23487ec3e4b02427713acf03d2a0c1700d6",
      },
      tokenRegistry: {
        implementation: "0x9361517c61c8144e8fba42ec45ca44868505d46e",
        proxy: "0x22431cd0b489f148fd34baee3accf815750ac732",
        beacon: "0x9dd8fd7e34d9adff5b5333a0eca52b8017f4abba",
      },
      bridgeToken: {
        implementation: "0xc7c12197154859f8b03d8f370fa9cc9efb22ba6b",
        proxy: "0x0000000000000000000000000000000000000000",
        beacon: "0x94d0c8c7cdf68d83816e2a54f6ca1b4da3deff17",
      },
      ethHelper: "0x888ae8056f5b0f8e0268c331666ad08c1e9bd4cf",
      customs: [],
    },
    rinkeby: {
      deployHeight: 10537619,
      bridgeRouter: {
        implementation: "0x0ea056263e70eb9b7b3c30ca9b1d5c0f86f30411",
        proxy: "0x94e10fc081653fda7fb6f3e52189fc58020359bb",
        beacon: "0x4308f89c9f9d8e60655a2f5b2d9fd81cbd563b74",
      },
      tokenRegistry: {
        implementation: "0xdaabea0529c6c23b391ed19cc139a4f65565ef33",
        proxy: "0xbda2ae94347b13ffe3a3b558af59a69ac101ebbe",
        beacon: "0xd6cc8807cdcaa4af36a0a0c41d9a992668de7033",
      },
      bridgeToken: {
        implementation: "0x2ef49f0933abd6c61f25049523f5e1d0b7735e43",
        proxy: "0x0000000000000000000000000000000000000000",
        beacon: "0x2fa4f954a2f7c88cebd220ff929c1c427d5831ce",
      },
      ethHelper: "0x9ad5cea0d01f246a33f785c3a0826f730e4fed1e",
      customs: [],
    },
    kovan: {
      deployHeight: 31135669,
      bridgeRouter: {
        implementation: "0x6e7dd91650596788676cd7e81af0fd97c0b7e7bd",
        proxy: "0xcea649130a0be99eb29663f77e1080f3c1e9f8e9",
        beacon: "0x65549819cb5bcc7861696e6e030a345bd2e86f7e",
      },
      tokenRegistry: {
        implementation: "0x3ad1b098e9667027512b1f87e0d9d0c390ad962c",
        proxy: "0x2d90552f7b1c1929a148b608c4d49f675352c37b",
        beacon: "0xba3c9fb6562da0910b11899415eea20eeabcb10b",
      },
      bridgeToken: {
        implementation: "0xf6d7e89089ba38cc7b451fe9f9be23756d2adb99",
        proxy: "0x0000000000000000000000000000000000000000",
        beacon: "0xa5e0f31d2a1313713d2c2127e9561cc84fd99e27",
      },
      ethHelper: "0x7d341051961b9fa0bd8529649d0cc5f54049e107",
      customs: [],
    },
  },
  agent: {
    rinkeby: {
      rpcStyle: "ethereum",
      db: "/usr/share/nomad",
      logging: {
        fmt: "json",
        level: "info",
      },
      updater: {
        interval: 5,
        enabled: true,
      },
      relayer: {
        interval: 10,
        enabled: true,
      },
      processor: {
        indexOnly: false,
        allowed: null,
        denied: null,
        subsidizedRemotes: ["kovan", "goerli"],
        s3: {
          bucket: "nomadxyz-development-proofs",
          region: "us-west-2",
        },
        interval: 5,
        enabled: true,
      },
      watcher: {
        interval: 5,
        enabled: true,
      },
      kathy: {
        chat: {
          type: "default",
        },
        interval: 500,
        enabled: true,
      },
    } as any,
    goerli: {
      rpcStyle: "ethereum",
      db: "/usr/share/nomad",
      metrics: 9090,
      logging: {
        fmt: "json",
        level: "info",
      },
      updater: {
        interval: 5,
        enabled: true,
      },
      relayer: {
        interval: 10,
        enabled: true,
      },
      processor: {
        indexOnly: false,
        allowed: null,
        denied: null,
        subsidizedRemotes: ["rinkeby", "kovan"],
        s3: {
          bucket: "nomadxyz-development-proofs",
          region: "us-west-2",
        },
        interval: 5,
        enabled: true,
      },
      watcher: {
        interval: 5,
        enabled: true,
      },
      kathy: {
        chat: {
          type: "default",
        },
        interval: 500,
        enabled: true,
      },
    } as any,
    kovan: {
      rpcStyle: "ethereum",
      db: "/usr/share/nomad",
      metrics: 9090,
      logging: {
        fmt: "json",
        level: "info",
      },
      updater: {
        interval: 5,
        enabled: true,
      },
      relayer: {
        interval: 10,
        enabled: true,
      },
      processor: {
        indexOnly: false,
        allowed: null,
        denied: null,
        subsidizedRemotes: ["rinkeby", "goerli"],
        s3: {
          bucket: "nomadxyz-development-proofs",
          region: "us-west-2",
        },
        interval: 5,
        enabled: true,
      },
      watcher: {
        interval: 5,
        enabled: true,
      },
      kathy: {
        chat: {
          type: "default",
        },
        interval: 500,
        enabled: true,
      },
    } as any,
  },
  bridgeGui: {
    kovan: {
      displayName: "Kovan",
      nativeTokenSymbol: "kETH",
      connections: ["rinkeby"],
      connextEnabled: true,
    },
    goerli: {
      displayName: "Goerli",
      nativeTokenSymbol: "gETH",
      connections: ["rinkeby"],
      connextEnabled: true,
    },
    rinkeby: {
      displayName: "Rinkeby",
      nativeTokenSymbol: "rETH",
      connections: ["rinkeby", "kovan", "goerli"],
      manualProcessing: true,
      connextEnabled: true,
    },
  } as any,
};
