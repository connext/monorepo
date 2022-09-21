import { task } from "hardhat/config";
import { Contract } from "ethers";

import { Env, getConnectorName, getDeploymentName, getMessagingProtocolConfig, mustGetEnv } from "../src/utils";
import { MESSAGING_PROTOCOL_CONFIGS } from "../deployConfig/shared";

type TaskArgs = {
  type: "all" | "bridge" | "promise" | "relayer";
  chains: string; // 1,2,3..
  env?: Env;
};

export default task("set-xapp-manager", "Updates the xapp connection manager")
  .addParam("type", "Which handler to enroll (all, connext, promise, relayer")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ type, chains: _chains, env: _env }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("type:", type);
    console.log("deployer: ", deployer.address);

    // get messaging config
    const protocol = getMessagingProtocolConfig(env);
    const chainId = +(await hre.getChainId());
    const connectorName = getDeploymentName(getConnectorName(protocol, chainId));
    const connector = await hre.deployments.getOrNull(connectorName);
    if (!connector) {
      throw new Error(`${connectorName} not deployed`);
    }

    const names = [
      "BridgeRouterUpgradeBeaconProxy",
      "PromiseRouterUpgradeBeaconProxy",
      "RelayerFeeRouterUpgradeBeaconProxy",
    ]
      .filter((name) => {
        if (type === "all") {
          return true;
        }
        return name.toLowerCase().startsWith(type);
      })
      .map((name) => getDeploymentName(name, env));

    for (const name of names) {
      console.log(`updating xapp connection manager on ${name} to ${connector.address}`);
      const localRouterDeployment = await hre.deployments.get(name);
      const { abi: localRouterAbi } = await hre.deployments.get(
        // handle nomad upgrade naming case
        name.includes("UpgradeBeaconProxy") ? getDeploymentName(name.split("UpgradeBeaconProxy")[0], env) : name,
      );
      const local = localRouterDeployment.address;
      const localRouter = new Contract(local, localRouterAbi, deployer);

      const stored = await localRouter.xAppConnectionManager();
      if (stored.toLowerCase() === connector.address.toLowerCase()) {
        console.log(`${connector.address} already xapp connection manager on ${name}`);
        continue;
      }
      const tx = await localRouter.setXAppConnectionManager(connector.address);
      console.log(`set connector manager tx`, tx.hash);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
    }
  });
