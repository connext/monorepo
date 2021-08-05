import pino from "pino";
import PriorityQueue from "p-queue";

import { SdkManager } from "../utils/sdkManager";
import { getConfig } from "../utils/config";
import { getOnchainBalance } from "../utils/chain";

const TIMEOUT = 15 * 60 * 100; // 15m in ms

/**
 * Sets up a basic concurrency test through the router. Will slowly add more agents up to `maxConcurrency` sending the given `numberTransactions` through the router simultaneously
 *
 * @param maxConcurrency - Concurrency to build up to. Refleced as the number of agents who will transfer simultaneously
 * @param numberTransactions - Number of transactions each agent will send simultaneously through the router
 */
const routerConcurrencyTest = async (maxConcurrency: number, numberTransactions: number): Promise<void> => {
  const config = getConfig();
  const log = pino({ level: config.logLevel ?? "info" });

  // Get transfer info from config
  // TODO: randomize?
  const sendingChainId = parseInt(Object.keys(config.chainConfig)[0]);
  const receivingChainId = parseInt(Object.keys(config.chainConfig)[1]);
  const swap = config.swapPools.find((swap) => {
    // Must have sending and receiving chain
    const chains = swap.assets.map((a) => a.chainId);
    return chains.includes(sendingChainId) && chains.includes(receivingChainId);
  });
  if (!swap) {
    throw new Error(`Could not find matching swap in config: ${config.swapPools}`);
  }
  const { assetId: sendingAssetId } = swap.assets.find((a) => a.chainId === sendingChainId)!;
  const { assetId: receivingAssetId } = swap.assets.find((a) => a.chainId === receivingChainId)!;

  // Create manager
  const manager = await SdkManager.connect(
    config.chainConfig,
    config.mnemonic,
    numberTransactions + 1,
    config.natsUrl,
    config.authUrl,
  );
  log.info({ agents: numberTransactions + 1 }, "Created manager");

  // Update with token
  await manager.giftAgentsOnchain(sendingAssetId, sendingChainId);

  let concurrency = 0;
  let loopStats;

  for (const _ of Array(maxConcurrency).fill(0)) {
    concurrency += 1;
    log.info({ concurrency }, "Beginning concurrency test");

    // Create a queue to hold all payments with the given
    // concurrency
    const queue = new PriorityQueue({ concurrency });

    // Add payment tasks to the queue
    // Each payment should be made via some random agent
    // TODO: no single agent should be sending multiple txs
    // because this is a concurrent queue and the nonce of the
    // wallet will be all fucked up. Should get a unique array of agents
    // who each send a transaction, all concurrently
    const tasks = Array(numberTransactions)
      .fill(0)
      .map((_) => {
        const task = async () => {
          const agent = manager.getRandomAgent();
          const balance = await getOnchainBalance(
            sendingAssetId,
            agent.address,
            config.chainConfig[sendingChainId].provider,
          );
          const amount = "100000";
          if (balance.lt(amount)) {
            throw new Error(`Agent has insufficient funds of ${sendingAssetId}`);
          }
          // TODO: has to work with tokens!
          const result = await manager.transfer(
            {
              sendingAssetId,
              sendingChainId,
              receivingAssetId,
              receivingChainId,
              amount,
            },
            TIMEOUT,
            agent,
          );
          return result;
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
      log.warn(loopStats, "All failed, exiting increases");
      break;
    }
    log.info(loopStats, "Increasing concurrency");
  }

  log.info({ maxConcurrency, concurrency }, "Test complete");
  process.exit(0);
};

routerConcurrencyTest(parseInt(process.env.CONCURRENCY ?? "10"), parseInt(process.env.NUM_TRANSACTIONS ?? "15"));
