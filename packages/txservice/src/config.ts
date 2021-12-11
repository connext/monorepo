import { Type, Static } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { parseUnits } from "ethers/lib/utils";

import { ConfigurationError } from "./shared";

const TIntegerString = Type.RegEx(/^([0-9])*$/);
const TUrl = Type.String({ format: "uri" });

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

/// PROVIDER CONFIG
export const ProviderConfigSchema = Type.Object({
  // URL string.
  url: TUrl,

  // Auth header params, if needed.
  user: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),

  /* From ethers:
   * The priority used for the provider. Lower-value priorities are favoured over higher-value priorities. If
   * multiple providers share the same priority, they are chosen at random.
   *
   * Defaults to 1.
   */
  priority: Type.Optional(Type.Number()),

  /* From ethers:
   * The weight a response from this provider provides. This can be used if a given Provider is more trusted, for example.
   *
   * Defaults to 1.
   */
  weight: Type.Optional(Type.Number()),

  /* From ethers:
   * The timeout (in ms) after which another Provider will be attempted. This does not affect the current Provider;
   * if it returns a result it is counted as part of the quorum.
   * Lower values will result in more network traffic, but may reduce the response time of requests.
   */
  stallTimeout: Type.Optional(Type.Number()),
});

export type ProviderConfig = Static<typeof ProviderConfigSchema>;
export const validateProviderConfig = ajv.compile(ProviderConfigSchema);

/// CHAIN CONFIG
const CoreChainConfigSchema = Type.Object({
  /// GAS STATIONS
  // Gas station URL, if any, to retrieve current gas price from. If gas station is down or otherwise fails,
  // we'll use the RPC provider's gas as a backup.
  // Gas station should return a "rapid" gas price within the response.data.
  gasStations: Type.Optional(Type.Array(Type.String())),

  /// GAS PRICE
  // % to bump gas by from provider or gas station initial quote.
  gasPriceInitialBoostPercent: Type.Integer(),
  // % to bump gas by when tx confirmation times out.
  gasPriceReplacementBumpPercent: Type.Integer(),
  // Gas shouldn't ever exceed this amount.
  gasPriceMaximum: TIntegerString,
  // Minimum gas price.
  gasPriceMinimum: TIntegerString,
  // Each time we submit a tx, this is the percentage scalar we use to set the maximum for the gas price we assign it.
  // The higher this number is, the more tolerant we are of gas price increases. The lower it is, the more we curb
  // increases in gas price from tx to tx.
  // NOTE: This value should ALWAYS be greater than 100, unless you want to disable it entirely (in which case, just set it to 0).
  gasPriceMaxIncreaseScalar: Type.Integer(),
  // Hardcoded initial value for gas. This shouldn't be used normally - only temporarily
  // in the event that a gas station is malfunctioning.
  hardcodedGasPrice: Type.Optional(TIntegerString),

  /// GAS LIMIT
  // An integer value by which we will inflate the gas LIMIT that is returned by the provider (flat increase).
  // Use this if your provider is returning low values and you're getting "out of gas" call exceptions.
  gasLimitInflation: Type.Optional(Type.Integer()),

  /// CONFIRMATIONS
  // The amount of time (ms) to wait before a confirmation polling period times out,
  // indicating we should resubmit tx with higher gas if the tx is not confirmed.
  confirmationTimeout: Type.Integer(),
  // Number of confirmations needed for each chain, specified by chain Id.
  confirmations: Type.Integer(),

  /// RPC PROVIDERS
  // Target maximum provider calls per second. Default is 4. Will NOT actually cap calls per second, but rather deprioritize
  // a provider if it reaches the maximum calls per second.
  maxProviderCPS: Type.Integer(),
  // How often (ms) we will check all RPC providers to measure how in-sync they are with the blockchain.
  // By default, every 5 mins (5 * 60_000).
  syncProvidersInterval: Type.Integer(),

  /// DEBUGGING / DEVELOPMENT
  // WARNING: Please do not alter these configuration values; they should be used for development and/or debugging
  // purposes only, and can greatly affect performance.
  // Whether to log rpc calls.
  debug_logRpcCalls: Type.Boolean(),
});

export type CoreChainConfig = Static<typeof CoreChainConfigSchema>;

const ChainConfigSchema = Type.Intersect([
  Type.Object({
    /// PROVIDERS
    // List of configurations for providers for this chain.
    providers: Type.Array(ProviderConfigSchema),
  }),
  CoreChainConfigSchema,
]);

export type ChainConfig = Static<typeof ChainConfigSchema>;

/// TX SERVICE CONFIG
// Configuration for each chain that this txservice will be supporting.
const TransactionServiceConfigSchema = Type.Record(TIntegerString, ChainConfigSchema);
export type TransactionServiceConfig = Static<typeof TransactionServiceConfigSchema>;

export const validateTransactionServiceConfig = (_config: any): TransactionServiceConfig => {
  // Get the default (aka "all") values to be used as defaults for all chain configs.
  const userDefaultChainConfig = _config["all"] ?? _config["default"] ?? {};
  const defaultChainConfig = {
    ...DEFAULT_CHAIN_CONFIG,
    ...userDefaultChainConfig,
  };
  // For each chain, validate the config and merge it with the main config.
  const config: { [chainId: string]: ChainConfig } = {};
  Object.entries(_config).forEach(([chainId, _chainConfig]) => {
    const chainConfig = _chainConfig as any;
    // Ignore non-number chainIds.
    if (isNaN(parseInt(chainId))) {
      return;
    }

    // Make sure percentages that must be > 100 are so (if they are specified).
    const PERCENTAGES_GT_100 = ["gasPriceMaxIncreaseScalar", "gasPriceReplacementBumpPercent"];
    for (const key of PERCENTAGES_GT_100) {
      if (chainConfig[key] !== undefined && chainConfig[key] <= 100) {
        throw new ConfigurationError([
          {
            parameter: "gasPriceMaxIncreaseScalar",
            error: "gasPriceMaxIncreaseScalar must be greater than 100.",
            value: chainConfig.gasPriceMaxIncreaseScalar,
          },
        ]);
      }
    }

    // Backwards compatibility with specifying only a single provider under the key "provider".
    const _providers: string | string[] | { url: string; user?: string; password?: string }[] =
      chainConfig.providers ?? chainConfig.provider;
    const providers = typeof _providers === "string" ? [{ url: _providers }] : _providers;

    // Remove unused from the mix (such as subgraphs, etc).
    // NOTE: We use CoreChainConfigSchema here because we will format them separately below.
    const sanitizedCoreConfig: any = {};
    Object.keys(CoreChainConfigSchema.properties).forEach((property) => {
      sanitizedCoreConfig[property] = chainConfig[property];
    });

    // Merge the default values with the specified chain config.
    config[chainId] = {
      ...defaultChainConfig,
      ...sanitizedCoreConfig,
      providers: providers.map((provider) =>
        typeof provider === "string"
          ? {
              url: provider,
            }
          : provider,
      ),
    } as ChainConfig;
  });
  ajv.compile(TransactionServiceConfigSchema)(config);
  return config;
};

// Set up the default configuration for CoreChainConfig.
export const DEFAULT_CHAIN_CONFIG: CoreChainConfig = {
  syncProvidersInterval: 5 * 60_000,
  maxProviderCPS: 4,
  gasPriceInitialBoostPercent: 30,
  gasStations: [],
  // From ethers docs:
  // Generally, the new gas price should be about 50% + 1 wei more, so if a gas price
  // of 10 gwei was used, the replacement should be 15.000000001 gwei.
  gasPriceReplacementBumpPercent: 20,
  gasPriceMaximum: parseUnits("1500", "gwei").toString(),
  gasPriceMinimum: parseUnits("5", "gwei").toString(),
  gasPriceMaxIncreaseScalar: 200,
  confirmations: 10,
  // NOTE: This should be the amount of time we are willing to wait for a transaction
  // to get 1 confirmation.
  confirmationTimeout: 90_000,
  debug_logRpcCalls: false,
};
