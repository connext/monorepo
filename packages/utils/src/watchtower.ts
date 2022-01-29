import axios from "axios";

// TODO: add url
const WATCHTOWER_URL = "placeholder";

type TransactionStatus = {
  timeLeft: number; // Time left until the batch gets submitted.
  batchSize: number; // Total number of transactions in the same batch.
};

export const getBatchedTransactionStatus = async (transactionId: number) => {
  const formattedUrl = `${WATCHTOWER_URL}/transaction/${transactionId}`;
  const response = await axios.get<TransactionStatus>(formattedUrl);
  return response.data;
};
