import axios from "axios";

// TODO: add url
const WATCHTOWER_URL = "placeholder";

type TransactionStatusResponse = {
  transaction: {
    // Sanity check portion.
    transactionId: string;
    type: string; // e.g. "SenderFulfill"
    expiry: number;
    chain: number;
  };
  batch: {
    id: string;
    size: number; // Total number of transactions in the same batch.

    // These values will be defined IFF there is an automated job set up to send this batch.
    ttl?: number; // Time left until the batch gets submitted.
    timestamp?: number; // Unix timestamp of the batch creation.
  };
};

export const getBatchedTransactionStatus = async (chainId: number, transactionId: number) => {
  const formattedUrl = `${WATCHTOWER_URL}/chain/${chainId}/transaction/${transactionId}`;
  const response = await axios.get<TransactionStatusResponse>(formattedUrl);
  return response.data;
};
