import { constants, Contract } from "ethers";
import { task } from "hardhat/config";

import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";

type TaskArgs = {
  message: string;
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("prove-and-process", "Call `Connector.proveAndProcess()` to process message")
  .addParam("message", "Message body to prove")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ env: _env, message, networkType: _networkType }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    console.log("message:", message);
    const env = mustGetEnv(_env);
    console.log("env:", env);
    const networkType = _networkType ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    const network = await ethers.provider.getNetwork();
    const protocolConfig = getMessagingProtocolConfig(networkType);

    const deploymentName = getDeploymentName(getConnectorName(protocolConfig, +network.chainId), env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = await connector.proveAndProcess(message, Array(32).fill(constants.HashZero), 0);
    console.log("connector proveAndProcess tx: ", tx);
    const receipt = await tx.wait();
    console.log("connector proveAndProcess tx mined: ", receipt.transactionHash);
  });
