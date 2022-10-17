import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { RelayerSendFailed } from "../../lib/errors";
import { getHelpers } from "../../lib/helpers";
import { getContext } from "../../sequencer";

const GAS_LIMIT_FOR_RELAYER = 950_000;

export const getRelayerAddress = async (chainId: number): Promise<string> => {
  const { logger } = getContext();
  const {
    relayer: { getGelatoRelayerAddress },
  } = getHelpers();
  const relayerAddress = await getGelatoRelayerAddress(chainId, logger);
  return relayerAddress;
};

export const send = async (
  chainId: number,
  destinationAddress: string,
  encodedData: string,
  gelatoApiKey: string,
  _requestContext: RequestContext,
): Promise<string> => {
  const { logger } = getContext();
  const {
    relayer: { gelatoSDKSend, isChainSupportedByGelato },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(send.name, _requestContext);
  const isSupportedByGelato = await isChainSupportedByGelato(chainId);
  if (!isSupportedByGelato) {
    throw new Error("Chain not supported by gelato.");
  }

  logger.info("Sending to Gelato network", requestContext, methodContext, {
    encodedData,
    destinationAddress,
    chainId,
  });

  const request = {
    chainId: chainId,
    target: destinationAddress,
    data: encodedData,
  };

  const response = await gelatoSDKSend(
    request,
    gelatoApiKey,
    { gasLimit: BigNumber.from(GAS_LIMIT_FOR_RELAYER) },
    logger,
  );

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    const { taskId } = response;
    logger.info("Sent to Gelato network", requestContext, methodContext, {
      response,
      taskId,
      // response: response.data,
    });
    // TODO: replace this with transactionHash eventually
    return taskId;
  }
};
