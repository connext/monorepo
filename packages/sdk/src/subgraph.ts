import { GQlessClient } from "gqless";

import { createClientForURI, GeneratedSchema, Transaction, TransactionStatus } from "./gqless";
import { NxtpSdkEvent, NxtpSdkEvents } from "./sdk";

export class Subgraph {
  private subgraphs: Record<number, GQlessClient<GeneratedSchema>>;
  constructor(private readonly user: string, chains: Record<number, { subgraph: string }>) {
    this.subgraphs = {};
    Object.entries(chains).forEach(([c, { subgraph }]) => {
      const chainId = parseInt(c);
      this.subgraphs[chainId] = createClientForURI(subgraph);
    });
  }

  async getActiveTransactions(): Promise<{ tx: Transaction; status: NxtpSdkEvent }[]> {
    const txs = await Promise.all(
      Object.keys(this.subgraphs).map(async (c) => {
        const chainId = parseInt(c);
        const subgraph = this.subgraphs[chainId];
        // receiver side prepared = ReceiverPrepared
        const receiverPrepared = await subgraph.resolved(() => {
          return subgraph.query.transactions({
            where: { user: this.user, status: TransactionStatus.Prepared, receivingChainId: chainId },
          });
        });

        // sender prepared + no receiver side = SenderPrepared
        const senderPrepared = await subgraph.resolved(() => {
          return subgraph.query.transactions({
            where: { user: this.user, status: TransactionStatus.Prepared, sendingChainId: chainId },
          });
        });

        const noReceiver = await Promise.all(
          senderPrepared.map(async (tx) => {
            const rxSubgraph = this.subgraphs[tx.receivingChainId];
            const exists = await subgraph.resolved(() => {
              return rxSubgraph.query.transaction({ id: tx.transactionId });
            });
            return exists ? exists : undefined;
          }),
        );

        const rxTxs: { tx: Transaction; status: NxtpSdkEvent }[] = receiverPrepared.map((tx) => {
          return { tx, status: NxtpSdkEvents.ReceiverTransactionPrepared };
        });

        const senderTxs: { tx: Transaction; status: NxtpSdkEvent }[] = noReceiver
          .filter((x) => !!x)
          .map((tx) => {
            return {
              tx: tx!,
              status: NxtpSdkEvents.SenderTransactionPrepared,
            };
          });
        return rxTxs.concat(senderTxs);
      }),
    );
    return txs.flat();
  }
}
