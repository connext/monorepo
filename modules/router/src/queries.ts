import { gql } from "graphql-request";

export const getSenderPrepareQuery = gql`
  query GetSenderPrepareTransactions($routerId: String!, $sendingChainId: BigInt!) {
    transactions(
      where: { router: $routerId, sendingChainId: $sendingChainId, chainId: $sendingChainId, status: Prepared }
    ) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
      encodedBid
      bidSignature
    }
  }
`;

export const getReceiverPrepareQuery = gql`
  query GetReceiverPrepareTransactions($routerId: String!, $receivingChainId: BigInt!) {
    transactions(
      where: { router: $routerId, receivingChainId: $receivingChainId, chainId: $receivingChainId, status: Prepared }
    ) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
      encodedBid
      bidSignature
    }
  }
`;

export const getReceiverFulfillQuery = gql`
  query GetReceiverFulfillTransactions($routerId: String!, $receivingChainId: BigInt!) {
    transactions(
      where: { router: $routerId, receivingChainId: $receivingChainId, chainId: $receivingChainId, status: Fulfilled }
    ) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
      encodedBid
      bidSignature
      relayerFee
      signature
    }
  }
`;

export const getSenderTransferQuery = gql`
  query GetSenderTransaction($transactionId: Bytes!, $sendingChainId: BigInt!) {
    transactions(where: { transactionId: $transactionId, sendingChainId: $sendingChainId, chainId: $sendingChainId }) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
      encodedBid
      bidSignature
      relayerFee
      signature
    }
  }
`;

export const getReceiverTransferQuery = gql`
  query GetReceiverTransaction($transactionId: Bytes!, $receivingChainId: BigInt!) {
    transactions(
      where: { transactionId: $transactionId, receivingChainId: $receivingChainId, chainId: $receivingChainId }
    ) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
      encodedBid
      bidSignature
      relayerFee
      signature
    }
  }
`;

export const getSenderFulfillQuery = gql`
  query GetSenderFulfillTransactions($routerId: String!, $sendingChainId: BigInt!) {
    transactions(
      where: { router: $routerId, sendingChainId: $sendingChainId, chainId: $sendingChainId, status: Fulfilled }
    ) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
      encodedBid
      bidSignature
      relayerFee
      signature
    }
  }
`;
