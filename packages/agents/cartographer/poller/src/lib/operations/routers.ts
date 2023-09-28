import { Asset, createLoggingContext, RouterDailyTVL, SubgraphQueryByTimestampMetaParams } from "@connext/nxtp-utils";

import { getContext } from "../../shared";

const getMaxTimestamp = (entities: RouterDailyTVL[]): number => {
  return entities.length == 0 ? 0 : Math.max(...entities.map((entity) => entity?.timestamp ?? 0));
};

export const updateRouters = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateRouters.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("router_" + domain);
    const limit = 100;
    logger.debug("Retrieving balances", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const balances = await subgraph.getAssetBalancesRouters(domain, offset, limit, "asc");

    const newOffset = balances.length == 0 ? 0 : offset + balances.length;
    await database.saveRouterBalances(balances);

    // Reset offset at the end of the cycle.
    await database.saveCheckPoint("router_" + domain, newOffset);

    logger.debug("Saved balances", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};

export const updateAssets = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateAssets.name);

  const assets: Asset[] = [];
  for (const domain of domains) {
    const limit = 100;
    logger.debug("Retrieving assets", requestContext, methodContext, {
      domain: domain,
      offset: 0,
      limit: limit,
    });

    const _assets = await subgraph.getAssets(domain);
    assets.push(..._assets);
  }
  await database.saveAssets(assets);
  logger.debug("Saved assets", requestContext, methodContext, { assets: assets.length });
};

export const updateDailyRouterTvl = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateDailyRouterTvl");

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

      // Retrieve the most recent router daily tvl we've saved for this domain.
      const latestTimestamp = await database.getCheckPoint("daily_router_tvl_timestamp_" + domain);
      queryMetaParams.set(domain, {
        maxBlockNumber: latestBlockNumber,
        fromTimestamp: latestTimestamp,
        orderDirection: "asc",
      });
    }),
  );

  if (queryMetaParams.size > 0) {
    // Get daily router tvls for all domains in the mapping.
    const tvls = await subgraph.getRouterDailyTVLByDomainAndTimestamp(queryMetaParams);
    tvls.forEach((tvl) => {
      const { requestContext: _requestContext, methodContext: _methodContext } = createLoggingContext(
        "updateDailyRouterTvl",
        undefined,
        tvl.id,
      );
      logger.info("Retrieved daily router tvl", _requestContext, _methodContext, { tvl });
    });
    const checkpoints = domains
      .map((domain) => {
        const domainTvls = tvls.filter((event) => event.domain === domain);
        const max = getMaxTimestamp(domainTvls);
        const latest = queryMetaParams.get(domain)?.fromTimestamp ?? 0;
        if (domainTvls.length > 0 && max > latest) {
          return { domain, checkpoint: max };
        }
        return undefined;
      })
      .filter((x) => !!x) as { domain: string; checkpoint: number }[];

    await database.saveRouterDailyTVL(tvls);
    for (const checkpoint of checkpoints) {
      await database.saveCheckPoint("daily_router_tvl_timestamp_" + checkpoint.domain, checkpoint.checkpoint);
    }
  }
};
