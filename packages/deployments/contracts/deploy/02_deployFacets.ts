import { Wallet } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { getFacetsToDeploy } from "../deployConfig";

/**
 * Hardhat task defining the contract deployments for Connext
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Connext Facets ===============================");
  console.log("deployer: ", deployer.address);

  const zksync = hre.network.config.zksync || false;
  console.log("zksync: ", zksync);

  // Deploy connext facets
  console.log("Deploying facets...");

  // Deploy all the facets
  for (const facet of getFacetsToDeploy(zksync)) {
    const deployment = await hre.deployments.deploy(facet.name, {
      contract: facet.contract,
      args: facet.args,
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      deterministicDeployment: facet.deterministic,
    });
    console.log(`deployed ${facet.name} at ${deployment.address}`);
  }
};
func.tags = ["Facets", "prod", "local", "mainnet", "devnet"];

export default func;
