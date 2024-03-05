import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  getNtpTimeSeconds,
  jsonifyError,
  NxtpError,
  RelayerTaskStatus,
  RelayerType,
  RequestContext,
  RootMessage,
} from "@connext/nxtp-utils";

import { encodeProcessMessageFromRoot, sendWithRelayerWithBackup } from "../../../mockable";
import { CouldNotFindRelayer, ProcessConfigNotAvailable } from "../errors";
import {
  GetProcessArgsParams,
  getProcessFromOptimismRootArgs,
  getProcessFromPolygonRootArgs,
  getProcessFromGnosisRootArgs,
  getProcessFromArbitrumRootArgs,
  getProcessFromZkSyncRootArgs,
  getProcessFromLineaRootArgs,
  getProcessFromBaseRootArgs,
  getProcessFromMantleRootArgs,
  getProcessFromMetisRootArgs,
  getProcessFromModeRootArgs,
} from "../helpers";
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
  "1734439522": {
    getArgs: getProcessFromArbitrumRootArgs,
    hubConnectorPrefix: "Arbitrum",
    processorFunctionName: "processMessageFromRoot",
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
  "6778479": {
    getArgs: getProcessFromGnosisRootArgs,
    hubConnectorPrefix: "Gnosis",
    processorFunctionName: "executeSignatures",
  },
  "1634886255": {
    getArgs: getProcessFromArbitrumRootArgs,
    hubConnectorPrefix: "Arbitrum",
    processorFunctionName: "processMessageFromRoot",
  },
  "2053862260": {
    getArgs: getProcessFromZkSyncRootArgs,
    hubConnectorPrefix: "ZkSync",
    processorFunctionName: "processMessageFromRoot",
  },
  "2053862243": {
    getArgs: getProcessFromZkSyncRootArgs,
    hubConnectorPrefix: "ZkSync",
    processorFunctionName: "processMessageFromRoot",
  },
  "1818848877": {
    getArgs: getProcessFromLineaRootArgs,
    hubConnectorPrefix: "Linea",
    processorFunctionName: "claimMessage",
  },
  "1668247156": {
    getArgs: getProcessFromLineaRootArgs,
    hubConnectorPrefix: "Linea",
    processorFunctionName: "claimMessage",
  },
  "1650553709": {
    getArgs: getProcessFromBaseRootArgs,
    hubConnectorPrefix: "Base",
    processorFunctionName: "processMessageFromRoot",
  },
  "1650553703": {
    getArgs: getProcessFromBaseRootArgs,
    hubConnectorPrefix: "Base",
    processorFunctionName: "processMessageFromRoot",
  },
  "1835101812": {
    getArgs: getProcessFromMantleRootArgs,
    hubConnectorPrefix: "Mantle",
    processorFunctionName: "processMessageFromRoot",
  },
  "1835365481": {
    getArgs: getProcessFromMetisRootArgs,
    hubConnectorPrefix: "Metis",
    processorFunctionName: "processMessageFromRoot",
  },
  "1836016741": {
    getArgs: getProcessFromModeRootArgs,
    hubConnectorPrefix: "Mode",
    processorFunctionName: "processMessageFromRoot",
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

  // get latest unprocessed for each spoke
  const byDomain: Record<string, RootMessage[]> = {};
  unprocessed.forEach((msg) => {
    if (!byDomain[msg.spokeDomain]) {
      byDomain[msg.spokeDomain] = [];
    }
    byDomain[msg.spokeDomain].push(msg);
  });

  Object.keys(byDomain).forEach((domain) => {
    byDomain[domain].sort((a, b) => b.timestamp - a.timestamp);
  });

  for (const domain of Object.keys(byDomain)) {
    for (const msg of byDomain[domain]) {
      const requestContext = createRequestContext("processFromRoot", msg.transactionHash);
      logger.info("Processing root message", requestContext, methodContext, { msg });

      try {
        const taskId = await processSingleRootMessage(msg, requestContext);
        if (taskId) break;
      } catch (err: unknown) {
        logger.error("Error processing from root", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }
  }
};

export const processSingleRootMessage = async (
  rootMessage: RootMessage,
  requestContext: RequestContext,
): Promise<string | undefined> => {
  const {
    adapters: { relayers, contracts, chainreader, database },
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

  if (rootMessage.sentTaskId) {
    const relayer = relayers.find((r) => r.type === rootMessage.relayerType);
    if (!relayer) {
      throw new CouldNotFindRelayer(rootMessage.relayerType as RelayerType, {
        rootMessage,
      });
    }
    const status = await relayer.instance.getTaskStatus(rootMessage.sentTaskId);
    if (status === RelayerTaskStatus.ExecSuccess) {
      logger.info("Process from root sent successfully, waiting for subgraph update", requestContext, methodContext, {
        rootMessage,
      });
      return undefined;
    } else if (status === RelayerTaskStatus.ExecPending) {
      // do nothing
    } else {
      // there was an error, so we want to retry
      logger.info("Found failed status, retrying process", requestContext, methodContext, {
        rootMessage,
        status: status,
      });
      rootMessage.sentTimestamp = undefined;
    }
  }

  if (rootMessage.sentTimestamp && getNtpTimeSeconds() < rootMessage.sentTimestamp + config.relayerWaitTime) {
    logger.info("Process from root already sent, waiting for subgraph update", requestContext, methodContext, {
      rootMessage,
    });
    return undefined;
  }

  const args = await processorConfig.getArgs({
    spokeChainId,
    hubChainId,
    spokeProvider,
    hubProvider,
    spokeDomainId: rootMessage.spokeDomain,
    hubDomainId: rootMessage.hubDomain,
    message: rootMessage.root,
    sendHash: rootMessage.transactionHash,
    blockNumber: rootMessage.blockNumber,
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

  const { taskId, relayerType } = await sendWithRelayerWithBackup(
    hubChainId,
    rootMessage.hubDomain,
    hubConnector.address,
    encodedData,
    relayers,
    chainreader,
    logger,
    requestContext,
  );

  // Upsert with latest task meta data
  rootMessage.sentTaskId = taskId;
  rootMessage.relayerType = relayerType;
  rootMessage.sentTimestamp = getNtpTimeSeconds();

  await database.saveSentRootMessages([rootMessage]);

  logger.info("Sent meta tx to relayer", requestContext, methodContext, { taskId });
  return taskId;
};
