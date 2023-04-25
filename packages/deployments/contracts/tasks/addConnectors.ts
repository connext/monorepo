import { task } from "hardhat/config";
import { constants, Contract, providers, Wallet } from "ethers";
import { chainIdToDomain } from "@connext/nxtp-utils";

import hardhatConfig from "../hardhat.config";
import {
  ConnectorDeployment,
  Env,
  executeOnAllConnectors,
  getDeploymentName,
  getMessagingProtocolConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../src/utils";
import { HUB_PREFIX } from "../deployConfig/shared";

type TaskArgs = {
  env?: Env;
  remove?: boolean;
  networkType?: ProtocolNetwork;
};

export default task("add-connectors", "Add all connectors to the root manager")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .addFlag("remove", "Whether or not to remove connectors that exist")
  .setAction(async ({ env: _env, remove: _remove, networkType: _networkType }: TaskArgs, hre) => {
    const chain = await hre.getChainId();
    const networkConfig = Object.values(hardhatConfig.networks!).find((n) => n?.chainId === +chain)!;
    const deployer = Wallet.fromMnemonic((networkConfig.accounts as any).mnemonic as unknown as string);

    const env = mustGetEnv(_env);
    const remove = _remove;
    const networkType = _networkType ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    console.log("env:", env);
    console.log("remove:", remove);
    console.log("deployer: ", deployer.address);

    const network = await hre.ethers.provider.getNetwork();

    const config = getMessagingProtocolConfig(networkType);

    if (+network.chainId != config.hub.chain) {
      throw new Error(`Should be on ${config.hub}, not ${network.chainId}`);
    }

    const rootManagerDeployment = await hre.deployments.getOrNull(getDeploymentName("RootManager", env));
    if (!rootManagerDeployment) {
      throw new Error(`Could not find RootManager on ${network.chainId}`);
    }
    const rootManager = new Contract(
      rootManagerDeployment.address,
      rootManagerDeployment.abi,
      deployer.connect(hre.ethers.provider),
    );

    await executeOnAllConnectors(
      env,
      networkType,
      async (deployment: ConnectorDeployment, _provider: providers.JsonRpcProvider) => {
        const { name, address, chain, mirrorChain } = deployment;
        if (!name.includes(HUB_PREFIX) && !name.includes("Mainnet")) {
          // this is not the relevant connector
          return;
        }
        // connector now has "L1" in the title
        // NOTE: on mainnet connector there will be no mirror chain, so just register the mainnet
        // domain
        const domain = chainIdToDomain(mirrorChain ?? chain);
        console.log(`trying to enroll connector for ${domain} (${mirrorChain ?? chain})`);

        let stored = await rootManager.connectors(domain);
        if (stored.toLowerCase() === address.toLowerCase()) {
          console.log(`${name} already registered for ${domain}: ${address}`);
          return;
        }

        // Must either remove before enlisting
        if (stored !== constants.AddressZero || remove) {
          console.log(`Removing ${name} registered for ${domain}: ${stored}`);
          const tx = await rootManager.removeConnector(domain);
          console.log("remove connector tx submitted:", tx.hash);
          const receipt = await tx.wait();
          console.log("remove connector tx mined:", receipt.transactionHash);
        }

        stored = await rootManager.connectors(domain);
        if (stored === constants.AddressZero) {
          console.log(`Adding ${name} for ${domain}: ${address}`);
          const tx = await rootManager.addConnector(domain, address);
          console.log("add connector tx submitted:", tx.hash);
          const receipt = await tx.wait();
          console.log("add connector tx mined:", receipt.transactionHash);
        }
      },
    );
  });
