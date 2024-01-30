import { ContractInterface, utils } from "ethers";
import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { NoHubConnector, NoProviderForDomain, NoSpokeConnector } from "../errors";
import { ExtraPropagateParam } from "../operations/propagate";
import { getContext } from "../propagate";
import { getContract, getJsonRpcProvider, getBestProvider } from "../../../mockable";

export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParam> => {
  const {
    config,
    logger,
    adapters: { deployments },
  } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for Avalanche", requestContext, methodContext, { l2domain });
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
    "Avalanche",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l1HubConnector = deployments.hubConnector(
    l1ChainId,
    "Avalanche",
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

  // gasLimit on spoke side = 200_000
  // actually it required about 60_000 gas on bnb chain to call `receiveWormholeMessages`
  // remain gas will be refunded on bnb chain to refund address (default: deployer address)
  const gasLimit = "200000";
  const fee = await l1HubConnectorContract.quoteEVMDeliveryPrice(gasLimit, ambAddress);
  const encodedData = utils.defaultAbiCoder.encode(["uint256"], [gasLimit]);

  return { _connector: "", _fee: fee, _encodedData: encodedData };
};
