import { Contract, providers } from "ethers";
import { task } from "hardhat/config";

import { ConnectorDeployment, Env, executeOnAllConnectors, mustGetEnv } from "../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("read-balances", "Read balances of accounts")
  .addOptionalParam("asset", "Transacting asset Id")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    await executeOnAllConnectors(env, async (deployment: ConnectorDeployment, provider: providers.JsonRpcProvider) => {
      const { name, address, abi } = deployment;
      // Create the connector contract
      const connector = new Contract(address, abi, deployer.connect(provider));
      console.log(`--------- ${name} ---------`);
      console.log("- address:", address);
      console.log("- outboundRoot:", await connector.outboundRoot());
      console.log("- aggregateRoot:", await connector.aggregateRoot());
    });
  });
