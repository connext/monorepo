///NXTP Config Generator based on vector/modules/router/src/config.ts
import * as fs from "fs";

import { Type, Static } from "@sinclair/typebox";
import { utils } from "ethers";
import {
  ajv,
  ChainData,
  getChainData,
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
} from "@connext/nxtp-utils";
import { config as dotenvConfig } from "dotenv";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

const MIN_GAS = utils.parseEther("0.1");
const DEFAULT_RELAYER_FEE_THRESHOLD = "10"; // relayerFee is in respective chain native asset unit
const MIN_SUBGRAPH_SYNC_BUFFER = 25;
const DEFAULT_ALLOWED_TOLERANCE = 10; // in percent

dotenvConfig();

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.TransactionManager;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

/**
 * Returns the address of the `ConnextPriceOracle` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedPriceOracleContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.ConnextPriceOracle;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

/**
 * Returns the addresses where the price oracle contract is deployed to
 *
 */
export const getDeployedChainIdsForGasFee = (): number[] => {
  const chainIdsForGasFee: number[] = [];
  const chainIds = Object.keys(contractDeployments);
  chainIds.forEach((chainId) => {
    const record = (contractDeployments as any)[String(chainId)];
    const chainName = Object.keys(record)[0];
    if (chainName) {
      const priceOracleContract = record[chainName]?.contracts?.ConnextPriceOracle;
      if (priceOracleContract) {
        chainIdsForGasFee.push(Number(chainId));
      }
    }
  });
  return chainIdsForGasFee;
};

/**
 * Returns the address of the `Multicall` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedMulticallContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.Multicall;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  confirmations: Type.Number({ minimum: 1 }),
  defaultInitialGasPrice: Type.Optional(TIntegerString),
  subgraph: Type.Array(Type.String()),
  transactionManagerAddress: Type.String(),
  priceOracleAddress: Type.Optional(Type.String()),
  multicallAddress: Type.Optional(Type.String()),
  minGas: Type.String(),
  gasStations: Type.Array(Type.String()),
  allowRelay: Type.Boolean(),
  relayerFeeThreshold: Type.Number({ minimum: 0, maximum: 100 }),
  subgraphSyncBuffer: Type.Number(), // If subgraph is out of sync by this number, will not process actions
  routerContractRelayerAsset: Type.Optional(Type.String()),
});

export const TSwapPool = Type.Object({
  name: Type.Optional(Type.String()),
  assets: Type.Array(
    Type.Object({
      chainId: TChainId,
      assetId: TAddress,
    }),
  ),
  mainnetEquivalent: Type.Optional(TAddress),
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
  mnemonic: Type.Optional(Type.String()),
  routerContractAddress: Type.Optional(Type.String()), // address of deployed Router.sol contract
  web3SignerUrl: Type.Optional(Type.String()),
  swapPools: Type.Array(TSwapPool),
  port: Type.Number({ minimum: 1, maximum: 65535 }),
  host: Type.String({ format: "ipv4" }),
  requestLimit: Type.Number(),
  allowedTolerance: Type.Number({ minimum: 0, maximum: 100 }),
  allowRelay: Type.Boolean(),
  cleanUpMode: Type.Boolean(),
  priceCacheMode: Type.Boolean(),
  diagnosticMode: Type.Boolean(),
});

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (crossChainData: Map<string, any> | undefined): NxtpRouterConfig => {
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
    web3SignerUrl: process.env.NXTP_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    routerContractAddress:
      process.env.NXTP_ROUTER_CONTRACT_ADDRESS || configJson.routerContractAddress || configFile.routerContractAddress,
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
    requestLimit: process.env.NXTP_REQUEST_LIMIT || configJson.requestLimit || configFile.requestLimit || 500,
    cleanUpMode: process.env.NXTP_CLEAN_UP_MODE || configJson.cleanUpMode || configFile.cleanUpMode || false,
    priceCacheMode: process.env.NXTP_PRICE_CACHE_MODE || configJson.priceCacheMode || configFile.priceCacheMode || true,
    diagnosticMode: process.env.NXTP_DIAGNOSTIC_MODE || configJson.diagnosticMode || configFile.diagnosticMode || false,
    allowedTolerance:
      process.env.NXTP_ALLOWED_TOLERANCE ||
      configJson.allowedTolerance ||
      configFile.allowedTolerance ||
      DEFAULT_ALLOWED_TOLERANCE,
    allowRelay: process.env.NXTP_ALLOW_RELAY || configJson.allowRelay || configFile.allowRelay || false,
  };

  const overridechainRecommendedConfirmations =
    process.env.NXTP_OVERRIDE_CHAIN_RECOMMENDED_CONFIRMATIONS ||
    configJson.overridechainRecommendedConfirmations ||
    configFile.overridechainRecommendedConfirmations ||
    false;
  if (!crossChainData && crossChainData!.size == 0 && !overridechainRecommendedConfirmations) {
    throw new Error(
      "Router configuration failed: no chain data provided. (To override, see `overridechainRecommendedConfirmations` in config. Overriding this behavior is not recommended.)",
    );
  }

  if (!nxtpConfig.mnemonic && !nxtpConfig.web3SignerUrl) {
    throw new Error("Wallet missing, please add either mnemonic or web3SignerUrl");
  }

  const defaultConfirmations =
    crossChainData && crossChainData.has("1") ? parseInt(crossChainData.get("1").confirmations) + 3 : 4;

  // add contract deployments if they exist
  Object.entries(nxtpConfig.chainConfig).forEach(([chainId, chainConfig]) => {
    const chainRecommendedConfirmations =
      crossChainData && crossChainData.has(chainId)
        ? parseInt(crossChainData.get(chainId).confirmations)
        : defaultConfirmations;
    const chainRecommendedGasStations =
      crossChainData && crossChainData.has(chainId) ? crossChainData.get(chainId).gasStations ?? [] : [];

    // allow passed in address to override
    // format: { [chainId]: { [chainName]: { "contracts": { "TransactionManager": { "address": "...." } } } }
    if (!chainConfig.transactionManagerAddress) {
      const res = getDeployedTransactionManagerContract(parseInt(chainId));
      if (!res) {
        throw new Error(`No transactionManager address for chain ${chainId}`);
      }
      nxtpConfig.chainConfig[chainId].transactionManagerAddress = res.address;
    }

    // allow passed in address to override
    if (!chainConfig.priceOracleAddress) {
      const res = getDeployedPriceOracleContract(parseInt(chainId));
      nxtpConfig.chainConfig[chainId].priceOracleAddress = res?.address;
    }

    if (!chainConfig.multicallAddress) {
      const res = getDeployedMulticallContract(parseInt(chainId));
      nxtpConfig.chainConfig[chainId].multicallAddress = res?.address;
    }

    if (!chainConfig.minGas) {
      nxtpConfig.chainConfig[chainId].minGas = MIN_GAS.toString();
    }

    if (!chainConfig.relayerFeeThreshold) {
      nxtpConfig.chainConfig[chainId].relayerFeeThreshold = +DEFAULT_RELAYER_FEE_THRESHOLD;
    }

    if (chainConfig.allowRelay === undefined || chainConfig.allowRelay === null) {
      nxtpConfig.chainConfig[chainId].allowRelay = false;
    }

    if (!chainConfig.subgraph) {
      const defaultSubgraphUri = getDeployedSubgraphUri(Number(chainId), crossChainData);
      if (!defaultSubgraphUri) {
        throw new Error(`No subgraph for chain ${chainId}`);
      }
      nxtpConfig.chainConfig[chainId].subgraph = defaultSubgraphUri;
    } else if (typeof chainConfig.subgraph === "string") {
      // Backwards compatibility for subgraph param - support for singular uri string.
      chainConfig.subgraph = [chainConfig.subgraph];
    }

    if (!chainConfig.confirmations) {
      nxtpConfig.chainConfig[chainId].confirmations = chainRecommendedConfirmations;
    }

    const syncBuffer =
      !chainConfig.subgraphSyncBuffer || chainConfig.subgraphSyncBuffer <= 0
        ? (chainRecommendedConfirmations ?? 1) * 3
        : chainConfig.subgraphSyncBuffer;
    // 25 blocks minimum.
    nxtpConfig.chainConfig[chainId].subgraphSyncBuffer = Math.max(syncBuffer, MIN_SUBGRAPH_SYNC_BUFFER);

    const addedStations = nxtpConfig.chainConfig[chainId].gasStations ?? [];
    nxtpConfig.chainConfig[chainId].gasStations = addedStations.concat(chainRecommendedGasStations);

    // Validate that confirmations is above acceptable/recommended minimum.
    const confirmations = chainConfig.confirmations ?? chainRecommendedConfirmations;

    // don't validate test chains confirmations
    if (["1337", "1338"].includes(chainId)) {
      return;
    }

    if (confirmations < chainRecommendedConfirmations) {
      if (overridechainRecommendedConfirmations) {
        console.warn(
          `Overriding recommended confirmations required (${chainRecommendedConfirmations}) for chain ${chainId} with value ${confirmations}. Please note that this can cause issues with re-orgs and may result in a loss of funds. I hope you know what you're doing!`,
        );
      } else {
        throw new Error(
          `Value listed for required confirmations for chain ${chainId} is less than the recommended safe minimum. Minimum: ${chainRecommendedConfirmations}; Configured value: ${confirmations}.`,
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
