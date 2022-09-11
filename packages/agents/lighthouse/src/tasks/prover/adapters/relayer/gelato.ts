import { createLoggingContext } from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { RelayerSendFailed } from "../../../../errors";
import { getGelatoRelayerAddress, isChainSupportedByGelato, gelatoSend } from "../../../../mockable";
import { getContext } from "../../prover";

export const getRelayerAddress = async (chainId: number): Promise<string> => {
  const { logger } = getContext();
  const relayerAddress = await getGelatoRelayerAddress(chainId, logger);
  return relayerAddress;
};

export const send = async (chainId: number, destinationAddress: string, encodedData: string): Promise<string> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(send.name);

  const isSupportedByGelato = await isChainSupportedByGelato(chainId);
  if (!isSupportedByGelato) {
    throw new Error("Chain not supported by gelato.");
  }

  logger.info("Sending to Gelato network", requestContext, methodContext, {
    encodedData,
    destinationAddress,
    chainId,
  });

  const result = await gelatoSend(chainId, {
    dest: destinationAddress,
    data: encodedData,
    token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    relayerFee: "0",
  });

  if ((result as AxiosError).isAxiosError) {
    throw new RelayerSendFailed({ result });
  } else {
    const { taskId } = result;
    logger.info("Sent to Gelato network", requestContext, methodContext, {
      result,
      taskId,
      // response: response.data,
    });
    // TODO: replace this with transactionHash eventually
    return taskId;
  }
};
