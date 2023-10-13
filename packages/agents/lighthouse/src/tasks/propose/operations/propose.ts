import {
  createLoggingContext,
  NxtpError,
  RequestContext,
  RootManagerMeta,
  SnapshotRoot,
  SparseMerkleTree,
  jsonifyError,
  domainToChainId,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { NoBaseAggregateRootCount, NoBaseAggregateRoot } from "../../../errors";
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
    adapters: { database },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propose.name);
  logger.info("Starting propose operation", requestContext, methodContext);

  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForHubDomain(config.hubDomain, requestContext, methodContext);
  }

  // Get the latest pending snapshots
  // Generate aggreagate root given latest snapshot
  // Encode params data for contract call
  const pendingSnapshotsById: Map<string, SnapshotRoot[]> = new Map();
  const domains: string[] = Object.keys(config.chains);

  const pendingSnapshotRoots = await database.getPendingSnapshots();

  for (const snapshotRoot of pendingSnapshotRoots) {
    if (pendingSnapshotsById.has(snapshotRoot.id)) {
      const snapshotRoots = pendingSnapshotsById.get(snapshotRoot.id);
      snapshotRoots!.push(snapshotRoot);
    } else {
      pendingSnapshotsById.set(snapshotRoot.id, [snapshotRoot]);
    }
  }
  pendingSnapshotsById.forEach((snapshotRoots: SnapshotRoot[], snapshotId: string) => {
    logger.debug("Snaphot ID and roots", requestContext, methodContext, { snapshotId, snapshotRoots });
  });

  // Criteria for selecting the latest saved snapshot roots:
  // 1. Should have all domains. TODO: Need to handle the special case of adding a new domain
  // 2. Find the highest snapshot ID

  const latestSnapshotIds = [...new Map([...pendingSnapshotsById].sort().reverse()).keys()];
  if (latestSnapshotIds.length === 0) {
    logger.info("No pending snapshot roots found. Nothing to propose", requestContext, methodContext);
    return;
  }
  const latestSnapshotId = latestSnapshotIds[0];

  try {
    const snapshotRoots = pendingSnapshotsById.get(latestSnapshotId);
    const orderedSnapshotRoots: SnapshotRoot[] = [];
    // TODO: What is the right order of the domains?
    domains.forEach((domain) => {
      orderedSnapshotRoots.push(...snapshotRoots!.filter((s) => s.spokeDomain === Number(domain)));
    });

    await proposeSnapshot(
      latestSnapshotId,
      orderedSnapshotRoots.map((s) => s.root),
      requestContext,
    );
  } catch (err: unknown) {
    logger.error("Error proposing snapshot", requestContext, methodContext, jsonifyError(err as NxtpError));
  }
};

export const proposeSnapshot = async (snapshotId: string, snapshotRoots: string[], _requestContext: RequestContext) => {
  const {
    logger,
    adapters: { contracts, relayers, database, chainreader, subgraph },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("proposeSnapshot", _requestContext);
  const rootManagerMeta: RootManagerMeta = await subgraph.getRootManagerMeta(config.hubDomain);
  const domains = rootManagerMeta.domains;

  const relayerProxyHubAddress = config.chains[config.hubDomain].deployments.relayerProxy;
  const hubChainId = domainToChainId(+config.hubDomain);
  // const _totalFee = constants.Zero;

  const baseAggregateRoot = await database.getBaseAggregateRoot();

  if (baseAggregateRoot === undefined) {
    throw new NoBaseAggregateRoot();
  }

  const baseAggregateRootCount = await database.getAggregateRootCount(baseAggregateRoot);
  if (!baseAggregateRootCount) {
    throw new NoBaseAggregateRootCount(baseAggregateRoot, requestContext);
  }
  const baseAggregateRoots: string[] = await database.getAggregateRoots(baseAggregateRootCount);
  const aggregateRootCount = baseAggregateRootCount + snapshotRoots.length;
  const opRoots = baseAggregateRoots.concat(snapshotRoots);

  // Count of leafs in aggregate tree at targetAggregateRoot.
  // TODO: check off by one
  const hubStore = new OptimisticHubDBHelper(opRoots, aggregateRootCount);
  const hubSMT = new SparseMerkleTree(hubStore);
  const aggregateRoot = hubSMT.getRoot();

  //TODO: Determine the right ordering of domains
  const orderedDomains = domains;

  const proposal = { snapshotId, aggregateRoot, snapshotRoots, orderedDomains };
  // TODO: Sign the proposal -- need signature from whitelisted proposer agent
  const signature = "";

  // encode data for relayer proxy hub
  const fee = BigNumber.from(0);
  logger.info("Got params for sending", requestContext, methodContext, {
    fee,
    proposal,
    signature,
  });

  const encodedDataForRelayer = contracts.relayerProxyHub.encodeFunctionData("proposeAggregateRootKeep3r", [
    proposal.snapshotId,
    proposal.aggregateRoot,
    proposal.snapshotRoots,
    proposal.orderedDomains,
    signature,
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
    // TODO: Update DB state to processed for all snapshot roots with ID <= this snapshotId
  } catch (e: unknown) {
    logger.error("Error at sendWithRelayerWithBackup", requestContext, methodContext, e as NxtpError, {
      hubChainId,
      hubDomain: config.hubDomain,
      relayerProxyHubAddress,
      encodedDataForRelayer,
    });
  }
};
