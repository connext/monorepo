import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  console.log("\n============================= Exporting + Verifying Deployments ===============================");
  await hre.run("export", {
    exportAll: "./deployments.json",
  });

  await hre.run("etherscan-verify", {
    solcInput: true,
  });
};

export default func;
func.tags = ["ExportAndVerify", "prod"];
func.dependencies = ["Connext"];
