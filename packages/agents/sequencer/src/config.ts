import * as fs from "fs";

import { ajv, ChainData, getChainData } from "@connext/nxtp-utils";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

import { SequencerConfig, SequencerConfigSchema } from "./lib/entities";

const MIN_SUBGRAPH_SYNC_BUFFER = 25;
const DEFAULT_REDIS_BASE_URL = "redis://mock";

/**
 * Helper to allow easy mocking
 */
export const getContractDeployments: any = () => {
  return contractDeployments;
};

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = getContractDeployments()[chainId.toString()] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.TransactionManager;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getEnvConfig = (chainData: Map<string, ChainData>): SequencerConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.NXTP_CONFIG || "");
  } catch (e) {
    console.info("No S_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.NXTP_CONFIG_FILE ?? "config.json";
    if (fs.existsSync(path)) {
      json = fs.readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e) {
    console.error("Error reading config file!");
    process.exit(1);
  }
  // return configFile;

  const _sequencerConfig: SequencerConfig = {
    redisUrl: process.env.NXTP_REDIS_URL || configJson.redisUrl || configFile.redisUrl || DEFAULT_REDIS_BASE_URL,
    chains: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: process.env.NXTP_NETWORK || configJson.network || configFile.network || "mainnet",
    server: {
      port:
        process.env.NXTP_SERVER_PORT || configJson.server?.port || configFile.server?.port || 8081,
      host: process.env.NXTP_SERVER_HOST || configJson.server?.host || configFile.server?.host || "0.0.0.0",
    },
  };

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  // add contract deployments if they exist
  Object.entries(_sequencerConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;

    // allow passed in address to override
    // format: { [chainId]: { [chainName]: { "contracts": { "TransactionManager": { "address": "...." } } } }
    if (!chainConfig.deployments?.transactionManager) {
      const res = chainDataForChain ? getDeployedTransactionManagerContract(chainDataForChain.chainId) : undefined;
      if (!res) {
        throw new Error(`No transactionManager address for domain ${domainId}`);
      }
      _sequencerConfig.chains[domainId].deployments.transactionManager = res.address;
    }

    if (!chainConfig.subgraph.runtime) {
      _sequencerConfig.chains[domainId].subgraph.runtime = chainDataForChain?.subgraph ?? [];
    }

    if (!chainConfig.subgraph.analytics) {
      _sequencerConfig.chains[domainId].subgraph.runtime = chainDataForChain?.analyticsSubgraph ?? [];
    }

    if (!chainConfig.confirmations) {
      _sequencerConfig.chains[domainId].confirmations = chainRecommendedConfirmations;
    }

    const maxLag = chainConfig.subgraph.maxLag ?? MIN_SUBGRAPH_SYNC_BUFFER;
    // 25 blocks minimum.
    _sequencerConfig.chains[domainId].subgraph.maxLag =
      maxLag < MIN_SUBGRAPH_SYNC_BUFFER ? MIN_SUBGRAPH_SYNC_BUFFER : maxLag;
  });

  const validate = ajv.compile(SequencerConfigSchema);

  const valid = validate(_sequencerConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: any) => JSON.stringify(err, null, 2)).join(","));
  }

  return _sequencerConfig;
};

let sequencerConfig: SequencerConfig | undefined;

/**
 * Gets and validates the router config from the environment.
 * @param useDefaultLocal - (optional) If true, use the default local config.
 * @returns The router config with sensible defaults
 */
export const getConfig = async (): Promise<SequencerConfig> => {
  if (!sequencerConfig) {
    const chainData = await getChainData();
    sequencerConfig = getEnvConfig(chainData!);
  }
  return sequencerConfig;
};
