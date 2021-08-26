import { createRequestContext, delay, getUuid, jsonifyError, safeJsonStringify } from "@connext/nxtp-utils";

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
  setInterval(async () => {
    let transactions: ActiveTransaction<any>[] = [];
    try {
      transactions = await contractReader.getActiveTransactions();
      if (transactions.length > 0) {
        logger.info({ transactions: transactions.length }, "Got active transactions");
        logger.debug({ transactions }, "Got active transactions");
      }
    } catch (err) {
      logger.error({ err: jsonifyError(err) }, "Error getting active txs");
    }
    await handleActiveTransactions(transactions);
  }, getLoopInterval());
};

export const handleActiveTransactions = async (transactions: ActiveTransaction<any>[]) => {
  const { logger } = getContext();
  for (const transaction of transactions) {
    if (handlingTracker.get(transaction.crosschainTx.invariant.transactionId) === transaction.status) {
      logger.info({ transactionId: transaction.crosschainTx.invariant.transactionId }, `Already handling transaction`);
      continue;
    }
    handleSingle(transaction);
    await delay(750); // delay here to not flood the provider
  }
};

export const handleSingle = async (transaction: ActiveTransaction<any>): Promise<void> => {
  const method = "handleActiveTransactions";
  const methodId = getUuid();
  const { logger, txService, config } = getContext();
  const { prepare, cancel, fulfill } = getOperations();

  if (transaction.status === CrosschainTransactionStatus.SenderPrepared) {
    const requestContext = createRequestContext("ContractReader => SenderPrepared");
    const _transaction = transaction as ActiveTransaction<"SenderPrepared">;
    const chainConfig = config.chainConfig[_transaction.crosschainTx.invariant.sendingChainId];
    if (!chainConfig) {
      // this should not happen, this should get checked before this point
      throw new ContractReaderNotAvailableForChain(_transaction.crosschainTx.invariant.sendingChainId, {
        method,
        methodId,
      });
    }
    const senderReceipt = await txService.getTransactionReceipt(
      _transaction.crosschainTx.invariant.sendingChainId,
      _transaction.payload.senderPreparedHash,
    );
    if (senderReceipt.confirmations < chainConfig.confirmations) {
      logger.info(
        {
          requestContext,
          method,
          methodId,
          txConfirmations: senderReceipt.confirmations,
          configuredConfirmations: chainConfig.confirmations,
          chainId: _transaction.crosschainTx.invariant.sendingChainId,
          txHash: _transaction.payload.senderPreparedHash,
        },
        "Waiting for safe confirmations",
      );
      return;
    }
    const preparePayload: PreparePayload = _transaction.payload;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info({ requestContext }, "Preparing receiver");
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
      logger.info({ requestContext, txHash: receipt?.transactionHash }, "Prepared receiver");
    } catch (err) {
      if (safeJsonStringify(jsonifyError(err)).includes("#P:015")) {
        logger.warn({ requestContext, err: err.message }, "Receiver transaction already prepared");
      } else {
        logger.error({ err: jsonifyError(err), requestContext }, "Error preparing receiver");
      }
      if (err.cancellable === true) {
        logger.error({ requestContext }, "Cancellable validation error, cancelling");
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
          logger.info({ requestContext, txHash: cancelRes?.transactionHash }, "Cancelled transaction");
        } catch (err) {
          if (safeJsonStringify(jsonifyError(err)).includes("#C:019")) {
            logger.warn(
              {
                requestContext,
                transaction: _transaction.crosschainTx.invariant.transactionId,
              },
              "Already cancelled",
            );
          } else {
            logger.error({ err: jsonifyError(err), requestContext }, "Error cancelling receiver");
          }
        }
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverFulfilled) {
    const requestContext = createRequestContext("ContractReader => ReceiverFulfilled");
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
      logger.info(
        {
          requestContext,
          method,
          methodId,
          chainId: _transaction.crosschainTx.invariant.receivingChainId,
          txHash: _transaction.payload.receiverFulfilledHash,
          txConfirmations: receiverReceipt.confirmations,
          configuredConfirmations: chainConfig.confirmations,
        },
        "Waiting for safe confirmations",
      );
      return;
    }

    const fulfillPayload: FulfillPayload = _transaction.payload;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info({ requestContext }, "Fulfilling sender");
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
      logger.info({ requestContext, txHash: receipt?.transactionHash }, "Fulfilled sender");
    } catch (err) {
      if (safeJsonStringify(jsonifyError(err)).includes("#F:019")) {
        logger.warn({ requestContext, err: err.message }, "Sender alredy fulfilled");
      } else {
        logger.error({ err: jsonifyError(err), requestContext }, "Error fulfilling sender");
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverExpired) {
    const requestContext = createRequestContext("ContractReader => ReceiverExpired");
    const _transaction = transaction as ActiveTransaction<"ReceiverExpired">;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info(
        { requestContext, transactionId: transaction.crosschainTx.invariant.transactionId },
        "Cancelling expired receiver",
      );
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
      logger.info({ requestContext, txHash: receipt?.transactionHash }, "Cancelled receiver");
    } catch (err) {
      if (safeJsonStringify(jsonifyError(err)).includes("#C:019")) {
        logger.warn(
          {
            requestContext,
            transaction: _transaction.crosschainTx.invariant.transactionId,
          },
          "Already cancelled",
        );
      } else {
        logger.error({ err: jsonifyError(err), requestContext }, "Error cancelling receiver");
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.SenderExpired) {
    const requestContext = createRequestContext("ContractReader => SenderExpired");
    const _transaction = transaction as ActiveTransaction<"SenderExpired">;
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info(
        { requestContext, transactionId: _transaction.crosschainTx.invariant.transactionId },
        "Cancelling expired sender",
      );
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
      logger.info({ requestContext, txHash: receipt?.transactionHash }, "Cancelled sender");
    } catch (err) {
      if (safeJsonStringify(jsonifyError(err)).includes("#C:019")) {
        logger.warn(
          {
            requestContext,
            transaction: _transaction.crosschainTx.invariant.transactionId,
          },
          "Already cancelled",
        );
      } else {
        logger.error({ err: jsonifyError(err), requestContext }, "Error cancelling sender");
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
    const requestContext = createRequestContext("ContractReader => ReceiverCancelled");
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info(
        { requestContext, transactionId: _transaction.crosschainTx.invariant.transactionId },
        "Cancelling sender after receiver cancelled",
      );
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
      logger.info({ requestContext, txHash: receipt?.transactionHash }, "Cancelled sender");
    } catch (err) {
      if (safeJsonStringify(jsonifyError(err)).includes("#C:019")) {
        logger.warn(
          {
            requestContext,
            transaction: _transaction.crosschainTx.invariant.transactionId,
          },
          "Already cancelled",
        );
      } else {
        logger.error({ err: jsonifyError(err), requestContext }, "Error cancelling sender");
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverNotConfigured) {
    const _transaction = transaction as ActiveTransaction<"ReceiverNotConfigured">;
    // if receiver is not configured, cancel the sender
    const requestContext = createRequestContext("ContractReader => ReceiverNotConfigured");
    try {
      handlingTracker.set(_transaction.crosschainTx.invariant.transactionId, _transaction.status);
      logger.info(
        { requestContext, transactionId: _transaction.crosschainTx.invariant.transactionId },
        "Cancelling sender because receiver is not configured",
      );
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
      logger.info({ requestContext, txHash: receipt?.transactionHash }, "Cancelled sender");
    } catch (err) {
      if (safeJsonStringify(jsonifyError(err)).includes("#C:019")) {
        logger.warn(
          {
            requestContext,
            transaction: _transaction.crosschainTx.invariant.transactionId,
          },
          "Already cancelled",
        );
      } else {
        logger.error({ err: jsonifyError(err), requestContext }, "Error cancelling sender");
      }
    } finally {
      handlingTracker.delete(_transaction.crosschainTx.invariant.transactionId);
    }
  }
};
