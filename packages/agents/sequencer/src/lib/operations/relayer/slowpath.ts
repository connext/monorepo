import { RequestContext, ExecutorData, getChainIdFromDomain, createLoggingContext } from "@connext/nxtp-utils";

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
    adapters: { contracts, chainreader, relayers, cache },
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

  const [args] = contracts.connext.decodeFunctionResult("execute", executeEncodedData);

  const encodedData = contracts.relayerProxy.encodeFunctionData("execute", [args, gas]);

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
