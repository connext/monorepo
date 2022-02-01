import axios from "axios";

// TODO: add url
const WATCHTOWER_URL = "placeholder";

export type BatchStatusResponse = {
  id: string;
  size: number; // Total number of transactions in the same batch.
  // Time left until the batch gets submitted. If no batch has been set up (timestamp is
  // undefined), then this will be equal to the TTL for a batch if a new tx was pushed.
  ttl: number;
  // Unix timestamp of the batch creation. Will be defined IFF there is an automated job set
  // up to send this batch.
  timestamp?: number;
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

export const getBatchedTransactionStatus = async (
  chainId: number,
  transactionId: number,
): Promise<TransactionStatusResponse> => {
  const formattedUrl = `${WATCHTOWER_URL}/chain/${chainId}/transaction/${transactionId}`;
  const response = await axios.get<TransactionStatusResponse>(formattedUrl);
  return response.data;
};

export const getBatchStatus = async (chainId: number): Promise<BatchStatusResponse> => {
  const formattedUrl = `${WATCHTOWER_URL}/chain/${chainId}/senderfulfill`;
  const response = await axios.get<BatchStatusResponse>(formattedUrl);
  return response.data;
};
