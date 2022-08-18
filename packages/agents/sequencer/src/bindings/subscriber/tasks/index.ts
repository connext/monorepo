import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getOperations } from "../../../lib/operations";
import { getContext } from "../../../sequencer";

const DEFAULT_POLL_INTERAL = 1_000;

export const bindTasks = async (_pollInterval?: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindTasks.name);
  const {
    tasks: { updateTasks },
  } = getOperations();
  const pollInterval = _pollInterval ?? DEFAULT_POLL_INTERAL;
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        await updateTasks();
      } catch (e: unknown) {
        logger.error(
          "Error binding tasks, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
      }
    }
  }, pollInterval);
};
