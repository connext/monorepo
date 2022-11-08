import { Logger } from "../logging";

import { axiosPost } from "./axios";

export const sendHeartbeat = async (url: string, logger: Logger) => {
  const response = await axiosPost(url);
  logger.info("Heartbeat sent", undefined, undefined, { response: response?.data });
  return response?.data;
};
