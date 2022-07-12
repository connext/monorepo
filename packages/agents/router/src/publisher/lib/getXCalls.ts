import {
  createLoggingContext,
  jsonifyError,
  NxtpError,
  OriginTransfer,
  SubgraphQueryMetaParams,
} from "@connext/nxtp-utils";
import { XCALL_MESSAGE_TYPE, MQ_EXCHANGE, XCALL_QUEUE } from "../../helpers";

import { DEFAULT_SAFE_CONFIRMATIONS } from "../bindings/subgraph";
import { getContext } from "../publisher";

export const getXCalls = async () => {
  const {
    adapters: { cache, subgraph, mqClient },
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
        orderDirection: "asc",
      });
    }

    if ([...subgraphQueryMetaParams.keys()].length > 0) {
      const transfers = await subgraph.getXCalls(subgraphQueryMetaParams);
      if (transfers.length === 0) {
        logger.debug("No pending transfers found within operational domains.", requestContext, methodContext, {
          subgraphQueryMetaParams: [...subgraphQueryMetaParams.entries()],
        });
      } else {
        await Promise.all(
          transfers.map(async (transfer) => {
            try {
              await mqClient.publish<OriginTransfer>(MQ_EXCHANGE, {
                body: transfer as OriginTransfer,
                type: XCALL_MESSAGE_TYPE,
                routingKey: XCALL_QUEUE,
              });
              logger.debug("Published transfer to mq", requestContext, methodContext, { transfer });

              // TODO: once per transfer instead
              await cache.transfers.setLatestNonce(transfer.xparams.originDomain, transfer.nonce!);
            } catch (e) {
              logger.error("Error publishing to mq", requestContext, methodContext, jsonifyError(e as Error));
            }
          }),
        );
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
