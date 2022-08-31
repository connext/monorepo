import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, getMessagingProtocolConfig, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("connector-send", "Call `Connector.send()` to distribute outbound root")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    const protocolConfig = getMessagingProtocolConfig(env);
    const network = await ethers.provider.getNetwork();

    const deploymentName = getDeploymentName(
      `${protocolConfig.configs[network.chainId].prefix}${
        +network.chainId === protocolConfig.hub ? "L1" : "L2"
      }Connector`,
      env,
    );
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log("connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = await connector.send();
    console.log("connector send tx: ", tx);
    const receipt = await tx.wait();
    console.log("connector send tx mined: ", receipt.transactionHash);
  });
