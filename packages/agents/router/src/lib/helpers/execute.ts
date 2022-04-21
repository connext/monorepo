import { BidData, createLoggingContext, ExecuteArgs, RequestContext } from "@connext/nxtp-utils";

import { getContext } from "../../router";

export const sanityCheck = async (bidData: BidData, requestContext: RequestContext): Promise<void> => {
  const {
    config,
    adapters: { txservice, contracts, wallet },
    chainData,
    logger,
  } = getContext();
  const { methodContext } = createLoggingContext(sanityCheck.name, requestContext);
  const destinationChainId = chainData.get(bidData.params.destinationDomain)!.chainId;

  const router = await wallet.getAddress();
  const encodedData = contracts.connext.encodeFunctionData("execute", [
    {
      ...bidData,
      routers: [router],
    } as ExecuteArgs,
  ]);
  const destinationConnextAddress = config.chains[bidData.params.destinationDomain].deployments.connext;

  logger.info("sanityCheck", requestContext, methodContext, {
    bidData,
    destinationChainId,
    encodedData,
    destinationConnextAddress,
  });

  // Validate the bid's fulfill call will succeed on chain.
  await txservice.getGasEstimate(Number(bidData.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
  });
};
