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

    const domains = [1735356532, 9991, 1735353714];
    const connectors = [
      "0xa065a22e24a43b65f4cfc9a31e635e779780abee",
      "0x2f8810c6af135d37d426846c44825fcca5ce04f2",
      "0xc72b5eded73fdc46580e0ac3ffc0d044586b5032",
    ];

    console.log("domains:", domains);
    console.log("connectors:", connectors);
    const tx = await rootManager.propagate(domains, connectors);
    console.log("propogate tx: ", tx);
    const receipt = await tx.wait();
    console.log("propogate tx mined: ", receipt.transactionHash);
  });
