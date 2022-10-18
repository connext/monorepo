import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  blocks: number;
  env?: Env;
};

export default task("delay-blocks-root", "set delay blocks at root manager")
  .addOptionalParam("blocks", "number of blocks set for delay")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ blocks: _blocks, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const blocks = _blocks ?? 0;
    console.log("env:", env);
    console.log("blocks:", blocks);

    const deploymentName = getDeploymentName("RootManager", env);
    const rootManagerDeployment = await deployments.get(deploymentName);
    if (!rootManagerDeployment) {
      throw new Error(`No ${deploymentName} found`);
    }
    console.log("rootManagerAddress: ", rootManagerDeployment.address);

    const rootManager = new Contract(rootManagerDeployment.address, rootManagerDeployment.abi, deployer);

    const tx = await rootManager.setDelayBlocks(blocks);
    console.log("rootManager setDelayBlocks tx: ", tx);
    const receipt = await tx.wait();
    console.log("rootManager setDelayBlocks tx mined: ", receipt.transactionHash);
  });
