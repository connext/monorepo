import { createLoggingContext, Logger, RequestContext } from "@connext/nxtp-utils";

import { RelayerSendFailed } from "../../errors";
import {
  getGelatoRelayerAddress,
  isChainSupportedByGelato,
  getTransactionHashFromGelato,
  gelatoSDKSend,
} from "../../mockable";

const GAS_LIMIT_FOR_RELAYER = "2000000";

export const getRelayerAddress = async (chainId: number, logger: Logger): Promise<string> => {
  const relayerAddress = await getGelatoRelayerAddress(chainId, logger);
  return relayerAddress;
};

export const send = async (
  chainId: number,
  destinationAddress: string,
  encodedData: string,
  gelatoApiKey: string,
  logger: Logger,
  _requestContext?: RequestContext,
): Promise<string> => {
  const { requestContext, methodContext } = createLoggingContext(send.name, _requestContext);

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

  const response = await gelatoSDKSend(request, gelatoApiKey, { gasLimit: GAS_LIMIT_FOR_RELAYER }, logger);

  if (!response) {
    throw new RelayerSendFailed({ response: response });
  } else {
    logger.info("Sent to Gelato network", requestContext, methodContext, response);
    return response.taskId;
  }
};

export const getTransactionHash = async (taskId: string, logger: Logger): Promise<string> => {
  const transactionHash = await getTransactionHashFromGelato(taskId, logger);
  return transactionHash;
};
