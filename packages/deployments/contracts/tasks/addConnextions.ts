import { task } from "hardhat/config";
import { Contract } from "ethers";

import { chainIdToDomain } from "../src";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import deploymentRecords from "../deployments.json";

type TaskArgs = {
  chains: string;
  env?: Env;
};

export default task("add-connextions", "Add a remote router")
  .addParam("chains", "List of all chain ids to deploy to (comma-separated)")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ chains: _chains, env: _env }: TaskArgs, hre) => {
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
    console.log("chains:", chains);
    console.log("deployer: ", deployer.address);

    // get deployments for the other chains
    const deploymentName = getDeploymentName("ConnextHandler");
    const handlers = chains.map((chain) => {
      const [record] = (deploymentRecords as any)[chain];
      if (!record) {
        throw new Error(`Deployment records not found for ${chain}`);
      }
      const connextion = record.contracts[deploymentName];
      if (!connextion?.address || !connextion?.abi) {
        throw new Error(`Deployment values not found for ${deploymentName} on ${chain}`);
      }
      return { chain, connextion };
    });

    for (const { chain, connextion } of handlers) {
      console.log(`enrolling Connextion for ${chain}`);
      const domain = chainIdToDomain(chain);
      const localConnextDeployment = await hre.deployments.get(deploymentName);
      const local = localConnextDeployment.address;
      console.log("remote:", connextion.address);
      console.log("local:", local);
      const localConnext = new Contract(local, localConnextDeployment.abi, deployer);
      const addTx = await localConnext.addConnextion(domain, connextion.address);
      console.log("add tx:", addTx);
      const receipt = await addTx.wait();
      console.log("add tx mined:", receipt);
    }
  });
