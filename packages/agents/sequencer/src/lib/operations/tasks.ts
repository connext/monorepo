import { createLoggingContext, ExecStatus, RelayerTaskStatus } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";
import { MessageType } from "../entities";

export const updateTask = async (transferId: string, messageType: MessageType): Promise<void> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateTask.name);
  const status = RelayerTaskStatus.ExecSuccess;
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
    // TODO: Set based on RelayerTaskStatus
    // Currently RelayerTaskStatus is not available.
    // Transfer satus should only be set to ExecStatus.Completed,
    //   when subgraph has destination status for this transfer
    // Always set to ExecStatus.Sent in fastpath, as relayer hand-off does not guarantee completion.
    status = ExecStatus.Sent;
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
