import { createLoggingContext, getGelatoTaskStatus, jsonifyError, ExecutorDataStatus } from "@connext/nxtp-utils";
import { GelatoTaskState } from "@connext/nxtp-utils/dist/types/relayer";
import interval from "interval-promise";

import { getContext } from "../../../sequencer";

const DEFAULT_POLL_INTERAL = 15_000;
export const bindTasks = async (_pollInterval?: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindTasks.name);
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

export const updateTasks = async () => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateTasks.name);
  logger.info("Method start", requestContext, methodContext);
  const pendingExecuteSlowTxs = await cache.executors.getSentTransfers();
  await Promise.all(
    pendingExecuteSlowTxs.map(async (transferId: string) => {
      const metaTxTask = await cache.executors.getTask(transferId);
      const taskId = metaTxTask?.taskId;
      if (taskId) {
        const taskStatus = await getGelatoTaskStatus(taskId);
        if (taskStatus === GelatoTaskState.ExecSuccess) {
          await cache.executors.setExecutorDataStatus(transferId, ExecutorDataStatus.Completed);
          await cache.executors.pruneLighthouseData(transferId);
        }
      }
    }),
  );
};
