import { task } from "hardhat/config";
import { Contract } from "ethers";
import { generateExitPayload } from "@connext/nxtp-utils";

import hardhatConfig from "../hardhat.config";
import { Env, getConnectorDeployments, getDeploymentName, mustGetEnv } from "../src/utils";
import { HUB_PREFIX, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";
import { chainIdToDomain } from "../src";

type TaskArgs = {
  txHash: string;
  env?: Env;
};

export default task("submit-exit-proof", "Submit Exit proof to L2 chain")
  .addParam("txHash", "Burn Tx Hash on L2 chain")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ txHash, env: _env }: TaskArgs, hre) => {
    const chain = await hre.getChainId();
    let { deployer } = await hre.ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await hre.ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    // get messaging config
    const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
    const protocol = MESSAGING_PROTOCOL_CONFIGS[network];
    if (!protocol || !protocol.configs[protocol.hub]) {
      throw new Error(`Network ${network} is not supported! (no messaging config)`);
    }
    if (protocol.hub !== +chain) {
      throw new Error(`Current network is not hub`);
    }

    const deployments = getConnectorDeployments(env);
    const L1ConnectorDeployment = deployments.find(
      ({ name }) => name === getDeploymentName(`Polygon${HUB_PREFIX}Connector`),
    );
    const L2ConnectorDeployment = deployments.find(
      ({ name }) => name === getDeploymentName(`Polygon${SPOKE_PREFIX}Connector`),
    );

    if (!L1ConnectorDeployment || !L2ConnectorDeployment) {
      throw new Error(`Deployment records not found for ${chain}`);
    }

    const providers = new Map();
    for (const network of Object.values(hardhatConfig.networks!)) {
      if (network && network.chainId && (network as any).url) {
        try {
          const domain = chainIdToDomain(network.chainId);
          providers.set(String(domain), [(network as any).url]);
        } catch {}
      }
    }

    const SEND_MESSAGE_EVENT_SIG = "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036"; // keccak256(MessageSent(bytes))
    const payload = await generateExitPayload(
      String(chainIdToDomain(L2ConnectorDeployment.chain)),
      String(chainIdToDomain(L1ConnectorDeployment.chain)),
      txHash,
      SEND_MESSAGE_EVENT_SIG,
      providers,
    );

    if (payload) {
      const L1ConnectorContract = new Contract(L1ConnectorDeployment.address, L1ConnectorDeployment.abi, deployer);
      const tx = await L1ConnectorContract.receiveMessage(payload);
      console.log(`receive message tx`, tx.hash);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
    }
  });
