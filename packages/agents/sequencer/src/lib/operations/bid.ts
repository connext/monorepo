import axios from "axios";
import {
  gelatoSend,
  isChainSupportedByGelato,
  SignedBid,
  RequestContext,
  createLoggingContext,
  formatUrl,
  gelatoRelayEndpoint,
} from "@connext/nxtp-utils";
import { getTxManagerInterface } from "@connext/nxtp-txservice";

import { sendToRelayer } from "./relayer";
import { AppContext } from "../../context";

export const handleBid = async (
  context: AppContext,
  signedBid: SignedBid,
  _requestContext: RequestContext,
): Promise<any> => {
  const {
    logger,
    chainData,
    adapters: { chainreader, cache },
    config,
  } = context;
  const { requestContext, methodContext } = createLoggingContext(handleBid.name, _requestContext);
  logger.info(`Method start: ${handleBid.name}`, requestContext, methodContext, { signedBid });

  const { bid } = signedBid;
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

  // const numBids = await cache.auctions.storeBid(signedBid);
  // if (numBids === 1) {
  //   logger.info("First bid for transaction, waiting before sending", requestContext, methodContext, {
  //     numBids,
  //     transactionId: bid.transactionId,
  //   });

  //   selectBestBid(context, bid.transactionId, requestContext);
  // }

  await sendToRelayer(context, signedBid, requestContext);
};

// export const selectBestBid = async (context: AppContext, transactionId: string, _requestContext: RequestContext) => {
//   const {
//     logger,
//     adapters: { chainreader, cache },
//   } = context;

//   const { requestContext, methodContext } = createLoggingContext(selectBestBid.name, _requestContext);
//   logger.info(`Method start: ${selectBestBid.name}`, requestContext, methodContext, { transactionId });

//   // this is the first bid
//   setTimeout(async () => {
//     const records = await cache.auctions.getBidsByTransactionId(transactionId);
//     const random = Math.floor(Math.random() * records.length);
//     const selectedBid = records[random];

//     await sendToRelayer(context, selectedBid, requestContext);
//   });
// };
