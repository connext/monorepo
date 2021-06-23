import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers/lib/utils";

export type ChainServiceConfig = {
  /// GAS
  // % to bump gas by from gas station quote.
  gasInitialBumpPercent: number;
  // % to bump gas by when tx confirmation times out.
  gasReplacementBumpPercent: number;
  // Gas shouldn't ever exceed this amount.
  gasLimit: BigNumber;
  // Minimum gas price.
  gasPriceMinimum: BigNumber;
  // Hardcoded initial value for gas. This shouldn't be used normally - only temporarily
  // in the event that a gas station is malfunctioning.
  chainInitialGas: Map<number, BigNumber>;

  /// CONFIRMATIONS
  // The amount of time (ms) to wait before a confirmation polling period times out,
  // indicating we should resubmit tx with higher gas if the tx is not confirmed.
  confirmationTimeout: number;
  // The multiplier by which we extend our timeout period if a tx has at least 1 confirmation.
  confirmationTimeoutExtensionMultiplier: number;
  // Default number of confirmations we require for a tx.
  defaultConfirmationsRequired: number;
  // Number of confirmations needed for each chain, specified by chain Id.
  chainConfirmations: Map<number, number>;

  /// RPC PROVIDERS
  // RPC provider call max attempts - how many attempts / retries will we do upon failure?
  rpcProviderMaxRetries: number;
  // RPC urls by chain.
  chainProviderUrls: Map<number, string[]>;
};

export const DEFAULT_CONFIG: ChainServiceConfig = {
  gasInitialBumpPercent: 30,
  // From ethers docs:
  // Generally, the new gas price should be about 50% + 1 wei more, so if a gas price
  // of 10 gwei was used, the replacement should be 15.000000001 gwei.
  gasReplacementBumpPercent: 20,
  gasLimit: parseUnits("1500", "gwei"),
  gasPriceMinimum: parseUnits("5", "gwei"),
  chainInitialGas: new Map<number, BigNumber>(),

  confirmationTimeout: 45_000,
  confirmationTimeoutExtensionMultiplier: 4,
  defaultConfirmationsRequired: 10,
  chainConfirmations: new Map<number, number>(),

  rpcProviderMaxRetries: 5,
  chainProviderUrls: new Map<number, string[]>(),
} as ChainServiceConfig;
