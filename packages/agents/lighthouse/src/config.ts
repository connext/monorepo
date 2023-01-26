/// Connext Config Generator based on vector/modules/router/src/config.ts

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, TAddress, TDatabaseConfig, TLogLevel } from "@connext/utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/txservice";

import { existsSync, readFileSync } from "./mockable";

// Polling mins and defaults.
const MIN_CARTOGRAPHER_POLL_INTERVAL = 30_000;
const DEFAULT_CARTOGRAPHER_POLL_INTERVAL = 60_000;
const DEFAULT_PROVER_BATCH_SIZE = 10;

dotenvConfig();

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  deployments: Type.Object({
    spokeConnector: TAddress,
    relayerProxy: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TModeConfig = Type.Object({
  diagnostic: Type.Boolean(),
  cleanup: Type.Boolean(),
});

export const TPollingConfig = Type.Object({
  cartographer: Type.Integer({ minimum: MIN_CARTOGRAPHER_POLL_INTERVAL }),
});

export const LighthouseConfigSchema = Type.Object({
  hubDomain: Type.String(),
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: TLogLevel,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  cartographerUrl: Type.String({ format: "uri" }),
  mode: TModeConfig,
  polling: TPollingConfig,
  relayers: Type.Array(
    Type.Object({
      type: Type.Union([Type.Literal("Gelato"), Type.Literal("Connext")]),
      url: Type.String({ format: "uri" }),
      apiKey: Type.String(),
    }),
  ),
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  database: TDatabaseConfig,
  subgraphPrefix: Type.Optional(Type.String()),
  healthUrls: Type.Partial(
    Type.Object({
      prover: Type.String({ format: "uri" }),
      processor: Type.String({ format: "uri" }),
      propagate: Type.String({ format: "uri" }),
    }),
  ),
  proverBatchSize: Type.Integer({ minimum: 1, maximum: 1000 }),
  service: Type.Union([Type.Literal("prover"), Type.Literal("propagate"), Type.Literal("process")]),
});

export type LighthouseConfig = Static<typeof LighthouseConfigSchema>;

// map spoke connector contract names to domains, i.e. MainnetSpokeConnector
export const SPOKE_CONNECTOR_PREFIXES: Record<string, string> = {
  // TESTNET
  "1735356532": "Optimism",
  "1735353714": "Mainnet",
  "9991": "Polygon",
  "1734439522": "Arbitrum",
  // MAINNET
  "1869640809": "Optimism",
  "6648936": "Mainnet",
  "1886350457": "Polygon",
  "6778479": "Gnosis",
  "1634886255": "Arbitrum",
  "6450786": "Bnb",
};

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): LighthouseConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.LIGHTHOUSE_CONFIG || "");
  } catch (e: unknown) {
    console.info("No LIGHTHOUSE_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;
    const path = process.env.LIGHTHOUSE_CONFIG_FILE ?? "config.json";

    if (existsSync(path)) {
      json = readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }

  const connextConfig: LighthouseConfig = {
    hubDomain: process.env.HUB_DOMAIN || configJson.hubDomain || configFile.hubDomain || "1735353714",
    chains: process.env.CHAIN_CONFIG
      ? JSON.parse(process.env.CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: process.env.NETWORK || configJson.network || configFile.network || "mainnet",
    mode: {
      cleanup: process.env.CLEAN_UP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
      diagnostic: process.env.DIAGNOSTIC_MODE || configJson.mode?.diagnostic || configFile.mode?.diagnostic || false,
    },
    polling: {
      cartographer:
        process.env.CARTOGRAPHER_POLL_INTERVAL ||
        configJson.polling?.cache ||
        configFile.polling?.cache ||
        DEFAULT_CARTOGRAPHER_POLL_INTERVAL,
    },
    relayers: process.env.RELAYERS
      ? JSON.parse(process.env.RELAYERS)
      : configJson.relayers
      ? configJson.relayers
      : configFile.relayers,
    database: {
      url: process.env.DATABASE_URL || configJson.database?.url || configFile.database?.url,
    },
    environment: process.env.ENVIRONMENT || configJson.environment || configFile.environment || "production",
    cartographerUrl: process.env.CARTOGRAPHER_URL || configJson.cartographerUrl || configFile.cartographerUrl,
    subgraphPrefix: process.env.SUBGRAPH_PREFIX || configJson.subgraphPrefix || configFile.subgraphPrefix,
    healthUrls: process.env.HEALTH_URLS || configJson.healthUrls || configFile.healthUrls || {},
    service: process.env.LIGHTHOUSE_SERVICE || configJson.service || configFile.service,
    proverBatchSize:
      process.env.PROVER_BATCH_SIZE ||
      configJson.proverBatchSize ||
      configFile.proverBatchSize ||
      DEFAULT_PROVER_BATCH_SIZE,
  };

  connextConfig.cartographerUrl =
    connextConfig.cartographerUrl ??
    (connextConfig.environment === "production"
      ? "https://postgrest.testnet.connext.ninja"
      : "https://postgrest.testnet.staging.connext.ninja");

  const contractPostfix: ContractPostfix =
    connextConfig.environment === "production"
      ? ""
      : (`${connextConfig.environment[0].toUpperCase()}${connextConfig.environment.slice(1)}` as ContractPostfix);

  // add contract deployments if they exist
  Object.entries(connextConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    connextConfig.chains[domainId].deployments = {
      spokeConnector:
        connextConfig.chains[domainId].deployments?.spokeConnector ??
        (() => {
          const prefix = SPOKE_CONNECTOR_PREFIXES[domainId];
          if (!prefix) {
            throw new Error(`No spoke connector prefix for domain ${domainId}`);
          }
          const res = chainDataForChain
            ? deployments.spokeConnector(chainDataForChain.chainId, prefix, contractPostfix)
            : undefined;
          if (!res) {
            throw new Error(
              `No ${prefix}SpokeConnector${contractPostfix} contract address for domain ${domainId}, chain ${chainDataForChain?.chainId}`,
            );
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
  });

  const validate = ajv.compile(LighthouseConfigSchema);

  const valid = validate(connextConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return connextConfig;
};

let connextConfig: LighthouseConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<LighthouseConfig> => {
  if (!connextConfig) {
    connextConfig = getEnvConfig(chainData, deployments);
  }
  return connextConfig;
};
