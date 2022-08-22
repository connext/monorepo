import { createLoggingContext, ExecStatus } from "@connext/nxtp-utils";
import { GelatoTaskState } from "@connext/nxtp-utils/dist/types/relayer";
import { getContext } from "../../sequencer";
import { NoGelatoTask } from "../errors";
import { getHelpers } from "../helpers";

export const updateTask = async (transferId: string, taskId: string, status: GelatoTaskState): Promise<ExecStatus> => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateTask.name);
  const {
    relayer: { getGelatoTaskStatus },
  } = getHelpers();
  logger.info("Method start", requestContext, methodContext, { transferId });
  const executorDataStatus = await cache.executors.getExecStatus(transferId);
  if (executorDataStatus !== ExecStatus.Sent) {
    throw new NoGelatoTask({ transferId });
  }
  const metaTxTask = await cache.executors.getTask(transferId);
  const taskId = metaTxTask?.taskId;
  let result = ExecStatus.Sent;
  if (taskId) {
    const taskStatus = await getGelatoTaskStatus(taskId);
    if (taskStatus === GelatoTaskState.ExecSuccess) {
      result = ExecStatus.Completed;
      await cache.executors.setExecStatus(transferId, ExecStatus.Completed);
      await cache.executors.pruneExecutorData(transferId);
    } else if (
      taskStatus === GelatoTaskState.Blacklisted ||
      taskStatus === GelatoTaskState.Cancelled ||
      taskStatus === GelatoTaskState.ExecReverted
    ) {
      result = ExecStatus.Cancelled;
      await cache.executors.setExecStatus(transferId, ExecStatus.Cancelled);
      await cache.executors.pruneExecutorData(transferId);
    }
  }

  return result;
};
