import { Bid, createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { getContext } from "../../router";

export const sanityCheck = async (bid: Bid, requestContext: RequestContext): Promise<void> => {
  const {
    config,
    adapters: { txservice, contracts },
    chainData,
    logger,
  } = getContext();
  const { methodContext } = createLoggingContext(sanityCheck.name, requestContext);
  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const encodedData = contracts.connext.encodeFunctionData("execute", [bid.data]);
  const destinationConnextAddress = config.chains[bid.data.params.destinationDomain].deployments.connext;

  logger.info("sanityCheck", requestContext, methodContext, {
    bid,
    destinationChainId,
    encodedData,
    destinationConnextAddress,
  });

  // Validate the bid's fulfill call will succeed on chain.
  await txservice.getGasEstimate(Number(bid.data.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
  });
};
