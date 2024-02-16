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
  RelayerRequest,
  getGelatoRelayerAddress,
  chainIdToDomain,
} from "@connext/nxtp-utils";
import interval from "interval-promise";

import {
  RelayerSendFailed,
  TransactionHashTimeout,
  UnableToGetGelatoSupportedChains,
  UnableToGetTaskStatus,
  UnableToGetTransactionHash,
} from "../errors";
import { ChainReader } from "../../../txservice";

import { gelatoRelay } from ".";

/// MARK - Gelato Relay API
/// Docs: https://relay.gelato.digital/api-docs/
const GAS_LIMIT_FOR_RELAYER = (chainId: number): string | undefined => {
  switch (chainId) {
    case 42161: {
      return "100000000";
    }
    case 421613: {
      return "50000000";
    }
    default: {
      return "6000000";
    }
  }
};

export const isChainSupportedByGelato = async (chainId: number): Promise<boolean> => {
  try {
    const result = await gelatoRelay.isNetworkSupported(chainId);
    return result;
  } catch (error: unknown) {
    throw new UnableToGetGelatoSupportedChains(chainId, { err: jsonifyError(error as Error) });
  }
};

export const getGelatoRelayChains = async (): Promise<string[]> => {
  try {
    const result = await gelatoRelay.getSupportedNetworks();
    return result;
  } catch (error: unknown) {
    throw new UnableToGetGelatoSupportedChains(0, { err: jsonifyError(error as Error) });
  }
};

enum TaskState {
  CheckPending = "CheckPending",
  ExecPending = "ExecPending",
  ExecSuccess = "ExecSuccess",
  ExecReverted = "ExecReverted",
  WaitingForConfirmation = "WaitingForConfirmation",
  Blacklisted = "Blacklisted",
  Cancelled = "Cancelled",
  NotFound = "NotFound",
}

/**
 * Gets the task status for a given taskId from gelato api
 * @param taskId - The task Id we want to get the status for
 * @returns - RelayerTaskStatus
 */
export const getTaskStatus = async (taskId: string): Promise<RelayerTaskStatus> => {
  try {
    const result = await gelatoRelay.getTaskStatus(taskId);
    switch (result?.taskState) {
      case TaskState.CheckPending: {
        return RelayerTaskStatus.CheckPending;
      }
      case TaskState.ExecPending: {
        return RelayerTaskStatus.ExecPending;
      }
      case TaskState.ExecSuccess: {
        return RelayerTaskStatus.ExecSuccess;
      }
      case TaskState.ExecReverted: {
        return RelayerTaskStatus.ExecReverted;
      }
      case TaskState.WaitingForConfirmation: {
        return RelayerTaskStatus.WaitingForConfirmation;
      }
      case TaskState.Blacklisted: {
        return RelayerTaskStatus.Blacklisted;
      }
      case TaskState.Cancelled: {
        return RelayerTaskStatus.Cancelled;
      }
      case TaskState.NotFound: {
        return RelayerTaskStatus.NotFound;
      }
      default: {
        return RelayerTaskStatus.NotFound;
      }
    }
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
export const getTransactionHash = async (taskId: string): Promise<string | undefined> => {
  try {
    const res = await gelatoRelay.getTaskStatus(taskId);
    return res?.transactionHash;
  } catch (error: unknown) {
    throw new UnableToGetTransactionHash(taskId, { err: jsonifyError(error as Error) });
  }
};

export const gelatoSDKSend = async (
  request: RelayerRequest,
  sponsorApiKey: string,
  options: RelayRequestOptions = {},
): Promise<RelayResponse> => {
  try {
    const response = await gelatoRelay.sponsoredCall(request, sponsorApiKey, options);
    return response;
  } catch (error: unknown) {
    throw new RelayerSendFailed({
      error: jsonifyError(error as Error),
      options,
      request,
    });
  }
};

export const getRelayerAddress = async (_chainId: number): Promise<string> => {
  return Promise.resolve(getGelatoRelayerAddress(chainIdToDomain(_chainId).toString()));
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

  // Validate the call will succeed on chain.
  const relayerAddress = await getRelayerAddress(chainId);

  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId,
    to: destinationAddress,
    data: encodedData,
    from: relayerAddress,
  });

  const gas = await chainReader.getGasEstimateWithRevertCode({
    domain: +domain,
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

  const request: RelayerSyncFeeRequest = {
    chainId: chainId,
    target: destinationAddress,
    data: encodedData,
    isRelayContext: false,
    feeToken: NATIVE_TOKEN,
  };

  logger.info("Sending to Gelato network", requestContext, methodContext, request);

  // Future intented way to call
  const response = await gelatoSDKSend(request, gelatoApiKey, { gasLimit: GAS_LIMIT_FOR_RELAYER(chainId) });

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, response);
    return response.taskId;
  }
};
