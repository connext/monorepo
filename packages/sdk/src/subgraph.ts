import { Signer } from "ethers";
import { BaseLogger } from "pino";
import { getUuid, TransactionData } from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";

import { NxtpSdkEvent, NxtpSdkEvents } from "./sdk";
import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";

/**
 * Gets hosted subgraph for applicable chains
 *
 * @param chainId - The chain you want the subgraph URI for
 * @returns A string of the appropriate URI to access the hosted subgraph
 *
 * @remarks
 * Currently only returns URIs for hosted subgraphs
 */
export const getDeployedSubgraphUri = (chainId: number): string | undefined => {
  switch (chainId) {
    case 4:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby";
    case 5:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli";
    default:
      return undefined;
  }
};

/**
 * Converts subgraph transactions to properly typed TransactionData
 *
 * @param transaction Subgraph data
 * @returns Properly formatted TransactionData
 */
const convertTransactionToTxData = (transaction: any): TransactionData => {
  return {
    user: transaction.user.id,
    router: transaction.router.id,
    sendingChainId: parseInt(transaction.sendingChainId),
    sendingAssetId: transaction.sendingAssetId,
    sendingChainFallback: transaction.sendingChainFallback,
    amount: transaction.amount,
    receivingChainId: parseInt(transaction.receivingChainId),
    receivingAssetId: transaction.receivingAssetId,
    receivingAddress: transaction.receivingAddress,
    expiry: transaction.expiry,
    callDataHash: transaction.callDataHash,
    callTo: transaction.callTo,
    transactionId: transaction.transactionId,
    preparedBlockNumber: parseInt(transaction.preparedBlockNumber),
  };
};

/**
 * @classdesc Handles all user-facing subgraph queries
 */
export class Subgraph {
  private sdks: Record<number, Sdk> = {};

  constructor(
    private readonly user: Signer,
    private readonly chainConfig: Record<number, { subgraph: string }>,
    private readonly logger: BaseLogger,
  ) {
    Object.entries(this.chainConfig).forEach(([chainId, { subgraph }]) => {
      const client = new GraphQLClient(subgraph);
      this.sdks[parseInt(chainId)] = getSdk(client);
    });
  }

  /**
   * Gets the transactions that the user may need to take action on. Specifically, transactions that have been prepared on the sending chain, but have yet to be prepared or fulfilled on the receiving chain, or have yet to be cancelled on the sending chain
   *
   * @returns All active transactions for the instantiated user
   */
  async getActiveTransactions(): Promise<
    {
      txData: TransactionData;
      status: NxtpSdkEvent;
      bidSignature: string;
      caller: string;
      encodedBid: string;
      encryptedCallData: string;
    }[]
  > {
    const methodName = "getActiveTransactions";
    const methodId = getUuid();

    const user = (await this.user.getAddress()).toLowerCase();
    const txs = await Promise.all(
      Object.keys(this.sdks).map(async (c) => {
        const chainId = parseInt(c);
        const subgraph = this.sdks[chainId];
        // receiver side prepared = ReceiverPrepared
        const { transactions: receiverPrepared } = await subgraph.GetReceiverTransactions({
          userId: user,
          receivingChainId: chainId,
          status: TransactionStatus.Prepared,
        });

        // sender prepared + no receiver side = SenderPrepared
        const { transactions: allSenderPrepared } = await subgraph.GetSenderTransactions({
          sendingChainId: chainId,
          userId: user,
          status: TransactionStatus.Prepared,
        });
        const { transactions: receiverForSenderPrepared } = await subgraph.GetTransactions({
          transactionIds: allSenderPrepared.map((t) => t.transactionId),
        });
        const receiverForSenderPreparedIds = receiverForSenderPrepared.map((t) => t.transactionId);

        // filter out everything that has a receiver prepared tx
        const senderPrepared = allSenderPrepared.filter(
          (tx) => !receiverForSenderPreparedIds.includes(tx.transactionId),
        );

        const rxTxs: {
          txData: TransactionData;
          status: NxtpSdkEvent;
          bidSignature: string;
          caller: string;
          encodedBid: string;
          encryptedCallData: string;
        }[] = receiverPrepared.map((txData) => {
          return {
            txData: convertTransactionToTxData(txData),
            status: NxtpSdkEvents.ReceiverTransactionPrepared,
            bidSignature: txData.bidSignature,
            caller: txData.prepareCaller,
            encodedBid: txData.encodedBid,
            encryptedCallData: txData.encryptedCallData,
          };
        });

        const senderTxs: {
          txData: TransactionData;
          status: NxtpSdkEvent;
          bidSignature: string;
          caller: string;
          encodedBid: string;
          encryptedCallData: string;
        }[] = senderPrepared.map((txData) => {
          return {
            txData: convertTransactionToTxData(txData),
            status: NxtpSdkEvents.SenderTransactionPrepared,
            bidSignature: txData.bidSignature,
            caller: txData.prepareCaller,
            encodedBid: txData.encodedBid,
            encryptedCallData: txData.encryptedCallData,
          };
        });
        return rxTxs.concat(senderTxs);
      }),
    );
    this.logger.info({ methodId, methodName, txs }, "Queried active txs");
    return txs.flat();
  }
}
