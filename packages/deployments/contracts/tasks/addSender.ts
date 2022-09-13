import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getConnectorName, getDeploymentName, getMessagingProtocolConfig, mustGetEnv } from "../src/utils";

type TaskArgs = {
  sender: string;
  connectorAddress?: string;
  env?: Env;
};

export default task("add-sender", "Add sender to connector whitelist")
  .addParam("sender", "The address of sender to add")
  .addOptionalParam("connectorAddress", "Override connector address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ sender, connectorAddress: _connectorAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("sender: ", sender);

    const network = await ethers.provider.getNetwork();

    const protocol = getMessagingProtocolConfig(env);

    const connectorName = getDeploymentName(getConnectorName(protocol, +network.chainId), env);
    console.log("connectorName:", connectorName);
    const connectorDeployment = await deployments.get(connectorName);
    const connectorAddress = _connectorAddress ?? connectorDeployment.address;
    console.log("connectorAddress:", connectorAddress);

    const connector = new Contract(connectorAddress, connectorDeployment.abi, deployer);

    if (await connector.whitelistedSenders(connectorAddress)) {
      console.log(`sender already whitelisted`);
      return;
    }

    const tx = await connector.addSender(sender);
    console.log("addSender tx: ", tx);
    const receipt = await tx.wait();
    console.log("addSender tx mined: ", receipt.transactionHash);
  });
