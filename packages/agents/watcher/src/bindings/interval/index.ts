import { createLoggingContext, jsonifyError, ConnextError } from "@connext/utils";
import interval from "interval-promise";

import { validateAndPause } from "../../operations/validateAndPause";
import { getContext } from "../../watcher";

export const bindInterval = async (): Promise<void> => {
  const { config, logger } = getContext();

  interval(async () => {
    const { requestContext, methodContext } = createLoggingContext("Interval");
    try {
      logger.info("Starting interval", requestContext, methodContext);
      await validateAndPause(requestContext);
      logger.info("Finished interval", requestContext, methodContext);
    } catch (err: unknown) {
      logger.error("Error in watcher interval!", requestContext, methodContext, jsonifyError(err as ConnextError));
    }
  }, config.interval);
};
