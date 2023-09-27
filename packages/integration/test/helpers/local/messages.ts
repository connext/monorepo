import { TransactionService } from "@connext/nxtp-txservice";
import { createLoggingContext } from "@connext/nxtp-utils";
import {
  AdminSpokeConnectorInterface,
  AdminHubConnectorInterface,
  RootManagerInterface,
} from "@connext/smart-contracts";
import { BigNumber, Signer, providers } from "ethers";

/**
 * Sends the spoke root via AMB.
 *
 * Even though we don't have the AMB configured in local test, we need to create an transaction for an event
 */
export const sendSpokeRootToHub = async (
  spokeRootData: { domain: string; to: string },
  txService: TransactionService,
): Promise<string> => {
  const { requestContext } = createLoggingContext(sendSpokeRootToHub.name);
  const encodedOutboundRoot = await txService.readTx({
    domain: +spokeRootData.domain,
    data: AdminSpokeConnectorInterface.encodeFunctionData("outboundRoot"),
    to: spokeRootData.to,
  });
  const [outboundRoot] = AdminSpokeConnectorInterface.decodeFunctionResult("outboundRoot", encodedOutboundRoot);
  const sendData = AdminSpokeConnectorInterface.encodeFunctionData("send", ["0x"]);
  console.log(
    `Sending the spoke root to hub... domain: ${spokeRootData.domain}, spokeConnector: ${spokeRootData.to}, outboundRoot: ${outboundRoot}`,
  );
  const receipt = await txService.sendTx(
    { domain: +spokeRootData.domain, to: spokeRootData.to, data: sendData, value: 0 },
    requestContext,
  );

  console.log(`Sent the spoke root, tx: `, receipt);
  return outboundRoot;
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
export const propagateAggregatedRootToSpokes = async (
  propagateData: {
    domain: string;
    to: string;
    connectors: string[];
    fees: string[];
    encodedData: string[];
  },
  txService: TransactionService,
  signer: Signer,
) => {
  const { requestContext } = createLoggingContext(propagateAggregatedRootToSpokes.name);

  // mine blocks before dequeue as delay blocks
  await (signer.provider! as providers.JsonRpcProvider).send("anvil_mine", [10]);

  const encodeLastPropagated = await txService.readTx({
    domain: +propagateData.domain,
    data: RootManagerInterface.encodeFunctionData("lastPropagatedRoot"),
    to: propagateData.to,
  });
  const [lastPropagated] = RootManagerInterface.decodeFunctionResult("lastPropagatedRoot", encodeLastPropagated);
  console.log(`Last propagated root: ${lastPropagated}`);

  const txData = RootManagerInterface.encodeFunctionData("propagate", [
    propagateData.connectors,
    propagateData.fees,
    propagateData.encodedData,
  ]);
  const value = propagateData.fees.reduce((acc, cur) => {
    return BigNumber.from(acc).add(BigNumber.from(cur));
  }, BigNumber.from("0"));

  console.log(
    `Propagating aggregated root to hub connectors... domain: ${propagateData.domain}, RootManager: ${
      propagateData.to
    }, value: ${value.toString()}`,
  );
  console.log(`propagateData: `, propagateData);

  const receipt = await txService.sendTx(
    { domain: +propagateData.domain, to: propagateData.to, data: txData, value: value },
    requestContext,
  );

  console.log(`Propagated tx: `, receipt);
};

/**
 * Receives the aggregated root from the hub domain on AdminSpokeConnector
 */
export const receiveAggregatedRootOnSpoke = async () => {};
