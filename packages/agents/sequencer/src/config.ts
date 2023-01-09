import * as fs from "fs";

import { ajv, ChainData } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";
import { config as dotEnvConfig } from "dotenv";

// @ts-ignore
import { version } from "../package.json";

import { SequencerConfig, SequencerConfigSchema } from "./lib/entities";

const DEFAULT_AUCTION_WAIT_TIME = 30_000;
const DEFAULT_AUCTION_ROUND_DEPTH = 3;
const DEFAULT_RELAYER_FEE_TOLERANCE = 10;

dotEnvConfig();

export const getEnvConfig = (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): SequencerConfig => {
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

  const _sequencerConfig: SequencerConfig = {
    mnemonic: process.env.SEQ_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.SEQ_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
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
    server: {
      sub: {
        port: process.env.SEQ_SUB_SERVER_PORT || configJson.server?.sub?.port || configFile.server?.sub?.port || 8082,
        host:
          process.env.SEQ_SUB_SERVER_HOST || configJson.server?.sub?.host || configFile.server?.sub?.host || "0.0.0.0",
      },
      pub: {
        port: process.env.SEQ_PUB_SERVER_PORT || configJson.server?.pub?.port || configFile.server?.pub?.port || 8081,
        host:
          process.env.SEQ_PUB_SERVER_HOST || configJson.server?.pub?.host || configFile.server?.pub?.host || "0.0.0.0",
      },
      adminToken: process.env.SEQ_SERVER_ADMIN_TOKEN || configJson.server?.adminToken || configFile.server?.adminToken,
    },
    auctionWaitTime:
      process.env.SEQ_AUCTION_WAIT_TIME ||
      configJson.auctionWaitTime ||
      configFile.auctionWaitTime ||
      DEFAULT_AUCTION_WAIT_TIME,
    mode: {
      cleanup: process.env.SEQ_CLEANUP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
    },
    supportedVersion:
      process.env.SEQ_SUPPORTED_BID_VERSION || configJson.supportedVersion || configFile.supportedVersion || version,
    subgraphPrefix: process.env.SEQ_SUBGRAPH_PREFIX || configJson.subgraphPrefix || configFile.subgraphPrefix,
    auctionRoundDepth:
      process.env.AUCTION_ROUND_DEPTH ||
      configJson.auctionRoundDepth ||
      configFile.auctionRoundDepth ||
      DEFAULT_AUCTION_ROUND_DEPTH,
    environment: process.env.SEQ_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    messageQueue: process.env.SEQ_MESSAGE_QUEUE_CONFIG
      ? JSON.parse(process.env.SEQ_MESSAGE_QUEUE_CONFIG)
      : configJson.messageQueue
      ? configJson.messageQueue
      : configFile.messageQueue,
    relayers: process.env.NXTP_RELAYERS
      ? JSON.parse(process.env.NXTP_RELAYERS)
      : configJson.relayers
      ? configJson.relayers
      : configFile.relayers,
    relayerFeeTolerance: process.env.RELAYER_FEE_TOLERANCE
      ? Number(process.env.RELAYER_FEE_TOLERANCE)
      : configJson.relayerFeeTolerance
      ? configJson.relayerFeeTolerance
      : configFile.relayerFeeTolerance
      ? configFile.relayerFeeTolerance
      : DEFAULT_RELAYER_FEE_TOLERANCE,
  };

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  // Disable default reply queues if not provided
  _sequencerConfig.messageQueue.connection.replyQueue = _sequencerConfig.messageQueue.connection.replyQueue ?? false;

  const contractPostfix: ContractPostfix =
    _sequencerConfig.environment === "production"
      ? ""
      : (`${_sequencerConfig.environment[0].toUpperCase()}${_sequencerConfig.environment.slice(1)}` as ContractPostfix);

  // add contract deployments if they exist
  Object.entries(_sequencerConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }

    _sequencerConfig.chains[domainId].deployments = {
      connext:
        chainConfig.deployments?.connext ??
        (() => {
          const res = chainDataForChain ? deployments.connext(chainDataForChain.chainId, contractPostfix) : undefined;

          if (!res) {
            throw new Error(`No Connext contract address for domain ${domainId}`);
          }
          return res.address;
        })(),

      relayerProxy:
        chainConfig.deployments?.relayerProxy ??
        (() => {
          const res = chainDataForChain
            ? deployments.relayerProxy(chainDataForChain.chainId, contractPostfix)
            : undefined;

          if (!res) {
            throw new Error(`No RelayerProxy contract address for domain ${domainId}`);
          }
          return res.address;
        })(),
    };

    if (!chainConfig.confirmations) {
      _sequencerConfig.chains[domainId].confirmations = chainRecommendedConfirmations;
    }
  });

  const validate = ajv.compile(SequencerConfigSchema);
  const valid = validate(_sequencerConfig);
  if (!valid) {
    throw new Error(validate.errors?.map((err: any) => JSON.stringify(err, null, 2)).join(","));
  }

  return _sequencerConfig;
};

export let sequencerConfig: SequencerConfig | undefined;

/**
 * Gets and validates the router config from the environment.
 * @returns The router config with sensible defaults
 */
export const getConfig = async (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<SequencerConfig> => {
  if (!sequencerConfig) {
    sequencerConfig = getEnvConfig(chainData, deployments);
  }
  return sequencerConfig;
};
