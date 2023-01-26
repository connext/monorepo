/// Connext Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/txservice";

import { getChainData } from "./lib/helpers";

export const TAssetDescription = Type.Object({
  name: Type.String(),
  address: TAddress,
  symbol: Type.String(),
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainDeployments = Type.Object({
  connext: TAddress,
  multisend: Type.Optional(TAddress),
  unwrapper: Type.Optional(TAddress),
  stableSwap: Type.Optional(TAddress),
});

export type ChainDeployments = Static<typeof TChainDeployments>;

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  gasStations: Type.Optional(Type.Array(Type.String())),
  confirmations: Type.Optional(Type.Integer({ minimum: 1 })), // What we consider the "safe confirmations" number for this chain.
  chainId: Type.Optional(Type.Number()),
  deployments: Type.Optional(TChainDeployments),
  assets: Type.Optional(Type.Array(TAssetDescription)), /// Not Being Used
});

export type ChainConfig = Static<typeof TChainConfig>;

export const SdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  signerAddress: Type.Optional(TAddress),
  logLevel: Type.Optional(TLogLevel),
  cartographerUrl: Type.Optional(Type.String()),
  network: Type.Optional(Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")])),
  environment: Type.Optional(Type.Union([Type.Literal("staging"), Type.Literal("production")])),
});

export type SdkConfig = Static<typeof SdkConfigSchema>;

export const TValidationChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  gasStations: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    connext: TAddress,
    multisend: Type.Optional(TAddress),
    stableSwap: Type.Optional(TAddress),
  }),
  assets: Type.Optional(Type.Array(TAssetDescription)), /// Not Being Used
});

export const ValidationSdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TValidationChainConfig),
  signerAddress: Type.Optional(TAddress),
  logLevel: TLogLevel,
  cartographerUrl: Type.String(),
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
});

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (
  _connextConfig: SdkConfig,
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): SdkConfig => {
  const connextConfig: SdkConfig = {
    ..._connextConfig,
    logLevel: _connextConfig.logLevel || "info",
    network: _connextConfig.network || "mainnet",
    environment: _connextConfig.environment || "production",
    cartographerUrl: _connextConfig.cartographerUrl
      ? _connextConfig.cartographerUrl
      : _connextConfig.network === "testnet"
      ? _connextConfig.environment === "staging"
        ? "https://postgrest.testnet.connext.ninja"
        : "https://postgrest.testnet.staging.connext.ninja"
      : "https://postgrest.mainnet.connext.ninja",
  };

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  const contractPostfix: ContractPostfix =
    connextConfig.environment === "production"
      ? ""
      : (`${connextConfig.environment![0].toUpperCase()}${connextConfig.environment!.slice(1)}` as ContractPostfix);
  // add contract deployments if they exist
  Object.entries(connextConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    connextConfig.chains[domainId].deployments = {
      connext:
        chainConfig.deployments?.connext ??
        (() => {
          if (chainDataForChain) {
            const res = deployments.connext(chainDataForChain.chainId, contractPostfix);
            if (res) {
              return res.address;
            }
          }
          throw new Error(`No Connext contract address for domain ${domainId}`);
        })(),
      multisend:
        chainConfig.deployments?.multisend ??
        (() => {
          if (chainDataForChain) {
            const res = deployments.multisend(chainDataForChain.chainId);
            return res?.address;
          }
          return undefined;
        })(),
      unwrapper:
        chainConfig.deployments?.unwrapper ??
        (() => {
          if (chainDataForChain) {
            const res = deployments.unwrapper(chainDataForChain.chainId);
            return res?.address;
          }
          return undefined;
        })(),
    };

    connextConfig.chains[domainId].confirmations = chainConfig.confirmations ?? chainRecommendedConfirmations;

    connextConfig.chains[domainId].gasStations = (connextConfig.chains[domainId].gasStations ?? []).concat(
      chainRecommendedGasStations,
    );
  });

  const validate = ajv.compile(ValidationSdkConfigSchema);

  const valid = validate(connextConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return connextConfig;
};

let connextConfig: SdkConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  _connextConfig: SdkConfig,
  deployments: ConnextContractDeployments,
  _chainData?: Map<string, ChainData>,
): Promise<SdkConfig> => {
  let chainData = _chainData;
  if (!chainData) {
    chainData = await getChainData();
  }
  connextConfig = getEnvConfig(_connextConfig, chainData, deployments);
  return connextConfig;
};

export const domainsToChainNames: Record<string, string> = {
  "6648936": "ethereum",
  "1869640809": "optimism",
  "1886350457": "polygon",
  "1634886255": "arbitrum",
  "6450786": "bsc",
  "6778479": "xdai",
};
