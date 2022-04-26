import { Contract } from "ethers";
import { task } from "hardhat/config";

import { getDomainInfoFromChainId } from "../nomad";
import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  tokenRegistry?: string;
  env?: Env;
};

export default task("set-local-domain", "Set the local domain of the token registry")
  .addOptionalParam("tokenRegistry", "Override local token registry address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ tokenRegistry: _tokenRegistry, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    const tokenRegistryName = getDeploymentName("TokenRegistryUpgradeBeaconProxy", env);
    const tokenRegistryDeployment = await deployments.get(tokenRegistryName);
    const tokenRegistryAddress = _tokenRegistry ?? tokenRegistryDeployment.address;
    const registry = new Contract(
      tokenRegistryAddress,
      (await deployments.get(getDeploymentName("TokenRegistry"))).abi,
      deployer,
    );
    console.log("tokenRegistryAddress: ", tokenRegistryAddress);

    const { chainId } = await ethers.provider.getNetwork();

    const { domain } = getDomainInfoFromChainId(+chainId);

    const setLocalTx = await registry.setLocalDomain(domain);
    console.log("set local domain tx:", setLocalTx);
    const receipt = await setLocalTx.wait();
    console.log("set local domain tx mined:", receipt);
  });
