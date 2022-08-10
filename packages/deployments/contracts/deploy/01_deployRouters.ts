import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet } from "ethers";

import { getDeploymentName } from "../src/utils";
import { deployConfigs } from "../deployConfig";

import { deployNomadBeaconProxy } from "./nomad/01_deployNomad";

// List of all the router contracts to deploy (by name).
const ROUTERS = ["PromiseRouter", "RelayerFeeRouter"];

/**
 * Hardhat task for deploying the Routers.
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
  console.log("\n============================= Deploying Routers ===============================");
  console.log("deployer: ", deployer.address);

  // TODO: Remove for interim solution step?
  // Get XAppConnectionManager address.
  const deployConfig = deployConfigs[chainId];
  let xappConnectionManagerAddress = deployConfig?.XAppConnectionManager;
  if (!xappConnectionManagerAddress) {
    const xappConnectionManagerDeployment = await hre.deployments.getOrNull(getDeploymentName("XAppConnectionManager"));
    if (!xappConnectionManagerDeployment) {
      throw new Error("XAppConnectionManager not deployed!");
    }
    xappConnectionManagerAddress = xappConnectionManagerDeployment.address;
  }

  for (const router of ROUTERS) {
    console.log(`Deploying ${router}`);
    const deployment = (await deployNomadBeaconProxy(router, [xappConnectionManagerAddress], deployer, hre)).connect(
      deployer,
    );
    console.log(`${router} deployed to ${deployment.address}`);
    const owner = await deployment.owner();
    console.log(`${router} owner set to ${owner}`);
  }
};

export default func;

func.tags = ["Routers", "prod", "local", "mainnet"];
func.dependencies = [];
