import Broker from "amqplib";
import { ExecStatus, XTransferErrorStatus, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { Message, MessageType } from "../../../lib/entities";
import { executeFastPathData, executeSlowPathData } from "../../../lib/operations/execute";
import { updateTask } from "../../../lib/operations/tasks";
import { NoBidsSent, NotEnoughRelayerFee, SlippageToleranceExceeded } from "../../../lib/errors";

export const bindSubscriber = async (queueName: string, channel: Broker.Channel) => {
  const {
    logger,
    adapters: { database, cache },
  } = getContext();
  const logginContext = createLoggingContext(bindSubscriber.name, undefined, "");
  logger.info("Binding subscriber for queue", logginContext.requestContext, logginContext.methodContext, {
    queue: queueName,
  });
  channel.consume(
    queueName,
    async function (consumeMessage) {
      if (consumeMessage) {
        const { transferId, type: messageType } = JSON.parse(consumeMessage.content.toString()) as Message;
        const { requestContext, methodContext } = createLoggingContext("Subscriber.consume", undefined, transferId);
        logger.info("Executing the transfer", requestContext, methodContext, { transferId, messageType });

        if (messageType === MessageType.ExecuteFast) {
          await cache.auctions.setExecStatus(transferId, ExecStatus.Dequeued);
        } else {
          await cache.executors.setExecStatus(transferId, ExecStatus.Dequeued);
        }

        try {
          const { taskId } =
            messageType === MessageType.ExecuteFast
              ? await executeFastPathData(transferId, requestContext)
              : await executeSlowPathData(transferId, messageType, requestContext);

          if (taskId) {
            await updateTask(transferId, messageType);
          } else {
            // Current execution failed without taskId or error
            // Should reset status to allow future attempts
            if (messageType === MessageType.ExecuteFast) {
              await cache.auctions.setExecStatus(transferId, ExecStatus.None);
            } else {
              await cache.executors.setExecStatus(transferId, ExecStatus.None);
            }
          }
          channel.ack(consumeMessage);
        } catch (error: any) {
          const errorObj = jsonifyError(error as Error);
          logger.error("Error executing:", requestContext, methodContext, errorObj);

          let errorName: XTransferErrorStatus = XTransferErrorStatus.ExecutionError;
          switch (errorObj.type) {
            case SlippageToleranceExceeded.name: {
              errorName = XTransferErrorStatus.LowSlippage;
              break;
            }
            case NotEnoughRelayerFee.name: {
              errorName = XTransferErrorStatus.LowRelayerFee;
              break;
            }
            case NoBidsSent.name: {
              errorName = XTransferErrorStatus.NoBidsReceived;
              break;
            }
          }
          try {
            await database.updateErrorStatus(transferId, errorName);
          } catch (e: unknown) {
            logger.error("Database error:updateErrorStatus", requestContext, methodContext, undefined, {
              transferId,
              error: e,
            });
          }

          // increase backoff in case error is one of slippage or relayer fee
          if (messageType === MessageType.ExecuteSlow) {
            try {
              await database.increaseBackoff(transferId);
            } catch (e: unknown) {
              logger.error("Database error:increaseBackoff", requestContext, methodContext, undefined, {
                transferId,
                error: e,
              });
            }
          }

          channel.reject(consumeMessage, false);
        }
      }
    },
    { noAck: false },
  );
};
