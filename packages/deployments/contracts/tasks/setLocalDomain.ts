import { Contract } from "ethers";
import { task } from "hardhat/config";

import { chainIdToDomain } from "../src";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  tokenRegistry?: string;
  env?: Env;
};

export default task("set-local-domain", "Set the local domain of the token registry")
  .addOptionalParam("tokenRegistry", "Override local token registry address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ tokenRegistry: _tokenRegistry, env: _env }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    const tokenRegistryName = getDeploymentName("TokenRegistryUpgradeBeaconProxy", env);
    const tokenRegistryDeployment = await hre.deployments.get(tokenRegistryName);
    const tokenRegistryAddress = _tokenRegistry ?? tokenRegistryDeployment.address;
    const registry = new Contract(
      tokenRegistryAddress,
      (await hre.deployments.get(getDeploymentName("TokenRegistry"))).abi,
      deployer,
    );
    console.log("tokenRegistryAddress: ", tokenRegistryAddress);

    const { chainId } = await hre.ethers.provider.getNetwork();

    const domain = chainIdToDomain(+chainId);

    const setLocalTx = await registry.setLocalDomain(domain);
    console.log("set local domain tx:", setLocalTx);
    const receipt = await setLocalTx.wait();
    console.log("set local domain tx mined:", receipt);
  });
