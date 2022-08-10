import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber, constants, providers, Wallet } from "ethers";

import { chainIdToDomain, mustGetEnv } from "../src";

// TODO: Should be made a step in the deployment process.
// Should replace the nomad steps.

const DEFAULT_PROCESS_GAS = BigNumber.from("200000");
const DEFAULT_RESERVE_GAS = BigNumber.from("100000");

// Contract prefixes for Connector contracts.
const HUB_PREFIX = "L1";
const SPOKE_PREFIX = "L2";

type RouterAddresses = {
  bridgeRouter: string;
  // promiseRouter: string;
  // relayerFeeRouter: string;
};

type ProtocolConfig = {
  // The chain ID of the hub. For production environment, should be Ethereum Mainnet (1).
  hub: number;
  configs: {
    // Map of chain ID => configs.
    [chain: number]: {
      prefix: string; // The chain's name and the Connector name prefix.
      // Official AMB contract addresses.
      ambs: {
        hub: string;
        spoke: string;
      };
      processGas: BigNumber;
      reserveGas: BigNumber;
    };
  };
};

const PROTOCOL_CONFIGS: {
  local: ProtocolConfig;
  testnet: ProtocolConfig;
  mainnet: ProtocolConfig;
} = {
  local: {
    hub: 1337,
    configs: {
      // TODO: Configs for 1337, 1338
    },
  },
  testnet: {
    hub: 5, // Goerli hub.
    configs: {
      // TODO: Configs for rinkeby, ropsten, etc.
      // Optimism Kovan:
      69: {
        prefix: "Optimism",
        ambs: {
          // L1CrossDomainMessenger
          // https://goerli.etherscan.io/address/0x2eb424e0930e93cf250e488f6117a929714bb928#code
          hub: "0x2eB424e0930E93Cf250e488f6117a929714Bb928",
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
      // Sokol testnet (for Gnosis):
      // 77: {
      //   prefix: "Gnosis",
      //   ambs: {
      //     hub: "",
      //     // https://blockscout.com/poa/sokol/address/0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560/contracts
      //     spoke: "0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560",
      //   },
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      // },
    },
  },
  mainnet: {
    hub: 1,
    configs: {
      1: {
        prefix: "Eth",
        ambs: {
          hub: "",
          spoke: "",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
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
      },
    },
  },
};

// Format the arguments for Connector contract constructor.
const formatConnectorArgs = (
  protocol: ProtocolConfig,
  args: {
    deploymentChainId: number;
    mirrorChainId: number;
    rootManager: string;
    routers: RouterAddresses;
  },
): any[] => {
  const { deploymentChainId, mirrorChainId, rootManager, routers } = args;
  const config = protocol.configs[deploymentChainId];

  const isHub = deploymentChainId === protocol.hub;

  const deploymentDomain = BigNumber.from(chainIdToDomain(deploymentChainId).toString());
  const mirrorDomain = BigNumber.from(chainIdToDomain(mirrorChainId).toString());
  return [
    deploymentDomain,
    isHub ? config.ambs.hub : config.ambs.spoke,
    rootManager,
    routers.bridgeRouter,
    config.processGas,
    config.reserveGas,
    // Mirror domain should be known.
    mirrorDomain,
    // Mirror contract address should be configured separately, after deployment.
    constants.AddressZero,
  ];
};

// Deploy messaging contracts unique to Eth mainnet, including hub connectors.
const handleDeployMainnet = async (
  hre: HardhatRuntimeEnvironment,
  deployer: Wallet,
  protocol: ProtocolConfig,
  routers: RouterAddresses,
): Promise<void> => {
  // Deploy RootManager.
  console.log("Deploying RootManager...");
  const rootManager = await hre.deployments.deploy("RootManager", {
    contract: "RootManager",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`RootManager deployed to ${rootManager.address}`);
  // TODO: Deploy EthMainnetConnector.

  // Loop through every HubConnector configuration (except for the actual hub's) and deploy.
  const { configs } = protocol;
  for (const mirrorChain of Object.keys(configs)) {
    const mirrorChainId = +mirrorChain;
    if (mirrorChainId === protocol.hub) {
      // Skip; we're just deploying the spokes' hub-side connectors.
      continue;
    }

    const prefix = configs[mirrorChainId].prefix + HUB_PREFIX;
    const contract = `${prefix}Connector`;
    console.log(`Deploying ${contract}...`);
    const deployment = await hre.deployments.deploy(contract, {
      contract,
      from: deployer.address,
      args: formatConnectorArgs(protocol, {
        deploymentChainId: protocol.hub,
        mirrorChainId,
        rootManager: rootManager.address,
        routers,
      }),
      skipIfAlreadyDeployed: true,
      log: true,
    });
    console.log(`${contract} deployed to ${deployment.address}`);
  }
};

const handleDeploySpoke = async (
  hre: HardhatRuntimeEnvironment,
  deployer: Wallet,
  protocol: ProtocolConfig,
  deploymentChainId: number,
  rootManager: string,
  routers: RouterAddresses,
): Promise<void> => {
  // Deploy the Connector contract for this Spoke chain.
  const { configs } = protocol;
  const prefix = configs[deploymentChainId].prefix + SPOKE_PREFIX;
  const contract = `${prefix}Connector`;
  console.log(`Deploying ${contract}...`);
  const deployment = await hre.deployments.deploy(contract, {
    contract,
    from: deployer.address,
    args: formatConnectorArgs(protocol, {
      deploymentChainId,
      mirrorChainId: protocol.hub,
      rootManager,
      routers,
    }),
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`${contract} deployed to ${deployment.address}`);
};

/**
 * Hardhat task for deploying the AMB Messaging Layer contracts.
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chain = await hre.getChainId();

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Messaging Contracts ===============================");
  console.log("deployer: ", deployer.address);

  const env = mustGetEnv();
  const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
  const protocol = PROTOCOL_CONFIGS[network];

  if (!protocol.configs[protocol.hub]) {
    throw new Error(`Network ${network} is not supported!`);
  }

  // TODO: Should technically be in the deploy routers step, but if we're going to combine this
  // with Connext deployments, this will be removed.
  // Deploy BridgeRouter.
  console.log("Deploying BridgeRouter...");
  const bridgeRouter = await hre.deployments.deploy("BridgeRouter", {
    contract: "BridgeRouter",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`BridgeRouter deployed to ${bridgeRouter.address}`);

  const isHub = chain === protocol.hub.toString();

  // TODO: Get the hub RootManager address.
  // Get a deployer wallet connected to the hub chain.
  // We need to get the current RootManager address on the hub in order to deploy the spokes.
  // const hubDeployer = isHub
  //   ? deployer
  //   : deployer.connect(
  //       new providers.JsonRpcProvider(
  //         network === "mainnet"
  //           ? (hre.config.networks.mainnet as HttpNetworkConfig).url
  //           : network === "testnet"
  //           ? (hre.config.networks.goerli as HttpNetworkConfig).url
  //           : hre.config.networks.localhost.url,
  //       ),
  //     );

  // Handle deployment for Connector(s) and RootManager, if applicable.
  if (isHub) {
    await handleDeployMainnet(hre, deployer, protocol, {
      bridgeRouter: bridgeRouter.address,
    });
  } else {
    if (!Object.keys(protocol.configs).includes(chain)) {
      throw new Error(`Invalid chain (${chain}) for deployment!`);
    }
    await handleDeploySpoke(hre, deployer, protocol, +chain, rootManager, {
      bridgeRouter: bridgeRouter.address,
    });
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = ["Routers"];
