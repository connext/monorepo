import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  XMessage,
  SparseMerkleTree,
  NATIVE_TOKEN,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import {
  NoDestinationDomainForProof,
  NoAggregatedRoot,
  NoAggregateRootCount,
  NoMessageRootIndex,
  NoMessageRootCount,
  NoMessageRootProof,
  NoMessageProof,
  NoTargetMessageRoot,
} from "../../../errors";
import { sendWithRelayerWithBackup, getEstimatedFee } from "../../../mockable";
import { HubDBHelper, SpokeDBHelper } from "../adapters";
import { getContext } from "../prover";

export const proveAndProcess = async () => {
  const { requestContext, methodContext } = createLoggingContext(proveAndProcess.name);
  const {
    logger,
    adapters: { database },
  } = getContext();

  const unprocessed = await database.getUnProcessedMessages();
  logger.info("Got unprocessed messages", requestContext, methodContext, { unprocessed });

  // process messages
  await Promise.all(
    unprocessed.map(async (message) => {
      try {
        await processMessage(message);
      } catch (err: unknown) {
        logger.error("Error processing message", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }),
  );
};

export const processMessage = async (message: XMessage) => {
  const {
    logger,
    adapters: { contracts, relayers, database, chainreader },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processUnprocessedMessage");

  // Find the first published outbound root that contains the index, for a given domain
  const targetMessageRoot = await database.getMessageRootFromIndex(message.originDomain, message.origin.index);
  if (!targetMessageRoot) {
    throw new NoTargetMessageRoot(message.originDomain, message.origin.index);
  }
  // Count of leaf nodes in origin domain`s outbound tree
  const messageRootCount = await database.getMessageRootCount(message.originDomain, targetMessageRoot);
  if (messageRootCount === undefined) {
    throw new NoMessageRootCount(message.originDomain, targetMessageRoot);
  }
  // Index of messageRoot leaf node in aggregate tree.
  // const messageRootIndex = await database.getMessageRootIndex(message.originDomain, targetMessageRoot);
  const messageRootIndex = await database.getMessageRootIndex(config.hubDomain, targetMessageRoot);
  if (messageRootIndex === undefined) {
    throw new NoMessageRootIndex(message.originDomain, targetMessageRoot);
  }

  // Get the currentAggregateRoot from on-chain state (or pending, if the validation period
  // has elapsed!) to determine which tree snapshot we should be generating the proof from.
  const targetAggregateRoot = await database.getAggregateRoot(targetMessageRoot);
  if (!targetAggregateRoot) {
    throw new NoAggregatedRoot();
  }

  // Count of leafs in aggregate tree at targetAggregateRoot.
  const aggregateRootCount = await database.getAggregateRootCount(targetAggregateRoot);
  if (!aggregateRootCount) {
    throw new NoAggregateRootCount(targetAggregateRoot);
  }
  // TODO: Move to per domain storage adapters in context
  const spokeStore = new SpokeDBHelper(message.originDomain, messageRootCount + 1, database);
  const hubStore = new HubDBHelper("hub", aggregateRootCount, database);

  const spokeSMT = new SparseMerkleTree(spokeStore);
  const hubSMT = new SparseMerkleTree(hubStore);

  const messageProof = {
    message: message.origin.message,
    path: await spokeSMT.getProof(message.origin.index),
    index: message.origin.index,
  };
  if (!messageProof.path) {
    throw new NoMessageProof(messageProof.index, message.leaf);
  }

  // Proof path for proving inclusion of messageRoot in aggregateRoot.
  const messageRootProof = await hubSMT.getProof(messageRootIndex);
  if (!messageRootProof) {
    throw new NoMessageRootProof(messageRootIndex, message.origin.root);
  }

  // Verify proof of inclusion of message in messageRoot.
  const messageVerification = spokeSMT.verify(message.origin.index, message.leaf, messageProof.path, targetMessageRoot);
  if (messageVerification && messageVerification.verified) {
    logger.info("Message Verified successfully", requestContext, methodContext, {
      messageIndex: message.origin.index,
      leaf: message.leaf,
      targetMessageRoot,
      messageVerification,
    });
  } else {
    logger.info("Message verification failed", requestContext, methodContext, {
      messageIndex: message.origin.index,
      leaf: message.leaf,
      targetMessageRoot,
      messageVerification,
    });
  }

  // Verify proof of inclusion of messageRoot in aggregateRoot.
  const rootVerification = hubSMT.verify(messageRootIndex, targetMessageRoot, messageRootProof, targetAggregateRoot);
  if (rootVerification && rootVerification.verified) {
    logger.info("MessageRoot Verified successfully", requestContext, methodContext, {
      targetMessageRoot,
      targetAggregateRoot,
      messageRootProof,
      rootVerification,
    });
  } else {
    logger.info("MessageRoot verification failed", requestContext, methodContext, {
      messageRootIndex,
      targetMessageRoot,
      targetAggregateRoot,
      messageRootProof,
      rootVerification,
    });
  }

  const proveAndProcessEncodedData = contracts.spokeConnector.encodeFunctionData("proveAndProcess", [
    [messageProof],
    targetAggregateRoot,
    messageRootProof,
    messageRootIndex,
  ]);

  const destinationSpokeConnector = config.chains[message.destinationDomain]?.deployments.spokeConnector;
  if (!destinationSpokeConnector) {
    throw new NoDestinationDomainForProof(message.destinationDomain);
  }
  logger.info("Proving and processing message", requestContext, methodContext, {
    message,
    proveAndProcessEncodedData,
    destinationSpokeConnector,
  });
  const chainId = chainData.get(message.destinationDomain)!.chainId;

  /// Temp: Using relayer proxy
  const domain = +message.destinationDomain;
  const relayerAddress = await relayers[0].instance.getRelayerAddress(domain, logger);

  logger.debug("Getting gas estimate", requestContext, methodContext, {
    chainId,
    to: destinationSpokeConnector,
    data: proveAndProcessEncodedData,
    from: relayerAddress,
  });

  const gas = await chainreader.getGasEstimateWithRevertCode(domain, {
    chainId: chainId,
    to: destinationSpokeConnector,
    data: proveAndProcessEncodedData,
    from: relayerAddress,
  });

  logger.info("Sending tx to relayer", requestContext, methodContext, {
    relayer: relayerAddress,
    connext: destinationSpokeConnector,
    domain,
    gas: gas.toString(),
  });

  const gasLimit = gas.add(200_000); // Add extra overhead for gelato
  const destinationRelayerProxyAddress = config.chains[message.destinationDomain]?.deployments.relayerProxy;
  let fee = BigNumber.from(0);
  try {
    fee = await getEstimatedFee(chainId, NATIVE_TOKEN, gasLimit, true);
  } catch (error: unknown) {
    logger.warn("Error at Gelato Estimate Fee", requestContext, methodContext, {
      error: jsonifyError(error as NxtpError),
      relayerProxyAddress: destinationRelayerProxyAddress,
      gasLimit: gasLimit.toString(),
      relayerFee: fee.toString(),
    });

    fee = gasLimit.mul(await chainreader.getGasPrice(domain, requestContext));
  }

  const {
    _proofs: proofs,
    _aggregateRoot: aggregateRoot,
    _aggregatePath: aggregatePath,
    _aggregateIndex: aggregateIndex,
  } = contracts.spokeConnector.decodeFunctionData("proveAndProcess", proveAndProcessEncodedData);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const encodedData = contracts.relayerProxy.encodeFunctionData("proveAndProcess", [
    proofs,
    aggregateRoot,
    aggregatePath,
    aggregateIndex,
    fee,
  ]);

  logger.info("Encoding for Relayer Proxy", requestContext, methodContext, {
    relayerProxyAddress: destinationRelayerProxyAddress,
    gasLimit: gasLimit.toString(),
    relayerFee: fee.toString(),
    relayerProxyEncodedData: encodedData,
  });

  const { taskId } = await sendWithRelayerWithBackup(
    chainId,
    message.destinationDomain,
    destinationRelayerProxyAddress as string,
    encodedData,
    relayers,
    chainreader,
    logger,
    requestContext,
  );
  logger.info("Proved and processed message sent to relayer", requestContext, methodContext, { taskId });
};
