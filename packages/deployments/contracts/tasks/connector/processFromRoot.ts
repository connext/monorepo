import { task } from "hardhat/config";
import { EventFetcher, L2TransactionReceipt } from "@arbitrum/sdk";
import { Contract } from "ethers";
import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import { l2Networks } from "@arbitrum/sdk/dist/lib/dataEntities/networks";

import hardhatConfig from "../../hardhat.config";
import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
} from "../../src/utils";
import { RollupUserLogic__factory } from "../abis/RollupUserLogic__factory";
import { Outbox__factory } from "../abis/Outbox__factory";

type TaskArgs = {
  tx: string;
  env?: Env;
};
export default task("process-from-root", "Call `Connector.processFromRoot()` to process message")
  .addParam("tx", "The transaction hash that sent the L2 -> L1 message that should be processed")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env, tx: sendHash }: TaskArgs, { ethers, deployments }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("sendHash", sendHash);
    // get config
    const protocolConfig = getMessagingProtocolConfig(env);

    // // Things that are needed:
    // uint64 _nodeNum, x
    // bytes32 _sendRoot, x
    // bytes32 _blockHash, x
    // bytes32[] calldata _proof, x
    // uint256 _index, x
    // L2Message calldata _message x
    const l2ChainId = 421613;

    // get the l2 provider
    const l2Provider = getProviderFromHardhatConfig(hardhatConfig, l2ChainId);
    // get the l1 provider
    const l1Provider = getProviderFromHardhatConfig(hardhatConfig, protocolConfig.hub);

    // get the tx
    const l2TxnReceipt = new L2TransactionReceipt(await l2Provider.getTransactionReceipt(sendHash));

    // @ts-ignore
    const dataIsOnL1 = await l2TxnReceipt.isDataAvailable(l2Provider);
    if (!dataIsOnL1) {
      throw new Error(`tx data not yet posted to l1`);
    }

    // get the proof
    const [msg] = await l2TxnReceipt.getL2ToL1Messages(l1Provider);
    const proof = await msg.getOutboxProof(l2Provider);
    console.log("proof", proof);

    // get the index
    const index = msg.event.position;
    console.log("index", index.toNumber());

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
    console.log("l2Message", l2Message);

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
    const arbNetwork = l2Networks[l2ChainId];
    const fetcher = new EventFetcher(l1Provider);
    console.log("searching for node created events at", arbNetwork.ethBridge.rollup);
    const logs = await fetcher.getEvents(
      arbNetwork.ethBridge.rollup as string,
      RollupUserLogic__factory,
      (t) => t.filters.NodeCreated(),
      {
        fromBlock: msg.event.ethBlockNum.toNumber(),
        toBlock: "latest",
      },
    );

    const outbox = Outbox__factory.connect(arbNetwork.ethBridge.outbox as string, l1Provider);

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
        const ret = await (msg as any).getBlockFromNodeLog(l2Provider, l);
        return {
          ...ret,
          nodeNum: l.event.nodeNum,
        };
      }),
    );
    const event = blocksForLog.filter((l) => l.sendRoot == expectedSendRoot).sort((a, b) => a.number - b.number)[0];
    console.log("event", event);

    // verify confirm data to ensure the node is correct
    const node = await RollupUserLogic__factory.connect(arbNetwork.ethBridge.rollup as string, deployer).getNode(
      event.nodeNum,
    );
    if (
      node.confirmData.toLowerCase() !==
      keccak256(defaultAbiCoder.encode(["bytes32", "bytes32"], [event.hash, event.sendRoot])).toLowerCase()
    ) {
      throw new Error(`something went wrong -- confirm data does not match`);
    }

    // generate the args to submit
    const args = [event.nodeNum, event.sendRoot, event.hash, proof, index, l2Message];
    console.log("args", args);

    // try to call process from root on spoke
    const deploymentName = getDeploymentName(getConnectorName(protocolConfig, l2ChainId, protocolConfig.hub), env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);
    console.log("created connector");

    const tx = await connector.processMessageFromRoot(...args);
    console.log("tx", tx.hash);
    await tx.wait();
    console.log("tx mined");
  });
