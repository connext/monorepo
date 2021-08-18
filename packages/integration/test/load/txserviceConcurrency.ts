import pino from "pino";
import PriorityQueue from "p-queue";
import { ChainConfig, TransactionService, WriteTransaction } from "@connext/nxtp-txservice";
import { RequestContext } from "@connext/nxtp-utils";
import { BigNumber, Contract, utils } from "ethers";
// eslint-disable-next-line node/no-extraneous-import
import { Zero } from "@ethersproject/constants";

import { getConfig } from "../utils/config";
import { OnchainAccountManager } from "../utils/accountManager";
import { TestTokenABI } from "../utils/chain";
import { writeStatsToFile } from "../utils/reporting";

// The amount for each transaction in wei.
const AMOUNT_PER_TX = BigNumber.from("100000");
// The max percentage of errors we will accept before exiting the test.
const ERROR_PERCENTAGE = 0.5;

type TransactionInfo = {
  start: number;
  end?: number;
  error?: any;
};

/**
 * Sets up a basic concurrency test through the core TransactionService only. Will slowly add more agents up to `maxConcurrency` sending transactions.
 * @param maxConcurrency - Concurrency to build up to. We start at 1, and work up to this number. On each iteration, the concurrency value will be the number of agents who will do transactions simultaneously.
 * @param step - Step by which we increase the concurrency.
 *
 * @remarks
 * Quick start:
 * 1. If running locally:
 *        yarn workspace @connext/nxtp-integration docker:all:down && yarn workspace @connext/nxtp-integration docker:services:up && bash setup-integration-test.sh
 *    Otherwise:
 *        yarn workspace @connext/nxtp-integration docker:all:down && yarn workspace @connext/nxtp-integration docker:messaging:up && bash setup-integration-test.sh
 * 2. Then run:
 *        yarn workspace @connext/nxtp-integration concurrency:txservice
 */
const txserviceConcurrencyTest = async (maxConcurrency: number, step = 1, localChain = false): Promise<void> => {
  let concurrency: number;
  const config = getConfig(localChain);
  const logger: pino.Logger = pino({ level: config.logLevel ?? "info" });
  // For these tests, unless we are running on local, we should default to rinkeby.
  const chainId = localChain ? parseInt(Object.keys(config.chainConfig)[0]) : 4;

  /// MARK - SETUP MANAGER.
  logger.info({ agents: maxConcurrency }, "Creating manager. This may take a bit...");
  const manager = new OnchainAccountManager(
    config.chainConfig,
    config.mnemonic,
    Math.min(maxConcurrency, 100),
    logger.child({ name: "OnchainAccountManager" }),
  );
  logger.info({ agents: maxConcurrency }, "Created manager");

  const chains: { [chainId: string]: ChainConfig } = {};
  Object.entries(config.chainConfig).forEach(([chainId, config]) => {
    chains[chainId] = {
      confirmations: config.confirmations,
      providers: config.providerUrls.map((url) => ({ url })),
    } as ChainConfig;
  });

  /// MARK - SETUP TX SERVICE.
  logger.info("Creating TransactionService...");
  const txservice = new TransactionService(logger, manager.funder, { chains });
  logger.info("Creating Contract...");
  const testToken = new Contract(
    "0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198",
    TestTokenABI,
    config.chainConfig[chainId].provider,
  );

  /// MARK - VALIDATE FUNDS.
  // Make sure the funder has enough funding for this test.
  let totalNumberOfTransactions = 0;
  for (concurrency = step; concurrency <= maxConcurrency; concurrency += step) {
    totalNumberOfTransactions += concurrency;
  }
  const totalCost = BigNumber.from(totalNumberOfTransactions).mul(AMOUNT_PER_TX);
  logger.info(
    { totalNumberOfTransactions, totalCost: utils.formatUnits(totalCost, "ether") },
    "Total number of transactions to send.",
  );
  const funderBalance = await testToken.balanceOf(manager.funder.address);
  if (funderBalance.lt(totalCost)) {
    throw new Error(
      `Funder does not have enough funds. Needs ${utils.formatUnits(
        totalCost,
        "ether",
      )} eth but only has ${utils.formatUnits(funderBalance, "ether")}`,
    );
  } else {
    logger.info(
      { balance: utils.formatUnits(funderBalance, "ether"), needed: utils.formatUnits(totalCost, "ether") },
      "Funder has enough funds",
    );
  }

  /// MARK - TEST LOOP.
  logger.info("Beginning concurrency test.");
  const stats: any[] = [];
  let loopNumber = 1;
  for (concurrency = step; concurrency <= maxConcurrency; concurrency += step) {
    // Create a queue to hold all payments with the given
    // concurrency
    const queue = new PriorityQueue({ concurrency });

    const tasks = Array(concurrency)
      .fill(0)
      .map((_: any, i: number) => {
        const task = async () => {
          const agent = manager.getRandomWallet();
          const txInfo: TransactionInfo = {
            start: Date.now(),
          };
          try {
            const data = testToken.interface.encodeFunctionData("transfer", [agent.address, AMOUNT_PER_TX]);
            await txservice.sendTx(
              {
                chainId,
                to: testToken.address,
                from: manager.funder.address,
                data: data,
                value: Zero,
              } as WriteTransaction,
              {
                id: `C${concurrency}:U${i + 1}`,
                origin: "concurrencyTest",
              } as RequestContext,
            );
            // TODO: Confirm after sending tx that balance reflects new amount?
            // If we want to do this, we need to use the txservice readTx method.
            // Also note that this will tack on extra time to the test, if we do so.
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

    const errored = results.filter((x) => !!x.error);
    // A dictionary-like head count of all the different types of errors we got.
    const errors: { [message: string]: { count: number; tracebacks: any[] } } = {};
    errored.forEach((info) => {
      const message = info.error.message || info.error.toString();
      const e = errors[message];
      errors[message] = {
        count: e ? e.count + 1 : 1,
        tracebacks: e ? e.tracebacks.concat(e) : [e],
      };
    });

    const executionTimes = results.map((x) => x.end! - x.start);
    const avgExecutionTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;
    const iterationData = {
      loopNumber,
      concurrency,
      averageExecutionTime: `${Math.round(100 * (avgExecutionTime / 1000)) / 100}s`,
      medianExecutionTime: `${
        Math.round(100 * (executionTimes[Math.floor(executionTimes.length / 2)] / 3600)) / 1000
      }s`,
      errored: errored.length,
      successful: results.length - errored.length,
      errors,
    };
    stats.push(iterationData);
    // NOTE: We are currently exiting once we receive ERROR_PERCENTAGE errors out of the total.
    if (errored.length > concurrency * ERROR_PERCENTAGE) {
      for (const error of errored) {
        logger.error(error);
      }
      logger.warn(iterationData, "Received errors, exiting.");
      break;
    }
    logger.info(iterationData, `Loop ${loopNumber}`);
    loopNumber++;
  }

  /// MARK - SAVE RESULTS.
  writeStatsToFile(`txservice.concurrency`, stats);
  logger.info({ maxConcurrency, concurrency: concurrency - step }, "Test complete.");
};

// NOTE: With this current setup's default, we will run the concurrency loop twice - once with 500 tx's and once with 1000 tx's.
txserviceConcurrencyTest(
  parseInt(process.env.CONCURRENCY_MAX ?? "1000"),
  parseInt(process.env.CONCURRENCY_STEP ?? "100"),
);
