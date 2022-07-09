import { createLoggingContext, jsonifyError, NxtpError, SubgraphQueryMetaParams, XTransfer } from "@connext/nxtp-utils";

import { DEFAULT_SAFE_CONFIRMATIONS } from "../bindings/subgraph";
import { getContext } from "../publisher";

export const getXCalls = async () => {
  const {
    adapters: { cache, subgraph },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  try {
    const destinationDomains: string[] = Object.entries(config.chains)
      .filter(([, config]) => config.assets.length > 0)
      .map(([chain]) => chain);
    const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();
    const allowedDomains = Object.keys(config.chains);
    const latestBlockNumbers = await subgraph.getLatestBlockNumber(allowedDomains);
    for (const domain of allowedDomains) {
      let latestBlockNumber = 0;
      if (latestBlockNumbers.has(domain)) {
        latestBlockNumber = latestBlockNumbers.get(domain)!;
      }
      if (latestBlockNumber === 0) {
        logger.error(`Error getting the latestBlockNumber, domain: ${domain}}`, requestContext, methodContext);
        continue;
      }

      const safeConfirmations = config.chains[domain].confirmations ?? DEFAULT_SAFE_CONFIRMATIONS;
      const latestNonce = await cache.transfers.getLatestNonce(domain);

      subgraphQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber - safeConfirmations,
        latestNonce: latestNonce + 1, // queries at >= latest nonce, so use 1 larger than whats in the cache
        destinationDomains,
      });
    }

    if ([...subgraphQueryMetaParams.keys()].length > 0) {
      const transfers: XTransfer[] = await subgraph.getXCalls(subgraphQueryMetaParams);
      if (transfers.length === 0) {
        logger.debug("No pending transfers found within operational domains.", requestContext, methodContext, {
          subgraphQueryMetaParams: [...subgraphQueryMetaParams.entries()],
        });
      } else {
        await cache.transfers.storeTransfers(transfers);
      }
    }
  } catch (err: unknown) {
    logger.error(
      "Error getting pending txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
