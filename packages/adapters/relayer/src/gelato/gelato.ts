import {
  createLoggingContext,
  Logger,
  RequestContext,
  jsonifyError,
  NxtpError,
  RelayerTaskStatus,
  RelayerSyncFeeRequest,
  RelayResponse,
  RelayRequestOptions,
  NATIVE_TOKEN,
} from "@connext/nxtp-utils";
import interval from "interval-promise";
import { BigNumber } from "ethers";

import {
  RelayerSendFailed,
  TransactionHashTimeout,
  UnableToGetGelatoSupportedChains,
  UnableToGetTaskStatus,
  UnableToGetTransactionHash,
} from "../errors";
import { ChainReader } from "../../../txservice";
import { gelatoRelayWithSyncFee, axiosGet, axiosPost, getEstimatedFee } from "../mockable";

import { url } from ".";

/// MARK - Gelato Relay API
/// Docs: https://relay.gelato.digital/api-docs/

const hardcodedAddresses: Record<number, string> = {
  421613: "0x8cFAcF1d7f052faA1aED6e793f0C451b5dEA8c1E",
};

export const isChainSupportedByGelato = async (chainId: number): Promise<boolean> => {
  let result = [];
  try {
    const res = await axiosGet(`${url}/relays/`);
    result = res.data.relays;
  } catch (error: unknown) {
    throw new UnableToGetGelatoSupportedChains(chainId, { err: jsonifyError(error as Error) });
  }

  return result.includes(chainId.toString());
};

export const getGelatoRelayChains = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axiosGet(`${url}/relays/`);
    result = res.data.relays;
  } catch (error: unknown) {
    throw new UnableToGetGelatoSupportedChains(0, { err: jsonifyError(error as Error) });
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
    // const apiEndpoint = `${url}/tasks/status/${taskId}`;
    const apiEndpoint = `${url}/tasks/${taskId}`; // old endpoint
    const res = await axiosGet(apiEndpoint);
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
  _pollInterval = 5_000,
): Promise<RelayerTaskStatus> => {
  const { requestContext, methodContext } = createLoggingContext(waitForTaskCompletion.name, _requestContext);
  let taskStatus: RelayerTaskStatus | undefined;
  const startTime = Date.now();
  await new Promise((res) => {
    interval(async (_, stop) => {
      if (Date.now() - startTime > _timeout) {
        stop();
        res(undefined);
      }
      try {
        taskStatus = await getTaskStatus(taskId);
        logger.debug("Task status from Gelato relayer", requestContext, methodContext, { taskStatus, taskId });
        const finalTaskStatuses = [
          RelayerTaskStatus.ExecSuccess,
          RelayerTaskStatus.ExecReverted,
          RelayerTaskStatus.Cancelled,
          RelayerTaskStatus.Blacklisted,
        ];

        if (finalTaskStatuses.includes(taskStatus)) {
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
    }, _pollInterval);
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
    const apiEndpoint = `${url}/tasks/status/${taskId}`;
    const res = await axiosGet(apiEndpoint);
    result = res.data.data[0]?.transactionHash;
  } catch (error: unknown) {
    throw new UnableToGetTransactionHash(taskId, { err: jsonifyError(error as Error) });
  }

  return result;
};

export const gelatoSDKSend = async (
  request: RelayerSyncFeeRequest,
  options: RelayRequestOptions = {},
): Promise<RelayResponse> => {
  let response;
  try {
    response = await gelatoRelayWithSyncFee(request, options);
  } catch (error: unknown) {
    throw new RelayerSendFailed({
      error: jsonifyError(error as Error),
      options,
      request,
    });
  }
  return response;
};

const GAS_LIMIT_FOR_RELAYER = "4000000";

export const gelatoV0Send = async (
  chainId: number,
  dest: string,
  data: string,
  relayerFee: string,
  logger: Logger,
  _requestContext: RequestContext,
): Promise<RelayResponse> => {
  const { requestContext, methodContext } = createLoggingContext(send.name, _requestContext);
  let response;
  const params = {
    dest,
    data,
    token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    relayerFee,
    gasLimit: GAS_LIMIT_FOR_RELAYER,
  };
  try {
    logger.info("Sending request to gelato relay", requestContext, methodContext, params);
    response = await axiosPost(`${url}/relays/${chainId}`, params);
  } catch (error: unknown) {
    throw new RelayerSendFailed({
      error: jsonifyError(error as Error),
    });
  }
  return response.data;
};

export const getRelayerAddress = async (chainId: number): Promise<string> => {
  try {
    const res = await axiosGet(`${url}/relays/${chainId}/address`);
    return res.data.address;
  } catch (error: unknown) {
    throw new UnableToGetGelatoSupportedChains(chainId, { err: jsonifyError(error as Error) });
  }
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
  let relayerAddress = hardcodedAddresses[chainId];
  if (!relayerAddress) {
    relayerAddress = await getRelayerAddress(chainId);
  }

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

  const gasLimit = gas.add(200_000); // Add extra overhead for gelato
  let fee = BigNumber.from(0);
  try {
    fee = await getEstimatedFee(chainId, NATIVE_TOKEN as string, gasLimit, true);
  } catch (e: unknown) {
    logger.warn("Error at Gelato Estimate Fee", requestContext, methodContext, {
      error: e as NxtpError,
      destinationAddress: destinationAddress,
      gasLimit: gasLimit.toString(),
      relayerFee: fee.toString(),
    });

    fee = gasLimit.mul(await chainReader.getGasPrice(+domain, requestContext));
  }

  const request: RelayerSyncFeeRequest = {
    chainId: chainId,
    target: destinationAddress,
    data: encodedData,
    isRelayContext: false,
    feeToken: NATIVE_TOKEN,
  };

  logger.info("Sending to Gelato network", requestContext, methodContext, request);

  // Future intented way to call
  //const response = await gelatoSDKSend(request, gelatoApiKey, { gasLimit: GAS_LIMIT_FOR_RELAYER });

  const response = await gelatoV0Send(chainId, destinationAddress, encodedData, fee.toString(), logger, requestContext);

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, response);
    return response.taskId;
  }
};
