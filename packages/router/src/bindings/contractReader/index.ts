import {
  createLoggingContext,
  createRequestContext,
  delay,
  jsonifyError,
  RequestContextWithTransactionId,
  safeJsonStringify,
} from "@connext/nxtp-utils";

import { BigNumber } from "@ethersproject/bignumber";

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
import {
  attemptedTransfer,
  completedTransfer,
  feesCollected,
  gasConsumed,
  receiverCancelled,
  receiverExpired,
  receiverFailedCancel,
  receiverFailedExpired,
  receiverFailedPrepare,
  receiverPrepared,
  senderCancelled,
  senderExpired,
  senderFailedCancel,
  senderFailedExpired,
  senderFailedFulfill,
  senderFulfilled,
  totalTransferredVolume,
} from "../metrics";

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
        logger.debug("Got active transactions", requestContext, methodContext, {
          transactions: transactions,
          handlingTracker: [...handlingTracker],
        });
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
    if (handlingTracker.has(transaction.crosschainTx.invariant.transactionId)) {
      logger.info("Already handling transaction", requestContext, methodContext);
      continue;
    }
    handlingTracker.set(transaction.crosschainTx.invariant.transactionId, transaction.status);
    handleSingle(transaction, requestContext).finally(() =>
      handlingTracker.delete(transaction.crosschainTx.invariant.transactionId),
    );
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
    if ((senderReceipt?.confirmations ?? 0) < chainConfig.confirmations) {
      logger.info("Waiting for safe confirmations", requestContext, methodContext, {
        txConfirmations: senderReceipt?.confirmations ?? 0,
        configuredConfirmations: chainConfig.confirmations,
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
        txHash: _transaction.payload.senderPreparedHash,
      });
      return;
    }
    const preparePayload: PreparePayload = _transaction.payload;
    try {
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
      receiverPrepared.inc({
        assetId: _transaction.crosschainTx.invariant.receivingAssetId,
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
      });
      attemptedTransfer.inc({
        sendingAssetId: _transaction.crosschainTx.invariant.sendingAssetId,
        receivingAssetId: _transaction.crosschainTx.invariant.receivingAssetId,
        sendingChainId: _transaction.crosschainTx.invariant.sendingChainId,
        receivingChainId: _transaction.crosschainTx.invariant.receivingChainId,
      });
      gasConsumed.inc({
        reason: "SENDER PREPARE", // TODO type this?
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
        amount: receipt!.gasUsed.toString(),
      });
    } catch (err) {
      const json = jsonifyError(err);
      if (safeJsonStringify(json).includes("#P:015")) {
        logger.warn("Receiver transaction already prepared", requestContext, methodContext, { error: json });
      } else {
        logger.error("Error preparing receiver", requestContext, methodContext, json, {
          chainId: transaction.crosschainTx.invariant.receivingChainId,
        });
        receiverFailedPrepare.inc({
          assetId: _transaction.crosschainTx.invariant.receivingAssetId,
          chainId: _transaction.crosschainTx.invariant.receivingChainId,
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
          senderCancelled.inc({
            assetId: _transaction.crosschainTx.invariant.sendingAssetId,
            chainId: _transaction.crosschainTx.invariant.sendingChainId,
          });
          gasConsumed.inc({
            reason: "SENDER CANCEL", // TODO type this?
            chainId: _transaction.crosschainTx.invariant.sendingChainId,
            amount: cancelRes!.gasUsed.toString(),
          });
        } catch (cancelErr) {
          const cancelJson = jsonifyError(cancelErr);
          if (safeJsonStringify(jsonifyError(cancelErr)).includes("#C:019")) {
            logger.warn("Already cancelled", requestContext, methodContext, {
              transaction: _transaction.crosschainTx.invariant.transactionId,
              error: cancelJson,
            });
          } else {
            logger.error("Error cancelling sender", requestContext, methodContext, cancelJson, {
              chainId: transaction.crosschainTx.invariant.sendingChainId,
            });
            senderFailedCancel.inc({
              assetId: _transaction.crosschainTx.invariant.sendingAssetId,
              chainId: _transaction.crosschainTx.invariant.sendingChainId,
            });
          }
        }
      }
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
    if ((receiverReceipt?.confirmations ?? 0) < chainConfig.confirmations) {
      logger.info("Waiting for safe confirmations", requestContext, methodContext, {
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
        txHash: _transaction.payload.receiverFulfilledHash,
        txConfirmations: receiverReceipt?.confirmations ?? 0,
        configuredConfirmations: chainConfig.confirmations,
      });
      return;
    }

    const fulfillPayload: FulfillPayload = _transaction.payload;
    try {
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
      senderFulfilled.inc({
        assetId: _transaction.crosschainTx.invariant.sendingAssetId,
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
      });
      completedTransfer.inc({
        sendingAssetId: _transaction.crosschainTx.invariant.sendingAssetId,
        receivingAssetId: _transaction.crosschainTx.invariant.receivingAssetId,
        sendingChainId: _transaction.crosschainTx.invariant.sendingChainId,
        receivingChainId: _transaction.crosschainTx.invariant.receivingChainId,
      });
      totalTransferredVolume.inc({
        assetId: _transaction.crosschainTx.invariant.receivingAssetId,
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
        amount: _transaction.crosschainTx.sending.amount,
      });
      // Add difference between sending and receiving amount
      feesCollected.inc({
        assetId: _transaction.crosschainTx.invariant.receivingAssetId,
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
        amount: BigNumber.from(_transaction.crosschainTx.sending.amount)
          .sub(_transaction.crosschainTx.receiving!.amount)
          .toString(),
      });
      gasConsumed.inc({
        reason: "SENDER FULFILL", // TODO type this?
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
        amount: receipt!.gasUsed.toString(),
      });
    } catch (err) {
      const jsonErr = jsonifyError(err);
      if (safeJsonStringify(jsonErr).includes("#F:019")) {
        logger.warn("Sender already fulfilled", requestContext, methodContext, { error: jsonErr });
      } else {
        logger.error("Error fulfilling sender", requestContext, methodContext, jsonErr, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
        senderFailedFulfill.inc({
          assetId: _transaction.crosschainTx.invariant.sendingAssetId,
          chainId: _transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverExpired) {
    const requestContext = createRequestContext(
      "ContractReader => ReceiverExpired",
      transaction.crosschainTx.invariant.transactionId,
    );
    const _transaction = transaction as ActiveTransaction<"ReceiverExpired">;
    try {
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
      receiverExpired.inc({
        assetId: _transaction.crosschainTx.invariant.receivingAssetId,
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
      });
      gasConsumed.inc({
        reason: "RECEIVER EXPIRED", // TODO type this?
        chainId: _transaction.crosschainTx.invariant.receivingChainId,
        amount: receipt!.gasUsed.toString(),
      });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling receiver", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.receivingChainId,
        });
        receiverFailedExpired.inc({
          assetId: _transaction.crosschainTx.invariant.receivingAssetId,
          chainId: _transaction.crosschainTx.invariant.receivingChainId,
        });
      }
    }
  } else if (transaction.status === CrosschainTransactionStatus.SenderExpired) {
    const requestContext = createRequestContext(
      "ContractReader => SenderExpired",
      transaction.crosschainTx.invariant.transactionId,
    );
    const _transaction = transaction as ActiveTransaction<"SenderExpired">;
    try {
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
      senderExpired.inc({
        assetId: _transaction.crosschainTx.invariant.sendingAssetId,
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
      });
      gasConsumed.inc({
        reason: "SENDER EXPIRED", // TODO type this?
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
        amount: receipt!.gasUsed.toString(),
      });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling sender", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
        senderFailedExpired.inc({
          assetId: _transaction.crosschainTx.invariant.sendingAssetId,
          chainId: _transaction.crosschainTx.invariant.sendingChainId,
        });
      }
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
      senderCancelled.inc({
        assetId: _transaction.crosschainTx.invariant.sendingAssetId,
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
      });
      gasConsumed.inc({
        reason: "SENDER CANCEL", // TODO type this?
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
        amount: receipt!.gasUsed.toString(),
      });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling sender", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
        senderFailedCancel.inc({
          assetId: _transaction.crosschainTx.invariant.sendingAssetId,
          chainId: _transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    }
  } else if (transaction.status === CrosschainTransactionStatus.ReceiverNotConfigured) {
    const _transaction = transaction as ActiveTransaction<"ReceiverNotConfigured">;
    // if receiver is not configured, cancel the sender
    const requestContext = createRequestContext(
      "ContractReader => ReceiverNotConfigured",
      transaction.crosschainTx.invariant.transactionId,
    );
    try {
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
      senderCancelled.inc({
        assetId: _transaction.crosschainTx.invariant.sendingAssetId,
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
      });
      gasConsumed.inc({
        reason: "SENDER CANCEL", // TODO type this?
        chainId: _transaction.crosschainTx.invariant.sendingChainId,
        amount: receipt!.gasUsed.toString(),
      });
    } catch (err) {
      const errJson = jsonifyError(err);
      if (safeJsonStringify(errJson).includes("#C:019")) {
        logger.warn("Already cancelled", requestContext, methodContext, { error: errJson });
      } else {
        logger.error("Error cancelling sender", requestContext, methodContext, errJson, {
          chainId: transaction.crosschainTx.invariant.sendingChainId,
        });
        senderFailedCancel.inc({
          assetId: _transaction.crosschainTx.invariant.sendingAssetId,
          chainId: _transaction.crosschainTx.invariant.sendingChainId,
        });
      }
    }
  }
};
