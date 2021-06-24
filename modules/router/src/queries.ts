import { gql } from "graphql-request";

export const getSenderPrepareQuery = gql`
  query GetSenderPrepareTransactions($routerId: String!, $sendingChainId: Int!) {
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
    }
  }
`;

export const getReceiverPrepareQuery = gql`
  query GetReceiverPrepareTransactions($routerId: String!, $receivingChainId: Int!) {
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
    }
  }
`;

export const getReceiverFulfillQuery = gql`
  query GetReceiverFulfillTransactions($routerId: String!, $receivingChainId: Int!) {
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
      relayerFee
      signature
    }
  }
`;

export const getSenderFulfillQuery = gql`
  query GetSenderFulfillTransactions($routerId: String!, $sendingChainId: Int!) {
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
      relayerFee
      signature
    }
  }
`;
