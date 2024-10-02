import { BigNumber } from "ethers";

import { axiosGet } from "../helpers";
import { Logger } from "../logging/logger";
import { jsonifyError } from "../types";

import { GelatoEstimatedFeeRequestError, GelatoConversionRateRequestError } from "./errors";

export const GELATO_SERVER = "https://api.gelato.digital";

// Testnet addresses (2/5)
// - On all networks except zkSync: 0xF9D64d54D32EE2BDceAAbFA60C4C438E224427d0
// - On zkSync: 0x0c1B63765Be752F07147ACb80a7817A8b74d9831
// So, for testnets you can already update the whitelist to these new addresses.

export const getGelatoRelayerAddress = (domain: string): string =>
  domain === "2053862260" || // zksync testnet
  domain === "2053862243" // zksync mainnet
    ? "0x0c1B63765Be752F07147ACb80a7817A8b74d9831"
    : "0xF9D64d54D32EE2BDceAAbFA60C4C438E224427d0"; // all other networks

/**
 * Get the fee estimate
 * @param _chainId - The Id of chain where the fee is to be estimated
 * @param paymentToken - The token address that the fee will be paid in
 * @param gasLimit - The gas limit of the transaction
 * @param isHighPriority - Whether the transaction is high priority
 * @param gasLimitL1 - (optional) The gas limit of the transaction on L1
 * @param logger - (optional) A Logger instance
 * @returns The estimated fee in the payment token denomination
 */
export const _getGelatoEstimatedFee = async (
  _chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean,
  gasLimitL1?: number,
  logger?: Logger,
): Promise<BigNumber> => {
  let result = BigNumber.from("0");
  const params = gasLimitL1
    ? { paymentToken, gasLimit, isHighPriority, gasLimitL1 }
    : { paymentToken, gasLimit, isHighPriority };
  const chainId = EquivalentChainsForTestnetEstimate[_chainId]
    ? _chainId
    : EquivalentChainsForGelato[_chainId] ?? _chainId;
  try {
    const res = await axiosGet(`${GELATO_SERVER}/oracles/${chainId}/estimate`, { params });
    result = BigNumber.from(res.data.estimatedFee);
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoEstimatedFee", undefined, undefined, jsonifyError(error as Error));
    throw new GelatoEstimatedFeeRequestError(chainId, { err: jsonifyError(error as Error) });
  }
  return result;
};

const EquivalentChainsForTestnetEstimate: Record<number, number> = {
  // TESTNETS
  5: 5, // goerli
  420: 420, //  optimism-goerli
  421613: 421613, // arbitrum-goerli
  80001: 80001,
  10200: 10200,
  195: 195, // x1 testnet
};

/// MARK - This is used for testnets and mainnets which aren't being supported by gelato
const EquivalentChainsForGelato: Record<number, number> = {
  // MAINNETS
  59144: 42161, // linea
  1088: 42161, // metis
  34443: 42161, // mode

  // LOCALNETS
  1337: 1, // local chain
  1338: 1, // local chain
  13337: 1, // local chain
  13338: 1, // local chain

  // TESTNETS
  4: 1, // rinkeby
  5: 1, // goerli
  420: 1, //  optimism-goerli
  421613: 1, // arbitrum-goerli
  80001: 137, // mumbai (polygon testnet)
  10200: 100, // chiado (gnosis testnet)
  97: 56, // chapel (bnb testnet)
  195: 1, // x1 testnet
  11155111: 1, // Sepolia
  11155420: 10, // Op-Sepolia
  421614: 42161, // Arb-Sepolia

  // LOCAL NETWORKS
  31337: 1,
  31338: 1,
  31339: 1,
  196: 1,
};

/**
 * Get the conversion rate from the native token to the requested token
 * @param _chainId - The Id of chain where the conversion rate is estimated
 * @param to - The token address in which the conversion rate is estimated from the native token of the selected chain.
 *    If a value is not provided, it will default to the USDC address on the selected chain
 * @param logger - The logger instance
 * @returns The conversion rate in number
 */
export const getConversionRate = async (_chainId: number, to?: string, logger?: Logger): Promise<number> => {
  let result = 0;
  const chainId = EquivalentChainsForGelato[_chainId] ?? _chainId;
  let apiEndpoint = `${GELATO_SERVER}/oracles/${chainId}/conversionRate`;
  if (to && chainId == _chainId) {
    apiEndpoint = apiEndpoint.concat(`?to=${to}`);
  }

  try {
    const res = await axiosGet(apiEndpoint, undefined, 5, 2000);
    result = res.data.conversionRate as number;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getConversionRate", undefined, undefined, jsonifyError(error as Error));
    throw new GelatoConversionRateRequestError(chainId, { err: jsonifyError(error as Error) });
  }
  return result;
};

/**
 * Get the fee estimate
 * @param _chainId - The Id of chain where the fee is to be estimated
 * @param paymentToken - The token address that the fee will be paid in
 * @param gasLimit - The gas limit of the transaction
 * @param isHighPriority - Whether the transaction is high priority
 * @param gasLimitL1 - (optional) The gas limit of the transaction on L1
 * @param logger - (optional) A Logger instance
 * @returns The estimated fee in the payment token denomination, defaults to 0 if there is an error with the API request
 */
export const getGelatoEstimatedFee = async (
  _chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean,
  gasLimitL1?: number,
  logger?: Logger,
): Promise<BigNumber> => {
  try {
    return await _getGelatoEstimatedFee(_chainId, paymentToken, gasLimit, isHighPriority, gasLimitL1, logger);
  } catch (error: unknown) {
    return BigNumber.from("0");
  }
};

/**
 * Get the conversion rate from the native token to the requested token
 * @param _chainId - The Id of chain where the conversion rate is estimated
 * @param to - The token address in which the conversion rate is estimated from the native token of the selected chain.
 *    If a value is not provided, it will default to the USDC address on the selected chain
 * @param logger - The logger instance
 * @returns The conversion rate in number, defaults to 0 if there is an error with the API request
 */
export const safeGetConversionRate = async (_chainId: number, to?: string, logger?: Logger) => {
  try {
    return await getConversionRate(_chainId, to, logger);
  } catch (error: unknown) {
    return 0;
  }
};

export const isOracleActive = async (chainId: number): Promise<boolean> => {
  const oracles = await getGelatoOracles();
  return oracles.includes(chainId.toString());
};

export const getGelatoOracles = async (logger?: Logger): Promise<string[]> => {
  let result = [];
  try {
    const res = await axiosGet(`${GELATO_SERVER}/oracles/`);
    result = res.data.oracles;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoOracles", undefined, undefined, jsonifyError(error as Error));
  }

  return result;
};
