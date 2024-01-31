import { Contract } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  relayer: string;
  connextAddress?: string;
  env?: Env;
};

export default task("add-relayer", "Add Relayer to allowlist")
  .addParam("relayer", "The address of relayer to add")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ relayer, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("relayer: ", relayer);

    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    console.log("connextAddress: ", connextAddress);

    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

    if (!isAddress(relayer) || relayer === ethers.constants.AddressZero) {
      throw new Error("Invalid Relayer address");
    }

    let approvedRelayer = await connext.approvedRelayers(relayer);
    console.log("approvedRelayer: ", approvedRelayer);
    if (approvedRelayer) {
      console.log("Already approved relayer");
    } else {
      let tx = await connext.addRelayer(relayer);
      console.log("addRelayer tx: ", tx);
      let receipt = await tx.wait();
      console.log("addRelayer tx mined: ", receipt.transactionHash);
    }

    // add to relayer proxy
    const relayerDeployment = await deployments.get(getDeploymentName("RelayerProxy", env));
    const relayerProxyAddress = relayerDeployment.address;
    const relayerProxy = new Contract(relayerProxyAddress, relayerDeployment.abi, deployer);

    approvedRelayer = await relayerProxy.allowedRelayer(relayer);
    console.log("allowedRelayer: ", approvedRelayer);
    if (approvedRelayer) {
      throw new Error("Already approved relayer");
    }

    let tx = await relayerProxy.addRelayer(relayer);
    console.log("addRelayer tx: ", tx);
    let receipt = await tx.wait();
    console.log("addRelayer tx mined: ", receipt.transactionHash);
  });
