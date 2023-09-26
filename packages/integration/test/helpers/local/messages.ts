import { TransactionService } from "@connext/nxtp-txservice";
import { createLoggingContext } from "@connext/nxtp-utils";
import {
  AdminSpokeConnectorInterface,
  AdminHubConnectorInterface,
  RootManagerInterface,
  canonizeId,
} from "@connext/smart-contracts";

/**
 * Sends the spoke root via AMB.
 *
 * Even though we don't have the AMB configured in local test, we need to create an transaction for an event
 */
export const sendSpokeRootToHub = async (
  spokeRootData: { domain: string; to: string },
  txService: TransactionService,
) => {
  const { requestContext } = createLoggingContext(sendSpokeRootToHub.name);
  const sendData = AdminSpokeConnectorInterface.encodeFunctionData("send", ["0x"]);
  console.log(`Sending the spoke root to hub... domain: ${spokeRootData.domain}, spokeConnector: ${spokeRootData.to}`);
  const receipt = await txService.sendTx(
    { domain: +spokeRootData.domain, to: spokeRootData.to, data: sendData, value: 0 },
    requestContext,
  );

  console.log(`Sent the spoke root, tx: ${receipt.transactionHash}`);
};

/**
 * Receives the spoke root on AdminHubConnector
 */
export const receiveSpokeRootOnHub = async () => {};

/**
 * Sends the aggregated root to the spoke domains via AMBs.
 *
 * The onchain events are needed for the message processing on offchain
 */
export const propagateAggregatedRootToSpokes = async () => {};

/**
 * Receives the aggregated root from the hub domain on AdminSpokeConnector
 */
export const receiveAggregatedRootOnSpoke = async () => {};
