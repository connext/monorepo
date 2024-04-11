import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  domainToChainId,
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
  getProcessFromScrollRootArgs,
  getProcessFromXlayerRootWriteTransaction,
} from "../helpers";
import { getContext } from "../processFromRoot";
import { WriteTransaction } from "@connext/nxtp-txservice";
import { constants } from "ethers";

export type ProcessConfig = {
  getWriteTransactions: (params: GetProcessArgsParams) => Promise<WriteTransaction[]>;
};

const getWriteTransactionsFromArgsWithPrefix = async (
  params: GetProcessArgsParams,
  hubConnectorPrefix: string,
  processorFunctionName: string,
  getArgs: (params: GetProcessArgsParams) => Promise<any[]>,
): Promise<WriteTransaction[]> => {
  const args = await getArgs(params);
  if (!args.length) {
    return [];
  }
  const {
    adapters: { contracts },
    config,
  } = getContext();
  const hubConnector = contracts.hubConnector(
    params.hubChainId ?? 0,
    hubConnectorPrefix,
    config.environment === "staging" ? "Staging" : "",
  );
  if (!hubConnector) {
    throw new ProcessConfigNotAvailable(params.spokeDomainId, params.hubDomainId, params._requestContext, {} as any, {
      ...params,
    });
  }
  const data = encodeProcessMessageFromRoot(hubConnector.abi, args, processorFunctionName);
  return [
    {
      to: hubConnector.address,
      data,
      domain: +params.hubDomainId,
      value: constants.Zero,
    },
  ];
};

const getWriteTransactionsFromArgsWithContract = async (
  params: GetProcessArgsParams,
  processorFunctionName: string,
  contract: string,
  abi: any[],
  getArgs: (params: GetProcessArgsParams) => Promise<any[]>,
) => {
  const args = await getArgs(params);
  if (!args.length) {
    return [];
  }
  const data = encodeProcessMessageFromRoot(abi, args, processorFunctionName);
  return [
    {
      to: contract,
      data,
      domain: +params.hubDomainId,
      value: constants.Zero,
    },
  ];
};

export const processorConfigs: Record<string, ProcessConfig> = {
  "1735356532": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(
        params,
        "Optimism",
        "processMessageFromRoot",
        getProcessFromOptimismRootArgs,
      ),
  },
  "1869640549": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(
        params,
        "Optimism",
        "processMessageFromRoot",
        getProcessFromOptimismRootArgs,
      ),
  },
  "9991": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Polygon", "receiveMessage", getProcessFromPolygonRootArgs),
  },
  "1734439522": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(
        params,
        "Arbitrum",
        "processMessageFromRoot",
        getProcessFromArbitrumRootArgs,
      ),
  },
  "1633842021": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(
        params,
        "Arbitrum",
        "processMessageFromRoot",
        getProcessFromArbitrumRootArgs,
      ),
  },
  "1869640809": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(
        params,
        "Optimism",
        "processMessageFromRoot",
        getProcessFromOptimismRootArgs,
      ),
  },
  "1886350457": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Polygon", "receiveMessage", getProcessFromPolygonRootArgs),
  },
  "6778479": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Gnosis", "executeSignatures", getProcessFromGnosisRootArgs),
  },
  "1634886255": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(
        params,
        "Arbitrum",
        "processMessageFromRoot",
        getProcessFromArbitrumRootArgs,
      ),
  },
  "2053862260": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "ZkSync", "processMessageFromRoot", getProcessFromZkSyncRootArgs),
  },
  "2053862243": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "ZkSync", "processMessageFromRoot", getProcessFromZkSyncRootArgs),
  },
  "1818848877": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Linea", "claimMessage", getProcessFromLineaRootArgs),
  },
  "1668247156": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Linea", "claimMessage", getProcessFromLineaRootArgs),
  },
  "1650553709": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Base", "processMessageFromRoot", getProcessFromBaseRootArgs),
  },
  "1650553703": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Base", "processMessageFromRoot", getProcessFromBaseRootArgs),
  },
  "1835101812": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Mantle", "processMessageFromRoot", getProcessFromMantleRootArgs),
  },
  "1835365481": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Metis", "processMessageFromRoot", getProcessFromMetisRootArgs),
  },
  "1836016741": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithPrefix(params, "Mode", "processMessageFromRoot", getProcessFromModeRootArgs),
  },
  "1935897199": {
    getWriteTransactions: async (params) =>
      getWriteTransactionsFromArgsWithContract(
        params,
        "relayMessageWithProof",
        "0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367",
        [
          "function relayMessageWithProof(address _from, address _to, uint256 _value, uint256 _nonce, bytes _message, tuple(uint256 batchIndex, bytes merkleProof) _proof)",
        ],
        getProcessFromScrollRootArgs,
      ),
  },
  "2020368761": {
    getWriteTransactions: getProcessFromXlayerRootWriteTransaction,
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
    if (domain === "") {
      // Xlayer messages can be processed from hub or spoke. the write transaction will
      // potentially return 2 transactions, one for the hub and one for the spoke

      continue;
    }
    for (const msg of byDomain[domain]) {
      const requestContext = createRequestContext("processFromRoot", msg.transactionHash);
      logger.info("Processing root message", requestContext, methodContext, { msg });

      try {
        const taskId = await processSingleDomainRootMessage(msg, requestContext);
        if (taskId) break;
      } catch (err: unknown) {
        logger.error("Error processing from root", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }
  }
};

export const processXLayerDomainMessages = async (): Promise<string | undefined> => {};

export const processSingleDomainRootMessage = async (
  rootMessage: RootMessage,
  requestContext: RequestContext,
): Promise<string | undefined> => {
  const {
    adapters: { relayers, chainreader, database },
    logger,
    chainData,
    config,
  } = getContext();
  const methodContext = createMethodContext("processSingleDomainRootMessage");

  const spokeChainId = chainData.get(rootMessage.spokeDomain)?.chainId;
  const hubChainId = chainData.get(rootMessage.hubDomain)?.chainId;
  const processorConfig = processorConfigs[rootMessage.spokeDomain];
  const spokeProvider = config.chains[rootMessage.spokeDomain]?.providers?.[0];
  const hubProvider = config.chains[rootMessage.hubDomain]?.providers?.[0];

  if (!spokeChainId || !hubChainId || !processorConfig || !spokeProvider || !hubProvider) {
    throw new ProcessConfigNotAvailable(rootMessage.spokeDomain, rootMessage.hubDomain, requestContext, methodContext, {
      spokeChain: spokeChainId,
      hubChain: hubChainId,
      spokeProvider,
      hubProvider,
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

  const transactions = await processorConfig.getWriteTransactions({
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

  if (!transactions.length) {
    return undefined;
  }

  for (const transaction of transactions) {
    logger.info("Sending process message from root tx", requestContext, methodContext, {
      transaction,
      spokeChain: spokeChainId,
      hubChain: hubChainId,
    });

    const { taskId, relayerType } = await sendWithRelayerWithBackup(
      domainToChainId(transaction.domain),
      transaction.domain.toString(),
      transaction.to,
      transaction.data,
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
  }

  return taskId;
};
