import { Contract } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  relayer: string;
  connextAddress?: string;
  env?: Env;
};

export default task("remove-relayer", "Remove Relayer from allowlist")
  .addParam("relayer", "The address of relayer to remove")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "The environment for the contract")
  .setAction(async ({ relayer, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    console.log("relayer: ", relayer);
    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer:", deployer.address);

    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
    console.log("connextAddress: ", connextAddress);

    if (!isAddress(relayer) || relayer === ethers.constants.AddressZero) {
      throw new Error("Invalid Relayer address");
    }

    const approvedRelayer = await connext.approvedRelayer(relayer);
    console.log("approvedRelayer: ", approvedRelayer);
    if (!approvedRelayer) {
      throw new Error("Not approved relayer");
    }

    const tx = await connext.removeRelayer(relayer);
    console.log("removeRelayer tx: ", tx);
    const receipt = await tx.wait();
    console.log("removeRelayer tx mined: ", receipt.transactionHash);
  });
