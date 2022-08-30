import { Contract, providers } from "ethers";
import { task } from "hardhat/config";
import { CrossChainMessenger, MessageStatus } from "@eth-optimism/sdk";

import config from "../hardhat.config";
import {
  ConnectorDeployment,
  Env,
  executeOnAllConnectors,
  getMessagingProtocolConfig,
  getProviderFromConfig,
  mustGetEnv,
} from "../src/utils";

type TaskArgs = {
  env?: Env;
  hash?: string;
};

export default task("query-roots", "Read balances of accounts")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("hash", "Tx hash of `propagate` function (where messages sent)")
  .setAction(async ({ env: _env, hash }: TaskArgs, hre) => {
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);
    console.log("hash: ", hash);

    const protocol = getMessagingProtocolConfig(env);

    await executeOnAllConnectors(
      config,
      env,
      async (deployment: ConnectorDeployment, provider: providers.JsonRpcProvider) => {
        const { name, address, abi, chain } = deployment;
        // Create the connector contract
        const connector = new Contract(address, abi, provider);
        console.log(`--------- ${name} ---------`);
        console.log("- address:", address);
        console.log("- outboundRoot:", await connector.outboundRoot());
        console.log("- aggregateRoot:", await connector.aggregateRoot());

        if (!hash) {
          return;
        }

        if (chain == protocol.hub) {
          // only useful to log message status iff message was passed
          console.log("- message status: hub <> hub interaction, ignoring");
          console.log("");
          return;
        }

        // Check the message status, varies by chain
        if (name.includes("Optimism")) {
          const crossChainMessenger = new CrossChainMessenger({
            l1ChainId: protocol.hub,
            l2ChainId: chain,
            l1SignerOrProvider: getProviderFromConfig(config, protocol.hub),
            l2SignerOrProvider: provider,
          });
          const status = await crossChainMessenger.getMessageStatus(hash);
          const mapping = {
            [MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE]: "Unconfirmed L1 -> L2",
            [MessageStatus.FAILED_L1_TO_L2_MESSAGE]: "Failed L1 -> L2",
            [MessageStatus.STATE_ROOT_NOT_PUBLISHED]: "State root not published",
            [MessageStatus.IN_CHALLENGE_PERIOD]: "In challenge period",
            [MessageStatus.READY_FOR_RELAY]: "Ready for relay",
            [MessageStatus.RELAYED]: "Relayed",
          };
          console.log(`- message status: ${mapping[status]}`);
        } else {
          console.log(`- message status: unable to retrieve status for ${name}`);
        }
        console.log("");
      },
    );
  });
