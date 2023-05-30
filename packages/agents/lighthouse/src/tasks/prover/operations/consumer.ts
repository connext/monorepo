import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  SparseMerkleTree,
  GELATO_RELAYER_ADDRESS,
  RequestContext,
} from "@connext/nxtp-utils";

import { NoDestinationDomainForProof, NoMessageRootProof, NoMessageProof } from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { HubDBHelper, SpokeDBHelper } from "../adapters";
import { getContext } from "../prover";

export type ProofStruct = {
  message: string;
  path: string[];
  index: number;
};
export type BrokerMessage = {
  messages: XMessage[];
  originDomain: string;
  destinationDomain: string;
  messageRoot: string;
  messageRootIndex: number;
  messageRootCount: number;
  aggregateRoot: string;
  aggregateRootCount: number;
};

const PROVER_QUEUE = "proverX";
const DEFAULT_PREFETCH_SIZE = 1;

export const consume = async () => {
  const { requestContext, methodContext } = createLoggingContext(consume.name);
  const {
    logger,
    adapters: { mqClient },
    config,
  } = getContext();
  const prefetchSize = config.messageQueue.prefetchSize ?? DEFAULT_PREFETCH_SIZE;
  const channel = await mqClient.createChannel();
  channel.prefetch(prefetchSize);
  await channel.assertExchange(config.messageQueue.exchange.name, config.messageQueue.exchange.type, {
    durable: config.messageQueue.exchange.durable,
  });

  await channel.assertQueue(PROVER_QUEUE, {
    durable: true,
    maxLength: config.messageQueue.queueLimit,
  });
  await channel.bindQueue(PROVER_QUEUE, config.messageQueue.exchange.name, PROVER_QUEUE);
  logger.info("Binding subscriber for queue", requestContext, methodContext, {
    queue: PROVER_QUEUE,
    exchange: config.messageQueue.exchange.name,
  });

  channel.consume(
    PROVER_QUEUE,
    async (message) => {
      if (message) {
        try {
          const brokerMessage = JSON.parse(message.content.toString()) as BrokerMessage;
          await processMessages(brokerMessage, requestContext);
          channel.ack(message);
        } catch (err: unknown) {
          logger.error("Processing messaages failed", requestContext, methodContext, undefined, { err });
          channel.reject(message);
        }
      }
    },
    { noAck: false },
  );
};

export const processMessages = async (brokerMessage: BrokerMessage, _requestContext: RequestContext) => {
  const {
    logger,
    adapters: { contracts, relayers, chainreader, database },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(processMessages.name, _requestContext);
  const {
    messages,
    originDomain,
    destinationDomain,
    messageRoot,
    messageRootIndex,
    messageRootCount,
    aggregateRoot,
    aggregateRootCount,
  } = brokerMessage;

  const spokeStore = new SpokeDBHelper(originDomain, messageRootCount + 1, database);
  const hubStore = new HubDBHelper("hub", aggregateRootCount, database);
  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

  const destinationSpokeConnector = config.chains[destinationDomain]?.deployments.spokeConnector;
  if (!destinationSpokeConnector) {
    throw new NoDestinationDomainForProof(destinationDomain);
  }

  // process messages
  const messageProofs: ProofStruct[] = [];
  for (const message of messages) {
    const messageProof: ProofStruct = {
      message: message.origin.message,
      path: await spokeSMT.getProof(message.origin.index),
      index: message.origin.index,
    };
    if (!messageProof.path) {
      throw new NoMessageProof(messageProof.index, message.leaf);
    }
    // Verify proof of inclusion of message in messageRoot.
    const messageVerification = spokeSMT.verify(message.origin.index, message.leaf, messageProof.path, messageRoot);
    if (messageVerification && messageVerification.verified) {
      logger.info("Message Verified successfully", requestContext, methodContext, {
        messageIndex: message.origin.index,
        leaf: message.leaf,
        messageRoot,
        messageVerification,
      });
    } else {
      logger.info("Message verification failed", requestContext, methodContext, {
        messageIndex: message.origin.index,
        leaf: message.leaf,
        messageRoot,
        messageVerification,
      });
      // Do not process message if proof verification fails.
      continue;
    }
    messageProofs.push(messageProof);
  }

  if (messageProofs.length === 0) {
    logger.info("Empty message proofs", requestContext, methodContext, {
      originDomain,
      destinationDomain,
    });
    return;
  }

  // Proof path for proving inclusion of messageRoot in aggregateRoot.
  const messageRootProof = await hubSMT.getProof(messageRootIndex);
  if (!messageRootProof) {
    throw new NoMessageRootProof(messageRootIndex, messageRoot);
  }
  // Verify proof of inclusion of messageRoot in aggregateRoot.
  const rootVerification = hubSMT.verify(messageRootIndex, messageRoot, messageRootProof, aggregateRoot);
  if (rootVerification && rootVerification.verified) {
    logger.info("MessageRoot Verified successfully", requestContext, methodContext, {
      messageRoot,
      aggregateRoot,
      messageRootProof,
      rootVerification,
    });
  } else {
    logger.info("MessageRoot verification failed", requestContext, methodContext, {
      messageRootIndex,
      messageRoot,
      aggregateRoot,
      messageRootProof,
      rootVerification,
    });
  }
  // Batch submit messages by destination domain
  try {
    const data = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      messageProofs,
      aggregateRoot,
      messageRootProof,
      messageRootIndex,
    ]);

    logger.info("Proving and processing messages", requestContext, methodContext, {
      destinationDomain,
      data,
      destinationSpokeConnector,
    });

    const proveAndProcessEncodedData = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      messageProofs,
      aggregateRoot,
      messageRootProof,
      messageRootIndex,
    ]);

    logger.debug("Proving and processing messages", requestContext, methodContext, {
      messages,
      proveAndProcessEncodedData,
      destinationSpokeConnector,
    });
    const chainId = chainData.get(destinationDomain)!.chainId;

    /// Temp: Using relayer proxy
    const domain = +destinationDomain;
    const relayerAddress = GELATO_RELAYER_ADDRESS; // hardcoded gelato address will always be whitelisted

    logger.info("Sending tx to relayer", requestContext, methodContext, {
      relayer: relayerAddress,
      spokeConnector: destinationSpokeConnector,
      domain,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const encodedData = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
      messageProofs,
      aggregateRoot,
      messageRootProof,
      messageRootIndex,
    ]);

    const { taskId } = await sendWithRelayerWithBackup(
      chainId,
      destinationDomain,
      destinationSpokeConnector,
      encodedData,
      relayers,
      chainreader,
      logger,
      requestContext,
    );
    logger.info("Proved and processed message sent to relayer", requestContext, methodContext, { taskId });
  } catch (err: unknown) {
    logger.error("Error sending proofs to relayer", requestContext, methodContext, jsonifyError(err as NxtpError));
  }
};
