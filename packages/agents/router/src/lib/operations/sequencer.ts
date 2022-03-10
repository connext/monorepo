import { createLoggingContext, SignedBid, NxtpError, formatUrl } from "@connext/nxtp-utils";
import axios, { AxiosResponse } from "axios";

import { AppContext } from "../../context";

export const sendBid = async (context: AppContext, bid: SignedBid): Promise<any> => {
  const { requestContext, methodContext } = createLoggingContext(sendBid.name);
  const { logger, config } = context;

  /// TODO don't send the signature in logs, edit bid during logging
  logger.info("Method start", requestContext, methodContext, { bid });

  let response: AxiosResponse<string> = await axios.post(formatUrl(config.sequencerUrl, "bid"), {
    bid,
  });
  
  if (!response) {
    throw new NxtpError("error sendBid", { response });
  } else {
    return response.data;
  }
};