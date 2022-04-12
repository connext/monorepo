import { task } from "hardhat/config";

import { getDomainInfoFromChainId } from "../nomad";

type TaskArgs = {
  tokenRegistry?: string;
};

export default task("set-local-domain", "Set the local domain of the token registry")
  .addOptionalParam("tokenRegistry", "Override local token registry address")
  .setAction(async ({ tokenRegistry: _tokenRegistry }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("namedAccounts: ", namedAccounts);

    let tokenRegistry = _tokenRegistry;
    if (!tokenRegistry) {
      const tokenRegistryDeployment = await deployments.get("TokenRegistryUpgradeBeaconProxy");
      tokenRegistry = tokenRegistryDeployment.address;
    }
    console.log("tokenRegistry: ", tokenRegistry);
    const { chainId } = await ethers.provider.getNetwork();

    const { domain } = getDomainInfoFromChainId(+chainId);

    const registry = await ethers.getContractAt((await deployments.getArtifact("TokenRegistry")).abi, tokenRegistry);
    const setLocalTx = await registry.setLocalDomain(domain);
    console.log("set local domain tx:", setLocalTx);
    const receipt = await setLocalTx.wait();
    console.log("set local domain tx mined:", receipt);
  });
