import pino from "pino";
import PriorityQueue from "p-queue";
import { ChainConfig, TransactionService, WriteTransaction } from "@connext/nxtp-txservice";
import { RequestContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { TransactionInfo } from "../utils/sdkManager";
import { getConfig } from "../utils/config";
import { OnchainAccountManager } from "../utils/accountManager";

/**
 * Sets up a basic concurrency test through the core TransactionService only. Will slowly add more agents up to `maxConcurrency` sending transactions.
 * @param maxConcurrency - Concurrency to build up to. We start at 1, and work up to this number. On each iteration, the concurrency value will be the number of agents who will do transactions simultaneously.
 * @param step - Step by which we increase the concurrency.
 * 
 * @remarks
 * Quick start:
 * 1. First run
 *        yarn workspace @connext/nxtp-integration docker:all:down && yarn workspace @connext/nxtp-integration docker:services:up && bash setup-integration-test.sh
 * 2. In another terminal run
 *        yarn workspace @connext/nxtp-integration concurrency:txservice
 */
const txserviceConcurrencyTest = async (maxConcurrency: number, step = 1): Promise<void> => {
  const config = getConfig();
  const logger = pino({ level: config.logLevel ?? "info" });

  // Just pick the first chain in the config.
  const chainId = parseInt(Object.keys(config.chainConfig)[0]);

  // Create manager.
  logger.info({ agents: maxConcurrency }, "Creating manager. This may take a bit...");
  const manager = new OnchainAccountManager(config.chainConfig, config.mnemonic, Math.min(maxConcurrency, 100));
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

  logger.info("Beginning concurrency test.");
  let concurrency: number;
  let loopStats;
  for (concurrency = step; concurrency <= maxConcurrency; concurrency += step) {
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

    const errored = results.filter((x) => !!(x as any).error);
    loopStats = {
      errored: errored.length,
      successful: results.length - errored.length,
      concurrency,
    };
    // NOTE: We are currently exiting once we receive at least one error.
    if (errored.length > 0) {
      for (const error of errored) {
        logger.error(error);
      }
      logger.warn(loopStats, "Received errors, exiting.");
      break;
    }
    logger.info(loopStats, "Increasing concurrency.");
  }

  // TODO: Save to file stats, errors, etc.
  logger.info({ maxConcurrency, concurrency }, "Test complete.");
  process.exit(0);
};

// NOTE: With this current setup's default, we will run the concurrency loop twice - once with 500 tx's and once with 1000 tx's.
txserviceConcurrencyTest(parseInt(process.env.CONCURRENCY ?? "1000"), parseInt(process.env.CONCURRENCY_STEP ?? "500"));
