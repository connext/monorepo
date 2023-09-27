import { providers } from "ethers";

import { sendSpokeRootToHub, propagateAggregatedRootToSpokes, receiveAggregatedRootOnSpoke } from "../../helpers/local";
import { logger } from "./logger";
import { PARAMETERS, deployerTxService } from "./onchainSetup";

export const processAMB = async (origin: any) => {
  const originDomainProvider = new providers.JsonRpcProvider(origin.RPC[0]);
  const deployerSignerOnHub = PARAMETERS.AGENTS.DEPLOYER.signer.connect(originDomainProvider);

  logger.info("Sending the spoke root to the hub");
  const spokeRootData = { domain: origin.DOMAIN, to: origin.DEPLOYMENTS.SpokeConnector };
  await sendSpokeRootToHub(spokeRootData, deployerTxService);

  logger.info("propagate the aggregated root to spoke domains");
  const propagatedRoot = await propagateAggregatedRootToSpokes(
    {
      domain: PARAMETERS.HUB.DOMAIN,
      to: PARAMETERS.HUB.DEPLOYMENTS.RootManager!,
      connectors: [
        PARAMETERS.HUB.DEPLOYMENTS.HubConnectorB!,
        PARAMETERS.HUB.DEPLOYMENTS.HubConnectorA!,
        PARAMETERS.HUB.DEPLOYMENTS.SpokeConnector,
      ],
      fees: ["0", "0", "0"],
      encodedData: ["0x", "0x", "0x"],
    },
    deployerTxService,
    deployerSignerOnHub,
  );

  logger.info("Receive the aggregated root on both spoke domains on AdminSpokeConnector");
  for (const chain of [PARAMETERS.A, PARAMETERS.B]) {
    await receiveAggregatedRootOnSpoke(
      {
        domain: chain.DOMAIN,
        to: chain.DEPLOYMENTS.SpokeConnector,
        root: propagatedRoot,
      },
      deployerTxService,
    );
  }
};
