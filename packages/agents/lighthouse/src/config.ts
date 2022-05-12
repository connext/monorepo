///NXTP Config Generator based on vector/modules/router/src/config.ts

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { getHelpers } from "./lib/helpers";

// Polling mins and defaults.
const DEFAULT_CONFIRMATIONS = 3;
const MIN_BACKEND_POLL_INTERVAL = 30_000;
const DEFAULT_BACKEND_POLL_INTERVAL = 60_000;

dotenvConfig();

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    connext: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TModeConfig = Type.Object({
  diagnostic: Type.Boolean(),
  cleanup: Type.Boolean(),
});

export const TPollingConfig = Type.Object({
  backend: Type.Integer({ minimum: MIN_BACKEND_POLL_INTERVAL }),
});

export const NxtpLighthouseConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  logLevel: TLogLevel,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  backendUrl: Type.String(),
  mode: TModeConfig,
  polling: TPollingConfig,
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
  relayerUrl: Type.Optional(Type.String()),
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
      diagnostic:
        process.env.NXTP_DIAGNOSTIC_MODE || configJson.mode?.diagnostic || configFile.mode?.diagnostic || false,
    },
    polling: {
      backend:
        process.env.NXTP_BACKEND_POLL_INTERVAL ||
        configJson.polling?.cache ||
        configFile.polling?.cach ||
        DEFAULT_BACKEND_POLL_INTERVAL,
    },
    environment: process.env.NXTP_ENVIRONMENT || configJson.environment || configFile.environment || "production",
    backendUrl:
      process.env.NXTP_BACKEND_URL ||
      configJson.backendUrl ||
      configFile.backendUrl ||
      "https://postgrest.testnet.connext.ninja",
  };

  nxtpConfig.backendUrl =
    nxtpConfig.environment === "production"
      ? "https://postgrest.testnet.connext.ninja"
      : "https://postgrest.testnet.staging.connext.ninja";

  const contractPostfix: ContractPostfix =
    nxtpConfig.environment === "production"
      ? ""
      : (`${nxtpConfig.environment[0].toUpperCase()}${nxtpConfig.environment.slice(1)}` as ContractPostfix);

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? DEFAULT_CONFIRMATIONS;

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
