import { createLoggingContext, XMessage, RootMessage } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

export const retrieveOriginMessages = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(retrieveOriginMessages.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("message_" + domain);
    const limit = 100;
    logger.debug("Retrieving origin messages", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const originMessages = await subgraph.getOriginMessagesByDomain([{ domain, offset, limit }]);

    const xMessages: XMessage[] = originMessages.map((_message) => {
      return {
        leaf: _message.leaf,
        originDomain: _message.domain,
        destinationDomain: _message.destinationDomain,
        transferId: _message.transferId,
        origin: { index: _message.index, root: _message.root, message: _message.message },
      };
    });
    await database.saveMessages(xMessages);

    // Reset offset at the end of the cycle.
    const newOffset = originMessages.length == 0 ? 0 : originMessages[originMessages.length - 1].index;
    await database.saveCheckPoint("message_" + domain, newOffset);

    logger.debug("Saved messages", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};

export const updateMessages = async () => {
  const {
    adapters: { subgraph, database },
    logger,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateMessages.name);
  logger.debug("Updating messages", requestContext, methodContext);
  const pendingMessages = await database.getPendingMessages();
  const messageLeavesByDomain: Map<string, string[]> = new Map();
  for (const pendingMessage of pendingMessages) {
    if (messageLeavesByDomain.has(pendingMessage.destinationDomain)) {
      messageLeavesByDomain.get(pendingMessage.destinationDomain)?.push(pendingMessage.leaf);
    } else {
      messageLeavesByDomain.set(pendingMessage.destinationDomain, [pendingMessage.leaf]);
    }
  }

  const destinationMessages = await subgraph.getDestinationMessagesByDomainAndLeaf(messageLeavesByDomain);
  const xMessages: XMessage[] = [];
  for (const pendingMessage of pendingMessages) {
    const destinationMessage = destinationMessages.find((_message) => _message.leaf === pendingMessage.leaf);
    if (!destinationMessage) continue;
    xMessages.push({
      ...pendingMessage,
      destination: {
        processed: destinationMessage.processed,
        returnData: destinationMessage.returnData,
      },
    });
  }

  await database.saveMessages(xMessages);
  logger.debug("Updated messages", requestContext, methodContext, { count: xMessages.length });
};

export const retrieveSentRootMessages = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(retrieveSentRootMessages.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("sent_root_message_" + domain);
    const limit = 100;
    logger.debug("Retrieving sent root messages", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const sentRootMessages: RootMessage[] = await subgraph.getSentRootMessagesByDomain([{ domain, offset, limit }]);

    await database.saveSentRootMessages(sentRootMessages);

    // Reset offset at the end of the cycle.
    const newOffset =
      sentRootMessages.length == 0 ? 0 : Math.max(...sentRootMessages.map((message) => message.blockNumber ?? 0)) ?? 0;
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

  for (const domain of domains) {
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

    await database.saveProcessedRootMessages(processedRootMessages);

    // Reset offset at the end of the cycle.
    const newOffset =
      processedRootMessages.length == 0
        ? 0
        : Math.max(...processedRootMessages.map((message) => message.blockNumber ?? 0)) ?? 0;
    if (processedRootMessages.length > 0 && newOffset > offset) {
      await database.saveCheckPoint("processed_root_message_" + domain, newOffset);
    }

    logger.debug("Saved processed root messages", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};
