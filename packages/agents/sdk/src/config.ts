///NXTP Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/nxtp-utils";
import { ConnextContractDeployments } from "@connext/nxtp-txservice";

const DEFAULT_ALLOWED_TOLERANCE = 10; // in percent

export const TAssetDescription = Type.Object({
  name: Type.String(),
  address: TAddress,
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainConfig = Type.Object({
  assets: Type.Array(TAssetDescription), // Assets for which the router provides liquidity on this chain.
  providers: Type.Array(Type.String()),
  gasStations: Type.Optional(Type.Array(Type.String())),
  confirmations: Type.Optional(Type.Integer({ minimum: 1 })), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Optional(
    Type.Object({
      connext: TAddress,
    }),
  ),
});

export type ChainConfig = Static<typeof TChainConfig>;

export const NxtpSdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  signerAddress: TAddress,
  logLevel: Type.Optional(TLogLevel),
  maxSlippage: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
  network: Type.Optional(Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")])),
});

export type NxtpSdkConfig = Static<typeof NxtpSdkConfigSchema>;

export const TValidationChainConfig = Type.Object({
  assets: Type.Array(TAssetDescription), // Assets for which the router provides liquidity on this chain
  providers: Type.Array(Type.String()),
  gasStations: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    connext: TAddress,
  }),
});

export const NxtpValidationSdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TValidationChainConfig),
  logLevel: TLogLevel,
  signerAddress: TAddress,
  maxSlippage: Type.Number({ minimum: 0, maximum: 100 }),
  network: Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local")]),
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
    maxSlippage: _nxtpConfig.maxSlippage || DEFAULT_ALLOWED_TOLERANCE,
  };

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

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
          const res = chainDataForChain ? deployments.connext(chainDataForChain.chainId) : undefined;
          if (!res) {
            throw new Error(`No Connext contract address for domain ${domainId}`);
          }
          return res.address;
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
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): Promise<NxtpSdkConfig> => {
  if (!nxtpConfig) {
    nxtpConfig = getEnvConfig(_nxtpConfig, chainData, deployments);
  }
  return nxtpConfig;
};
