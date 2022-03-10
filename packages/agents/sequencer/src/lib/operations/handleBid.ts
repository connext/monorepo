import { SignedBid, RequestContext, createLoggingContext } from "@connext/nxtp-utils";

import { getTxManagerInterface } from "../helpers";

import { getContext } from "../../sequencer";

export const handleBid = async (signedBid: SignedBid, _requestContext: RequestContext): Promise<any> => {
  const {
    logger,
    chainData,
    adapters: { chainreader, cache, subgraph },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(handleBid.name, _requestContext);
  logger.info("Method start: handleBid", requestContext, methodContext, { signedBid });

  const { bid } = signedBid;

  const originChainId = chainData.get(bid.data.params.originDomain)!.chainId;
  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const encodedData = getTxManagerInterface().encodeFunctionData("fulfill", [bid.data]);
  const destinationTransactionManagerAddress =
    config.chains[bid.data.params.destinationDomain].deployments.transactionManager;

  logger.info("Prepared data for sending", requestContext, methodContext, {
    encodedData,
    destinationTransactonManagerAddress: destinationTransactionManagerAddress,
    domain: bid.data.params.destinationDomain,
    signedBid,
  });

  // Validate the bid's fulfill call will succeed on chain.
  const gas = await chainreader.getGasEstimate(Number(bid.data.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationTransactionManagerAddress,
    data: encodedData,
  });

  logger.info("Estimated gas", requestContext, methodContext, {
    gas: gas.toString(),
  });

  // TODO: getPrepareTransaction to add prepareBlockNumber for validation and sanity check before choosing the best bid
  // const prepareTransaction = await subgraph.getTransaction(originChainId, bid.transactionId);

  await cache.auctions.storeBid(signedBid);

  logger.info("stored in cache", requestContext, methodContext, {
    signedBid,
  });
};
