import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  mirrorConnector: string;
  env?: Env;
};

export default task("set-mirror-connector", "set mirror connector")
  .addParam("mirrorConnector", "_mirrorConnector address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env, mirrorConnector }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("mirrorConnector: ", mirrorConnector);

    const deploymentName = getDeploymentName("MainnetL1Connector", env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log("Connector Address: ", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = await connector.setMirrorConnector(mirrorConnector);
    console.log("tx: ", tx);
    const receipt = await tx.wait();
    console.log("tx mined: ", receipt.transactionHash);
  });
