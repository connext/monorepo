import { createLoggingContext, ExecStatus, RelayerType, RelayerTaskStatus } from "@connext/nxtp-utils";
import { getContext } from "../../sequencer";
import { MessageType } from "../entities";
import { NoGelatoTask } from "../errors";
import { getHelpers } from "../helpers";

export const updateTask = async (
  transferId: string,
  status: RelayerTaskStatus,
  messageType: MessageType,
): Promise<ExecStatus> => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateTask.name);
  const {
    relayer: { getTaskStatusFromGelato },
  } = getHelpers();
  logger.info("Method start", requestContext, methodContext, { transferId });
  const executorDataStatus = await cache.executors.getExecStatus(transferId);
  if (executorDataStatus !== ExecStatus.Sent) {
    throw new NoGelatoTask({ transferId });
  }
  const metaTxTask = await cache.executors.getMetaTxTask(transferId);
  const taskId = metaTxTask?.taskId;
  let result = ExecStatus.Sent;
  if (taskId) {
    const taskStatus = await getTaskStatusFromGelato(taskId);
    if (taskStatus === RelayerTaskStatus.ExecSuccess) {
      result = ExecStatus.Completed;
      await cache.executors.setExecStatus(transferId, ExecStatus.Completed);
      await cache.executors.pruneExecutorData(transferId);
    } else if (
      taskStatus === RelayerTaskStatus.Blacklisted ||
      taskStatus === RelayerTaskStatus.Cancelled ||
      taskStatus === RelayerTaskStatus.ExecReverted
    ) {
      result = ExecStatus.Cancelled;
      await cache.executors.setExecStatus(transferId, ExecStatus.Cancelled);
      await cache.executors.pruneExecutorData(transferId);
    }
  }
  return result;
};

export const getTaskStatus = async (taskId: string, relayer: RelayerType): Promise<RelayerTaskStatus> => {
  const { config } = getContext();
  const {
    relayer: { getTaskStatusFromGelato, getTaskStatusFromBackupRelayer },
  } = getHelpers();
  let taskStatus = RelayerTaskStatus.NotFound;
  if (relayer === RelayerType.BackupRelayer) {
    if (!config.relayerUrl) throw new Error("No configured backup relayer endpoint");
    taskStatus = await getTaskStatusFromBackupRelayer(config.relayerUrl, taskId);
  } else if (relayer === RelayerType.Gelato) {
    taskStatus = await getTaskStatusFromGelato(taskId);
  }

  return taskStatus;
};
