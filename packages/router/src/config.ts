///NXTP Config Generator based on vector/modules/router/src/config.ts
import * as fs from "fs";

import { Type, Static } from "@sinclair/typebox";
import { utils } from "ethers";
import {
  ajv,
  ChainData,
  getDeployedSubgraphUri,
  isNode,
  NATS_AUTH_URL,
  NATS_AUTH_URL_LOCAL,
  NATS_AUTH_URL_TESTNET,
  NATS_CLUSTER_URL,
  NATS_CLUSTER_URL_LOCAL,
  NATS_CLUSTER_URL_TESTNET,
  NATS_WS_URL,
  NATS_WS_URL_LOCAL,
  NATS_WS_URL_TESTNET,
  TAddress,
  TChainId,
  TIntegerString,
  getDeployedTransactionManagerContract,
} from "@connext/nxtp-utils";
import { config as dotenvConfig } from "dotenv";
import { fetchJson } from "ethers/lib/utils";

const minimumFeePercentageAllowed = 0; // 0.00%
const maximumFeePercentageAllowed = 15; // 15.00%

const MIN_GAS = utils.parseEther("0.1");

dotenvConfig();

// Helper method to reorganize this list into a mapping by chain ID for quicker lookup.
export const chainDataToMap = (data: any): Map<string, ChainData> => {
  const chainData: Map<string, ChainData> = new Map();
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const chainId = item.chainId.toString();
    chainData.set(chainId, Object.fromEntries(Object.entries(item).filter((e) => e[0] !== "chainId")) as ChainData);
  }
  return chainData;
};

const getChainData = async (): Promise<Map<string, ChainData> | undefined> => {
  const url = "https://raw.githubusercontent.com/connext/chaindata/main/crossChain.json";
  try {
    const data = await fetchJson(url);
    return chainDataToMap(data);
  } catch (err) {
    console.error(`Error occurred retrieving chain data from ${url}`, err);
    // Check to see if we have the chain data cached locally.
    if (fs.existsSync("./chaindata.json")) {
      console.info("Using cached chain data.");
      const data = JSON.parse(fs.readFileSync("./chaindata.json", "utf-8"));
      return chainDataToMap(data);
    }
    // It could be dangerous to let the router start without the chain data, but there's an override in place just in case.
    console.warn("Could not fetch chain data, and no cached chain data was available.");
    return undefined;
  }
};

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  confirmations: Type.Number({ minimum: 1 }),
  subgraph: Type.String(),
  transactionManagerAddress: Type.String(),
  minGas: Type.String(),
  feePercentage: Type.Number({ minimum: minimumFeePercentageAllowed, maximum: maximumFeePercentageAllowed }),
  safeRelayerFee: Type.Number({ minimum: 0 }),
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

export const NxtpRouterConfigSchema = Type.Object({
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
  port: Type.Number({ minimum: 1, maximum: 65535 }),
  host: Type.String({ format: "ipv4" }),
});

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (chainData: Map<string, any> | undefined): NxtpRouterConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    let json: string;

    if (process.env.NXTP_CONFIG_FILE) {
      json = fs.readFileSync(process.env.NXTP_CONFIG_FILE, "utf-8");
    } else {
      json = fs.readFileSync("config.json", "utf-8");
    }
    if (json) {
      configFile = JSON.parse(json);
    }
  } catch (e) {}
  // return configFile;

  if (process.env.NXTP_CONFIG) {
    try {
      configJson = JSON.parse(process.env.NXTP_CONFIG || "");
    } catch (e) {
      console.warn("No NXTP_CONFIG exists...");
    }
  }

  const network: "testnet" | "mainnet" | "local" =
    process.env.NXTP_NETWORK || configJson.network || configFile.network || "mainnet";
  let authUrl = process.env.NXTP_AUTH_URL || configJson.authUrl || configFile.authUrl;
  let natsUrl = process.env.NXTP_NATS_URL || configJson.natsUrl || configFile.natsUrl;
  switch (network) {
    case "mainnet": {
      natsUrl = natsUrl ?? (isNode() ? NATS_CLUSTER_URL : NATS_WS_URL);
      authUrl = authUrl ?? NATS_AUTH_URL;
      break;
    }
    case "testnet": {
      natsUrl = natsUrl ?? (isNode() ? NATS_CLUSTER_URL_TESTNET : NATS_WS_URL_TESTNET);
      authUrl = authUrl ?? NATS_AUTH_URL_TESTNET;
      break;
    }
    case "local": {
      natsUrl = natsUrl ?? (isNode() ? NATS_CLUSTER_URL_LOCAL : NATS_WS_URL_LOCAL);
      authUrl = authUrl ?? NATS_AUTH_URL_LOCAL;
      break;
    }
  }

  const nxtpConfig: NxtpRouterConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    authUrl,
    natsUrl,
    adminToken: process.env.NXTP_ADMIN_TOKEN || configJson.adminToken || configFile.adminToken,
    chainConfig: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chainConfig
      ? configJson.chainConfig
      : configFile.chainConfig,
    swapPools: process.env.NXTP_SWAP_POOLS
      ? JSON.parse(process.env.NXTP_SWAP_POOLS)
      : configJson.swapPools
      ? configJson.swapPools
      : configFile.swapPools,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    port: process.env.NXTP_PORT || configJson.port || configFile.port || 8080,
    host: process.env.NXTP_HOST || configJson.host || configFile.host || "0.0.0.0",
  };

  const overrideRecommendedConfirmations = configFile.overrideRecommendedConfirmations;
  if (!chainData && chainData!.size == 0 && !overrideRecommendedConfirmations) {
    throw new Error(
      "Router configuration failed: no chain data provided. (To override, see `overrideRecommendedConfirmations` in config. Overriding this behavior is not recommended.)",
    );
  }
  const recommendedDefaultConfirmations = chainData ? parseInt(chainData.get("1")?.confirmations) + 3 : 1;
  // add contract deployments if they exist
  Object.entries(nxtpConfig.chainConfig).forEach(([chainId, chainConfig]) => {
    // allow passed in address to override
    // format: { [chainId]: { [chainName]: { "contracts": { "TransactionManager": { "address": "...." } } } }
    if (!chainConfig.transactionManagerAddress) {
      const res = getDeployedTransactionManagerContract(chainId);
      if (!res) {
        throw new Error(`No transactionManager address for chain ${chainId}`);
      }
      nxtpConfig.chainConfig[chainId].transactionManagerAddress = res.address;
    }
    if (!chainConfig.minGas) {
      nxtpConfig.chainConfig[chainId].minGas = MIN_GAS.toString();
    }
    if (!chainConfig.subgraph) {
      const subgraph = getDeployedSubgraphUri(Number(chainId));
      if (!subgraph) {
        throw new Error(`No transactionManager address for chain ${chainId}`);
      }
      nxtpConfig.chainConfig[chainId].subgraph = subgraph;
    }
    // Validate that confirmations is above acceptable/recommended minimum.
    const confirmations = chainConfig.confirmations;

    // don't validate test chains confirmations
    if (["1337", "1338"].includes(chainId)) {
      return;
    }

    const recommended = chainData?.get(chainId)?.confirmations ?? recommendedDefaultConfirmations;
    if (confirmations < recommended) {
      if (overrideRecommendedConfirmations) {
        console.warn(
          `Overriding recommended confirmations required (${recommended}) for chain ${chainId} with value ${confirmations}. Please note that this can cause issues with re-orgs and may result in a loss of funds. I hope you know what you're doing!`,
        );
      } else {
        throw new Error(
          `Value listed for required confirmations for chain ${chainId} is less than the recommended safe minimum. Minimum: ${recommended}; Configured value: ${confirmations}.`,
        );
      }
    }
  });

  const validate = ajv.compile(NxtpRouterConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: any) => err.message).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: NxtpRouterConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @param chainDataOverride - overrides the set chain data; used for debugging, unit tests, etc.
 *
 * @returns The config
 */
export const getConfig = async (chainDataOverride?: Map<string, ChainData>): Promise<NxtpRouterConfig> => {
  if (!nxtpConfig) {
    const chainData = chainDataOverride ?? (await getChainData());
    nxtpConfig = getEnvConfig(chainData);
  }
  return nxtpConfig;
};
