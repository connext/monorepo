import axios from "axios";

// TODO: add url
const WATCHTOWER_URL = "placeholder";

export type BatchStatusResponse = {
  id: string;
  size: number; // Total number of transactions in the same batch.

  // These values will be defined IFF there is an automated job set up to send this batch.
  ttl?: number; // Time left until the batch gets submitted.
  timestamp?: number; // Unix timestamp of the batch creation.
};

export type TransactionStatusResponse = {
  transaction: {
    // Sanity check portion.
    transactionId: string;
    type: string; // e.g. "SenderFulfill"
    expiry: number;
    chain: number;
  };
  batch: BatchStatusResponse;
};

export const getBatchedTransactionStatus = async (chainId: number, transactionId: number) => {
  const formattedUrl = `${WATCHTOWER_URL}/chain/${chainId}/transaction/${transactionId}`;
  const response = await axios.get<TransactionStatusResponse>(formattedUrl);
  return response.data;
};

export const getBatchStatus = async (chainId: number, transactionType: "senderfulfill" | "receiverfulfill") => {
  const formattedUrl = `${WATCHTOWER_URL}/chain/${chainId}/type/${transactionType}`;
  const response = await axios.get<BatchStatusResponse>(formattedUrl);
  return response.data;
};
