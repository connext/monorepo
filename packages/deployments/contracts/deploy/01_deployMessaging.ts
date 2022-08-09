import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Contract, Wallet } from "ethers";
import { ethers } from "hardhat";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDeploymentName } from "../src/utils";
import { deployConfigs } from "../deployConfig";

// TODO: Should be made a step in the deployment process.
// Should replace the nomad steps.

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

  // TODO: Switch statement: handle deployment based on which chain we're on.
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = [];
