import {
  createLoggingContext,
  createRequestContext,
  delay,
  jsonifyError,
  RequestContextWithTransactionId,
  safeJsonStringify,
} from "@connext/nxtp-utils";

import { getContext } from "../../router";
import {
  ActiveTransaction,
  CrosschainTransactionStatus,
  FulfillPayload,
  PreparePayload,
  TCrosschainTransactionStatus,
} from "../../lib/entities";
import { getOperations } from "../../lib/operations";
import { ContractReaderNotAvailableForChain } from "../../lib/errors";

const LOOP_INTERVAL = 15_000;
export const getLoopInterval = () => LOOP_INTERVAL;

export const handlingTracker: Map<string, TCrosschainTransactionStatus> = new Map();

export const bindContractReader = async () => {
  const { contractReader, logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext("bindContractReader");
  setInterval(async () => {
    let transactions: ActiveTransaction<any>[] = [];
    try {
      transactions = await contractReader.getActiveTransactions();
      if (transactions.length > 0) {
        logger.info("Got active transactions", requestContext, methodContext, { transactions: transactions.length });
        logger.debug("Got active transactions", requestContext, methodContext, { transactions: transactions });
      }
    } catch (err) {
      logger.error("Error getting active txs", requestContext, methodContext, jsonifyError(err));
    }
    await handleActiveTransactions(transactions);
  }, getLoopInterval());
};

export const handleActiveTransactions = async (transactions: ActiveTransaction<any>[]) => {
  const { logger } = getContext();
  for (const transaction of transactions) {
    const { requestContext, methodContext } = createLoggingContext(
      handleActiveTransactions.name,
      undefined,
      transaction.crosschainTx.invariant.transactionId,
    );
    if (handlingTracker.get(transaction.crosschainTx.invariant.transactionId) === transaction.status) {
      logger.info("Already handling transaction", requestContext, methodContext);
      continue;
    }
    handleSingle(transaction, requestContext);
    await delay(750); // delay here to not flood the provider
  }
};

export const handleSingle = async (
  transaction: ActiveTransaction<any>,
  _requestContext: RequestContextWithTransactionId,
): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(
    handleSingle.name,
    _requestContext,
    transaction.crosschainTx.invariant.transactionId,
  );
  const { logger, txService, config } = getContext();
  const { prepare, cancel, fulfill } = getOperations();

  if (transaction.status === CrosschainTransactionStatus.SenderPrepared) {
    const _transaction = transaction as ActiveTransaction<"SenderPrepared">;
    const chainConfig = config.chainConfig[_transaction.crosschainTx.invariant.sendingChainId];
    if (!chainConfig) {
      // this should not happen, this should get checked before this point
      throw new ContractReaderNotAvailableForChain(_transaction.crosschainTx.invariant.sendingChainId, {
        methodContext,
        requestContext,
      });
    }
    const senderReceipt = await txService.getTransactionReceipt(
      _transaction.crosschainTx.invariant.sendingChainId,
      _transaction.payload.senderPreparedHash,
    );
    if (senderReceipt.confirmations < chainConfig.confirmations) {
      logger.info("Waiting for safe confirmations", requestContext, methodContext, {
        txConfirmations: senderReceipt.confirmations,
        configuredConfirmations: chainConfig.confirmations,
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
        txHash: _transaction.payload.senderPreparedHash,
      });
      return;
    }
    const preparePayload: PreparePayload = _transaction.payload;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info("Preparing receiver", requestContext, methodContext);
      const receipt = await prepare(
        _transaction.crosschainTx.invariant,
        {
          senderExpiry: _transaction.crosschainTx.sending.expiry,
          senderAmount: _transaction.crosschainTx.sending.amount,
          bidSignature: preparePayload.bidSignature,
          encodedBid: preparePayload.encodedBid,
          encryptedCallData: preparePayload.encryptedCallData,
        },
        requestContext,
      );
      logger.info("Prepared receiver", requestContext, methodContext, { txHash: receipt?.transactionHash });
    } catch (err) {
      const json = jsonifyError(err);
      if (safeJsonStringify(json).includes("#P:015")) {
        logger.warn("Receiver transaction already prepared", requestContext, methodContext, { error: json });
      } else {
        logger.error("Error preparing receiver", requestContext, methodContext, json, {
          chainId: transaction.crosschainTx.invariant.receivingChainId,
        });
      }
      if (err.cancellable === true) {
        logger.warn("Cancellable validation error, cancelling", requestContext, methodContext);
        try {
          const cancelRes = await cancel(
            transaction.crosschainTx.invariant,
            {
              amount: transaction.crosschainTx.sending.amount,
              expiry: transaction.crosschainTx.sending.expiry,
              preparedBlockNumber: transaction.crosschainTx.sending.preparedBlockNumber,
              side: "sender",
            },
            requestContext,
          );
          logger.info("Cancelled transaction", requestContext, methodContext, { txHash: cancelRes?.transactionHash });
        } catch (cancelErr) {
          const cancelJson = jsonifyError(cancelErr);
          if (safeJsonStringify(jsonifyError(cancelErr)).includes("#C:019")) {
            logger.warn("Already cancelled", requestContext, methodContext, {
              transaction: _transaction.crosschainTx.invariant.transactionId,
              error: cancelJson,
            });
          } else {
            logger.error("Error cancelling receiver", requestContext, methodContext, cancelJson, {
              chainId: transaction.crosschainTx.invariant.sendingChainId,
            });
          }
        }
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverFulfilled) {
    const _transaction = transaction as ActiveTransaction<"ReceiverFulfilled">;
    const chainConfig = config.chainConfig[_transaction.crosschainTx.invariant.receivingChainId];
    if (!chainConfig) {
      // this should not happen, this should get checked before this point
      throw new ContractReaderNotAvailableForChain(_transaction.crosschainTx.invariant.sendingChainId, {});
    }
    const receiverReceipt = await txService.getTransactionReceipt(
      _transaction.crosschainTx.invariant.receivingChainId,
      _transaction.payload.receiverFulfilledHash,
    );
    if (receiverReceipt.confirmations < chainConfig.confirmations) {
      logger.info("Waiting for safe confirmations", requestContext, methodContext, {
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
        txHash: _transaction.payload.receiverFulfilledHash,
        txConfirmations: receiverReceipt.confirmations,
        configuredConfirmations: chainConfig.confirmations,
      });
      return;
    }

    const fulfillPayload: FulfillPayload = _transaction.payload;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info("Fulfilling sender", requestContext, methodContext);
      const receipt = await fulfill(
        _transaction.crosschainTx.invariant,
        {
          amount: _transaction.crosschainTx.sending.amount,
          expiry: _transaction.crosschainTx.sending.expiry,
          preparedBlockNumber: _transaction.crosschainTx.sending.preparedBlockNumber,
          signature: fulfillPayload.signature,
          callData: fulfillPayload.callData,
          relayerFee: fulfillPayload.relayerFee,
          side: "sender",
        },
        requestContext,
      );
      logger.info("Fulfilled sender", requestContext, methodContext, { txHash: receipt?.transactionHash });
    } catch (err) {
      const jsonErr = jsonifyError(err);
      if (safeJsonStringify(jsonErr).includes("#F:019")) {
        logger.warn("Sender already fulfilled", requestContext, methodContext, { error: jsonErr });
      } else {
        logger.error("Error fulfilling sender", requestContext, methodContext, jsonErr, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverExpired) {
    const requestContext = createRequestContext(
      "ContractReader => ReceiverExpired",
      transaction.crosschainTx.invariant.transactionId,
    );
    const _transaction = transaction as ActiveTransaction<"ReceiverExpired">;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info("Cancelling expired receiver", requestContext, methodContext);
      const receipt = await cancel(
        _transaction.crosschainTx.invariant,
        {
          amount: _transaction.crosschainTx.receiving!.amount,
          expiry: _transaction.crosschainTx.receiving!.expiry,
          preparedBlockNumber: _transaction.crosschainTx.receiving!.preparedBlockNumber,
          side: "receiver",
        },
        requestContext,
      );
      logger.info("Cancelled receiver", requestContext, methodContext, {
        txHash: receipt?.transactionHash,
      });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling receiver", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.receivingChainId,
        });
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.SenderExpired) {
    const requestContext = createRequestContext(
      "ContractReader => SenderExpired",
      transaction.crosschainTx.invariant.transactionId,
    );
    const _transaction = transaction as ActiveTransaction<"SenderExpired">;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info("Cancelling expired sender", requestContext, methodContext);
      const receipt = await cancel(
        _transaction.crosschainTx.invariant,
        {
          amount: _transaction.crosschainTx.sending.amount,
          expiry: _transaction.crosschainTx.sending.expiry,
          preparedBlockNumber: _transaction.crosschainTx.sending.preparedBlockNumber,
          side: "sender",
        },
        requestContext,
      );
      logger.info("Cancelled sender", requestContext, methodContext, { txHash: receipt?.transactionHash });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling sender", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }

    // If sender is cancelled, receiver should already be expired. If we do
    // not cancel here that is *ok* because it would have been caught earlier
    // when we cancel the receiving chain side (via enforcement)
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverCancelled) {
    const _transaction = transaction as ActiveTransaction<"ReceiverCancelled">;
    // if receiver is cancelled, cancel the sender as well
    const requestContext = createRequestContext(
      "ContractReader => ReceiverCancelled",
      transaction.crosschainTx.invariant.transactionId,
    );
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info("Cancelling sender after receiver cancelled", requestContext, methodContext);
      const receipt = await cancel(
        _transaction.crosschainTx.invariant,
        {
          amount: _transaction.crosschainTx.sending.amount,
          expiry: _transaction.crosschainTx.sending.expiry,
          preparedBlockNumber: _transaction.crosschainTx.sending.preparedBlockNumber,
          side: "sender",
        },
        requestContext,
      );
      logger.info("Cancelled sender", requestContext, methodContext, { txHash: receipt?.transactionHash });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling sender", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverNotConfigured) {
    // TODO: What about config changes here? Is that a concern?
    // I.e. router adds + removes a chain. They have prepared on
    // both sides before removing. This would cancel the sender side
    // automatically, without checking against the receiving
    // prepared-ness
    const _transaction = transaction as ActiveTransaction<"ReceiverNotConfigured">;
    // if receiver is not configured, cancel the sender
    const requestContext = createRequestContext(
      "ContractReader => ReceiverNotConfigured",
      transaction.crosschainTx.invariant.transactionId,
    );
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info("Cancelling sender because receiver is not configured", requestContext, methodContext);
      const receipt = await cancel(
        _transaction.crosschainTx.invariant,
        {
          amount: _transaction.crosschainTx.sending.amount,
          expiry: _transaction.crosschainTx.sending.expiry,
          preparedBlockNumber: _transaction.crosschainTx.sending.preparedBlockNumber,
          side: "sender",
        },
        requestContext,
      );
      logger.info("Cancelled sender", requestContext, methodContext, { txHash: receipt?.transactionHash });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling sender", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.Unsynced) {
    // TODO: what to do with unsynced transactions :thinking:
    // OPTION A:
    // - ignore transaction until subgraph is synced

    // OPTION B:
    // - if sender && receiver chain are unsynced, do nothing
    // - if receiver chain is unsynced:
    //    - sender tx is prepared, receiver tx does not exist: check chain &&
    //      cancel tx
    //    - sender tx is prepared, receiver tx prepared: nothing
    //    - sender tx is prepared, receiver tx cancelled: cancel sender
    //    - sender tx is prepared, receiver tx fulfilled: fulfill sender
    //    - sender tx is cancelled, receiver tx should be cancelled
    //    - sender tx is fulfilled, shouldnt appear
    // - if sender chain is unsynced:
    //    - receiver tx does not exist, cancel tx
    //    - receiver tx is prepared, do nothing
    //    - receiver tx is fulfilled, check chain && fulfill sender
    //    - receiver tx is cancelled, check chain && cancel sender
    // NOTE: must check chain on sender side to avoid duplicate tx sends
    // or incorrectly advancing state

    //
    const { senderChain, receiverChain } = (transaction as ActiveTransaction<"Unsynced">).payload;
    logger.info("Transaction subgraphs unsynced", requestContext, methodContext, {
      sendingSync: senderChain,
      receivingSync: receiverChain,
    });

    if (!senderChain.synced && !receiverChain.synced) {
      // TODO: could check chain here, how important is that?
      logger.warn("Both transaction subgraphs unsynced, doing nothing", requestContext, methodContext);
      return;
    }

    if (senderChain.synced) {
      // Receiver chain is unsynced
      // Get receiving chain hash
      // TODO: ^^ should happen in poller? will *slam* providers if subgraph is
      // down
      // If hash is empty, cancel sender tx
      // If hash is prepared, do nothing
      // If hash is or completed (cancelled/fulfilled), copy action to sender tx
      // NOTE: no difference in variant hash from cancelled or fulfilled,
      // have to determine the proper action to take from the presence of a
      // fulfill or cancel hash on the sender side subgraph.
    }

    if (receiverChain.synced) {
      // Sending chain is unsynced
      // Get receiving chain hash + sending chain hash
      // TODO: ^^ should happen in poller? will *slam* providers if subgraph is
      // down
      // If sender tx is completed, mirror the action to the receiver chain
      // NOTE: no difference in variant hash from cancelled or fulfilled,
      // have to determine the proper action to take from the presence of a
      // fulfill or cancel hash on the sender side subgraph.
    }
  }
};
