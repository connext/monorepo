import { gql } from "graphql-request";

export const getSenderTransactionsQuery = gql`
  query GetSenderTransactions($routerId: ID!, $sendingChainId: BigInt!, $status: TransactionStatus) {
    router(id: $routerId) {
      transactions(
        where: { status: $status, sendingChainId: $sendingChainId, chainId: $sendingChainId }
        orderBy: preparedBlockNumber
        orderDirection: desc
      ) {
        id
        status
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
      }
    }
  }
`;

export const getReceiverTransactionsQuery = gql`
  query GetReceiverTransactions($routerId: ID!, $receivingChainId: BigInt!, $status: TransactionStatus) {
    router(id: $routerId) {
      transactions(
        where: { status: $status, receivingChainId: $receivingChainId, chainId: $receivingChainId }
        orderBy: preparedBlockNumber
        orderDirection: desc
      ) {
        id
        status
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
      }
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
      fulfillCaller
    }
  }
`;

export const getAssetBalanceById = gql`
  query GetAssetBalance($assetBalanceId: ID!) {
    assetBalance(id: $assetBalanceId) {
      amount
    }
  }
`;
