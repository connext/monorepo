import { Type, Static } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { parseUnits } from "ethers/lib/utils";

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

// TODO: Since moving to exposing the txservice config through the "all" entry in the chainConfig
// for router json configuration file, we should converge on a single config schema.
// For example, imagine gasLimitInflation being able to be applied to "all" (and overriden through
// specification per chain).

/// CHAIN CONFIG
export const ChainConfigSchema = Type.Object({
  // List of configurations for providers for this chain.
  providers: Type.Array(ProviderConfigSchema),

  // Hardcoded initial value for gas. This shouldn't be used normally - only temporarily
  // in the event that a gas station is malfunctioning.
  defaultInitialGas: Type.Optional(TIntegerString),
  // Gas station URL, if any, to retrieve current gas price from. If gas station is down or otherwise fails,
  // we'll use the RPC provider's gas as a backup.
  // Gas station should return a "rapid" gas price within the response.data.
  gasStations: Type.Optional(Type.Array(Type.String())),
  // An integer value by which we will inflate the gas LIMIT that is returned by the provider (flat increase).
  // Use this if your provider is returning low values and you're getting "out of gas" call exceptions.
  gasLimitInflation: Type.Optional(Type.Integer()),

  // The amount of time (ms) to wait before a confirmation polling period times out,
  // indicating we should resubmit tx with higher gas if the tx is not confirmed.
  confirmationTimeout: Type.Optional(Type.Integer()),
  // Number of confirmations needed for each chain, specified by chain Id.
  confirmations: Type.Optional(Type.Integer()),
});

export type ChainConfig = Static<typeof ChainConfigSchema>;
export const validateChainConfig = ajv.compile(ChainConfigSchema);

/// TX SERVICE CONFIG
const TransactionServiceConfigSchema = Type.Object({
  /// GAS
  // % to bump gas by from gas station quote.
  gasInitialBumpPercent: Type.Integer(),
  // % to bump gas by when tx confirmation times out.
  gasReplacementBumpPercent: Type.Integer(),
  // Gas shouldn't ever exceed this amount.
  gasMaximum: TIntegerString,
  // Minimum gas price.
  gasMinimum: TIntegerString,
  // Each time we submit a tx, this is the percentage scalar we use to set the maximum for the gas price we assign it.
  // The higher this number is, the more tolerant we are of gas price increases. The lower it is, the more we curb
  // increases in gas price from tx to tx.
  // NOTE: This value should ALWAYS be greater than 100, unless you want to disable it entirely (in which case, just set it to 0).
  gasPriceMaxIncreaseScalar: Type.Integer(),

  /// CONFIRMATIONS
  // Default number of confirmations we require for a tx.
  defaultConfirmationsRequired: Type.Integer(),
  // Default amount of time (ms) to wait before a confirmation polling period times out.
  defaultConfirmationTimeout: Type.Integer(),

  /// RPC PROVIDERS
  // How often (ms) we will check all RPC providers to measure how in-sync they are with the blockchain.
  // By default, every 5 mins (5 * 60_000).
  syncProvidersInterval: Type.Integer(),
  // Target maximum provider calls per second. Default is 4. Will NOT actually cap calls per second, but rather deprioritize
  // a provider if it reaches the maximum calls per second.
  maxProviderCPS: Type.Integer(),

  /// CHAINS
  // Configuration for each chain that this txservice will be supporting.
  chains: Type.Record(TIntegerString, ChainConfigSchema),

  /// DEBUGGING / DEVELOPMENT
  // WARNING: Please do not alter these configuration values; they should be used for development and/or debugging
  // purposes only, and can greatly affect performance.
  // Whether to log rpc calls.
  debug_logRpcCalls: Type.Boolean(),
});

export type TransactionServiceConfig = Static<typeof TransactionServiceConfigSchema>;
export const validateTransactionServiceConfig = ajv.compile(TransactionServiceConfigSchema);

// Set up the default configuration for TransactionServiceConfig.
export const DEFAULT_CONFIG: TransactionServiceConfig = {
  gasInitialBumpPercent: 30,
  // From ethers docs:
  // Generally, the new gas price should be about 50% + 1 wei more, so if a gas price
  // of 10 gwei was used, the replacement should be 15.000000001 gwei.
  gasReplacementBumpPercent: 20,
  gasMaximum: parseUnits("1500", "gwei").toString(),
  gasMinimum: parseUnits("5", "gwei").toString(),
  gasPriceMaxIncreaseScalar: 200,

  // NOTE: This should be the amount of time we are willing to wait for a transaction
  // to get 1 confirmation.
  defaultConfirmationTimeout: 90_000,
  defaultConfirmationsRequired: 10,

  syncProvidersInterval: 5 * 60_000,
  maxProviderCPS: 4,

  debug_logRpcCalls: false,
} as TransactionServiceConfig;
