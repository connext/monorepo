import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { RelayerSendFailed } from "../../lib/errors";
import { getHelpers } from "../../lib/helpers";
import { getContext } from "../../lighthouse";

export const send = async (
  chainId: number,
  destinationAddress: string,
  encodedData: string,
  _requestContext: RequestContext,
): Promise<string> => {
  const { logger } = getContext();
  const {
    relayer: { gelatoSend, isChainSupportedByGelato },
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
