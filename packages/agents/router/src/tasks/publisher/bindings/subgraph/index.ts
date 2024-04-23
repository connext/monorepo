import { createLoggingContext, getNtpTimeSeconds, jsonifyError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { retryXCalls, sendStatusToSequencer } from "../../operations";
import { getMissingXCalls, getXCalls } from "../../operations/getXCalls";
import { getContext } from "../../publisher";

export const bindSubgraph = async (_pollInterval?: number) => {
  const { config, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(bindSubgraph.name);
  const pollInterval = _pollInterval ?? config.polling.subgraph;

  let getXCallsTimestamp = getNtpTimeSeconds();
  let retryXCallsTimestamp = getXCallsTimestamp;
  let getMissingXCallsTimestamp = getXCallsTimestamp;

  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        logger.info("getXCalls start", requestContext, methodContext, { getXCallsTimestamp });
        // 1. fetch `XCalled` transfers from the subgraph and store them to the cache
        await getXCalls();
        getXCallsTimestamp = getNtpTimeSeconds();
        logger.info("getXCalls end", requestContext, methodContext, { getXCallsTimestamp });
      } catch (e: unknown) {
        logger.error(
          "Error getting xcalls, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
      }
    }
  }, pollInterval);

  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        logger.info("retryXCalls start", requestContext, methodContext, { retryXCallsTimestamp });
        // 2. read `XCalled` transfers from the cache and re check statuses on the destination chain
        // If the status is one of both `Reconciled` and `Executed`, that transferId needs to be deleted on the cache
        // If the status is `XCalled`, submits the transfer to the sequencer.
        await retryXCalls();
        retryXCallsTimestamp = getNtpTimeSeconds();
        logger.info("retryXCalls end", requestContext, methodContext, { retryXCallsTimestamp });
      } catch (e: unknown) {
        logger.error(
          "Error retrying xcalls, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
      }
    }
  }, pollInterval);

  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      try {
        logger.info("getMissingXCalls start", requestContext, methodContext, { getMissingXCallsTimestamp });
        // 3. read `MissedXCalled` transfers from the cache and re check statuses on the destination chain
        // If missing store them in cached pending queue for submission to the sequencer
        await getMissingXCalls();
        getMissingXCallsTimestamp = getNtpTimeSeconds();
        logger.info("getMissingXCalls end", requestContext, methodContext, { getMissingXCallsTimestamp });
      } catch (e: unknown) {
        logger.error(
          "Error getting missed xcalls, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
      }
    }
  }, pollInterval);

  interval(async (_, stop) => {
    if (config.mode.cleanup) {
      stop();
    } else {
      const now = await getNtpTimeSeconds();
      const threshold = pollInterval * 5;
      if (now - getXCallsTimestamp > threshold) {
        throw new Error("getXCalls interval did not complete");
      }
      if (now - retryXCallsTimestamp > threshold) {
        throw new Error("retryXCalls interval did not complete");
      }
      if (now - getMissingXCallsTimestamp > threshold) {
        throw new Error("getMissingXCalls interval did not complete");
      }
      try {
        // 4. Sends status to sequencer at a regular inverval
        await sendStatusToSequencer();
      } catch (e: unknown) {
        logger.error(
          "Error sending status to sequencer, waiting for next loop",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
      }
    }
  }, pollInterval);
};
