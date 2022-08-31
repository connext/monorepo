import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("propagate", "Propagate aggregate root from RootManager")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);

    const deploymentName = getDeploymentName("RootManager", env);
    const rootManagerDeployment = await deployments.get(deploymentName);
    if (!rootManagerDeployment) {
      throw new Error(`No ${deploymentName} found`);
    }
    console.log("rootManagerAddress: ", rootManagerDeployment.address);

    const rootManager = new Contract(rootManagerDeployment.address, rootManagerDeployment.abi, deployer);

    const tx = await rootManager.propagate();
    console.log("propogate tx: ", tx);
    const receipt = await tx.wait();
    console.log("propogate tx mined: ", receipt.transactionHash);
  });
