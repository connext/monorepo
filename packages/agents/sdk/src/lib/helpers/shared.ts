import {
  ajv,
  TUrl,
  jsonifyError,
  getChainData as _getChainData,
  getChainIdFromDomain as _getChainIdFromDomain,
} from "@connext/nxtp-utils";
import axios from "axios";
import { utils, BigNumber } from "ethers";

import { UriInvalid, ApiRequestFailed } from "../errors/index";

export const relayerBufferPercentage = 20; // 20% bump on total estimated relayer fee

export const getChainData = _getChainData;
export const getChainIdFromDomain = _getChainIdFromDomain;

export const validateUri = (uri: string): void => {
  const validateInput = ajv.compile(TUrl);
  const validInput = validateInput(uri);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new UriInvalid({
      paramsError: msg,
      uri,
    });
  }
};

export const axiosGetRequest = async (uri: string): Promise<any> => {
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (err: any) {
    throw new ApiRequestFailed({ error: jsonifyError(err as Error) });
  }
};

/**
 * Gets the token price from the external services
 * @param chainId - The chain identifier. i.e. mainnet -> 1, optimism -> 10
 * @param tokenAddress - The token address on the target chain
 * @returns - The token price with 18 decimals in usd. i.e. 1 ether = 1 usd
 */
export const getTokenPrice = async (chainId: number, tokenAddress: string): Promise<BigNumber> => {
  // TODO. Not implemented yet
  // It basically gets the token price from the external service like coingecko, coinmarketcap, price caching server, etc.
  // We MUST clean up this function once it gets confirmed.

  return utils.parseEther("1");
};
