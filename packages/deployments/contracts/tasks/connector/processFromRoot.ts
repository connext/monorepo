import { task } from "hardhat/config";
import { EventFetcher, L2TransactionReceipt } from "@arbitrum/sdk";
import { BigNumberish, Contract, providers, Wallet } from "ethers";
import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import { l2Networks } from "@arbitrum/sdk/dist/lib/dataEntities/networks";
import { CrossChainMessenger } from "@eth-optimism/sdk";

import hardhatConfig from "../../hardhat.config";
import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";
import { RollupUserLogic__factory } from "../abis/RollupUserLogic__factory";
import { Outbox__factory } from "../abis/Outbox__factory";
import { MessagingProtocolConfig } from "../../deployConfig/shared";
import { delay } from "../../src";

type TaskArgs = {
  tx: string;
  spoke: string;
  env?: Env;
  networkType?: ProtocolNetwork;
};

const processFromArbitrumRoot = async (
  spoke: number,
  sendHash: string,
  spokeProvider: providers.JsonRpcProvider,
  hubProvider: providers.JsonRpcProvider,
  deployer: Wallet,
) => {
  // // Things that are needed:
  // uint64 _nodeNum, x
  // bytes32 _sendRoot, x
  // bytes32 _blockHash, x
  // bytes32[] calldata _proof, x
  // uint256 _index, x
  // L2Message calldata _message x

  // get the tx
  const l2TxnReceipt = new L2TransactionReceipt(await spokeProvider.getTransactionReceipt(sendHash));

  // @ts-ignore
  const dataIsOnL1 = await l2TxnReceipt.isDataAvailable(spokeProvider);
  if (!dataIsOnL1) {
    throw new Error(`tx data not yet posted to l1`);
  }

  // get the proof
  const [msg] = await l2TxnReceipt.getL2ToL1Messages(hubProvider);
  const proof = await msg.getOutboxProof(spokeProvider);
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
  const arbNetwork = l2Networks[spoke];
  const fetcher = new EventFetcher(hubProvider);
  console.log("searching for node created events at", arbNetwork.ethBridge.rollup);
  const logs = await fetcher.getEvents(
    arbNetwork.ethBridge.rollup,
    RollupUserLogic__factory,
    (t) => t.filters.NodeCreated(),
    {
      fromBlock: msg.event.ethBlockNum.toNumber(),
      toBlock: "latest",
    },
  );

  const outbox = Outbox__factory.connect(arbNetwork.ethBridge.outbox, hubProvider);

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
      const ret = await (msg as any).getBlockFromNodeLog(spokeProvider, l);
      return {
        ...ret,
        nodeNum: l.event.nodeNum,
      };
    }),
  );
  const event = blocksForLog.filter((l) => l.sendRoot == expectedSendRoot).sort((a, b) => a.number - b.number)[0];
  console.log("event", event);

  // verify confirm data to ensure the node is correct
  const node = await RollupUserLogic__factory.connect(arbNetwork.ethBridge.rollup, deployer).getNode(
    event.nodeNum as BigNumberish,
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

  return args;
};

const processFromOptimismRoot = async (
  spoke: number,
  sendHash: string,
  protocolConfig: MessagingProtocolConfig,
  spokeProvider: providers.JsonRpcProvider,
  hubProvider: providers.JsonRpcProvider,
) => {
  // When processing from root on optimism, you need the following information:
  //   address _target, -> connector
  //   address _sender, -> mirror connector
  //   bytes memory _message, -> calldata
  //   uint256 _messageNonce, -> ?
  //   L2MessageInclusionProof memory _proof -> taken from sdk

  // create the messenger
  const messenger = new CrossChainMessenger({
    l2ChainId: spoke,
    l2SignerOrProvider: spokeProvider,
    l1ChainId: protocolConfig.hub,
    l1SignerOrProvider: hubProvider,
  });

  // check to make sure you can prove
  let root;
  while (!root) {
    root = await messenger.getMessageStateRoot(sendHash);
    if (!root) {
      console.log("no root yet, waiting so patiently");
      await delay(2_000);
    }
  }
  // const root = await messenger.getMessageStateRoot(sendHash);
  // if (!root) {
  //   throw new Error("Data not yet available on hub network");
  // }

  // get the message to get the message nonce
  const [message] = await messenger.getMessagesByTransaction(sendHash);
  console.log("message", message);

  // get the inclusion proof
  const proof = await messenger.getMessageProof(sendHash);
  console.log("L2 message proof:", proof);

  return [message.target, message.sender, message.message, message.messageNonce, proof];
};

export default task("process-from-root", "Call `Connector.processFromRoot()` to process message")
  .addParam("tx", "The transaction hash that sent the L2 -> L1 message that should be processed")
  .addParam("spoke", "The chainId for the spoke")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(
    async ({ env: _env, tx: sendHash, spoke: _spoke, networkType: _networkType }: TaskArgs, { deployments }) => {
      const deployer = Wallet.fromMnemonic(process.env.MNEMONIC!);

      const env = mustGetEnv(_env);
      const spoke = +_spoke;
      const networkType = _networkType ?? ProtocolNetwork.TESTNET;
      console.log("networkType: ", networkType);
      console.log("env:", env);
      console.log("spoke", spoke);
      console.log("sendHash", sendHash);
      console.log("deployer", deployer.address);

      // get config
      const protocolConfig = getMessagingProtocolConfig(networkType);

      // get the l2 provider
      const l2Provider = getProviderFromHardhatConfig(hardhatConfig, spoke);
      // get the l1 provider
      const l1Provider = getProviderFromHardhatConfig(hardhatConfig, protocolConfig.hub);

      // see what prerfix this spoke is
      const prefix = protocolConfig.configs[spoke].prefix;

      let args: any[];
      switch (prefix) {
        case "Optimism":
          args = await processFromOptimismRoot(spoke, sendHash, protocolConfig, l2Provider, l1Provider);
          break;
        case "Arbitrum":
          args = await processFromArbitrumRoot(spoke, sendHash, l2Provider, l1Provider, deployer);
          break;
        default:
          throw new Error(`${prefix} is not supported`);
      }

      // try to call process from root on hub connector
      const deploymentName = getDeploymentName(getConnectorName(protocolConfig, spoke, protocolConfig.hub), env);
      const deployment = await deployments.get(deploymentName);
      const address = deployment.address;
      console.log(deploymentName, "connector:", address);

      const connector = new Contract(address, deployment.abi, deployer.connect(l1Provider));
      console.log("created connector");

      const tx = await connector.processMessageFromRoot(...args);
      console.log("tx", tx.hash);
      await tx.wait();
      console.log("tx mined");
    },
  );
