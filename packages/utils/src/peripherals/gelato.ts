import { BigNumber } from "ethers";
import interval from "interval-promise";

import { axiosGet } from "../helpers";
import { Logger } from "../logging/logger";
import { jsonifyError } from "../types";

import { GelatoEstimatedFeeRequestError, GelatoConversionRateRequestError } from "./errors";

export const GELATO_SERVER = "https://api.gelato.digital";

export const GELATO_RELAYER_ADDRESS = "0x75bA5Af8EFFDCFca32E1e288806d54277D1fde99";

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
};

/// MARK - This is used for testnets and mainnets which aren't being supported by gelato
const EquivalentChainsForGelato: Record<number, number> = {
  // MAINNETS
  59140: 42161, // linea

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

  let totalRetries = 5;
  const retryInterval = 2_000;
  await new Promise((res) => {
    interval(async (_, stop) => {
      if (totalRetries === 0) {
        stop();
        res(undefined);
      }

      try {
        totalRetries--;
        const axiosRes = await axiosGet(apiEndpoint);
        result = axiosRes.data.conversionRate as number;
        if (result > 0) {
          stop();
          res(undefined);
        }
      } catch (error: unknown) {
        if (logger)
          logger.error(
            `Error in getConversionRate. Retrying in ${retryInterval} ms`,
            undefined,
            undefined,
            jsonifyError(error as Error),
          );
      }
    }, retryInterval);
  });
  try {
    const res = await axiosGet(apiEndpoint);
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
