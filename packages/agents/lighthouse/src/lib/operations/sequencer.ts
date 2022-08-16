import { constants } from "ethers";
import {
  RequestContext,
  createLoggingContext,
  ExecuteArgs,
  jsonifyError,
  NxtpError,
  getChainIdFromDomain,
} from "@connext/nxtp-utils";
import { getContext } from "../../lighthouse";
import { getHelpers } from "../helpers";

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
    adapters: { chainreader, sequencer },
  } = getContext();

  const {
    relayer: { getGelatoRelayerAddress },
  } = getHelpers();

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
  const relayerAddress = await getGelatoRelayerAddress(destinationChainId);

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
      relayer: relayerAddress,
      connext: destinationConnextAddress,
      domain: args.params.destinationDomain,
      relayerFee,
      transferId: transferId,
    });
  }

  const result = await sequencer.send(transferId, args.params.originDomain, relayerFee, encodedData, _requestContext);
  logger.info(`Sent meta tx to the sequencer`, requestContext, methodContext, {
    relayer: relayerAddress,
    connext: destinationConnextAddress,
    domain: args.params.destinationDomain,
    relayerFee,
    result,
    transferId: transferId,
  });
};
