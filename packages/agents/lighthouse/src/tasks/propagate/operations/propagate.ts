import {
  createLoggingContext,
  NATIVE_TOKEN,
  NxtpError,
  RelayerType,
  RequestContext,
  RootManagerMeta,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { getEstimatedFee, sendWithRelayerWithBackup, getDeployedRootManagerContract } from "../../../mockable";
import { NoChainIdForHubDomain } from "../errors";
import { getPropagateParamsArbitrum, getPropagateParamsBnb } from "../helpers";
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
  "1634886255": getPropagateParamsArbitrum,
  "1734439522": getPropagateParamsArbitrum,
  "6450786": getPropagateParamsBnb,
};

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

  const rootManagerAddress = getDeployedRootManagerContract(
    hubChainId,
    config.environment === "staging" ? "Staging" : "",
  )!.address;
  const relayerProxyHubAddress = config.chains[config.hubDomain].deployments.relayerProxy;
  const _connectors: string[] = [];
  const _encodedData: string[] = [];
  const _fees: string[] = [];

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
    } else {
      _encodedData.push("0x");
      _fees.push("0");
    }
  }

  // encode data
  const encodedData = contracts.rootManager.encodeFunctionData("propagate", [_connectors, _fees, _encodedData]);

  const relayerAddress = await relayers[0].instance.getRelayerAddress(hubChainId);
  logger.debug("Getting gas estimate", requestContext, methodContext, {
    hubChainId,
    to: rootManagerAddress,
    data: encodedData,
    from: relayerAddress,
  });

  const gas = await chainreader.getGasEstimateWithRevertCode(+config.hubDomain, {
    chainId: hubChainId,
    to: rootManagerAddress,
    data: encodedData,
    from: relayerAddress,
  });

  const gasLimit = gas.add(200_000); // Add extra overhead for gelato

  let fee = BigNumber.from(0);
  try {
    fee = await getEstimatedFee(hubChainId, NATIVE_TOKEN, gasLimit, true);
  } catch (e: unknown) {
    logger.warn("Error at Gelato Estimate Fee", requestContext, methodContext, {
      error: e as NxtpError,
      rootManagerAddress: rootManagerAddress,
      relayerProxyAddress: relayerProxyHubAddress,
      gasLimit: gasLimit.toString(),
      relayerFee: fee.toString(),
    });

    fee = gasLimit.mul(await chainreader.getGasPrice(+config.hubDomain, requestContext));
  }
  logger.info("Got params for sending", requestContext, methodContext, {
    fee: fee.toString(),
    gasLimit: gasLimit.toString(),
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

  const relayerType = RelayerType.Connext;

  const { taskId } = await sendWithRelayerWithBackup(
    hubChainId,
    config.hubDomain,
    relayerProxyHubAddress,
    encodedDataForRelayer,
    [relayers.find((r) => r.type === relayerType)!],
    chainreader,
    logger,
    requestContext,
  );
  logger.info("Propagate tx sent", requestContext, methodContext, { taskId });
};
