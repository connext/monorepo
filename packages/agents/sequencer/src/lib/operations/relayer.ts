import { gelatoSend, isChainSupportedByGelato, Bid, RequestContext, createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";

export const sendToRelayer = async (bid: Bid, _requestContext: RequestContext) => {
  const {
    logger,
    chainData,
    adapters: { contracts },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(sendToRelayer.name, _requestContext);
  logger.info(`Method start: ${sendToRelayer.name}`, requestContext, methodContext, { bid });

  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;
  const destinationTransactionManagerAddress =
    config.chains[bid.data.params.destinationDomain].deployments.transactionManager;

  const encodedData = contracts.transactionManager.encodeFunctionData("fulfill", [bid.data]);

  if (!isChainSupportedByGelato(destinationChainId)) {
    throw new Error("Chain not supported by gelato.");
  }

  logger.info("Sending to Gelato network", requestContext, methodContext, {
    encodedData,
    destinationTransactionManagerAddress,
    domain: bid.data.params.destinationDomain,
  });

  const result = await gelatoSend(
    destinationChainId,
    destinationTransactionManagerAddress,
    encodedData,
    bid.data.local,
    bid.data.feePercentage,
  );

  // const response = await axios.get(formatUrl(gelatoRelayEndpoint, "tasks", result.taskId));
  // TODO: check response, if it didn't work, send the next!

  logger.info("Sent to Gelato network", requestContext, methodContext, {
    result,
    taskId: result.taskId,
    // response: response.data,
  });
};
