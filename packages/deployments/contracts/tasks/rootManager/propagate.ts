import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("root-manager-propagate", "propagate from RootManager")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);

    const deploymentName = getDeploymentName("RootManager", env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log("RootManager Address: ", address);

    const rootManager = new Contract(address, deployment.abi, deployer);

    const tx = await rootManager.propagate();
    console.log("RootManager propogate tx: ", tx);
    const receipt = await tx.wait();
    console.log("RootManager propogate tx mined: ", receipt.transactionHash);
  });
