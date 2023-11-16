import {
  createLoggingContext,
  getNtpTimeSeconds,
  NxtpError,
  RequestContext,
  RootManagerMeta,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { getBestProvider, getContract, getJsonRpcProvider, sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForHubDomain, NoProviderForDomain } from "../errors";
import {
  getPropagateParamsArbitrum,
  getPropagateParamsBnb,
  getPropagateParamsLinea,
  getPropagateParamsGnosis,
  getPropagateParamsZkSync,
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
  // testnet
  "1734439522": getPropagateParamsArbitrum,
  "1668247156": getPropagateParamsLinea,
  "2053862260": getPropagateParamsZkSync,
};

const LH_PROPAGATE_WINDOW = 10 * 60; // 10mins

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
    throw new NoChainIdForHubDomain(config.hubDomain, requestContext, methodContext);
  }

  const relayerProxyHubAddress = config.chains[config.hubDomain].deployments.relayerProxy;

  // Check if LH should propagate as backup of keep3r
  logger.info("Checking if LH propagate workable", requestContext, methodContext);

  const l1RpcUrl = await getBestProvider(config.chains[config.hubDomain]?.providers ?? []);
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }
  const l1Provider = getJsonRpcProvider(l1RpcUrl);
  const relayerProxyContract = getContract(relayerProxyHubAddress, contracts.relayerProxyHub, l1Provider);

  const [lastPropagateAt, propagateCooldown] = await Promise.all([
    relayerProxyContract.lastPropagateAt(),
    relayerProxyContract.propagateCooldown(),
  ]);
  const curTimeInSeconds = getNtpTimeSeconds();
  if ((lastPropagateAt.add(propagateCooldown).toNumber() as number) + LH_PROPAGATE_WINDOW >= curTimeInSeconds) {
    logger.info("LH Propagate skipping", requestContext, methodContext, {
      propagateWorkableAt: lastPropagateAt.add(propagateCooldown).toNumber(),
      LH_PROPAGATE_WINDOW,
      curTimeInSeconds,
    });
    return;
  }

  const _connectors: string[] = [];
  const _encodedData: string[] = [];
  const _fees: string[] = [];
  let _totalFee = constants.Zero;

  for (const domain of domains) {
    const connector = rootManagerMeta.connectors[domains.indexOf(domain)];
    _connectors.push(connector);

    if (Object.keys(getParamsForDomainFn).includes(domain)) {
      const getParamsForDomain = getParamsForDomainFn[domain];
      const propagateParam = await getParamsForDomain(
        domain,
        chainData.get(domain)!.chainId,
        hubChainId,
        requestContext,
      );
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
      relayerProxyHubAddress,
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
      relayerProxyHubAddress,
      encodedDataForRelayer,
    });
  }
};
