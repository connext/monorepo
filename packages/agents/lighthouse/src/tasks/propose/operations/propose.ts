import {
  createLoggingContext,
  NxtpError,
  RequestContext,
  RootManagerMeta,
  SparseMerkleTree,
  jsonifyError,
  domainToChainId,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { NoBaseAggregateRootCount, NoBaseAggregateRoot } from "../../../errors";
import { sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForHubDomain, MissingRequiredDomain, NoSnapshotRoot, NoSpokeConnector } from "../errors";
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
    adapters: { database, subgraph, contracts, chainreader },
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
  const domains: string[] = Object.keys(config.chains);

  const rootManagerMeta: RootManagerMeta = await subgraph.getRootManagerMeta(config.hubDomain);
  const rootManagerDomains = rootManagerMeta.domains;

  // Ensure all root manager domains are present in the config
  rootManagerDomains.forEach((domain) => {
    if (!domains.includes(domain)) {
      throw new MissingRequiredDomain(domain, requestContext, methodContext);
    }
  });

  // Find the latest snapshot ID.
  const hubSpokeConnector = config.chains[config.hubDomain]?.deployments.spokeConnector;
  if (!hubSpokeConnector) {
    throw new NoSpokeConnector(config.hubDomain, requestContext, methodContext);
  }

  let latestSnapshotId: string;
  const idEncodedData = contracts.spokeConnector.encodeFunctionData("getLastCompletedSnapshotId");
  try {
    const idResultData = await chainreader.readTx({
      domain: +config.hubDomain,
      to: hubSpokeConnector,
      data: idEncodedData,
    });

    const [currentSnapshotId] = contracts.spokeConnector.decodeFunctionResult(
      "getLastCompletedSnapshotId",
      idResultData,
    );
    latestSnapshotId = currentSnapshotId.toString();
  } catch (err: unknown) {
    logger.error(
      "Failed to read the latest snapshot ID from onchain",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
    // Cannot proceed without the latest snapshot ID.
    return;
  }
  logger.info("Got the latest snapshot ID from onchain", requestContext, methodContext, {
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
    logger.error("Error proposing snapshot", requestContext, methodContext, jsonifyError(err as NxtpError));
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
  const hubStore = new OptimisticHubDBHelper(opRoots, aggregateRootCount);
  const hubSMT = new SparseMerkleTree(hubStore);
  const aggregateRoot = await hubSMT.getRoot();

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
