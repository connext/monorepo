import {
  RequestContext,
  createLoggingContext,
  ExecutorData,
  getChainIdFromDomain,
  RelayerType,
} from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { MissingTransfer } from "../../errors";
import { getHelpers } from "../../helpers";

export const sendExecuteSlowToRelayer = async (
  executorData: ExecutorData,
  _requestContext: RequestContext,
): Promise<{ taskId: string; relayer: RelayerType }> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader, relayer, cache },
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext(sendExecuteSlowToRelayer.name, _requestContext);

  const {
    relayer: { connextRelayerSend },
  } = getHelpers();

  const { transferId, relayerFee, encodedData } = executorData;
  const transfer = await cache.transfers.getTransfer(transferId);
  if (!transfer) {
    throw new MissingTransfer({ transferId });
  }

  const originChainId = await getChainIdFromDomain(transfer.xparams.originDomain, chainData);
  const destinationChainId = await getChainIdFromDomain(transfer.xparams.destinationDomain, chainData);
  const destinationConnextAddress = config.chains[transfer.xparams.destinationDomain].deployments.connext;

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
      return { taskId, relayer: RelayerType.BackupRelayer };
    } catch (error: unknown) {
      logger.warn("Failed to send meta transaction to Connext relayer", requestContext, methodContext, {
        transferId: transfer.transferId,
        error,
      });
    }
  }

  // Validate the call will succeed on chain.
  const relayerAddress = await relayer.getRelayerAddress(destinationChainId);

  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
    transferId: transfer.transferId,
  });
  const gas = await chainreader.getGasEstimateWithRevertCode(Number(transfer.xparams.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
  });

  logger.info("Sending meta tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    connext: destinationConnextAddress,
    domain: transfer.xparams.destinationDomain,
    gas: gas.toString(),
    relayerFee,
    transferId: transfer.transferId,
  });

  const taskId = await relayer.send(destinationChainId, destinationConnextAddress, encodedData, _requestContext);
  return { taskId, relayer: RelayerType.Gelato };
};
