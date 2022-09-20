///NXTP Config Generator based on vector/modules/router/src/config.ts

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { existsSync, readFileSync } from "./mockable";

// Polling mins and defaults.
const MIN_CARTOGRAPHER_POLL_INTERVAL = 30_000;
const DEFAULT_CARTOGRAPHER_POLL_INTERVAL = 60_000;

dotenvConfig();

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  deployments: Type.Object({
    spokeConnector: TAddress,
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

export const NxtpLighthouseConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: TLogLevel,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  cartographerUrl: Type.String(),
  mode: TModeConfig,
  polling: TPollingConfig,
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  relayerUrl: Type.Optional(Type.String({ format: "uri" })),
});

export type NxtpLighthouseConfig = Static<typeof NxtpLighthouseConfigSchema>;

// map spoke connector contract names to domains, i.e. MainnetSpokeConnector
export const SPOKE_CONNECTOR_PREFIXES: Record<string, string> = {
  "1735356532": "Optimism",
  "1735353714": "Mainnet",
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
    environment: process.env.NXTP_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    cartographerUrl: process.env.NXTP_CARTOGRAPHER_URL || configJson.cartographerUrl || configFile.cartographerUrl,
    relayerUrl: process.env.NXTP_RELAYER_URL || configJson.relayerUrl || configFile.relayerUrl,
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

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId]) => {
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
            throw new Error(`No SpokeConnector contract address for domain ${domainId}`);
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
