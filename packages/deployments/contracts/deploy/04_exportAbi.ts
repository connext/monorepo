import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  await hre.run("export-abi");

  //   const network = await hre.ethers.provider.getNetwork();

  await hre.run("etherscan-verify", {
    solcInput: true,
  });

  //   await hre.run();
};

export default func;
func.tags = ["ExportAbi"];
func.dependencies = ["Connext", "StableSwap"];
