import { createLoggingContext, ExecStatus, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getOperations } from "../../../lib/operations";
import { getContext } from "../../../sequencer";

const DEFAULT_POLL_INTERAL = 1_000;

export const bindTask = async (transferId: string, _pollInterval?: number) => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindTask.name);
  const {
    tasks: { updateTask },
  } = getOperations();
  const pollInterval = _pollInterval ?? DEFAULT_POLL_INTERAL;
  let executorDataStatus = ExecStatus.None;
  interval(async () => {
    if (executorDataStatus === ExecStatus.Completed || executorDataStatus === ExecStatus.Cancelled) {
      process.exit();
    } else {
      try {
        executorDataStatus = await updateTask(transferId);
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
