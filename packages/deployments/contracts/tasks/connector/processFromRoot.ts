import { task } from "hardhat/config";
import { EventFetcher, ChildTransactionReceipt, getChildrenForNetwork } from "@arbitrum/sdk";

import { BigNumber, BigNumberish, constants, Contract, providers, Wallet } from "ethers";
import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import {
  DEFAULT_L2_CONTRACT_ADDRESSES,
  CrossChainMessenger as OptimismCrossChainMessenger,
  MessageStatus as OptimismMessageStatus,
} from "@eth-optimism/sdk";
import { FetchedEvent } from "@arbitrum/sdk/dist/lib/utils/eventFetcher";
import { NodeInterface__factory } from "@arbitrum/sdk/dist/lib/abi/factories/NodeInterface__factory";
import { NODE_INTERFACE_ADDRESS } from "@arbitrum/sdk/dist/lib/dataEntities/constants";
import { chainIdToDomain, generateExitPayload } from "@connext/nxtp-utils";
import { CrossChainMessenger as MantleCrossChainMessenger } from "@mantleio/sdk";

import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";
import { RollupUserLogic__factory } from "../../src/abis/RollupUserLogic__factory";
import { MessagingProtocolConfig } from "../../deployConfig/shared";
import { NodeCreatedEvent, getProviderUrlFromHardhatConfig } from "../../src";
import { getMessageProof, getMessagesByTransaction, getMessageStateRoot } from "./metis";

type TaskArgs = {
  tx: string;
  spoke: string;
  env?: Env;
  networkType?: ProtocolNetwork;
};

const processFromPolygonRoot = async (spoke: number, sendHash: string, hubProvider: providers.JsonRpcProvider) => {
  const hubChain = (await hubProvider.getNetwork()).chainId;
  const SEND_MESSAGE_EVENT_SIG = "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036"; // keccak256(MessageSent(bytes))

  const providerMapping = new Map<string, string[]>();
  const spokeDomain = chainIdToDomain(spoke);
  const hubDomain = chainIdToDomain(hubChain);
  providerMapping.set(hubDomain.toString(), [getProviderUrlFromHardhatConfig(hubChain)]);
  providerMapping.set(spokeDomain.toString(), [getProviderUrlFromHardhatConfig(spoke)]);
  console.log("hubDomain", hubDomain.toString());
  console.log("spokeDomain", spokeDomain.toString());
  const { hash, payload } = await generateExitPayload(
    spokeDomain.toString(),
    hubDomain.toString(),
    sendHash,
    SEND_MESSAGE_EVENT_SIG,
    providerMapping,
  );
  if (!payload) {
    throw new Error(`no hash or payload. already or not yet ready to be processed`);
  }
  console.log("hash: ", hash);
  return [payload];
};

const processFromArbitrumRoot = async (
  spoke: number,
  sendHash: string,
  spokeProvider: providers.JsonRpcProvider,
  hubProvider: providers.JsonRpcProvider,
  deployer: Wallet,
) => {
  // // // Things that are needed:
  // // uint64 _nodeNum, x
  // // bytes32 _sendRoot, x
  // // bytes32 _blockHash, x
  // // bytes32[] calldata _proof, x
  // // uint256 _index, x
  // // L2Message calldata _message x
  // // get the tx
  const l2TxnReceipt = new ChildTransactionReceipt(await spokeProvider.getTransactionReceipt(sendHash));
  // @ts-ignore
  const dataIsOnL1 = await l2TxnReceipt.isDataAvailable(spokeProvider);
  if (!dataIsOnL1) {
    throw new Error(`tx data not yet posted to l1`);
  }
  // get the proof
  const [reader] = await l2TxnReceipt.getChildToParentMessages(hubProvider);
  console.log("msg:", (reader as any).nitroReader.event);
  const msg = (reader as any).nitroReader; //as nitro.ChildToParentMessageReaderNitro;
  if (!msg?.event) {
    throw new Error(`Could not find event for message in ${sendHash}`);
  }
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
  // 1. Find the `NodeCreated` event where the currentInboxSize > the l2->l1 message
  //    sequence number. Sample of finding this event can be seen here:
  //    https://github.com/OffchainLabs/arbitrum-sdk/blob/0151a79ed37a65033991bb107d6e1072bfc052c0/src/lib/message/L2ToL1Message.ts#L397-L455
  //    NOTE: this was the original method tried, but failed to find the correct node
  //    created event (it was failing when verifying the sendRoot in the connector)
  // 2. Calculate the send root and the item hash using the `Outbox.sol` interface, then
  //    find the event emitted after the `ethBlockNum` of the message containing a matching
  //    sendRoot. Find the nodeNum from this event, and submit to chain. Not used.
  const arbNetwork = getChildrenForNetwork(1).find((n) => n.chainId === spoke);
  if (!arbNetwork) {
    throw new Error(`could not find arbitrum child network for spoke ${spoke}`);
  }
  const fetcher = new EventFetcher(hubProvider);
  console.log("searching for node created events at", arbNetwork.ethBridge.rollup);
  const logs = await fetcher.getEvents(RollupUserLogic__factory, (t) => t.filters.NodeCreated(), {
    fromBlock: msg.event.ethBlockNum.toNumber(),
    toBlock: "latest",
  });
  console.log("found", logs.length, "logs to sort through. searching for send count >", msg.event.position.toString());
  // use binary search to find the first node with sendCount > this.event.position
  // default to the last node since we already checked above
  let foundLog: FetchedEvent<NodeCreatedEvent> = logs[logs.length - 1];
  let left = 0;
  let right = logs.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const log = logs[mid];
    let sendCount = BigNumber.from(0);
    try {
      const block = await msg.getBlockFromAssertionLog(spokeProvider, log);
      sendCount = BigNumber.from(block.sendCount);
    } catch (e) {
      console.warn("failed to get block:", e);
    }
    console.log("- sendCount", sendCount.toString());
    if (sendCount.gt(msg.event.position as BigNumberish)) {
      foundLog = log;
      right = mid - 1;
      left = right + 1;
    } else {
      left = mid + 1;
    }
  }

  const earliestNodeWithExit = (foundLog.event as any).nodeNum;
  const rollup = RollupUserLogic__factory.getContract(
    arbNetwork.ethBridge.rollup,
    RollupUserLogic__factory.abi,
    deployer.connect(hubProvider),
  );
  const foundBlock = await msg.getBlockFromAssertionId(rollup, earliestNodeWithExit, spokeProvider);
  console.log("node:", earliestNodeWithExit.toString());
  console.log("msg.position", msg.event.position.toString());
  console.log("foundLog:", foundLog);
  console.log("foundBlock:", foundBlock);
  const node = await rollup.getNode(earliestNodeWithExit);
  if (
    node.confirmData.toLowerCase() !==
    keccak256(defaultAbiCoder.encode(["bytes32", "bytes32"], [foundBlock.hash, foundBlock.sendRoot])).toLowerCase()
  ) {
    throw new Error(`something went wrong -- confirm data does not match`);
  }

  // get the proof
  const params = await NodeInterface__factory.connect(NODE_INTERFACE_ADDRESS, spokeProvider).constructOutboxProof(
    foundBlock.sendCount.toNumber() as number,
    (msg.event.position as BigNumber).toNumber(),
  );

  // generate the args to submit
  const args = [earliestNodeWithExit, foundBlock.sendRoot, foundBlock.hash, params.proof, index, l2Message];
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

  // Determine if this is using bedrock or not

  // create the messenger
  const messenger = new OptimismCrossChainMessenger({
    l2ChainId: spoke,
    l2SignerOrProvider: spokeProvider,
    l1ChainId: protocolConfig.hub.chain,
    l1SignerOrProvider: hubProvider,
    bedrock: true,
  });

  const status = await messenger.getMessageStatus(sendHash);
  if (status !== OptimismMessageStatus.READY_TO_PROVE) {
    throw new Error(`Optimism message status is not ready to prove: ${status}`);
  }
  // get the message
  const resolved = await messenger.toCrossChainMessage(sendHash);
  const {
    messageNonce: nonce,
    sender,
    target,
    value,
    message: data,
    minGasLimit: gasLimit,
  } = await messenger.toLowLevelMessage(resolved);

  // get the tx
  const tx = {
    nonce: nonce.toString(),
    sender,
    target,
    value,
    gasLimit,
    data,
  };
  console.log("withdrawal tx", tx);

  // get the proof
  const proof = await messenger.getBedrockMessageProof(sendHash);
  console.log("L2 message proof:", proof);
  if (!proof) {
    throw new Error(`no proof`);
  }
  const { l2OutputIndex, outputRootProof, withdrawalProof } = proof;

  // Format arguments
  return [tx, l2OutputIndex, outputRootProof, withdrawalProof];
};

const processFromMantleRoot = async (
  spoke: number,
  sendHash: string,
  protocolConfig: MessagingProtocolConfig,
  spokeProvider: providers.JsonRpcProvider,
  hubProvider: providers.JsonRpcProvider,
) => {
  // create the messenger
  const messenger = new MantleCrossChainMessenger({
    l2ChainId: spoke,
    l2SignerOrProvider: spokeProvider,
    l1ChainId: protocolConfig.hub.chain,
    l1SignerOrProvider: hubProvider,
    bedrock: false,
  });

  // check to make sure you can prove
  console.log("getting the root...");
  const root = await messenger.getMessageStateRoot(sendHash);
  if (!root) {
    throw new Error(`No root available`);
  }

  // get the message to get the message nonce
  console.log("getting the message by transaction...");
  const [message] = await messenger.getMessagesByTransaction(sendHash);
  console.log("Got message from mantle");

  // get the inclusion proof
  console.log("getting the message proof...");
  const proof = await messenger.getMessageProof(sendHash);
  console.log("Got proof from mantle");

  return [message.target, message.sender, message.message, message.messageNonce, proof];
};

const processFromMetisRoot = async (
  spoke: number,
  sendHash: string,
  protocolConfig: MessagingProtocolConfig,
  spokeProvider: providers.JsonRpcProvider,
  hubProvider: providers.JsonRpcProvider,
) => {
  // create the messenger
  const messenger = new OptimismCrossChainMessenger({
    l2ChainId: spoke,
    l2SignerOrProvider: spokeProvider,
    l1ChainId: protocolConfig.hub.chain,
    l1SignerOrProvider: hubProvider,
    contracts: {
      l1: {
        AddressManager: "0x918778e825747a892b17C66fe7D24C618262867d",
        L1CrossDomainMessenger: "0x081D1101855bD523bA69A9794e0217F0DB6323ff",
        L1StandardBridge: "0x3980c9ed79d2c191A89E02Fa3529C60eD6e9c04b",
        StateCommitmentChain: "0xf209815E595Cdf3ed0aAF9665b1772e608AB9380",
        CanonicalTransactionChain: "0x56a76bcC92361f6DF8D75476feD8843EdC70e1C9",
        BondManager: "0xf51B9C9a1c12e7E48BEC15DC358D0C1f0d7Eb3be",
        OptimismPortal: constants.AddressZero,
        L2OutputOracle: constants.AddressZero,
      },
      l2: DEFAULT_L2_CONTRACT_ADDRESSES,
    },
    bedrock: false,
  });

  // check to make sure you can prove
  const root = await getMessageStateRoot(messenger, sendHash);
  if (!root) {
    throw new Error(`No metis root available`);
  }
  console.log(`metis root:`, root);

  // get the message to get the message nonce
  const [message] = await getMessagesByTransaction(messenger, sendHash);
  console.log("Got message from metis", message);

  // get the inclusion proof
  const proof = await getMessageProof(messenger, sendHash);
  console.log("Got proof from metis", proof);

  return [message.target, message.sender, message.message, message.messageNonce, proof];
};

export default task("process-from-root", "Call `Connector.processFromRoot()` to process message")
  .addParam("tx", "The transaction hash that sent the L2 -> L1 message that should be processed")
  .addParam("spoke", "The chainId for the spoke")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(
    async ({ env: _env, tx: sendHash, spoke: _spoke, networkType: _networkType }: TaskArgs, { deployments }) => {
      const deployer = Wallet.fromMnemonic(process.env.MAINNET_MNEMONIC ?? process.env.MNEMONIC!);

      const env = mustGetEnv(_env);
      const spoke = +_spoke;
      const networkType = (_networkType ?? process.env.NETWORK ?? ProtocolNetwork.TESTNET) as ProtocolNetwork;
      console.log("networkType: ", networkType);
      console.log("env:", env);
      console.log("spoke", spoke);
      console.log("sendHash", sendHash);
      console.log("deployer", deployer.address);

      // get config
      const protocolConfig = getMessagingProtocolConfig(networkType);

      // get the l2 provider
      const l2Provider = getProviderFromHardhatConfig(spoke);
      // get the l1 provider
      const l1Provider = getProviderFromHardhatConfig(protocolConfig.hub.chain);

      // see what prefix this spoke is
      const prefix = protocolConfig.configs[spoke].networkName ?? protocolConfig.configs[spoke].prefix;

      let args: any[];
      let method = "processFromRoot";
      switch (prefix) {
        case "Optimism":
          method = "processMessageFromRoot";
          args = await processFromOptimismRoot(spoke, sendHash, protocolConfig, l2Provider, l1Provider);
          break;
        case "Arbitrum":
          method = "processMessageFromRoot";
          args = await processFromArbitrumRoot(spoke, sendHash, l2Provider, l1Provider, deployer);
          break;
        case "Polygon":
          method = "receiveMessage";
          args = await processFromPolygonRoot(spoke, sendHash, l1Provider);
          break;
        case "Mantle":
          method = "processMessageFromRoot";
          args = await processFromMantleRoot(spoke, sendHash, protocolConfig, l2Provider, l1Provider);
          break;
        case "Metis":
          method = "processMessageFromRoot";
          args = await processFromMetisRoot(spoke, sendHash, protocolConfig, l2Provider, l1Provider);
          break;
        default:
          throw new Error(`${prefix} is not supported`);
      }

      // try to call process from root on hub connector
      const deploymentName = getDeploymentName(getConnectorName(protocolConfig, spoke, protocolConfig.hub.chain), env);
      const deployment = await deployments.get(deploymentName);
      const address = deployment.address;
      console.log(deploymentName, "connector:", address);

      const connector = new Contract(address, deployment.abi, deployer.connect(l1Provider));
      console.log("created connector");

      const tx = await connector[method](...args);
      console.log("tx", tx.hash);
      await tx.wait();
      console.log("tx mined");
    },
  );
