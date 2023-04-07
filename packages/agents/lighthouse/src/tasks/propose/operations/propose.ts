import {
  createLoggingContext,
  NxtpError,
  RequestContext,
  RootManagerMeta,
  Snapshot,
  SparseMerkleTree,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { NoBaseAggregateRootCount } from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForHubDomain } from "../errors";
import { getContext } from "../propose";
import { OptimisticHubDBHelper } from "../adapters";

export type ExtraPropagateParam = {
  _connector: string;
  _fee: string;
  _encodedData: string;
};

export const propose = async () => {
  //TODO: Round up the usual suspects
  const {
    logger,
    config,
    chainData,
    adapters: { chainreader, contracts, relayers, subgraph, database },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propose.name);
  logger.info("Starting propose operation", requestContext, methodContext);

  // Get latest all pending snapshots
  // Process each snapshot
  // Generate aggreagate given snapshot
  // Encode params data for contract call
  const pendingSnapshots = await database.getPendingSnapshots();
  //TODO: Group by ID
  const pendingSnapshotsById = pendingSnapshots;
  await Promise.all(
    pendingSnapshotsById.map(async (snapshots) => {
      try {
        //TODO: Order by by domain order
        const snapshotId = 0;
        const roots: string[] = [];
        proposeSnapshot(snapshotId, roots, requestContext);
      } catch (err: unknown) {
        logger.error("Error proposing snapshot", requestContext, methodContext, jsonifyError(err as NxtpError));
      }
    }),
  );
};

export const proposeSnapshot = async (snapshotId: number, snapshotRoots: string[], _requestContext: RequestContext) => {
  const {
    logger,
    adapters: { contracts, relayers, database, chainreader, subgraph },
    config,
    chainData,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("proposeSnapshot", _requestContext);
  const rootManagerMeta: RootManagerMeta = await subgraph.getRootManagerMeta(config.hubDomain);
  const domains = rootManagerMeta.domains;

  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForHubDomain(config.hubDomain, requestContext, methodContext);
  }

  const relayerProxyHubAddress = config.chains[config.hubDomain].deployments.relayerProxy;
  const _encodedData: string[] = [];
  const _fees: string[] = [];
  let _totalFee = constants.Zero;

  const baseAggregateRoot: string = await database.getBaseAggregateRoot();
  const baseAggregateRootCount = await database.getAggregateRootCount(baseAggregateRoot);
  const baseAggregateRoots: string[] = await database.getAggregateRoots(baseAggregateRootCount);
  if (!baseAggregateRootCount) {
    // TODO: What if the system was never in slow mode ?
    throw new NoBaseAggregateRootCount(baseAggregateRoot);
  }
  const aggregateRootCount = baseAggregateRootCount + snapshotRoots.length;
  const opRoots = baseAggregateRoots.concat(snapshotRoots);

  // Count of leafs in aggregate tree at targetAggregateRoot.
  // TODO: check off by one
  const hubStore = new OptimisticHubDBHelper(opRoots, aggregateRootCount);
  const hubSMT = new SparseMerkleTree(hubStore);
  const aggregateRoot = hubSMT.getRoot();

  //TODO: Determine the right ordering of domains
  const orderedDomains = domains;
  //TODO: Determine the dispute cliff given the snapshot ID
  const disputeCliff = 0;

  const proposal = { snapshotId, disputeCliff, aggregateRoot, snapshotRoots, orderedDomains, baseAggregateRoot };

  // encode data for relayer proxy hub
  const fee = BigNumber.from(0);
  logger.info("Got params for sending", requestContext, methodContext, {
    fee,
    proposal,
    _fees,
    _encodedData,
  });

  const encodedDataForRelayer = contracts.relayerProxyHub.encodeFunctionData("proposeAggregateRoot", [
    proposal,
    _fees,
    _encodedData,
    fee,
  ]);

  try {
    const { taskId } = await sendWithRelayerWithBackup(
      hubChainId,
      config.hubDomain,
      relayerProxyHubAddress,
      encodedDataForRelayer,
      relayers,
      chainreader,
      logger,
      requestContext,
    );
    logger.info("Propose tx sent", requestContext, methodContext, { taskId });
  } catch (e: unknown) {
    logger.error("Error at sendWithRelayerWithBackup", requestContext, methodContext, e as NxtpError, {
      hubChainId,
      hubDomain: config.hubDomain,
      relayerProxyHubAddress,
      encodedDataForRelayer,
    });
  }
};
