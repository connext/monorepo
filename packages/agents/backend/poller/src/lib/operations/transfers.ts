import { createLoggingContext, OriginTransfer, XTransferStatus, SubgraphQueryMetaParams } from "@connext/nxtp-utils";

import { getSubgraphHealth } from "../../shared";
import { getContext } from "../../backend";

export const updateTransfers = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    config,
    chainData,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("updateTransfers");

  const subgraphQueryMetaParams: Map<string, SubgraphQueryMetaParams> = new Map();

  for (const domain of domains) {
    // Update subgraph health and get the subgraphs' latest synced block.
    // TODO: Handle multiple health endpoints (i.e. backups); handle multiple subgraphs for a given domain.
    // TODO: Move this health check to SubgraphReader.
    let latestBlockNumber: number | undefined = undefined;
    const network = chainData.get(domain)!.network;
    // TODO: Remove hardcoded.
    const healthUrl = "https://api.thegraph.com/index-node/graphql";
    const subgraphName = `nxtp-amarok-runtime-${config.environment === "staging" ? "staging" : "v0"}-${network}`;
    const subgraphHealth = await getSubgraphHealth(subgraphName, healthUrl);
    if (subgraphHealth && subgraphHealth.synced) {
      latestBlockNumber = subgraphHealth.latestBlock;
    }
    if (!latestBlockNumber) {
      logger.error("Error getting the latestBlockNumber for domain.", requestContext, methodContext, undefined, {
        domain,
        subgraphName,
        latestBlockNumber,
        healthUrl,
      });
      continue;
    }

    // Retrieve latest nonce from the database; will reflect the most recent origin transfers we've saved for this domain.
    const latestNonce = await database.getLatestNonce(domain);

    subgraphQueryMetaParams.set(domain, {
      maxBlockNumber: latestBlockNumber,
      latestNonce,
      destinationDomains: domains,
    });
  }

  if (subgraphQueryMetaParams.size > 0) {
    // Get origin transfers for all domains in the mapping.
    const transfers = await subgraph.getOriginTransfersForAll(subgraphQueryMetaParams);
    logger.info("Retrieved origin transfers", requestContext, methodContext, {
      transfers: transfers.map((transfer) => transfer.transferId.slice(0, 8)),
    });
    await database.saveTransfers(transfers);
  }

  // now query pending transfers to see if any status updates happened
  const xcalledTransfers = await database.getTransfersByStatus("XCalled");
  const executedTransfers = await database.getTransfersByStatus(XTransferStatus.Executed);
  const reconciledTransfers = await database.getTransfersByStatus(XTransferStatus.Reconciled);

  logger.debug("Got pending", requestContext, methodContext, {
    xcalledTransfers: xcalledTransfers.map((transfer) => transfer.transferId),
    executedTransfers: executedTransfers.map((transfer) => transfer.transferId),
    reconciledTransfers: reconciledTransfers.map((transfer) => transfer.transferId),
  });

  const destinationTransfers = await subgraph.getDestinationTransfers(
    xcalledTransfers.concat(executedTransfers).concat(reconciledTransfers) as OriginTransfer[],
  );
  logger.debug("Got destination transfers for pending", requestContext, methodContext, {
    destinationTransfers: destinationTransfers.map((transfer) => {
      return { transferId: transfer.transferId, status: transfer.destination?.status };
    }),
  });
  await database.saveTransfers(destinationTransfers);
};
