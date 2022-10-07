import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  jsonifyError,
  NxtpError,
  RequestContext,
  RootMessage,
} from "@connext/nxtp-utils";
import { providers } from "ethers";
import { Interface } from "ethers/lib/utils";

import { ProcessConfigNotAvailable } from "../errors";
import { getProcessFromOptimismRootArgs } from "../helpers";
import { getContext } from "../processFromRoot";

export type ProcessConfig = {
  getArgs: (
    l2ChainId: number,
    l1ChainId: number,
    l2Provider: providers.JsonRpcProvider,
    l1Provider: providers.JsonRpcProvider,
    sendHash: string,
    _requestContext: RequestContext,
  ) => Promise<any[]>;
  hubConnectorPrefix: string;
};

export const processorConfigs: Record<string, ProcessConfig> = {
  "1735356532": { getArgs: getProcessFromOptimismRootArgs, hubConnectorPrefix: "Optimism" },
};

export const encodeProcessMessageFromRoot = (abi: any[], args: any[]): string => {
  const encodedData = new Interface(abi as string[]).encodeFunctionData("processMessageFromRoot", args);
  return encodedData;
};

export const processFromRoot = async () => {
  const {
    adapters: { database },
    logger,
  } = getContext();

  const { requestContext: _requestContext, methodContext } = createLoggingContext("processFromRoot");
  logger.info("processFromRoot method start", _requestContext, methodContext);
  const unprocessed = await database.getRootMessages(false);
  logger.info("Got unprocessed root messages", _requestContext, methodContext, { unprocessed });

  await Promise.all(
    unprocessed.map(async (msg) => {
      const requestContext = createRequestContext("processFromRoot", msg.transactionHash);
      logger.info("Processing root message", requestContext, methodContext, { msg });

      try {
        await processSingleRootMessage(msg as RootMessage, requestContext);
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
    adapters: { relayer, chainreader, contracts },
    logger,
    chainData,
    config,
  } = getContext();
  const methodContext = createMethodContext("processSingleRootMessage");

  const spokeChain = chainData.get(rootMessage.spokeDomain)?.chainId;
  const hubChain = chainData.get(rootMessage.hubDomain)?.chainId;
  const processorConfig = processorConfigs[rootMessage.spokeDomain];
  const spokeProvider = config.chains[rootMessage.spokeDomain]?.providers?.[0];
  const hubProvider = config.chains[rootMessage.hubDomain]?.providers?.[0];

  const hubConnector = contracts.hubConnector(
    hubChain ?? 0,
    processorConfig.hubConnectorPrefix,
    config.environment === "staging" ? "Staging" : "",
  );

  if (!spokeChain || !hubChain || !processorConfig || !spokeProvider || !hubProvider || !hubConnector) {
    throw new ProcessConfigNotAvailable(rootMessage.spokeDomain, rootMessage.hubDomain, requestContext, methodContext, {
      spokeChain,
      hubChain,
      spokeProvider,
      hubProvider,
      hubConnector: hubConnector?.address,
    });
  }

  const args = await processorConfig.getArgs(
    spokeChain,
    hubChain,
    new providers.JsonRpcProvider(spokeProvider),
    new providers.JsonRpcProvider(hubProvider),
    rootMessage.transactionHash,
    requestContext,
  );

  const encodedData = encodeProcessMessageFromRoot(hubConnector.abi as string[], args);

  logger.info("Sending process message from root tx", requestContext, methodContext, {
    args,
    encodedData,
    spokeChain,
    hubChain,
  });

  // TODO: wrap this stuff up behind relayer interface, ideally behind tx service
  const relayerAddress = await relayer.getRelayerAddress(hubChain, logger);
  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId: hubChain,
    to: hubConnector.address,
    data: encodedData,
    from: relayerAddress,
  });

  const gas = await chainreader.getGasEstimateWithRevertCode(Number(rootMessage.hubDomain), {
    chainId: hubChain,
    to: hubConnector.address,
    data: encodedData,
    from: relayerAddress,
  });

  logger.info("Sending meta tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    hubConnector: hubConnector.address,
    domain: rootMessage.hubDomain,
    gas: gas.toString(),
  });

  const taskId = await relayer.send(
    hubChain,
    hubConnector.address,
    encodedData,
    config.gelatoApiKey,
    logger,
    requestContext,
  );

  logger.info("Sent meta tx to relayer", requestContext, methodContext, { taskId });
  return taskId;
};
