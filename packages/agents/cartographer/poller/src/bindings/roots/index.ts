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
import { DEFAULT_SAFE_CONFIRMATIONS } from "../../lib/operations";

export const bindRoots = async (context: AppContext) => {
  const {
    logger,
    config,
    adapters: { subgraph },
  } = context;
  const { requestContext, methodContext } = createLoggingContext(bindRoots.name);

  try {
    logger.debug("Bind roots polling loop start", requestContext, methodContext);

    const allowedDomains = Object.keys(config.chains);
    const latestBlockNumbers = await subgraph.getLatestBlockNumber(allowedDomains);
    const maxBlockNumbers: Map<string, number> = new Map();
    for (const domain of latestBlockNumbers.keys()) {
      let confirmations = DEFAULT_SAFE_CONFIRMATIONS;
      if (config.chains[domain]) {
        confirmations = (config.chains[domain] as { confirmations: number | undefined }).confirmations ?? confirmations;
      }

      maxBlockNumbers.set(domain, latestBlockNumbers.get(domain)! - confirmations);
    }

    //Slow mode data
    await updateAggregatedRoots(maxBlockNumbers);
    await updatePropagatedRoots(maxBlockNumbers);
    await updateReceivedAggregateRoots(maxBlockNumbers);

    //Optimistic mode data
    await updateProposedSnapshots(maxBlockNumbers);
    await updateProposedSpokeOptimisticRoot(maxBlockNumbers);
    await updateFinalizedRoots(maxBlockNumbers);
    await updateFinalizedSpokeRoots(maxBlockNumbers);
    await updatePropagatedOptmisticRoots(maxBlockNumbers);

    //Snapshot Root data
    await retrieveSavedSnapshotRoot(maxBlockNumbers);

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
