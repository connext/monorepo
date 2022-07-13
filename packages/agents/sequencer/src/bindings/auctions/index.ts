import { spawn } from "child_process";

import Broker from "foo-foo-mq";
import { AuctionStatus, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../sequencer";
import { Message } from "../../lib/operations/mq";

export const bindSubscriber = async (queueName: string) => {
  const {
    logger,
    config,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindSubscriber.name);
  logger.info("Binding subscriber for queue", requestContext, methodContext, { queue: queueName });
  try {
    // Dequeue
    // Subscriber per domain
    // Spawn job handler
    // Fork node process
    // Configure per domain concurrency
    Broker.handle(queueName, async function (msg) {
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

        logger.debug("Spawning executer for message", requestContext, methodContext, msg.body);

        const child = spawn(process.argv[0], ["dist/executer.js", message.transferId], {
          timeout: config.messageQueue.executerTimeout,
        });

        child.stdout.on("data", (data) => {
          logger.debug(`${data}`);
        });

        child.stderr.on("data", (data) => {
          logger.debug(`${data}`);
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
            const status = await cache.auctions.getStatus(message.transferId);
            const task = await cache.auctions.getTask(message.transferId);
            if ((task?.taskId && status == AuctionStatus.Sent) || status == AuctionStatus.Executed) {
              msg.ack();
              logger.debug("Message ACKed", requestContext, methodContext, {
                transferId: message.transferId,
                auctionStatus: status,
              });
            } else {
              msg.nack();
              logger.debug("Message NACKed", requestContext, methodContext, {
                transferId: message.transferId,
                auctionStatus: status,
              });
            }
          } else {
            // No ack and requeue if child exits with error
            msg.nack();
            logger.debug("Message NACKed", requestContext, methodContext, {
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
    Broker.close();
  }
};
