import { createLoggingContext, ExecutorDataStatus } from "@connext/nxtp-utils";
import { GelatoTaskState } from "@connext/nxtp-utils/dist/types/relayer";
import { getContext } from "../../sequencer";
import { NoGelatoTask } from "../errors";
import { getHelpers } from "../helpers";

export const updateTask = async (transferId: string): Promise<ExecutorDataStatus> => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateTask.name);
  const {
    relayer: { getGelatoTaskStatus },
  } = getHelpers();
  logger.info("Method start", requestContext, methodContext, { transferId });
  const executorDataStatus = await cache.executors.getExecutorDataStatus(transferId);
  if (executorDataStatus !== ExecutorDataStatus.Sent) {
    throw new NoGelatoTask({ transferId });
  }
  const metaTxTask = await cache.executors.getTask(transferId);
  const taskId = metaTxTask?.taskId;
  let result = ExecutorDataStatus.Sent;
  if (taskId) {
    const taskStatus = await getGelatoTaskStatus(taskId);
    if (taskStatus === GelatoTaskState.ExecSuccess) {
      result = ExecutorDataStatus.Completed;
      await cache.executors.setExecutorDataStatus(transferId, ExecutorDataStatus.Completed);
      await cache.executors.pruneExecutorData(transferId);
    } else if (
      taskStatus === GelatoTaskState.Blacklisted ||
      taskStatus === GelatoTaskState.Cancelled ||
      taskStatus === GelatoTaskState.ExecReverted
    ) {
      result = ExecutorDataStatus.Cancelled;
      await cache.executors.setExecutorDataStatus(transferId, ExecutorDataStatus.Cancelled);
      await cache.executors.pruneExecutorData(transferId);
    }
  }

  return result;
};
