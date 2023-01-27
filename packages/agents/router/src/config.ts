/// Connext Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import {
  ajv,
  ChainData,
  TChainConfig,
  TOptionalPeripheralConfig,
  TRequiredPeripheralConfig,
  TServerConfig,
} from "@connext/utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/txservice";

import { existsSync, readFileSync } from "./mockable";

const DEFAULT_SLIPPAGE = 10000; // in BPS

// Polling mins and defaults.
const MIN_SUBGRAPH_POLL_INTERVAL = 2_000;
const MIN_CARTOGRAPHER_POLL_INTERVAL = 2_000;
const DEFAULT_SUBGRAPH_POLL_INTERVAL = 15_000;
const DEFAULT_CARTOGRAPHER_POLL_INTERVAL = 15_000;
const DEFAULT_CONFIRMATIONS = 3;
const MIN_CACHE_POLL_INTERVAL = 2_000;
const DEFAULT_CACHE_POLL_INTERVAL = 20_000;
const DEFAULT_AUCTION_ROUND_DEPTH = 3;

// Sequencer and Cartographer default urls
const SEQUENCER_URLS: Record<string, any> = {
  testnet: {
    staging: "https://sequencer-publisher.testnet.staging.connext.ninja",
    production: "https://sequencer.testnet.connext.ninja",
  },
  mainnet: {
    staging: "",
    production: "https://sequencer.mainnet.connext.ninja",
  },
};

const CARTOGRAPHER_URLS: Record<string, any> = {
  testnet: {
    staging: "https://postgrest.testnet.staging.connext.ninja",
    production: "https://postgrest.testnet.connext.ninja",
  },
  mainnet: {
    staging: "",
    production: "https://postgrest.mainnet.connext.ninja",
  },
};

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

export const RouterConfigSchema = Type.Object({
  chains: Type.Record(
    Type.String(),
    Type.Intersect([TChainConfig, Type.Object({ startNonce: Type.Optional(Type.Integer({ minimum: 0 })) })]),
  ),
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
  slippage: Type.Integer({ minimum: 0, maximum: 10000 }),
  mode: TModeConfig,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  polling: TPollingConfig,
  auctionRoundDepth: Type.Integer(),
  subgraphPrefix: Type.Optional(Type.String()),
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  messageQueue: TRequiredPeripheralConfig,
});

export type RouterConfig = Static<typeof RouterConfigSchema>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): RouterConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.ROUTER_CONFIG || "");
  } catch (e: unknown) {
    console.info("No ROUTER_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.ROUTER_CONFIG_FILE ?? "config.json";
    if (existsSync(path)) {
      json = readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }
  // return configFile;

  const network = process.env.NETWORK || configJson.network || configFile.network || "mainnet";
  const environment = process.env.ENVIRONMENT || configJson.environment || configFile.environment || "production";

  const connextConfig: RouterConfig = {
    mnemonic: process.env.MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    redis: {
      host: process.env.REDIS_HOST || configJson.redis?.host || configFile.redis?.host,
      port: process.env.REDIS_PORT || configJson.redis?.port || configFile.redis?.port || 6379,
    },
    chains: process.env.CHAIN_CONFIG
      ? JSON.parse(process.env.CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: network,
    server: {
      pub: {
        port: process.env.SERVER_PUB_PORT || configJson.server?.pub?.port || configFile.server?.pub?.port || 8091,
        host: process.env.SERVER_PUB_HOST || configJson.server?.pub?.host || configFile.server?.pub?.host || "0.0.0.0",
      },
      sub: {
        port: process.env.SERVER_SUB_PORT || configJson.server?.sub?.port || configFile.server?.sub?.port || 8090,
        host: process.env.SERVER_SUB_HOST || configJson.server?.sub?.host || configFile.server?.sub?.host || "0.0.0.0",
      },
      exec: {
        port: process.env.SERVER_EXEC_PORT || configJson.server?.exec?.port || configFile.server?.exec?.port || 8092,
        host:
          process.env.SERVER_EXEC_HOST || configJson.server?.exec?.host || configFile.server?.exec?.host || "0.0.0.0",
      },
      requestLimit:
        process.env.SERVER_REQUEST_LIMIT || configJson.server?.requestLimit || configFile.server?.requestLimit || 500,
      adminToken: process.env.SERVER_ADMIN_TOKEN || configJson.server?.adminToken || configFile.server?.adminToken,
    },
    mode: {
      cleanup: process.env.CLEAN_UP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
      priceCaching:
        process.env.PRICE_CACHE_MODE || configJson.mode?.priceCaching || configFile.mode?.priceCaching || true,
      diagnostic: process.env.DIAGNOSTIC_MODE || configJson.mode?.diagnostic || configFile.mode?.diagnostic || false,
    },
    slippage: process.env.SLIPPAGE || configJson.slippage || configFile.slippage || DEFAULT_SLIPPAGE,
    sequencerUrl:
      process.env.SEQUENCER ||
      configJson.sequencerUrl ||
      configFile.sequencerUrl ||
      SEQUENCER_URLS[network][environment],
    cartographerUrl:
      process.env.CARTOGRAPHER ||
      configJson.cartographerUrl ||
      configFile.cartographerUrl ||
      CARTOGRAPHER_URLS[network][environment],
    polling: {
      subgraph:
        process.env.SUBGRAPH_POLL_INTERVAL ||
        configJson.polling?.subgraph ||
        configFile.polling?.subgraph ||
        // Backwards compat:
        configJson.subgraphPollInterval ||
        configFile.subgraphPollInterval ||
        DEFAULT_SUBGRAPH_POLL_INTERVAL,
      cache:
        process.env.CACHE_POLL_INTERVAL ||
        configJson.polling?.cache ||
        configFile.polling?.cach ||
        DEFAULT_CACHE_POLL_INTERVAL,
      cartographer:
        process.env.CARTOGRAPHER_POLL_INTERVAL ||
        configJson.polling?.cartographer ||
        configFile.polling?.cartographer ||
        DEFAULT_CARTOGRAPHER_POLL_INTERVAL,
    },
    auctionRoundDepth:
      process.env.AUCTION_ROUND_DEPTH ||
      configJson.auctionRoundDepth ||
      configFile.auctionRoundDepth ||
      DEFAULT_AUCTION_ROUND_DEPTH,
    subgraphPrefix: process.env.SUBGRAPH_PREFIX || configJson.subgraphPrefix || configFile.subgraphPrefix,
    environment: environment,
    messageQueue: {
      uri:
        process.env.MESSAGE_QUEUE_URI ||
        configJson.messageQueue?.uri ||
        configFile.messageQueue?.uri ||
        "amqp://guest@guestlocalhost:5672",
    },
  };

  if (!connextConfig.mnemonic && !connextConfig.web3SignerUrl) {
    throw new Error(`Wallet missing, please add either mnemonic or web3SignerUrl: ${JSON.stringify(connextConfig)}`);
  }

  const contractPostfix: ContractPostfix =
    connextConfig.environment === "production"
      ? ""
      : (`${connextConfig.environment[0].toUpperCase()}${connextConfig.environment.slice(1)}` as ContractPostfix);

  // add contract deployments if they exist
  Object.entries(connextConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? DEFAULT_CONFIRMATIONS;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    connextConfig.chains[domainId].deployments = {
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

    connextConfig.chains[domainId].confirmations = chainConfig.confirmations ?? chainRecommendedConfirmations;

    connextConfig.chains[domainId].gasStations = (connextConfig.chains[domainId].gasStations ?? []).concat(
      chainRecommendedGasStations,
    );
  });

  const validate = ajv.compile(RouterConfigSchema);

  const valid = validate(connextConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return connextConfig;
};

let connextConfig: RouterConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<RouterConfig> => {
  if (!connextConfig) {
    connextConfig = getEnvConfig(chainData, deployments);
  }
  return connextConfig;
};
