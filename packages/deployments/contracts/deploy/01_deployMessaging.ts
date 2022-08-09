import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Contract, Wallet } from "ethers";
import { ethers } from "hardhat";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDeploymentName } from "../src/utils";
import { deployConfigs } from "../deployConfig";

// TODO: Should be made a step in the deployment process.
// Should replace the nomad steps.

// Contract prefixes for Connector contracts.
const HUB_PREFIX = "L1";
const SPOKE_PREFIX = "L2";
// Map of chain ID => contract name prefix for all spoke chains.
const CHAIN_TO_NAME: { [chain: number]: string } = {
  // NOTE: Eth mainnet (chain ID = 1) intentionally not included here.
  10: "Optimism",
  100: "Gnosis",
};

// address _ambAddress,
// address _mirrorConnector,
// uint32 _domain,
// uint32 _mirrorDomain,
// address _rootManager,
// address _messaging,
// uint256 _processGas

type ConnectorArgs = {
  ambAddress: string;
  mirrorConnector: string;
  domain: string;
  mirrorDomain: string;
  rootManager: string;
  messaging: string;
  processGas: string;
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
  // Deploy EthMainnetConnector.
  // Loop through every HubConnector and deploy.
  for (const chain of Object.keys(CHAIN_TO_NAME)) {
    const prefix = CHAIN_TO_NAME[+chain] + HUB_PREFIX;
    const contract = `${prefix}Connector`;
    // const deployment = ;
  }
};

const handleDeploySpoke = async (hre: HardhatRuntimeEnvironment, deployer: Wallet, chainId: number): Promise<void> => {
  const prefix = CHAIN_TO_NAME[chainId] + SPOKE_PREFIX;
  const contract = `${prefix}Connector`;
  const deployment = await hre.deployments.deploy(contract, {
    contract,
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
};

/**
 * Hardhat task for deploying the AMB Messaging contracts.
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Messaging Contracts ===============================");
  console.log("deployer: ", deployer.address);

  if (chainId === "1") {
    await handleDeployMainnet(hre, deployer);
  } else {
    if (!Object.keys(CHAIN_TO_NAME).includes(chainId)) {
      throw new Error("Invalid chain for deployment!");
    }
    await handleDeploySpoke(hre, deployer, +chainId);
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = [];
