import { getUuid, InvariantTransactionData, VariantTransactionData } from "@connext/nxtp-utils";
import { BigNumber, constants, logger } from "ethers/lib/ethers";

import { getContext } from "../../router";
import { ContractReaderNotAvailableForChain } from "../../lib/errors";
import {
  ActiveTransaction,
  SingleChainTransaction,
  CrosschainTransactionStatus,
  CancelPayload,
  FulfillPayload,
  PreparePayload,
} from "../../lib/entities";

import { TransactionStatus as SdkTransactionStatus } from "./graphqlsdk";

import { getSdks } from ".";

export const getActiveTransactions = async (): Promise<ActiveTransaction<any>[]> => {
  // get global context
  const { wallet, logger } = getContext();
  const routerAddress = wallet.address;

  // get local context
  const sdks = getSdks();
  const allChains = await Promise.all(
    Object.entries(sdks).map(async ([cId, sdk]) => {
      const chainId = parseInt(cId);
      // get all sender prepared txs
      const allSenderPrepared = await sdk.GetSenderTransactions({
        routerId: routerAddress.toLowerCase(),
        sendingChainId: chainId,
        status: SdkTransactionStatus.Prepared,
      });

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
      let allSenderPreparedTx = allSenderPrepared.router?.transactions ?? [];
      const queries = await Promise.all(
        Object.entries(receivingChains).map(async ([cId, txIds]) => {
          const _sdk = sdks[Number(cId)];
          if (!_sdk) {
            logger.error({ cId }, "No contract reader available for receiver chain, filtering txs");
            // filter all txs where no contract reader on receiver side
            allSenderPreparedTx = allSenderPreparedTx.filter((tx) => tx.receivingChainId !== cId);
          }
          const query = await _sdk.GetTransactions({ transactionIds: txIds.map((t) => t.toLowerCase()) });
          return query.transactions;
        }),
      );
      const correspondingReceiverTxs = queries.flat();

      // foreach sender prepared check if corresponding receiver exists
      // if it does not, call the handleSenderPrepare handler
      // if it is fulfilled, call the handleReceiverFulfill handler
      // if it is cancelled, call the handlerReceiverCancel handler
      const txs =
        allSenderPreparedTx.map((senderTx): ActiveTransaction<any> | undefined => {
          const invariant: InvariantTransactionData = {
            receivingChainTxManagerAddress: senderTx.receivingChainTxManagerAddress,
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
              payload: {
                bidSignature: senderTx.bidSignature,
                encodedBid: senderTx.encodedBid,
                encryptedCallData: senderTx.encryptedCallData,
              } as PreparePayload,
              status: CrosschainTransactionStatus.SenderPrepared,
            };
          }

          // we have a receiver tx at this point
          const receiving: VariantTransactionData = {
            amount: corresponding.amount,
            expiry: Number(corresponding.expiry),
            preparedBlockNumber: Number(corresponding.preparedBlockNumber),
          };
          if (corresponding.status === SdkTransactionStatus.Fulfilled) {
            // check if expired on the receiver side
            if (receiving.expiry < Date.now() / 1000) {
              // receiver expired
              return {
                crosschainTx: {
                  invariant,
                  sending,
                  receiving,
                },
                payload: {
                  signature: corresponding.signature,
                  relayerFee: corresponding.relayerFee,
                  callData: corresponding.callData!,
                } as FulfillPayload,
                status: CrosschainTransactionStatus.ReceiverExpired,
              };
            }
            // receiver fulfilled
            return {
              crosschainTx: {
                invariant,
                sending,
                receiving,
              },
              payload: {
                signature: corresponding.signature,
                relayerFee: corresponding.relayerFee,
                callData: corresponding.callData!,
              } as FulfillPayload,
              status: CrosschainTransactionStatus.ReceiverFulfilled,
            };
          }
          if (corresponding.status === SdkTransactionStatus.Cancelled) {
            // receiver cancelled
            return {
              crosschainTx: {
                invariant,
                sending,
                receiving,
              },
              payload: {} as CancelPayload,
              status: CrosschainTransactionStatus.ReceiverCancelled,
            };
          }
          return undefined;
        }) ?? [];
      const filterUndefined = txs.filter((x) => !!x) as ActiveTransaction<any>[];
      return filterUndefined;
    }),
  );
  const flattened = allChains.filter((x) => !!x).flat();
  return flattened;
};

/**
 *
 * Retrieves a transaction with a given transactionId-user combination on the provided chain.
 *
 * @param transactionId - Unique identifier for transaction
 * @param user - User of transaction (identifiers are unique for each user)
 * @param chainId - The chain you are looking for the transaction on
 * @returns The transaction status, data, user encrypted calldata, encoded winning auction bid, signature on winning auction bid, signature to complete transaction (if completed), and relayer fee (if completed).
 *
 * @remarks
 * The `signature` and `relayerFee` can exist when the transaction is fulfilled or when the transaction was completed by a relayer (user is completing it on the sending-side chain).
 */
export const getTransactionForChain = async (
  transactionId: string,
  user: string,
  chainId: number,
): Promise<SingleChainTransaction | undefined> => {
  const method = "getTransactionForChain";
  const methodId = getUuid();

  const { wallet } = getContext();
  const routerAddress = wallet.address;

  const sdks = getSdks();
  const sdk = sdks[chainId];
  if (!sdk) {
    throw new ContractReaderNotAvailableForChain(chainId, { method, methodId });
  }
  const tx = await sdk.GetTransaction({
    transactionId: `${transactionId.toLowerCase()}-${user.toLowerCase()}-${routerAddress.toLowerCase()}`,
  });

  if (!tx.transaction) {
    return undefined;
  }

  const transaction = tx.transaction;

  return transaction
    ? {
        status: transaction.status,
        txData: {
          receivingChainTxManagerAddress: transaction.receivingChainTxManagerAddress,
          user: transaction.user.id,
          router: transaction.router.id,
          sendingAssetId: transaction.sendingAssetId,
          receivingAssetId: transaction.receivingAssetId,
          sendingChainFallback: transaction.sendingChainFallback,
          callTo: transaction.callTo,
          receivingAddress: transaction.receivingAddress,
          callDataHash: transaction.callDataHash,
          transactionId: transaction.transactionId,
          sendingChainId: Number(transaction.sendingChainId),
          receivingChainId: Number(transaction.receivingChainId),
          amount: transaction.amount,
          expiry: Number(transaction.expiry),
          preparedBlockNumber: Number(transaction.preparedBlockNumber),
        },
        encryptedCallData: transaction.encryptedCallData,
        encodedBid: transaction.encodedBid,
        bidSignature: transaction.bidSignature,
        signature: transaction.signature,
        relayerFee: transaction.relayerFee,
      }
    : undefined;
};

export const getAssetBalance = async (assetId: string, chainId: number): Promise<BigNumber> => {
  const method = "getAssetBalance";
  const methodId = getUuid();
  const { wallet } = getContext();
  const sdks = getSdks();
  const sdk = sdks[chainId];

  if (!sdk) {
    throw new ContractReaderNotAvailableForChain(chainId, { method, methodId });
  }

  const assetBalanceId = `${assetId.toLowerCase()}-${wallet.address.toLowerCase()}`;
  const bal = await sdk.GetAssetBalance({ assetBalanceId });
  return bal.assetBalance?.amount ? BigNumber.from(bal.assetBalance?.amount) : constants.Zero;
};
