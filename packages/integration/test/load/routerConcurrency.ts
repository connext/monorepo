import pino from "pino";
import { SdkAgent } from "../utils/sdkAgent";

import { SdkManager } from "../utils/sdkManager";

const TIMEOUT = 15 * 60 * 100; // 15m in ms

/**
 * Sets up a basic concurrency test through the router. Will slowly add more agents up to `maxConcurrency` sending the given `numberTransactions` through the router simultaneously
 *
 * @param maxConcurrency - Concurrency to build up to. Refleced as the number of agents who will transfer simultaneously
 * @param numberTransactions - Number of transactions each agent will send simultaneously through the router
 */
const routerConcurrencyTest = async (maxConcurrency: number, numberTransactions: number): Promise<void> => {
  const log = pino({ level: "info" });
  // Create manager
  const manager = await SdkManager.connect(process.env.MNEMONIC!, numberTransactions + 1);
  log.info({ agents: maxConcurrency }, "Created manager");

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
    const agents: SdkAgent[] = [];
    const tasks = Array(numberTransactions)
      .fill(0)
      .map((_) => {
        const agent = manager.getRandomAgent(agents);
        agents.push(agent);
        return manager.transfer({}, TIMEOUT, agent);
      });

    const results = await Promise.all(tasks.map((task) => queue.add(task)));
    // TODO: process loop stats
  }
};

routerConcurrencyTest(parseInt(process.env.CONCURRENCY ?? "10"), parseInt(process.env.NUM_TRANSACTIONS ?? "15"));
