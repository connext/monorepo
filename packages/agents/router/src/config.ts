///NXTP Config Generator based on vector/modules/router/src/config.ts

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, TAddress } from "@connext/nxtp-utils";
import { SubgraphReaderChainConfigSchema } from "@connext/nxtp-adapters-subgraph";
import { ConnextContractDeployments } from "@connext/nxtp-txservice";

import { getHelpers } from "./lib/helpers";

const DEFAULT_ALLOWED_TOLERANCE = 10; // in percent
const MIN_SUBGRAPH_SYNC_BUFFER = 25;
const DEFAULT_SUBGRAPH_POLL_INTERVAL = 15_000;

dotenvConfig();

export const TAssetDescription = Type.Object({
  name: Type.String(),
  address: TAddress,
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainConfig = Type.Object({
  assets: Type.Array(TAssetDescription), // Assets for which the router provides liquidity on this chain.
  subgraph: SubgraphReaderChainConfigSchema, // Subgraph configuration for this chain.
  providers: Type.Array(Type.String()),
  gasStations: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    connext: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TServerConfig = Type.Object({
  port: Type.Integer({ minimum: 1, maximum: 65535 }),
  host: Type.String({ format: "ipv4" }),
  requestLimit: Type.Integer(),
  adminToken: Type.String(),
});

export const TRedisConfig = Type.Object({
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
  host: Type.Optional(Type.String()),
});

export const TModeConfig = Type.Object({
  diagnostic: Type.Boolean(),
  cleanup: Type.Boolean(),
  priceCaching: Type.Boolean(),
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
  redis: TRedisConfig,
  sequencerUrl: Type.String({ format: "uri" }),
  server: TServerConfig,
  maxSlippage: Type.Number({ minimum: 0, maximum: 100 }),
  mode: TModeConfig,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  subgraphPollInterval: Type.Optional(Type.Integer({ minimum: 1000 })),
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

    const {
      shared: { existsSync, readFileSync },
    } = getHelpers();
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
      port: process.env.NXTP_SERVER_PORT || configJson.server?.port || configFile.server?.port || 8080,
      host: process.env.NXTP_SERVER_HOST || configJson.server?.host || configFile.server?.host || "0.0.0.0",
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
    subgraphPollInterval:
      process.env.NXTP_SUBGRAPH_POLL_INTERVAL ||
      configJson.subgraphPollInterval ||
      configFile.subgraphPollInterval ||
      DEFAULT_SUBGRAPH_POLL_INTERVAL,
  };

  if (!nxtpConfig.mnemonic && !nxtpConfig.web3SignerUrl) {
    throw new Error(`Wallet missing, please add either mnemonic or web3SignerUrl: ${JSON.stringify(nxtpConfig)}`);
  }

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    nxtpConfig.chains[domainId].deployments = {
      connext:
        chainConfig.deployments?.connext ??
        (() => {
          const res = chainDataForChain ? deployments.connext(chainDataForChain.chainId) : undefined;
          if (!res) {
            throw new Error(`No Connext contract address for domain ${domainId}`);
          }
          return res.address;
        })(),
    };

    const maxLag = chainConfig.subgraph?.maxLag ?? MIN_SUBGRAPH_SYNC_BUFFER;
    nxtpConfig.chains[domainId].subgraph = {
      runtime: chainConfig.subgraph?.runtime ?? chainDataForChain?.subgraphs?.runtime ?? [],
      analytics: chainConfig.subgraph?.analytics ?? chainDataForChain?.subgraphs?.analytics ?? [],
      // 25 blocks minimum.
      maxLag: maxLag < MIN_SUBGRAPH_SYNC_BUFFER ? MIN_SUBGRAPH_SYNC_BUFFER : maxLag,
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
