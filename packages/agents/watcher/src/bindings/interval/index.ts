import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { validateAndPause } from "../../operations/validateAndPause";
import { validateAndSwitch } from "../../operations/validateAndSwitch";
import { getContext } from "../../watcher";

export const bindInterval = async (): Promise<void> => {
  const { config, logger } = getContext();

  interval(async () => {
    const { requestContext, methodContext } = createLoggingContext("Interval");
    try {
      logger.info("Starting interval", requestContext, methodContext);
      await validateAndPause(requestContext);
      //TODO: Should this be a thing of its own, for separation of concerns
      await validateAndSwitch(requestContext);
      logger.info("Finished interval", requestContext, methodContext);
    } catch (err: unknown) {
      logger.error("Error in watcher interval!", requestContext, methodContext, jsonifyError(err as NxtpError));
    }
  }, config.interval);
};
