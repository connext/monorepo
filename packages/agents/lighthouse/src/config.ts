///NXTP Config Generator based on vector/modules/router/src/config.ts

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/nxtp-utils";
import { SubgraphReaderChainConfigSchema } from "@connext/nxtp-adapters-subgraph";
import { ConnextContractDeployments } from "@connext/nxtp-txservice";

import { getHelpers } from "./lib/helpers";

const MIN_SUBGRAPH_SYNC_BUFFER = 25;
const DEFAULT_SUBGRAPH_POLL_INTERVAL = 15_000;

dotenvConfig();

export const TChainConfig = Type.Object({
  subgraph: SubgraphReaderChainConfigSchema, // Subgraph configuration for this chain.
  providers: Type.Array(Type.String()),
  deployments: Type.Object({
    connext: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TRedisConfig = Type.Object({
  port: Type.Optional(Type.Integer({ minimum: 1, maximum: 65535 })),
  host: Type.Optional(Type.String()),
});

export const TModeConfig = Type.Object({
  diagnostic: Type.Boolean(),
  cleanup: Type.Boolean(),
  priceCaching: Type.Boolean(),
});

export const NxtpLighthouseConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: TLogLevel,
  // redis: TRedisConfig,
  mode: TModeConfig,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  subgraphPollInterval: Type.Optional(Type.Integer({ minimum: 1000 })),
});

export type NxtpLighthouseConfig = Static<typeof NxtpLighthouseConfigSchema>;

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

  const nxtpConfig: NxtpLighthouseConfig = {
    chains: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: process.env.NXTP_NETWORK || configJson.network || configFile.network || "mainnet",
    mode: {
      cleanup: process.env.NXTP_CLEAN_UP_MODE || configJson.mode?.cleanup || configFile.mode?.cleanup || false,
      priceCaching:
        process.env.NXTP_PRICE_CACHE_MODE || configJson.mode?.priceCaching || configFile.mode?.priceCaching || true,
      diagnostic:
        process.env.NXTP_DIAGNOSTIC_MODE || configJson.mode?.diagnostic || configFile.mode?.diagnostic || false,
    },
    subgraphPollInterval:
      process.env.NXTP_SUBGRAPH_POLL_INTERVAL ||
      configJson.subgraphPollInterval ||
      configFile.subgraphPollInterval ||
      DEFAULT_SUBGRAPH_POLL_INTERVAL,
  };

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);

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
