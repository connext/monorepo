import { RequestContext, createLoggingContext, XTransfer, Bid, connextRelayerSend } from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { GelatoSendFailed } from "../errors";
import { getContext } from "../../sequencer";
import { getHelpers } from "../helpers";

export const sendToRelayer = async (
  bids: Bid[],
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
    auctions: { encodeExecuteFromBids },
    relayer: { gelatoSend, isChainSupportedByGelato, getGelatoRelayerAddress },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(sendToRelayer.name, _requestContext);
  logger.debug(`Method start: ${sendToRelayer.name}`, requestContext, methodContext, { transfer });

  const originChainId = chainData.get(transfer.originDomain)!.chainId;
  const destinationChainId = chainData.get(transfer.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[transfer.destinationDomain].deployments.connext;

  const encodedData = encodeExecuteFromBids(bids, transfer);

  // Try sending the tx to the connext relayer, if configured.
  if (config.relayerUrl) {
    try {
      const result = await connextRelayerSend(config.relayerUrl, destinationChainId, {
        fee: {
          chain: originChainId,
          amount: relayerFee.amount,
          token: relayerFee.asset,
        },
        to: destinationConnextAddress,
        data: encodedData,
      });
      const { taskId } = result;
      logger.info("Sent meta transaction to Connext relayer", requestContext, methodContext, {
        taskId,
        transferId: transfer.transferId,
      });
      return taskId;
    } catch (error: unknown) {
      logger.warn("Failed to send meta transaction to Connext relayer", requestContext, methodContext, {
        transferId: transfer.transferId,
        error,
      });
    }
  }

  const isSupportedByGelato = await isChainSupportedByGelato(destinationChainId);
  if (!isSupportedByGelato) {
    throw new Error("Chain not supported by gelato.");
  }

  // Validate the bid's fulfill call will succeed on chain.
  const relayerAddress = await getGelatoRelayerAddress(destinationChainId, logger);

  logger.debug("Getting gas estimate", requestContext, methodContext, {
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

  logger.info("Sending meta tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    connext: destinationConnextAddress,
    domain: transfer.destinationDomain,
    gas: gas.toString(),
    relayerFee,
  });

  const result = await gelatoSend(destinationChainId, {
    dest: destinationConnextAddress,
    data: encodedData,
    token: relayerFee.asset,
    relayerFee: relayerFee.amount,
  });
  if ((result as AxiosError).isAxiosError) {
    throw new GelatoSendFailed({ result });
  } else {
    const { taskId } = result;
    logger.info("Sent meta transaction to Gelato network", requestContext, methodContext, {
      taskId,
    });
    return taskId;
  }
};
