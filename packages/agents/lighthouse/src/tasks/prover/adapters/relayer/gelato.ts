import { createLoggingContext } from "@connext/nxtp-utils";

import { RelayerSendFailed } from "../../../../errors";
import {
  getGelatoRelayerAddress,
  isChainSupportedByGelato,
  getTransactionHashFromGelato,
  gelatoSDKSend,
} from "../../../../mockable";
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

  const response = await gelatoSDKSend(request, config.gelatoApiKey, {}, logger);

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, response);
    return response.taskId;
  }
};

export const getTransactionHash = async (taskId: string): Promise<string> => {
  const { logger } = getContext();
  const transactionHash = await getTransactionHashFromGelato(taskId, logger);
  return transactionHash;
};
