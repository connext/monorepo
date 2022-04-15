import { BidData, createLoggingContext, RequestContext } from "@connext/nxtp-utils";

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
    },
  ]);
  const destinationConnextAddress = config.chains[bidData.params.destinationDomain].deployments.connext;

  logger.info("sanityCheck", requestContext, methodContext, {
    bidData,
    destinationChainId,
    encodedData,
    destinationConnextAddress,
  });

  // Validate the bid's fulfill call will succeed on chain.
  // TODO: We need to use the target relayer as the `from` value!
  await txservice.getGasEstimateWithRevertCode(Number(bidData.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    from: router,
    data: encodedData,
  });
};
