///NXTP Config Generator based on vector/modules/router/src/config.ts

import { existsSync, readFileSync } from "fs";

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, SubgraphReaderChainConfigSchema } from "@connext/nxtp-utils";

const MIN_SUBGRAPH_SYNC_BUFFER = 25;
const DEFAULT_SUBGRAPH_POLL_INTERVAL = 15_000;

dotenvConfig();

export const TChainConfig = Type.Object({
  subgraph: SubgraphReaderChainConfigSchema, // Subgraph configuration for this chain.
});
export const Backend = Type.Object({
  subgraphPollInterval: Type.Integer({ minimum: 1000 }),
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
  databaseUrl: Type.String({ format: "uri" }),
});

export type BackendConfig = Static<typeof Backend>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (chainData: Map<string, ChainData>): BackendConfig => {
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

  const nxtpConfig: BackendConfig = {
    chains: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    subgraphPollInterval:
      process.env.NXTP_SUBGRAPH_POLL_INTERVAL ||
      configJson.subgraphPollInterval ||
      configFile.subgraphPollInterval ||
      DEFAULT_SUBGRAPH_POLL_INTERVAL,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    databaseUrl: process.env.DATABASE_URL || configJson.databaseUrl || configFile.databaseUrl,
  };

  // add contract deployments if they exist
  if (!nxtpConfig.chains) {
    nxtpConfig.chains = {};
  }
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);

    const maxLag = chainConfig.subgraph?.maxLag ?? MIN_SUBGRAPH_SYNC_BUFFER;
    nxtpConfig.chains[domainId].subgraph = {
      runtime: chainConfig.subgraph?.runtime ?? chainDataForChain?.subgraphs?.runtime ?? [],
      analytics: chainConfig.subgraph?.analytics ?? chainDataForChain?.subgraphs?.analytics ?? [],
      // 25 blocks minimum.
      maxLag: maxLag < MIN_SUBGRAPH_SYNC_BUFFER ? MIN_SUBGRAPH_SYNC_BUFFER : maxLag,
    };
  });

  const validate = ajv.compile(Backend);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: BackendConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (chainData: Map<string, ChainData>): Promise<BackendConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig(chainData);
  }
  return nxtpConfig;
};
