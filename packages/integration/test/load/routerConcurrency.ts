import PriorityQueue from "p-queue";
import { Logger } from "@connext/nxtp-utils";

import { SdkManager } from "../utils/sdkManager";
import { getConfig } from "../utils/config";
import { getOnchainBalance } from "../utils/chain";
import { writeStatsToFile } from "../utils/reporting";

// Time to wait before giving up on tx completion
const TIMEOUT = 15 * 60 * 1000; // 15m in ms
// Amount to send in each tx (in wei)
const AMOUNT_PER_TRANSFER = "10";
// The max percentage of errors we will accept before exiting the test.
const ERROR_PERCENTAGE = 0.5;

/**
 * Sets up a basic concurrency test through the router. Will slowly add more agents up to `maxConcurrency` sending the given `numberTransactions` through the router simultaneously
 *
 * @param maxConcurrency - Concurrency to build up to. Refleced as the number of agents who will transfer simultaneously
 * @param numberTransactions - Number of transactions each agent will send simultaneously through the router
 */
const routerConcurrencyTest = async (maxConcurrency: number, numberTransactions: number): Promise<void> => {
  const config = getConfig();
  const log = new Logger({ level: config.logLevel ?? "info" });

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
    log,
    config.natsUrl,
    config.authUrl,
  );
  log.warn("Created manager", undefined, undefined, { agents: numberTransactions + 1 });

  // Update with token
  await manager.giftAgentsOnchain(sendingAssetId, sendingChainId);

  let concurrency = 0;
  const stats = [];

  for (const _ of Array(maxConcurrency).fill(0)) {
    concurrency += 1;
    log.warn("Beginning concurrency test", undefined, undefined, { concurrency });

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
          if (balance.lt(AMOUNT_PER_TRANSFER)) {
            throw new Error(`Agent has insufficient funds of ${sendingAssetId}`);
          }
          // TODO: has to work with tokens!
          const result = await manager.transfer(
            {
              sendingAssetId,
              sendingChainId,
              receivingAssetId,
              receivingChainId,
              amount: AMOUNT_PER_TRANSFER,
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
    log.warn("Processing loop stats");
    const errors = results.map((t) => t.error).filter((e) => !!e);
    const executionTimes = results.map((t) => t.end! - t.start).sort((a, b) => a - b);
    const executionTimesMinutes = executionTimes.map((t) => t / 60_000);
    const avgExecutionTime = executionTimesMinutes.reduce((a, b) => a + b, 0) / executionTimesMinutes.length;
    const loopStats = {
      errored: errors.length,
      successful: results.length - errors.length,
      concurrency,
      errors,
      avgExecutionTime: `${avgExecutionTime} min`,
      medianExecutionTime: `${executionTimesMinutes[Math.floor(executionTimesMinutes.length / 2)]} min`,
      fastest: `${executionTimesMinutes[0]} min`,
      slowest: `${executionTimesMinutes[executionTimesMinutes.length - 1]} min`,
    };
    stats.push(loopStats);
    if (errors.length / results.length >= ERROR_PERCENTAGE) {
      log.warn("Passed failing threshold, exiting increases", undefined, undefined, {
        ...loopStats,
        errorThreshold: ERROR_PERCENTAGE,
      });
      break;
    }
    const msg = concurrency === maxConcurrency ? "Completed tests" : "Increasing concurrency";
    log.warn(msg, undefined, undefined, loopStats);
  }

  /// MARK - SAVE RESULTS.
  writeStatsToFile(`router.concurrency`, stats);

  log.warn("Test complete", undefined, undefined, { maxConcurrency, concurrency });
  process.exit(0);
};

routerConcurrencyTest(parseInt(process.env.CONCURRENCY ?? "3"), parseInt(process.env.NUM_TRANSACTIONS ?? "5"));
