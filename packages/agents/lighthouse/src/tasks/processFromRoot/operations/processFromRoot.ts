import { createLoggingContext, createRequestContext, RequestContext } from "@connext/nxtp-utils";
import { providers } from "ethers";
import { Interface } from "ethers/lib/utils";

import { ProcessConfigNotAvailable } from "../errors";
import { getProcessFromOptimismRootArgs } from "../helpers";
import { getContext } from "../processFromRoot";

const processorConfigs: Record<
  string,
  {
    getArgs: (
      l2ChainId: number,
      l1ChainId: number,
      l2Provider: providers.JsonRpcProvider,
      l1Provider: providers.JsonRpcProvider,
      sendHash: string,
      _requestContext: RequestContext,
    ) => Promise<any[]>;
    hubConnectorPrefix: string;
  }
> = {
  "1735356532": { getArgs: getProcessFromOptimismRootArgs, hubConnectorPrefix: "Optimism" },
};

export const processFromRoot = async () => {
  const {
    adapters: { contracts, database, relayer, chainreader },
    logger,
    chainData,
    config,
  } = getContext();

  const { requestContext: _requestContext, methodContext } = createLoggingContext("processFromRoot");
  logger.info("processFromRoot method start", _requestContext, methodContext);
  const unprocessed = await database.getUnProcessedRootMessages();
  logger.info("Got unprocessed root messages", _requestContext, methodContext, { unprocessed });

  await Promise.all(
    unprocessed.map(async (msg) => {
      const requestContext = createRequestContext("processFromRoot", msg.transactionHash);
      logger.info("Processing root message", requestContext, methodContext, { msg });

      const spokeChain = chainData.get(msg.spokeDomain)?.chainId;
      const hubChain = chainData.get(msg.hubDomain)?.chainId;
      const processorConfig = processorConfigs[msg.spokeDomain];
      const spokeProvider = config.chains[msg.spokeDomain]?.providers?.[0];
      const hubProvider = config.chains[msg.hubDomain]?.providers?.[0];

      const hubConnector = contracts.hubConnector(
        hubChain ?? 0,
        processorConfig.hubConnectorPrefix,
        config.environment === "staging" ? "Staging" : "",
      );

      if (!spokeChain || !hubChain || !processorConfig || !spokeProvider || !hubProvider || !hubConnector) {
        logger.error(
          "Incomplete config for processing from root",
          requestContext,
          methodContext,
          new ProcessConfigNotAvailable(msg.spokeDomain, msg.hubDomain, requestContext, methodContext, {
            spokeChain,
            hubChain,
            spokeProvider,
            hubProvider,
            hubConnector: hubConnector?.address,
          }),
        );
        return;
      }

      const args = await processorConfig.getArgs(
        spokeChain,
        hubChain,
        new providers.JsonRpcProvider(spokeProvider),
        new providers.JsonRpcProvider(hubProvider),
        msg.transactionHash,
        requestContext,
      );

      const encodedData = new Interface(hubConnector.abi as string[]).encodeFunctionData(
        "processMessageFromRoot",
        args,
      );

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
      const gas = await chainreader.getGasEstimateWithRevertCode(Number(msg.hubDomain), {
        chainId: hubChain,
        to: hubConnector.address,
        data: encodedData,
        from: relayerAddress,
      });

      logger.info("Sending meta tx to relayer", requestContext, methodContext, {
        relayer: relayerAddress,
        hubConnector: hubConnector.address,
        domain: msg.hubDomain,
        gas: gas.toString(),
      });

      const taskId = await relayer.send(
        hubChain,
        hubConnector.address as string,
        encodedData,
        config.gelatoApiKey,
        logger,
        requestContext,
      );

      logger.info("Sent meta tx to relayer", requestContext, methodContext, { taskId });
    }),
  );
};
