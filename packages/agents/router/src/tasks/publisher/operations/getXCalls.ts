import { createLoggingContext, jsonifyError, SubgraphQueryMetaParams, XTransfer } from "@connext/nxtp-utils";

import { getContext } from "../publisher";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const getXCalls = async () => {
  const {
    adapters: { cache, subgraph },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  const destinationDomains: string[] = Object.entries(config.chains).map(([chain]) => chain);
  const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
  const allowedDomains = Object.keys(config.chains);
  const latestBlockNumbers = await subgraph.getLatestBlockNumber(allowedDomains);
  for (const domain of allowedDomains) {
    try {
      let latestBlockNumber = 0;
      if (latestBlockNumbers.has(domain)) {
        latestBlockNumber = latestBlockNumbers.get(domain)!;
      }
      if (latestBlockNumber === 0) {
        logger.error(`Error getting the latestBlockNumber, domain: ${domain}}`, requestContext, methodContext);
        continue;
      }

      const safeConfirmations = config.chains[domain].confirmations ?? DEFAULT_SAFE_CONFIRMATIONS;
      let latestNonce = await cache.transfers.getLatestNonce(domain);
      latestNonce = Math.max(latestNonce, config.chains[domain].startNonce ?? 0);

      subgraphQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber - safeConfirmations,
        latestNonce: latestNonce == 0 ? 0 : latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
        destinationDomains,
        orderDirection: "asc",
      });
    } catch (err: unknown) {
      logger.error(
        `Error getting the latestBlockNumber, domain: ${domain}}`,
        requestContext,
        methodContext,
        jsonifyError(err as Error),
        { domain },
      );
    }
  }

  if ([...subgraphQueryMetaParams.keys()].length > 0) {
    const { txIdsByDestinationDomain, allTxById, latestNonces } = await subgraph.getOriginXCalls(
      subgraphQueryMetaParams,
    );

    for (const [domain, nonce] of latestNonces.entries()) {
      // set nonce now so we don't requery the same transfers
      await cache.transfers.setLatestNonce(domain, nonce ?? 0);
    }

    if (txIdsByDestinationDomain.size > 0) {
      const transfers = await subgraph.getDestinationXCalls(txIdsByDestinationDomain, allTxById);
      if (transfers.length === 0) {
        logger.debug("No pending transfers found within operational domains.", requestContext, methodContext, {
          subgraphQueryMetaParams: [...subgraphQueryMetaParams.entries()],
        });
      } else {
        await cache.transfers.storeTransfers(transfers as XTransfer[], false);
      }
    } else {
      logger.debug("No pending transfers found within operational domains.", requestContext, methodContext, {
        subgraphQueryMetaParams: [...subgraphQueryMetaParams.entries()],
      });
    }
  }
};
