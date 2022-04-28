import { BigNumber } from "ethers";
import { createLoggingContext, jsonifyError, RelayerTaskStatus } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getContext } from "../../relayer";

export const DEFAULT_POLL_INTERVAL = 1_000;

export const bindRelays = async (_pollInterval?: number) => {
  const { config } = getContext();
  const pollInterval = _pollInterval ?? DEFAULT_POLL_INTERVAL;
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await pollCache();
    }
  }, pollInterval);
};

export const pollCache = async () => {
  const {
    adapters: { cache, txservice },
    logger,
    chainToDomainMap,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(pollCache.name);

  // Retrieve all pending tasks.
  const pending = await cache.tasks.getPending();
  if (pending.length === 0) {
    return;
  }
  logger.debug("Retrieved pending tasks", requestContext, methodContext, { pending });

  // TODO: Organize by chain, execute async.
  for (const taskId of pending) {
    const task = await cache.tasks.getTask(taskId);
    if (!task) {
      // Sanity: task should exist.
      logger.warn("Task entry not found for task ID", requestContext, methodContext, { taskId });
      continue;
    }
    const status = await cache.tasks.getStatus(taskId);
    if (status !== RelayerTaskStatus.Pending) {
      // Sanity: task should be pending.
      // Possible in the event of a race while updating the cache.
      logger.debug("Task status was not pending task ID", requestContext, methodContext, { taskId });
      continue;
    }

    const { data, to, chain } = task;
    try {
      // Execute the calldata.
      const receipt = await txservice.sendTx(
        {
          chainId: chain,
          to,
          data,
          value: BigNumber.from("0"),
        },
        requestContext,
        chainToDomainMap.get(chain),
      );
      await cache.tasks.setHash(taskId, receipt.transactionHash);
      logger.info("Successfully sent transaction to network.", requestContext, methodContext, {
        chain,
        taskId,
        hash: receipt.transactionHash,
      });
    } catch (error: any) {
      // Save the error to the cache for this transfer. If the error was not previously recorded, log it.
      await cache.tasks.setError(taskId, JSON.stringify(error));
      logger.error("Error executing task", requestContext, methodContext, jsonifyError(error as Error), {
        chain,
        taskId,
        data,
      });
    }
  }
};
