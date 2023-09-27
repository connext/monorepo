import { SdkBase, SdkUtils, SdkXCallParams } from "@connext/sdk-core";
import { providers, utils } from "ethers";

import {
  addLiquidity,
  sendXCall,
  sendSpokeRootToHub,
  propagateAggregatedRootToSpokes,
  receiveAggregatedRootOnSpoke,
} from "../../helpers/local";
import { DEPLOYER_WALLET, ROUTER_WALLET, PARAMETERS as _PARAMETERS } from "../../constants/local";
import { logger } from "./logger";
import { PARAMETERS, deployerTxService, getDeployments } from "./onchainSetup";

export const processAMB = async (sdkBase: SdkBase) => {
  logger.info("Trying `xcallIntoLocal` to get the local assets on spoke domains");
  const mainnetDeployments = getDeployments(PARAMETERS.HUB.DOMAIN);
  const xcallParams: SdkXCallParams = {
    // TransferInfo
    origin: PARAMETERS.HUB.DOMAIN,
    destination: PARAMETERS.A.DOMAIN,
    to: PARAMETERS.AGENTS.DEPLOYER.address,
    asset: mainnetDeployments.TestERC20,
    delegate: PARAMETERS.AGENTS.DEPLOYER.address,
    amount: utils.parseEther("10000").toString(),
    slippage: "300",
    callData: "0x",
    relayerFee: utils.parseUnits("1", 17).toString(),
    receiveLocal: true,
  };
  const hubDomainProvider = new providers.JsonRpcProvider(PARAMETERS.HUB.RPC[0]);
  const deployerSignerOnHub = PARAMETERS.AGENTS.DEPLOYER.signer.connect(hubDomainProvider);
  const approveReceipt = await sdkBase.approveIfNeeded(
    PARAMETERS.HUB.DOMAIN,
    mainnetDeployments.TestERC20,
    utils.parseEther("10000000000000").toString(),
  );
  if (approveReceipt) {
    const res = await deployerSignerOnHub.sendTransaction({
      to: mainnetDeployments.TestERC20,
      value: 0,
      data: utils.hexlify(approveReceipt.data!),
      chainId: PARAMETERS.HUB.CHAIN,
    });

    await res.wait(1);
  }

  logger.info("Sending the spoke root to the hub");
  const spokeRootData = { domain: PARAMETERS.HUB.DOMAIN, to: mainnetDeployments.SpokeConnector };
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
