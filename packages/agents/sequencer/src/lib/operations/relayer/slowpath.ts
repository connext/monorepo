import { RequestContext, ExecutorData, getChainIdFromDomain, createLoggingContext } from "@connext/utils";

import { sendWithRelayerWithBackup } from "../../../mockable";
import { getContext } from "../../../sequencer";
import { MissingTransfer } from "../../errors";

export const sendExecuteSlowToRelayer = async (
  executorData: ExecutorData,
  _requestContext: RequestContext,
): Promise<{ taskId: string }> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader, relayers, cache },
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext(sendExecuteSlowToRelayer.name, _requestContext);
  logger.debug(`Method start: ${sendExecuteSlowToRelayer.name}`, requestContext, methodContext, { executorData });

  const { transferId, encodedData: executeEncodedData } = executorData;
  const transfer = await cache.transfers.getTransfer(transferId);
  if (!transfer) {
    throw new MissingTransfer({ transferId });
  }

  const destinationChainId = await getChainIdFromDomain(transfer.xparams.destinationDomain, chainData);
  const destinationConnextAddress = config.chains[transfer.xparams.destinationDomain].deployments.connext;

  return await sendWithRelayerWithBackup(
    destinationChainId,
    transfer.xparams.destinationDomain,
    destinationConnextAddress,
    executeEncodedData,
    relayers,
    chainreader,
    logger,
    _requestContext,
  );
};
