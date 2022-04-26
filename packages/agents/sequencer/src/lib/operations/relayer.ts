import { RequestContext, createLoggingContext, XTransfer } from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { GelatoSendFailed } from "../errors";
import { getContext } from "../../sequencer";
import { getHelpers } from "../helpers";

export const sendToRelayer = async (
  routers: string[],
  transfer: XTransfer,
  relayerFee: {
    asset: string;
    amount: string;
  },
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
  logger.info(`Method start: ${sendToRelayer.name}`, requestContext, methodContext, { transfer });

  const destinationChainId = chainData.get(transfer.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[transfer.destinationDomain].deployments.connext;

  const encodedData = encodeExecuteFromBid(routers, transfer);

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

  const gas = await chainreader.getGasEstimateWithRevertCode(Number(transfer.destinationDomain), {
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
    domain: transfer.destinationDomain,
  });
  const result = await gelatoSend(
    destinationChainId,
    destinationConnextAddress,
    encodedData,
    relayerFee.asset,
    relayerFee.amount,
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
