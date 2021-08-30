import { TransactionStatus } from "../../adapters/subgraph/graphqlsdk";
import { SingleChainTransaction } from "../../lib/entities";
import { getContext } from "../../router";

import { NoSenderTxFound, SenderTxInvalidStatus, ReceiverTxInvalidStatus } from "./errors";

type PrepareCancelParams = {
  transactionId: string;
  user: string;
  senderChainId: number;
};

export const prepareCancel = async (p: PrepareCancelParams): Promise<SingleChainTransaction> => {
  const { transactionId, user, senderChainId } = p;
  const { contractReader } = getContext();
  const senderTx = await contractReader.getTransactionForChain(transactionId, user, senderChainId);
  if (!senderTx) {
    throw new NoSenderTxFound(transactionId);
  }

  if (senderTx.status !== TransactionStatus.Prepared) {
    throw new SenderTxInvalidStatus(transactionId, senderTx.status);
  }

  const receiverTx = await contractReader.getTransactionForChain(transactionId, user, senderTx.txData.receivingChainId);
  if (receiverTx && receiverTx.status !== TransactionStatus.Cancelled) {
    throw new ReceiverTxInvalidStatus(transactionId, receiverTx.status);
  }

  return senderTx;
};
