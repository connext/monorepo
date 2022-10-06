import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  newOwner: string;
  connextAddress?: string;
  env?: Env;
};

export default task("propose-transfer-owner", "Propose Transfer Ownership")
  .addParam("newOwner", "New owner")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ newOwner, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("newOwner: ", newOwner);
    console.log("deployer: ", deployer.address);

    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    console.log("connextAddress: ", connextAddress);

    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
    const tx = await connext.proposeNewOwner(newOwner);
    console.log("proposeNewOwner tx: ", tx);
    await tx.wait();
    const proposedOwner = await connext.proposed();
    console.log("proposedOwner: ", proposedOwner);
  });
