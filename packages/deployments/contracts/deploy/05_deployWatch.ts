import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, utils, Wallet } from "ethers";

import { SKIP_SETUP } from "../src/constants";
import { chainIdToDomain } from "../src";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  console.log("\n============================= Deploying Watcher Token ===============================");
  const chainId = +(await hre.getChainId());

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("deployer: ", deployer.address);

  if (SKIP_SETUP.includes(chainId)) {
    throw new Error(`Should be skipped on mainnet chain`);
  }

  console.log("Deploying watch token on non-mainnet chain...");
  const DEPLOYMENT_NAME = "BigBroERC20";
  const deployment = await hre.deployments.deploy(DEPLOYMENT_NAME, {
    contract: "TestERC20",
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    args: ["Watcher Token", "BigBro"],
  });
  console.log("BIGBRO: ", deployment.address);

  // Only perform cleanup on fresh deploy
  if (!deployment.newlyDeployed) {
    return;
  }

  // Burn tokens minted to deployer on constructor
  const contract = new Contract(deployment.address, deployment.abi, deployer);
  const balance = await contract.balanceOf(deployer.address);
  if (balance.gt(0)) {
    console.log("burning tokens minted to deployer");
    const tx = await contract.burn(deployer.address, balance);
    console.log("awaiting burn tx...", tx.hash);
    const receipt = await tx.wait();
    console.log("owner funds burnt:", receipt.transactionHash);
  }

  // Try to whitelist immediately after deployment
  const canonical =
    chainId === 5
      ? deployment.address
      : (await hre.companionNetworks["hub"].deployments.getOrNull(DEPLOYMENT_NAME))?.address;
  if (!canonical) {
    throw new Error(`Failed to find canonical address for token`);
  }

  const taskArgs = {
    canonical,
    domain: chainIdToDomain(5).toString(), // canonical should always be goerli, this is NOT run on mainnet
    decimals: "18", // deployed test tokens have 18 decimals
    representationName: "nextBigBroERC20",
    representationSymbol: "nextBigBro",
    withDeployedRepresentation: chainId === 5 ? "false" : "true",
    local: chainId === 5 ? undefined : deployment.address,
    cap: utils.parseEther("1000").toString(),
  };
  console.log("setting up asset with", taskArgs);

  await hre.run("setup-asset", taskArgs);
};
export default func;
func.tags = ["WatcherTest", "prod"];
func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const chainId = +(await hre.getChainId());
  return SKIP_SETUP.includes(chainId);
};
