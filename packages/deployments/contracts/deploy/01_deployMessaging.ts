import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber, constants, Contract, Wallet } from "ethers";
import { ethers } from "hardhat";

import { chainIdToDomain } from "../src";

// TODO: Should be made a step in the deployment process.
// Should replace the nomad steps.

// The chain ID of the hub. For production environment, should be Ethereum Mainet.
const HUB_CHAIN_ID = 1;
// Contract prefixes for Connector contracts.
const HUB_PREFIX = "L1";
const SPOKE_PREFIX = "L2";
// Map of chain ID => config for all spoke chains.
const CHAIN_TO_CONFIG: {
  [chain: number]: {
    prefix: string; // The chain's name and the Connector name prefix.
    amb: string; // Official AMB contract address.
    processGas: BigNumber; // The
  };
} = {
  // NOTE: Eth mainnet (chain ID = 1) intentionally not included here.
  10: {
    prefix: "Optimism",
    amb: "",
    processGas: BigNumber.from("200_000"),
  },
  100: {
    prefix: "Gnosis",
    amb: "",
    processGas: BigNumber.from("2_000_000"),
  },
};

const formatConnectorArgs = (chainId: number, mirrorChainId: number, rootManager?: string): any[] => {
  const config = CHAIN_TO_CONFIG[chainId];

  // RootManager should be 0x for spoke connectors, and defined for hub connectors.
  if (chainId === 1) {
    if (!rootManager) {
      throw new Error("RootManager must be defined for Eth Mainnet.");
    }
  } else if (rootManager) {
    throw new Error("RootManager must be empty for spoke chains.");
  }

  return [
    config.amb,
    BigNumber.from(chainIdToDomain(chainId).toString()),
    // Mirror contract address should be configured separately, after deployment.
    constants.AddressZero,
    // Mirror domain should be known.
    BigNumber.from(chainIdToDomain(mirrorChainId).toString()),
    rootManager ?? constants.AddressZero,
    config.processGas,
  ];
};

// Deploy messaging contracts unique to Eth mainnet, including hub connectors.
const handleDeployMainnet = async (hre: HardhatRuntimeEnvironment, deployer: Wallet): Promise<void> => {
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

  // Loop through every HubConnector and deploy.
  for (const mirrorChain of Object.keys(CHAIN_TO_CONFIG)) {
    const mirrorChainId = +mirrorChain;
    const prefix = CHAIN_TO_CONFIG[mirrorChainId].prefix + HUB_PREFIX;
    const contract = `${prefix}Connector`;
    console.log(`Deploying ${contract}...`);
    const deployment = await hre.deployments.deploy(contract, {
      contract,
      from: deployer.address,
      args: formatConnectorArgs(HUB_CHAIN_ID, mirrorChainId, rootManager.address),
      skipIfAlreadyDeployed: true,
      log: true,
    });
    console.log(`${contract} deployed to ${deployment.address}`);
  }
};

const handleDeploySpoke = async (hre: HardhatRuntimeEnvironment, deployer: Wallet, chainId: number): Promise<void> => {
  const prefix = CHAIN_TO_CONFIG[chainId].prefix + SPOKE_PREFIX;
  const contract = `${prefix}Connector`;
  console.log(`Deploying ${contract}...`);
  const deployment = await hre.deployments.deploy(contract, {
    contract,
    from: deployer.address,
    args: formatConnectorArgs(chainId, HUB_CHAIN_ID),
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`${contract} deployed to ${deployment.address}`);
};

/**
 * Hardhat task for deploying the AMB Messaging contracts.
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

  if (chain === HUB_CHAIN_ID.toString()) {
    await handleDeployMainnet(hre, deployer);
  } else {
    if (!Object.keys(CHAIN_TO_CONFIG).includes(chain)) {
      throw new Error("Invalid chain for deployment!");
    }
    await handleDeploySpoke(hre, deployer, +chain);
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = [];
