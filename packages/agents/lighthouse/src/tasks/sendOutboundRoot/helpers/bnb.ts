import { createLoggingContext, domainToChainId } from "@connext/nxtp-utils";

import { getContext } from "../sendOutboundRoot";
import { ExtraSendOutboundRootParam } from "../operations/sendOutboundRoot";
import { NoProviderForDomain, NoSpokeConnector } from "../../propagate/errors";
import { getInterface, getBestProvider } from "../../../mockable";

export const getSendOutboundRootParams = async (l2domain: string): Promise<ExtraSendOutboundRootParam> => {
  const {
    config,
    adapters: { deployments, contracts, chainreader, ambs },
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
  const hubChainId = domainToChainId(+config.hubDomain);

  const l2SpokeConnector = deployments.spokeConnector(
    l2ChainId,
    "Bnb",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  let encodedData = contracts.spokeConnector.encodeFunctionData("AMB");
  let encoded = await chainreader.readTx({ data: encodedData, domain: Number(l2domain), to: l2SpokeConnector.address });
  const [ambAddress] = contracts.spokeConnector.decodeFunctionResult("AMB", encoded);

  const ambInterface = getInterface(ambs.bnb);
  encodedData = ambInterface.encodeFunctionData("calcSrcFees", ["", hubChainId, 32]);
  encoded = await chainreader.readTx({ data: encodedData, domain: Number(l2domain), to: ambAddress });
  const [_fee] = ambInterface.decodeFunctionResult("calcSrcFees", encoded);

  return { _fee: _fee.toString(), _encodedData: "0x" };
};
