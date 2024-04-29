import { createLoggingContext, domainToChainId, NxtpError, RequestContext, RootManagerMeta } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForDomain } from "../errors";
import {
  getPropagateParamsArbitrum,
  getPropagateParamsBnb,
  getPropagateParamsLinea,
  getPropagateParamsGnosis,
  getPropagateParamsZkSync,
  getPropagateParamsAvalanche,
  getPropagateParamsScroll,
} from "../helpers";
import { getContext } from "../propagate";

export type ExtraPropagateParam = {
  _connector: string;
  _fee: string;
  _encodedData: string;
};

export const getParamsForDomainFn: Record<
  string,
  (
    spokeDomain: string,
    spokeChainId: number,
    hubChainId: number,
    requestContext: RequestContext,
  ) => Promise<ExtraPropagateParam>
> = {
  // mainnet
  "1634886255": getPropagateParamsArbitrum,
  "6450786": getPropagateParamsBnb,
  "6778479": getPropagateParamsGnosis,
  "1818848877": getPropagateParamsLinea,
  "1635148152": getPropagateParamsAvalanche,
  "2053862243": getPropagateParamsZkSync,
  "1935897199": getPropagateParamsScroll,
  // testnet
  "1734439522": getPropagateParamsArbitrum,
  "1633842021": getPropagateParamsArbitrum,
  "1668247156": getPropagateParamsLinea,
  "2053862260": getPropagateParamsZkSync,
};

//const LH_PROPAGATE_WINDOW = 10 * 60; // 10mins

export const propagate = async () => {
  const {
    logger,
    config,
    chainData,
    adapters: { chainreader, contracts, relayers, subgraph },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propagate.name);
  logger.info("Starting propagate operation", requestContext, methodContext);
  const rootManagerMeta: RootManagerMeta = await subgraph.getRootManagerMeta(config.hubDomain);
  const domains = rootManagerMeta.domains;
  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForDomain(config.hubDomain, requestContext, methodContext);
  }

  const relayerProxyAddress = config.chains[config.hubDomain].deployments.relayerProxy;
  const _connectors: string[] = [];
  const _encodedData: string[] = [];
  const _fees: string[] = [];
  let _totalFee = constants.Zero;

  for (const domain of domains) {
    const connector = rootManagerMeta.connectors[domains.indexOf(domain)];
    _connectors.push(connector);

    if (Object.keys(getParamsForDomainFn).includes(domain)) {
      const getParamsForDomain = getParamsForDomainFn[domain];
      const propagateParam = await getParamsForDomain(domain, domainToChainId(+domain), hubChainId, requestContext);
      _encodedData.push(propagateParam._encodedData);
      _fees.push(propagateParam._fee);
      _totalFee = _totalFee.add(BigNumber.from(propagateParam._fee));
    } else {
      _encodedData.push("0x");
      _fees.push("0");
    }
  }

  // encode data for relayer proxy hub
  const fee = BigNumber.from(0);
  logger.info("Got params for sending", requestContext, methodContext, {
    fee,
    _connectors,
    _fees,
    _encodedData,
  });

  const encodedDataForRelayer = contracts.relayerProxyHub.encodeFunctionData("propagate", [
    _connectors,
    _fees,
    _encodedData,
    fee,
  ]);

  try {
    const { taskId } = await sendWithRelayerWithBackup(
      hubChainId,
      config.hubDomain,
      relayerProxyAddress,
      encodedDataForRelayer,
      relayers,
      chainreader,
      logger,
      requestContext,
    );
    logger.info("Propagate tx sent", requestContext, methodContext, { taskId });
  } catch (e: unknown) {
    logger.error("Error at sendWithRelayerWithBackup", requestContext, methodContext, e as NxtpError, {
      hubChainId,
      hubDomain: config.hubDomain,
      relayerProxyAddress,
      encodedDataForRelayer,
    });
  }
};

export const finalize = async () => {
  const {
    logger,
    config,
    chainData,
    adapters: { chainreader, contracts, relayers, subgraph, database },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propagate.name);
  logger.info("Starting finalize operation", requestContext, methodContext);
  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForDomain(config.hubDomain, requestContext, methodContext);
  }

  const rootManagerAddress = config.chains[config.hubDomain].deployments.rootManager;

  const currentSnapshot = await database.getCurrentProposedSnapshot();

  if (!currentSnapshot) {
    //Throw
    logger.info("No current proposed snapshot found. Ending run.", requestContext, methodContext);
    return;
  }

  const _proposedAggregateRoot = currentSnapshot.aggregateRoot;
  const _endOfDispute = currentSnapshot.endOfDispute;
  const latestBlockNumbers = await subgraph.getLatestBlockNumber([config.hubDomain]);
  let latestBlockNumber: number | undefined = undefined;
  if (latestBlockNumbers.has(config.hubDomain)) {
    latestBlockNumber = latestBlockNumbers.get(config.hubDomain)!;
  }

  if (!latestBlockNumber) {
    logger.error("Error getting the latestBlockNumber for hub domain.", requestContext, methodContext, undefined, {
      hubDomain: config.hubDomain,
      latestBlockNumber,
      latestBlockNumbers,
    });
    return;
  }

  if (_endOfDispute > latestBlockNumber) {
    logger.error(
      "Dispute window is still active. End of dispute block is ahead of latest block",
      requestContext,
      methodContext,
      undefined,
      {
        proposedSnapshot: currentSnapshot,
        latestBlockNumber,
        _endOfDispute,
      },
    );
    return;
  }

  logger.info("Got params for finalizing", requestContext, methodContext, {
    _proposedAggregateRoot,
    _endOfDispute,
  });

  const encodedDataForRelayer = contracts.rootManager.encodeFunctionData("finalize", [
    _proposedAggregateRoot,
    _endOfDispute,
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
    logger.info("finalize tx sent", requestContext, methodContext, { taskId });
  } catch (e: unknown) {
    logger.error("Error at sendWithRelayerWithBackup", requestContext, methodContext, e as NxtpError, {
      hubChainId,
      hubDomain: config.hubDomain,
      rootManagerAddress,
      encodedDataForRelayer,
    });
  }
};
