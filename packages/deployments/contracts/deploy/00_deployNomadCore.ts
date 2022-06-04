import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet } from "ethers";
import { config } from "dotenv";

import { getDeploymentName } from "../src/utils";

import { deployNomadBeaconProxy } from "./01_deployNomad";

config();

/**
 * Hardhat task defining the contract deployments for Nomad Core
 *
 * DO NOT DEPLOY THESE CONTRACTS UNLESS YOU ARE RUNNING A FULLY LOCAL ENV
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId !== 1337 && network.chainId !== 1338) {
    console.error("Do not run nomad core deployment on non-local networks");
    return;
  }
  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Nomad Core ===============================");
  console.log("deployer: ", deployer.address);

  const bridgeToken = await deployNomadBeaconProxy("BridgeToken", [], deployer, hre);
  const bridgeTokenBeacon = await hre.deployments.get(getDeploymentName(`BridgeTokenUpgradeBeacon`));
  console.log("bridgeTokenBeacon address: ", bridgeTokenBeacon.address);
  console.log("bridgeToken proxy address:", bridgeToken.address);

  const updaterManagerName = getDeploymentName(`UpdaterManager`);
  const updaterManager = await hre.deployments.deploy(updaterManagerName, {
    contract: "UpdaterManager",
    from: deployer.address,
    args: [deployer.address],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log("updaterManager address: ", updaterManager.address);

  // TODO: use proper nomad deployment
  const homeName = getDeploymentName(`Home`);
  const home = await hre.deployments.deploy(homeName, {
    contract: "Home",
    from: deployer.address,
    args: [network.chainId],
    skipIfAlreadyDeployed: true,
    log: true,
    gasLimit: 2_000_000,
  });
  console.log("home address: ", home.address);
  const homeC = await hre.ethers.getContract(homeName);
  const tx = await homeC.initialize(updaterManager.address, { from: deployer.address });
  await tx.wait();
};

export default func;
func.tags = ["NomadCore", "local"];
