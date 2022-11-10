import { Contract } from "ethers";
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
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("connector-send", "Call `Connector.send()` to distribute outbound root")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ env: _env, networkType: _networkType }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const networkType = _networkType ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    console.log("env:", env);
    const network = await ethers.provider.getNetwork();
    const protocolConfig = getMessagingProtocolConfig(networkType);

    const deploymentName = getDeploymentName(getConnectorName(protocolConfig, +network.chainId), env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = await connector.send();
    console.log("connector send tx: ", tx);
    const receipt = await tx.wait();
    console.log("connector send tx mined: ", receipt.transactionHash);
  });
