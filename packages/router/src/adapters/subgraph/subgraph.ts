import {
  createLoggingContext,
  CrosschainTransaction,
  getNtpTimeSeconds,
  getUuid,
  jsonifyError,
  RequestContext,
  SubgraphSyncRecord,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers/lib/ethers";

import { getContext } from "../../router";
import { ContractReaderNotAvailableForChain, NoChainConfig } from "../../lib/errors";
import {
  ActiveTransaction,
  SingleChainTransaction,
  CrosschainTransactionStatus,
  CancelPayload,
} from "../../lib/entities";

import {
  GetAssetBalanceQuery,
  GetReceiverTransactionsQuery,
  GetSenderTransactionsQuery,
  GetTransactionQuery,
  GetTransactionsQuery,
  TransactionStatus as SdkTransactionStatus,
} from "./graphqlsdk";

import { getSdks } from ".";

const synced: Record<number, SubgraphSyncRecord[]> = {};

export const getSyncRecord = async (
  chainId: number,
  _requestContext?: RequestContext,
): Promise<SubgraphSyncRecord[]> => {
  const { requestContext } = createLoggingContext(getSyncRecord.name, _requestContext);

  const records = synced[chainId];
  return records ?? (await setSyncRecord(chainId, requestContext));
};

export const sdkSenderTransactionToCrosschainTransaction = (sdkSendingTransaction: any): CrosschainTransaction => {
  return {
    invariant: {
      receivingChainTxManagerAddress: sdkSendingTransaction.receivingChainTxManagerAddress,
      user: sdkSendingTransaction.user.id,
      initiator: sdkSendingTransaction.initiator,
      router: sdkSendingTransaction.router.id,
      sendingAssetId: sdkSendingTransaction.sendingAssetId,
      sendingChainId: Number(sdkSendingTransaction.sendingChainId),
      sendingChainFallback: sdkSendingTransaction.sendingChainFallback,
      receivingChainId: Number(sdkSendingTransaction.receivingChainId),
      receivingAssetId: sdkSendingTransaction.receivingAssetId,
      receivingAddress: sdkSendingTransaction.receivingAddress,
      callTo: sdkSendingTransaction.callTo,
      callDataHash: sdkSendingTransaction.callDataHash,
      transactionId: sdkSendingTransaction.transactionId,
    },
    sending: {
      amount: sdkSendingTransaction.amount,
      expiry: Number(sdkSendingTransaction.expiry),
      preparedBlockNumber: Number(sdkSendingTransaction.preparedBlockNumber),
    },
  };
};

const setSyncRecord = async (chainId: number, requestContext: RequestContext): Promise<SubgraphSyncRecord[]> => {
  // get global context
  const { logger, txService, config } = getContext();

  const { methodContext } = createLoggingContext("setSyncRecord", requestContext);
  let records: SubgraphSyncRecord[] = [{ synced: false, latestBlock: -1, syncedBlock: -1, lag: -1, uri: "" }];
  try {
    const sdks = getSdks();
    const sdk = sdks[chainId];

    const chainConfig = config.chainConfig[chainId];
    if (!chainConfig || !sdk) {
      throw new NoChainConfig(chainId, { requestContext, methodContext, sdk: !!sdk });
    }

    const latestBlock = await txService.getBlockNumber(chainId);
    records = await sdk.sync(latestBlock);
    logger.debug(`Retrieved sync records for chain ${chainId}`, requestContext, methodContext, {
      chainId,
      latestBlock,
      records: records.map((r) => ({ synced: r.synced, lag: r.lag, syncedBlock: r.syncedBlock, uri: r.uri })),
    });
  } catch (e) {
    logger.error(`Error getting sync records for chain ${chainId}`, requestContext, methodContext, jsonifyError(e), {
      chainId,
    });
  }
  return records;
};

export const getActiveTransactions = async (_requestContext?: RequestContext): Promise<ActiveTransaction<any>[]> => {
  // get global context
  const { wallet, logger, config } = getContext();

  const { requestContext, methodContext } = createLoggingContext(getActiveTransactions.name, _requestContext);

  const routerAddress = wallet.address;

  // get local context
  const sdks = getSdks();
  const allChains = await Promise.all(
    Object.entries(sdks).map(async ([cId, sdk]) => {
      const chainId = parseInt(cId);

      const chainConfig = config.chainConfig[chainId];
      if (!chainConfig) {
        throw new NoChainConfig(chainId);
      }

      // update synced status
      const records = await setSyncRecord(chainId, requestContext);
      if (records.every((r) => !r.synced)) {
        logger.warn(
          `All subgraphs out of sync! Cannot get active transactions for chain ${cId}`,
          requestContext,
          methodContext,
          {
            chainId: cId,
            records: records.map((r) => ({ synced: r.synced, lag: r.lag, syncedBlock: r.syncedBlock, uri: r.uri })),
          },
        );
        return;
      }

      // get all receiver expired txs
      const allReceiverExpired = await sdk.useSynced<GetReceiverTransactionsQuery>((client) =>
        client.GetReceiverTransactions({
          routerId: routerAddress.toLowerCase(),
          receivingChainId: chainId,
          status: SdkTransactionStatus.Prepared,
          expiry_lt: Math.floor(Date.now() / 1000),
        }),
      );

      logger.debug("Got receiver expired", requestContext, methodContext, {
        chainId,
        allReceiverExpired: jsonifyError(allReceiverExpired as any),
      });

      // get all sender prepared txs
      const allSenderPrepared = await sdk.useSynced<GetSenderTransactionsQuery>((client) =>
        client.GetSenderTransactions({
          routerId: routerAddress.toLowerCase(),
          sendingChainId: chainId,
          status: SdkTransactionStatus.Prepared,
        }),
      );

      // create list of txIds for each receiving chain
      const receivingChains: Record<string, string[]> = {};
      const toCancel: any[] = []; // i hate these types!!
      allSenderPrepared.router?.transactions.forEach((senderTx) => {
        const _sdk = sdks[Number(senderTx.receivingChainId)];
        if (!_sdk) {
          // if receiving SDK doesnt exist, cancel all the txs
          logger.warn(
            "No contract reader available for receiver chain, marking sender tx for cancellation",
            { ...requestContext, transactionId: senderTx.transactionId } as RequestContext<string>,
            methodContext,
            { sendingChain: senderTx.chainId, receivingChain: senderTx.receivingChainId },
          );
          toCancel.push(senderTx);
        }
        if (receivingChains[senderTx.receivingChainId]) {
          receivingChains[senderTx.receivingChainId].push(senderTx.transactionId);
        } else {
          receivingChains[senderTx.receivingChainId] = [senderTx.transactionId];
        }
      });

      const receiverNotConfigured = toCancel.map((senderTx) => {
        return {
          crosschainTx: sdkSenderTransactionToCrosschainTransaction(senderTx),
          payload: {},
          status: CrosschainTransactionStatus.ReceiverNotConfigured,
        } as ActiveTransaction<"ReceiverNotConfigured">;
      });

      // get time to use for loop
      const currentTime = await getNtpTimeSeconds();

      // get all existing txs corresponding to all the sender prepared txs by id
      let allSenderPreparedTx = allSenderPrepared.router?.transactions ?? [];
      const queries = await Promise.all(
        Object.entries(receivingChains).map(async ([cId, txIds]) => {
          const _sdk = sdks[Number(cId)];
          if (!_sdk) {
            logger.warn(
              "No contract reader available for receiver chain, filtering txs",
              requestContext,
              methodContext,
              { receivingChain: cId },
            );
            // filter all txs where no contract reader on receiver side and not expired yet
            // if its expired on sender side, we can still cancel it, it will be marked for cancellation later
            allSenderPreparedTx = allSenderPreparedTx.filter(
              (tx) => tx.receivingChainId !== cId && currentTime > tx.expiry,
            );
            return [];
          }
          const query = await _sdk.useSynced<GetTransactionsQuery>((client) =>
            client.GetTransactions({ transactionIds: txIds.map((t) => t.toLowerCase()) }),
          );
          return query.transactions;
        }),
      );
      const correspondingReceiverTxs = queries.flat();

      allReceiverExpired.router?.transactions.forEach((receiverTx) => {
        const tx = correspondingReceiverTxs.find((tx) => tx.transactionId === receiverTx.transactionId);
        if (tx) {
          return;
        }
        correspondingReceiverTxs.push(receiverTx);
      });

      // foreach sender prepared check if corresponding receiver exists
      // if it does not, call the handleSenderPrepare handler
      // if it is fulfilled, call the handleReceiverFulfill handler
      // if it is cancelled, call the handlerReceiverCancel handler
      const txs =
        allSenderPreparedTx.map((senderTx): ActiveTransaction<any> | undefined => {
          const { invariant, sending } = sdkSenderTransactionToCrosschainTransaction(senderTx);

          const correspondingReceiverTx = correspondingReceiverTxs.find(
            (receiverTx) => senderTx.transactionId === receiverTx.transactionId,
          );

          const receiving: VariantTransactionData | undefined = correspondingReceiverTx
            ? {
                amount: correspondingReceiverTx.amount,
                expiry: Number(correspondingReceiverTx.expiry),
                preparedBlockNumber: Number(correspondingReceiverTx.preparedBlockNumber),
              }
            : undefined;

          if (currentTime > senderTx.expiry) {
            // sender expired takes precedence over receiver expired
            return {
              crosschainTx: {
                invariant,
                sending,
                receiving,
              },
              payload: {},
              status: CrosschainTransactionStatus.SenderExpired,
            } as ActiveTransaction<"SenderExpired">;
          }

          if (!receiving) {
            // if not synced, cancel
            const receiverSynced = getSyncRecord(invariant.receivingChainId);
            if (!receiverSynced) {
              return {
                crosschainTx: sdkSenderTransactionToCrosschainTransaction(senderTx),
                payload: {},
                status: CrosschainTransactionStatus.ReceiverNotConfigured,
              } as ActiveTransaction<"ReceiverNotConfigured">;
            }
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
                senderPreparedHash: senderTx.prepareTransactionHash,
              },
              status: CrosschainTransactionStatus.SenderPrepared,
            } as ActiveTransaction<"SenderPrepared">;
          }

          // we have a receiver tx at this point
          // if expired, return
          if (currentTime > receiving.expiry && correspondingReceiverTx?.status === SdkTransactionStatus.Prepared) {
            return {
              crosschainTx: {
                invariant,
                sending,
                receiving,
              },
              payload: {},
              status: CrosschainTransactionStatus.ReceiverExpired,
            } as ActiveTransaction<"ReceiverExpired">;
          }

          if (correspondingReceiverTx?.status === SdkTransactionStatus.Fulfilled) {
            // receiver fulfilled
            return {
              crosschainTx: {
                invariant,
                sending,
                receiving,
              },
              payload: {
                signature: correspondingReceiverTx.signature,
                relayerFee: correspondingReceiverTx.relayerFee,
                callData: correspondingReceiverTx.callData!,
                receiverFulfilledHash: correspondingReceiverTx.fulfillTransactionHash,
              },
              status: CrosschainTransactionStatus.ReceiverFulfilled,
            } as ActiveTransaction<"ReceiverFulfilled">;
          }
          if (correspondingReceiverTx?.status === SdkTransactionStatus.Cancelled) {
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
      return filterUndefined.concat(receiverNotConfigured);
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
  const tx = await sdk.useSynced<GetTransactionQuery>((client) =>
    client.GetTransaction({
      transactionId: `${transactionId.toLowerCase()}-${user.toLowerCase()}-${routerAddress.toLowerCase()}`,
    }),
  );

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
          initiator: transaction.initiator,
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
  const bal = await sdk.useSynced<GetAssetBalanceQuery>((client) => client.GetAssetBalance({ assetBalanceId }));
  return bal.assetBalance?.amount ? BigNumber.from(bal.assetBalance?.amount) : constants.Zero;
};
