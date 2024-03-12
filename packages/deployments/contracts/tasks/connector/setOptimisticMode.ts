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
  mode: "optimistic" | "slow";
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("set-optimistic-mode", "set optimistic mode / slow mode at connector")
  .addParam("mode", "If optimistic mode?")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ mode, env: _env, networkType }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("networkType: ", networkType);
    const network = await ethers.provider.getNetwork();
    const protocolConfig = getMessagingProtocolConfig(networkType ?? ProtocolNetwork.TESTNET);

    const deploymentName = getDeploymentName(
      getConnectorName(protocolConfig, +network.chainId),
      env,
      protocolConfig.configs[+network.chainId].networkName,
    );
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const isOptimistic = mode === "optimistic";
    const currentMode = await connector.optimisticMode();
    if (currentMode === isOptimistic) {
      throw new Error(`No need to change the mode!`);
    }

    const tx = isOptimistic ? await connector.activateOptimisticMode() : await connector.activateSlowMode();
    console.log("connector set optimistic mode tx: ", tx);
    const receipt = await tx.wait();
    console.log("connector set optimistic mode tx mined: ", receipt.transactionHash);
  });
