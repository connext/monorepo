import { RequestContext, createLoggingContext, Bid, OriginTransfer, NATIVE_TOKEN } from "@connext/nxtp-utils";

import { sendWithRelayerWithBackup, getEstimatedFee } from "../../../mockable";
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
    auctions: { encodeExecuteFromBids, encodeRelayerProxyExecuteFromBids },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(sendExecuteFastToRelayer.name, _requestContext);
  logger.debug(`Method start: ${sendExecuteFastToRelayer.name}`, requestContext, methodContext, { transfer });

  const destinationChainId = chainData.get(transfer.xparams.destinationDomain)!.chainId;

  const destinationConnextAddress = config.chains[transfer.xparams.destinationDomain].deployments.connext;

  const executeEncodedData = await encodeExecuteFromBids(round, bids, transfer, requestContext);

  /// Temp: Using relayer proxy
  const domain = +transfer.xparams.destinationDomain;
  const relayerAddress = await relayers[0].instance.getRelayerAddress(domain, logger);

  logger.debug("Getting gas estimate", requestContext, methodContext, {
    destinationChainId,
    to: destinationConnextAddress,
    data: executeEncodedData,
    from: relayerAddress,
  });

  const gas = await chainreader.getGasEstimateWithRevertCode(domain, {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: executeEncodedData,
    from: relayerAddress,
  });

  logger.info("Sending tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    connext: destinationConnextAddress,
    domain,
    gas: gas.toString(),
  });

  const gasLimit = gas.add(200_000); // Add extra overhead for gelato
  const fee = await getEstimatedFee(destinationChainId, NATIVE_TOKEN, gasLimit, true);
  const destinationRelayerProxyAddress = config.chains[transfer.xparams.destinationDomain].deployments.relayerProxy;
  const encodedData = await encodeRelayerProxyExecuteFromBids(round, bids, transfer, fee, requestContext);

  logger.info("Encoding for Relayer Proxy", requestContext, methodContext, {
    relayerProxyAddress: destinationRelayerProxyAddress,
    gasLimit: gasLimit.toString(),
    relayerFee: fee.toString(),
    relayerProxyEncodedData: encodedData,
  });

  return await sendWithRelayerWithBackup(
    destinationChainId,
    transfer.xparams.destinationDomain,
    destinationRelayerProxyAddress,
    encodedData,
    relayers,
    chainreader,
    logger,
    _requestContext,
  );
};
