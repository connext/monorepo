import {
  createLoggingContext,
  jsonifyError,
  Logger,
  NxtpError,
  RelayerTaskStatus,
  RelayerType,
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
  ) => Promise<RelayerTaskStatus>;
};

export const setupGelatoRelayer = _setupGelatoRelayer;
export const setupConnextRelayer = _setupConnextRelayer;

export const sendWithRelayerWithBackup = async (
  chainId: number,
  domain: string,
  destinationAddress: string,
  data: string,
  instances: { relayer: Relayer; apiKey: string; type: RelayerType }[],
  chainReader: ChainReader,
  logger: Logger,
  _requestContext: RequestContext,
) => {
  const { methodContext, requestContext } = createLoggingContext(sendWithRelayerWithBackup.name, _requestContext);
  let taskRes: { taskId: string; taskStatus: RelayerTaskStatus } = {} as any;

  for (const instance of instances) {
    logger.info(`Sending tx with ${instance.type} relayer`, requestContext, methodContext, {
      chainId,
      domain,
      destinationAddress,
      data,
    });
    try {
      const taskId = await instance.relayer.send(
        chainId,
        domain,
        destinationAddress,
        data,
        instance.apiKey,
        chainReader,
        logger,
        requestContext,
      );
      const status = await instance.relayer.waitForTaskCompletion(taskId, logger, _requestContext);
      taskRes = { taskId, taskStatus: status };
      if (status === RelayerTaskStatus.ExecSuccess) {
        logger.info(`Successfully sent data with ${instance.relayer} relayer`, requestContext, methodContext, {
          taskId,
        });

        break;
      }
    } catch (err: unknown) {
      logger.error(
        `Failed to sent data with ${instance.type}`,
        requestContext,
        methodContext,
        jsonifyError(err as NxtpError),
      );
    }
  }

  if (!taskRes) {
    throw new RelayerSendFailed({ relayers: instances.map((instance) => instance.type) });
  }

  return taskRes;
};
