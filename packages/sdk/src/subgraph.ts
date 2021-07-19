import { Signer } from "ethers";
import { BaseLogger } from "pino";
import hyperid from "hyperid";
import { TransactionData } from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";

import { NxtpSdkEvent, NxtpSdkEvents } from "./sdk";
import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";

const hId = hyperid();

/**
 * Gets hosted subgraph for applicable chains
 * @param chainId
 * @returns
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

  async getActiveTransactions(): Promise<{ txData: TransactionData; status: NxtpSdkEvent }[]> {
    const methodName = "getActiveTransactions";
    const methodId = hId();

    const user = await this.user.getAddress();
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

        const senderPrepared = allSenderPrepared.filter(
          (tx) => !receiverForSenderPreparedIds.includes(tx.transactionId),
        );

        const rxTxs: { txData: TransactionData; status: NxtpSdkEvent }[] = receiverPrepared.map((txData) => {
          return {
            txData: convertTransactionToTxData(txData),
            status: NxtpSdkEvents.ReceiverTransactionPrepared,
          };
        });

        const senderTxs: { txData: TransactionData; status: NxtpSdkEvent }[] = senderPrepared.map((txData) => {
          return {
            txData: convertTransactionToTxData(txData),
            status: NxtpSdkEvents.SenderTransactionPrepared,
          };
        });
        return rxTxs.concat(senderTxs);
      }),
    );
    this.logger.info({ methodId, methodName, txs }, "Queried active txs");
    return txs.flat();
  }
}
