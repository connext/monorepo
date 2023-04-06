import { ContractInterface, utils } from "ethers";
import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { getContract, getJsonRpcProvider, getBestProvider } from "../../../mockable";
import { NoHubConnector, NoProviderForDomain, NoSpokeConnector } from "../errors";
import { ExtraPropagateParam } from "../operations/propagate";
import { getContext } from "../propagate";

export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParam> => {
  const {
    config,
    logger,
    adapters: { deployments, ambs },
  } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for Gnosis", requestContext, methodContext, { l2domain });

  const l2RpcUrl = await getBestProvider(config.chains[l2domain]?.providers ?? []);

  if (!l2RpcUrl) {
    throw new NoProviderForDomain(l2domain, requestContext, methodContext);
  }
  const l1RpcUrl = await getBestProvider(config.chains[config.hubDomain]?.providers ?? []);
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }

  const l2SpokeConnector = deployments.spokeConnector(
    l2ChainId,
    "Gnosis",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l1HubConnector = deployments.hubConnector(
    l1ChainId,
    "Gnosis",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l1HubConnector) {
    throw new NoHubConnector(l1ChainId, requestContext, methodContext);
  }

  const l1Provider = getJsonRpcProvider(l1RpcUrl);
  const l1HubConnectorContract = getContract(
    l1HubConnector.address,
    l1HubConnector.abi as ContractInterface,
    l1Provider,
  );
  const ambAddress = await l1HubConnectorContract.AMB();

  const ambContract = getContract(ambAddress as string, ambs.gnosis as ContractInterface, l1Provider);
  const maxGasPerTx = await ambContract.maxGasPerTx();
  const encodedData = utils.defaultAbiCoder.encode(["uint256"], [maxGasPerTx as string]);

  logger.info("Got propagate params for Gnosis", requestContext, methodContext, {
    ambAddress,
    maxGasPerTx: maxGasPerTx.toString(),
    encodedData,
  });

  return { _connector: "", _fee: "0", _encodedData: encodedData };
};
