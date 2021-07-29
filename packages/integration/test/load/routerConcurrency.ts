import pino from "pino";
import PriorityQueue from "p-queue";

import { SdkAgent } from "../utils/sdkAgent";
import { SdkManager } from "../utils/sdkManager";

const TIMEOUT = 15 * 60 * 100; // 15m in ms

// TODO: move to config
const sugardaddy_mnemonic = "";

/**
 * Sets up a basic concurrency test through the router. Will slowly add more agents up to `maxConcurrency` sending the given `numberTransactions` through the router simultaneously
 *
 * @param maxConcurrency - Concurrency to build up to. Refleced as the number of agents who will transfer simultaneously
 * @param numberTransactions - Number of transactions each agent will send simultaneously through the router
 */
const routerConcurrencyTest = async (maxConcurrency: number, numberTransactions: number): Promise<void> => {
  const log = pino({ level: "info" });
  // Create manager
  const manager = await SdkManager.connect(sugardaddy_mnemonic, numberTransactions + 1);
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
        //@ts-ignore
        return manager.transfer({}, TIMEOUT, agent);
      });
    const results = await Promise.all(tasks.map((task) => queue.add(task as any)));
    // TODO: process loop stats
    const errored = results.filter((x) => !!(x as any).error);
    loopStats = {
      errored: errored.length,
      successful: results.length - errored.length,
      concurrency,
    };
    log.info(loopStats, "Increasing concurrency");
  }

  log.info({ maxConcurrency }, "Test complete");
};

routerConcurrencyTest(parseInt(process.env.CONCURRENCY ?? "10"), parseInt(process.env.NUM_TRANSACTIONS ?? "15"));
