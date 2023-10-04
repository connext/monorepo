import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { runCommand } from "../src";

/**
 * Hardhat task defining the contract deployments for Connext
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  console.log("\n============================= Exporting + Verifying Deployments ===============================");
  // await hre.run("export", {
  //   exportAll: "./deployments.json",
  // });
  await runCommand("run export");

  await hre.run("etherscan-verify", {
    solcInput: true,
  });
};

export default func;
func.tags = ["ExportAndVerify", "prod"];
