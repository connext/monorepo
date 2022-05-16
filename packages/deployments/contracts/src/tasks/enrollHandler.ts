import { hexZeroPad } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { getDomainInfoFromChainId } from "../nomad";
import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  handler: string;
  chain: string;
  local?: string;
  env?: Env;
};

export default task("enroll-handler", "Add a remote router")
  .addParam("handler", "Remote nomad handler address")
  .addParam("chain", "Chain of remote router")
  .addOptionalParam("local", "Override local router address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ handler, local: _local, chain, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("handler:", handler);
    console.log("chain:", chain);
    console.log("deployer: ", deployer.address);

    const localRouterDeployment = await deployments.get(getDeploymentName("ConnextHandler", env));
    const local = _local ?? localRouterDeployment.address;
    console.log("local: ", local);

    const { domain } = getDomainInfoFromChainId(+chain);
    console.log("domain: ", domain);

    const localRouter = await ethers.getContractAt(localRouterDeployment.abi, local);
    const enrollTx = await localRouter.enrollRemoteRouter(domain, hexZeroPad(handler, 32));
    console.log("enroll tx:", enrollTx);
    const receipt = await enrollTx.wait();
    console.log("enroll tx mined:", receipt);
  });
