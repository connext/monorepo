import {
  convertFromDbMessage,
  createLoggingContext,
  formatUrl,
  jsonifyError,
  NxtpError,
  XMessage,
} from "@connext/nxtp-utils";
import axios from "axios";

import { ApiRequestFailed } from "../../../../errors";
import { getContext } from "../../prover";

export const getUnProcessedMessages = async (): Promise<XMessage[]> => {
  const { requestContext, methodContext } = createLoggingContext(getUnProcessedMessages.name);
  const { logger, config } = getContext();

  const statusIdentifier = `processed=eq.false&order=index.asc`;
  const uri = formatUrl(config.cartographerUrl, "messages?", statusIdentifier);
  logger.debug("Getting messages from URI", requestContext, methodContext, { uri });
  try {
    const response = await axios.get(uri);
    return response.data.map(convertFromDbMessage);
  } catch (error: any) {
    throw new ApiRequestFailed({ uri, error: jsonifyError(error as NxtpError) });
  }
};
