import { createLoggingContext, getGelatoTaskStatus, ExecutorDataStatus } from "@connext/nxtp-utils";
import { GelatoTaskState } from "@connext/nxtp-utils/dist/types/relayer";
import { getContext } from "../../sequencer";

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
          await cache.executors.pruneExecutorData(transferId);
        }
      }
    }),
  );
};
