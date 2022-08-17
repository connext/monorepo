import { createLoggingContext, formatUrl, LightHousePostDataRequest, RequestContext } from "@connext/nxtp-utils";
import axios, { AxiosResponse } from "axios";

import { SequencerPostFailed, SequencerResponseInvalid } from "../../lib/errors";
import { getContext } from "../../lighthouse";
// @ts-ignore
import { version } from "../../../package.json";

export const send = async (
  transferId: string,
  origin: string,
  relayerFee: {
    amount: string;
    asset: string;
  },
  encodedData: string,
  _requestContext: RequestContext,
): Promise<any> => {
  const { logger, config } = getContext();

  const { requestContext, methodContext } = createLoggingContext(send.name, _requestContext);

  logger.info("Sending to the sequencer", requestContext, methodContext, {
    transferId,
    origin,
    relayerFee,
    encodedData,
  });

  const url = formatUrl(config.sequencerUrl, "execute-slow");
  try {
    const response = await axios.post<any, AxiosResponse<any, any>, LightHousePostDataRequest>(url, {
      executorVersion: version,
      transferId,
      origin,
      relayerFee,
      encodedData,
    });
    // Make sure response.data is valid.
    if (!response || !response.data) {
      throw new SequencerResponseInvalid({ response });
    }
    logger.info("Sent encoded data to sequencer", requestContext, methodContext, { data: response.data });
    return response.data;
  } catch (error: unknown) {
    throw new SequencerPostFailed({ error });
  }
};
