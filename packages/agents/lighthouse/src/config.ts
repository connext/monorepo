///NXTP Config Generator based on vector/modules/router/src/config.ts

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, domainToChainId, TAddress, TDatabaseConfig, TLogLevel } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { existsSync, readFileSync } from "./mockable";

// Polling mins and defaults.
const MIN_CARTOGRAPHER_POLL_INTERVAL = 30_000;
const DEFAULT_CARTOGRAPHER_POLL_INTERVAL = 60_000;
export const DEFAULT_PROVER_BATCH_SIZE = 1;
export const DEFAULT_RELAYER_WAIT_TIME = 60_000 * 3600; // 1 hour
export const DEFAULT_PROVER_PUB_MAX = 5000;
export const DEFAULT_LH_SNAPSHOT_DURATION = 1800; // 30 minutes
export const DEFAULT_BATCH_WAIT_TIME = 1800; // 30 minutes

dotenvConfig();

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  deployments: Type.Object({
    connext: TAddress,
    spokeMerkleTree: TAddress,
    hubMerkleTree: TAddress,
    spokeConnector: TAddress,
    relayerProxy: TAddress,
    rootManager: TAddress,
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

export const TMQConfig = Type.Object({
  connection: Type.Object({
    uri: Type.String(),
  }),
  exchange: Type.Object({
    name: Type.String(),
    type: Type.Union([Type.Literal("fanout"), Type.Literal("topic"), Type.Literal("direct")]),
    publishTimeout: Type.Integer(),
    persistent: Type.Boolean(),
    durable: Type.Boolean(),
  }),
  subscriber: Type.Optional(Type.String()),
  queueLimit: Type.Optional(Type.Number()),
  prefetchSize: Type.Optional(Type.Number()),
  publisherWaitTime: Type.Optional(Type.Number()),
});

export const TRedisConfig = Type.Object({
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
  host: Type.Optional(Type.String()),
});

export const TServerConfig = Type.Object({
  prover: Type.Object({
    port: Type.Integer({ minimum: 1, maximum: 65535 }),
    host: Type.String({ format: "ipv4" }),
  }),
  adminToken: Type.String(),
});

export const NxtpLighthouseConfigSchema = Type.Object({
  hubDomain: Type.String(),
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: TLogLevel,
  network: Type.Union([
    Type.Literal("testnet"),
    Type.Literal("mainnet"),
    Type.Literal("local"),
    Type.Literal("devnet"),
  ]),
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
  databaseWriter: TDatabaseConfig,
  mnemonic: Type.Optional(Type.String()),
  web3SignerUrl: Type.Optional(Type.String()),
  redis: TRedisConfig,
  subgraphPrefix: Type.Optional(Type.String()),
  healthUrls: Type.Partial(
    Type.Object({
      prover: Type.String({ format: "uri" }),
      processor: Type.String({ format: "uri" }),
      propagate: Type.String({ format: "uri" }),
      sendOutboundRoot: Type.String({ format: "uri" }),
      propose: Type.String({ format: "uri" }),
    }),
  ),
  proverBatchSize: Type.Record(Type.String(), Type.Integer({ minimum: 1, maximum: 100 })),
  proverBatchWaitTime: Type.Record(Type.String(), Type.Integer({ minimum: 0, maximum: 86400 })),
  relayerWaitTime: Type.Integer({ minimum: 0 }),
  proverPubMax: Type.Optional(Type.Integer({ minimum: 1, maximum: 10000 })),
  service: Type.Union([
    Type.Literal("propose"),
    Type.Literal("prover-pub"),
    Type.Literal("prover-sub"),
    Type.Literal("prover-func"),
    Type.Literal("propagate"),
    Type.Literal("process"),
    Type.Literal("sendoutboundroot"),
  ]),
  messageQueue: TMQConfig,
  server: TServerConfig,
  snapshotDuration: Type.Integer({ minimum: 1, maximum: 10000 }),
});

export type NxtpLighthouseConfig = Static<typeof NxtpLighthouseConfigSchema>;

// map spoke connector contract names to domains, i.e. MainnetSpokeConnector
export const SPOKE_CONNECTOR_PREFIXES: Record<string, string> = {
  // TESTNET
  "1735356532": "Optimism",
  "1735353714": "Mainnet",
  "9991": "Polygon",
  "1734439522": "Arbitrum",
  "2053862260": "ZkSync",
  "1668247156": "Linea",
  "1650553703": "Base",
  "2016506996": "X1",
  // MAINNET
  "1869640809": "Optimism",
  "6648936": "Mainnet",
  "1886350457": "Polygon",
  "6778479": "Gnosis",
  "1634886255": "Arbitrum",
  "6450786": "Bnb",
  "1818848877": "Linea",
  "1650553709": "Base",
  "1887071085": "PolygonZk",
  "2053862243": "ZkSync",
  "1635148152": "Avalanche",
  "1835101812": "Mantle",
  "1835365481": "Metis",
  "1836016741": "Mode",
};

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): NxtpLighthouseConfig => {
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

  const nxtpConfig: NxtpLighthouseConfig = {
    hubDomain: process.env.HUB_DOMAIN || configJson.hubDomain || configFile.hubDomain || "1735353714",
    chains: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: process.env.NXTP_NETWORK || configJson.network || configFile.network || "mainnet",
    mode: {
      cleanup: process.env.NXTP_CLEAN_UP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
      diagnostic:
        process.env.NXTP_DIAGNOSTIC_MODE || configJson.mode?.diagnostic || configFile.mode?.diagnostic || false,
    },
    polling: {
      cartographer:
        process.env.NXTP_CARTOGRAPHER_POLL_INTERVAL ||
        configJson.polling?.cache ||
        configFile.polling?.cache ||
        DEFAULT_CARTOGRAPHER_POLL_INTERVAL,
    },
    relayers: process.env.NXTP_RELAYERS
      ? JSON.parse(process.env.NXTP_RELAYERS)
      : configJson.relayers
      ? configJson.relayers
      : configFile.relayers,
    database: {
      url: process.env.DATABASE_URL || configJson.database?.url || configFile.database?.url,
    },
    databaseWriter: {
      url: process.env.DATABASE_WRITER_URL || configJson.databaseWriter?.url || configFile.databaseWriter?.url,
    },
    redis: {
      host: process.env.REDIS_HOST || configJson.redis?.host || configFile.redis?.host || "127.0.0.1",
      port: process.env.REDIS_PORT
        ? +process.env.REDIS_PORT
        : undefined || configJson.redis?.port || configFile.redis?.port || 6379,
    },
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.NXTP_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    environment: process.env.NXTP_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    cartographerUrl: process.env.NXTP_CARTOGRAPHER_URL || configJson.cartographerUrl || configFile.cartographerUrl,
    subgraphPrefix: process.env.NXTP_SUBGRAPH_PREFIX || configJson.subgraphPrefix || configFile.subgraphPrefix,
    healthUrls: process.env.NXTP_HEALTH_URLS || configJson.healthUrls || configFile.healthUrls || {},
    service: process.env.LIGHTHOUSE_SERVICE || configJson.service || configFile.service,
    proverBatchSize: configJson.proverBatchSize || configFile.proverBatchSize || {},
    proverBatchWaitTime: configJson.proverBatchWaitTime || configFile.proverBatchWaitTime || {},
    relayerWaitTime:
      process.env.NXTP_RELAYER_WAIT_TIME ||
      configJson.relayerWaitTime ||
      configFile.relayerWaitTime ||
      DEFAULT_RELAYER_WAIT_TIME,
    proverPubMax: process.env.PROVER_PUB_MAX
      ? +process.env.PROVER_PUB_MAX
      : undefined || configJson.proverPubMax || configFile.proverPubMax || DEFAULT_PROVER_PUB_MAX,
    messageQueue: process.env.MESSAGE_QUEUE
      ? JSON.parse(process.env.MESSAGE_QUEUE)
      : configJson.messageQueue ?? configFile.messageQueue,
    server: {
      prover: {
        host:
          process.env.PROVER_SUB_SERVER_HOST ||
          configJson.server?.prover?.host ||
          configFile.server?.prover?.host ||
          "0.0.0.0",
        port: process.env.PROVER_SUB_SERVER_PORT
          ? +process.env.PROVER_SUB_SERVER_PORT
          : undefined || configJson.server?.prover?.port || configFile.server?.prover?.port || 7072,
      },
      adminToken:
        process.env.LH_SERVER_ADMIN_TOKEN ||
        configJson.server?.adminToken ||
        configFile.server?.adminToken ||
        "blahblah",
    },
    snapshotDuration: process.env.LH_SNAPSHOT_DURATION
      ? +process.env.LH_SNAPSHOT_DURATION
      : configJson.snapshotDuration || configFile.snapshotDuration || DEFAULT_LH_SNAPSHOT_DURATION,
  };
  nxtpConfig.cartographerUrl =
    nxtpConfig.cartographerUrl ??
    (nxtpConfig.environment === "production"
      ? "https://postgrest.testnet.connext.ninja"
      : "https://postgrest.testnet.staging.connext.ninja");

  const contractPostfix: ContractPostfix =
    nxtpConfig.environment === "production"
      ? ""
      : (`${nxtpConfig.environment[0].toUpperCase()}${nxtpConfig.environment.slice(1)}` as ContractPostfix);

  if (!nxtpConfig.mnemonic && !nxtpConfig.web3SignerUrl) {
    throw new Error(`Wallet missing, please add either mnemonic or web3SignerUrl: ${JSON.stringify(nxtpConfig)}`);
  }

  // add contract deployments if they exist
  const hubChain = domainToChainId(+nxtpConfig.hubDomain);
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    nxtpConfig.chains[domainId].deployments = {
      spokeConnector:
        nxtpConfig.chains[domainId].deployments?.spokeConnector ??
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

      connext:
        nxtpConfig.chains[domainId].deployments?.connext ??
        (() => {
          const res = chainDataForChain ? deployments.connext(chainDataForChain.chainId, contractPostfix) : undefined;
          if (!res) {
            throw new Error(
              `No Connext${contractPostfix} contract address for domain ${domainId}, chain ${chainDataForChain?.chainId}`,
            );
          }
          return res.address;
        })(),

      spokeMerkleTree:
        chainConfig.deployments?.spokeMerkleTree ??
        (() => {
          const res = chainDataForChain
            ? deployments.spokeMerkleTreeManager(
                chainDataForChain.chainId,
                hubChain === chainDataForChain.chainId,
                contractPostfix,
              )
            : undefined;

          if (!res) {
            throw new Error(`No spoke MerkleTreeManager contract address for domain ${domainId}`);
          }
          return res.address;
        })(),

      hubMerkleTree:
        chainConfig.deployments?.hubMerkleTree ??
        (() => {
          const res = chainDataForChain ? deployments.rootMerkleTreeManager(hubChain, contractPostfix) : undefined;

          if (!res) {
            throw new Error(`No hub MerkleTreeManager contract address for domain ${hubChain}`);
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

      rootManager:
        chainConfig.deployments?.rootManager ??
        (() => {
          const res = chainDataForChain ? deployments.rootManager(hubChain, contractPostfix) : undefined;

          if (!res) {
            throw new Error(`No Rootmanager contract address for domain ${hubChain}`);
          }
          return res.address;
        })(),
    };
  });

  const validate = ajv.compile(NxtpLighthouseConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: NxtpLighthouseConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<NxtpLighthouseConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig(chainData, deployments);
  }
  return nxtpConfig;
};
