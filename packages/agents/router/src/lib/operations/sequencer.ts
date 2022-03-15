import { createLoggingContext, Bid, formatUrl } from "@connext/nxtp-utils";
import axios, { AxiosResponse } from "axios";

import { getContext } from "../../router";
import { SequencerResponseInvalid } from "../errors";

export const sendBid = async (bid: Bid): Promise<any> => {
  const { requestContext, methodContext } = createLoggingContext(sendBid.name);
  const { logger, config } = getContext();

  /// TODO don't send the signature in logs, edit bid during logging
  logger.info("Method start", requestContext, methodContext, { bid });

  let response: AxiosResponse<string> = await axios.post(formatUrl(config.sequencerUrl, "bid"), {
    bid,
  });

  if (!response || !response.data) {
    throw new SequencerResponseInvalid({ response });
  } else {
    return response.data;
  }
};
