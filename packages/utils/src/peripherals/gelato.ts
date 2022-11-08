import { BigNumber } from "ethers";

import { axiosGet } from "../helpers";
import { Logger } from "../logging/logger";
import { jsonifyError } from "../types";

export const GELATO_SERVER = "https://relay.gelato.digital";

export const GELATO_RELAYER_ADDRESS = "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92";

export const getGelatoEstimatedFee = async (
  _chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean,
  logger?: Logger,
): Promise<BigNumber> => {
  let result = BigNumber.from("0");
  const params = { paymentToken, gasLimit, isHighPriority };
  const chainId = EquivalentChainsForGelato[_chainId] ?? _chainId;
  try {
    const res = await axiosGet(`${GELATO_SERVER}/oracles/${chainId}/estimate`, { params });
    result = BigNumber.from(res.data.estimatedFee);
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoEstimatedFee", undefined, undefined, jsonifyError(error as Error));
  }
  return result;
};

/// MARK - This is used for testnets which aren't being supported by gelato
const EquivalentChainsForGelato: Record<number, number> = {
  4: 1,
  5: 1,
  1337: 1,
  1338: 1,
  420: 1,
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
  try {
    let apiEndpoint = `${GELATO_SERVER}/oracles/${chainId}/conversionRate`;
    if (to) {
      apiEndpoint = apiEndpoint.concat(`/to=${to}`);
    }

    const res = await axiosGet(apiEndpoint);
    result = res.data.conversionRate as number;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getConversionRate", undefined, undefined, jsonifyError(error as Error));
  }
  return result;
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
