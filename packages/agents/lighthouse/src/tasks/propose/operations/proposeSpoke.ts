import { createLoggingContext, NxtpError, RequestContext, jsonifyError, domainToChainId } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForDomain, NoSpokeOptimisticRoot, NoSpokeConnector } from "../errors";
import { getContext } from "../propose";

export type ExtraPropagateParam = {
  _connector: string;
  _fee: string;
  _encodedData: string;
};

const FINALIZED_HASH = "0x0000000000000000000000000000000000000000000000000000000000000001";

export const proposeSpoke = async (spokeDomain: string) => {
  const {
    logger,
    config,
    chainData,
    adapters: { database, contracts, chainreader },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(proposeSpoke.name);

  //TODO: V1.1 special handling for when spoke domain is hub domain
  if (spokeDomain === config.hubDomain) {
    logger.info("Starting propose operation for hub", requestContext, methodContext, spokeDomain);
    //TODO: V1.1 check if proposed aggregate root is alraadly saved
    await sendRootToHubSpoke(requestContext);
    return;
  }
  logger.info("Starting propose operation for spoke", requestContext, methodContext, spokeDomain);

  const spokeChainId = chainData.get(spokeDomain)?.chainId;
  if (!spokeChainId) {
    throw new NoChainIdForDomain(spokeDomain, requestContext, methodContext);
  }

  // Find the latest proposedAggregateRootHash.
  const spokeConnector = config.chains[spokeDomain]?.deployments.spokeConnector;
  if (!spokeConnector) {
    throw new NoSpokeConnector(spokeDomain, requestContext, methodContext);
  }

  // TODO: V1.1 right way to find out the latest aggregate root
  let proposedAggregateRootHash: string = FINALIZED_HASH;
  const idEncodedData = contracts.spokeConnector.encodeFunctionData("proposedAggregateRootHash");
  try {
    const idResultData = await chainreader.readTx({
      domain: +spokeDomain,
      to: spokeConnector,
      data: idEncodedData,
    });

    const [_proposedAggregateRootHash] = contracts.spokeConnector.decodeFunctionResult(
      "proposedAggregateRootHash",
      idResultData,
    );
    proposedAggregateRootHash = _proposedAggregateRootHash.toString();
  } catch (err: unknown) {
    logger.error(
      "Failed to read the latest proposedAggregateRootHash from onchain",
      requestContext,
      methodContext,
      jsonifyError(err as NxtpError),
    );
    // Cannot proceed without the proposedAggregateRootHash.
    return;
  }
  logger.info("Got the latest proposedAggregateRootHash from onchain", requestContext, methodContext, {
    proposedAggregateRootHash,
  });

  try {
    const latestOptimisticRoot = await database.getLatestPendingSpokeOptimisticRootByDomain(spokeDomain);
    if (!latestOptimisticRoot) {
      throw new NoSpokeOptimisticRoot(spokeDomain, requestContext, methodContext);
    }

    await proposeOptimisticRoot(
      latestOptimisticRoot.aggregateRoot,
      latestOptimisticRoot.rootTimestamp,
      spokeDomain,
      requestContext,
    );
  } catch (err: unknown) {
    logger.error("Error proposing snapshot", requestContext, methodContext, jsonifyError(err as NxtpError));
  }
};

export const proposeOptimisticRoot = async (
  aggregateRoot: string,
  rootTimestamp: number,
  spokeDomain: string,
  _requestContext: RequestContext,
) => {
  const {
    logger,
    adapters: { contracts, relayers, chainreader },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(proposeOptimisticRoot.name, _requestContext);

  const spokeConnectorAddress = config.chains[spokeDomain].deployments.spokeConnector;
  const spokeChainId = domainToChainId(+spokeDomain);

  const proposal = { aggregateRoot, rootTimestamp };

  // TODO:  V1.1 Sign the proposal -- need signature from whitelisted proposer agent
  const signature = "";
  // encode data for relayer proxy hub
  const fee = BigNumber.from(0);
  logger.info("Got params for sending", requestContext, methodContext, {
    fee,
    proposal,
    signature,
  });

  const encodedDataForRelayer = contracts.spokeConnector.encodeFunctionData("proposeAggregateRoot", [
    proposal.aggregateRoot,
    proposal.rootTimestamp,
  ]);

  try {
    const { taskId } = await sendWithRelayerWithBackup(
      spokeChainId,
      spokeDomain,
      spokeConnectorAddress,
      encodedDataForRelayer,
      relayers,
      chainreader,
      logger,
      requestContext,
    );
    logger.info("Propose tx sent for spoke", requestContext, methodContext, { taskId, spokeDomain });
    // TODO: Update DB state to processed for all snapshot roots with ID <= this snapshotId
  } catch (e: unknown) {
    logger.error("Error at sendWithRelayerWithBackup", requestContext, methodContext, e as NxtpError, {
      spokeChainId,
      spokeDomain,
      spokeConnectorAddress,
      encodedDataForRelayer,
    });
  }
};

export const sendRootToHubSpoke = async (_requestContext: RequestContext) => {
  const {
    logger,
    adapters: { contracts, relayers, chainreader },
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(sendRootToHubSpoke.name, _requestContext);
  logger.info("Starting sendRootToHubSpoke operation for hub domain", requestContext, methodContext);

  const rootManagerAddress = config.chains[config.hubDomain].deployments.rootManager;
  const hubChainId = domainToChainId(+config.hubDomain);

  // TODO: V1.1 Sign the proposal -- need signature from whitelisted proposer agent
  const signature = "";
  // encode data for relayer proxy hub
  const fee = BigNumber.from(0);
  logger.info("Got params for sending", requestContext, methodContext, {
    fee,
    signature,
  });

  const encodedDataForRelayer = contracts.rootManager.encodeFunctionData("sendRootToHubSpoke");

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
    logger.info("sendRootToHubSpoke tx sent", requestContext, methodContext, { taskId });
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
