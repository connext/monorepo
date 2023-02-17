import { createLoggingContext, getChainIdFromDomain, NxtpError } from "@connext/nxtp-utils";

import { sendWithRelayerWithBackup } from "../../../mockable";
import { getSendOutboundRootParamsBnb, getSendOutboundRootParamsConsensys } from "../helpers";
import { getContext } from "../sendOutboundRoot";

export type ExtraSendOutboundRootParam = {
  _fee: string;
  _encodedData: string;
};

export const getParamsForDomainFn: Record<string, (l2domain: string) => Promise<ExtraSendOutboundRootParam>> = {
  // mainnet
  "6450786": getSendOutboundRootParamsBnb,
  // testnet
  "1668247156": getSendOutboundRootParamsConsensys,
};

export const sendOutboundRoot = async () => {
  const {
    logger,
    config,
    chainData,
    adapters: { chainreader, contracts, relayers },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(sendOutboundRoot.name);
  logger.info("Starting send outbound root operation", requestContext, methodContext);
  await Promise.all(
    Object.keys(config.chains).map(async (domain) => {
      const relayerProxyAddress = config.chains[domain].deployments.relayerProxy;

      logger.info("Getting params for domain", requestContext, methodContext, { domain, relayerProxyAddress });
      let encodedData = "0x";
      let fee = "0 ";
      if (Object.keys(getParamsForDomainFn).includes(domain)) {
        const getParamsForDomain = getParamsForDomainFn[domain];
        const { _encodedData, _fee } = await getParamsForDomain(domain);
        encodedData = _encodedData;
        fee = _fee;
      }
      logger.info("Got params for domain", requestContext, methodContext, {
        domain,
        relayerProxyAddress,
        encodedData,
        fee,
      });

      const encodedDataForRelayer = contracts.relayerProxy.encodeFunctionData("send", [encodedData, fee, "0"]);

      const chainId = await getChainIdFromDomain(domain, chainData);
      try {
        const { taskId } = await sendWithRelayerWithBackup(
          chainId,
          config.hubDomain,
          relayerProxyAddress,
          encodedDataForRelayer,
          relayers,
          chainreader,
          logger,
          requestContext,
        );
        logger.info("Send Outbound Root tx sent", requestContext, methodContext, { taskId });
      } catch (e: unknown) {
        logger.error("Error at sendWithRelayerWithBackup", requestContext, methodContext, e as NxtpError, {
          chainId,
          relayerProxyAddress,
          encodedDataForRelayer,
        });
      }
    }),
  );
};
