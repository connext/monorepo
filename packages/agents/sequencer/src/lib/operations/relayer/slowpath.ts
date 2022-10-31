import { RequestContext, ExecutorData, getChainIdFromDomain, RelayerTaskStatus } from "@connext/nxtp-utils";

import { sendWithRelayerWithBackup } from "../../../mockable";
import { getContext } from "../../../sequencer";
import { MissingTransfer } from "../../errors";

export const sendExecuteSlowToRelayer = async (
  executorData: ExecutorData,
  _requestContext: RequestContext,
): Promise<{ taskId: string; taskStatus: RelayerTaskStatus }> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader, relayer, cache, backupRelayer },
  } = getContext();

  const { transferId, encodedData } = executorData;
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
    encodedData,
    relayer,
    config.gelatoApiKey,
    backupRelayer,
    config.gelatoApiKey,
    chainreader,
    logger,
    _requestContext,
  );
};
