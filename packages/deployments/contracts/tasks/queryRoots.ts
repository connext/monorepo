import { Contract, providers } from "ethers";
import { task } from "hardhat/config";

import config from "../hardhat.config";
import {
  ConnectorDeployment,
  Env,
  executeOnAllConnectors,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
  ProtocolNetwork,
  queryOptimismMessageStatus,
} from "../src/utils";

type TaskArgs = {
  env?: Env;
  hash?: string;
  relay?: string;
  networkType?: ProtocolNetwork;
};

export default task("query-roots", "Read balances of accounts")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("hash", "Tx hash of `propagate` function (where messages sent)")
  .addOptionalParam("relay", "Whether the message should be relayed if possible")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ env: _env, hash, relay: _relay, networkType }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const relay = _relay === "false" ? false : true;

    console.log("env:", env);
    console.log("deployer: ", deployer.address);
    console.log("hash: ", hash);
    console.log("relay:", relay);

    const protocol = getMessagingProtocolConfig(networkType ?? ProtocolNetwork.TESTNET);

    await executeOnAllConnectors(
      env,
      ProtocolNetwork.TESTNET,
      async (deployment: ConnectorDeployment, provider: providers.JsonRpcProvider) => {
        const { name, address, abi, chain } = deployment;
        // Create the connector contract
        const connector = new Contract(address, abi, provider);
        console.log(`--------- ${name} ---------`);
        console.log("- address:", address);
        if (name.includes("SpokeConnector")) {
          console.log("- outboundRoot:", await connector.outboundRoot());
          console.log("- aggregateRoot:", await connector.aggregateRoot());
        }

        if (!hash) {
          return;
        }

        if (chain == protocol.hub.chain) {
          // only useful to log message status iff message was passed
          console.log("- message status: hub <> hub interaction, ignoring");
          console.log("");
          return;
        }

        // Check the message status, varies by chain
        if (name.includes("Optimism")) {
          const status = await queryOptimismMessageStatus(
            hash,
            protocol.hub.chain,
            chain,
            getProviderFromHardhatConfig(protocol.hub.chain),
            provider,
            relay,
            deployer,
          );
          console.log(`- message status: ${status}`);
        } else {
          console.log(`- message status: unable to retrieve status for ${name}`);
        }
        console.log("");
      },
    );
  });
