import { gql } from "graphql-request";

// Contains all subgraph queries used by router

export const getSenderTransactionsQuery = gql`
  query GetSenderTransactions($routerId: ID!, $sendingChainId: BigInt!, $status: TransactionStatus) {
    router(id: $routerId) {
      transactions(
        where: { status: $status, sendingChainId: $sendingChainId }
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
        initiator
        receivingChainTxManagerAddress
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
        prepareTransactionHash
        fulfillTransactionHash
        cancelTransactionHash
        fulfillUnlockData
        encodedConditionData
        cancelUnlockData
        sendingChainCondition
        receivingChainCondition
      }
    }
  }
`;

export const getReceiverTransactionsQuery = gql`
  query GetReceiverTransactions(
    $routerId: ID!
    $receivingChainId: BigInt!
    $status: TransactionStatus
    $expiry_lt: BigInt
  ) {
    router(id: $routerId) {
      transactions(
        where: { status: $status, receivingChainId: $receivingChainId, expiry_lt: $expiry_lt }
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
        initiator
        receivingChainTxManagerAddress
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
        prepareTransactionHash
        fulfillTransactionHash
        cancelTransactionHash
        fulfillUnlockData
        encodedConditionData
        cancelUnlockData
        sendingChainCondition
        receivingChainCondition
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
      initiator
      receivingChainTxManagerAddress
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
      prepareCaller
      fulfillCaller
      cancelCaller
      prepareTransactionHash
      fulfillTransactionHash
      cancelTransactionHash
      fulfillUnlockData
      encodedConditionData
      cancelUnlockData
      sendingChainCondition
      receivingChainCondition
    }
  }
`;

export const getTransactionsByIdsQuery = gql`
  query GetTransactions($transactionIds: [Bytes!]) {
    transactions(where: { transactionId_in: $transactionIds }) {
      id
      status
      chainId
      user {
        id
      }
      router {
        id
      }
      initiator
      receivingChainTxManagerAddress
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
      callData
      prepareCaller
      fulfillCaller
      cancelCaller
      prepareTransactionHash
      fulfillTransactionHash
      cancelTransactionHash
      fulfillUnlockData
      encodedConditionData
      cancelUnlockData
      sendingChainCondition
      receivingChainCondition
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

export const getBlockNumber = gql`
  query GetBlockNumber {
    _meta {
      block {
        number
      }
    }
  }
`;
