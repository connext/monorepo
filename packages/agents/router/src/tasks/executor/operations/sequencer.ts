import { constants } from "ethers";
import {
  RequestContext,
  createLoggingContext,
  ExecuteArgs,
  jsonifyError,
  NxtpError,
  formatUrl,
  getChainIdFromDomain,
  ExecutorPostDataRequest,
} from "@connext/nxtp-utils";

import { getContext } from "../executor";
// @ts-ignore
import { version } from "../../../../package.json";
import { axiosPost } from "../../../mockable";

export const sendExecuteSlowToSequencer = async (
  args: ExecuteArgs,
  encodedData: string,
  transferId: string,
  _requestContext: RequestContext,
): Promise<void> => {
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader },
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext(sendExecuteSlowToSequencer.name, _requestContext);
  logger.debug(`Method start: ${sendExecuteSlowToSequencer.name}`, requestContext, methodContext, { args });

  const destinationChainId = await getChainIdFromDomain(args.params.destinationDomain, chainData);
  const destinationConnextAddress = config.chains[args.params.destinationDomain].deployments.connext;

  const relayerFee = {
    amount: "0",
    // TODO: should handle relayer fee paid in alternative assets once that is implemented.
    asset: constants.AddressZero,
  };

  // Validate the bid's fulfill call will succeed on chain.
  // note: using gelato's relayer address since it will be whitelisted everywhere
  // another note: we are using the old system, but new system will have this relayer whitelisted still
  // const relayerAddress = GELATO_RELAYER_ADDRESS;

  // TEMP: Relayer proxy
  const relayerProxyAddress = config.chains[args.params.destinationDomain].deployments.relayerProxy;
  const relayerAddress = relayerProxyAddress;

  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
    from: relayerAddress,
    transferId: transferId,
  });

  try {
    const gas = await chainreader.getGasEstimateWithRevertCode(Number(args.params.destinationDomain), {
      chainId: destinationChainId,
      to: destinationConnextAddress,
      data: encodedData,
      from: relayerAddress,
    });

    logger.info("Sending meta tx to sequencer", requestContext, methodContext, {
      relayer: relayerAddress,
      connext: destinationConnextAddress,
      domain: args.params.destinationDomain,
      gas: gas.toString(),
      relayerFee,
      transferId: transferId,
    });
  } catch (err: unknown) {
    logger.error("Failed to estimate gas,", requestContext, methodContext, jsonifyError(err as NxtpError), {
      chainId: destinationChainId,
      to: destinationConnextAddress,
      data: encodedData,
      from: relayerAddress,
      transferId: transferId,
    });

    return;
  }

  const url = formatUrl(config.sequencerUrl, "execute-slow");
  const executorRequestData = {
    executorVersion: version,
    transferId,
    origin: args.params.originDomain,
    relayerFee,
    encodedData,
  };

  try {
    const response = await axiosPost<ExecutorPostDataRequest>(url, executorRequestData);

    if (!response || !response.data) {
      logger.info("Received bad response from the sequencer", requestContext, methodContext, executorRequestData);
    } else {
      logger.info(`Sent meta tx to the sequencer`, requestContext, methodContext, {
        relayer: relayerAddress,
        connext: destinationConnextAddress,
        domain: args.params.destinationDomain,
        relayerFee,
        result: response.data,
        transferId: transferId,
      });
    }
  } catch (err: unknown) {
    logger.error(
      "Sequencer POST request failed",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
      executorRequestData,
    );
  }
};
