import { config } from "dotenv";
import { ContractInterface, providers } from "ethers";
import { HardhatRuntimeEnvironment, HardhatUserConfig } from "hardhat/types";

import { HUB_PREFIX, MessagingProtocolConfig, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";
import deploymentRecords from "../deployments.json";

config();

export type Env = "staging" | "production" | "local";

export const mustGetEnv = (_env?: string) => {
  const env = _env ?? process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production" && env !== "local") {
    throw new Error(`Unrecognized env: ${env}`);
  }
  return env;
};

export const getProtocolNetwork = (_chain: string | number, _env?: string): "mainnet" | "testnet" | "local" => {
  const chain = _chain.toString();
  const env = _env ?? mustGetEnv();
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

export const getConnectorName = (
  config: MessagingProtocolConfig,
  connectorChainId: number,
  deployChainId?: number | undefined,
): string => {
  deployChainId = deployChainId ?? connectorChainId;

  const naming = config.configs[connectorChainId];
  if (!naming) {
    throw new Error(`Could not find ${connectorChainId} in config`);
  }
  // Only spoke connectors deployed for mainnet contracts
  return `${naming.prefix}${
    config.hub === deployChainId && !naming.prefix.includes("Mainnet") ? HUB_PREFIX : SPOKE_PREFIX
  }Connector`;
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
export const getMessagingProtocolConfig = (env: Env): MessagingProtocolConfig => {
  // TODO: "tesnet"  => "mainnet"  for production
  const network = env === "production" ? "testnet" : env === "staging" ? "testnet" : "local";
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

export const getConnectorDeployments = (env: Env): ConnectorDeployment[] => {
  const protocol = getMessagingProtocolConfig(env);

  const connectors: { name: string; chain: number; mirrorName?: string; mirrorChain?: number }[] = [];
  Object.keys(protocol.configs).forEach((_chainId) => {
    const chainId = +_chainId;
    if (protocol.hub === chainId) {
      // On the hub, you only need to connect the mainnet l1 connector (no mirror)
      connectors.push({
        chain: protocol.hub,
        name: getDeploymentName(getConnectorName(protocol, protocol.hub), env),
        mirrorName: undefined,
        mirrorChain: undefined,
      });
      return;
    }
    // When not on the hub, there will be a name for both the hub and spoke side connectors
    const hubName = getDeploymentName(getConnectorName(protocol, chainId, protocol.hub), env);
    const spokeName = getDeploymentName(getConnectorName(protocol, chainId), env);
    connectors.push({
      chain: protocol.hub,
      name: hubName,
      mirrorName: spokeName,
      mirrorChain: chainId,
    });
    connectors.push({
      chain: chainId,
      name: spokeName,
      mirrorName: hubName,
      mirrorChain: protocol.hub,
    });
  });

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
    return { address, abi, mirrorConnector, chain, mirrorChain, name };
  });

  return deployments;
};

export const executeOnAllConnectors = async <T = any>(
  hardhatConfig: HardhatUserConfig,
  env: Env,
  fn: (d: ConnectorDeployment, provider: providers.JsonRpcProvider) => Promise<T>,
): Promise<T[]> => {
  const deployments = getConnectorDeployments(env);
  const results = [];
  for (const deploy of deployments) {
    // Get the provider address from the hardhat config on given chain
    const url = (Object.values(hardhatConfig.networks!).find((n) => n?.chainId === deploy.chain) as any)?.url;
    if (!url) {
      throw new Error(`No provider url found for ${deploy.chain}`);
    }

    results.push(await fn(deploy, new providers.JsonRpcProvider(url as string, deploy.chain)));
  }
  return results;
};
