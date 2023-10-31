import {
  createLoggingContext,
  NxtpError,
  RequestContext,
  RootManagerMeta,
  SparseMerkleTree,
  jsonifyError,
  domainToChainId,
  EMPTY_ROOT,
  getNtpTimeSeconds,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { NoBaseAggregateRootCount, NoBaseAggregateRoot } from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import {
  NoChainIdForDomain,
  MissingRequiredDomain,
  NoSnapshotRoot,
  NoSpokeConnector,
  NoMerkleTreeAddress,
  AggregateRootDuplicated,
  AggregateRootChecksFailed,
} from "../errors";
import { getContext } from "../propose";
import { OptimisticHubDBHelper } from "../adapters";

export type ExtraPropagateParam = {
  _connector: string;
  _fee: string;
  _encodedData: string;
};

export const proposeHub = async () => {
  const {
    logger,
    config,
    chainData,
    adapters: { database, subgraph },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(proposeHub.name);
  logger.info("Starting propose operation on hub", requestContext, methodContext);

  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForDomain(config.hubDomain, requestContext, methodContext);
  }

  // Get the latest pending snapshots
  // Generate aggreagate root given latest snapshot
  // Encode params data for contract call
  const domains: string[] = Object.keys(config.chains);

  const rootManagerMeta: RootManagerMeta = await subgraph.getRootManagerMeta(config.hubDomain);
  const rootManagerDomains = rootManagerMeta.domains;

  // Ensure all root manager domains are present in the config
  for (const domain of rootManagerDomains) {
    if (!domains.includes(domain)) {
      throw new MissingRequiredDomain(domain, requestContext, methodContext);
    }
  }

  // Find the latest snapshot ID.
  const hubSpokeConnector = config.chains[config.hubDomain]?.deployments.spokeConnector;
  if (!hubSpokeConnector) {
    throw new NoSpokeConnector(config.hubDomain, requestContext, methodContext);
  }

  const latestSnapshotId: string = Math.abs(getNtpTimeSeconds() / config.snapshotDuration).toString();
  logger.info("Using latest snapshot ID", requestContext, methodContext, {
    latestSnapshotId,
  });

  try {
    const orderedSnapshotRoots: string[] = [];
    const snapshotRoots: Map<string, string> = new Map();

    // Sort the snapshot roots in the order of root manager domains
    await Promise.all(
      rootManagerDomains.map(async (domain) => {
        const latestSnapshotRoot = await database.getLatestPendingSnapshotRootByDomain(+domain);
        if (!latestSnapshotRoot) {
          throw new NoSnapshotRoot(domain, requestContext, methodContext);
        }
        snapshotRoots.set(domain, latestSnapshotRoot);
      }),
    );

    rootManagerDomains.forEach((domain) => {
      orderedSnapshotRoots.push(snapshotRoots.get(domain)!);
    });

    await proposeSnapshot(latestSnapshotId, orderedSnapshotRoots, rootManagerDomains, requestContext);
  } catch (err: unknown) {
    logger.error(
      "Error proposing snapshot on proposeHub",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
  }
};

export const proposeSnapshot = async (
  snapshotId: string,
  snapshotRoots: string[],
  orderedDomains: string[],
  _requestContext: RequestContext,
) => {
  const {
    logger,
    adapters: { contracts, relayers, database, chainreader },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("proposeSnapshot", _requestContext);

  const rootManagerAddress = config.chains[config.hubDomain].deployments.rootManager;
  const hubChainId = domainToChainId(+config.hubDomain);
  // const _totalFee = constants.Zero;

  let baseAggregateRoot = await database.getBaseAggregateRoot();

  // If this is the first snapshot, there will be no base aggregate root.
  let baseAggregateRootCount: number | undefined;
  if (!baseAggregateRoot) {
    const rootMerkleTreeAddress = config.chains[config.hubDomain]?.deployments.hubMerkleTree;
    if (!rootMerkleTreeAddress) {
      throw new NoMerkleTreeAddress(config.hubDomain, requestContext, methodContext);
    }

    let root: string;
    let count: BigNumber;
    const encodedData = contracts.merkleTreeManager.encodeFunctionData("rootAndCount");
    try {
      const idResultData = await chainreader.readTx({
        domain: +config.hubDomain,
        to: rootMerkleTreeAddress,
        data: encodedData,
      });

      [root, count] = contracts.merkleTreeManager.decodeFunctionResult("rootAndCount", idResultData);
    } catch (err: unknown) {
      logger.error(
        "Failed to read the latest aggregate root and count from onchain",
        requestContext,
        methodContext,
        jsonifyError(err as NxtpError),
      );
      // Cannot proceed without the latest snapshot ID.
      return;
    }
    logger.info("Got the latest aggregate root and count from onchain", requestContext, methodContext, {
      root,
      count,
    });

    if (root === EMPTY_ROOT && count.isZero()) {
      baseAggregateRoot = root;
      baseAggregateRootCount = 0;
      logger.info("Found EMPTY_ROOT from onchain", requestContext, methodContext, {
        baseAggregateRoot,
        baseAggregateRootCount,
      });
    }
  }

  if (baseAggregateRoot === undefined) {
    throw new NoBaseAggregateRoot();
  }

  if (baseAggregateRootCount === undefined) {
    baseAggregateRootCount = await database.getBaseAggregateRootCount(baseAggregateRoot);
  }
  if (baseAggregateRootCount === undefined) {
    throw new NoBaseAggregateRootCount(baseAggregateRoot);
  }

  const baseAggregateRoots: string[] = await database.getAggregateRoots(baseAggregateRootCount);
  const aggregateRootCount = baseAggregateRootCount + snapshotRoots.length;
  const opRoots = baseAggregateRoots.concat(snapshotRoots);

  // Count of leafs in aggregate tree at targetAggregateRoot.
  const hubStore = new OptimisticHubDBHelper(opRoots, aggregateRootCount);
  const hubSMT = new SparseMerkleTree(hubStore);
  const aggregateRoot = await hubSMT.getRoot();

  const snapshot = await database.getPendingAggregateRoot(aggregateRoot);
  if (snapshot) {
    throw new AggregateRootDuplicated(aggregateRoot, requestContext, methodContext);
  }

  const rootChecks = await aggregateRootCheck(aggregateRoot, requestContext);
  if (!rootChecks) {
    throw new AggregateRootChecksFailed(aggregateRoot, requestContext, methodContext);
  }

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

  const encodedDataForRelayer = contracts.rootManager.encodeFunctionData("proposeAggregateRoot", [
    proposal.snapshotId,
    proposal.aggregateRoot,
    proposal.snapshotRoots,
    proposal.orderedDomains,
  ]);

  try {
    const { taskId } = await sendWithRelayerWithBackup(
      hubChainId,
      config.hubDomain,
      rootManagerAddress,
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
      rootManagerAddress,
      encodedDataForRelayer,
    });
  }
};

export const aggregateRootCheck = async (aggregateRoot: string, _requestContext: RequestContext): Promise<boolean> => {
  const {
    logger,
    adapters: { contracts, database, chainreader },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("proposeSnapshot", _requestContext);

  const rootManagerAddress = config.chains[config.hubDomain].deployments.rootManager;
  //
  const encodedTimestampData = contracts.rootManager.encodeFunctionData("lastSavedAggregateRootTimestamp");
  let rootTimestamp: any;
  try {
    const idResultData = await chainreader.readTx({
      domain: +config.hubDomain,
      to: rootManagerAddress,
      data: encodedTimestampData,
    });

    rootTimestamp = contracts.rootManager.decodeFunctionResult("lastSavedAggregateRootTimestamp", idResultData);
  } catch (err: unknown) {
    logger.error(
      "Failed to read the lastSavedAggregateRootTimestamp",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
      { rootTimestamp: rootTimestamp.toString() },
    );
    // Cannot proceed without the latest lastSavedAggregateRootTimestamp.
    return false;
  }
  if (!rootTimestamp) {
    // Cannot proceed without the lastSavedAggregateRootTimestamp.
    return false;
  }

  const encodedData = contracts.rootManager.encodeFunctionData("validAggregateRoots", [
    BigNumber.from(rootTimestamp).toString(),
  ]);
  let _onChainRoot: any;
  try {
    const idResultData = await chainreader.readTx({
      domain: +config.hubDomain,
      to: rootManagerAddress,
      data: encodedData,
    });

    [_onChainRoot] = contracts.rootManager.decodeFunctionResult("validAggregateRoots", idResultData);
  } catch (err: unknown) {
    logger.error(
      "Failed to read the validated aggregate root ",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
      { rootTimestamp },
    );
    // Cannot proceed without the valid aggregate root for lastSavedAggregateRootTimestamp.
    return false;
  }
  if (!_onChainRoot) {
    // Cannot proceed without the valid aggregate root for lastSavedAggregateRootTimestamp.
    return false;
  }
  logger.info("Got the validated aggregate root from onchain", requestContext, methodContext, {
    _onChainRoot,
  });

  const onChainRoot = _onChainRoot as string;

  if (onChainRoot === aggregateRoot) {
    logger.info("Stop propose. Found onchain root same as proposed root", requestContext, methodContext, {
      aggregateRoot,
    });
    return false;
  }

  const snapshot = await database.getPendingAggregateRoot(onChainRoot);
  if (!snapshot) {
    // This can happen when DB and/or subgraph is out of sync
    logger.info("Stop propose. Onchain root not found in db", requestContext, methodContext, {
      onChainRoot,
    });
    return false;
  }

  // All checks passed, can propose the aggregate root.
  return true;
};
