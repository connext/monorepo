import { BigNumber, constants, utils } from "ethers";
import { getDeploymentName } from "../src";

export type AMBInfo = {
  hub: string;
  spoke: string;
};

export const OPTIMISM_AMB: AMBInfo = {
  hub: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",
  spoke: "0x4200000000000000000000000000000000000007",
};

/**
 * Configuration scheme for Messaging contract deployments.
 */

// Contract prefixes for Connector contracts.
export const HUB_PREFIX = "Hub";
export const SPOKE_PREFIX = "Spoke";

const DEFAULT_PROCESS_GAS = BigNumber.from("850000");
const DEFAULT_RESERVE_GAS = BigNumber.from("15000");
const DEFAULT_DELAY_BLOCKS = 120; // ~30min
const DEFAULT_DISPUTE_BLOCKS = 120; // ~30min

export type RelayerConfig = {
  [chain: number]: {
    relayerFeeVault: string;
  };
};

// mapping of chainId => rough blocks per minute
const BLOCKS_PER_MINUTE: Record<number, number> = {
  // mainnets
  1: 4, // mainnet
  10: 30, // optimism
  56: 30, // bsc
  100: 30, // gnosis
  137: 30, // polygon
  42161: 30, // arbitrum one
  59144: 30, // linea
  8453: 30, // base

  // testnets
  5: 4, // goerli
  420: 30, // optimism-goerli
  80001: 30, // mumbai
  59140: 30, // linea-goerli
  84531: 30, // base-goerli
  195: 60, // x1-testnet
};

const THIRTY_MINUTES_IN_BLOCKS = Object.fromEntries(
  Object.entries(BLOCKS_PER_MINUTE).map(([key, value]) => {
    return [key, value * 30];
  }),
);

export const RELAYER_CONFIGS: {
  local: RelayerConfig;
  testnet: RelayerConfig;
  mainnet: RelayerConfig;
} = {
  local: {
    1337: {
      relayerFeeVault: constants.AddressZero,
    },
    1338: {
      relayerFeeVault: constants.AddressZero,
    },
  },
  testnet: {
    5: {
      relayerFeeVault: "",
    },
  },
  mainnet: {
    1: {
      relayerFeeVault: "",
    },
  },
};

export type MessagingProtocolConfig = {
  // The chain ID of the hub. For production environment, should be Ethereum Mainnet (1).
  hub: {
    chain: number;
    minDisputeBlocks: number;
    disputeBlocks: number;
  };
  configs: {
    // Map of chain ID => configs.
    [chain: number]: {
      prefix: string; // The chain's name and the Connector name prefix.
      // Official AMB contract addresses.
      networkName?: string;
      ambs: {
        hub: string;
        spoke: string;
      };
      processGas: BigNumber;
      reserveGas: BigNumber;
      delayBlocks: number;
      custom?: {
        hub?: { [key: string]: string | BigNumber };
        spoke?: { [key: string]: string | BigNumber };
      };
    };
  };
};

export const getFacetsToDeploy = (zksync: boolean) => [
  {
    // always include the loupe facet
    name: "_DefaultDiamondLoupeFacet",
    contract: "DiamondLoupeFacet",
    args: [],
    deterministic: !zksync,
  },
  { name: getDeploymentName("TokenFacet"), contract: "TokenFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("BridgeFacet"), contract: "BridgeFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("InboxFacet"), contract: "InboxFacet", args: [], deterministic: !zksync },
  {
    name: getDeploymentName("ProposedOwnableFacet"),
    contract: "ProposedOwnableFacet",
    args: [],
    deterministic: !zksync,
  },
  { name: getDeploymentName("PortalFacet"), contract: "PortalFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("RelayerFacet"), contract: "RelayerFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("RoutersFacet"), contract: "RoutersFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("StableSwapFacet"), contract: "StableSwapFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("SwapAdminFacet"), contract: "SwapAdminFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("DiamondCutFacet"), contract: "DiamondCutFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("DiamondInit"), contract: "DiamondInit", args: [], deterministic: !zksync },
];

export const MESSAGING_PROTOCOL_CONFIGS: Record<string, MessagingProtocolConfig> = {
  local: {
    hub: {
      chain: 1337,
      disputeBlocks: DEFAULT_DISPUTE_BLOCKS,
      minDisputeBlocks: 0,
    },
    configs: {
      1337: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
      1338: {
        prefix: "Optimism",
        ambs: {
          hub: OPTIMISM_AMB.hub,
          spoke: OPTIMISM_AMB.spoke,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383#code
            optimismPortal: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383",
          },
        },
      },
    },
  },
  testnet: {
    hub: {
      chain: 5,
      minDisputeBlocks: DEFAULT_DISPUTE_BLOCKS / 2,
      disputeBlocks: DEFAULT_DISPUTE_BLOCKS,
    }, // Goerli hub.
    configs: {
      // TODO: Configs for rinkeby, ropsten, etc.
      // Optimism goerli:
      420: {
        prefix: "Optimism",
        ambs: {
          // L1CrossDomainMessenger
          // https://kovan.etherscan.io/address/0x22f24361d548e5faafb36d1437839f080363982b
          // hub: "0x22F24361D548e5FaAfb36d1437839f080363982B",

          // https://goerli.etherscan.io/address/0x5086d1eEF304eb5284A0f6720f79403b4e9bE294
          hub: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294", // L1 cross domain messenger
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383#code
            optimismPortal: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Arbitrum nitro goerli testnet:
      // https://developer.offchainlabs.com/docs/Useful_Addresses
      421613: {
        prefix: "Arbitrum",
        ambs: {
          // https://goerli.etherscan.io/address/0x6BEbC4925716945D46F0Ec336D5C2564F419682C
          hub: "0x6BEbC4925716945D46F0Ec336D5C2564F419682C",
          // https://goerli-rollup-explorer.arbitrum.io/address/0x0000000000000000000000000000000000000064
          spoke: "0x0000000000000000000000000000000000000064",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x45Af9Ed1D03703e480CE7d328fB684bb67DA5049
            outbox: "0x45Af9Ed1D03703e480CE7d328fB684bb67DA5049",
            maxSubmissionCostCap: utils.parseUnits("100000", "gwei"),
            maxGasCap: DEFAULT_PROCESS_GAS,
            gasPriceCap: utils.parseUnits("20", "gwei"), // minimum on arbitrum is 0.01 gwei
          },
        },
      },
      80001: {
        prefix: "Polygon",
        ambs: {
          // FxRoot on goerli
          // https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA
          hub: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
          // FxChild on mumbai
          // https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11
          spoke: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x2890ba17efe978480615e330ecb65333b880928e
            checkpointManager: "0x2890bA17EfE978480615e330ecB65333b880928e",
          },
        },
      },
      280: {
        prefix: "ZkSync",
        ambs: {
          // zkSync Diamond on goerli
          // https://goerli.etherscan.io/address/0x1908e2bf4a88f91e4ef0dc72f02b8ea36bea2319
          hub: "0x1908e2BF4a88F91E4eF0DC72f02b8Ea36BEa2319",
          // zkSync on testnet
          // https://goerli.explorer.zksync.io/address/0x0000000000000000000000000000000000008008
          // https://github.com/matter-labs/era-system-contracts/blob/5a6c728576de5db68ad577a09f34e7b85c374192/contracts/Constants.sol#L40
          spoke: "0x0000000000000000000000000000000000008008",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      59140: {
        prefix: "Consensys",
        ambs: {
          // ZkEvmV202 on goerli
          // https://goerli.etherscan.io/address/0x70BaD09280FD342D02fe64119779BC1f0791BAC2
          hub: "0x70BaD09280FD342D02fe64119779BC1f0791BAC2",
          // L2Bridge on zkEvm
          // https://explorer.goerli.linea.build/address/0xC499a572640B64eA1C8c194c43Bc3E19940719dC/transactions#address-tabs
          spoke: "0xC499a572640B64eA1C8c194c43Bc3E19940719dC",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
      195: {
        prefix: "Admin",
        networkName: "X1",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[195],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[195],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[195] / 2,
      },
      // // FIXME: wormhole relayer deployment not listed in docs for goerli
      // // address used is core bridge; different from mainnet so this testnet is skipped
      // 97: {
      //   prefix: "Wormhole",
      //   networkName: "Chapel",
      //   ambs: {
      //     // Wormhole Core bridge
      //     hub: "0x706abc4E45D419950511e474C7B9Ed348A4a716c",
      //     // Wormhole Relayer on BNB Chapel Chain
      //     spoke: "0x80aC94316391752A193C1c47E27D382b507c93F3",
      //   },
      //   delayBlocks: DEFAULT_DELAY_BLOCKS,
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      //   custom: {
      //     hub: {
      //       gasCap: "300000", // gas limit for receiveWormholeMessages on bnb
      //       mirrorChainId: "4", // bsc wormhole chainId: 4
      //     },
      //     spoke: {
      //       gasCap: "400000", // gas limit for receiveWormholeMessages on mainnet
      //       mirrorChainId: "2", // mainnet wormhole chainid: 2
      //     },
      //   },
      // },
      // FIXME: not added in op-roots, sepolia?
      // 1442: {
      //   prefix: "PolygonZk",
      //   ambs: {
      //     // PolygonZkEVMBridge on goerli
      //     // https://goerli.etherscan.io/address/0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7
      //     hub: "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",
      //     // PolygonZkEVMBridge on polygon-zkevm
      //     // https://testnet-zkevm.polygonscan.com/address/0xf6beeebb578e214ca9e23b0e9683454ff88ed2a7
      //     spoke: "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",
      //   },
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      //   delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1442],
      //   disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1442],
      //   minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1442] / 2,
      //   custom: {
      //     hub: {
      //       mirrorNetworkId: "1",
      //     },
      //     spoke: {
      //       mirrorNetworkId: "0",
      //     },
      //   },
      // },
      5: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
      // Scroll testnet Ethereum-sepolia (they don't supports 2 testnets, only sepolia with ethereum)
      534352: {
        prefix: "Scroll",
        networkName: "Sepolia",
        ambs: {
          // Ethreum L1ScrollMessenger
          // https://sepolia.etherscan.io/address/0x50c7d3e7f7c656493D1D76aaa1a836CedfCBB16A
          hub: "0x50c7d3e7f7c656493D1D76aaa1a836CedfCBB16A",
          // L2ScrollMessenger
          // https://sepolia.scrollscan.com/address/0xBa50f5340FB9F3Bd074bD638c9BE13eCB36E603d
          spoke: "0xBa50f5340FB9F3Bd074bD638c9BE13eCB36E603d",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: BigNumber.from("200000"), // The test thrown 21_628 as gas needed. So 200_000 is almost 10x to be safe.
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Taiko testnet Sepolia-Taiko Joinr L2
      167007: {
        prefix: "Taiko",
        networkName: "Sepolia",
        // The AMB argument must be the allowed off chain agent address.
        ambs: {
          // Sepolia Bridge
          // https://sepolia.etherscan.io/address/0x5293Bb897db0B64FFd11E0194984E8c5F1f06178
          hub: "0x5293Bb897db0B64FFd11E0194984E8c5F1f06178",
          // Taiko Joinr Bridge
          // https://explorer.jolnir.taiko.xyz/address/0x1000777700000000000000000000000000000004
          spoke: "0x1000777700000000000000000000000000000004",
        },

        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: BigNumber.from("200000"),
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Taiko testnet Holesky-Taiko Katla
      // They have recently deployed on Holesky and Katla, but they didn't verify the contracts.
      // Due to this, we recommend using the addresses from the previous deployment on Sepolia-TaikoJoinr until they're verified.
      167008: {
        prefix: "Taiko",
        networkName: "Holesky",
        // The AMB argument must be the allowed off chain agent address.
        ambs: {
          // Holesky Bridge
          // https://holesky.etherscan.io/address/0xf458747c6d6db57970dE80Da6474C0A3dfE94BF1
          hub: "0xf458747c6d6db57970dE80Da6474C0A3dfE94BF1",
          // Katla Bridge
          // https://explorer.katla.taiko.xyz/address/0x1670080000000000000000000000000000000001
          spoke: "0x1670080000000000000000000000000000000001",
        },

        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: BigNumber.from("200000"),
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Fuel Testnet Sepolia-Fuel
      // Fuel doesn't have chain id yet
      44444444: {
        prefix: "Fuel",
        networkName: "Fuel",
        // The AMB argument must be the allowed off chain agent address.
        ambs: {
          // https://sepolia.etherscan.io/address/0x03f2901Db5723639978deBed3aBA66d4EA03aF73
          hub: "0x03f2901Db5723639978deBed3aBA66d4EA03aF73",
          // https://fuellabs.github.io/block-explorer-v2/beta-4/#/address/0x7369bdd627a10119d394d7bfd15d0c974609b5c269d4a5cb0fe8f19c5ed3140b
          spoke: "0x7369bdd627a10119d394d7bfd15d0c974609b5c269d4a5cb0fe8f19c5ed3140b",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {},
      },
    },
  },
  mainnet: {
    hub: { chain: 1, minDisputeBlocks: DEFAULT_DISPUTE_BLOCKS / 2, disputeBlocks: DEFAULT_DISPUTE_BLOCKS },
    configs: {
      1: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
      10: {
        prefix: "Optimism",
        ambs: {
          // L1CrossDomainMessenger
          // https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/deployments/mainnet/Proxy__OVM_L1CrossDomainMessenger.json#L2
          hub: "0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1",
          // L2CrossDomainMessenger
          // see: https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-comm
          spoke: "0x4200000000000000000000000000000000000007",
        },
        // TODO: 2mil gas for opti (going L1 => L2)? Is that correct?
        processGas: BigNumber.from("2000000"),
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://etherscan.io/address/0xbEb5Fc579115071764c7423A4f12eDde41f106Ed#code
            optimismPortal: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      100: {
        prefix: "Gnosis",
        ambs: {
          // https://etherscan.io/address/0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e
          hub: "0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e",
          // https://blockscout.com/xdai/mainnet/address/0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59
          spoke: "0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            gasCap: "4000000", // maxGasPerTx
            mirrorChainId: "100",
          },
          spoke: {
            gasCap: "2000000", // maxGasPerTx
            mirrorChainId: "1",
          },
        },
      },
      // Polygon
      137: {
        prefix: "Polygon",
        ambs: {
          // FxRoot on mainnet
          // https://static.matic.network/network/mainnet/v1/index.json
          hub: "0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2",
          spoke: "0x8397259c983751DAf40400790063935a11afa28a",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            // https://static.matic.network/network/mainnet/v1/index.json
            // RootChainProxy
            checkpointManager: "0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287",
          },
        },
      },
      // Arbitrum one
      // https://developer.offchainlabs.com/docs/Useful_Addresses
      42161: {
        prefix: "Arbitrum",
        ambs: {
          // https://etherscan.io/address/0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f
          hub: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
          // https://arbiscan.io/address/0x0000000000000000000000000000000000000064
          spoke: "0x0000000000000000000000000000000000000064",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://etherscan.io/address/0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840
            outbox: "0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840",
            maxSubmissionCostCap: utils.parseUnits("100000", "gwei"),
            maxGasCap: DEFAULT_PROCESS_GAS,
            gasPriceCap: utils.parseUnits("20", "gwei"), // minimum on arbitrum is 0.01 gwei
          },
        },
      },
      // BNB Chain
      56: {
        prefix: "Wormhole",
        networkName: "Bnb",
        ambs: {
          // Wormhole Relayer address on Mainnet
          // https://etherscan.io/address/0x27428DD2d3DD32A4D7f7C497eAaa23130d894911
          hub: "0x27428DD2d3DD32A4D7f7C497eAaa23130d894911",
          // Wormhole Relayer on BNB Chain
          // https://bscscan.com/address/0x27428DD2d3DD32A4D7f7C497eAaa23130d894911
          spoke: "0x27428DD2d3DD32A4D7f7C497eAaa23130d894911",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: "300000", // gas limit for receiveWormholeMessages on bnb
            mirrorChainId: "4", // bsc wormhole chainId: 4
          },
          spoke: {
            gasCap: "400000", // gas limit for receiveWormholeMessages on mainnet
            mirrorChainId: "2", // mainnet wormhole chainid: 2
          },
        },
      },
      // Scroll
      534352: {
        prefix: "Scroll",
        networkName: "Scroll",
        ambs: {
          // Ethreum L1ScrollMessenger
          // https://etherscan.io/address/0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367
          hub: "0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367",
          // Scroll L2ScrollMessenger
          // https://scrollscan.com/address/0x781e90f1c8Fc4611c9b7497C3B47F99Ef6969CbC
          spoke: "0x781e90f1c8Fc4611c9b7497C3B47F99Ef6969CbC",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: BigNumber.from("200000"), // The test thrown 21_628 as gas needed. So 200_000 is almost 10x to be safe.
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
    },
  },
};
