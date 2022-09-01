import { config } from "dotenv";
import { ContractInterface, providers, Signer } from "ethers";
import { CrossChainMessenger, MessageStatus } from "@eth-optimism/sdk";
import { HardhatRuntimeEnvironment, HardhatUserConfig } from "hardhat/types";

import { HUB_PREFIX, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";
import deploymentRecords from "../deployments.json";

import { MAINNET_CHAINS } from "./constants";

config();

export type Env = "staging" | "production" | "local";
export type ProtocolNetwork = "mainnet" | "testnet" | "local";

export const mustGetEnv = (_env?: string) => {
  const env = _env ?? process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production" && env !== "local") {
    throw new Error(`Unrecognized env: ${env}`);
  }
  return env;
};

export const getProtocolNetwork = (_chain: string | number, _env?: string): ProtocolNetwork => {
  const chain = _chain.toString();
  const env = _env ?? mustGetEnv();
  if (MAINNET_CHAINS.includes(+chain)) {
    return "mainnet";
  }
  // If chain 1337 or 1338, use local network.
  return chain === "1337" || chain === "1338"
    ? "local"
    : // TODO: we need production testnet and mainnet
    // @jake pls take another look at this
    env === "production"
    ? "testnet"
    : // 'staging' env => testnet
    env === "staging"
    ? "testnet"
    : // Default to local otherwise.
      "local";
};

// These contracts do not have a `Staging` deployment
const NON_STAGING_CONTRACTS = ["TestERC20", "TestWETH", "LPToken"];

export const getDeploymentName = (contractName: string, _env?: string) => {
  const env = mustGetEnv(_env);

  if (env !== "staging" || NON_STAGING_CONTRACTS.includes(contractName)) {
    return contractName;
  }
  return `${contractName}Staging`;
};

export const verify = async (
  hre: HardhatRuntimeEnvironment,
  address: string,
  constructorArguments: any[] = [],
  libraries: Record<string, string> = {},
) => {
  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments,
      libraries,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log(`${address} already verified`);
      return;
    }
    console.log(`Error verifying contract at ${address}:`, e);
  }
};

// Gets the messaging protocol config for a given chain
export const getMessagingProtocolConfig = (env: Env) => {
  const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
  const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

  if (!protocol || !protocol.configs[protocol.hub]) {
    throw new Error(`Network ${network} is not supported! (no messaging config)`);
  }
  return protocol;
};

// This function is useful for tasks that should be executed across all connectors
export type ConnectorDeployment = {
  address: string;
  abi: ContractInterface;
  mirrorConnector?: string;
  mirrorChain?: number;
  chain: number;
  name: string;
};

export const getMessagingProtocolConfig = (network: ProtocolNetwork) => {
  const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

  if (!protocol || !protocol.configs[protocol.hub]) {
    throw new Error(`Network ${network} is not supported! (no messaging config)`);
  }
  return protocol;
};

export const getConnectorDeployments = (network: ProtocolNetwork, env: Env): ConnectorDeployment[] => {
  const protocol = getMessagingProtocolConfig(network);
  const connectors: { name: string; chain: number; mirrorName?: string; mirrorChain?: number }[] = [];
  Object.entries(protocol.configs).forEach(([chainId, config]) => {
    if (protocol.hub === +chainId) {
      // On the hub, you only need to connect the mainnet l1 connector (no mirror)
      connectors.push({
        chain: protocol.hub,
        name: getDeploymentName(`${config.prefix}${HUB_PREFIX}Connector`, env),
        mirrorName: undefined,
        mirrorChain: undefined,
      });
      return;
    }
    // When not on the hub, there will be a name for both the hub and spoke side connectors
    const hubName = getDeploymentName(`${config.prefix}${HUB_PREFIX}Connector`, env);
    const spokeName = getDeploymentName(`${config.prefix}${SPOKE_PREFIX}Connector`, env);
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

  const getAddressAndAbi = (name: string, chain: number): { address: string; abi: ContractInterface } | undefined => {
    const [record] = (deploymentRecords as any)[chain.toString()] ?? [undefined];
    if (!record) {
      console.log(`Deployment records not found for ${chain}`);
      return undefined;
    }
    const { address, abi } = record.contracts[name] ?? {};
    if (!address || !abi) {
      console.log(`Deployment values not found for ${name} on ${chain}`);
      return undefined;
    }
    return { address, abi };
  };

  // get deployments for connectors
  const deployments = connectors.map(({ name, chain, mirrorName, mirrorChain }) => {
    // Get deployment records
    const { address, abi } = getAddressAndAbi(name, chain) ?? {};
    if (!address || !abi) {
      return undefined;
    }
    const mirrorConnector = mirrorName && mirrorChain ? getAddressAndAbi(mirrorName, mirrorChain)?.address : undefined;
    return { address, abi, mirrorConnector, chain, name, mirrorChain };
  });

  return deployments.filter((x) => !!x) as any;
};

export const getProviderFromConfig = (config: HardhatUserConfig, chain: number) => {
  // Get the provider address from the hardhat config on given chain
  const url = (Object.values(config.networks!).find((n) => n?.chainId === chain) as any)?.url;
  if (!url) {
    throw new Error(`No provider url found for ${chain}`);
  }
  return new providers.JsonRpcProvider(url as string, chain);
};

export const executeOnAllConnectors = async <T = any>(
  hardhatConfig: HardhatUserConfig,
  network: ProtocolNetwork,
  deploymentEnv: Env,
  fn: (d: ConnectorDeployment, provider: providers.JsonRpcProvider) => Promise<T>,
): Promise<T[]> => {
  const deployments = getConnectorDeployments(network, deploymentEnv);
  const results = [];
  for (const deploy of deployments) {
    // Get the provider address from the hardhat config on given chain
    results.push(await fn(deploy, getProviderFromConfig(hardhatConfig, deploy.chain)));
  }
  return results;
};

// Retrieves the status of an optimism message
export const queryOptimismMessageStatus = async (
  hash: string,
  l1ChainId: number,
  l2ChainId: number,
  l1Provider: providers.JsonRpcProvider,
  l2Provider: providers.JsonRpcProvider,
  relay: boolean,
  signer: Signer,
): Promise<string> => {
  const crossChainMessenger = new CrossChainMessenger({
    l1ChainId,
    l2ChainId,
    l1SignerOrProvider: l1Provider,
    l2SignerOrProvider: l2Provider,
  });
  const status = await crossChainMessenger.getMessageStatus(hash);
  const [message] = await crossChainMessenger.getMessagesByTransaction(hash);
  console.log("message", { ...message, minGasLimit: message.minGasLimit.toString() });
  const mapping = {
    [MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE]: "Unconfirmed L1 -> L2",
    [MessageStatus.FAILED_L1_TO_L2_MESSAGE]: "Failed L1 -> L2",
    [MessageStatus.STATE_ROOT_NOT_PUBLISHED]: "State root not published",
    [MessageStatus.IN_CHALLENGE_PERIOD]: "In challenge period",
    [MessageStatus.READY_FOR_RELAY]: "Ready for relay",
    [MessageStatus.RELAYED]: "Relayed",
  };
  if (relay && status === MessageStatus.READY_FOR_RELAY) {
    const tx = await crossChainMessenger.finalizeMessage(hash, { signer });
    console.log("relay message tx submitted:", tx.hash);
    const receipt = await tx.wait();
    console.log("relay message tx mined:", receipt.transactionHash);
  }
  return mapping[status];
};
