import { spawn } from "child_process";

import interval from "interval-promise";
import Broker from "amqplib";
import { ExecStatus, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../../sequencer";
import { Message, MessageType } from "../../../lib/entities";

let numberOfChild = 0;
export const bindSubscriber = async (queueName: string, channel: Broker.Channel) => {
  const {
    logger,
    config: {
      executer: { batchSize, waitPeriod, maxChildCount },
    },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindSubscriber.name, undefined, "");
  logger.info("Binding subscriber for queue", requestContext, methodContext, { queue: queueName });
  interval(async () => {
    if (numberOfChild < maxChildCount) {
      logger.debug("Trying to pull data from the queue", requestContext, methodContext, { waitPeriod });
      try {
        const messages: Broker.GetMessage[] = [];
        for (let i = 0; i < batchSize; i++) {
          const message = await channel.get(queueName, { noAck: false });
          if (!message) {
            break;
          } else {
            messages.push(message);
          }
        }

        if (messages.length > 0) {
          await batchExecute(messages, channel);
        }
      } catch (e: unknown) {
        logger.error("Error while binding subscriber", requestContext, methodContext, jsonifyError(e as Error));
      }
    } else {
      logger.debug("Waiting until the other child process completed", requestContext, methodContext, {
        numberOfChild,
        maxChildCount,
      });
    }
  }, waitPeriod);
};

const batchExecute = async (brokerMessages: Broker.GetMessage[], channel: Broker.Channel) => {
  const {
    logger,
    config,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(batchExecute.name, undefined, "");
  const termSignals: NodeJS.Signals[] = ["SIGTERM", "SIGINT"];
  const messages: Message[] = brokerMessages.map(
    (brokerMessage) => JSON.parse(brokerMessage.content.toString()) as Message,
  );
  // messages: Message[]
  /// Mark - Executer
  // if message.transferId, then call executer with it's type either Fast or Slow
  logger.debug("Spawning executer for transfers", requestContext, methodContext, {
    msgs: messages,
  });
  const batchTransfers: Record<string, string> = {};
  for (const _message of messages) {
    batchTransfers[_message.transferId] = _message.type;
  }

  const child = spawn(process.argv[0], ["dist/executer.js", JSON.stringify(batchTransfers)], {
    timeout: config.messageQueue.executerTimeout,
  });
  logger.info("Spawned child", requestContext, methodContext, child);
  child.on("spawn", async () => {
    numberOfChild++;
    logger.info("Child Spawn Event", requestContext, methodContext, {
      transfers: Object.keys(batchTransfers),
    });
  });
  child.on("error", async (err) => {
    logger.info("Child error", requestContext, methodContext, {
      transfers: Object.keys(batchTransfers),
      error: err,
    });
  });

  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`${data}`);
  });

  child.on("exit", async (code, signal) => {
    numberOfChild--;
    logger.debug("Executer exited", requestContext, methodContext, {
      transfers: Object.keys(batchTransfers),
      code: code,
      signal: signal,
    });
    if ((code == null || code == 0) && (signal == null || termSignals.includes(signal))) {
      // ACK on success
      // Validate transfer is sent to relayer before ACK
      await Promise.all(
        brokerMessages.map(async (brokerMessage) => {
          const message = JSON.parse(brokerMessage.content.toString()) as Message;
          const dataCache = message.type === MessageType.ExecuteFast ? cache.auctions : cache.executors;
          const status = await dataCache.getExecStatus(message.transferId);
          const task = await dataCache.getMetaTxTask(message.transferId);
          if ((task?.taskId && status == ExecStatus.Sent) || status == ExecStatus.Completed) {
            logger.info("Transfer ACKed", requestContext, methodContext, {
              transferId: message.transferId,
              status,
            });
            channel.ack(brokerMessage);
          } else {
            logger.info("Transfer Rejected", requestContext, methodContext, {
              transferId: message.transferId,
              status,
            });
            channel.reject(brokerMessage);
          }
          if (message.type === MessageType.ExecuteFast) {
            await cache.auctions.pruneAuctionData(message.transferId);
            await cache.auctions.setExecStatus(message.transferId, ExecStatus.None);
          } else {
            await cache.executors.pruneExecutorData(message.transferId);
          }
        }),
      );
    } else {
      await Promise.all(
        brokerMessages.map(async (brokerMessage) => {
          const message = JSON.parse(brokerMessage.content.toString()) as Message;
          if (message.type === MessageType.ExecuteFast) {
            await cache.auctions.setExecStatus(message.transferId, ExecStatus.None);
          }
          channel.reject(brokerMessage);
          logger.info("Error executing transfer. Message dropped", requestContext, methodContext, {
            transferId: message.transferId,
          });
        }),
      );
    }
  });
};
