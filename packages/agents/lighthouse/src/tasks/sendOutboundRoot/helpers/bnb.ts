import { createLoggingContext, domainToChainId } from "@connext/nxtp-utils";
import { ContractInterface, utils } from "ethers";

import { getContext } from "../sendOutboundRoot";
import { ExtraSendOutboundRootParam } from "../operations/sendOutboundRoot";
import { NoProviderForDomain, NoSpokeConnector } from "../../propagate/errors";
import { getBestProvider, getJsonRpcProvider, getContract } from "../../../mockable";

export const getSendOutboundRootParams = async (l2domain: string): Promise<ExtraSendOutboundRootParam> => {
  const {
    config,
    adapters: { deployments },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getSendOutboundRootParams.name);
  const l2RpcUrl = await getBestProvider(config.chains[l2domain]?.providers ?? []);

  if (!l2RpcUrl) {
    throw new NoProviderForDomain(l2domain, requestContext, methodContext);
  }
  const l1RpcUrl = await getBestProvider(config.chains[config.hubDomain]?.providers ?? []);
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }

  const l2ChainId = domainToChainId(+l2domain);

  const l2SpokeConnector = deployments.spokeConnector(
    l2ChainId,
    "Bnb",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l2Provider = getJsonRpcProvider(l2RpcUrl);
  const l2SpokeConnectorContract = getContract(
    l2SpokeConnector.address,
    l2SpokeConnector.abi as ContractInterface,
    l2Provider,
  );
  const ambAddress = await l2SpokeConnectorContract.AMB();

  // gasLimit on hub side = 200_000
  // actually it required about 100_000 gas on mainnet to call `receiveWormholeMessages`
  // remain gas will be refunded on mainnetto refund address (default: deployer address)
  const gasLimit = "200000";
  const fee = await l2SpokeConnectorContract.quoteEVMDeliveryPrice(gasLimit, ambAddress);
  const encodedData = utils.defaultAbiCoder.encode(["uint256"], [gasLimit]);

  return { _fee: fee.toString(), _encodedData: encodedData };
};
