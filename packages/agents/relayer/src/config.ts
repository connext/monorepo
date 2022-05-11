import * as fs from "fs";

import { ajv, ChainData } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { RelayerConfig, RelayerConfigSchema } from "./lib/entities";

export const getEnvConfig = (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): RelayerConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.SEQ_CONFIG || "");
  } catch (e: unknown) {
    console.info("No SEQ_CONFIG exists; using config file and individual env vars.");
  }
  try {
    let json: string;

    const path = process.env.SEQ_CONFIG_FILE ?? "config.json";
    if (fs.existsSync(path)) {
      json = fs.readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }

  const _relayerConfig: RelayerConfig = {
    redis: {
      host: process.env.SEQ_REDIS_HOST || configJson.redis?.host || configFile.redis?.host,
      port: process.env.SEQ_REDIS_PORT || configJson.redis?.port || configFile.redis?.port || 6379,
    },
    chains: process.env.SEQ_CHAIN_CONFIG
      ? JSON.parse(process.env.SEQ_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel:
      process.env.SEQ_LOG_LEVEL || configJson.logLevel || configFile.logLevel || process.env.NXTP_LOG_LEVEL || "info",
    network:
      process.env.SEQ_NETWORK || configJson.network || configFile.network || process.env.NXTP_NETWORK || "mainnet",
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.NXTP_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    server: {
      port: process.env.SEQ_SERVER_PORT || configJson.server?.port || configFile.server?.port || 8081,
      host: process.env.SEQ_SERVER_HOST || configJson.server?.host || configFile.server?.host || "0.0.0.0",
      adminToken: process.env.SEQ_SERVER_ADMIN_TOKEN || configJson.server?.adminToken || configFile.server?.adminToken,
    },
    mode: {
      cleanup: process.env.NXTP_CLEAN_UP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
    },
    environment: process.env.NXTP_ENVIRONMENT || configJson.environment || configFile.environment || "production",
  };

  if (!_relayerConfig.mnemonic && !_relayerConfig.web3SignerUrl) {
    throw new Error(`Wallet missing, please add either mnemonic or web3SignerUrl: ${JSON.stringify(_relayerConfig)}`);
  }

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  const contractPostfix: ContractPostfix =
    _relayerConfig.environment === "production"
      ? ""
      : (`${_relayerConfig.environment[0].toUpperCase()}${_relayerConfig.environment.slice(1)}` as ContractPostfix);

  // add contract deployments if they exist
  Object.entries(_relayerConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }

    _relayerConfig.chains[domainId].deployments = {
      connext:
        chainConfig.deployments?.connext ??
        (() => {
          const res = chainDataForChain ? deployments.connext(chainDataForChain.chainId, contractPostfix) : undefined;
          if (!res) {
            throw new Error(`No Connext contract address for domain ${domainId}`);
          }
          return res.address;
        })(),
    };

    if (!chainConfig.confirmations) {
      _relayerConfig.chains[domainId].confirmations = chainRecommendedConfirmations;
    }
  });

  const validate = ajv.compile(RelayerConfigSchema);
  const valid = validate(_relayerConfig);
  if (!valid) {
    throw new Error(validate.errors?.map((err: any) => JSON.stringify(err, null, 2)).join(","));
  }

  return _relayerConfig;
};

export let sequencerConfig: RelayerConfig | undefined;

/**
 * Gets and validates the router config from the environment.
 * @returns The router config with sensible defaults
 */
export const getConfig = async (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<RelayerConfig> => {
  if (!sequencerConfig) {
    sequencerConfig = getEnvConfig(chainData, deployments);
  }
  return sequencerConfig;
};
