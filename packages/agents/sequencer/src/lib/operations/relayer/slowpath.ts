import {
  RequestContext,
  ExecutorData,
  getChainIdFromDomain,
  createLoggingContext,
  ExecuteArgs,
  NxtpError,
  NATIVE_TOKEN,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { sendWithRelayerWithBackup, getEstimatedFee } from "../../../mockable";
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
  const relayerAddress = await relayers[0].instance.getRelayerAddress(destinationChainId);

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

  const { _args: args } = contracts.connext.decodeFunctionData("execute", executeEncodedData);

  const executeArgs: ExecuteArgs = args;

  const gasLimit = gas.add(200_000); // Add extra overhead for gelato
  const destinationRelayerProxyAddress = config.chains[transfer.xparams.destinationDomain].deployments.relayerProxy;
  let fee = BigNumber.from(0);
  try {
    fee = await getEstimatedFee(destinationChainId, NATIVE_TOKEN, gasLimit, true);
  } catch (e: unknown) {
    logger.warn("Error at Gelato Estimate Fee", requestContext, methodContext, {
      error: e as NxtpError,
      relayerProxyAddress: destinationRelayerProxyAddress,
      gasLimit: gasLimit.toString(),
      relayerFee: fee.toString(),
    });

    fee = gasLimit.mul(await chainreader.getGasPrice(domain, requestContext));
  }

  const encodedData = contracts.relayerProxy.encodeFunctionData("execute", [executeArgs, fee]);

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
