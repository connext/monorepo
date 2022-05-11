import { createLoggingContext, jsonifyError, NxtpError, SubgraphQueryMetaParams, XTransfer } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { getHelpers } from "../../lib/helpers";
import { getContext } from "../../router";

// Ought to be configured properly for each network; we consult the chain config below.
export const DEFAULT_SAFE_CONFIRMATIONS = 5;

export const bindSubgraph = async (_pollInterval?: number) => {
  const { config } = getContext();
  const pollInterval = _pollInterval ?? config.polling.subgraph;
  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      await pollSubgraph();
    }
  }, pollInterval);
};

export const pollSubgraph = async () => {
  const {
    adapters: { cache, subgraph },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("pollSubgraph");
  const {
    shared: { getSubgraphHealth, getSubgraphName },
  } = getHelpers();
  try {
    const destinationDomains: string[] = Object.entries(config.chains)
      .filter(([, config]) => config.assets.length > 0)
      .map(([chain]) => chain);
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
