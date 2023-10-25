import { createLoggingContext, jsonifyError, NxtpError } from "@connext/nxtp-utils";

import { AppContext } from "../../shared";
import {
  updateAggregatedRoots,
  updatePropagatedRoots,
  updateReceivedAggregateRoots,
  updateProposedSnapshots,
  updateProposedSpokeOptimisticRoot,
  updateFinalizedRoots,
  updateFinalizedSpokeRoots,
  updatePropagatedOptmisticRoots,
  retrieveSavedSnapshotRoot,
} from "../../lib/operations/roots";

export const bindRoots = async (context: AppContext) => {
  const { logger } = context;
  const { requestContext, methodContext } = createLoggingContext(bindRoots.name);
  try {
    logger.debug("Bind roots polling loop start", requestContext, methodContext);
    //Slow mode data
    await updateAggregatedRoots();
    await updatePropagatedRoots();
    await updateReceivedAggregateRoots();

    //Optimistic mode data
    await updateProposedSnapshots();
    await updateProposedSpokeOptimisticRoot();
    await updateFinalizedRoots();
    await updateFinalizedSpokeRoots();
    await updatePropagatedOptmisticRoots();

    //Snapshot Root data
    await retrieveSavedSnapshotRoot();

    logger.debug("Bind roots polling loop complete", requestContext, methodContext);
  } catch (err: unknown) {
    logger.error(
      "Error getting txs, waiting for next loop",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};
