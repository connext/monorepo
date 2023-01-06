import { compare } from "compare-versions";
import {
  ExecutorData,
  RequestContext,
  createLoggingContext,
  ajv,
  ExecutorDataSchema,
  ExecStatus,
} from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import {
  ParamsInvalid,
  ExecutorVersionInvalid,
  ExecutorDataExpired,
  MissingXCall,
  MissingTransfer,
  MissingExecutorData,
  ExecuteSlowCompleted,
  NotEnoughRelayerFee,
} from "../../errors";
import { Message, MessageType } from "../../entities";
import { getOperations } from "..";
import { getHelpers } from "../../helpers";

export const storeSlowPathData = async (executorData: ExecutorData, _requestContext: RequestContext): Promise<void> => {
  const {
    logger,
    config,
    adapters: { cache, subgraph, mqClient },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(storeSlowPathData.name, _requestContext);
  logger.debug(`Method start: ${storeSlowPathData.name}`, requestContext, methodContext, { executorData });

  const { transferId, executorVersion, origin } = executorData;

  // Validate Input schema
  const validateInput = ajv.compile(ExecutorDataSchema);
  const validInput = validateInput(executorData);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      executorData,
    });
  }

  // check if executor version is compatible with hosted sequencer
  const checkVersion = compare(executorVersion, config.supportedVersion!, "<");
  if (checkVersion) {
    throw new ExecutorVersionInvalid({
      supportedVersion: config.supportedVersion,
      executorData,
    });
  }

  // Get the XCall from the subgraph for this transfer.
  const transfer = await subgraph.getOriginTransferById(origin, transferId);
  if (!transfer || !transfer.origin) {
    throw new MissingXCall(origin, transferId, {
      executorData,
    });
  }
  // Store the transfer locally. We will use this as a reference later when we execute this transfer
  // in the cycle, for both encoding data and passing relayer fee to the relayer.
  await cache.transfers.storeTransfers([transfer]);

  // Ensure that the executor data for this transfer hasn't expired.
  const status = await cache.executors.getExecStatus(transferId);
  if (status === ExecStatus.Completed) {
    throw new ExecuteSlowCompleted({ transferId });
  } else if (status === ExecStatus.None) {
    const message: Message = {
      transferId: transfer.transferId,
      originDomain: transfer.xparams!.originDomain,
      type: MessageType.ExecuteSlow,
    };

    await mqClient.publish(config.messageQueue.publisher!, {
      type: transfer.xparams!.originDomain,
      body: message,
      routingKey: transfer.xparams!.originDomain,
      persistent: true,
    });
    logger.info("Enqueued transfer", requestContext, methodContext, {
      message: message,
    });

    await cache.executors.setExecStatus(transferId, ExecStatus.Queued);
    await cache.executors.storeExecutorData(executorData);
    logger.info("Created a executor tx", requestContext, methodContext, { transferId, executorData });
  } else {
    // The executor data status here is Pending/Cancelled.
    // If Cancelled, fallback processor would work so lets just keep it storing
    // If Pending, the data needs to be stored in the cache as a backup item
    const res = await cache.executors.storeBackupData(executorData);
    logger.info("Stored a executor data in the backup cache", requestContext, methodContext, {
      executorData,
      result: res == 2 ? "Skipped" : "Saved",
    });
  }
};

/**
 * Send any slow-path data from the executor to the relayer directly once sanity checks passes
 * @param transferId - The transfer id you're gonna send
 * @param _requestContext - The parant request context instance
 */
export const executeSlowPathData = async (
  transferId: string,
  type: string,
  _requestContext: RequestContext,
): Promise<{ taskId: string | undefined }> => {
  const {
    logger,
    adapters: { cache },
  } = getContext();

  const {
    relayer: { sendExecuteSlowToRelayer },
  } = getOperations();

  const {
    relayerfee: { canSubmitToRelayer },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(storeSlowPathData.name, _requestContext);
  logger.debug(`Method start: ${executeSlowPathData.name}`, requestContext, methodContext, { transferId, type });

  const transfer = await cache.transfers.getTransfer(transferId);
  if (!transfer) {
    throw new MissingTransfer({ transferId });
  }

  const executorData = await cache.executors.getExecutorData(transferId);
  if (!executorData) {
    throw new MissingExecutorData({ transfer });
  }

  // Ensure that the executor data for this transfer hasn't expired.
  const status = await cache.executors.getExecStatus(transferId);
  if (status !== ExecStatus.Queued) {
    throw new ExecutorDataExpired(status, {
      transferId,
      executorData,
    });
  }

  const { canSubmit, needed } = await canSubmitToRelayer(transfer);
  if (!canSubmit) {
    throw new NotEnoughRelayerFee({ transferId, relayerFee: transfer.origin?.relayerFee, needed });
  }

  let taskId: string | undefined;
  try {
    const result = await sendExecuteSlowToRelayer(executorData, requestContext);
    taskId = result.taskId;
  } catch (error: unknown) {
    // TODO: If the first slow-liq transfer fails, we'll try to send backup data one by one
    // If any of backup data succeeds, we'll make the data status `sent`.
    // If all of them also fail, we'll reset all the data for a given transferId
    const backupSlowTxs = await cache.executors.getBackupData(transferId);
    logger.debug("Running a fallback mechanism", requestContext, methodContext, { transferId, backupSlowTxs });
    for (const backupSlowTx of backupSlowTxs) {
      const result = await sendExecuteSlowToRelayer(backupSlowTx, requestContext);
      taskId = result.taskId;
      if (taskId) break;
    }
  }
  if (taskId) {
    await cache.executors.setExecStatus(transferId, ExecStatus.Completed);
    await cache.executors.upsertMetaTxTask({ transferId, taskId });
  } else {
    // Prunes all the executor data for a given transferId
    await cache.executors.pruneExecutorData(transferId);
  }

  return { taskId };
};
