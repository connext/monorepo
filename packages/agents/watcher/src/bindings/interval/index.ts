import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";
import interval from "interval-promise";

import { validateAndPause } from "../../operations/validateAndPause";
import { validateAndSwitch } from "../../operations/validateAndSwitch";
import { getContext } from "../../watcher";

export const startMintedAssetsInvariantCheck = async (): Promise<void> => {
  const { config, logger } = getContext();

  interval(async () => {
    const { requestContext, methodContext } = createLoggingContext("Interval");
    try {
      logger.info("Starting minted assets check", requestContext, methodContext);
      await validateAndPause(requestContext);
      logger.info("Finished minted assets check", requestContext, methodContext);
    } catch (err: unknown) {
      logger.error("Error in minted assets check!", requestContext, methodContext, jsonifyError(err as NxtpError));
    }
  }, config.mintedAssetsCheckInterval);
};

export const startProposalInvariantCheck = async (): Promise<void> => {
  const { config, logger } = getContext();

  interval(async () => {
    const { requestContext, methodContext } = createLoggingContext("Interval");
    try {
      logger.info("Starting proposal check", requestContext, methodContext);
      await validateAndSwitch(requestContext);
      logger.info("Finished proposal check", requestContext, methodContext);
    } catch (err: unknown) {
      logger.error("Error in proposal check!", requestContext, methodContext, jsonifyError(err as NxtpError));
    }
  }, config.proposalCheckInterval);
};
