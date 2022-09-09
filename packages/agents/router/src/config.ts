///NXTP Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import {
  ajv,
  ChainData,
  TChainConfig,
  TOptionalPeripheralConfig,
  TRequiredPeripheralConfig,
  TServerConfig,
} from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { existsSync, readFileSync } from "./mockable";

const DEFAULT_ALLOWED_TOLERANCE = 10; // in percent

// Polling mins and defaults.
const MIN_SUBGRAPH_POLL_INTERVAL = 2_000;
const MIN_CARTOGRAPHER_POLL_INTERVAL = 2_000;
const DEFAULT_SUBGRAPH_POLL_INTERVAL = 15_000;
const DEFAULT_CARTOGRAPHER_POLL_INTERVAL = 15_000;
const DEFAULT_CONFIRMATIONS = 3;
const MIN_CACHE_POLL_INTERVAL = 2_000;
const DEFAULT_CACHE_POLL_INTERVAL = 20_000;
const DEFAULT_AUCTION_ROUND_DEPTH = 3;

dotenvConfig();

export const TModeConfig = Type.Object({
  diagnostic: Type.Boolean(),
  cleanup: Type.Boolean(),
  priceCaching: Type.Boolean(),
});

export const TPollingConfig = Type.Object({
  subgraph: Type.Integer({ minimum: MIN_SUBGRAPH_POLL_INTERVAL }),
  cartographer: Type.Integer({ minimum: MIN_CARTOGRAPHER_POLL_INTERVAL }),
  cache: Type.Integer({ minimum: MIN_CACHE_POLL_INTERVAL }),
});

export const NxtpRouterConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: Type.Union([
    Type.Literal("fatal"),
    Type.Literal("error"),
    Type.Literal("warn"),
    Type.Literal("info"),
    Type.Literal("debug"),
    Type.Literal("trace"),
    Type.Literal("silent"),
  ]),
  mnemonic: Type.Optional(Type.String()),
  web3SignerUrl: Type.Optional(Type.String()),
  redis: TOptionalPeripheralConfig,
  sequencerUrl: Type.String({ format: "uri" }),
  cartographerUrl: Type.String({ format: "uri" }),
  server: Type.Intersect([
    TServerConfig,
    Type.Object({
      exec: Type.Object({
        port: Type.Integer({ minimum: 1, maximum: 65535 }),
        host: Type.String({ format: "ipv4" }),
      }),
    }),
  ]),
  maxSlippage: Type.Integer({ minimum: 0, maximum: 100 }),
  mode: TModeConfig,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  polling: TPollingConfig,
  auctionRoundDepth: Type.Integer(),
  subgraphPrefix: Type.Optional(Type.String()),
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  nomadEnvironment: Type.Union([Type.Literal("staging"), Type.Literal("production"), Type.Literal("none")]),
  messageQueue: TRequiredPeripheralConfig,
});

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): NxtpRouterConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.NXTP_CONFIG || "");
  } catch (e: unknown) {
    console.info("No NXTP_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.NXTP_CONFIG_FILE ?? "config.json";
    if (existsSync(path)) {
      json = readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }
  // return configFile;

  const nxtpConfig: NxtpRouterConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.NXTP_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    redis: {
      host: process.env.NXTP_REDIS_HOST || configJson.redis?.host || configFile.redis?.host,
      port: process.env.NXTP_REDIS_PORT || configJson.redis?.port || configFile.redis?.port || 6379,
    },
    chains: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: process.env.NXTP_NETWORK || configJson.network || configFile.network || "mainnet",
    server: {
      pub: {
        port: process.env.NXTP_SERVER_PUB_PORT || configJson.server?.pub?.port || configFile.server?.pub?.port || 8091,
        host:
          process.env.NXTP_SERVER_PUB_HOST || configJson.server?.pub?.host || configFile.server?.pub?.host || "0.0.0.0",
      },
      sub: {
        port: process.env.NXTP_SERVER_SUB_PORT || configJson.server?.sub?.port || configFile.server?.sub?.port || 8090,
        host:
          process.env.NXTP_SERVER_SUB_HOST || configJson.server?.sub?.host || configFile.server?.sub?.host || "0.0.0.0",
      },
      exec: {
        port:
          process.env.NXTP_SERVER_EXEC_PORT || configJson.server?.exec?.port || configFile.server?.exec?.port || 8092,
        host:
          process.env.NXTP_SERVER_EXEC_HOST ||
          configJson.server?.exec?.host ||
          configFile.server?.exec?.host ||
          "0.0.0.0",
      },
      requestLimit:
        process.env.NXTP_SERVER_REQUEST_LIMIT ||
        configJson.server?.requestLimit ||
        configFile.server?.requestLimit ||
        500,
      adminToken: process.env.NXTP_SERVER_ADMIN_TOKEN || configJson.server?.adminToken || configFile.server?.adminToken,
    },
    mode: {
      cleanup: process.env.NXTP_CLEAN_UP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
      priceCaching:
        process.env.NXTP_PRICE_CACHE_MODE || configJson.mode?.priceCaching || configFile.mode?.priceCaching || true,
      diagnostic:
        process.env.NXTP_DIAGNOSTIC_MODE || configJson.mode?.diagnostic || configFile.mode?.diagnostic || false,
    },
    maxSlippage:
      process.env.NXTP_ALLOWED_TOLERANCE ||
      configJson.allowedTolerance ||
      configFile.allowedTolerance ||
      DEFAULT_ALLOWED_TOLERANCE,
    sequencerUrl: process.env.NXTP_SEQUENCER || configJson.sequencerUrl || configFile.sequencerUrl,
    cartographerUrl: process.env.NXTP_CARTOGRAPHER || configJson.cartographerUrl || configFile.cartographerUrl,
    polling: {
      subgraph:
        process.env.NXTP_SUBGRAPH_POLL_INTERVAL ||
        configJson.polling?.subgraph ||
        configFile.polling?.subgraph ||
        // Backwards compat:
        configJson.subgraphPollInterval ||
        configFile.subgraphPollInterval ||
        DEFAULT_SUBGRAPH_POLL_INTERVAL,
      cache:
        process.env.NXTP_CACHE_POLL_INTERVAL ||
        configJson.polling?.cache ||
        configFile.polling?.cach ||
        DEFAULT_CACHE_POLL_INTERVAL,
      cartographer:
        process.env.NXTP_CARTOGRAPHER_POLL_INTERVAL ||
        configJson.polling?.cartographer ||
        configFile.polling?.cartographer ||
        DEFAULT_CARTOGRAPHER_POLL_INTERVAL,
    },
    auctionRoundDepth:
      process.env.AUCTION_ROUND_DEPTH ||
      configJson.auctionRoundDepth ||
      configFile.auctionRoundDepth ||
      DEFAULT_AUCTION_ROUND_DEPTH,
    subgraphPrefix: process.env.NXTP_SUBGRAPH_PREFIX || configJson.subgraphPrefix || configFile.subgraphPrefix,
    environment: process.env.NXTP_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    nomadEnvironment:
      process.env.NXTP_NOMAD_ENVIRONMENT || configJson.nomadEnvironment || configFile.nomadEnvironment || "staging",
    messageQueue: {
      uri:
        process.env.NXTP_MESSAGE_QUEUE_URI ||
        configJson.messageQueue?.uri ||
        configFile.messageQueue?.uri ||
        "amqp://guest@guestlocalhost:5672",
    },
  };

  if (!nxtpConfig.mnemonic && !nxtpConfig.web3SignerUrl) {
    throw new Error(`Wallet missing, please add either mnemonic or web3SignerUrl: ${JSON.stringify(nxtpConfig)}`);
  }

  const contractPostfix: ContractPostfix =
    nxtpConfig.environment === "production"
      ? ""
      : (`${nxtpConfig.environment[0].toUpperCase()}${nxtpConfig.environment.slice(1)}` as ContractPostfix);

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? DEFAULT_CONFIRMATIONS;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    nxtpConfig.chains[domainId].deployments = {
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

    nxtpConfig.chains[domainId].confirmations = chainConfig.confirmations ?? chainRecommendedConfirmations;

    nxtpConfig.chains[domainId].gasStations = (nxtpConfig.chains[domainId].gasStations ?? []).concat(
      chainRecommendedGasStations,
    );
  });

  const validate = ajv.compile(NxtpRouterConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: NxtpRouterConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<NxtpRouterConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig(chainData, deployments);
  }
  return nxtpConfig;
};
