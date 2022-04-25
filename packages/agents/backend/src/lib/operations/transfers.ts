import { createLoggingContext, SubgraphQueryMetaParams, XTransferStatus } from "@connext/nxtp-utils";

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
    const latestBlockNumber = subgraph.getLatestBlockNumber(domain);

    if (latestBlockNumber === 0) {
      logger.error(`Error getting the latestBlockNumber, domain: ${domain}}`, requestContext, methodContext);
      continue;
    }

    const latestNonce = await database.getLatestNonce(domain);

    subgraphQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce: latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
    });
  }

  if ([...subgraphQueryMetaParams.keys()].length > 0) {
    const transactions = await subgraph.getTransactionsWithStatuses(subgraphQueryMetaParams, XTransferStatus.xcalled);

    const transferIds = transactions.map((transaction) => transaction.transferId);
    logger.debug("Got transactions", requestContext, methodContext, {
      transferIds,
    });

    await database.saveTransfers(transactions);
  }

  // now query pending transfers to see if any status updates happened
  const pendingTransfers = await database.getTransfersByStatus(XTransferStatus.pending);

  // separate into
};
