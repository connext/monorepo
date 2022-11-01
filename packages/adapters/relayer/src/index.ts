import {
  createLoggingContext,
  jsonifyError,
  Logger,
  NxtpError,
  RelayerTaskStatus,
  RequestContext,
} from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";

import { setupRelayer as _setupGelatoRelayer } from "./gelato";
import { setupRelayer as _setupConnextRelayer } from "./connext";
import { RelayerSendFailed } from "./errors";

export type Relayer = {
  getRelayerAddress: (chainId: number, logger: Logger) => Promise<string>;
  send: (
    chainId: number,
    domain: string,
    destinationAddress: string,
    encodedData: string,
    gelatoApiKey: string,
    chainReader: ChainReader,
    logger: Logger,
    _requestContext?: RequestContext,
  ) => Promise<string>;
  getTaskStatus: (taskId: string, logger?: Logger) => Promise<RelayerTaskStatus>;
  waitForTaskCompletion: (
    taskId: string,
    logger: Logger,
    _requestContext: RequestContext,
    _timeout?: number,
    _pollInterval?: number,
  ) => Promise<RelayerTaskStatus>;
};

export const setupGelatoRelayer = _setupGelatoRelayer;
export const setupConnextRelayer = _setupConnextRelayer;

export const sendWithRelayerWithBackup = async (
  chainId: number,
  domain: string,
  destinationAddress: string,
  data: string,
  relayer: Relayer,
  relayerApiKey: string,
  backupRelayer: Relayer,
  backupRelayerApiKey: string,
  chainReader: ChainReader,
  logger: Logger,
  _requestContext: RequestContext,
) => {
  const { methodContext, requestContext } = createLoggingContext(sendWithRelayerWithBackup.name, _requestContext);
  let taskId: string;

  logger.info("Sending tx with primary relayer", requestContext, methodContext, {
    chainId,
    domain,
    destinationAddress,
    data,
  });
  try {
    taskId = await relayer.send(
      chainId,
      domain,
      destinationAddress,
      data,
      relayerApiKey,
      chainReader,
      logger,
      requestContext,
    );
    const status = await relayer.waitForTaskCompletion(taskId, logger, _requestContext);
    if (status === RelayerTaskStatus.ExecSuccess) {
      logger.info("Successfully executed fast with primary relayer", requestContext, methodContext, { taskId });
      return { taskId, taskStatus: status };
    }
  } catch (err: unknown) {
    logger.error(
      "Failed to execute fast with primary relayer",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }

  let status = RelayerTaskStatus.NotFound;
  try {
    logger.info("Attempting execute with backup relayer", requestContext, methodContext, {
      chainId,
      domain,
      destinationAddress,
      data,
    });
    taskId = await backupRelayer.send(
      chainId,
      domain,
      destinationAddress,
      data,
      backupRelayerApiKey,
      chainReader,
      logger,
      requestContext,
    );
    status = await backupRelayer.waitForTaskCompletion(taskId, logger, _requestContext);
  } catch (err: unknown) {
    throw new RelayerSendFailed({ relayer: "backup", error: jsonifyError(err as NxtpError) });
  }
  if (status === RelayerTaskStatus.ExecSuccess) {
    logger.info("Successfully executed slow with backup relayer", requestContext, methodContext, { taskId });
  } else {
    logger.warn("Received unsuccessful status from backup relayer", requestContext, methodContext, { taskId, status });
  }

  return { taskId, taskStatus: status };
};
