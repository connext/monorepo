import {
  CrossChainMessage,
  CrossChainMessageProof,
  MessageDirection,
  MessageLike,
  StateRoot,
  StateRootBatch,
  TokenBridgeMessage,
  TransactionLike,
  makeMerkleTreeProof,
  makeStateTrieProof,
  toTransactionHash,
} from "@eth-optimism/sdk";
import { remove0x, toHexString, encodeCrossDomainMessageV0 } from "@eth-optimism/core-utils";
import { Contract, ethers } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import * as rlp from "rlp";

import { OptimismCrossChainMessenger } from "../../../../mockable";

import { L1CrossDomainMessengerAbi, L2CrossDomainMessengerAbi, StateCommitmentChainAbi } from "./abis";

export const getMessagesByTransaction = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  transaction: TransactionLike,
  opts: {
    direction?: MessageDirection;
  } = {},
): Promise<CrossChainMessage[]> => {
  // Convert the input to a transaction hash.
  const txHash = toTransactionHash(transaction);

  let receipt: TransactionReceipt;
  if (opts.direction !== undefined) {
    // Get the receipt for the requested direction.
    if (opts.direction === MessageDirection.L1_TO_L2) {
      receipt = await crossChainMessenger.l1Provider.getTransactionReceipt(txHash);
    } else {
      receipt = await crossChainMessenger.l2Provider.getTransactionReceipt(txHash);
    }
  } else {
    // Try both directions, starting with L1 => L2.
    receipt = await crossChainMessenger.l1Provider.getTransactionReceipt(txHash);
    if (receipt) {
      opts.direction = MessageDirection.L1_TO_L2;
    } else {
      receipt = await crossChainMessenger.l2Provider.getTransactionReceipt(txHash);
      opts.direction = MessageDirection.L2_TO_L1;
    }
  }
  if (!receipt) {
    throw new Error(`unable to find transaction receipt for ${txHash}`);
  }

  // By this point opts.direction will always be defined.
  const messengerAddress =
    opts.direction === MessageDirection.L1_TO_L2
      ? crossChainMessenger.contracts.l1.L1CrossDomainMessenger.address
      : crossChainMessenger.contracts.l2.L2CrossDomainMessenger.address;

  const messenger = new Contract(
    messengerAddress,
    opts.direction === MessageDirection.L1_TO_L2 ? L1CrossDomainMessengerAbi : L2CrossDomainMessengerAbi,
    opts.direction === MessageDirection.L1_TO_L2 ? crossChainMessenger.l1Provider : crossChainMessenger.l2Provider,
  );

  return receipt.logs
    .filter((log) => {
      // Only look at logs emitted by the messenger address
      return log.address === messenger.address;
    })
    .filter((log) => {
      // Only look at SentMessage logs specifically
      const parsed = messenger.interface.parseLog(log);
      return parsed.name === "SentMessage";
    })
    .map((log) => {
      // Try to pull out the value field, but only if the very next log is a SentMessageExtension1
      // event which was introduced in the Bedrock upgrade.
      let value = ethers.BigNumber.from(0);
      const next = receipt.logs.find((l) => {
        return l.logIndex === log.logIndex + 1 && l.address === messenger.address;
      });
      if (next) {
        const nextParsed = messenger.interface.parseLog(next);
        if (nextParsed.name === "SentMessageExtension1") {
          value = nextParsed.args.value;
        }
      }

      // Convert each SentMessage log into a message object
      const parsed = messenger.interface.parseLog(log);
      return {
        direction: opts.direction!,
        target: parsed.args.target,
        sender: parsed.args.sender,
        message: parsed.args.message,
        messageNonce: parsed.args.messageNonce,
        value,
        minGasLimit: parsed.args.gasLimit,
        logIndex: log.logIndex,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
      };
    });
};

export const getMessageStateRoot = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  message: MessageLike,
): Promise<StateRoot | null> => {
  const resolved = await toCrossChainMessage(crossChainMessenger, message);
  // State roots are only a thing for L2 to L1 messages.
  if (resolved.direction === MessageDirection.L1_TO_L2) {
    throw new Error(`cannot get a state root for an L1 to L2 message`);
  }

  // We need the block number of the transaction that triggered the message so we can look up the
  // state root batch that corresponds to that block number.
  const messageTxReceipt = await crossChainMessenger.l2Provider.getTransactionReceipt(resolved.transactionHash);
  // Every block has exactly one transaction in it. Since there's a genesis block, the
  // transaction index will always be one less than the block number.
  const messageTxIndex = messageTxReceipt.blockNumber - 1;

  // Pull down the state root batch, we'll try to pick out the specific state root that
  // corresponds to our message.
  const stateRootBatch = await getStateRootBatchByTransactionIndex(crossChainMessenger, messageTxIndex);
  // No state root batch, no state root.
  if (stateRootBatch === null) {
    return null;
  }

  // We have a state root batch, now we need to find the specific state root for our transaction.
  // First we need to figure out the index of the state root within the batch we found. This is
  // going to be the original transaction index offset by the total number of previous state
  // roots.
  const indexInBatch = messageTxIndex - stateRootBatch.header.prevTotalElements.toNumber();

  // Just a sanity check.
  if (stateRootBatch.stateRoots.length <= indexInBatch) {
    // Should never happen!
    throw new Error(`state root does not exist in batch`);
  }

  return {
    stateRoot: stateRootBatch.stateRoots[indexInBatch],
    stateRootIndexInBatch: indexInBatch,
    batch: stateRootBatch,
  };
};

/**
 * Generates the proof required to finalize an L2 to L1 message.
 *
 * @param message Message to generate a proof for.
 * @returns Proof that can be used to finalize the message.
 */
export const getMessageProof = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  message: MessageLike,
): Promise<CrossChainMessageProof> => {
  const resolved = await toCrossChainMessage(crossChainMessenger, message);
  if (resolved.direction === MessageDirection.L1_TO_L2) {
    throw new Error(`can only generate proofs for L2 to L1 messages`);
  }

  const stateRoot = await getMessageStateRoot(crossChainMessenger, resolved);
  if (stateRoot === null) {
    throw new Error(`state root for message not yet published`);
  }

  // We need to calculate the specific storage slot that demonstrates that this message was
  // actually included in the L2 chain. The following calculation is based on the fact that
  // messages are stored in the following mapping on L2:
  // https://github.com/ethereum-optimism/optimism/blob/c84d3450225306abbb39b4e7d6d82424341df2be/packages/contracts/contracts/L2/predeploys/OVM_L2ToL1MessagePasser.sol#L23
  // You can read more about how Solidity storage slots are computed for mappings here:
  // https://docs.soliditylang.org/en/v0.8.4/internals/layout_in_storage.html#mappings-and-dynamic-arrays
  const messageSlot = ethers.utils.keccak256(
    ethers.utils.keccak256(
      encodeCrossDomainMessageV0(resolved.target, resolved.sender, resolved.message, resolved.messageNonce) +
        remove0x(crossChainMessenger.contracts.l2.L2CrossDomainMessenger.address),
    ) + "00".repeat(32),
  );

  const stateTrieProof = await makeStateTrieProof(
    crossChainMessenger.l2Provider as ethers.providers.JsonRpcProvider,
    resolved.blockNumber,
    crossChainMessenger.contracts.l2.OVM_L2ToL1MessagePasser.address,
    messageSlot,
  );

  return {
    stateRoot: stateRoot.stateRoot,
    stateRootBatchHeader: stateRoot.batch.header,
    stateRootProof: {
      index: stateRoot.stateRootIndexInBatch,
      siblings: makeMerkleTreeProof(stateRoot.batch.stateRoots, stateRoot.stateRootIndexInBatch),
    },
    stateTrieWitness: toHexString(rlp.encode(stateTrieProof.accountProof)),
    storageTrieWitness: toHexString(rlp.encode(stateTrieProof.storageProof)),
  };
};

/**
 * Returns information about the state root batch that included the state root for the given
 * transaction by index. Returns null if no such state root has been published yet.
 *
 * @param transactionIndex Index of the L2 transaction to find a state root batch for.
 * @returns State root batch for the given transaction index, or null if none exists yet.
 */
export const getStateRootBatchByTransactionIndex = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  transactionIndex: number,
): Promise<StateRootBatch | null> => {
  const stateBatchAppendedEvent = await getStateBatchAppendedEventByTransactionIndex(
    crossChainMessenger,
    transactionIndex,
  );
  if (stateBatchAppendedEvent === null) {
    return null;
  }

  const stateBatchTransaction = await stateBatchAppendedEvent.getTransaction();
  const [stateRoots] = new Contract(
    crossChainMessenger.contracts.l1.StateCommitmentChain.address,
    StateCommitmentChainAbi,
    crossChainMessenger.l1Provider,
  ).interface.decodeFunctionData("appendStateBatch", stateBatchTransaction.data);

  return {
    blockNumber: stateBatchAppendedEvent.blockNumber,
    stateRoots,
    header: {
      batchIndex: stateBatchAppendedEvent.args!._batchIndex,
      batchRoot: stateBatchAppendedEvent.args!._batchRoot,
      batchSize: stateBatchAppendedEvent.args!._batchSize,
      prevTotalElements: stateBatchAppendedEvent.args!._prevTotalElements,
      extraData: stateBatchAppendedEvent.args!._extraData,
    },
  };
};
/**
 * Returns the StateBatchAppended event for the batch that includes the transaction with the
 * given index. Returns null if no such event exists.
 *
 * @param transactionIndex Index of the L2 transaction to find an event for.
 * @returns StateBatchAppended event for the batch that includes the given transaction by index.
 */
export const getStateBatchAppendedEventByTransactionIndex = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  transactionIndex: number,
): Promise<ethers.Event | null> => {
  const isEventHi = (event: ethers.Event, index: number) => {
    const prevTotalElements = event.args!._prevTotalElements.toNumber();
    return index < prevTotalElements;
  };

  const isEventLo = (event: ethers.Event, index: number) => {
    const prevTotalElements = event.args!._prevTotalElements.toNumber();
    const batchSize = event.args!._batchSize.toNumber();
    // eslint-disable-next-line
    return index >= prevTotalElements + batchSize;
  };

  const totalBatches: ethers.BigNumber = await crossChainMessenger.contracts.l1.StateCommitmentChain.getTotalBatches();
  if (totalBatches.eq(0)) {
    return null;
  }

  let lowerBound = 0;
  let upperBound = totalBatches.toNumber() - 1;
  let batchEvent: ethers.Event | null = await getStateBatchAppendedEventByBatchIndex(crossChainMessenger, upperBound);

  // Only happens when no batches have been submitted yet.
  if (batchEvent === null) {
    return null;
  }

  if (isEventLo(batchEvent, transactionIndex)) {
    // Upper bound is too low, means this transaction doesn't have a corresponding state batch yet.
    return null;
  } else if (!isEventHi(batchEvent, transactionIndex)) {
    // Upper bound is not too low and also not too high. This means the upper bound event is the
    // one we're looking for! Return it.
    return batchEvent;
  }

  // Binary search to find the right event. The above checks will guarantee that the event does
  // exist and that we'll find it during this search.
  while (lowerBound < upperBound) {
    const middleOfBounds = Math.floor((lowerBound + upperBound) / 2);
    batchEvent = await getStateBatchAppendedEventByBatchIndex(crossChainMessenger, middleOfBounds);

    if (isEventHi(batchEvent!, transactionIndex)) {
      upperBound = middleOfBounds;
    } else if (isEventLo(batchEvent!, transactionIndex)) {
      lowerBound = middleOfBounds;
    } else {
      break;
    }
  }

  return batchEvent;
};

/**
 * Returns the StateBatchAppended event that was emitted when the batch with a given index was
 * created. Returns null if no such event exists (the batch has not been submitted).
 *
 * @param batchIndex Index of the batch to find an event for.
 * @returns StateBatchAppended event for the batch, or null if no such batch exists.
 */
export const getStateBatchAppendedEventByBatchIndex = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  batchIndex: number,
): Promise<ethers.Event | null> => {
  const stateCommitment = new Contract(
    crossChainMessenger.contracts.l1.StateCommitmentChain.address,
    StateCommitmentChainAbi,
    crossChainMessenger.l1Provider,
  );

  const events = await stateCommitment.queryFilter(stateCommitment.filters.StateBatchAppended(null, batchIndex));
  if (events.length === 0) {
    return null;
  } else if (events.length > 1) {
    // Should never happen!
    throw new Error(`found more than one StateBatchAppended event`);
  } else {
    return events[0];
  }
};

export const toCrossChainMessage = async (
  crossChainMessenger: InstanceType<typeof OptimismCrossChainMessenger>,
  message: MessageLike,
): Promise<CrossChainMessage> => {
  if (!message) {
    throw new Error("message is undefined");
  }
  // TODO: Convert these checks into proper type checks.
  if ((message as CrossChainMessage).message) {
    return message as CrossChainMessage;
  } else if (
    (message as TokenBridgeMessage).l1Token &&
    (message as TokenBridgeMessage).l2Token &&
    (message as TokenBridgeMessage).transactionHash
  ) {
    const messages = await getMessagesByTransaction(
      crossChainMessenger,
      (message as TokenBridgeMessage).transactionHash,
    );

    // The `messages` object corresponds to a list of SentMessage events that were triggered by
    // the same transaction. We want to find the specific SentMessage event that corresponds to
    // the TokenBridgeMessage (either a ETHDepositInitiated, ERC20DepositInitiated, or
    // WithdrawalInitiated event). We expect the behavior of bridge contracts to be that these
    // TokenBridgeMessage events are triggered and then a SentMessage event is triggered. Our
    // goal here is therefore to find the first SentMessage event that comes after the input
    // event.
    const found = messages
      .sort((a, b) => {
        // Sort all messages in ascending order by log index.
        return a.logIndex - b.logIndex;
      })
      .find((m) => {
        return m.logIndex > (message as TokenBridgeMessage).logIndex;
      });

    if (!found) {
      throw new Error(`could not find SentMessage event for message`);
    }

    return found;
  } else {
    // TODO: Explicit TransactionLike check and throw if not TransactionLike
    const messages = await getMessagesByTransaction(crossChainMessenger, message as TransactionLike);

    // We only want to treat TransactionLike objects as MessageLike if they only emit a single
    // message (very common). It's unintuitive to treat a TransactionLike as a MessageLike if
    // they emit more than one message (which message do you pick?), so we throw an error.
    if (messages.length !== 1) {
      throw new Error(`expected 1 message, got ${messages.length}`);
    }

    return messages[0];
  }
};
