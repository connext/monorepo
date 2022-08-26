import axios from "axios";
import { BigNumber, constants } from "ethers";

import { Logger } from "../logging";
import {
  jsonifyError,
  GelatoApiTaskRequestParams,
  RelayerApiPostTaskRequestParams,
  NxtpError,
  RelayerApiPostTaskResponse,
  RelayerTaskStatus,
} from "../types";

/// MARK - Gelato Relay API
/// Docs: https://relay.gelato.digital/api-docs/

const GELATO_SERVER = "https://relay.gelato.digital";

/// MARK - This is used for testnets which aren't being supported by gelato
const EquivalentChainsForGelato: Record<number, number> = {
  4: 1,
  5: 1,
  1337: 1,
  1338: 1,
  420: 1,
};

export const gelatoSend = async (
  chainId: number,
  params: GelatoApiTaskRequestParams,
  logger?: Logger,
): Promise<any> => {
  let output;
  try {
    const res = await axios.post(`${GELATO_SERVER}/relays/${chainId}`, params);
    output = res.data;
  } catch (error: unknown) {
    if (logger)
      logger.error("Error sending request to Gelato Relay", undefined, undefined, jsonifyError(error as Error));
    throw new NxtpError("Error sending request to Gelato Relay", { error: jsonifyError(error as Error) });
  }
  return output;
};

export const isChainSupportedByGelato = async (chainId: number): Promise<boolean> => {
  const chainsSupportedByGelato = await getGelatoRelayChains();
  return chainsSupportedByGelato.includes(chainId.toString());
};

export const getGelatoRelayerAddress = async (chainId: number, logger?: Logger): Promise<string> => {
  let result = constants.AddressZero;
  try {
    const res = await axios.get(`${GELATO_SERVER}/relays/${chainId}/address`);
    result = res.data.address;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoRelayerAddress", undefined, undefined, jsonifyError(error as Error));
    throw new Error("Error in getGelatoRelayerAddress");
  }

  return result;
};

export const getGelatoRelayChains = async (logger?: Logger): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${GELATO_SERVER}/relays/`);
    result = res.data.relays;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoRelayChains", undefined, undefined, jsonifyError(error as Error));
  }

  return result;
};

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
    const res = await axios.get(`${GELATO_SERVER}/oracles/${chainId}/estimate`, { params });
    result = BigNumber.from(res.data.estimatedFee);
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoEstimatedFee", undefined, undefined, jsonifyError(error as Error));
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
    const res = await axios.get(`${GELATO_SERVER}/oracles/`);
    result = res.data.oracles;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getGelatoOracles", undefined, undefined, jsonifyError(error as Error));
  }

  return result;
};

export const isPaymentTokenSupported = async (chainId: number, token: string): Promise<boolean> => {
  const paymentTokens = await getPaymentTokens(chainId);
  const lowerPaymentTokens = paymentTokens.map((address) => {
    return address.toLowerCase();
  });
  return lowerPaymentTokens.includes(token.toString().toLowerCase());
};

export const getPaymentTokens = async (chainId: number, logger?: Logger): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${GELATO_SERVER}/oracles/${chainId}/paymentTokens/`);
    result = res.data.paymentTokens;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getPaymentTokens", undefined, undefined, jsonifyError(error as Error));
  }

  return result;
};

/**
 * Get the conversion rate from the native token to the requested token
 * @param chainId - The Id of chain where the conversion rate is estimated
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

    const res = await axios.get(apiEndpoint);
    result = res.data.conversionRate as number;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getConversionRate", undefined, undefined, jsonifyError(error as Error));
  }
  return result;
};

/**
 * Gets the task status for a given taskId from gelato api
 * @param taskId - The task Id we want to get the status for
 * @param logger - Logger Instance
 * @returns - RelayerTaskStatus
 */
export const getTaskStatusFromGelato = async (taskId: string, logger?: Logger): Promise<RelayerTaskStatus> => {
  let result = RelayerTaskStatus.NotFound;
  try {
    const apiEndpoint = `${GELATO_SERVER}/tasks/${taskId}`;
    const res = await axios.get(apiEndpoint);
    result = res.data.data[0]?.taskState;
  } catch (error: unknown) {
    if (logger) logger.error("Error in getTaskStatusFromGelato", undefined, undefined, jsonifyError(error as Error));
    else console.log("Error in gelatoTaskStatus, error: ", error);
  }

  return result;
};

export const connextRelayerSend = async (
  url: string,
  chainId: number,
  params: RelayerApiPostTaskRequestParams,
): Promise<RelayerApiPostTaskResponse> => {
  let output;
  try {
    const res = await axios.post(`${url}/relays/${chainId}`, params);
    output = res.data as RelayerApiPostTaskResponse;
  } catch (error: unknown) {
    throw new NxtpError("Error sending request to Connext Relayer", { error: jsonifyError(error as Error) });
  }
  return output;
};

/**
 * Gets the task status from the backup relayer
 * @param url - The base url
 * @param taskId - The task id you wanna get the status for
 * @param logger - Logger Instance
 * @returns - RelayerTaskStatus
 */
export const getTaskStatusFromBackupRelayer = async (
  url: string,
  taskId: string,
  logger?: Logger,
): Promise<RelayerTaskStatus> => {
  let result = RelayerTaskStatus.NotFound;
  try {
    const apiEndpoint = `${url}/tasks/${taskId}`;
    const res = await axios.get(apiEndpoint);
    result = res.data[0]?.taskState as RelayerTaskStatus;
  } catch (error: unknown) {
    if (logger)
      logger.error("Error in getTaskStatusFromBackupRelayer", undefined, undefined, jsonifyError(error as Error));
    else console.log("Error in getTaskStatusFromBackupRelayer, error: ", error);
  }

  return result;
};
