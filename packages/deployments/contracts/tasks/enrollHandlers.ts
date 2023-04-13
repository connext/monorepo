import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { Contract } from "ethers";
import { chainIdToDomain } from "@connext/nxtp-utils";

import { canonizeId } from "../src";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import deploymentRecords from "../deployments.json";

type TaskArgs = {
  type: "all" | "bridge" | "promise" | "relayer";
  chains: string; // 1,2,3..
  env?: Env;
};

export default task("enroll-handlers", "Add a remote router")
  .addParam("type", "Which handler to enroll (all, connext, promise, relayer")
  .addParam("chains", "List of all chain ids to deploy to (comma-separated)")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ type, chains: _chains, env: _env }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const current = await hre.ethers.provider.getNetwork();

    const chains = _chains
      .split(",")
      .map((c) => +c)
      .filter((c) => c != current.chainId);
    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("type:", type);
    console.log("chains:", chains);
    console.log("deployer: ", deployer.address);

    const names = ["BridgeRouterUpgradeBeaconProxy", "RelayerFeeRouterUpgradeBeaconProxy"]
      .filter((name) => {
        if (type === "all") {
          return true;
        }
        return name.toLowerCase().startsWith(type);
      })
      .map((name) => getDeploymentName(name, env));

    // get deployments for the other chains
    const handlers = chains.map((chain) => {
      const [record] = (deploymentRecords as any)[chain];
      if (!record) {
        throw new Error(`Deployment records not found for ${chain}`);
      }
      const remotes = names.map((name) => {
        const { address, abi } = record.contracts[name] ?? {};
        if (!address || !abi) {
          throw new Error(`Deployment values not found for ${name} on ${chain}`);
        }
        return { address, abi, name };
      });
      return { chain, remotes };
    });

    for (const { chain, remotes } of handlers) {
      console.log(`enrolling ${remotes.length} remote handlers for ${chain}`);
      const domain = chainIdToDomain(chain);
      for (const { address, name } of remotes) {
        const localRouterDeployment = await hre.deployments.get(name);
        const { abi: localRouterAbi } = await hre.deployments.get(
          // handle upgrade naming case
          name.includes("UpgradeBeaconProxy") ? getDeploymentName(name.split("UpgradeBeaconProxy")[0], env) : name,
        );
        const local = localRouterDeployment.address;
        console.log("name:", name); // ${name} as remote ${name} on local ${local}`);
        console.log("remote:", address);
        console.log("local:", local);
        const localRouter = new Contract(local, localRouterAbi, deployer);
        const enrollTx = await localRouter.enrollRemoteRouter(domain, hexlify(canonizeId(address as string)));
        console.log("enroll tx:", enrollTx);
        const receipt = await enrollTx.wait();
        console.log("enroll tx mined:", receipt);
      }
    }
  });
