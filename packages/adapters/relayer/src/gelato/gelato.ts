import {
  createLoggingContext,
  Logger,
  RequestContext,
  jsonifyError,
  NxtpError,
  RelayerTaskStatus,
  RelayerRequest,
  RelayResponse,
  RelayRequestOptions,
  GELATO_SERVER,
  GELATO_RELAYER_ADDRESS,
} from "@connext/nxtp-utils";
import axios from "axios";
import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";
import interval from "interval-promise";

import {
  RelayerSendFailed,
  TransactionHashTimeout,
  UnableToGetTaskStatus,
  UnableToGetTransactionHash,
} from "../errors";
import { ChainReader } from "../../../txservice/dist";

/// MARK - Gelato Relay API
/// Docs: https://relay.gelato.digital/api-docs/

export const isChainSupportedByGelato = async (chainId: number): Promise<boolean> => {
  const chainsSupportedByGelato = await getGelatoRelayChains();
  return chainsSupportedByGelato.includes(chainId.toString());
};

export const getGelatoRelayerAddress = async (_chainId: number, _logger?: Logger): Promise<string> => {
  return GELATO_RELAYER_ADDRESS;
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
 * Gets the task status for a given taskId from gelato api
 * @param taskId - The task Id we want to get the status for
 * @returns - RelayerTaskStatus
 */
export const getTaskStatus = async (taskId: string): Promise<RelayerTaskStatus> => {
  try {
    const apiEndpoint = `${GELATO_SERVER}/tasks/status/${taskId}`;
    const res = await axios.get(apiEndpoint);
    return res.data.task?.taskState ?? RelayerTaskStatus.NotFound;
  } catch (error: unknown) {
    throw new UnableToGetTaskStatus(taskId, { err: jsonifyError(error as Error) });
  }
};

export const waitForTaskCompletion = async (
  taskId: string,
  logger: Logger,
  _requestContext: RequestContext,
  _timeout = 600_000,
): Promise<RelayerTaskStatus> => {
  const { requestContext, methodContext } = createLoggingContext(waitForTaskCompletion.name, _requestContext);
  let taskStatus: RelayerTaskStatus | undefined;
  const startTime = Date.now();
  await new Promise((res) => {
    interval(async (_, stop) => {
      if (Date.now() - startTime > _timeout) {
        stop();
      }
      try {
        taskStatus = await getTaskStatus(taskId);
        logger.debug("Task status", requestContext, methodContext, { taskStatus, taskId });
        if (
          taskStatus === RelayerTaskStatus.ExecSuccess ||
          taskStatus === RelayerTaskStatus.ExecReverted ||
          taskStatus === RelayerTaskStatus.Cancelled ||
          taskStatus === RelayerTaskStatus.Blacklisted
        ) {
          stop();
          res(undefined);
        }
      } catch (error: unknown) {
        logger.error(
          "Error getting gelato task status, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(error as NxtpError),
        );
      }
    }, 5_000);
  });

  if (!taskStatus) {
    throw new TransactionHashTimeout(taskId);
  }
  return taskStatus;
};

/**
 * Gets the transactionHash for a given taskId from gelato api
 * @param taskId - The task Id we want to get the status for
 * @returns - transactionHash
 */
export const getTransactionHash = async (taskId: string): Promise<string> => {
  let result;
  try {
    const apiEndpoint = `${GELATO_SERVER}/tasks/status/${taskId}`;
    const res = await axios.get(apiEndpoint);
    result = res.data.data[0]?.transactionHash;
  } catch (error: unknown) {
    throw new UnableToGetTransactionHash(taskId, { err: jsonifyError(error as Error) });
  }

  return result;
};

export const gelatoSDKSend = async (
  request: RelayerRequest,
  sponsorApiKey: string,
  options: RelayRequestOptions = {},
): Promise<RelayResponse> => {
  let response;
  try {
    response = await GelatoRelaySDK.relayWithSponsoredCall(request, sponsorApiKey, options);
  } catch (error: unknown) {
    throw new RelayerSendFailed({
      error: jsonifyError(error as Error),
      options,
      request,
    });
  }
  return response;
};

const GAS_LIMIT_FOR_RELAYER = "2000000";

export const getRelayerAddress = async (chainId: number, logger: Logger): Promise<string> => {
  const relayerAddress = await getGelatoRelayerAddress(chainId, logger);
  return relayerAddress;
};

export const send = async (
  chainId: number,
  domain: string,
  destinationAddress: string,
  encodedData: string,
  gelatoApiKey: string,
  chainReader: ChainReader,
  logger: Logger,
  _requestContext?: RequestContext,
): Promise<string> => {
  const { requestContext, methodContext } = createLoggingContext(send.name, _requestContext);

  const isSupportedByGelato = await isChainSupportedByGelato(chainId);
  if (!isSupportedByGelato) {
    throw new Error("Chain not supported by gelato.");
  }

  // Validate the call will succeed on chain.
  const relayerAddress = await getRelayerAddress(chainId, logger);

  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId,
    to: destinationAddress,
    data: encodedData,
    from: relayerAddress,
  });

  const gas = await chainReader.getGasEstimateWithRevertCode(Number(domain), {
    chainId,
    to: destinationAddress,
    data: encodedData,
    from: relayerAddress,
  });

  logger.info("Sending tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    connext: destinationAddress,
    domain,
    gas: gas.toString(),
  });

  const request = {
    chainId: chainId,
    target: destinationAddress,
    data: encodedData,
  };

  logger.info("Sending to Gelato network", requestContext, methodContext, request);

  const response = await gelatoSDKSend(request, gelatoApiKey, { gasLimit: GAS_LIMIT_FOR_RELAYER });

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, response);
    return response.taskId;
  }
};
