import { createLoggingContext, domainToChainId, NxtpError } from "@connext/nxtp-utils";

import { getContract, getJsonRpcProvider, sendWithRelayerWithBackup, getBestProvider } from "../../../mockable";
import {
  getSendOutboundRootParamsBnb,
  getSendOutboundRootParamsLinea,
  getSendOutboundRootParamsZkSync,
  getSendOutboundRootParamsGnosis,
  getSendOutboundRootParamsOptimism,
  getSendOutboundRootParamsBase,
  getSendOutboundRootParamsAvalanche,
  getSendOutboundRootParamsMetis,
  getSendOutboundRootParamsMantle,
  getSendOutboundRootParamsMode,
} from "../helpers";
import { getContext } from "../sendOutboundRoot";

export type ExtraSendOutboundRootParam = {
  _fee: string;
  _encodedData: string;
};

export const getParamsForDomainFn: Record<string, (l2domain: string) => Promise<ExtraSendOutboundRootParam>> = {
  // mainnet
  "6450786": getSendOutboundRootParamsBnb,
  "1869640809": getSendOutboundRootParamsOptimism,
  "6778479": getSendOutboundRootParamsGnosis,
  "1818848877": getSendOutboundRootParamsLinea,
  "1650553709": getSendOutboundRootParamsBase,
  "1635148152": getSendOutboundRootParamsAvalanche,
  "1835365481": getSendOutboundRootParamsMetis,
  "1835101812": getSendOutboundRootParamsMantle,
  "2053862243": getSendOutboundRootParamsZkSync,
  "1836016741": getSendOutboundRootParamsMode,
  // testnet
  "1668247156": getSendOutboundRootParamsLinea,
  "2053862260": getSendOutboundRootParamsZkSync,
  "1735356532": getSendOutboundRootParamsOptimism,
  "1650553703": getSendOutboundRootParamsBase,
};

export const sendOutboundRoot = async () => {
  const {
    logger,
    config,
    adapters: { chainreader, contracts, relayers },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(sendOutboundRoot.name);
  logger.info("Starting send outbound root operation", requestContext, methodContext);
  for (const domain of Object.keys(config.chains)) {
    const relayerProxyAddress = config.chains[domain].deployments.relayerProxy;

    // Check if outbound root already sent!
    const spokeConnectorAddress = config.chains[domain].deployments.spokeConnector;
    const l2Provider = await getBestProvider(config.chains[domain].providers);
    logger.info("Checking if outboundroot already sent", requestContext, methodContext, {
      domain,
      spokeConnectorAddress,
      l2Provider,
    });
    if (!spokeConnectorAddress || !l2Provider) {
      logger.error(
        "Error while checking outboundroot already sent! Spoke Connector deployment missing",
        requestContext,
        methodContext,
      );
      continue;
    }

    const spokeConnectorContract = getContract(
      spokeConnectorAddress,
      contracts.spokeConnector,
      getJsonRpcProvider(l2Provider),
    );
    const outboundroot = await spokeConnectorContract.outboundRoot();
    const sent = await spokeConnectorContract.sentMessageRoots(outboundroot);
    logger.info("Got if outboundroot already sent", requestContext, methodContext, {
      domain,
      spokeConnectorAddress,
      outboundroot,
      sent,
    });
    if (sent) {
      logger.info("OutboundRoot already sent!! passing...", requestContext, methodContext, {
        domain,
        outboundroot,
      });
      continue;
    }

    // Get tx params for domain!!
    logger.info("Getting params for domain", requestContext, methodContext, { domain, relayerProxyAddress });
    let encodedData = "0x";
    let fee = "0";
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

    const chainId = domainToChainId(+domain);
    try {
      const { taskId } = await sendWithRelayerWithBackup(
        chainId,
        domain,
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
  }
};
