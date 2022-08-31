import { BigNumberish, constants, Contract, utils } from "ethers";
import { defaultAbiCoder, solidityKeccak256 } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("connector-send", "Send from MainnetL1Connector")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);

    const deploymentName = getDeploymentName("MainnetL1Connector", env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log("MainnetL1Connector Address: ", address);

    const mainnetL1Connector = new Contract(address, deployment.abi, deployer);

    const tx = await mainnetL1Connector.send();
    console.log("mainnetL1Connector send tx: ", tx);
    const receipt = await tx.wait();
    console.log("mainnetL1Connector send tx mined: ", receipt.transactionHash);
  });
