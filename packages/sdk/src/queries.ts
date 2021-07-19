import { gql } from "graphql-request";

export const getSenderTransactionsQuery = gql`
  query GetSenderTransactions($userId: String!, $sendingChainId: BigInt!, $status: TransactionStatus) {
    transactions(
      where: { user: $userId, status: $status, sendingChainId: $sendingChainId }
      orderBy: preparedBlockNumber
      orderDirection: desc
    ) {
      id
      status
      chainId
      user {
        id
      }
      router {
        id
      }
      sendingAssetId
      receivingAssetId
      sendingChainFallback
      receivingAddress
      callTo
      sendingChainId
      receivingChainId
      callDataHash
      transactionId
      amount
      expiry
      preparedBlockNumber
      encryptedCallData
      encodedBid
      bidSignature
      prepareCaller
      fulfillCaller
      cancelCaller
    }
  }
`;

export const getReceiverTransactionsQuery = gql`
  query GetReceiverTransactions($userId: String!, $receivingChainId: BigInt!, $status: TransactionStatus) {
    transactions(
      where: { user: $userId, status: $status, receivingChainId: $receivingChainId }
      orderBy: preparedBlockNumber
      orderDirection: desc
    ) {
      id
      status
      chainId
      user {
        id
      }
      router {
        id
      }
      sendingAssetId
      receivingAssetId
      sendingChainFallback
      receivingAddress
      callTo
      sendingChainId
      receivingChainId
      callDataHash
      transactionId
      amount
      expiry
      preparedBlockNumber
      encryptedCallData
      encodedBid
      bidSignature
      prepareCaller
      fulfillCaller
      cancelCaller
    }
  }
`;

export const getTransactionByIdQuery = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(id: $transactionId) {
      id
      status
      chainId
      user {
        id
      }
      router {
        id
      }
      sendingAssetId
      receivingAssetId
      sendingChainFallback
      receivingAddress
      callTo
      sendingChainId
      receivingChainId
      callDataHash
      transactionId
      amount
      expiry
      preparedBlockNumber
      encryptedCallData
      #
      encodedBid
      bidSignature
      relayerFee
      signature
      prepareCaller
      fulfillCaller
      cancelCaller
    }
  }
`;

export const getTransactionsByIdsQuery = gql`
  query GetTransactions($transactionIds: [Bytes!], $status: TransactionStatus) {
    transactions(where: { transactionId_in: $transactionIds, status: $status }) {
      id
      status
      chainId
      user {
        id
      }
      router {
        id
      }
      sendingAssetId
      receivingAssetId
      sendingChainFallback
      receivingAddress
      callTo
      sendingChainId
      receivingChainId
      callDataHash
      transactionId
      amount
      expiry
      preparedBlockNumber
      relayerFee
      signature
      callData
      prepareCaller
      fulfillCaller
      cancelCaller
    }
  }
`;
