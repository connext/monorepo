import interval from "interval-promise";

import { AppContext } from "../../context";

// TODO: Config var?
const SUBGRAPH_POLLING_INTERVAL = 15 * 1_000; // 15 sec.

export const bindSubgraph = async (context: AppContext) => {
  const {
    adapters: { subgraph },
  } = context;

  // Receiver fulfill obligation handler cycle. Should repeat/poll very rapidly (e.g. 3min).
  interval(
    async () => {
      const validDestinationChains = Object.keys(context.config.chains)
        .filter((chain) => context.config.chains[chain].assets.length > 0)
        .map(Number);
      await Promise.all(
        // NOTE: This iteration will include ALL supported chains, not just the ones we provide
        // liquidity for, as we must scan subgraphs on the origin chain for transfers, not the destination
        // chain.
        Object.keys(context.config.chains).map(async (chain) => {
          // TODO:
          // - Use subgraph peripheral from context to get current liquidity.
          // - Get the lot of open/available transfers on this chain.
          // - If we have sufficient liquidity available for a transfer, send bid to auctioneer.

          // Read subgraph for new prepares going to chains for which we're providing liquidity.
          const chainId = parseInt(chain);

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const prepares = await subgraph.getOpenPrepares(chainId, validDestinationChains);
          // For each prepare: check to see if we support the receiving chain / receiving asset.
        }),
      );
    },
    SUBGRAPH_POLLING_INTERVAL,
    {
      stopOnError: false,
    },
  );
};
