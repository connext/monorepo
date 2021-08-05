import {
  CrosschainTransaction,
  getUuid,
  InvariantTransactionData,
  jsonifyError,
  VariantTransactionData,
} from "@connext/nxtp-utils";

import { GetSenderTransactionsQuery, TransactionStatus } from "../../graphqlsdk";
import { getContext } from "../..";

import { ActiveTransaction, getSdks, TransactionStatus as CrosschainTxStatus } from ".";

export const getActiveTransactions = async (): Promise<CrosschainTransaction[]> => {
  const method = "getActiveTransactions";
  const methodId = getUuid();

  // get global context
  const { wallet, logger } = getContext();
  const routerAddress = wallet.address;

  // get local context
  const sdks = getSdks();
  Object.entries(sdks).forEach(async ([cId, sdk]) => {
    const chainId = parseInt(cId);
    // get all sender prepared txs
    let allSenderPrepared: GetSenderTransactionsQuery;
    try {
      allSenderPrepared = await sdk.GetSenderTransactions({
        routerId: routerAddress.toLowerCase(),
        sendingChainId: chainId,
        status: TransactionStatus.Prepared,
      });
    } catch (err) {
      logger.error(
        { method, methodId, chainId, error: jsonifyError(err) },
        "Error in sdk.GetSenderTransactions, aborting loop interval",
      );
      return;
    }

    // create list of txIds for each receiving chain
    const receivingChains: Record<string, string[]> = {};
    allSenderPrepared.router?.transactions.forEach(({ transactionId, receivingChainId }) => {
      if (receivingChains[receivingChainId]) {
        receivingChains[receivingChainId].push(transactionId);
      } else {
        receivingChains[receivingChainId] = [transactionId];
      }
    });

    // get all existing txs corresponding to all the sender prepared txs by id
    let correspondingReceiverTxs: any[];
    try {
      const queries = await Promise.all(
        Object.entries(receivingChains).map(async ([cId, txIds]) => {
          const _sdk = sdks[Number(cId)];
          if (!_sdk) {
            logger.error({ chainId: cId, method, methodId }, "No config for chain, this should not happen");
            return [];
          }
          const query = await _sdk.GetTransactions({ transactionIds: txIds.map((t) => t.toLowerCase()) });
          return query.transactions;
        }),
      );
      correspondingReceiverTxs = queries.flat();
    } catch (err) {
      logger.error(
        { method, methodId, error: jsonifyError(err) },
        "Error in sdk.GetTransactions, aborting loop interval",
      );
      return;
    }

    // foreach sender prepared check if corresponding receiver exists
    // if it does not, call the handleSenderPrepare handler
    // if it is fulfilled, call the handleReceiverFulfill handler
    // if it is cancelled, call the handlerReceiverCancel handler
    allSenderPrepared.router?.transactions.map((senderTx): ActiveTransaction => {
      const invariant: InvariantTransactionData = {
        user: senderTx.user.id,
        router: senderTx.router.id,
        sendingAssetId: senderTx.sendingAssetId,
        sendingChainId: Number(senderTx.sendingChainId),
        sendingChainFallback: senderTx.sendingChainFallback,
        receivingChainId: Number(senderTx.receivingChainId),
        receivingAssetId: senderTx.receivingAssetId,
        receivingAddress: senderTx.receivingAddress,
        callTo: senderTx.callTo,
        callDataHash: senderTx.callDataHash,
        transactionId: senderTx.transactionId,
      };

      const sending: VariantTransactionData = {
        amount: senderTx.amount,
        expiry: Number(senderTx.expiry),
        preparedBlockNumber: Number(senderTx.preparedBlockNumber),
      };

      const corresponding = correspondingReceiverTxs.find(
        (receiverTx) => senderTx.transactionId === receiverTx.transactionId,
      );
      if (!corresponding) {
        // sender prepared
        return {
          crosschainTx: {
            invariant,
            sending,
          },
          bidSignature: senderTx.bidSignature,
          encodedBid: senderTx.encodedBid,
          encryptedCallData: senderTx.encryptedCallData,
          status: CrosschainTxStatus.SenderPrepared,
        };
      }

      // we have a receiver tx at this point
      const receiving: VariantTransactionData = {
        amount: corresponding.amount,
        expiry: Number(corresponding.expiry),
        preparedBlockNumber: Number(corresponding.preparedBlockNumber),
      };
      if (corresponding.status === TransactionStatus.Fulfilled) {
        // receiver fulfilled
        return {
          crosschainTx: {
            invariant,
            sending,
            receiving,
          },
          bidSignature: senderTx.bidSignature,
          encodedBid: senderTx.encodedBid,
          encryptedCallData: senderTx.encryptedCallData,
          status: CrosschainTxStatus.ReceiverFulfilled,
        };
      } else if (corresponding.status === TransactionStatus.Cancelled) {
        // receiver fulfilled
        return {
          crosschainTx: {
            invariant,
            sending,
            receiving,
          },
          bidSignature: senderTx.bidSignature,
          encodedBid: senderTx.encodedBid,
          encryptedCallData: senderTx.encryptedCallData,
          status: CrosschainTxStatus.ReceiverCancelled,
        };
      }
    });
  });
};
