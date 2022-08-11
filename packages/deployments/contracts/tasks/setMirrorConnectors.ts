import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import deploymentRecords from "../deployments.json";
import { HUB_PREFIX, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";

type TaskArgs = {
  hub: string; // 1,2,3..
  env?: Env;
};

export default task("set-mirror-connectors", "Add a remote router")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ hub, env: _env }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("hub:", hub);
    console.log("deployer: ", deployer.address);

    const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
    const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

    if (!protocol || !protocol.configs[protocol.hub]) {
      throw new Error(`Network ${network} is not supported! (no messaging config)`);
    }

    const names = Object.entries(protocol.configs)
      .map(([chainId, config]) => {
        return `${config.prefix}${protocol.hub === +chainId ? HUB_PREFIX : SPOKE_PREFIX}Connector`;
      })
      .map((n) => getDeploymentName(n));

    console.log(`names of connectors to setup mirrors for:`, names);

    // // get deployments for the other chains
    // const handlers = chains.map((chain) => {
    //   const [record] = (deploymentRecords as any)[chain];
    //   if (!record) {
    //     throw new Error(`Deployment records not found for ${chain}`);
    //   }
    //   const remotes = names.map((name) => {
    //     const { address, abi } = record.contracts[name] ?? {};
    //     if (!address || !abi) {
    //       throw new Error(`Deployment values not found for ${name} on ${chain}`);
    //     }
    //     return { address, abi, name };
    //   });
    //   return { chain, remotes };
    // });

    // for (const { chain, remotes } of handlers) {
    //   console.log(`enrolling ${remotes.length} remote handlers for ${chain}`);
    //   const { domain } = await getDomainInfoFromChainId(chain, hre);
    //   for (const { address, name } of remotes) {
    //     const localRouterDeployment = await hre.deployments.get(name);
    //     const { abi: localRouterAbi } = await hre.deployments.get(
    //       // handle nomad upgrade naming case
    //       name.includes("UpgradeBeaconProxy") ? getDeploymentName(name.split("UpgradeBeaconProxy")[0], env) : name,
    //     );
    //     const local = localRouterDeployment.address;
    //     console.log("name:", name); // ${name} as remote ${name} on local ${local}`);
    //     console.log("remote:", address);
    //     console.log("local:", local);
    //     const localRouter = new Contract(local, localRouterAbi, deployer);
    //     const enrollTx = await localRouter.enrollRemoteRouter(domain, hexlify(canonizeId(address as string)));
    //     console.log("enroll tx:", enrollTx);
    //     const receipt = await enrollTx.wait();
    //     console.log("enroll tx mined:", receipt);
    //   }
    // }
  });
