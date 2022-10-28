import axios from "axios";

import { Logger } from "../logging";

export const sendHeartbeat = async (url: string, logger: Logger) => {
  const response = await axios.post(url);
  logger.info("Heartbeat sent", undefined, undefined, { response: response?.data });
  return response?.data;
};
