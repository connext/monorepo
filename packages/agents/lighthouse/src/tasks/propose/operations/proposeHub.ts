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
  sign,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { solidityKeccak256 } from "ethers/lib/utils";

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
  WaitTimeNotCompleted,
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

  // Use N snapshot ID to ensure that the proposal submitted.
  const currentTimestamp = getNtpTimeSeconds();
  const latestSnapshotId: number = Math.floor(currentTimestamp / config.snapshotDuration);
  const latestSnapshotTimestamp = latestSnapshotId * config.snapshotDuration;

  const timeSinceSnapshotStart = currentTimestamp - latestSnapshotTimestamp;
  const waitTime = Math.floor(config.snapshotDuration / 3);
  if (timeSinceSnapshotStart < waitTime) {
    // Exit if earlier than 1/3 of the snapshot duration to help accommodate time boundary conditions
    logger.info("Skipping ProposeHub. Wait time not completed", requestContext, methodContext, {
      remainingTime: waitTime - timeSinceSnapshotStart,
      currentTimestamp,
      latestSnapshotTimestamp,
    });
    throw new WaitTimeNotCompleted(config.hubDomain, requestContext, methodContext);
  }

  logger.info("Using latest snapshot ID", requestContext, methodContext, {
    latestSnapshotId,
  });

  try {
    const orderedSnapshotRoots: string[] = [];
    const snapshotRoots: Map<string, string> = new Map();

    await Promise.all(
      rootManagerDomains.map(async (domain) => {
        let domainSnapshotRoot;
        const snapshotRoot = await database.getLatestPendingSnapshotRootByDomain(+domain, latestSnapshotId.toString());
        if (snapshotRoot) {
          logger.debug("Found snapshot root in db", requestContext, methodContext, { snapshotRoot, domain });
          domainSnapshotRoot = snapshotRoot.root;
        } else {
          const domainOutboundRoot = await getCurrentOutboundRoot(domain, requestContext);

          /* Handle boundary case where snapshot for the outbound root is not yet saved.
          There is a window between the time LH proposes the outbound root and watcher reads the spoke connector contract,
          in which if there is a new xcall the outbound root gets updated. We were exposed to false alarm by watcher.

          By introducing, what is effectively a “cooldown” period for the outbound root before including it in a proposal,
          we make sure, one of these two happens on watcher in all cases:
          1. Watcher finds the snapshot id on the contract and uses that root,
              which will be the outboundRroot because LH waited
              and ensured it was the outboundRoot that will be saved as snapshotRoot if and when there is an xcall
          2. Watcher does not find the snapshotId of the proposal, as there was no xcall and hence no save,
              and instead gets the exact same outbound root from the spoke connector contract
          3. Ensure that the snapshot root is not older than the latest snapshot timestamp
          4. Handle the case where the outbound root is an empty root
         */
          const outboundRootTimestamp = await database.getOutboundRootTimestamp(domain, domainOutboundRoot);
          if (
            domainOutboundRoot === EMPTY_ROOT ||
            (outboundRootTimestamp && outboundRootTimestamp < latestSnapshotTimestamp)
          ) {
            let messageRootCount = await database.getMessageRootCount(domain, domainOutboundRoot);
            if (domainOutboundRoot === EMPTY_ROOT) {
              // Handle intial case where there is no message root count
              messageRootCount = 0;
            }
            if (messageRootCount !== undefined) {
              logger.debug("Storing the virtual snapshot root in the db", requestContext, methodContext, {
                domain,
                count: messageRootCount + 1,
                snapshotId: latestSnapshotId,
                root: domainOutboundRoot,
              });
              await database.saveSnapshotRoots([
                {
                  id: latestSnapshotId.toString(),
                  spokeDomain: +domain,
                  root: domainOutboundRoot,
                  count: messageRootCount + 1,
                  timestamp: latestSnapshotTimestamp,
                },
              ]);
              domainSnapshotRoot = domainOutboundRoot;
            } else {
              logger.warn("No message root count found for domain", requestContext, methodContext, {
                domain,
                domainOutboundRoot,
              });
            }
          } else {
            logger.warn(
              "Likely subgraph or cartographer delay. No qualified outbound root timestamp found for domain.",
              requestContext,
              methodContext,
              {
                domain,
                domainOutboundRoot,
                outboundRootTimestamp,
                cooledDown: outboundRootTimestamp ? outboundRootTimestamp < latestSnapshotTimestamp : false,
              },
            );
          }
        }
        if (domainSnapshotRoot) {
          snapshotRoots.set(domain, domainSnapshotRoot);
        } else {
          logger.warn("No snapshot root found for domain", requestContext, methodContext, {
            domain,
          });
          throw new NoSnapshotRoot(domain, requestContext, methodContext, {
            latestSnapshotId,
            latestSnapshotTimestamp,
          });
        }
      }),
    );

    // Sort the snapshot roots in the order of root manager domains
    rootManagerDomains.forEach((domain) => {
      orderedSnapshotRoots.push(snapshotRoots.get(domain)!);
    });

    await proposeSnapshot(latestSnapshotId.toString(), orderedSnapshotRoots, rootManagerDomains, requestContext);
  } catch (err: unknown) {
    logger.error(
      "Error proposing snapshot on proposeHub",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );

    // Cannot proceed without successful proposal.
    throw err as NxtpError;
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
    adapters: { contracts, relayers, database, chainreader, wallet },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("proposeSnapshot", _requestContext);

  const relayerProxyHubAddress = config.chains[config.hubDomain].deployments.relayerProxy;
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

  const snapshot = await database.getSnapshot(aggregateRoot);
  if (snapshot) {
    throw new AggregateRootDuplicated(aggregateRoot, requestContext, methodContext);
  }

  const rootChecks = await aggregateRootCheck(aggregateRoot, requestContext);
  if (!rootChecks) {
    throw new AggregateRootChecksFailed(aggregateRoot, requestContext, methodContext);
  }

  let lastSnapshotProposedAt: BigNumber;
  const idEncodedData = contracts.relayerProxy.encodeFunctionData("lastProposeAggregateRootAt");
  try {
    const idResultData = await chainreader.readTx({
      domain: +config.hubDomain,
      to: relayerProxyHubAddress,
      data: idEncodedData,
    });

    [lastSnapshotProposedAt] = contracts.relayerProxy.decodeFunctionResult("lastProposeAggregateRootAt", idResultData);
  } catch (err: unknown) {
    logger.error(
      "Failed to read the lastProposeAggregateRootAt from onchain",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
    // Cannot proceed without the last proposed timestamp.
    throw err as NxtpError;
  }

  const proposal = { snapshotId, aggregateRoot, snapshotRoots, orderedDomains };

  // Sign the proposal -- signature from whitelisted proposer agent
  const hash = solidityKeccak256(
    ["uint256", "bytes32", "uint256", "uint32"],
    [proposal.snapshotId, proposal.aggregateRoot, lastSnapshotProposedAt.toNumber(), +config.hubDomain],
  );
  const signature = await sign(hash, wallet);

  // encode data for relayer proxy hub
  const fee = BigNumber.from(0);
  logger.info("Got params for sending", requestContext, methodContext, {
    fee,
    proposal,
    lastSnapshotProposedAt,
    hash,
    signer: wallet.address,
    signature,
  });

  const encodedDataForRelayer = contracts.relayerProxyHub.encodeFunctionData("proposeAggregateRootOnRoot", [
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
      { rootTimestamp },
    );
    // Cannot proceed without the latest lastSavedAggregateRootTimestamp.
    return false;
  }
  if (!rootTimestamp) {
    // Cannot proceed without the lastSavedAggregateRootTimestamp.
    return false;
  }

  const encodedData = contracts.rootManager.encodeFunctionData("validAggregateRoots", [
    (rootTimestamp as BigNumber).toString(),
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

  // Op mode db state
  const snapshot = await database.getSnapshot(onChainRoot);
  // Slow mode db state
  const onChainRootCount = await database.getAggregateRootCount(onChainRoot);
  if (!snapshot && !onChainRootCount) {
    // This can happen when DB and/or subgraph is out of sync
    logger.info("Stop propose. Onchain root not found in db", requestContext, methodContext, {
      onChainRoot,
    });
    return false;
  }

  // All checks passed, can propose the aggregate root.
  return true;
};

export const getCurrentOutboundRoot = async (domain: string, _requestContext: RequestContext): Promise<string> => {
  const {
    logger,
    config,
    chainData,
    adapters: { chainreader, contracts },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getCurrentOutboundRoot.name, _requestContext);
  logger.info("Fetching outboundRoot from spoke connector", requestContext, methodContext, { domain });

  const domainChainId = chainData.get(domain)?.chainId;
  if (!domainChainId) {
    throw new NoChainIdForDomain(domain, requestContext, methodContext);
  }

  // Find the latest snapshot ID.
  const spokeConnector = config.chains[domain]?.deployments.spokeConnector;
  if (!spokeConnector) {
    throw new NoSpokeConnector(domain, requestContext, methodContext);
  }

  let currentOutboundRoot: string;
  const idEncodedData = contracts.spokeConnector.encodeFunctionData("outboundRoot");
  try {
    const idResultData = await chainreader.readTx({
      domain: +domain,
      to: spokeConnector,
      data: idEncodedData,
    });

    const [_currentOutboundRoot] = contracts.spokeConnector.decodeFunctionResult("outboundRoot", idResultData);
    currentOutboundRoot = _currentOutboundRoot.toString();
  } catch (err: unknown) {
    logger.error(
      "Failed to read the outbound root from onchain",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
    // Cannot proceed without the current outbound root.
    throw err as NxtpError;
  }

  logger.info("Got the current outboundRoot from spoke connector", requestContext, methodContext, {
    currentOutboundRoot,
    domain,
  });

  return currentOutboundRoot;
};
