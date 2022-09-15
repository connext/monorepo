import { spawn } from "child_process";

import { ExecStatus, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { Message } from "../../../lib/entities";

export const bindSubscriber = async (queueName: string) => {
  const {
    logger,
    config,
    adapters: { cache, mqClient },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindSubscriber.name, undefined, "");
  logger.info("Binding subscriber for queue", requestContext, methodContext, { queue: queueName });
  try {
    // Spawn job handler
    mqClient.handle(queueName, async function (msg) {
      try {
        const termSignals: NodeJS.Signals[] = ["SIGTERM", "SIGINT"];
        const message: Message = msg.body as Message;

        // No ack and requeue if message has no trasfer id
        if (!message.transferId) {
          logger.error("Message has no transfer ID", requestContext, methodContext, undefined, {
            queue: queueName,
            message: msg,
          });
          return;
        }

        requestContext.transferId = message.transferId;

        logger.debug("Spawning executer for transfer", requestContext, methodContext, msg.body);

        const child = spawn(process.argv[0], ["dist/executer.js", message.transferId, message.type], {
          timeout: config.messageQueue.executerTimeout,
        });

        child.stdout.on("data", (data) => {
          console.log(`${data}`);
        });

        child.stderr.on("data", (data) => {
          console.log(`${data}`);
        });

        child.on("exit", async (code, signal) => {
          logger.debug("Executer exited", requestContext, methodContext, {
            transferId: message.transferId,
            code: code,
            signal: signal,
          });
          if ((code == null || code == 0) && (signal == null || termSignals.includes(signal))) {
            // ACK on success
            // Validate transfer is sent to relayer before ACK
            const status = await cache.auctions.getExecStatus(message.transferId);
            const task = await cache.auctions.getMetaTxTask(message.transferId);
            if ((task?.taskId && status == ExecStatus.Sent) || status == ExecStatus.Completed) {
              msg.ack();
              logger.info("Transfer ACKed", requestContext, methodContext, {
                transferId: message.transferId,
                auctionStatus: status,
              });
            } else {
              msg.reject();
              logger.info("Transfer Rejected", requestContext, methodContext, {
                transferId: message.transferId,
                auctionStatus: status,
              });
            }
          } else {
            // No ack and requeue if child exits with error
            msg.nack();
            logger.info("Error executing transfer. NACKed", requestContext, methodContext, {
              transferId: message.transferId,
            });
          }
        });
      } catch (error: any) {
        logger.error("Error for message !", requestContext, methodContext, jsonifyError(error as Error), {
          queue: queueName,
          message: msg,
        });
      }
    });
  } catch (e: unknown) {
    logger.error("Error while binding subscriber", requestContext, methodContext, jsonifyError(e as Error));
    mqClient.close();
  }
};
