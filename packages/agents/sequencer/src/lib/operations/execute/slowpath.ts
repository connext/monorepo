import {
  ExecutorData,
  RequestContext,
  createLoggingContext,
  ExecStatus,
  jsonifyError,
  getNtpTimeSeconds,
} from "@connext/nxtp-utils";

import { getContext, SlippageErrorPatterns } from "../../../sequencer";
import {
  ExecutorDataExpired,
  MissingXCall,
  MissingTransfer,
  MissingExecutorData,
  ExecuteSlowCompleted,
  NotEnoughRelayerFee,
  SlippageToleranceExceeded,
  RelayerSendFailed,
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

  const { transferId, origin } = executorData;

  // Get the XCall from the subgraph for this transfer.
  const transfer = await subgraph.getOriginTransferById(origin, transferId);
  if (!transfer || !transfer.origin) {
    throw new MissingXCall(origin, transferId, {
      executorData,
    });
  }

  // Ensure that the executor data for this transfer hasn't expired.
  let status = await cache.executors.getExecStatus(transferId);
  if (status != ExecStatus.None) {
    const lastExecTime = await cache.executors.getExecStatusTime(transferId);
    const elapsed = (getNtpTimeSeconds() - lastExecTime) * 1000;
    if (elapsed > config.executionWaitTime) {
      logger.info("Executor merits retry", requestContext, methodContext, { transferId: transferId, status });
      // Publish this transferId to sequencer subscriber to retry execution
      status = ExecStatus.None;
      await cache.executors.setExecStatus(transferId, status);
    } else {
      logger.info("Transfer awaiting execution", requestContext, methodContext, {
        elapsed,
        waitTime: config.executionWaitTime,
        status,
      });
    }
  }

  if (status === ExecStatus.Completed) {
    throw new ExecuteSlowCompleted({ transferId });
  } else if (status === ExecStatus.None) {
    const message: Message = {
      transferId: transfer.transferId,
      originDomain: transfer.xparams!.originDomain,
      type: MessageType.ExecuteSlow,
    };

    const channel = await mqClient.createChannel();
    await channel.assertExchange(config.messageQueue.exchanges[0].name, config.messageQueue.exchanges[0].type, {
      durable: config.messageQueue.exchanges[0].durable,
    });

    // Set status before publish
    // Avoid a race condition where the message is consumed before the status is set
    // If publish fails we we will have bad state, but publish is HA so we should be fine
    await cache.executors.setExecStatus(transferId, ExecStatus.Enqueued);
    await cache.executors.storeExecutorData(executorData);
    // Store the transfer locally. We will use this as a reference later when we execute this transfer
    // in the cycle, for both encoding data and passing relayer fee to the relayer.
    await cache.transfers.storeTransfers([transfer]);
    channel.publish(
      config.messageQueue.exchanges[0].name,
      transfer.xparams!.originDomain,
      Buffer.from(JSON.stringify(message)),
    );
    await channel.close();

    logger.info("Enqueued transfer", requestContext, methodContext, {
      message: message,
    });

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
    adapters: { cache, database, subgraph },
  } = getContext();

  const {
    relayer: { sendExecuteSlowToRelayer },
  } = getOperations();

  const {
    relayerfee: { canSubmitToRelayer },
  } = getHelpers();

  const { requestContext, methodContext } = createLoggingContext(storeSlowPathData.name, _requestContext);
  logger.debug(`Method start: ${executeSlowPathData.name}`, requestContext, methodContext, { transferId, type });

  const executorData = await cache.executors.getExecutorData(transferId);
  if (!executorData) {
    await cache.executors.setExecStatus(transferId, ExecStatus.None);
    throw new MissingExecutorData({ transferId });
  }

  let transfer = await cache.transfers.getTransfer(transferId);
  if (!transfer) {
    // This can happen in a race between concurrent previous and current attempts that are inflight
    logger.error("Transfer data not found for transfer!", requestContext, methodContext, undefined, {
      transferId,
      executorData,
    });
    // Get the XCall from the subgraph for this transfer.
    transfer = await subgraph.getOriginTransferById(executorData.origin, transferId);
    if (!transfer || !transfer.origin) {
      await cache.executors.setExecStatus(transferId, ExecStatus.None);
      throw new MissingTransfer({ transferId });
    }
    await cache.transfers.storeTransfers([transfer]);
  }

  // Ensure that the executor data for this transfer hasn't expired.
  const status = await cache.executors.getExecStatus(transferId);
  if (status !== ExecStatus.Dequeued) {
    throw new ExecutorDataExpired(status, {
      transferId,
      executorData,
    });
  }

  const { canSubmit, needed } = await canSubmitToRelayer(transfer);
  if (!canSubmit) {
    await cache.executors.setExecStatus(transferId, ExecStatus.None);

    throw new NotEnoughRelayerFee({ transferId, relayerFees: transfer.origin?.relayerFees, needed });
  }

  let taskId: string | undefined;
  try {
    const result = await sendExecuteSlowToRelayer(executorData, requestContext);
    taskId = result.taskId;
  } catch (error: unknown) {
    const jsonError = jsonifyError(error as Error);
    const errorMessage = jsonError.context?.message ?? jsonError.message;
    if (errorMessage && SlippageErrorPatterns.some((i) => errorMessage.includes(i))) {
      throw new SlippageToleranceExceeded({ transfer, error: jsonError });
    }
    // TODO: If the first slow-liq transfer fails, we'll try to send backup data one by one
    // If any of backup data succeeds, we'll make the data status `sent`.
    // If all of them also fail, we'll reset all the data for a given transferId
    const backupSlowTxs = await cache.executors.getBackupData(transferId);
    logger.debug("Running a fallback mechanism", requestContext, methodContext, { transferId, backupSlowTxs });
    for (const backupSlowTx of backupSlowTxs) {
      try {
        const result = await sendExecuteSlowToRelayer(backupSlowTx, requestContext);
        taskId = result.taskId;
        if (taskId) break;
      } catch (error: unknown) {
        const jsonError = jsonifyError(error as Error);
        const errorMessage = jsonError.context?.message ?? jsonError.message;
        // break early if we catch slippage error
        if (errorMessage && SlippageErrorPatterns.some((i) => errorMessage.includes(i))) {
          throw new SlippageToleranceExceeded({ transfer, error: jsonError });
        }
        logger.warn("Failed to send a backup slow tx", requestContext, methodContext, {
          transferId,
          backupSlowTx,
          error: jsonError,
        });
      }
    }
  }
  if (taskId) {
    await cache.executors.setExecStatus(transferId, ExecStatus.Completed);
    await cache.executors.upsertMetaTxTask({ transferId, taskId });
    // reset error status
    if (transfer.origin) {
      transfer.origin.errorStatus = undefined;
      try {
        await database.saveTransfers([transfer]);
      } catch (err: unknown) {
        logger.error("Database error:saveTransfers", requestContext, methodContext, undefined, {
          error: err,
          transferId,
        });
      }
    }
  } else {
    // Prunes all the executor data for a given transferId
    await cache.executors.pruneExecutorData(transferId);
    throw new RelayerSendFailed({ transferId });
  }

  return { taskId };
};
