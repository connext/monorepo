import pino from "pino";
import PriorityQueue from "p-queue";
import { ChainConfig, TransactionService, WriteTransaction } from "@connext/nxtp-txservice";
import { RequestContext } from "@connext/nxtp-utils";
import { BigNumber, Wallet } from "ethers";

import { SdkManager, TransactionInfo } from "../utils/sdkManager";
import { getConfig } from "../utils/config";
import { getOnchainBalance } from "../utils/chain";
import { OnchainAccountManager } from "../utils/accountManager";

/**
 * Sets up a basic concurrency test through the core TransactionService only. Will slowly add more agents up to `maxConcurrency` sending transactions.
 *
 * @param maxConcurrency - Concurrency to build up to. We start at 1, and work up to this number. On each iteration, the concurrency value will be the number of agents who will do transactions simultaneously
 */
const txserviceConcurrencyTest = async (maxConcurrency: number): Promise<void> => {
  const config = getConfig();
  const logger = pino({ level: config.logLevel ?? "info" });

  // Just pick the first chain in the config.
  const chainId = parseInt(Object.keys(config.chainConfig)[0]);
  // Grab the first asset ID for this chain we can find.
  const assetId: string = ((): string => {
    for (const swap of config.swapPools) {
      for (const asset of swap.assets) {
        if (asset.chainId === chainId) {
          return asset.assetId;
        }
      }
    }
    throw new Error(`Could not find assetId for chainId: ${chainId}`);
  })();

  // Create manager
  const manager = new OnchainAccountManager(config.chainConfig, config.mnemonic, maxConcurrency);
  logger.info({ agents: maxConcurrency }, "Created manager");


  const chains: { [chainId: string]: ChainConfig } = {};
  Object.entries(config.chainConfig).forEach(([chainId, config]) => {
    chains[chainId] = {
      confirmations: config.confirmations,
      providers: config.providerUrls.map((url) => ({ url })),
    } as ChainConfig;
  });

  // Set up a transaction service instance.
  const txservice = new TransactionService(
    logger,
    manager.funder,
    { chains },
  );

  logger.info({}, "Beginning concurrency test");
  let concurrency: number;
  let loopStats;
  for (concurrency = 1; concurrency <= maxConcurrency; concurrency++) {
    // Create a queue to hold all payments with the given
    // concurrency
    const queue = new PriorityQueue ({ concurrency });

    const tasks = Array(concurrency)
      .fill(0)
      .map((_, i) => {
        const task = async () => {
          const agent = manager.getRandomWallet();
          const amount = "100000";
          const txInfo: TransactionInfo = {
            start: Date.now(),
          };
          try {
            await txservice.sendTx(
              {
                chainId,
                to: agent.address,
                from: manager.funder.address,
                data: "0x00",
                value: BigNumber.from(amount),
              } as WriteTransaction,
              {
                id: `C${concurrency}:U${i+1}`,
                origin: "concurrencyTest",
              } as RequestContext,
            );
            // TODO: Confirm after sending tx that balance reflects new amount?
            // const balance = await getOnchainBalance(
            //   assetId,
            //   agent.address,
            //   config.chainConfig[chainId].provider,
            // );
            // if (balance.lt(amount)) {
            //   throw new Error(`Agent has insufficient funds of ${assetId}`);
            // }
          } catch (e) {
            txInfo.error = e;
          } finally {
            txInfo.end = Date.now();
          }
          return txInfo;
        };
        return task;
      });
    const results = await Promise.all(tasks.map((task) => queue.add(task)));

    // TODO: process loop stats
    const errored = results.filter((x) => !!(x as any).error);
    loopStats = {
      errored: errored.length,
      successful: results.length - errored.length,
      concurrency,
    };
    if (errored.length === results.length) {
      logger.warn(loopStats, "All failed, exiting increases");
      break;
    }
    logger.info(loopStats, "Increasing concurrency");
  }

  logger.info({ maxConcurrency, concurrency: concurrency - 1 }, "Test complete");
  process.exit(0);
};

txserviceConcurrencyTest(parseInt(process.env.CONCURRENCY ?? "10"));
