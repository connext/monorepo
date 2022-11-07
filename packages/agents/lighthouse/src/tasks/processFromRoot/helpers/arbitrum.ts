import { createLoggingContext } from "@connext/nxtp-utils";
import { BigNumberish, utils } from "ethers";
import { l2Networks } from "@arbitrum/sdk/dist/lib/dataEntities/networks";

import { getContext } from "../processFromRoot";
import { ConfirmDataDoesNotMatch, NoRootAvailable } from "../errors";
import {
  EventFetcher,
  JsonRpcProvider,
  L2TransactionReceipt,
  Outbox__factory,
  RollupUserLogic__factory,
} from "../../../mockable";

import { GetProcessArgsParams } from ".";

export const getProcessFromArbitrumRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams) => {
  const {
    logger,
    adapters: { chainreader },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("getProcessFromArbitrumRootArgs", _requestContext);
  logger.info("getProcessFromArbitrumRootArgs method start", requestContext, methodContext);
  // // // Things that are needed:
  // // uint64 _nodeNum, x
  // // bytes32 _sendRoot, x
  // // bytes32 _blockHash, x
  // // bytes32[] calldata _proof, x
  // // uint256 _index, x
  // // L2Message calldata _message x
  // // get the tx
  const spokeJsonProvider = new JsonRpcProvider(spokeProvider);
  const tx = await spokeJsonProvider.getTransactionReceipt(sendHash);
  const l2TxnReceipt = new L2TransactionReceipt(tx);
  // @ts-ignore
  const dataIsOnL1 = await l2TxnReceipt.isDataAvailable(spokeJsonProvider);
  if (!dataIsOnL1) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }
  // get the proof
  const hubJsonProvider = new JsonRpcProvider(hubProvider);
  const [msg] = await l2TxnReceipt.getL2ToL1Messages(hubJsonProvider);
  const proof = await msg.getOutboxProof(spokeJsonProvider);
  logger.info("Got proof", requestContext, methodContext, { proof });
  // get the index
  const index = msg.event.position;
  logger.info("Got index", requestContext, methodContext, { index: index.toString() });
  // construct the l2 message information
  const l2Message = {
    l2Sender: msg.event.caller,
    to: msg.event.destination,
    l2Block: msg.event.arbBlockNum,
    l1Block: msg.event.ethBlockNum,
    l2Timestamp: msg.event.timestamp,
    value: msg.event.callvalue,
    callData: msg.event.data,
  };
  logger.info("Got l2Message", requestContext, methodContext, { l2Message });
  // get the node number by finding the node created event with matching send
  // root.
  // a node is the bit of data that includes the l2 state that will eventually
  // get posted into an outbox (where the messages are proven against once the
  // fraud period elapses). because the node is not directly user facing, there are
  // not many utility methods for accessing it. you can get the node num in two ways:
  // 1. (not used) Find the `NodeCreated` event where the currentInboxSize > the l2->l1 message
  //    sequence number. Sample of finding this event can be seen here:
  //    https://github.com/OffchainLabs/arbitrum-sdk/blob/0151a79ed37a65033991bb107d6e1072bfc052c0/src/lib/message/L2ToL1Message.ts#L397-L455
  //    NOTE: this was the original method tried, but failed to find the correct node
  //    created event (it was failing when verifying the sendRoot in the connector)
  // 2. Calculate the send root and the item hash using the `Outbox.sol` interface, then
  //    find the event emitted after the `ethBlockNum` of the message containing a matching
  //    sendRoot. Find the nodeNum from this event, and submit to chain (seen below)
  const arbNetwork = l2Networks[spokeChainId];
  const fetcher = new EventFetcher(hubJsonProvider);
  logger.info("Fetching events", requestContext, methodContext, { arbNetworkRollup: arbNetwork.ethBridge.rollup });
  const logs = await fetcher.getEvents(
    arbNetwork.ethBridge.rollup,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    RollupUserLogic__factory,
    (t) => t.filters.NodeCreated(),
    {
      fromBlock: msg.event.ethBlockNum.toNumber(),
      toBlock: "latest",
    },
  );
  const outbox = Outbox__factory.connect(arbNetwork.ethBridge.outbox, hubJsonProvider);
  const expectedSendRoot = await outbox.calculateMerkleRoot(
    proof,
    index,
    await outbox.calculateItemHash(
      l2Message.l2Sender,
      l2Message.to,
      l2Message.l2Block,
      l2Message.l1Block,
      l2Message.l2Timestamp,
      l2Message.value,
      l2Message.callData,
    ),
  );
  const blocksForLog = await Promise.all(
    logs.map(async (l) => {
      console.log("l: ", l);
      const ret = await (msg as any).getBlockFromNodeLog(spokeJsonProvider, l);
      return {
        ...ret,
        nodeNum: l.event.nodeNum,
      };
    }),
  );
  const event = blocksForLog.filter((l) => l.sendRoot == expectedSendRoot).sort((a, b) => a.number - b.number)[0];
  logger.info("Got event", requestContext, methodContext, { event });
  // verify confirm data to ensure the node is correct
  const iface = RollupUserLogic__factory.createInterface();
  const nodeData = await chainreader.readTx({
    chainId: hubChainId, // TODO which to use?
    data: iface.encodeFunctionData("getNode", [event.nodeNum as BigNumberish]),
    to: arbNetwork.ethBridge.rollup,
  });
  const node = iface.decodeFunctionResult("getNode", nodeData);
  const confirmData = node.confirmData.toLowerCase() as string;
  const encoded = utils
    .keccak256(utils.defaultAbiCoder.encode(["bytes32", "bytes32"], [event.hash, event.sendRoot]))
    .toLowerCase();
  if (confirmData !== encoded) {
    throw new ConfirmDataDoesNotMatch(confirmData, encoded, { requestContext, methodContext });
  }
  // generate the args to submit
  return [event.nodeNum, event.sendRoot, event.hash, proof, index, l2Message];
};
