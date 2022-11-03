import { RequestContext, createLoggingContext, Bid, OriginTransfer, RelayerTaskStatus } from "@connext/nxtp-utils";

import { sendWithRelayerWithBackup } from "../../../mockable";
import { getContext } from "../../../sequencer";
import { getHelpers } from "../../helpers";

export const sendExecuteFastToRelayer = async (
  round: number,
  bids: Bid[],
  transfer: OriginTransfer,
  _local: string,
  _requestContext: RequestContext,
): Promise<{ taskId: string }> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader, relayers },
  } = getContext();
  const {
    auctions: { encodeExecuteFromBids },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(sendExecuteFastToRelayer.name, _requestContext);
  logger.debug(`Method start: ${sendExecuteFastToRelayer.name}`, requestContext, methodContext, { transfer });

  const destinationChainId = chainData.get(transfer.xparams.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[transfer.xparams.destinationDomain].deployments.connext;

  const encodedData = await encodeExecuteFromBids(round, bids, transfer, requestContext);

  return await sendWithRelayerWithBackup(
    destinationChainId,
    transfer.xparams.destinationDomain,
    destinationConnextAddress,
    encodedData,
    relayers,
    chainreader,
    logger,
    _requestContext,
  );
};
