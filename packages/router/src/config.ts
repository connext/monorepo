///NXTP Config Generator based on vector/modules/router/src/config.ts
import * as fs from "fs";

import { Type, Static } from "@sinclair/typebox";
import { utils } from "ethers";
import { ajv, ChainData, TAddress, TIntegerString } from "@connext/nxtp-utils";
import { config as dotenvConfig } from "dotenv";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

const DEFAULT_ALLOWED_TOLERANCE = 10; // in percent
const MIN_SUBGRAPH_MAX_LAG = 25;
const DEFAULT_SUBGRAPH_MAX_LAG = 40;

dotenvConfig();

/**
 * Helper to allow easy mocking
 */
export const getContractDeployments: any = () => {
  return contractDeployments;
};

/**
 * Returns the address of the `ConnextPriceOracle` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedPriceOracleContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = getContractDeployments()[chainId.toString()] ?? {};
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
  const contractDeployments = getContractDeployments();
  const chainIds = Object.keys(contractDeployments);
  chainIds.forEach((chainId) => {
    const record = contractDeployments[chainId.toString()];
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

export const TAssetDescription = Type.Object({
  name: Type.String(),
  id: TAddress,
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainConfig = Type.Object({
  assets: Type.Array(TAssetDescription), // Assets for which the router provides liquidity on this chain.
  subgraph: Type.Object({
    analytics: Type.Array(Type.String()), // Analytics subgraph uri(s).
    runtime: Type.Array(Type.String()), // Runtime subgraph uri(s).
    maxLag: Type.Integer({ minimum: MIN_SUBGRAPH_MAX_LAG }), // If subgraph is out of sync by this number, will not process actions.
  }),
  rpc: Type.Array(Type.String()),
  gasStations: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    priceOracle: TAddress,
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
  chains: Type.Record(TIntegerString, TChainConfig),
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

  const nxtpConfig: NxtpRouterConfig = {
    mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
    web3SignerUrl: process.env.NXTP_WEB3_SIGNER_URL || configJson.web3SignerUrl || configFile.web3SignerUrl,
    chains: process.env.NXTP_CHAIN_CONFIG
      ? JSON.parse(process.env.NXTP_CHAIN_CONFIG)
      : configJson.chains
      ? configJson.chains
      : configFile.chains,
    logLevel: process.env.NXTP_LOG_LEVEL || configJson.logLevel || configFile.logLevel || "info",
    network: process.env.NXTP_NETWORK || configJson.network || configFile.network || "mainnet",
    server: {
      port: process.env.NXTP_PORT || configJson.server.port || configFile.server.port || 8080,
      host: process.env.NXTP_HOST || configJson.server.host || configFile.server.host || "0.0.0.0",
      requestLimit:
        process.env.NXTP_REQUEST_LIMIT || configJson.server.requestLimit || configFile.server.requestLimit || 500,
      adminToken: process.env.NXTP_ADMIN_TOKEN || configJson.server.adminToken || configFile.server.adminToken,
    },
    mode: {
      cleanup: process.env.NXTP_CLEAN_UP_MODE || configJson.mode.cleanup || configFile.mode.cleanup || false,
      priceCaching:
        process.env.NXTP_PRICE_CACHE_MODE || configJson.mode.priceCaching || configFile.mode.priceCaching || true,
      diagnostic: process.env.NXTP_DIAGNOSTIC_MODE || configJson.mode.diagnostic || configFile.mode.diagnostic || false,
    },
    maxSlippage:
      process.env.NXTP_ALLOWED_TOLERANCE ||
      configJson.allowedTolerance ||
      configFile.allowedTolerance ||
      DEFAULT_ALLOWED_TOLERANCE,
  };

  if (!nxtpConfig.mnemonic && !nxtpConfig.web3SignerUrl) {
    throw new Error("Wallet missing, please add either mnemonic or web3SignerUrl");
  }

  const mainnetEntry = chainData.get("1") as ChainData;
  // Get the chains supported for this network type (i.e. mainnet or testnet).
  const supportedChains = Array.from(chainData.values()).filter(
    (data) => data.type === nxtpConfig.network || data.chainId === 1,
  );
  const supportedChainIds = supportedChains.map((data) => data.chainId.toString());
  // Make sure every chain in nxtpconfig is supported by chaindata.
  for (const chain of Object.keys(nxtpConfig.chains)) {
    if (!supportedChainIds.includes(chain)) {
      throw new Error(
        `Chain ${chain} passed into config is not supported by chaindata for ${nxtpConfig.network}!` +
          ` (Are you configured for the correct network?)` +
          ` Supported Chains: ${supportedChainIds.join(",")}`,
      );
    }
  }

  // TODO: Re-add check for minimum recommended confirmations.
  // Supplement chain config with chain data.
  for (const data of supportedChains) {
    const { chainId } = data;
    const config: ChainConfig | undefined = nxtpConfig.chains[chainId.toString()];
    const sanitizedAssets: AssetDescription[] = [];
    if (config && config.assets) {
      // Get mainnet equivalent if possible.
      for (const asset of config.assets) {
        let name = asset.name;
        const mainnetEquivalent: string | undefined =
          data.assetId[utils.getAddress(asset.id)]?.mainnetEquivalent ??
          data.assetId[asset.id.toLowerCase()]?.mainnetEquivalent ??
          data.assetId[asset.id.toUpperCase()]?.mainnetEquivalent;
        if (mainnetEquivalent) {
          // Get name from mainnet equivalent.
          name =
            mainnetEntry.assetId[utils.getAddress(mainnetEquivalent)]?.symbol ??
            mainnetEntry.assetId[mainnetEquivalent.toLowerCase()]?.symbol ??
            mainnetEntry.assetId[mainnetEquivalent.toUpperCase()]?.symbol;
        }
        if (!name) {
          throw new Error(
            `Could not find name for asset: ${JSON.stringify(
              asset,
            )} for chain ${chainId} in config. Please provide override.`,
          );
        }
        sanitizedAssets.push({
          ...asset,
          name,
          mainnetEquivalent,
        });
      }
    }
    nxtpConfig.chains[chainId.toString()] = {
      ...(config ?? {}),
      assets: sanitizedAssets,
      rpc: config && Array.isArray(config.rpc) ? config.rpc.concat(data.rpc) : data.rpc ?? [],
      subgraph: {
        ...(config?.subgraph ?? {}),
        runtime: (config?.subgraph?.runtime ?? []).concat(Array.isArray(data.subgraph) ? data.subgraph : []),
        analytics: config?.subgraph?.analytics ?? data.analyticsSubgraph,
        maxLag: config?.subgraph?.maxLag ?? DEFAULT_SUBGRAPH_MAX_LAG,
      },
      gasStations: config?.gasStations ?? data.gasStations,
      confirmations: config?.confirmations ?? data.confirmations,
      deployments: {
        priceOracle: config?.deployments?.priceOracle ?? getDeployedPriceOracleContract(chainId)?.address,
        transactionManager:
          config?.deployments?.transactionManager ?? getDeployedTransactionManagerContract(chainId)?.address,
      },
    };
  }

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
 * @returns The config
 */
export const getConfig = async (chainData: Map<string, ChainData>): Promise<NxtpRouterConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig(chainData);
  }
  return nxtpConfig;
};
