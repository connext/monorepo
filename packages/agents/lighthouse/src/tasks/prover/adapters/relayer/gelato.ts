import { createLoggingContext } from "@connext/nxtp-utils";
import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";

import { RelayerSendFailed } from "../../../../errors";
import { getGelatoRelayerAddress, isChainSupportedByGelato } from "../../../../mockable";
import { getContext } from "../../prover";

export const getRelayerAddress = async (chainId: number): Promise<string> => {
  const { logger } = getContext();
  const relayerAddress = await getGelatoRelayerAddress(chainId, logger);
  return relayerAddress;
};

export const send = async (chainId: number, destinationAddress: string, encodedData: string): Promise<string> => {
  const { logger, config } = getContext();
  const { requestContext, methodContext } = createLoggingContext(send.name);

  const isSupportedByGelato = await isChainSupportedByGelato(chainId);
  if (!isSupportedByGelato) {
    throw new Error("Chain not supported by gelato.");
  }

  const request = {
    chainId: chainId,
    target: destinationAddress,
    data: encodedData,
  };

  logger.info("Sending to Gelato network", requestContext, methodContext, request);

  const response = await GelatoRelaySDK.relayWithSponsoredCall(request, config.gelatoApiKey);

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, response);
    // TODO: replace this with transactionHash eventually
    return response.taskId;
  }
};
