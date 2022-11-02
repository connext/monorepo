import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  jsonifyError,
  NxtpError,
  RequestContext,
  RootMessage,
} from "@connext/nxtp-utils";

import { encodeProcessMessageFromRoot, sendWithRelayerWithBackup } from "../../../mockable";
import { ProcessConfigNotAvailable } from "../errors";
import { GetProcessArgsParams, getProcessFromOptimismRootArgs, getProcessFromPolygonRootArgs } from "../helpers";
import { getContext } from "../processFromRoot";

export type ProcessConfig = {
  getArgs: (params: GetProcessArgsParams) => Promise<any[]>;
  hubConnectorPrefix: string;
  processorFunctionName: string;
};

export const processorConfigs: Record<string, ProcessConfig> = {
  "1735356532": {
    getArgs: getProcessFromOptimismRootArgs,
    hubConnectorPrefix: "Optimism",
    processorFunctionName: "processMessageFromRoot",
  },
  "9991": {
    getArgs: getProcessFromPolygonRootArgs,
    hubConnectorPrefix: "Polygon",
    processorFunctionName: "receiveMessage",
  },
  "1869640809": {
    getArgs: getProcessFromOptimismRootArgs,
    hubConnectorPrefix: "Optimism",
    processorFunctionName: "processMessageFromRoot",
  },
  "1886350457": {
    getArgs: getProcessFromPolygonRootArgs,
    hubConnectorPrefix: "Polygon",
    processorFunctionName: "receiveMessage",
  },
};

export const processFromRoot = async () => {
  const {
    adapters: { database },
    logger,
  } = getContext();

  const { requestContext: _requestContext, methodContext } = createLoggingContext("processFromRoot");
  logger.info("processFromRoot method start", _requestContext, methodContext);
  const unprocessed = await database.getRootMessages(false);
  if (unprocessed.length > 0) {
    logger.info("Got unprocessed root messages", _requestContext, methodContext, { unprocessed });
  }

  await Promise.all(
    unprocessed.map(async (msg) => {
      const requestContext = createRequestContext("processFromRoot", msg.transactionHash);
      logger.info("Processing root message", requestContext, methodContext, { msg });

      try {
        await processSingleRootMessage(msg, requestContext);
      } catch (err: unknown) {
        logger.error("Error processing from root", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }),
  );
};

export const processSingleRootMessage = async (
  rootMessage: RootMessage,
  requestContext: RequestContext,
): Promise<string> => {
  const {
    adapters: { relayers, contracts, chainreader },
    logger,
    chainData,
    config,
  } = getContext();
  const methodContext = createMethodContext("processSingleRootMessage");

  const spokeChainId = chainData.get(rootMessage.spokeDomain)?.chainId;
  const hubChainId = chainData.get(rootMessage.hubDomain)?.chainId;
  const processorConfig = processorConfigs[rootMessage.spokeDomain];
  const spokeProvider = config.chains[rootMessage.spokeDomain]?.providers?.[0];
  const hubProvider = config.chains[rootMessage.hubDomain]?.providers?.[0];

  const hubConnector = processorConfig
    ? contracts.hubConnector(
        hubChainId ?? 0,
        processorConfig.hubConnectorPrefix,
        config.environment === "staging" ? "Staging" : "",
      )
    : undefined;

  if (!spokeChainId || !hubChainId || !processorConfig || !spokeProvider || !hubProvider || !hubConnector) {
    throw new ProcessConfigNotAvailable(rootMessage.spokeDomain, rootMessage.hubDomain, requestContext, methodContext, {
      spokeChain: spokeChainId,
      hubChain: hubChainId,
      spokeProvider,
      hubProvider,
      hubConnector: hubConnector?.address,
    });
  }

  const args = await processorConfig.getArgs({
    spokeChainId,
    hubChainId,
    spokeProvider,
    hubProvider,
    spokeDomainId: rootMessage.spokeDomain,
    hubDomainId: rootMessage.hubDomain,
    sendHash: rootMessage.transactionHash,
    _requestContext: requestContext,
  });

  const encodedData = encodeProcessMessageFromRoot(
    hubConnector.abi as string[],
    args,
    processorConfig.processorFunctionName,
  );

  logger.info("Sending process message from root tx", requestContext, methodContext, {
    args,
    encodedData,
    spokeChain: spokeChainId,
    hubChain: hubChainId,
  });

  const { taskId, taskStatus } = await sendWithRelayerWithBackup(
    hubChainId,
    rootMessage.hubDomain,
    hubConnector.address,
    encodedData,
    relayers,
    chainreader,
    logger,
    requestContext,
  );

  logger.info("Sent meta tx to relayer", requestContext, methodContext, { taskId, taskStatus });
  return taskId;
};
