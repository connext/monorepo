import {
  createLoggingContext,
  SubgraphQueryByTimestampMetaParams,
  StableSwapExchange,
  StableSwapPoolEvent,
  StableSwapTransfer,
  StableSwapLpBalance,
} from "@connext/nxtp-utils";

import { getContext } from "../../shared";
import { constants } from "ethers";

const getMaxTimestamp = (items: StableSwapExchange[] | StableSwapPoolEvent[] | StableSwapTransfer[]): number => {
  return items.length == 0 ? 0 : Math.max(...items.map((item) => item?.timestamp ?? 0));
};

export const updateStableSwap = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateStableSwap");

  const subgraphQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  const lastestBlockNumbers: Map<string, number> = await subgraph.getLatestBlockNumber(domains);

  await Promise.all(
    domains.map(async (domain) => {
      const pools = await subgraph.getStableSwapPools(domain);
      logger.info("Retrieved stable swap pools", requestContext, methodContext, {
        domain,
        pools: pools,
        count: pools.length,
      });

      if (pools.length) {
        await database.saveStableSwapPool(pools);
      }
    }),
  );

  await Promise.all(
    domains.map(async (domain) => {
      let latestBlockNumber: number | undefined = undefined;
      if (lastestBlockNumbers.has(domain)) {
        latestBlockNumber = lastestBlockNumbers.get(domain)!;
      }

      if (!latestBlockNumber) {
        logger.error("Error getting the latestBlockNumber for domain.", requestContext, methodContext, undefined, {
          domain,
          latestBlockNumber,
          lastestBlockNumbers,
        });
        return;
      }

      // Retrieve the most recent stable swap exchange event we've saved for this domain.
      const latestTimestamp = await database.getCheckPoint("stableswap_exchange_timestamp_" + domain);
      subgraphQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        fromTimestamp: latestTimestamp,
        orderDirection: "asc",
      });
    }),
  );

  if (subgraphQueryMetaParams.size > 0) {
    // Get stableswap exchanges for all domains in the mapping.
    const exchanges = await subgraph.getStableSwapExchangeByDomainAndTimestamp(subgraphQueryMetaParams);
    exchanges.forEach((exchange) => {
      const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
        "updateStableSwap",
        undefined,
        exchange.id,
      );
      logger.info("Retrieved stableswap exchange event", _requestContext, _methodContext, { exchange });
    });
    const checkpoints = domains
      .map((domain) => {
        const domainExchanges = exchanges.filter((exchange) => exchange.domain === domain);
        const max = getMaxTimestamp(domainExchanges);
        const latest = subgraphQueryMetaParams.get(domain)?.fromTimestamp ?? 0;
        if (domainExchanges.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveStableSwapExchange(exchanges);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("stableswap_exchange_timestamp_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }
};

export const updatePoolEvents = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updatePoolEvents");

  const addQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  const removeQueryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  const lastestBlockNumbers: Map<string, number> = await subgraph.getLatestBlockNumber(domains);

  await Promise.all(
    domains.map(async (domain) => {
      let latestBlockNumber: number | undefined = undefined;
      if (lastestBlockNumbers.has(domain)) {
        latestBlockNumber = lastestBlockNumbers.get(domain)!;
      }

      if (!latestBlockNumber) {
        logger.error("Error getting the latestBlockNumber for domain.", requestContext, methodContext, undefined, {
          domain,
          latestBlockNumber,
          lastestBlockNumbers,
        });
        return;
      }

      // Retrieve the most recent stable swap add liquidity event we've saved for this domain.
      const addLatestTimestamp = await database.getCheckPoint("stableswap_add_liquidity_timestamp_" + domain);
      addQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        fromTimestamp: addLatestTimestamp,
        orderDirection: "asc",
      });

      // Retrieve the most recent stable swap remove liquidity event we've saved for this domain.
      const removeLatestTimestamp = await database.getCheckPoint("stableswap_remove_liquidity_timestamp_" + domain);
      removeQueryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        fromTimestamp: removeLatestTimestamp,
        orderDirection: "asc",
      });
    }),
  );

  if (addQueryMetaParams.size > 0) {
    // Get stableswap pool add liquidity events for all domains in the mapping.
    const events = await subgraph.getStableSwapPoolEventsByDomainAndTimestamp(addQueryMetaParams, "add");
    events.forEach((event) => {
      const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
        "updatePoolEvents",
        undefined,
        event.id,
      );
      logger.info("Retrieved stableswap add liquidity event", _requestContext, _methodContext, { event });
    });
    const checkpoints = domains
      .map((domain) => {
        const domainEvents = events.filter((event) => event.domain === domain);
        const max = getMaxTimestamp(domainEvents);
        const latest = addQueryMetaParams.get(domain)?.fromTimestamp ?? 0;
        if (domainEvents.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveStableSwapPoolEvent(events);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("stableswap_add_liquidity_timestamp_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }

  if (removeQueryMetaParams.size > 0) {
    // Get stableswap pool remove liquidity events for all domains in the mapping.
    const events = await subgraph.getStableSwapPoolEventsByDomainAndTimestamp(removeQueryMetaParams, "remove");
    events.forEach((event) => {
      const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
        "updatePoolEvents",
        undefined,
        event.id,
      );
      logger.info("Retrieved stableswap remove liquidity event", _requestContext, _methodContext, { event });
    });
    const checkpoints = domains
      .map((domain) => {
        const domainEvents = events.filter((event) => event.domain === domain);
        const max = getMaxTimestamp(domainEvents);
        const latest = addQueryMetaParams.get(domain)?.fromTimestamp ?? 0;
        if (domainEvents.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveStableSwapPoolEvent(events);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint(
        "stableswap_remove_liquidity_timestamp_" + checkpoint.domain,
        checkpoint.checkpoint,
      );
    }
  }
};

export const updateLpTransfers = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateLpTransfers");

  const queryMetaParams: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
  const lastestBlockNumbers: Map<string, number> = await subgraph.getLatestBlockNumber(domains);

  await Promise.all(
    domains.map(async (domain) => {
      let latestBlockNumber: number | undefined = undefined;
      if (lastestBlockNumbers.has(domain)) {
        latestBlockNumber = lastestBlockNumbers.get(domain)!;
      }

      if (!latestBlockNumber) {
        logger.error("Error getting the latestBlockNumber for domain.", requestContext, methodContext, undefined, {
          domain,
          latestBlockNumber,
          lastestBlockNumbers,
        });
        return;
      }

      // Retrieve the most recent stable swap transfer event we've saved for this domain.
      const latestTimestamp = await database.getCheckPoint("stableswap_lp_transfer_timestamp_" + domain);
      queryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        fromTimestamp: latestTimestamp,
        orderDirection: "asc",
      });
    }),
  );

  if (queryMetaParams.size > 0) {
    // Get stableswap transfer events for all domains in the mapping.
    const events = await subgraph.getStableSwapLpTransferEventsByDomainAndTimestamp(queryMetaParams);
    events.forEach((event) => {
      const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
        "updateLpTransfers",
        undefined,
        event.id,
      );
      logger.info("Retrieved stableswap lp token transfer event", _requestContext, _methodContext, { event });
    });

    await database.saveStableSwapTransfers(events);

    // Save all updated LP balances
    let balances: StableSwapLpBalance[] = [];
    for (const event of events) {
      const balance: StableSwapLpBalance = {
        poolId: event.poolId,
        domain: event.domain,
        lpToken: event.lpToken,
        provider: "",
        balance: 0,
        lastTimestamp: event.timestamp,
      };
      if (event.fromAddress !== constants.AddressZero) {
        balances.push({
          ...balance,
          provider: event.fromAddress,
          balance: event.balances[0],
        });
      }

      if (event.toAddress !== constants.AddressZero) {
        balances.push({
          ...balance,
          provider: event.toAddress,
          balance: event.balances[1],
        });
      }
    }
    balances = Object.values(
      balances
        .sort((a, b) => a.lastTimestamp - b.lastTimestamp)
        .reduce((group: { [key: string]: StableSwapLpBalance }, obj: StableSwapLpBalance) => {
          const { poolId, domain, provider } = obj;
          const groupId = `${poolId}-${domain}-${provider}`;
          group[groupId] = group[groupId] ?? [];
          group[groupId] = obj;
          return group;
        }, {}),
    );

    await database.saveStableSwapLpBalances(balances);

    const checkpoints = domains
      .map((domain) => {
        const domainEvents = events.filter((event) => event.domain === domain);
        const max = getMaxTimestamp(domainEvents);
        const latest = queryMetaParams.get(domain)?.fromTimestamp ?? 0;
        if (domainEvents.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("stableswap_lp_transfer_timestamp_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }
};
