import { task } from "hardhat/config";
import { Contract, providers, Wallet } from "ethers";

import hardhatConfig from "../hardhat.config";
import { ConnectorDeployment, Env, executeOnAllConnectors, getProtocolNetwork, mustGetEnv } from "../src/utils";

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

    await executeOnAllConnectors(
      hardhatConfig,
      getProtocolNetwork(chain, env),
      env, // deployment env
      async (deployment: ConnectorDeployment, provider: providers.JsonRpcProvider) => {
        const { name, address, abi, mirrorConnector: _mirrorConnector } = deployment;
        // Create the connector contract
        const connector = new Contract(address, abi, deployer.connect(provider));
        const mirrorConnector = _mirrorConnector ?? address;

        // Check if mirror is set
        const set = await connector.mirrorConnector();
        if (set.toLowerCase() === mirrorConnector.toLowerCase()) {
          return;
        }

        console.log(`setting mirror connector to ${mirrorConnector} on ${name}...`);
        const tx = await connector.setMirrorConnector(mirrorConnector);
        console.log(`set mirror tx sent:`, tx.hash);
        const receipt = await tx.wait();
        console.log(`tx mined:`, receipt.transactionHash);
      },
    );
  });
