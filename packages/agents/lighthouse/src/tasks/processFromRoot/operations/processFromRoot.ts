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
import { WriteTransaction } from "@connext/nxtp-txservice";
import { constants } from "ethers";

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
  getLatestXLayerSpokeMessage,
} from "../helpers";
import { getContext } from "../processFromRoot";
export type ProcessConfig = {
  getWriteTransaction: (params: GetProcessArgsParams) => Promise<WriteTransaction | undefined>;
};

const getWriteTransactionFromArgsWithPrefix = async (
  params: GetProcessArgsParams,
  hubConnectorPrefix: string,
  processorFunctionName: string,
  getArgs: (params: GetProcessArgsParams) => Promise<any[]>,
): Promise<WriteTransaction | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(
    "getWriteTransactionFromArgsWithPrefix",
    params._requestContext,
  );
  const args = await getArgs(params);
  if (!args.length) {
    return undefined;
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
    throw new ProcessConfigNotAvailable(params.spokeDomainId, params.hubDomainId, requestContext, methodContext, {
      ...params,
    });
  }
  const data = encodeProcessMessageFromRoot(hubConnector.abi as string[], args, processorFunctionName);
  return {
    to: hubConnector.address,
    data,
    domain: +params.hubDomainId,
    value: constants.Zero,
  };
};

const getWriteTransactionFromArgsWithContract = async (
  params: GetProcessArgsParams,
  processorFunctionName: string,
  contract: string,
  abi: any[],
  getArgs: (params: GetProcessArgsParams) => Promise<any[]>,
) => {
  const args = await getArgs(params);
  if (!args.length) {
    return undefined;
  }
  const data = encodeProcessMessageFromRoot(abi, args, processorFunctionName);
  return {
    to: contract,
    data,
    domain: +params.hubDomainId,
    value: constants.Zero,
  };
};

export const processorConfigs: Record<string, ProcessConfig> = {
  "1735356532": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(
        params,
        "Optimism",
        "processMessageFromRoot",
        getProcessFromOptimismRootArgs,
      ),
  },
  "1869640549": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(
        params,
        "Optimism",
        "processMessageFromRoot",
        getProcessFromOptimismRootArgs,
      ),
  },
  "9991": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Polygon", "receiveMessage", getProcessFromPolygonRootArgs),
  },
  "1734439522": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(
        params,
        "Arbitrum",
        "processMessageFromRoot",
        getProcessFromArbitrumRootArgs,
      ),
  },
  "1633842021": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(
        params,
        "Arbitrum",
        "processMessageFromRoot",
        getProcessFromArbitrumRootArgs,
      ),
  },
  "1869640809": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(
        params,
        "Optimism",
        "processMessageFromRoot",
        getProcessFromOptimismRootArgs,
      ),
  },
  "1886350457": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Polygon", "receiveMessage", getProcessFromPolygonRootArgs),
  },
  "6778479": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Gnosis", "executeSignatures", getProcessFromGnosisRootArgs),
  },
  "1634886255": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(
        params,
        "Arbitrum",
        "processMessageFromRoot",
        getProcessFromArbitrumRootArgs,
      ),
  },
  "2053862260": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "ZkSync", "processMessageFromRoot", getProcessFromZkSyncRootArgs),
  },
  "2053862243": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "ZkSync", "processMessageFromRoot", getProcessFromZkSyncRootArgs),
  },
  "1818848877": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Linea", "claimMessage", getProcessFromLineaRootArgs),
  },
  "1668247156": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Linea", "claimMessage", getProcessFromLineaRootArgs),
  },
  "1650553709": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Base", "processMessageFromRoot", getProcessFromBaseRootArgs),
  },
  "1650553703": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Base", "processMessageFromRoot", getProcessFromBaseRootArgs),
  },
  "1835101812": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Mantle", "processMessageFromRoot", getProcessFromMantleRootArgs),
  },
  "1835365481": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Metis", "processMessageFromRoot", getProcessFromMetisRootArgs),
  },
  "1836016741": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithPrefix(params, "Mode", "processMessageFromRoot", getProcessFromModeRootArgs),
  },
  "1935897199": {
    getWriteTransaction: async (params) =>
      getWriteTransactionFromArgsWithContract(
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
    getWriteTransaction: getProcessFromXlayerRootWriteTransaction,
  },
};

export const getSpokeMessages = async (_requestContext: RequestContext): Promise<RootMessage[]> => {
  const { config } = getContext();

  const message = await getLatestXLayerSpokeMessage(
    config.network === "mainnet" ? 6648936 : 1936027759,
    config.network === "mainnet" ? 2020368761 : 2016506996,
    _requestContext,
  );
  return message ? [message] : [];
};

export const processFromRoot = async () => {
  const {
    adapters: { database },
    logger,
  } = getContext();

  const { requestContext: _requestContext, methodContext } = createLoggingContext("processFromRoot");
  logger.info("processFromRoot method start", _requestContext, methodContext);

  const unprocessedHubClaims = await database.getRootMessages(false);
  // NOTE: only xlayer requires L1 -> L2 claiming, it is not stored in carto.
  const unprocessedSpokeClaims = await getSpokeMessages(_requestContext);
  const unprocessed = unprocessedHubClaims
    .map((m) => ({ ...m, isSpokeClaim: false }))
    .concat(unprocessedSpokeClaims.map((m) => ({ ...m, isSpokeClaim: true })));
  if (unprocessed.length > 0) {
    logger.info("Got unprocessed root messages", _requestContext, methodContext, {
      unprocessedHubClaims,
      unprocessedSpokeClaims,
    });
  }

  // get latest unprocessed for each spoke
  const byDomain: Record<string, (RootMessage & { isSpokeClaim: boolean })[]> = {};
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
  rootMessage: RootMessage & { isSpokeClaim: boolean },
  requestContext: RequestContext,
): Promise<string | undefined> => {
  const {
    adapters: { relayers, chainreader, database },
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

  const transaction = await processorConfig.getWriteTransaction({
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
    // NOTE: looking for presence of fields only included in `
    isSpokeClaim: rootMessage.isSpokeClaim,
  });

  if (!transaction) {
    return undefined;
  }

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

  return taskId;
};
