///NXTP Config Generator based on vector/modules/router/src/config.ts
import { readFileSync } from "fs";

import { Type, Static } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import Ajv from "ajv";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { utils } from "ethers";
import { NATS_AUTH_URL, NATS_CLUSTER_URL, TAddress, TChainId, TIntegerString } from "@connext/nxtp-utils";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const ajv = addFormats(new Ajv(), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  confirmations: Type.Number({ minimum: 1 }),
  subgraph: Type.String(),
  transactionManagerAddress: Type.String(),
  minGas: Type.String(),
});

export const TSwapPool = Type.Object({
  name: Type.Optional(Type.String()),
  assets: Type.Array(
    Type.Object({
      chainId: TChainId,
      assetId: TAddress,
    }),
  ),
});

const NxtpRouterConfigSchema = Type.Object({
  adminToken: Type.String(),
  chainConfig: Type.Record(TIntegerString, TChainConfig),
  logLevel: Type.Union([
    Type.Literal("fatal"),
    Type.Literal("error"),
    Type.Literal("warn"),
    Type.Literal("info"),
    Type.Literal("debug"),
    Type.Literal("trace"),
    Type.Literal("silent"),
  ]),
  natsUrl: Type.String(),
  authUrl: Type.String(),
  mnemonic: Type.String(),
  swapPools: Type.Array(TSwapPool),
});

const MIN_GAS = utils.parseEther("0.1");

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (): NxtpRouterConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    let json: string;

    if (process.env.NXTP_CONFIG_FILE) {
      console.log("process.env.NXTP_CONFIG_FILE: ", process.env.NXTP_CONFIG_FILE);
      json = readFileSync(process.env.NXTP_CONFIG_FILE, "utf-8");
    } else {
      json = readFileSync("config.json", "utf-8");
    }
    if (json) {
      configFile = JSON.parse(json);
      console.log("Found configFile");
    }
  } catch (e) {
    console.warn("No config file available, trying env vars...", e);
  }
  // return configFile;

  if (process.env.NXTP_CONFIG) {
    try {
      configJson = JSON.parse(process.env.NXTP_CONFIG || "");
      if (configJson) console.log("Found process.env.NXTP_CONFIG_FILE");
    } catch (e) {
      console.warn("No NXTP_CONFIG_FILE exists...");
    }
  }

  const nxtpConfig: NxtpRouterConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    authUrl: process.env.NXTP_AUTH_URL || configJson.authUrl || configFile.authUrl || NATS_AUTH_URL,
    natsUrl: process.env.NXTP_NATS_URL || configJson.natsUrl || configFile.natsUrl || NATS_CLUSTER_URL,
    adminToken: process.env.NXTP_ADMIN_TOKEN || configJson.adminToken || configFile.adminToken,
    chainConfig: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chainConfig
      ? configJson.chainConfig
      : configFile.chainConfig,
    swapPools: process.env.NXTP_SWAP_POOLS || configJson.swapPools || configFile.swapPools,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
  };

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chainConfig).forEach(([chainId, chainConfig]) => {
    // allow passed in address to override
    // format: { [chainId]: { [chainName]: { "contracts": { "TransactionManager": { "address": "...." } } } }
    if (!chainConfig.transactionManagerAddress) {
      try {
        nxtpConfig.chainConfig[chainId].transactionManagerAddress = (
          Object.values((contractDeployments as any)[chainId])[0] as any
        ).contracts.TransactionManager.address;
      } catch (e) {}
    }
    if (!chainConfig.minGas) {
      nxtpConfig.chainConfig[chainId].minGas = MIN_GAS.toString();
    }
  });

  const validate = ajv.compile(NxtpRouterConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    console.error(`Invalid config: ${JSON.stringify(nxtpConfig, null, 2)}`);
    throw new Error(validate.errors?.map((err) => err.message).join(","));
  }

  console.log(JSON.stringify({ ...nxtpConfig, mnemonic: "********" }, null, 2));
  return nxtpConfig;
};

let nxtpConfig: NxtpRouterConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = (): NxtpRouterConfig => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig();
  }
  return nxtpConfig;
};
