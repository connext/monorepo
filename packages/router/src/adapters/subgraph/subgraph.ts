import {
  createLoggingContext,
  CrosschainTransaction,
  getNtpTimeSeconds,
  getUuid,
  jsonifyError,
  RequestContext,
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
  SubgraphSyncRecord,
} from "../../lib/entities";
import { DuplicateTransactionIds } from "../../lib/errors/contractReader";

import { TransactionStatus as SdkTransactionStatus } from "./graphqlsdk";

import { getSdks } from ".";

const synced: Record<number, SubgraphSyncRecord> = {};

export const getSyncRecord = async (chainId: number, _requestContext?: RequestContext): Promise<SubgraphSyncRecord> => {
  const { requestContext } = createLoggingContext(getSyncRecord.name, _requestContext);

  const record = synced[chainId];
  return record ?? (await setSyncRecord(chainId, requestContext));
};

export const sdkSenderTransactionToCrosschainTransaction = (sdkSendingTransaction: any): CrosschainTransaction => {
  return {
    invariant: {
      receivingChainTxManagerAddress: sdkSendingTransaction.receivingChainTxManagerAddress,
      user: sdkSendingTransaction.user.id,
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

const setSyncRecord = async (chainId: number, requestContext: RequestContext) => {
  // get global context
  const { logger, txService, config } = getContext();

  const { methodContext } = createLoggingContext("setSyncRecord", requestContext);
  try {
    const sdks = getSdks();
    const sdk = sdks[chainId];

    const chainConfig = config.chainConfig[chainId];
    if (!chainConfig || !sdk) {
      throw new NoChainConfig(chainId, { requestContext, methodContext, sdk: !!sdk });
    }
    const allowUnsynced = chainConfig.subgraphSyncBuffer;

    logger.info("Getting sync record", requestContext, methodContext, { chainId });
    const realBlockNumber = await txService.getBlockNumber(chainId);
    const { _meta } = await sdk.GetBlockNumber();
    const subgraphBlockNumber = _meta?.block.number ?? 0;
    let record: SubgraphSyncRecord;
    if (realBlockNumber - subgraphBlockNumber > allowUnsynced) {
      logger.warn("SUBGRAPH IS OUT OF SYNC", requestContext, methodContext, {
        realBlockNumber,
        subgraphBlockNumber,
        chainId,
      });
      record = { synced: false, latestBlock: realBlockNumber, syncedBlock: subgraphBlockNumber };
    } else {
      record = { synced: true, latestBlock: realBlockNumber, syncedBlock: subgraphBlockNumber };
    }
    synced[chainId] = record;
    return record;
  } catch (e) {
    logger.error(`Error getting sync status for chain`, requestContext, methodContext, jsonifyError(e), {
      chainId,
    });
    return { synced: false, latestBlock: 0, syncedBlock: 0 };
  }
};

export const getActiveTransactions = async (_requestContext?: RequestContext): Promise<ActiveTransaction<any>[]> => {
  // get global context
  const { wallet, logger, config } = getContext();

  const { requestContext, methodContext } = createLoggingContext(getActiveTransactions.name, _requestContext);

  const routerAddress = wallet.address;

  // get local context

  // use temp cache to prevent multiple unnecessary subgraph calls while
  // still setting all chain sync records in this function
  const tempRecordCache: Record<string, SubgraphSyncRecord> = {};

  const sdks = getSdks();
  const allChains = await Promise.all(
    Object.entries(sdks).map(async ([cId, sdk]) => {
      const chainId = parseInt(cId);

      const chainConfig = config.chainConfig[chainId];
      if (!chainConfig) {
        throw new NoChainConfig(chainId);
      }

      // get all sender prepared txs
      const allSenderPrepared = await sdk.GetSenderTransactions({
        routerId: routerAddress.toLowerCase(),
        sendingChainId: chainId,
        status: SdkTransactionStatus.Prepared,
      });

      const allSenderPreparedTx = allSenderPrepared.router?.transactions ?? [];

      // Create list of txIds for each *configured* receiving chain to create
      // the correct set of queries
      const receivingChains: Record<string, string[]> = {};

      const missingReceivingChainConfiguration: any[] = []; // i hate these types!!
      allSenderPreparedTx.forEach((senderTx) => {
        const _sdk = sdks[Number(senderTx.receivingChainId)];
        if (!_sdk) {
          // if receiving SDK doesnt exist, cancel all the txs
          logger.warn(
            "No contract reader available for receiver chain, marking sender tx for cancellation",
            { ...requestContext, transactionId: senderTx.transactionId } as RequestContext<string>,
            methodContext,
            { sendingChain: senderTx.chainId, receivingChain: senderTx.receivingChainId },
          );
          // TODO: What about config changes here? Is that a concern?
          // I.e. router adds + removes a chain. They have prepared on
          // both sides before removing. This would cancel the sender side
          // automatically, without checking against the receiving
          // prepared-ness
          // NOTE: cannot check onchain in these cases, because you likely
          // wont have a provider..
          missingReceivingChainConfiguration.push(senderTx);
          return; // Don't add to receiving queries
        }
        if (receivingChains[senderTx.receivingChainId]) {
          receivingChains[senderTx.receivingChainId].push(senderTx.transactionId);
        } else {
          receivingChains[senderTx.receivingChainId] = [senderTx.transactionId];
        }
      });

      // Handle the edge case of the receiver-chain transactions *not* being
      // configured
      const receiverNotConfigured = missingReceivingChainConfiguration.map((senderTx) => {
        return {
          crosschainTx: sdkSenderTransactionToCrosschainTransaction(senderTx),
          payload: {},
          status: CrosschainTransactionStatus.ReceiverNotConfigured,
        } as ActiveTransaction<"ReceiverNotConfigured">;
      });

      // Get all corresponding receiver transactions
      // We can assume here the sdk will always be present because of handling
      // above (doesn't make it into the object)
      const queries = await Promise.all(
        Object.entries(receivingChains).map(async ([cId, txIds]) => {
          const _sdk = sdks[Number(cId)]!;
          const query = await _sdk.GetTransactions({ transactionIds: txIds.map((t) => t.toLowerCase()) });
          return query.transactions;
        }),
      );
      const correspondingReceiverTxs = queries.flat();

      // check synced status
      if (!tempRecordCache[cId]) {
        tempRecordCache[cId] = await setSyncRecord(chainId, requestContext);
      }

      logger.debug("Got sync record", requestContext, methodContext, { chainId, record: tempRecordCache[cId] });
      // Handle unsynced cases
      if (!tempRecordCache[cId].synced) {
        // Return unsynced status for both chains
        // TODO: if we decide to *not* handle any sync transacions, we should
        // not return the sync record for the receiving chains
        return await Promise.all(
          allSenderPreparedTx.map(async (senderTx) => {
            if (!tempRecordCache[senderTx.receivingChainId]) {
              tempRecordCache[senderTx.receivingChainId] = await setSyncRecord(
                parseInt(senderTx.receivingChainId),
                requestContext,
              );
            }
            const matching = correspondingReceiverTxs.filter((t) => t.transactionId === senderTx.transactionId);
            if (matching.length > 1) {
              throw new DuplicateTransactionIds(senderTx.transactionId, matching);
            }
            return {
              crosschainTx: sdkSenderTransactionToCrosschainTransaction(senderTx),
              status: CrosschainTransactionStatus.Unsynced,
              payload: {
                senderChain: {
                  syncRecord: tempRecordCache[senderTx.sendingChainId],
                  fulfillHash: senderTx.fulfillTransactionHash,
                  cancelHash: senderTx.cancelTransactionHash,
                },
                receivingChain: {
                  syncRecord: tempRecordCache[senderTx.receivingChainId],
                  fulfillHash: matching[0]?.fulfillTransactionHash,
                  cancelHash: matching[0]?.cancelTransactionHash,
                },
              },
            };
          }),
        );
      }

      // get time to use for loop
      const currentTime = await getNtpTimeSeconds();

      // foreach sender prepared check if corresponding receiver exists
      // if it does not, call the handleSenderPrepare handler
      // if it is fulfilled, call the handleReceiverFulfill handler
      // if it is cancelled, call the handlerReceiverCancel handler
      const txs =
        allSenderPreparedTx.map((senderTx): ActiveTransaction<any> | undefined => {
          const { invariant, sending } = sdkSenderTransactionToCrosschainTransaction(senderTx);

          // Get the matching tx
          const matching = correspondingReceiverTxs.filter((t) => t.transactionId === senderTx.transactionId);
          if (matching.length > 1) {
            throw new DuplicateTransactionIds(senderTx.transactionId, matching);
          }

          const [correspondingReceiverTx] = matching;

          const receiving: VariantTransactionData | undefined = correspondingReceiverTx
            ? {
                amount: correspondingReceiverTx.amount,
                expiry: Number(correspondingReceiverTx.expiry),
                preparedBlockNumber: Number(correspondingReceiverTx.preparedBlockNumber),
              }
            : undefined;

          // Handle case where there is no receiving transaction, but the
          // sending tx has expired. We want to preference this case
          // because otherwise the receiving tx not being present would
          // cause it to get created, which is dangerous for expired sender
          // transactions. Additionally, once the sender tx is transitioned
          // to not "Prepared" the tx will never be handled in this loop.
          // Pure sender expired txs will be handled later.
          if (currentTime > senderTx.expiry && !receiving) {
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

          // You know in this case, the sender tx must not be expired
          // otherwise it would be handled above
          if (!receiving) {
            // If there is no receiver transaction, handle sender prepared
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

          // Now we *know* we have a receiver tx

          // Handle expired receiver transactions that require an action
          // (i.e. status is prepared)
          if (currentTime > receiving.expiry && correspondingReceiverTx.status === SdkTransactionStatus.Prepared) {
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

          // Now, handle case where the sender transaction is expired.
          // (other statuses will result in mirroring an action to the
          // sender chain, which will fail if its expired)
          if (currentTime > sending.expiry) {
            logger.warn("Have expired sender tx with existing receiver tx", requestContext, methodContext, {
              transactionId: senderTx.transactionId,
              receivingExpiry: receiving.expiry,
              sendingExpiry: sending.expiry,
              receivingChain: invariant.receivingChainId,
              sendingChain: invariant.sendingChainId,
              receivingStatus: correspondingReceiverTx.status,
              currentTime,
            });
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

          // Handle mirroring actions (cancel or fulfill)
          if (correspondingReceiverTx.status === SdkTransactionStatus.Fulfilled) {
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
          if (correspondingReceiverTx.status === SdkTransactionStatus.Cancelled) {
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
