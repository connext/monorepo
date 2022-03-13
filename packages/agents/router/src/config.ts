///NXTP Config Generator based on vector/modules/router/src/config.ts
import * as fs from "fs";

import { Type, Static } from "@sinclair/typebox";
import { config as dotenvConfig } from "dotenv";
import { ajv, ChainData, TAddress } from "@connext/nxtp-utils";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { SubgraphReaderChainConfigSchema } from "@connext/nxtp-adapters-subgraph";

const DEFAULT_ALLOWED_TOLERANCE = 10; // in percent
const MIN_SUBGRAPH_SYNC_BUFFER = 25;

dotenvConfig();

/**
 * Helper to allow easy mocking
 */
export const getContractDeployments: any = () => {
  return contractDeployments;
};

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = getContractDeployments()[chainId.toString()] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.TransactionManager;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

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
    transactionManager: TAddress,
  }),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const TServerConfig = Type.Object({
  port: Type.Integer({ minimum: 1, maximum: 65535 }),
  host: Type.String({ format: "ipv4" }),
  requestLimit: Type.Integer(),
  adminToken: Type.String(),
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
  redisUrl: Type.Optional(Type.String({ format: "uri" })),
  sequencerUrl: Type.String({ format: "uri" }),
  server: TServerConfig,
  maxSlippage: Type.Number({ minimum: 0, maximum: 100 }),
  mode: TModeConfig,
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
});

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (chainData: Map<string, ChainData>): NxtpRouterConfig => {
  let configJson: Record<string, any> = {};
  let configFile: any = {};

  try {
    configJson = JSON.parse(process.env.NXTP_CONFIG || "");
  } catch (e) {
    console.info("No NXTP_CONFIG exists, using config file and individual env vars");
  }
  try {
    let json: string;

    const path = process.env.NXTP_CONFIG_FILE ?? "config.json";
    if (fs.existsSync(path)) {
      json = fs.readFileSync(path, { encoding: "utf-8" });
      configFile = JSON.parse(json);
    }
  } catch (e) {
    console.error("Error reading config file!");
    process.exit(1);
  }
  // return configFile;

  const nxtpConfig: NxtpRouterConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.NXTP_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    redisUrl: process.env.NXTP_REDIS_URL || configJson.redisUrl || configFile.redisUrl,
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
  };

  if (!nxtpConfig.mnemonic && !nxtpConfig.web3SignerUrl) {
    throw new Error("Wallet missing, please add either mnemonic or web3SignerUrl");
  }

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // allow passed in address to override
    // format: { [chainId]: { [chainName]: { "contracts": { "TransactionManager": { "address": "...." } } } }
    if (!chainConfig.deployments?.transactionManager) {
      const res = chainDataForChain ? getDeployedTransactionManagerContract(chainDataForChain.chainId) : undefined;
      if (!res) {
        throw new Error(`No transactionManager address for domain ${domainId}`);
      }
      nxtpConfig.chains[domainId].deployments.transactionManager = res.address;
    }

    if (!chainConfig.subgraph.runtime) {
      nxtpConfig.chains[domainId].subgraph.runtime = chainDataForChain?.subgraph ?? [];
    }

    if (!chainConfig.subgraph.analytics) {
      nxtpConfig.chains[domainId].subgraph.runtime = chainDataForChain?.analyticsSubgraph ?? [];
    }

    if (!chainConfig.confirmations) {
      nxtpConfig.chains[domainId].confirmations = chainRecommendedConfirmations;
    }

    const maxLag = chainConfig.subgraph.maxLag ?? MIN_SUBGRAPH_SYNC_BUFFER;
    // 25 blocks minimum.
    nxtpConfig.chains[domainId].subgraph.maxLag = maxLag < MIN_SUBGRAPH_SYNC_BUFFER ? MIN_SUBGRAPH_SYNC_BUFFER : maxLag;

    const addedStations = nxtpConfig.chains[domainId].gasStations ?? [];
    nxtpConfig.chains[domainId].gasStations = addedStations.concat(chainRecommendedGasStations);
  });

  const validate = ajv.compile(NxtpRouterConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: any) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: NxtpRouterConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (chainData: Map<string, ChainData>): Promise<NxtpRouterConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig(chainData);
  }
  return nxtpConfig;
};
