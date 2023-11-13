import { createLoggingContext, XMessage, RootMessage, jsonifyError } from "@connext/nxtp-utils";

import { getContext } from "../../shared";
import { DEFAULT_LOAD_SIZE, DEFAULT_SAFE_CONFIRMATIONS } from ".";

const markableDomainsForRootMessage = [
  "6450786", // BNB
];

export const retrieveOriginMessages = async () => {
  const {
    adapters: { subgraph, database },
    config,
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(retrieveOriginMessages.name);
  const allowedDomains = Object.keys(config.chains);
  const latestBlockNumbers = await subgraph.getLatestBlockNumber(allowedDomains);

  for (const domain of domains) {
    let latestBlockNumber = 0;
    try {
      if (latestBlockNumbers.has(domain)) {
        latestBlockNumber = latestBlockNumbers.get(domain)!;
      }
      if (latestBlockNumber === 0) {
        logger.error(`Error getting the latestBlockNumber, skipping domain: ${domain}}`, requestContext, methodContext);
        continue;
      }
    } catch (err: unknown) {
      logger.error(
        `Error getting the latestBlockNumber, skipping domain: ${domain}}`,
        requestContext,
        methodContext,
        jsonifyError(err as Error),
        { domain },
      );
      continue;
    }

    let confirmations = DEFAULT_SAFE_CONFIRMATIONS;
    if (config.chains[domain]) {
      confirmations = (config.chains[domain] as { confirmations: number | undefined }).confirmations ?? confirmations;
    }

    const maxBlockNumber = latestBlockNumber - confirmations;
    const offset = await database.getCheckPoint("message_" + domain);
    const limit = 1000;
    logger.debug("Retrieving origin messages", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const originMessages = await subgraph.getOriginMessagesByDomain([{ domain, offset, limit, maxBlockNumber }]);

    const xMessages: XMessage[] = originMessages.map((_message) => {
      return {
        leaf: _message.leaf,
        originDomain: _message.domain,
        destinationDomain: _message.destinationDomain,
        transferId: _message.transferId,
        origin: { index: _message.index, root: _message.root, message: _message.message },
      };
    });

    const newOffset = originMessages.length == 0 ? 0 : originMessages[originMessages.length - 1].index;
    if (originMessages.length > 0) {
      await database.saveMessages(xMessages);
      // Reset offset at the end of the cycle.
      await database.saveCheckPoint("message_" + domain, newOffset);
      logger.debug("Saved messages", requestContext, methodContext, { domain: domain, offset: newOffset });
    }
  }
};

export const updateMessages = async () => {
  const {
    adapters: { database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateMessages.name);
  for (const originDomain of domains) {
    for (const destinationDomain of domains) {
      if (originDomain == destinationDomain) continue;
      let offset = 0;
      const limit = 1000;
      let done = false;
      const xMessages: XMessage[] = [];
      while (!done) {
        logger.debug("Updating messages", requestContext, methodContext, {
          originDomain,
          destinationDomain,
          offset,
          limit,
        });
        const pendingMessages = await database.getUnProcessedMessagesByDomains(
          originDomain,
          destinationDomain,
          limit,
          offset,
        );
        if (pendingMessages.length > 0) {
          logger.debug("Pending messages", requestContext, methodContext, {
            originDomain,
            destinationDomain,
            startIndex: pendingMessages[0].origin.index,
            endIndex: pendingMessages[pendingMessages.length - 1].origin.index,
          });
        }
        const messageHashes = pendingMessages.map((message) => message.leaf);
        const completedTransfers = await database.getCompletedTransfersByMessageHashes(messageHashes);

        for (const pendingMessage of pendingMessages) {
          const completed = completedTransfers.find((transfer) => transfer.origin?.messageHash === pendingMessage.leaf);
          if (!completed) continue;
          xMessages.push({
            ...pendingMessage,
            destination: {
              processed: true,
              returnData: "",
            },
          });
        }
        if (offset >= DEFAULT_LOAD_SIZE) done = true;
        else if (pendingMessages.length == limit) offset += limit;
        else done = true;
      }
      await database.saveMessages(xMessages);
      logger.debug("Updated messages", requestContext, methodContext, {
        count: xMessages.length,
        originDomain,
        destinationDomain,
        offset,
        limit,
      });
    }
  }
};

export const retrieveSentRootMessages = async () => {
  const {
    adapters: { subgraph, database },
    config,
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(retrieveSentRootMessages.name);
  const allowedDomains = Object.keys(config.chains);
  const latestBlockNumbers = await subgraph.getLatestBlockNumber(allowedDomains);

  for (const domain of domains) {
    let latestBlockNumber = 0;
    try {
      if (latestBlockNumbers.has(domain)) {
        latestBlockNumber = latestBlockNumbers.get(domain)!;
      }
      if (latestBlockNumber === 0) {
        logger.error(`Error getting the latestBlockNumber, skipping domain: ${domain}}`, requestContext, methodContext);
        continue;
      }
    } catch (err: unknown) {
      logger.error(
        `Error getting the latestBlockNumber, skipping domain: ${domain}}`,
        requestContext,
        methodContext,
        jsonifyError(err as Error),
        { domain },
      );
      continue;
    }

    let confirmations = DEFAULT_SAFE_CONFIRMATIONS;
    if (config.chains[domain]) {
      confirmations = (config.chains[domain] as { confirmations: number | undefined }).confirmations ?? confirmations;
    }
    const maxBlockNumber = latestBlockNumber - confirmations;
    const offset = await database.getCheckPoint("sent_root_message_" + domain);
    const limit = 100;
    logger.debug("Retrieving sent root messages", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    if (offset + limit > maxBlockNumber) {
      logger.debug("Waiting for max block to be confirmed", requestContext, methodContext, {
        domain,
        offset,
        maxBlockNumber,
      });
      return;
    }

    const _sentRootMessages: RootMessage[] = await subgraph.getSentRootMessagesByDomain([{ domain, offset, limit }]);

    // Reset offset at the end of the cycle.
    const newOffset =
      _sentRootMessages.length == 0 ? 0 : Math.max(..._sentRootMessages.map((message) => message.blockNumber ?? 0));

    const sentRootMessages = _sentRootMessages.map((message) => ({
      ...message,
      processed: markableDomainsForRootMessage.includes(message.spokeDomain) ? true : message.processed,
    }));

    await database.saveSentRootMessages(sentRootMessages);

    if (sentRootMessages.length > 0 && newOffset > offset) {
      await database.saveCheckPoint("sent_root_message_" + domain, newOffset);
    }

    logger.debug("Saved sent root messages", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};

export const retrieveProcessedRootMessages = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(retrieveProcessedRootMessages.name);

  const connectorMetas = await subgraph.getConnectorMeta(domains);
  const hubDomains = new Set(connectorMetas.map((meta) => meta.hubDomain));

  for (const domain of [...hubDomains]) {
    const offset = await database.getCheckPoint("processed_root_message_" + domain);
    const limit = 100;
    logger.debug("Retrieving processed root messages", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const processedRootMessages: RootMessage[] = await subgraph.getProcessedRootMessagesByDomain([
      { domain, offset, limit },
    ]);

    // Reset offset at the end of the cycle.
    const newOffset =
      processedRootMessages.length == 0
        ? 0
        : Math.max(...processedRootMessages.map((message) => message.blockNumber ?? 0));

    await database.saveProcessedRootMessages(processedRootMessages);

    if (processedRootMessages.length > 0 && newOffset > offset) {
      await database.saveCheckPoint("processed_root_message_" + domain, newOffset);
    }

    logger.debug("Saved processed root messages", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};
