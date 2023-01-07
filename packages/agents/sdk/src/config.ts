///NXTP Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { getChainData } from "./lib/helpers";

export const TAssetDescription = Type.Object({
  name: Type.String(),
  address: TAddress,
  symbol: Type.String(),
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  gasStations: Type.Optional(Type.Array(Type.String())),
  confirmations: Type.Optional(Type.Integer({ minimum: 1 })), // What we consider the "safe confirmations" number for this chain.
  chainId: Type.Optional(Type.Number()),
  deployments: Type.Optional(
    Type.Object({
      connext: TAddress,
      multisend: Type.Optional(TAddress),
      stableSwap: Type.Optional(TAddress),
    }),
  ),
  assets: Type.Optional(Type.Array(TAssetDescription)), /// Not Being Used
});

export type ChainConfig = Static<typeof TChainConfig>;

export const NxtpSdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  signerAddress: Type.Optional(TAddress),
  logLevel: Type.Optional(TLogLevel),
  cartographerUrl: Type.Optional(Type.String()),
  network: Type.Optional(Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")])),
  environment: Type.Optional(Type.Union([Type.Literal("staging"), Type.Literal("production")])),
});

export type NxtpSdkConfig = Static<typeof NxtpSdkConfigSchema>;

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

export const NxtpValidationSdkConfigSchema = Type.Object({
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
  _nxtpConfig: NxtpSdkConfig,
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): NxtpSdkConfig => {
  const nxtpConfig: NxtpSdkConfig = {
    ..._nxtpConfig,
    logLevel: _nxtpConfig.logLevel || "info",
    network: _nxtpConfig.network || "mainnet",
    environment: _nxtpConfig.environment || "production",
    cartographerUrl: _nxtpConfig.cartographerUrl
      ? _nxtpConfig.cartographerUrl
      : _nxtpConfig.network === "mainnet"
      ? "https://postgrest.mainnet.connext.ninja"
      : _nxtpConfig.environment === "production"
      ? "https://postgrest.testnet.connext.ninja"
      : "https://postgrest.testnet.staging.connext.ninja",
  };

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  const contractPostfix: ContractPostfix =
    nxtpConfig.environment === "production"
      ? ""
      : (`${nxtpConfig.environment![0].toUpperCase()}${nxtpConfig.environment!.slice(1)}` as ContractPostfix);
  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    nxtpConfig.chains[domainId].deployments = {
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
    };

    nxtpConfig.chains[domainId].confirmations = chainConfig.confirmations ?? chainRecommendedConfirmations;

    nxtpConfig.chains[domainId].gasStations = (nxtpConfig.chains[domainId].gasStations ?? []).concat(
      chainRecommendedGasStations,
    );
  });

  const validate = ajv.compile(NxtpValidationSdkConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

let nxtpConfig: NxtpSdkConfig | undefined;

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  _nxtpConfig: NxtpSdkConfig,
  deployments: ConnextContractDeployments,
  _chainData?: Map<string, ChainData>,
): Promise<NxtpSdkConfig> => {
  let chainData = _chainData;
  if (!chainData) {
    chainData = await getChainData();
  }
  nxtpConfig = getEnvConfig(_nxtpConfig, chainData, deployments);
  return nxtpConfig;
};

export const domainsToChainNames: Record<string, string> = {
  "6648936": "ethereum",
  "1869640809": "optimism",
  "1886350457": "polygon",
  "1634886255": "arbitrum",
  "6450786": "bsc",
  "6778479": "xdai",
};
