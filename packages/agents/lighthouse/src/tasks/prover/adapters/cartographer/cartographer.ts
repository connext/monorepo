import {
  convertFromDbMessage,
  convertFromDbSentRootMessage,
  convertFromDbProcessedRootMessage,
  createLoggingContext,
  formatUrl,
  jsonifyError,
  NxtpError,
  XMessage,
  SentRootMessage,
  ProcessedRootMessage,
} from "@connext/nxtp-utils";
import { AxiosError } from "axios";

import { ApiRequestFailed } from "../../../../errors";
import { axiosGet } from "../../../../mockable";
import { getContext } from "../../prover";

export const getUnProcessedMessages = async (): Promise<XMessage[]> => {
  const { requestContext, methodContext } = createLoggingContext(getUnProcessedMessages.name);
  const { logger, config } = getContext();

  const statusIdentifier = `processed=eq.false&order=index.asc`;
  const uri = formatUrl(config.cartographerUrl, "messages?", statusIdentifier);
  logger.debug("Getting messages from URI", requestContext, methodContext, { uri });
  try {
    const response = await axiosGet(uri);
    if ((response as unknown as AxiosError).isAxiosError) {
      throw new ApiRequestFailed({ response });
    }
    return response.data.map(convertFromDbMessage);
  } catch (error: any) {
    throw new ApiRequestFailed({ uri, error: jsonifyError(error as NxtpError) });
  }
};

export const getSentRootMessages = async (): Promise<SentRootMessage[]> => {
  const { requestContext, methodContext } = createLoggingContext(getSentRootMessages.name);
  const { logger, config } = getContext();

  const statusIdentifier = `order=block_number.asc`;
  const uri = formatUrl(config.cartographerUrl, "sent_root_messages?", statusIdentifier);
  logger.debug("Getting messages from URI", requestContext, methodContext, { uri });
  try {
    const response = await axiosGet(uri);
    if ((response as unknown as AxiosError).isAxiosError) {
      throw new ApiRequestFailed({ response });
    }
    return response.data.map(convertFromDbSentRootMessage);
  } catch (error: any) {
    throw new ApiRequestFailed({ uri, error: jsonifyError(error as NxtpError) });
  }
};

export const getProcessedRootMessages = async (): Promise<ProcessedRootMessage[]> => {
  const { requestContext, methodContext } = createLoggingContext(getProcessedRootMessages.name);
  const { logger, config } = getContext();

  const statusIdentifier = `order=block_number.asc`;
  const uri = formatUrl(config.cartographerUrl, "processed_root_messages?", statusIdentifier);
  logger.debug("Getting messages from URI", requestContext, methodContext, { uri });
  try {
    const response = await axiosGet(uri);
    if ((response as unknown as AxiosError).isAxiosError) {
      throw new ApiRequestFailed({ response });
    }
    return response.data.map(convertFromDbProcessedRootMessage);
  } catch (error: any) {
    throw new ApiRequestFailed({ uri, error: jsonifyError(error as NxtpError) });
  }
};
