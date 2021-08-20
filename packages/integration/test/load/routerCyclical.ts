import { delay } from "@connext/nxtp-utils";
import { utils } from "ethers";
import pino from "pino";

import { getConfig } from "../utils/config";
import { SdkManager } from "../utils/sdkManager";
import { writeStatsToFile } from "../utils/reporting";

/**
 * This test will establish a given number of agents, and have them all transfer funds between each other for a set duration (in minutes). The test should log the number of successful transactions and some status around the time the transactions take.
 *
 * @param numberOfAgents - the number of sdk agents who should be transferring. pulls from the env and defaults to 10
 * @param duration - how long (in minutes) the test should run for. pulls from the env and defaults to 15
 */
const routerCyclical = async (numberOfAgents: number, duration: number) => {
  const config = getConfig();
  const log = pino({ level: config.logLevel ?? "info" });

  const durationMs = duration * 60 * 1000;
  // Create manager
  const manager = await SdkManager.connect(
    config.chainConfig,
    config.mnemonic,
    numberOfAgents,
    log,
    config.natsUrl,
    config.authUrl,
  );
  log.info({ agents: numberOfAgents }, "Created manager");

  // Get transfer config
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

  // Fund agents with tokens on sending + receiving chain
  await manager.giftAgentsOnchain(sendingAssetId, sendingChainId);

  await manager.giftAgentsOnchain(receivingAssetId, receivingChainId);

  // Begin transfers
  log.warn({ duration, numberOfAgents }, "Beginning cyclical test");

  const startTime = Date.now();
  const killSwitch = await manager.startCyclicalTransfers({
    sendingAssetId,
    sendingChainId,
    receivingAssetId,
    receivingChainId,
    amount: utils.parseEther("0.0000001").toString(),
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      log.warn({ duration, numberOfAgents, durationMs, startTime, now: Date.now() }, "Activating kill switch");
      killSwitch();
      resolve(undefined);
    }, durationMs);
  });

  // Wait 90s for stragglers
  await delay(90 * 1000);

  log.warn({ duration, numberOfAgents }, "Test complete, printing summary");

  const summary = manager.getTransferSummary();
  log.error(summary, "Transfer summary");

  // Write transfer summary to file
  writeStatsToFile(`router.cyclical`, summary);

  log.error("Test complete");
  process.exit(0);
};

routerCyclical(parseInt(process.env.NUMBER_OF_AGENTS ?? "10"), parseInt(process.env.DURATION ?? "15"));
