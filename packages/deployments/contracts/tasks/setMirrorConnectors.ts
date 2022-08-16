import { task } from "hardhat/config";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ContractInterface, Wallet } from "ethers";

import hardhatConfig from "../hardhat.config";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";
import deploymentRecords from "../deployments.json";
import { HUB_PREFIX, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";

type TaskArgs = {
  env?: Env;
};

export default task("set-mirror-connectors", "Add a remote router")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, hre) => {
    const chain = await hre.getChainId();
    const networkConfig = Object.values(hardhatConfig.networks!).find((n) => n?.chainId === +chain)!;
    const deployer = Wallet.fromMnemonic((networkConfig.accounts as any).mnemonic as unknown as string);

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
    const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

    if (!protocol || !protocol.configs[protocol.hub]) {
      throw new Error(`Network ${network} is not supported! (no messaging config)`);
    }

    const connectors: { name: string; chain: number; mirrorName?: string; mirrorChain?: number }[] = [];
    Object.entries(protocol.configs).forEach(([chainId, config]) => {
      if (protocol.hub === +chainId) {
        // On the hub, you only need to connect the mainnet l1 connector (no mirror)
        connectors.push({
          chain: protocol.hub,
          name: getDeploymentName(`${config.prefix}${HUB_PREFIX}Connector`),
          mirrorName: undefined,
          mirrorChain: undefined,
        });
        return;
      }
      // When not on the hub, there will be a name for both the hub and spoke side connectors
      const hubName = getDeploymentName(`${config.prefix}${HUB_PREFIX}Connector`);
      const spokeName = getDeploymentName(`${config.prefix}${SPOKE_PREFIX}Connector`);
      connectors.push({
        chain: protocol.hub,
        name: hubName,
        mirrorName: spokeName,
        mirrorChain: +chainId,
      });
      connectors.push({
        chain: +chainId,
        name: spokeName,
        mirrorName: hubName,
        mirrorChain: protocol.hub,
      });
    });

    console.log(`names of connectors to setup mirrors for:`, connectors);

    const getAddressAndAbi = (name: string, chain: number): { address: string; abi: ContractInterface } => {
      const [record] = (deploymentRecords as any)[chain.toString()] ?? [undefined];
      if (!record) {
        throw new Error(`Deployment records not found for ${chain}`);
      }
      const { address, abi } = record.contracts[name] ?? {};
      if (!address || !abi) {
        throw new Error(`Deployment values not found for ${name} on ${chain}`);
      }
      return { address, abi };
    };

    // get deployments for connectors
    const deployments = connectors.map(({ name, chain, mirrorName, mirrorChain }) => {
      // Get deployment records
      const { address, abi } = getAddressAndAbi(name, chain);
      const mirrorConnector = mirrorName && mirrorChain ? getAddressAndAbi(mirrorName, mirrorChain).address : undefined;
      return { address, abi, mirrorConnector, chain, name };
    });

    for (const { chain, address, abi, mirrorConnector, name } of deployments) {
      if (!mirrorConnector) {
        // Nothing to enroll
        console.log(`no mirror connector for ${name}`);
        continue;
      }
      // Get the provider address from the hardhat config on given chain
      const url = (Object.values(hardhatConfig.networks!).find((n) => n?.chainId === chain) as any)?.url;
      if (!url) {
        throw new Error(`No provider url found for ${chain}`);
      }
      const provider = new JsonRpcProvider(url as string, chain);

      // Create the connector contract
      const connector = new Contract(address, abi, deployer.connect(provider));

      // Check if mirror is set
      const set = await connector.mirrorConnector();
      if (set.toLowerCase() === mirrorConnector.toLowerCase()) {
        continue;
      }

      console.log(`setting mirror connector to ${mirrorConnector} on ${name}...`);
      const tx = await connector.setMirrorConnector(mirrorConnector);
      console.log(`set mirror tx sent:`, tx.hash);
      const receipt = await tx.wait();
      console.log(`tx mined:`, receipt.transactionHash);
    }
  });
