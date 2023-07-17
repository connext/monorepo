import { RequestContext, createLoggingContext, Bid, OriginTransfer, GELATO_RELAYER_ADDRESS } from "@connext/nxtp-utils";

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
    adapters: { chainreader, relayers, database },
  } = getContext();
  const {
    auctions: { encodeExecuteFromBids },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(sendExecuteFastToRelayer.name, _requestContext);
  logger.debug(`Method start: ${sendExecuteFastToRelayer.name}`, requestContext, methodContext, { transfer });

  const destinationChainId = chainData.get(transfer.xparams.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[transfer.xparams.destinationDomain].deployments.connext;

  const executeEncodedData = await encodeExecuteFromBids(round, bids, transfer, requestContext);

  // Simulation data for Execute transfer
  const relayerFrom = GELATO_RELAYER_ADDRESS;

  try {
    await database.updateExecuteSimulationData(
      transfer.transferId,
      executeEncodedData,
      relayerFrom,
      destinationConnextAddress,
      String(destinationChainId),
    );
  } catch (err: unknown) {
    logger.error(`Database error:updateExecuteSimulationData`, requestContext, methodContext, undefined, {
      error: err,
    });
  }

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
