import { ContractInterface, utils } from "ethers";
import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { NoHubConnector, NoProviderForDomain, NoSpokeConnector } from "../errors";
import { ExtraPropagateParam } from "../operations/propagate";
import { getContext } from "../propagate";
import { getContract, getJsonRpcProvider, getBestProvider } from "../../../mockable";

const SCROLL_MESSAGE_QUEUE_ABI = [
  "function estimateCrossDomainMessageFee(uint256 _gasLimit) view returns (uint256 _fee)",
];

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
  logger.info("Getting propagate params for Scroll", requestContext, methodContext, { l2domain });
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
    "Scroll",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l1HubConnector = deployments.hubConnector(
    l1ChainId,
    "Scroll",
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
  const ambContract = getContract(ambAddress as string, ambs.scroll as ContractInterface, l1Provider);
  const messageQueueAddress = await ambContract.messageQueue();
  const messageQueueContract = getContract(
    messageQueueAddress,
    SCROLL_MESSAGE_QUEUE_ABI as ContractInterface,
    l1Provider,
  );

  // gasLimit on spoke side = 200_000
  // remain gas will be refunded on scroll chain to refund address (default: spoke connector address)
  const gasLimit = "200000";
  const estimateMessageFee = await messageQueueContract.estimateCrossDomainMessageFee(gasLimit);
  const refundAddress = l2SpokeConnector.address;
  const encodedData = utils.defaultAbiCoder.encode(["address"], [refundAddress]);

  logger.info("Got propagate params for Scroll", requestContext, methodContext, {
    gasLimit: gasLimit.toString(),
    refundAddress,
    fee: estimateMessageFee.toString(),
  });

  return { _connector: "", _fee: estimateMessageFee, _encodedData: encodedData };
};
