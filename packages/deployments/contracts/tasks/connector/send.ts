import { Contract } from "ethers";
import { task } from "hardhat/config";
import { calculateAxelarBridgeFee, chainIdToDomain } from "@connext/nxtp-utils";

import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";

type TaskArgs = {
  data?: string;
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("connector-send", "Call `Connector.send()` to distribute outbound root")
  .addOptionalParam("data", "Encoded Data (bytes)")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ data: _data, env: _env, networkType: _networkType }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const networkType = _networkType ?? process.env.NETWORK ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    console.log("env:", env);
    const network = await ethers.provider.getNetwork();
    const protocolConfig = getMessagingProtocolConfig(networkType as ProtocolNetwork);

    const connectorName = getConnectorName(protocolConfig, +network.chainId);
    const deploymentName = getDeploymentName(connectorName, env, protocolConfig.configs[network.chainId].networkName);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const data = _data ?? "0x";
    let fee = "0";
    if (connectorName.includes("Axelar")) {
      fee = await calculateAxelarBridgeFee(
        String(chainIdToDomain(network.chainId)),
        String(chainIdToDomain(protocolConfig.hub)),
      );
      console.log("estimated bridge fee", fee);
    }
    const tx = await connector.send(data, {
      value: fee,
    });
    console.log("connector send tx: ", tx);
    const receipt = await tx.wait();
    console.log("connector send tx mined: ", receipt.transactionHash);
  });
