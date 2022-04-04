import { Bid, BidSchema, RequestContext, createLoggingContext, BidStatus, ajv } from "@connext/nxtp-utils";

import { ParamsInvalid } from "../errors";
import { getContext } from "../../sequencer";

import { sendToRelayer } from "./relayer";

export const handleBid = async (bid: Bid, _requestContext: RequestContext): Promise<void> => {
  const {
    logger,
    chainData,
    adapters: { chainreader, cache, contracts },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(handleBid.name, _requestContext);
  logger.info(`Method start: ${handleBid.name}`, requestContext, methodContext, { bid });

  // Validate Input schema
  const validateInput = ajv.compile(BidSchema);
  const validInput = validateInput(bid);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      bid,
    });
  }

  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const encodedData = contracts.connext.encodeFunctionData("execute", [bid.data]);
  const destinationConnextAddress = config.chains[bid.data.params.destinationDomain].deployments.connext;

  logger.info("Prepared data for sending", requestContext, methodContext, {
    encodedData,
    destinationTransactonManagerAddress: destinationConnextAddress,
    domain: bid.data.params.destinationDomain,
    bid,
  });

  // Validate the bid's fulfill call will succeed on chain.
  const gas = await chainreader.getGasEstimate(Number(bid.data.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
  });

  logger.info("Estimated gas", requestContext, methodContext, {
    gas: gas.toString(),
  });
  const res = await cache.auctions.storeBid(bid);
  logger.info("Stored bid to cache", requestContext, methodContext, {
    res,
  });
  return;
};

let bidSelectionRound = 0;

export const bidSelection = async (_requestContext: RequestContext) => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bidSelection.name, _requestContext);

  bidSelectionRound++;
  logger.info(`Method start: ${bidSelection.name}`, requestContext, methodContext, { bidSelectionRound });

  // TODO: Fetch all the pending transactionIds from the cache.
  const transactionIds: string[] = await cache.auctions.getAllTransactionsIdsWithPendingBids();

  logger.info(`Transactions for selection`, requestContext, methodContext, {
    transactionIds,
    transactionIdsLength: transactionIds.length,
  });

  transactionIds.map(async (transactionId) => {
    const records = await cache.auctions.getBidsByTransactionId(transactionId);
    const random = Math.floor(Math.random() * records.length);
    const selectedBid = records[random];
    await sendToRelayer(selectedBid.payload, requestContext);
    await cache.auctions.updateAllBidsWithTransactionId(transactionId, BidStatus.Sent);
  });
};
