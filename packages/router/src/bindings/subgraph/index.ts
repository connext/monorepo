import { BigNumber } from "ethers";
import interval from "interval-promise";

import { AppContext } from "../../context";

// TODO: Config var?
const SUBGRAPH_POLLING_INTERVAL = 15 * 1_000; // 15 sec.

export const bindSubgraph = async (context: AppContext) => {
  const {
    adapters: { subgraph, cache, chainreader, wallet },
    config,
  } = context;

  const routerAddress = await wallet.getAddress();
  // Get the destination chains for which this router is providing liquidity.
  const destinationChains = Object.keys(config.chains).filter((chain) => config.chains[chain].assets.length > 0);
  // Use subgraph to get current liquidity for each destination chain (mapped by asset).
  const liquidity: {
    [chain: number]: {
      [asset: string]: BigNumber;
    };
  } = {};
  await Promise.all(
    destinationChains.map(async (chain) => {
      const chainId = parseInt(chain);
      liquidity[chainId] = await subgraph.getAssetBalances(chainId, routerAddress);
    }),
  );
  // Convert destination chains into destination nomad domains.
  const destinationDomains = destinationChains.map((chain) => BigNumber.from(config.chains[chain].nomadDomain));

  interval(
    async () => {
      await Promise.all(
        // NOTE: This iteration will include ALL supported chains, not just the ones we provide
        // liquidity for, as we must scan subgraphs on the origin chain for transfers, not the destination
        // chain.
        Object.keys(config.chains).map(async (chain) => {
          const chainId = parseInt(chain);
          // Get the current tx nonce for this chain from the cache. If not available, get it from the
          // chain in the current block.
          let nonce: BigNumber | undefined = await cache.getOpenTxNonce(chainId);
          const { confirmations } = config.chains[chain];
          if (!nonce) {
            // NOTE: Router is blind to any/all previous transactions, regardless of whether they are open,
            // on boot.
            nonce = await subgraph.getLatestNonce(chainId);
          }
          // Get the maximum prepared block number based on the required confirmations.
          const blockNumber = await chainreader.getBlockNumber(chainId);
          const maxPreparedBlockNumber = BigNumber.from(blockNumber - confirmations);

          // - Get the lot of open/available transfers on this chain.
          // - If we have sufficient liquidity available for a transfer, send bid to auctioneer.

          // Read subgraph for new prepares going to chains for which we're providing liquidity.

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const prepares = await subgraph.getOpenPrepares(
            chainId,
            destinationDomains,
            nonce ?? BigNumber.from(0),
            maxPreparedBlockNumber,
          );
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
