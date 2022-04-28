import { RequestContext, createLoggingContext, XTransfer, Bid } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";
import { getHelpers } from "../helpers";

export const sendToRelayer = async (
  bids: Bid[],
  transfer: XTransfer,
  _requestContext: RequestContext,
): Promise<string> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader, relayer },
  } = getContext();
  const {
    auctions: { encodeExecuteFromBids },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(sendToRelayer.name, _requestContext);
  logger.info(`Method start: ${sendToRelayer.name}`, requestContext, methodContext, { transfer });

  const destinationChainId = chainData.get(transfer.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[transfer.destinationDomain].deployments.connext;

  const encodedData = encodeExecuteFromBids(bids, transfer);

  // Validate the bid's fulfill call will succeed on chain.
  const relayerAddress = await relayer.getRelayerAddress(destinationChainId);

  logger.info("Getting gas estimate", requestContext, methodContext, {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
  });

  const gas = await chainreader.getGasEstimateWithRevertCode(Number(transfer.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
  });

  logger.info("Estimated gas", requestContext, methodContext, {
    gas: gas.toString(),
  });

  const taskId = await relayer.send(destinationChainId, destinationConnextAddress, encodedData, _requestContext);
  return taskId;

  // const response = await axios.get(formatUrl(gelatoRelayEndpoint, "tasks", result.taskId));
  // TODO: check response, if it didn't work, error!
};
