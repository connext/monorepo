import { RequestContext, createLoggingContext, BidData } from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { GelatoSendFailed } from "../errors";
import { getContext } from "../../sequencer";
import { getHelpers } from "../helpers";

export const sendToRelayer = async (
  selectedRouters: string[],
  bidData: BidData,
  _requestContext: RequestContext,
): Promise<string> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader },
  } = getContext();
  const {
    auctions: { encodeExecuteFromBid },
    relayer: { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(sendToRelayer.name, _requestContext);
  logger.info(`Method start: ${sendToRelayer.name}`, requestContext, methodContext, { bidData });

  const destinationChainId = chainData.get(bidData.params.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[bidData.params.destinationDomain].deployments.connext;

  const encodedData = encodeExecuteFromBid(selectedRouters, bidData);

  const isSupportedByGelato = await isChainSupportedByGelato(destinationChainId);
  if (!isSupportedByGelato) {
    throw new Error("Chain not supported by gelato.");
  }

  // Validate the bid's fulfill call will succeed on chain.
  const relayerAddress = await getGelatoRelayerAddress(destinationChainId, logger);
  logger.debug("Got relayer address", requestContext, methodContext, {
    relayerAddress,
  });

  logger.info("Getting gas estimate", requestContext, methodContext, {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
  });

  const gas = await chainreader.getGasEstimateWithRevertCode(Number(bidData.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
  });

  logger.info("Estimated gas", requestContext, methodContext, {
    gas: gas.toString(),
  });

  logger.info("Sending to Gelato network", requestContext, methodContext, {
    encodedData,
    destinationConnextAddress,
    domain: bidData.params.destinationDomain,
  });
  const result = await gelatoSend(
    destinationChainId,
    destinationConnextAddress,
    encodedData,
    bidData.local,
    bidData.feePercentage,
  );
  if ((result as AxiosError).isAxiosError) {
    throw new GelatoSendFailed({ result });
  } else {
    const { taskId } = result;
    logger.info("Sent to Gelato network", requestContext, methodContext, {
      result,
      taskId,
      // response: response.data,
    });
    return taskId;
  }

  // const response = await axios.get(formatUrl(gelatoRelayEndpoint, "tasks", result.taskId));
  // TODO: check response, if it didn't work, send the next!
};
