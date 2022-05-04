import {
  createLoggingContext,
  getSubgraphHealth,
  getSubgraphName,
  SubgraphQueryMetaParams,
  XTransferStatus,
} from "@connext/nxtp-utils";

import { getContext } from "../../backend";

export const updateTransfers = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateTransfers");

  const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  for (const domain of Object.keys(config.chains)) {
    // TODO: Needs to implement the selection algorithm
    const healthUrls = config.chains[domain].subgraph.runtime.map((url) => {
      return { name: getSubgraphName(url.query), url: url.health };
    });
    let latestBlockNumber = 0;
    for (const healthEp of healthUrls) {
      const subgraphHealth = await getSubgraphHealth(healthEp.name, healthEp.url);
      if (subgraphHealth && subgraphHealth.synced && subgraphHealth.latestBlock > latestBlockNumber)
        latestBlockNumber = subgraphHealth.latestBlock;
    }

    if (latestBlockNumber === 0) {
      logger.error(
        `Error getting the latestBlockNumber, domain: ${domain}, healthUrls: ${healthUrls.flat()}`,
        requestContext,
        methodContext,
      );

      continue;
    }

    const latestNonce = await database.getLatestNonce(domain);

    subgraphQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce: latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
    });
  }

  logger.debug("subgraphQueryMetaParams: ", requestContext, methodContext, {
    subgraphQueryMetaParams: [...subgraphQueryMetaParams],
  });
  if (subgraphQueryMetaParams.size > 0) {
    const transactions = await subgraph.getXCalls(subgraphQueryMetaParams);

    const transferIds = transactions.map((transaction) => transaction.transferId);
    logger.debug("Got xcalled transactions", requestContext, methodContext, {
      transferIds,
    });

    await database.saveTransfers(transactions);
  }

  // now query pending transfers to see if any status updates happened
  const xcalledTransfers = await database.getTransfersByStatus("XCalled");
  const executedTransfers = await database.getTransfersByStatus(XTransferStatus.Executed);

  logger.debug("Got pending", requestContext, methodContext, {
    executedTransfers: executedTransfers.map((transfer) => transfer.transferId),
    xcalledTransfers: xcalledTransfers.map((transfer) => transfer.transferId),
  });

  const executedReconciled = await subgraph.getDestinationTransfers(xcalledTransfers.concat(executedTransfers));
  logger.debug("Got executed/reconciled", requestContext, methodContext, {
    completedTransfers: xcalledTransfers.map((transfer) => {
      return { transferId: transfer.transferId, status: transfer.destination?.status };
    }),
  });
  await database.saveTransfers(executedReconciled);
};
