import { createLoggingContext, ExecStatus, RelayerType, RelayerTaskStatus } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";
import { MessageType } from "../entities";
import { getHelpers } from "../helpers";

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

export const updateTask = async (
  transferId: string,
  status: RelayerTaskStatus,
  messageType: MessageType,
): Promise<void> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateTask.name);
  logger.info("Method start", requestContext, methodContext, { transferId, status, messageType });

  let execStatus = ExecStatus.Sent;
  if (status === RelayerTaskStatus.ExecSuccess) {
    execStatus = ExecStatus.Completed;
  } else if (
    status === RelayerTaskStatus.Blacklisted ||
    status === RelayerTaskStatus.Cancelled ||
    status === RelayerTaskStatus.ExecReverted
  ) {
    execStatus = ExecStatus.Cancelled;
  }

  if (messageType === MessageType.ExecuteFast) {
    await updateFastPathTask(transferId, execStatus);
  } else if (messageType === MessageType.ExecuteSlow) {
    await updateSlowPathTask(transferId, execStatus);
  }
};

export const updateFastPathTask = async (transferId: string, status: ExecStatus): Promise<void> => {
  const {
    adapters: { cache },
  } = getContext();
  const metaTxTask = await cache.auctions.getMetaTxTask(transferId);
  const taskId = metaTxTask?.taskId;
  if (taskId) {
    await cache.auctions.setExecStatus(transferId, status);
  }
};

export const updateSlowPathTask = async (transferId: string, status: ExecStatus): Promise<void> => {
  const {
    adapters: { cache },
  } = getContext();
  const metaTxTask = await cache.executors.getMetaTxTask(transferId);
  const taskId = metaTxTask?.taskId;
  if (taskId) {
    await cache.executors.setExecStatus(transferId, status);
    if (status === ExecStatus.Completed || status === ExecStatus.Cancelled) {
      await cache.executors.pruneExecutorData(transferId);
    }
  }
};
