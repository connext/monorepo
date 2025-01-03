import { TransactionService } from "@connext/nxtp-txservice";
import { createLoggingContext, getNtpTimeSeconds } from "@connext/nxtp-utils";
import {
  AdminSpokeConnectorInterface,
  AdminHubConnectorInterface,
  RootManagerInterface,
} from "@connext/smart-contracts";
import { BigNumber, Signer, providers } from "ethers";
import { PARAMETERS } from "../../constants/local";

/**
 * Sends the spoke root via AMB.
 *
 * Even though we don't have the AMB configured in local test, we need to create a transaction for an event
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
export const receiveSpokeRootOnHub = async (
  spokeRootData: { domain: string; to: string; root: string },
  txService: TransactionService,
) => {
  const { requestContext } = createLoggingContext(receiveSpokeRootOnHub.name);

  const txData = AdminHubConnectorInterface.encodeFunctionData("addSpokeRootToAggregate", [spokeRootData.root]);
  console.log(
    `Adding the spoke root to hub... domain: ${spokeRootData.domain}, hubConnector: ${spokeRootData.to}, root: ${spokeRootData.root}`,
  );
  const receipt = await txService.sendTx(
    {
      domain: +spokeRootData.domain,
      to: spokeRootData.to,
      data: txData,
      value: 0,
      from: PARAMETERS.AGENTS.DEPLOYER.address,
    },
    requestContext,
  );

  console.log(`Added the spoke root, tx: `, receipt);
};

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
): Promise<string> => {
  const { requestContext } = createLoggingContext(propagateAggregatedRootToSpokes.name);

  const encodeDelayBlocks = await txService.readTx({
    domain: +propagateData.domain,
    data: RootManagerInterface.encodeFunctionData("delayBlocks"),
    to: propagateData.to,
  });
  const [delayBlocks] = RootManagerInterface.decodeFunctionResult("delayBlocks", encodeDelayBlocks);
  console.log(`RootManager Delay Blocks: ${delayBlocks}`);

  // mine blocks before dequeue as delay blocks
  await (signer.provider! as providers.JsonRpcProvider).send("anvil_mine", [delayBlocks * 1 + 1]);

  let encodeLastPropagated = await txService.readTx({
    domain: +propagateData.domain,
    data: RootManagerInterface.encodeFunctionData("lastPropagatedRoot", [getNtpTimeSeconds()]),
    to: propagateData.to,
  });
  let [lastPropagated] = RootManagerInterface.decodeFunctionResult("lastPropagatedRoot", encodeLastPropagated);
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

  encodeLastPropagated = await txService.readTx({
    domain: +propagateData.domain,
    data: RootManagerInterface.encodeFunctionData("lastPropagatedRoot", [getNtpTimeSeconds()]),
    to: propagateData.to,
  });
  [lastPropagated] = RootManagerInterface.decodeFunctionResult("lastPropagatedRoot", encodeLastPropagated);
  console.log(`Last propagated root: ${lastPropagated}`);

  return lastPropagated;
};

/**
 * Receives the aggregated root from the hub domain on AdminSpokeConnector
 */
export const receiveAggregatedRootOnSpoke = async (
  data: {
    domain: string;
    to: string;
    root: string;
  },
  txService: TransactionService,
) => {
  const { requestContext } = createLoggingContext(receiveAggregatedRootOnSpoke.name);

  const txData = AdminSpokeConnectorInterface.encodeFunctionData("receiveHubAggregateRoot", [data.root]);

  console.log(
    `Set aggregated root to spoke connector... domain: ${data.domain}, SpokeConnector: ${data.to}, root: ${data.root}`,
  );
  const receipt = await txService.sendTx(
    { domain: +data.domain, to: data.to, data: txData, value: 0, from: PARAMETERS.AGENTS.DEPLOYER.address },
    requestContext,
  );
  console.log(`Receive aggregated root tx: `, receipt);
};
