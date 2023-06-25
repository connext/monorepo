import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  SparseMerkleTree,
  GELATO_RELAYER_ADDRESS,
  RequestContext,
  XMessage,
} from "@connext/nxtp-utils";

import {
  NoDestinationDomainForProof,
  NoMessageRootProof,
  NoMessageProof,
  MessageRootVerificationFailed,
} from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { HubDBHelper, SpokeDBHelper } from "../adapters";
import { getContext } from "../prover";

import { BrokerMessage, ProofStruct } from "./types";

export const processMessages = async (brokerMessage: BrokerMessage, _requestContext: RequestContext) => {
  const {
    logger,
    adapters: { contracts, relayers, chainreader, database, databaseWriter, cache },
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

  // First step. Mark messages as attempted
  for (const message of messages) {
    await cache.messages.increaseAttempt(message.leaf);
  }

  const provenMessages: XMessage[] = [];

  const spokeStore = new SpokeDBHelper(
    originDomain,
    messageRootCount + 1,
    {
      reader: database,
      writer: databaseWriter,
    },
    cache.messages,
  );
  const spokeSMT = new SparseMerkleTree(spokeStore);

  const hubStore = new HubDBHelper(
    "hub",
    aggregateRootCount,
    {
      reader: database,
      writer: databaseWriter,
    },
    cache.messages,
  );
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
      // Delete db and application caches
      // spokeStore.clearCache();

      // // Try again
      // const messageVerification = spokeSMT.verify(message.origin.index, message.leaf, messageProof.path, messageRoot);
      // if (messageVerification && messageVerification.verified) {
      //   logger.info("Message Verified successfully after clearCache", requestContext, methodContext, {
      //     messageIndex: message.origin.index,
      //     leaf: message.leaf,
      //     messageRoot,
      //     messageVerification,
      //   });
      // } else {
      //   logger.info("Message verification failed after clearCache", requestContext, methodContext, {
      //     messageIndex: message.origin.index,
      //     leaf: message.leaf,
      //     messageRoot,
      //     messageVerification,
      //   });
      //   // Do not process message if proof verification fails.
      //   continue;
      // }
      continue;
    }
    messageProofs.push(messageProof);
    provenMessages.push(message);
  }

  if (messageProofs.length === 0) {
    if (messages.length > 0) {
      logger.info("All messages in the batch failed verification. Clear cache.", requestContext, methodContext, {
        originDomain,
        destinationDomain,
        messages,
      });
      spokeStore.clearCache();
    }
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
    // Delete db and application caches
    hubStore.clearCache();
    // Try again
    const rootVerification = hubSMT.verify(messageRootIndex, messageRoot, messageRootProof, aggregateRoot);
    if (rootVerification && rootVerification.verified) {
      logger.info("MessageRoot Verified successfully after clearCache", requestContext, methodContext, {
        messageRoot,
        aggregateRoot,
        messageRootProof,
        rootVerification,
      });
    } else {
      logger.info("MessageRoot verification failed after clearCache", requestContext, methodContext, {
        messageRootIndex,
        messageRoot,
        aggregateRoot,
        messageRootProof,
        rootVerification,
      });
      throw new MessageRootVerificationFailed({
        context: { messageRootIndex, messageRoot, aggregateRoot, messageRootProof, rootVerification },
      });
    }
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
      provenMessages,
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
    if (taskId) {
      await cache.messages.removePending(
        originDomain,
        destinationDomain,
        provenMessages.map((it) => it.leaf),
      );
    }
  } catch (err: unknown) {
    logger.error("Error sending proofs to relayer", requestContext, methodContext, jsonifyError(err as NxtpError));
  }
};
